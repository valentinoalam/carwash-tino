"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, CheckCircle, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shadcn/card";
import { Badge } from "@shadcn/badge";
import { Input } from "@shadcn/input";
import { Alert, AlertDescription } from "@shadcn/alert";
import { CFG, PICK_SERVICE_EVENT, VEHICLES as LOCAL_VEHICLES } from "@/data/catalog";
import { fmt, waLink } from "@/lib/format";
import {
  customerLookupQuerySchema,
  customerLookupResponseSchema,
  makeBookingFormSchema,
  normalizePhone,
  toFieldErrors,
  pad2,
  toIso,
  prettyDate,
  HOURS,
  type BookingFormInput,
  type Service,
  type Vehicle,
} from "@/lib/schemas";
import { 
  DEFAULT_CATALOG, 
  // useCatalog 
} from "@/stores/catalog-store";
import {
  GUEST_EVENT,
  saveProfile,
  useCustomerProfile,
  type CustomerProfile,
} from "@/lib/customer-profile";
import { useSearchParams } from "next/navigation";

/* ---------- Turunan dari katalog ---------- */
const calcPrice = (s: Service, v: Vehicle) => Math.round(s.basePrice * v.mult);
const svgFor = (id: string) => LOCAL_VEHICLES.find((v: Vehicle) => v.id === id)?.svg ?? "";


type Form = BookingFormInput;
type Errors = Partial<Record<keyof Form, string>>;

/* ---------- Komponen kecil untuk field ---------- */

