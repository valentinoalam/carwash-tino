import { z } from "zod";

/**
 * Semua validasi ada di sini dan dipakai bersama oleh:
 *  - Book.tsx (validasi form + parsing respons API)
 *  - app/api/* (validasi request + parsing baris Google Sheets)
 * File ini tidak boleh meng-import "server-only".
 */

/* ---------- Util ---------- */

export const pad2 = (n: number) => String(n).padStart(2, "0");
export const toIso = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
export function prettyDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
export const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
export const normalizePhone = (v: string) => v.replace(/[\s\-().]/g, "");

/** Ubah ZodError menjadi { namaField: pesanPertama }. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}

/* ---------- Field dasar ---------- */

export const phoneSchema = z
  .string()
  .trim()
  .refine((v) => /^(\+?62|0)8\d{8,12}$/.test(normalizePhone(v)), { message: "Nomor tidak valid. Contoh: 0812 3456 7890." })
  .transform(normalizePhone);

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email({ message: "Email tidak valid. Contoh: nama@email.com." });

// Contoh valid: B 1234 ABC, BK1234AB, B1234
export const plateSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{1,2}\s?\d{1,4}\s?[A-Z]{0,3}$/, { message: "Plat tidak valid. Contoh: B 1234 ABC." });

const nameSchema = z.string().trim().min(2, { message: "Masukkan nama Anda." }).max(80);

/* ---------- Form booking ---------- */

/** Dibuat per-panggilan karena aturan "tanggal/jam tidak boleh lewat" bergantung pada waktu sekarang. */
export const makeBookingFormSchema = (now: Date) =>
  z
    .object({
      branchId: z.string().min(1, { message: "Pilih cabang." }),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Pilih tanggal." }),
      time: z.string().regex(/^\d{2}:00$/, { message: "Pilih jam kedatangan." }),
      name: nameSchema,
      phoneNumber: phoneSchema,
      email: emailSchema,
      vehicleBrand: z.string().trim().min(1, { message: "Masukkan merek kendaraan." }).max(60),
      licensePlate: plateSchema,
      notes: z.string().trim().max(500, { message: "Maksimal 500 karakter." }),
    })
    .superRefine((f, ctx) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date) || !/^\d{2}:00$/.test(f.time)) return;
      const today = toIso(now);
      if (f.date < today) {
        ctx.addIssue({ code: "custom", path: ["date"], message: "Tanggal tidak boleh sudah lewat." });
      } else if (f.date === today && Number(f.time.slice(0, 2)) <= now.getHours()) {
        ctx.addIssue({ code: "custom", path: ["time"], message: "Jam ini sudah lewat, pilih jam lain." });
      }
    });

/** Bentuk state form di komponen (nilai mentah sebelum di-parse). */
export type BookingFormInput = z.input<ReturnType<typeof makeBookingFormSchema>>;
export type BookingFormData = z.infer<ReturnType<typeof makeBookingFormSchema>>;
/* ---------- Customer ---------- */

export const customerInputSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phoneNumber: phoneSchema,
  vehicleTypeId: z.string().trim().min(1).max(40),
  vehicleBrand: z.string().trim().min(1).max(60),
  licensePlate: plateSchema,
});
export type CustomerInput = z.infer<typeof customerInputSchema>;

export const customerLookupQuerySchema = z.object({ name: nameSchema, email: emailSchema });

export const customerLookupResponseSchema = z.object({
  customer: z
    .object({
      phoneNumber: z.string(),
      vehicleTypeId: z.string(),
      vehicleBrand: z.string(),
      licensePlate: z.string(),
    })
    .nullable(),
});

/* ---------- Katalog: respons publik (/api/catalog) ---------- */

export const branchSchema = z.object({ id: z.string(), name: z.string(), address: z.string(), phone: z.string() });
export const vehicleSchema = z.object({ id: z.string(), name: z.string(), mult: z.number().positive() });
export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.string(),
  basePrice: z.number().nonnegative(),
  imageUrl: z.string(),
  mode: z.string(), // ripple | foam | dust | sheen | bead
  cls: z.string(),
  desc: z.string(),
  flag: z.string(), // label khusus, mis. "Paling Lengkap" ("" bila tidak ada)
});
export const catalogSchema = z.object({
  branches: z.array(branchSchema),
  vehicles: z.array(vehicleSchema),
  services: z.array(serviceSchema),
});

/** Versi katalog (counter dari tab "meta", dikirim sebagai string agar ringan dibandingkan dengan !==). */
export const catalogVersionSchema = z.object({ version: z.string().min(1) });
/** Respons /api/catalog = katalog + versi yang dibaca bersamaan. */
export const catalogResponseSchema = catalogSchema.extend({ version: z.string().min(1) });
export type CatalogResponse = z.infer<typeof catalogResponseSchema>;

export type Branch = z.infer<typeof branchSchema>;
export type Vehicle = z.infer<typeof vehicleSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Catalog = z.infer<typeof catalogSchema>;

/* ---------- Katalog: baris mentah dari Google Sheets (semua sel berupa string) ---------- */

const text = z.string().trim().default("");

/** TRUE / kosong = aktif; hanya "FALSE" yang menyembunyikan baris. */
const activeFlag = z
  .string()
  .optional()
  .transform((v) => String(v ?? "TRUE").trim().toUpperCase() !== "FALSE");

/** "0,9" -> 0.9 · "100.000" -> 100000 · "Rp 50.000" -> 50000. Kosong -> fallback (bila ada). */
function parseSheetNumber(raw: string, fallback?: number) {
  const s = raw.trim().replace(/[^\d.,-]/g, "");
  if (!s) return fallback ?? NaN;
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) return Number(s.replace(/\./g, "").replace(",", "."));
  return Number(s.replace(",", "."));
}
const sheetNumber = (fallback?: number) =>
  z
    .string()
    .default("")
    .transform((v) => parseSheetNumber(v, fallback));

// Hanya URL https yang diterima (nilai ini dipakai di CSS url("...")). Selain itu dianggap kosong.
const imageUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || /^https:\/\/[^\s"'()]+$/.test(v))
  .catch("");

export const branchRowSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  address: text,
  phone: text,
  isActive: activeFlag,
});

export const vehicleRowSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  mult: sheetNumber(1).pipe(z.number().positive()),
  isActive: activeFlag,
});

export const serviceRowSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  duration: text,
  basePrice: sheetNumber().pipe(z.number().nonnegative()),
  imageUrl,
  mode: text,
  cls: text,
  desc: text,
  flag: text,
  isActive: activeFlag,
});