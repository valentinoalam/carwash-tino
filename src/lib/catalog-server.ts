// Hanya untuk server (route handler). Jangan di-import dari komponen "use client".
import { unstable_cache } from "next/cache";
import type { z } from "zod";
import { readTabs, type Row } from "@/lib/sheets";
import {
  branchRowSchema,
  catalogSchema,
  serviceRowSchema,
  vehicleRowSchema,
} from "@/lib/schemas";

export const CATALOG_TAG = "catalog";

/** Validasi tiap baris; baris yang tidak valid dilewati (dan dicatat di log). */
function parseRows<S extends z.ZodType>(tab: string, rows: Row[], schema: S): z.output<S>[] {
  return rows.flatMap((row) => {
    const parsed = schema.safeParse(row);
    if (!parsed.success) {
      const why = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
      console.warn(`[catalog] tab "${tab}" baris ${row._row} dilewati -> ${why}`);
      return [];
    }
    return [parsed.data];
  });
}

/** 1 HTTP request ke Sheets: semua tab katalog + meta. Versi & data = satu snapshot yang sama. */
async function readSnapshot() {
  const tabs = await readTabs(["branch", "typeOfCar", "services", "meta"]);

  const versionRow = tabs.meta.find((r) => String(r["key"] ?? "").trim() === "catalogVersion");
  const version = String(versionRow?.["value"] ?? "").trim();
  if (!version) throw new Error('Tab "meta" tidak punya baris key=catalogVersion');

  // catalogSchema.parse membuang field `isActive` dan menjamin bentuk respons.
  const catalog = catalogSchema.parse({
    branches: parseRows("branch", tabs.branch, branchRowSchema).filter((r) => r.isActive),
    vehicles: parseRows("typeOfCar", tabs.typeOfCar, vehicleRowSchema).filter((r) => r.isActive),
    services: parseRows("services", tabs.services, serviceRowSchema).filter((r) => r.isActive),
  });
  return { version, ...catalog };
}

/**
 * Model PUSH: snapshot bertahan sampai Apps Script memanggil /api/catalog/revalidate.
 * Selama data tidak berubah, Sheets tidak disentuh, berapa pun jumlah user.
 * Satu perubahan data = 1 request batchGet. TTL 10 menit hanya jaring pengaman bila webhook gagal.
 * Error tidak ikut di-cache.
 */
export const getCatalog = unstable_cache(readSnapshot, ["catalog-snapshot"], {
  revalidate: 600,
  tags: [CATALOG_TAG],
});

/** Endpoint versi memakai snapshot yang sama, jadi tidak ada request tambahan ke Sheets. */
export async function getCatalogVersion() {
  return (await getCatalog()).version;
}