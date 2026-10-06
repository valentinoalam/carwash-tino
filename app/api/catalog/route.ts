import { NextResponse } from "next/server";
import { getCatalog } from "@/lib/catalog-server";
import { catalogResponseSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const body = catalogResponseSchema.parse(await getCatalog());
    return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[catalog]", e);
    return NextResponse.json({ error: "Gagal memuat data." }, { status: 500 });
  }
}
