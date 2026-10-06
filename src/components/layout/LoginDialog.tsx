"use client";

import { useEffect, useId, useRef, useState } from "react";
import { customerLookupQuerySchema, customerLookupResponseSchema, toFieldErrors } from "@/lib/schemas";
import { announceGuest, saveProfile, type CustomerProfile } from "@/lib/customer-profile";

const inputCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/15 aria-[invalid=true]:border-red-500";

type Status = "idle" | "loading" | "none" | "limited" | "error";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CustomerLoginDialog({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [retryAfter, setRetryAfter] = useState(60);

  // <dialog> native: focus trap, tombol Esc, dan lapisan atas (top layer) sudah ditangani browser.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setName("");
      setEmail("");
      setFieldErrors({});
      setStatus("idle");
      d.showModal();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  /** Login berhasil: simpan profil ke store (localStorage). Halaman Book otomatis terisi lewat store. */
  function handleLoggedIn(profile: CustomerProfile) {
    saveProfile(profile);
    onClose();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    const q = customerLookupQuerySchema.safeParse({ name, email });
    if (!q.success) {
      setFieldErrors(toFieldErrors(q.error));
      return;
    }
    setFieldErrors({});
    setStatus("loading");

    try {
      const res = await fetch(
        `/api/customer?name=${encodeURIComponent(q.data.name)}&email=${encodeURIComponent(q.data.email)}`,
        { cache: "no-store" }
      );
      if (res.status === 429) {
        setRetryAfter(Number(res.headers.get("Retry-After")) || 60);
        return setStatus("limited");
      }
      const parsed = customerLookupResponseSchema.safeParse(await res.json());
      if (!res.ok || !parsed.success) return setStatus("error");

      if (!parsed.data.customer) return setStatus("none");
      handleLoggedIn({ name: q.data.name, email: q.data.email, ...parsed.data.customer });
    } catch {
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // klik di backdrop
      }}
      className="m-auto w-[min(92vw,26rem)] rounded-2xl p-0 shadow-xl backdrop:bg-black/50"
    >
      <form onSubmit={submit} className="flex flex-col gap-4 p-6" noValidate>
        <div>
          <h3 id={titleId} className="text-lg font-semibold">
            Masuk
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Masukkan nama dan email yang pernah Anda pakai saat booking. Data diri dan kendaraan akan terisi otomatis.
          </p>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Nama lengkap</span>
          <input
            className={inputCls}
            type="text"
            autoComplete="name"
            autoFocus
            value={name}
            aria-invalid={!!fieldErrors.name}
            onChange={(e) => setName(e.target.value)}
          />
          {fieldErrors.name && (
            <span role="alert" className="text-xs text-red-600">
              {fieldErrors.name}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Email</span>
          <input
            className={inputCls}
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            value={email}
            aria-invalid={!!fieldErrors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email && (
            <span role="alert" className="text-xs text-red-600">
              {fieldErrors.email}
            </span>
          )}
        </label>

        <div aria-live="polite" className="min-h-5 text-sm">
          {status === "none" && (
            <div className="flex flex-col gap-2 text-gray-700">
              <span>Data belum ditemukan. Anda bisa mengisi form secara manual; datanya kami simpan untuk booking berikutnya.</span>
              <button
                type="button"
                className="self-start font-medium underline"
                onClick={() => {
                  const q = customerLookupQuerySchema.safeParse({ name, email });
                  if (q.success) announceGuest(q.data.name, q.data.email);
                  onClose();
                }}
              >
                Isi manual dengan nama &amp; email ini
              </button>
            </div>
          )}
          {status === "limited" && (
            <span className="text-red-600">Terlalu banyak percobaan. Coba lagi dalam {retryAfter} detik.</span>
          )}
          {status === "error" && <span className="text-red-600">Gagal memeriksa data. Coba lagi sebentar.</span>}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
            onClick={onClose}
          >
            Batal
          </button>
          <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Memeriksa…" : "Masuk"}
          </button>
        </div>
      </form>
    </dialog>
  );
}