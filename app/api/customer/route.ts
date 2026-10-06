import { NextRequest, NextResponse } from "next/server";
import { findCustomer, upsertCustomer } from "@/lib/sheets";
import { customerInputSchema, customerLookupQuerySchema, toFieldErrors } from "@/lib/schemas";
import { getCatalog } from "@/lib/catalog-server";
import { checkRateLimit, getClientIp, hashKey, tooMany } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

/**
 * Batas sengaja longgar per IP: banyak pengguna seluler Indonesia berbagi satu IP publik (CGNAT),
 * jadi pembatas per-IP hanya meredam spam kasar. Perlindungan utama untuk data pribadi ada di
 * batas per-identitas pada GET.
 */
const LIMITS = {
  getIp: { limit: 40, windowMs: 60_000 },
  getSubject: { limit: 5, windowMs: 10 * 60_000 },
  postIp: { limit: 30, windowMs: 10 * 60_000 },
} as const;

/** Tolak POST lintas-situs: bila browser mengirim Origin, host-nya harus sama dengan host kita. */
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** GET /api/customer?name=...&email=...  -> { customer: {...} | null } */
export async function GET(req: NextRequest) {
  // Batas per IP dicek SEBELUM parsing agar input sampah pun ikut terhitung.
  const byIp = await checkRateLimit(`customer:get:ip:${getClientIp(req)}`, LIMITS.getIp);
  if (!byIp.ok) return tooMany(byIp);

  const q = customerLookupQuerySchema.safeParse({
    name: req.nextUrl.searchParams.get("name") ?? "",
    email: req.nextUrl.searchParams.get("email") ?? "",
  });
  if (!q.success) return NextResponse.json({ customer: null }, { headers: NO_STORE });

  // Batas per identitas (nama+email) lintas IP: mencegah enumerasi satu orang dari banyak IP.
  const bySubject = await checkRateLimit(
    `customer:get:subject:${hashKey(q.data.name, q.data.email)}`,
    LIMITS.getSubject
  );
  if (!bySubject.ok) return tooMany(bySubject);

  try {
    return NextResponse.json({ customer: await findCustomer(q.data.name, q.data.email) }, { headers: NO_STORE });
  } catch (e) {
    console.error("[customer:get]", e);
    return NextResponse.json({ customer: null }, { status: 500, headers: NO_STORE });
  }
}

/** POST /api/customer  -> simpan / perbarui data customer saat booking */
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });

  const byIp = await checkRateLimit(`customer:post:ip:${getClientIp(req)}`, LIMITS.postIp);
  if (!byIp.ok) return tooMany(byIp);

  const body = await req.json().catch(() => null);
  const parsed = customerInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data tidak valid.", fields: toFieldErrors(parsed.error) },
      { status: 400, headers: NO_STORE }
    );
  }

  // vehicleTypeId harus ada di katalog (dari cache server, tidak menyentuh Sheets).
  // Bila katalog gagal dimuat, pemeriksaan dilewati agar penyimpanan customer tidak ikut gagal.
  try {
    const { vehicles } = await getCatalog();
    if (!vehicles.some((v) => v.id === parsed.data.vehicleTypeId)) {
      return NextResponse.json(
        { error: "Data tidak valid.", fields: { vehicleTypeId: "Tipe kendaraan tidak dikenal." } },
        { status: 400, headers: NO_STORE }
      );
    }
  } catch (e) {
    console.warn("[customer:post] validasi katalog dilewati:", e);
  }

  try {
    // parsed.data sudah dinormalisasi: email huruf kecil, plat huruf besar, telepon tanpa spasi.
    return NextResponse.json(await upsertCustomer(parsed.data), { headers: NO_STORE });
  } catch (e) {
    console.error("[customer:post]", e);
    return NextResponse.json({ error: "Gagal menyimpan." }, { status: 500, headers: NO_STORE });
  }
}