const inputCls =
  "w-full rounded-xl border border-zinc-700 bg-zinc-950/60 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition [color-scheme:dark] hover:border-zinc-600 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15";

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: React.ReactNode | string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
        {label}
        {optional && <span className="ml-1 font-normal normal-case tracking-normal text-zinc-500">(optional)</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="text-xs text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}

/* ---------- Komponen utama ---------- */

export default function BookPage() {
  const searchParams = useSearchParams();
  const selectedSvc = searchParams.get('svc');
  /* Katalog: Instant Shell (/data) -> In-Memory / localStorage -> revalidasi berbasis versi.
     Semua logika fetch/versi ada di lib/catalog-store.ts. */
  // const { catalog, synced } = useCatalog();
  const catalog = DEFAULT_CATALOG;
  const [vehId, setVehId] = useState(LOCAL_VEHICLES[1].id);
  // Kosong = belum ada layanan dipilih (panel #selected-service menampilkan tampilan default).
  const [svcId, setSvcId] = useState<string>(selectedSvc?? "");
  const [svcError, setSvcError] = useState(false);
  /* Waktu hanya dibaca di browser (useEffect) agar SSR & hidrasi identik (tanpa mismatch zona waktu). */
  const now = new Date();
  const clock: { today: string; hour: number } | null = { today: toIso(now), hour: now.getHours() };
  const currentHour = clock?.hour ?? -1; // new Date().getHours();
  const next = HOURS.find((h) => h === currentHour)?? HOURS.find((h) => h > currentHour); // Jam yang sudah lewat dinonaktifkan bila tanggal = hari ini.
  
  const [form, setForm] = useState<Form>({
    branchId: catalog.branches[0]?.id ?? "", 
    date: toIso(new Date(now.getTime() + 864e5)) ?? "", // default = hari ini (format harus "YYYY-MM-DD")
    time: pad2(next||0), // default = besok -> jam pertama (format harus "HH:00")
    name: "",
    phoneNumber: "",
    email: "",
    vehicleBrand: "",
    licensePlate: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const isToday = !!clock && form.date === clock.today; // berdasarkan tanggal yang DIPILIH, bukan konstanta

  /* ---------- Profil customer ---------- */
  // Login/logout terjadi di Header (CustomerLoginDialog). Halaman ini hanya bereaksi terhadap
  // perubahan profil di store (lib/customer-profile.ts), tanpa props.
  const profile = useCustomerProfile();
  const appliedRef = useRef<CustomerProfile | null>(null); // profil yang terakhir diterapkan ke form
  // Tipe kendaraan dari profil, menunggu katalog (bisa belum memuat data terbaru dari server).
  const pendingVehRef = useRef<string | null>(null);
 
  const applyProfile = useCallback((p: CustomerProfile) => {
    setForm((f) => ({
      ...f,
      name: p.name,
      email: p.email,
      phoneNumber: p.phoneNumber,
      vehicleBrand: p.vehicleBrand,
      licensePlate: p.licensePlate.toUpperCase(),
    }));
    setErrors((e) => ({
      ...e,
      name: undefined,
      email: undefined,
      phoneNumber: undefined,
      vehicleBrand: undefined,
      licensePlate: undefined,
    }));
    pendingVehRef.current = p.vehicleTypeId || null; // diselesaikan oleh rekonsiliasi katalog di bawah
  }, []);
 
  useEffect(() => {
    if (profile) {
      if (profile !== appliedRef.current) {
        appliedRef.current = profile;
        applyProfile(profile); // login di Header / profil tersimpan sebelumnya / tab lain
      }
    } else if (appliedRef.current) {
      // Keluar (dari Header atau dari halaman ini): kosongkan isian diri.
      appliedRef.current = null;
      pendingVehRef.current = null;
      setForm((f) => ({ ...f, name: "", email: "", phoneNumber: "", vehicleBrand: "", licensePlate: "" }));
    }
  }, [profile, applyProfile]);

   // Dialog login: customer belum terdaftar -> isi nama & email, sisanya diisi manual.
  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<{ name: string; email: string }>).detail;
      if (d) setForm((f) => ({ ...f, name: d.name, email: d.email }));
    };
    window.addEventListener(GUEST_EVENT, handler);
    return () => window.removeEventListener(GUEST_EVENT, handler);
  }, []);
 
  /* Rekonsiliasi pilihan user setiap katalog berubah (satu aturan, satu tempat).
     Daftar kosong (mis. Sheet salah isi) diabaikan: pilihan user dipertahankan, bukan dikosongkan. */
  // useEffect(() => {
  //   // Pilihan yang sudah tidak ada di katalog dikosongkan; yang masih valid (atau masih kosong) dibiarkan.
  //   const keep = (list: { id: string }[], cur: string) => (list.some((x) => x.id === cur) ? cur : "");
 
  //   if (catalog.vehicles.length) {
  //     const pending = pendingVehRef.current;
  //     if (pending && catalog.vehicles.some((x) => x.id === pending)) {
  //       setVehId(pending);
  //       pendingVehRef.current = null;
  //     } else {
  //       setVehId((cur) => keep(catalog.vehicles, cur));
  //       if (pending && synced) pendingVehRef.current = null; // katalog sudah final & id tidak ada -> lepas
  //     }
  //   }
  //   if (catalog.services.length) {
  //     setSvcId((cur) => keep(catalog.services, cur));
  //   }
  //   if (catalog.branches.length) {
  //     setForm((f) =>
  //       catalog.branches.some((x) => x.id === f.branchId) ? f : { ...f, branchId: catalog.branches[0].id }
  //     );
  //   }
  // }, [catalog, synced, profile]);

  /* Event Listener untuk Pilihan Service dari Luar Komponen */
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) setSvcId(id);
    };
    window.addEventListener(PICK_SERVICE_EVENT, handler);
    return () => window.removeEventListener(PICK_SERVICE_EVENT, handler);
  }, []);
  
  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  /* ---------- Autocomplete customer (nama + email) ---------- */
  /* Lookup Customer (Hanya dipanggil jika Nama + Email Valid) */
  const [lookup, setLookup] = useState<"idle" | "loading" | "found" | "none">("idle");
  const lastKey = useRef(""); // agar tidak fetch ulang & tidak menimpa edit manual pengguna
  const vehicles = useMemo(() => catalog.vehicles, [catalog.vehicles]);

  useEffect(() => {
    const turnback = () => {
      lastKey.current = "";
      setLookup("idle");
    }
    const q = customerLookupQuerySchema.safeParse({ name: form.name, email: form.email });
    if (!q.success) {
      turnback()
      return;
    }
    const { name, email } = q.data; // nama sudah di-trim, email sudah huruf kecil
    const key = `${name.toLowerCase().replace(/\s+/g, " ")}|${email}`;
    if (key === lastKey.current) return;

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLookup("loading");
      try {
        const res = await fetch(`/api/customer?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`, {
          signal: ctrl.signal,
        });
        const parsed = customerLookupResponseSchema.safeParse(await res.json());
        if (!res.ok || !parsed.success) return setLookup("idle");
        const { customer } = parsed.data;
        lastKey.current = key;
        if (!customer) return setLookup("none");

        setForm((f) => ({
          ...f,
          phoneNumber: customer.phoneNumber || f.phoneNumber,
          vehicleBrand: customer.vehicleBrand || f.vehicleBrand,
          licensePlate: (customer.licensePlate || f.licensePlate).toUpperCase(),
        }));
        if (vehicles.some((v) => v.id === customer.vehicleTypeId)) setVehId(customer.vehicleTypeId);
        setErrors((e) => ({ ...e, phoneNumber: undefined, vehicleBrand: undefined, licensePlate: undefined }));
        setLookup("found");
      } catch (err) {
        if ((err as Error).name !== "AbortError") setLookup("idle");
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [form.name, form.email, vehicles]);

  /* ---------- Turunan ---------- */

  const veh = catalog?.vehicles.find((v) => v.id === vehId);
  const svc = catalog?.services.find((s) => s.id === svcId);
  const branch = catalog?.branches.find((b) => b.id === form.branchId);
  const target = svc && veh ? calcPrice(svc, veh) : 0;

  // Animasi angka harga menuju target.
  const [shownPrice, setShownPrice] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = shownPrice;
    const dur = 600;
    function step(now: number) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setShownPrice(from + (target - from) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const booking = useMemo(
    () => ({
      branch: branch?.name ?? "",
      branchAddress: branch?.address ?? "",
      preferredDate: form.date,
      preferredTime: form.time,
      selectedService: svc?.name ?? "",
      serviceDuration: svc?.duration ?? "",
      estimatedPrice: target,
      name: form.name.trim(),
      phoneNumber: normalizePhone(form.phoneNumber),
      email: form.email.trim().toLowerCase(),
      vehicleTypeId: veh?.id ?? "",
      vehicleModel: veh?.name ?? "", // dipilih lewat kartu kendaraan (.veh)
      vehicleBrand: form.vehicleBrand.trim(),
      licensePlate: form.licensePlate.trim().toUpperCase(),
      notes: form.notes.trim(),
    }),
    [branch, form, svc, veh, target]
  );

  const bookMsg = [
    `Hi ${CFG.brand}, I would like to make a booking:`,
    ``,
    `*Branch:* ${booking.branch || "-"}`,
    `*Preferred Date:* ${prettyDate(booking.preferredDate) || "-"}`,
    `*Preferred Time:* ${booking.preferredTime || "-"}`,
    `*Service:* ${booking.selectedService || "-"} (${booking.serviceDuration || "-"})`,
    `*Estimated Price:* ${fmt(booking.estimatedPrice)}`,
    ``,
    `*Name:* ${booking.name || "-"}`,
    `*Phone:* ${booking.phoneNumber || "-"}`,
    `*Email:* ${booking.email || "-"}`,
    ``,
    `*Vehicle Model:* ${booking.vehicleModel || "-"}`,
    `*Vehicle Brand:* ${booking.vehicleBrand || "-"}`,
    `*License Plate:* ${booking.licensePlate || "-"}`,
    ``,
    `*Special Requests / Notes:* ${booking.notes || "-"}`,
  ].join("\n");

  const generalMsg = `Hi ${CFG.brand}, I have a question about a car wash.`;

  // Sinkronkan tombol WhatsApp di dock mobile (di luar React tree ini).
  useEffect(() => {
    const dockWa = document.getElementById("waDock") as HTMLAnchorElement | null;
    if (dockWa) dockWa.href = waLink(generalMsg);
  }, [generalMsg]);

  function handleBook() {
    const parsed = makeBookingFormSchema(new Date()).safeParse(form);
    const errs: Errors = parsed.success ? {} : (toFieldErrors(parsed.error) as Errors);
    setErrors(errs);
    setSubmitted(true);
    const missingSvc = !svc;
    setSvcError(missingSvc);
    const firstKey = missingSvc ? "service" : Object.keys(errs)[0];
    if (firstKey) {
      const el = document.querySelector<HTMLElement>(`[data-field="${firstKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }
    if (!svc || !veh) return;

    // Simpan data milik customer ini di perangkatnya agar form terisi otomatis pada kunjungan berikutnya.
    const mine: CustomerProfile = {
      name: booking.name,
      email: booking.email,
      phoneNumber: booking.phoneNumber,
      vehicleTypeId: booking.vehicleTypeId,
      vehicleBrand: booking.vehicleBrand,
      licensePlate: booking.licensePlate,
    };
    const saved = saveProfile(mine);
    if (saved) appliedRef.current = saved; // sudah sama dengan isi form; jangan diterapkan ulang

    // Simpan / perbarui customer di sheet "customer" (tidak menghalangi pembukaan WhatsApp).
    fetch("/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        name: booking.name,
        email: booking.email,
        phoneNumber: booking.phoneNumber,
        vehicleTypeId: booking.vehicleTypeId,
        vehicleBrand: booking.vehicleBrand,
        licensePlate: booking.licensePlate,
      }),
    }).catch(() => {});

    window.open(waLink(bookMsg), "_blank", "noopener");
  }

  const hasErrors = submitted && Object.values(errors).some(Boolean);

  /* ---------- Tampilan panel layanan terpilih ---------- */

  const HERO_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBDewAzSsYLVpvuA4RzkfMRwWg7Ft0VRJWjGjRKno4yYWJzZWd-gpJav37wq6wGP1dmYxZ-rChsyHIYCDYkmfhQ668EG_RKDQx5NBPqFawX35ZzjEtVgfYV5GI2-iZO8NPGGPgpG_4HvzzqPsNqXs0n57swdbmfGOIbmgjWrozPQfwjLh50eGk_R3K1IIDFrEKkKSt7g7_xXHGNC_m48SnPsk_QGw2vvfZoYs43ZP7X2c882inj0nD1eM-jZj6-YQcfkKUJ_LSMctdn";

  // const panelBg = svc
  //   ? svc.imageUrl
  //     ? `linear-gradient(180deg, rgba(9,9,11,0.10) 0%, rgba(9,9,11,0.55) 45%, rgba(9,9,11,0.96) 100%), url("${svc.imageUrl.replace(/"/g, "%22")}")`
  //     : "linear-gradient(135deg, #3f3f46 0%, #18181b 55%, #09090b 100%)"
  //   : `linear-gradient(rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%), url("${HERO_IMG}")`;
  const activeImageUrl = svc ? svc.imageUrl : HERO_IMG;
  const chip =
    "rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium capitalize text-zinc-100 backdrop-blur";
  const statLabel = "text-[11px] font-medium uppercase tracking-wider text-zinc-400";
  const legendCls = "mb-3 px-1 text-sm font-semibold tracking-wide text-white";
  const cardCls = "rounded-2xl border border-white/10 bg-white/[0.03] p-5";

  /* ---------- Render ---------- */
  if (submitted && !hasErrors) {
    return (
      <div className="flex flex-1 justify-center items-center py-20 bg-gray-50 min-h-screen">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Berhasil!</h2>
            <p className="text-gray-600 mb-4">Janji temu Anda telah dikonfirmasi. Kami akan menghubungi Anda segera.</p>
            <Badge variant="secondary" className="mb-4">
              {form.date &&
                `${form.date}`}{" "}
              • {form.time} • {svc?.name} • {veh?.name} • {fmt(target)}
            </Badge>
            <Button onClick={() => setSubmitted(false)} className="w-full">
              Buat Booking Lain
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <section id="book" className="@container sec book">
      <div className="flex flex-1 flex-col gap-8 px-4 mt-16 py-8 lg:flex-row lg:items-start lg:justify-around">
        {/* ============ KOLOM KIRI: pilihan & data diri ============ */}
        <Card className="w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-900/90 p-6 text-white shadow-2xl shadow-black/40 sm:p-8">
          <CardHeader className="w-full mx-0 px-0 mb-6">
          <CardTitle className="mb-2 text-4xl font-extrabold tracking-tight">Book Your Wash</CardTitle>
          <CardDescription className="mb-8 text-zinc-400">Pilih jenis kendaraan dan layanan Anda.</CardDescription>
          </CardHeader>
          <CardContent className="w-full mx-0 px-0 space-y-6">
            <fieldset className="pick mb-8">
              <legend className={legendCls}>Your vehicle</legend>
              <div className="veh grid grid-cols-2 gap-3 md:grid-cols-4">
                {catalog.vehicles.map((v) => (
                  <label
                    key={v.id}
                    className={`cursor-pointer rounded-xl border p-3 text-center font-medium transition has-focus-visible:ring-2 has-focus-visible:ring-amber-400/60 ${
                      vehId === v.id
                        ? "border-amber-400 bg-amber-400/10 text-amber-300 shadow-[0_0_24px_-8px] shadow-amber-400/50"
                        : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    <input className="sr-only" type="radio" name="veh" value={v.id} checked={vehId === v.id} onChange={() => setVehId(v.id)} />
                    <span className="tile">
                      <span dangerouslySetInnerHTML={{ __html: svgFor(v.id) }} />
                      <span>{v.name}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="pick mb-8" data-field="service" tabIndex={-1}>
              <legend className={legendCls}>Your service</legend>
              <div className="svc-list space-y-2">
                {catalog.services.map((s) => {
                  const active = svcId === s.id;
                  return (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-stretch justify-between gap-4 rounded-xl border p-4 transition has-focus-visible:ring-2 has-focus-visible:ring-amber-400/60 ${
                        active
                          ? "border-amber-400 bg-amber-400/10 shadow-[0_0_24px_-8px] shadow-amber-400/50"
                          : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
                      }`}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        name="svc"
                        value={s.id}
                        checked={active}
                        onChange={() => {
                          setSvcId(s.id);
                          setSvcError(false);
                        }}
                      />
                      {/* <span
                        aria-hidden="true"
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] font-bold transition ${
                          active ? "border-amber-400 bg-amber-400 text-zinc-950" : "border-zinc-600"
                        }`}
                      >
                        {active && "✓"}
                      </span> */}
                      <span className="flex flex-1 flex-col gap-0.5">
                        <span className="font-bold text-base text-white leading-tight">{s.name}</span>
                        <span className="text-sm  font-normal leading-normal text-[#5a778c]">{s.duration}</span>
                      </span>
                      <span className="font-semibold tabular-nums text-amber-400">{veh ? fmt(calcPrice(s, veh)) : ""}</span>
                    </label>
                  );
                })}
              </div>
              {svcError && (
                <Alert variant="destructive" role="alert">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="mt-2 text-xs text-red-400">
                    Pilih salah satu layanan terlebih dahulu.
                  </AlertDescription>
                </Alert>
              )}
            </fieldset>
            
            <fieldset className={`pick mb-6 ${cardCls}`}>
              <legend className={`${legendCls} mb-0`}>Your details</legend>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input
                    data-field="name"
                    className={inputCls}
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Budi Santoso"
                    value={form.name}
                    aria-invalid={!!errors.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <Input
                    data-field="email"
                    className={inputCls}
                    type="email"
                    autoComplete="email"
                    placeholder="nama@email.com"
                    value={form.email}
                    aria-invalid={!!errors.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </Field>

                <p className="-mt-1 min-h-5 text-xs text-zinc-400 sm:col-span-2" aria-live="polite">
                  {lookup === "loading" && "Mencari data Anda…"}
                  {lookup === "found" && "Data Anda ditemukan. Nomor telepon, kendaraan, merek, dan plat terisi otomatis. Silakan cek dan ubah bila perlu."}
                  {lookup === "none" && "Belum ada data sebelumnya. Lengkapi form di bawah, kami simpan untuk booking berikutnya."}
                </p>

                <div className="sm:col-span-2">
                  <Field label="Phone / WhatsApp" error={errors.phoneNumber}>
                    <Input
                      data-field="phoneNumber"
                      className={inputCls}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="0812 3456 7890"
                      value={form.phoneNumber}
                      aria-invalid={!!errors.phoneNumber}
                      onChange={(e) => set("phoneNumber", e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </fieldset>

            <fieldset className={`pick ${cardCls}`}>
              <legend className={`${legendCls} mb-0`}>Vehicle information</legend>
              <p className="mb-4 mt-3 text-sm text-zinc-400">
                Model kendaraan dipilih pada kartu “Your vehicle” di atas
                {veh ? <> (saat ini: <span className="font-semibold text-amber-300">{veh.name}</span>)</> : ""}.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Brand" error={errors.vehicleBrand}>
                  <input
                    data-field="vehicleBrand"
                    className={inputCls}
                    type="text"
                    placeholder="e.g. Toyota"
                    value={form.vehicleBrand}
                    aria-invalid={!!errors.vehicleBrand}
                    onChange={(e) => set("vehicleBrand", e.target.value)}
                  />
                </Field>
                <Field label="License plate" error={errors.licensePlate}>
                  <input
                    data-field="licensePlate"
                    className={`${inputCls} uppercase tracking-widest`}
                    type="text"
                    autoCapitalize="characters"
                    placeholder="B 1234 ABC"
                    maxLength={12}
                    value={form.licensePlate}
                    aria-invalid={!!errors.licensePlate}
                    onChange={(e) => set("licensePlate", e.target.value.toUpperCase())}
                  />
                </Field>
              </div>
            </fieldset>
          </CardContent>
        </Card>

        {/* ============ KOLOM KANAN: layanan terpilih, jadwal, dock ============ */}
        <Card className="book-panel flex w-full max-w-2xl flex-col gap-5 rounded-2xl border border-white/10 bg-zinc-900/90 p-4 text-white shadow-2xl shadow-black/40 sm:p-6">
          <CardHeader
            id="selected-service"
            aria-live="polite"
            className="relative flex min-h-120 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-800 bg-cover bg-center bg-no-repeat p-6 transition-[background] duration-500"
          >
            {/* Background Image & Overlay */}
            {activeImageUrl && (
              <>
                <Image
                  src={activeImageUrl}
                  alt={svc?.name || "Background-carwash"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={!svc} // Priority load default hero image
                  className="object-cover object-center transition-opacity duration-500"
                />
                
                {/* Gradient Overlay */}
                <div 
                  aria-hidden="true" 
                  className={`absolute inset-0 pointer-events-none ${
                    svc
                      ? "bg-linear-to-b from-[rgba(9,9,11,0.10)] via-[rgba(9,9,11,0.55)] to-[rgba(9,9,11,0.96)]"
                      : "bg-linear-to-b from-black/25 to-black/65"
                  }`}
                />
              </>
            )}
            {!svc ? (
              /* ---- Default: belum ada layanan dipilih ---- */
              <div className="m-auto z-10 flex max-w-sm flex-col items-center gap-3 text-center">
                <Badge className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Premium Care
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight">Book Your Wash</h2>
                <p className="text-zinc-200">Choose your vehicle and service. The estimate updates as you go.</p>
                <p className="mt-2 text-xs text-zinc-400">Pilih salah satu layanan untuk melihat detailnya di sini.</p>
              </div>
            ) : (
              /* ---- Layanan terpilih: gambar + seluruh detail ---- */
              <div className="mt-auto flex flex-col gap-4 z-10">
                <div className="flex flex-wrap items-center gap-2">
                  {svc.flag && (
                    <Badge className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-950">
                      {String(svc.flag)}
                    </Badge>
                  )}
                  {svc.mode && <span className={chip}>{String(svc.mode)}</span>}
                  {svc.cls && <span className={chip}>{String(svc.cls)}</span>}
                </div>

                <h3 className="text-3xl font-extrabold leading-tight tracking-tight">{svc.name}</h3>
                {svc.desc && <p className="text-sm leading-relaxed text-zinc-300">{svc.desc}</p>}

                <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 text-center">
                  <div className="bg-zinc-950/75 p-3 backdrop-blur">
                    <dt className={statLabel}>Durasi</dt>
                    <dd className="mt-1 text-sm font-semibold">{svc.duration || "-"}</dd>
                  </div>
                  <div className="bg-zinc-950/75 p-3 backdrop-blur">
                    <dt className={statLabel}>Harga dasar</dt>
                    <dd className="mt-1 text-sm font-semibold tabular-nums">{fmt(svc.basePrice)}</dd>
                  </div>
                  <div className="bg-zinc-950/75 p-3 backdrop-blur">
                    <dt className={statLabel}>{veh ? `Untuk ${veh.name}` : "Harga"}</dt>
                    <dd className="mt-1 text-sm font-bold tabular-nums text-amber-400">{veh ? fmt(calcPrice(svc, veh)) : "-"}</dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => setSvcId("")}
                  className="self-start text-xs font-medium text-zinc-400 underline-offset-4 transition hover:text-white hover:underline"
                >
                  Ganti layanan
                </button>
              </div>
            )}
          </CardHeader>
          <CardContent>
          <div className="grid grid-cols-2 gap-3" aria-live="polite">
            <div className="rounded-xl border border-white/10 bg-zinc-950/50 p-4">
              <div className={statLabel}>Estimated price</div>
              <div className="mt-1 text-2xl font-bold tabular-nums text-amber-400">{svc ? fmt(shownPrice) : "—"}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-zinc-950/50 p-4">
              <div className={statLabel}>Time with us</div>
              <div className="mt-1 text-2xl font-bold text-white">{svc?.duration ?? "-"}</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Field label={<span>Cabang yang Dipilih</span>} error={errors.branchId}>
              <select
                data-field="branchId"
                className={inputCls}
                value={form.branchId}
                aria-invalid={!!errors.branchId}
                onChange={(e) => set("branchId", e.target.value)}
              >
                <option value="">Select a branch</option>
                {catalog.branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              {branch?.address && <span className="text-xs text-zinc-400"><MapPin className="w-5 h-5 text-blue-500" />{branch.address}</span>}
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Preferred date" error={errors.date}>
                <input
                  data-field="date"
                  className={inputCls}
                  type="date"
                  value={form.date}
                  min={clock?.today}
                  aria-invalid={!!errors.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </Field>
              <Field label="Preferred time" error={errors.time}>
                <select
                  data-field="time"
                  className={inputCls}
                  value={form.time}
                  aria-invalid={!!errors.time}
                  onChange={(e) => set("time", e.target.value)}
                >
                  {HOURS.map((h) => (
                    <option key={h} value={`${pad2(h)}:00`} disabled={isToday && h <= currentHour}>
                      {pad2(h)}:00
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Special requests or notes" optional>
              <textarea
                className={`${inputCls} min-h-24 resize-y`}
                rows={3}
                maxLength={500}
                placeholder="e.g. pet hair on the back seat, scratch on the left door"
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
              <span className="self-end text-xs text-zinc-500">{form.notes.length}/500</span>
            </Field>
          </div>

          {hasErrors && (
            <p role="alert" className="text-sm text-red-400">
              Lengkapi data yang ditandai sebelum melanjutkan.
            </p>
          )}
          <p className="text-xs leading-relaxed text-zinc-500">
            Booking opens a WhatsApp chat with your details filled in. We confirm the final price after a quick look at the car.
          </p>
          </CardContent>
          {/* ---- Dock: selalu terlihat, menempel di bawah panel saat scroll ---- */}
          <CardFooter
            id="book-dock"
            className="sticky bottom-4 z-30 flex flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-950/85 p-3 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:flex-row sm:items-center"
          >
            <div className="hidden min-w-0 flex-1 px-2 sm:block">
              <div className="truncate text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                {svc ? svc.name : "Belum ada layanan"}
              </div>
              <div className="truncate text-lg font-bold tabular-nums text-white">{svc ? fmt(target) : "—"}</div>
            </div>

            <Button
              type="button"
              id="bookBtn"
              disabled={!svc || !branch || submitted}
              onClick={handleBook}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 active:scale-[0.98] sm:flex-none"
            >
              Book Your Wash
            </Button>
            <Link
              id="waBtn"
              href={waLink(generalMsg)}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp Us"
            ><Button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 active:scale-[0.98] sm:flex-none">
              <MessageCircle />
              WhatsApp 
              </Button>
            </Link>
          </CardFooter>

        </Card>
      </div>
    </section>
  );
}