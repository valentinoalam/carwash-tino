"use client";

import { useSyncExternalStore } from "react";
import { z } from "zod";

/**
 * Profil customer MILIK PENGGUNA SENDIRI di localStorage perangkatnya (untuk isi otomatis form).
 * Dipakai bersama oleh Header (login/logout) dan Book (isi otomatis form), tanpa props:
 * semua komponen berlangganan store ini lewat useCustomerProfile().
 *
 * - Hanya 1 profil (orang yang terakhir masuk / terakhir submit di perangkat ini).
 * - Kedaluwarsa otomatis setelah 90 hari.
 * - Skema sengaja longgar (tanpa regex format) agar data lama dari Sheet tetap bisa dipakai.
 * - Sinkron antar tab lewat event "storage".
 */

const KEY = "customer:profile:v1";
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

export const customerProfileSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(120),
  phoneNumber: z.string().trim().max(20),
  vehicleTypeId: z.string().trim().max(40),
  vehicleBrand: z.string().trim().max(60),
  licensePlate: z.string().trim().max(16),
});
export type CustomerProfile = z.infer<typeof customerProfileSchema>;

const storedSchema = z.object({ v: z.literal(1), savedAt: z.number(), profile: customerProfileSchema });

/* ---------------- Store ---------------- */

let cache: CustomerProfile | null | undefined; // undefined = belum dibaca dari localStorage
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function readStorage(): CustomerProfile | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = storedSchema.safeParse(JSON.parse(raw));
    if (!parsed.success || Date.now() - parsed.data.savedAt > TTL_MS) {
      localStorage.removeItem(KEY); // rusak / kedaluwarsa
      return null;
    }
    return parsed.data.profile;
  } catch {
    return null; // storage diblokir / JSON rusak
  }
}

/** Snapshot stabil (objek yang sama selama tidak berubah), syarat useSyncExternalStore. */
export function getProfile(): CustomerProfile | null {
  if (cache === undefined) cache = readStorage();
  return cache;
}

/** Simpan profil. Mengembalikan profil yang tersimpan (sudah dinormalisasi), atau null bila tidak valid. */
export function saveProfile(p: CustomerProfile): CustomerProfile | null {
  const parsed = customerProfileSchema.safeParse(p);
  if (!parsed.success) return null;
  cache = parsed.data; // tetap berlaku selama sesi walau localStorage gagal (quota / private mode)
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: 1, savedAt: Date.now(), profile: parsed.data }));
  } catch {
    /* abaikan */
  }
  emit();
  return parsed.data;
}

export function clearProfile() {
  cache = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* abaikan */
  }
  emit();
}

function onStorage(e: StorageEvent) {
  if (e.key === KEY || e.key === null) {
    cache = undefined; // dibaca ulang dari localStorage
    emit();
  }
}

export function subscribeProfile(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

/** Hook: profil saat ini. `null` di server dan saat hidrasi (tanpa mismatch), lalu terisi di browser. */
export function useCustomerProfile() {
  return useSyncExternalStore(subscribeProfile, getProfile, () => null);
}

/* ---------------- Event lintas komponen (pola sama dengan PICK_SERVICE_EVENT) ---------------- */

export const OPEN_LOGIN_EVENT = "customer:open-login";
export const GUEST_EVENT = "customer:guest";

/** Minta Header membuka dialog login (mis. dari tombol "Masuk" di halaman Book). */
export const openLoginDialog = () => window.dispatchEvent(new Event(OPEN_LOGIN_EVENT));

/** Dialog -> Book: customer belum terdaftar, isi nama & email ke form untuk diisi manual. */
export const announceGuest = (name: string, email: string) =>
  window.dispatchEvent(new CustomEvent(GUEST_EVENT, { detail: { name, email } }));