'use client';
import { useState } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full aspect-video overflow-hidden border border-white/10 select-none">
      {/* Lapisan Setelah */}
      <div className="absolute inset-0 bg-emerald-950 flex items-center justify-center text-emerald-300 font-bold text-2xl">
        AFTER (Mobil Bersih &amp; Mengkilap)
      </div>

      {/* Lapisan Sebelum */}
      <div
        className="absolute inset-0 bg-stone-900 flex items-center justify-center text-amber-600 font-bold text-2xl border-r border-white"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        BEFORE (Mobil Kotor &amp; Berdebu)
      </div>

      {/* Tag */}
      <span className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-black/70 text-amber-200 text-sm font-semibold rounded">Before</span>
      <span className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-black/70 text-emerald-200 text-sm font-semibold rounded">After</span>

      {/* Control Range Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        aria-label="Bandingkan sebelum dan sesudah"
      />
    </div>
  );
}