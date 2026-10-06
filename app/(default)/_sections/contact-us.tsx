"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { BRANCHES } from '@/data/catalog';
import { MapPin } from 'lucide-react';

// Leaflet membutuhkan `window`, jadi harus dimuat hanya di sisi client
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-xl bg-gray-100 animate-pulse" />
  ),
});

function ContactUs() {
  const [email, setEmail] = useState('');
  const [activeLocationId, setActiveLocationId] = useState<number | undefined>(BRANCHES[0]?.id);

  const activeBranch = BRANCHES.find((branch) => branch.id === activeLocationId);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = () => {
    // Tambahkan logika langganan di sini (validasi, kirim ke API, dll.)
    console.log('Subscribing with email:', email);
    alert(`Terima kasih telah berlangganan, ${email}!`);
    setEmail('');
  };

  const openingHours = {
    Senin: "10:00 - 18:00",
    Selasa: "10:00 - 18:00",
    Rabu: "10:00 - 18:00",
    Kamis: "10:00 - 18:00",
    Jumat: "10:00 - 19:00",
    Sabtu: "09:00 - 17:00",
    Minggu: "Tutup",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4">Jam Buka</h3>
      <div className="space-y-1 bg-blue-300/30 p-1 rounded-xs">
        {Object.entries(openingHours).map(([day, hours]) => (
          <div key={day} className="flex justify-between text-sm">
            <span className="font-medium">{day}:</span>
            <span className={hours === "Tutup" ? "text-red-600" : "text-gray-600"}>{hours}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4 inline-flex">Cabang Kami <MapPin className="w-5 h-5 text-blue-500" /></h3>

      {/* Daftar cabang: klik untuk memusatkan peta pada cabang tersebut */}
      <div className="grid gap-1 sm:grid-cols-3">
        {BRANCHES.map((branch) => {
          const isActive = branch.id === activeLocationId;
          return (
            <button
              key={branch.id}
              type="button"
              onClick={() => setActiveLocationId(branch.id)}
              aria-pressed={isActive}
              className={`text-left rounded-lg border px-3 py-0.5 transition-colors cursor-pointer ${
                isActive
                  ? "border-amber-500 bg-amber-50"
                  : "hover:border-gray-300"
              }`}
            >
              <span className="block font-semibold text-sm">{branch.name}</span>
              {/* <span className="block text-xs text-gray-600 mt-1">{branch.address}</span> */}
            </button>
          );
        })}
      </div>

      {/* Peta dengan seluruh cabang */}
      <div className="px-0 pt-1 pb-3">
        <MapComponent
          locations={BRANCHES}
          onMarkerClick={setActiveLocationId}
          activeLocationId={activeLocationId}
        />
      </div>

      {/* Detail kontak cabang yang dipilih */}
      {activeBranch && (
        <div className="text-center text-base leading-normal pb-3 pt-4 px-4">
          <p className="font-semibold">{activeBranch.name}</p>
          <p>{activeBranch.address}</p>
          <p>
            Telepon: {activeBranch.phone} &middot; Email: {activeBranch.email}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Layanan: {activeBranch.features.join(", ")}
          </p>
        </div>
      )}

      <div className="@container">
        <div className="flex flex-col justify-end gap-6 px-2 pt-8 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
          <div className="flex flex-col gap-2 text-center">
            <h1
              className="text-black tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-180"
            >
              Tetap Update dengan Newsletter Kami
            </h1>
            <p className="text-black text-base font-normal leading-normal max-w-180">
              Dapatkan promo eksklusif dan info terbaru seputar layanan cuci mobil kami.
            </p>
          </div>
          <div className="flex flex-1 justify-center">
            <label className="flex flex-col min-w-40 h-14 max-w-120 flex-1 @[480px]:h-16">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-black focus:outline-0 focus:ring-0
                  bg-[#878787] border border-[#f3c334] focus:border-none h-full placeholder:text-gray-100 px-4 
                  rounded-r-none border-r-0 pr-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Button
                  className="rounded-r-xl rounded-l-none border-l-0 border-t border-r border-amber-200 bg-[#309be8] 
                  pr-2 flex min-w-21 max-w-120 cursor-pointer items-center justify-center overflow-hidden h-full px-4 
                  @[480px]:h-12 @[480px]:px-5 border-none text-[#181611] text-sm font-bold leading-normal 
                  tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                  onClick={handleSubscribe}
                >
                  <span className="truncate">Berlangganan</span>
                </Button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;