import { NextResponse } from "next/server";
import { getCatalogVersion } from "@/lib/catalog-server";

export const dynamic = "force-dynamic"; // wajib: jangan di-cache statis

export async function GET() {
  try {
    const version = await getCatalogVersion();
    return NextResponse.json({ version }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[catalog/version]", e);
    return NextResponse.json({ error: "Gagal memuat versi." }, { status: 500 });
  }
}