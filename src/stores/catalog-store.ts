"use client";

import { useEffect, useSyncExternalStore } from "react";
import { BRANCHES, SERVICES, VEHICLES as LOCAL_VEHICLES } from "@/data/catalog";
import { catalogResponseSchema, catalogVersionSchema, type Catalog } from "@/lib/schemas";

/* ---------------- 1. Instant Shell: data lokal /data ---------------- */
export const DEFAULT_CATALOG: Catalog = {
  vehicles: LOCAL_VEHICLES.map((v) => ({ id: v.id, name: v.name, mult: v.mult })),
  services: SERVICES.map((s) => ({
    id: s.id,
    name: s.name,
    basePrice: s.price,
    duration: s.duration,
    desc: s.desc,
    imageUrl: s.image,
    features: s.features || [],
    tags: s.tags || [],
    mode: s.mode,
    cls: s.cls,
    flag: s.flag || "",
  })),
  branches: BRANCHES.map((b) => ({
    id: b.id,
    name: b.name,
    address: b.address,
    phone: b.phone ?? "0812 0000 0000",
  })),
};

type State = {
  catalog: Catalog;
  version: string | null; // null = data lokal bawaan (versi tidak diketahui)
  synced: boolean; // true = sudah dikonfirmasi sama dengan server
};

const INITIAL_STATE: State = { catalog: DEFAULT_CATALOG, version: null, synced: false };

/* ---------------- 2. In-Memory store (level modul) ---------------- */
let state: State = INITIAL_STATE;
const listeners = new Set<() => void>();

function setState(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

/* ---------------- 3. Cache persisten (opsional, tahan refresh) ---------------- */
const STORAGE_KEY = "catalog:v1";
let storageLoaded = false;

function loadFromStorage() {
  if (storageLoaded) return;
  storageLoaded = true;
  if (state.version !== null) return; // memori sudah lebih segar
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = catalogResponseSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return;
    const { version, ...catalog } = parsed.data;
    setState({ catalog: catalog as Catalog, version, synced: false });
  } catch {
    /* storage diblokir / JSON rusak: abaikan */
  }
}

function saveToStorage(data: unknown) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota penuh / private mode: abaikan */
  }
}

/* ---------------- 4. Revalidasi berbasis versi (SWR) ---------------- */
const MIN_CHECK_INTERVAL = 30_000; // jangan cek versi lebih sering dari 30 dtk
let inflight: Promise<void> | null = null;
let lastCheck = 0;

export function revalidateCatalog(force = false): Promise<void> {
  if (inflight) return inflight; // dedupe: semua komponen berbagi 1 request
  if (!force && Date.now() - lastCheck < MIN_CHECK_INTERVAL) return Promise.resolve();
  lastCheck = Date.now();

  inflight = (async () => {
    try {
      // Langkah ringan: hanya versi
      const vRes = await fetch("/api/catalog/version", { cache: "no-store" });
      if (!vRes.ok) return;
      const v = catalogVersionSchema.safeParse(await vRes.json());
      if (!v.success) return;

      // Versi sama -> tidak ada fetch berat
      if (v.data.version === state.version) {
        if (!state.synced) setState({ ...state, synced: true });
        return;
      }

      // Versi beda -> ambil katalog penuh
      const res = await fetch("/api/catalog", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      const parsed = catalogResponseSchema.safeParse(json);
      if (!parsed.success) return;

      // Simpan versi dari respons katalog itu sendiri (bukan dari endpoint versi),
      // agar data & versi selalu konsisten walau DB berubah di antara dua request.
      const { version, ...catalog } = parsed.data;
      setState({ catalog: catalog as Catalog, version, synced: true });
      saveToStorage(parsed.data);
    } catch {
      /* offline / error jaringan: tetap tampilkan data yang ada */
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

/* ---------------- 5. Hook untuk komponen ---------------- */
export function useCatalog() {
  // getServerSnapshot = INITIAL_STATE -> SSR & hidrasi selalu identik (tanpa mismatch)
  const s = useSyncExternalStore(subscribe, () => state, () => INITIAL_STATE);

  useEffect(() => {
    loadFromStorage();
    revalidateCatalog();

    const onVisible = () => {
      if (document.visibilityState === "visible") revalidateCatalog();
    };
    const onOnline = () => revalidateCatalog(true);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onOnline);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  return s; // { catalog, version, synced }
}