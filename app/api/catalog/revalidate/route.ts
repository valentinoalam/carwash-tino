import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CATALOG_TAG } from "@/lib/catalog-server";

export const dynamic = "force-dynamic";

/** Dipanggil Apps Script setiap data Sheet berubah. Set CATALOG_WEBHOOK_SECRET di env. */
export async function POST(req: Request) {
  const secret = process.env.CATALOG_WEBHOOK_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Next 15 ke bawah: revalidateTag(tag) langsung mengosongkan cache.
  // Next 16: "max" memakai stale-while-revalidate (user pertama masih dapat data lama); untuk
  // pengosongan langsung pakai revalidateTag(CATALOG_TAG, { expire: 0 }). Cek dokumentasi versi Anda.
  revalidateTag(CATALOG_TAG, { expire: 3600 });
  return NextResponse.json({ ok: true });
}