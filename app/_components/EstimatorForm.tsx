'use client';
import { useState } from 'react';
import { VEHICLES, SERVICES, formatCurrency, calculatePrice } from '@/data/services';
import { SITE_CONFIG } from '@/config/siteConfig';

export default function EstimatorForm() {
  const [selectedVeh, setSelectedVeh] = useState(VEHICLES[1].id);
  const [selectedSvc, setSelectedSvc] = useState(SERVICES[1].id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00');

  const vehObj = VEHICLES.find((v) => v.id === selectedVeh) || VEHICLES[1];
  const svcObj = SERVICES.find((s) => s.id === selectedSvc) || SERVICES[1];
  const estimatedPrice = calculatePrice(svcObj, vehObj);

  const whatsappMessage = encodeURIComponent(
    `Halo ${SITE_CONFIG.brand}, saya ingin memesan layanan ${svcObj.name} untuk mobil ${vehObj.name}.\n` +
    `Waktu kedatangan: ${date} jam ${time}.\n` +
    `Estimasi Biaya: ${formatCurrency(estimatedPrice)}.`
  );

  const waUrl = `https://wa.me/${SITE_CONFIG.waNumber}?text=${whatsappMessage}`;

  return (
    <div className="w-full max-w-2xl bg-zinc-900/90 p-8 rounded-lg border border-white/10 text-white">
      <h2 className="text-4xl font-extrabold mb-2">Book Your Wash</h2>
      <p className="text-zinc-400 mb-6">Pilih jenis kendaraan dan layanan Anda.</p>

      {/* Pilihan Kendaraan */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Pilih Kendaraan</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {VEHICLES.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelectedVeh(v.id)}
              className={`p-3 text-center border rounded font-medium transition ${
                selectedVeh === v.id ? 'border-amber-400 bg-amber-400/10 text-amber-300' : 'border-zinc-700 text-zinc-400'
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pilihan Layanan */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Pilih Layanan</label>
        <div className="space-y-2">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedSvc(s.id)}
              className={`flex justify-between items-center p-4 border rounded cursor-pointer transition ${
                selectedSvc === s.id ? 'border-amber-400 bg-amber-400/10' : 'border-zinc-800 bg-zinc-900'
              }`}
            >
              <div>
                <div className="font-bold text-white">{s.name}</div>
                <div className="text-sm text-zinc-400">{s.time}</div>
              </div>
              <div className="font-semibold text-amber-400">{formatCurrency(calculatePrice(s, vehObj))}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tanggal & Jam */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Tanggal</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded p-3 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Jam Kedatangan</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded p-3 text-white"
          >
            {['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ringkasan Estimasi & Tombol WA */}
      <div className="border-t border-zinc-800 pt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-sm text-zinc-400 block">Estimasi Biaya</span>
          <span className="text-3xl font-extrabold text-amber-400">{formatCurrency(estimatedPrice)}</span>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded flex items-center gap-2 transition"
        >
          Pesan via WhatsApp
        </a>
      </div>
    </div>
  );
}