import "server-only";
import type { CustomerInput } from "@/lib/schemas";
import { getGoogleClient } from "./gClient";
import { google } from "googleapis";


const spreadsheetId = () => {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error("GOOGLE_SHEET_ID belum diisi");
  return id;
};

export type Row = Record<string, string> & { _row: number };

/** Ubah values mentah Sheets (baris pertama = header) menjadi Row[]. `_row` = nomor baris di Sheet. */
function toRows(values: unknown[][] | null | undefined): Row[] {
  const [header = [], ...rows] = values ?? [];
  const out: Row[] = [];
  rows.forEach((r, i) => {
    if (!r.some((c) => String(c ?? "").trim() !== "")) return;
    const obj = Object.fromEntries(header.map((h, c) => [String(h), String(r[c] ?? "")]));
    out.push({ ...obj, _row: i + 2 } as Row);
  });
  return out;
}

/** Baca satu tab. Baris pertama = header. `_row` = nomor baris di Sheet (untuk update). */
export async function readTab(tab: string): Promise<Row[]> {
  const client = await getGoogleClient(['https://www.googleapis.com/auth/spreadsheets']);
  const sheets = google.sheets({ version: "v4", auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId(),
    range: `${tab}!A:Z`,
    valueRenderOption: "UNFORMATTED_VALUE", // angka mentah (25000), bukan "25,000" / "25.000" sesuai locale Sheet
  });
  return toRows(res.data.values);
}

/**
 * Baca BEBERAPA tab dalam 1 HTTP request (spreadsheets.values.batchGet).
 * Hanya untuk tab publik (katalog). Jangan dipakai untuk tab "customer" yang berisi data pribadi.
 */
export async function readTabs(tabs: string[]): Promise<Record<string, Row[]>> {
  const client = await getGoogleClient(['https://www.googleapis.com/auth/spreadsheets']);
  const sheets = google.sheets({ version: "v4", auth: client });

  const res = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: spreadsheetId(),
    ranges: tabs.map((t) => `${t}!A:Z`),
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  const ranges = res.data.valueRanges ?? []; // urutan sama dengan `ranges` yang diminta
  return Object.fromEntries(tabs.map((t, i) => [t, toRows(ranges[i]?.values)]));
}

/* ---------- Customer ---------- */

export const CUSTOMER_COLS = [
  "id",
  "name",
  "email",
  "phoneNumber",
  "vehicleTypeId",
  "vehicleBrand",
  "licensePlate",
  "createdAt",
  "updatedAt",
] as const;

/**
 * Cache tab customer: HANYA di memori proses (tidak ditulis ke disk / Data Cache), TTL pendek.
 * Dipakai khusus untuk lookup (findCustomer). Tidak pernah dikirim utuh ke klien.
 * - Banyak lookup bersamaan berbagi 1 request ke Sheets (inflight dedupe).
 * - upsertCustomer membaca data segar (tanpa cache) lalu mengosongkan cache ini.
 * Catatan: cache bersifat per-instance; di serverless efeknya terbatas pada instance yang hangat.
 */
const CUSTOMER_TTL_MS = 60_000;
let customerCache: { at: number; rows: Row[] } | null = null;
let customerInflight: Promise<Row[]> | null = null;

async function readCustomersCached(): Promise<Row[]> {
  if (customerCache && Date.now() - customerCache.at < CUSTOMER_TTL_MS * 5) return customerCache.rows;
  customerInflight ??= readTab("customer")
    .then((rows) => {
      customerCache = { at: Date.now(), rows };
      return rows;
    })
    .finally(() => {
      customerInflight = null;
    });
  return customerInflight;
}

export const normName = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
export const normEmail = (s: string) => s.trim().toLowerCase();
export const normPlate = (s: string) => s.replace(/\s+/g, "").toUpperCase();

/** Cari customer berdasarkan nama + email. Bila ada beberapa kendaraan, ambil yang terbaru. */
export async function findCustomer(name: string, email: string) {
  const rows = await readCustomersCached();
  const matches = rows.filter((r) => normName(r.name) === normName(name) && normEmail(r.email) === normEmail(email));
  if (!matches.length) return null;
  matches.sort((a, b) => (a.updatedAt || "").localeCompare(b.updatedAt || ""));
  const c = matches[matches.length - 1];
  return {
    phoneNumber: c.phoneNumber,
    vehicleTypeId: c.vehicleTypeId,
    vehicleBrand: c.vehicleBrand,
    licensePlate: c.licensePlate,
  };
}

/** Update baris bila nama + email + plat sama, selain itu tambah baris baru. */
export async function upsertCustomer(input: CustomerInput) {
  const client = await getGoogleClient(['https://www.googleapis.com/auth/spreadsheets']);
  const sheets = google.sheets({ version: "v4", auth: client });
  const rows = await readTab("customer");
  const now = new Date().toISOString();
  const existing = rows.find(
    (r) =>
      normName(r.name) === normName(input.name) &&
      normEmail(r.email) === normEmail(input.email) &&
      normPlate(r.licensePlate) === normPlate(input.licensePlate)
  );

  const record = {
    id: existing?.id || `c${Date.now().toString(36)}`,
    name: input.name.trim(),
    email: normEmail(input.email),
    phoneNumber: input.phoneNumber,
    vehicleTypeId: input.vehicleTypeId,
    vehicleBrand: input.vehicleBrand.trim(),
    licensePlate: input.licensePlate.trim().toUpperCase(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
  const values = [CUSTOMER_COLS.map((c) => record[c])];

  // RAW: nomor telepon dan plat tetap sebagai teks (angka 0 di depan tidak hilang).
  if (existing) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId(),
      range: `customer!A${existing._row}:I${existing._row}`,
      valueInputOption: "RAW",
      requestBody: { values },
    });
    customerCache = null; // data berubah -> lookup berikutnya baca ulang
    return { created: false };
  }
  await sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId(),
    range: "customer!A:I",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
  customerCache = null;
  return { created: true };
} 