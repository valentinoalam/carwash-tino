import "server-only";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * Rate limiter sliding-window, in-memory (per instance).
 *
 * Antarmukanya async agar nanti bisa diganti Redis (mis. @upstash/ratelimit)
 * tanpa mengubah kode pemanggil.
 *
 * Batasan: di serverless / multi-instance, hitungan tidak dibagi antar instance, jadi batas
 * efektif bisa lebih longgar. Cukup untuk meredam spam sederhana; untuk perlindungan ketat
 * gunakan store terpusat.
 */

export type RateLimitRule = { limit: number; windowMs: number };
export type RateLimitResult = { ok: boolean; remaining: number; retryAfterSec: number };

type Bucket = { hits: number[]; windowMs: number };

const store = new Map<string, Bucket>();
const SWEEP_EVERY_MS = 60_000;
const MAX_KEYS = 10_000; // batas memori: kunci tertua dibuang bila terlampaui
let lastSweep = 0;

function sweep(now: number) {
  if (now - lastSweep < SWEEP_EVERY_MS) return;
  lastSweep = now;
  for (const [key, b] of store) {
    const newest = b.hits[b.hits.length - 1] ?? 0;
    if (now - newest >= b.windowMs) store.delete(key);
  }
  // Map menjaga urutan penyisipan -> buang yang paling lama
  while (store.size > MAX_KEYS) {
    const oldest = store.keys().next().value;
    if (oldest === undefined) break;
    store.delete(oldest);
  }
}

export async function checkRateLimit(key: string, { limit, windowMs }: RateLimitRule): Promise<RateLimitResult> {
  const now = Date.now();
  sweep(now);

  const bucket = store.get(key) ?? { hits: [], windowMs };
  bucket.windowMs = windowMs;
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    store.set(key, bucket);
    // Request yang ditolak TIDAK memperpanjang hukuman; tunggu hit tertua keluar dari jendela.
    const retryAfterSec = Math.max(1, Math.ceil((bucket.hits[0] + windowMs - now) / 1000));
    return { ok: false, remaining: 0, retryAfterSec };
  }

  bucket.hits.push(now);
  store.set(key, bucket);
  return { ok: true, remaining: limit - bucket.hits.length, retryAfterSec: 0 };
}

/**
 * IP klien. PERHATIAN: header ini hanya bisa dipercaya bila diisi oleh proxy/platform Anda
 * (Vercel, Cloudflare, Nginx Anda sendiri). Tanpa proxy tepercaya, klien bisa memalsukannya.
 */
export function getClientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get("x-real-ip")?.trim() ||
    h.get("cf-connecting-ip")?.trim() ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** Hash identitas (nama/email) agar data pribadi tidak tersimpan mentah sebagai kunci di memori. */
export function hashKey(...parts: string[]): string {
  return createHash("sha256").update(parts.join("|").toLowerCase()).digest("hex").slice(0, 32);
}

/** Respons 429 standar. */
export function tooMany(r: RateLimitResult) {
  return NextResponse.json(
    { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
    { status: 429, headers: { "Retry-After": String(r.retryAfterSec), "Cache-Control": "no-store" } }
  );
}

/* Contoh pemakaian lengkap: lihat app/api/customer/route.ts */