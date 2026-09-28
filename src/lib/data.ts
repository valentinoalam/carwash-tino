// Data & konfigurasi bisnis. Ganti angka/nomor di sini untuk data asli.

export const CFG = {
  wa: "6281200000000", // Nomor WhatsApp, format internasional tanpa "+"
  currency: "Rp",
  brand: "Kilap",
};

export type Vehicle = {
  id: string;
  name: string;
  mult: number;
  svg: string; // markup SVG mentah untuk ikon kendaraan
};

export const VEHICLES: Vehicle[] = [
  {
    id: "city",
    name: "City car",
    mult: 0.85,
    svg: '<svg viewBox="0 0 120 50" aria-hidden="true"><path fill="currentColor" d="M8 36 L12 26 Q16 22 30 20 L42 12 Q48 9 62 9 L80 10 Q92 12 98 22 L108 25 Q113 28 112 36Z"/><circle cx="30" cy="37" r="7" fill="#0b0f11" stroke="currentColor" stroke-width="3"/><circle cx="90" cy="37" r="7" fill="#0b0f11" stroke="currentColor" stroke-width="3"/></svg>',
  },
  {
    id: "sedan",
    name: "Sedan",
    mult: 1,
    svg: '<svg viewBox="0 0 120 50" aria-hidden="true"><path fill="currentColor" d="M4 36 L8 27 L28 22 L44 11 Q50 8 66 8 L82 9 Q92 12 100 22 L112 26 Q116 30 115 36Z"/><circle cx="30" cy="37" r="7" fill="#0b0f11" stroke="currentColor" stroke-width="3"/><circle cx="90" cy="37" r="7" fill="#0b0f11" stroke="currentColor" stroke-width="3"/></svg>',
  },
  {
    id: "suv",
    name: "SUV or MPV",
    mult: 1.25,
    svg: '<svg viewBox="0 0 120 50" aria-hidden="true"><path fill="currentColor" d="M6 37 L8 24 Q10 20 22 18 L34 8 L88 8 Q96 9 100 18 L112 22 Q116 26 115 37Z"/><circle cx="30" cy="38" r="7" fill="#0b0f11" stroke="currentColor" stroke-width="3"/><circle cx="90" cy="38" r="7" fill="#0b0f11" stroke="currentColor" stroke-width="3"/></svg>',
  },
  {
    id: "large",
    name: "Pickup",
    mult: 1.5,
    svg: '<svg viewBox="0 0 120 50" aria-hidden="true"><path fill="currentColor" d="M4 37 L5 24 L46 22 L54 10 L78 10 Q84 11 88 22 L112 24 Q116 27 115 37Z"/><circle cx="26" cy="38" r="8" fill="#0b0f11" stroke="currentColor" stroke-width="3"/><circle cx="92" cy="38" r="8" fill="#0b0f11" stroke="currentColor" stroke-width="3"/></svg>',
  },
];

export type ServiceMode = "ripple" | "foam" | "dust" | "sheen" | "bead";

export type Service = {
  id: string;
  name: string;
  base: number;
  time: string;
  mode: ServiceMode;
  cls: "" | "w5" | "w6" | "w7";
  desc: string;
  flag?: string;
};

export const SERVICES: Service[] = [
  { id: "basic", name: "Basic Car Wash", base: 60000, time: "30 min", mode: "ripple", cls: "", desc: "Exterior hand wash, wheels cleaned, and a towel dry." },
  { id: "premium", name: "Premium Wash", base: 120000, time: "1 hr", mode: "foam", cls: "", desc: "Foam wash, wheel and tire dressing, interior vacuum, and glass cleaned inside and out." },
  { id: "interior", name: "Interior Cleaning", base: 250000, time: "2 hr", mode: "dust", cls: "", desc: "Deep vacuum, steam on seams and plastics, leather or fabric care, and a headliner wipe." },
  { id: "exterior", name: "Exterior Detailing", base: 600000, time: "4 hr", mode: "sheen", cls: "w6", desc: "Clay bar and iron decontamination, then a light polish to bring back depth and clarity." },
  { id: "wax", name: "Wax & Polish", base: 750000, time: "5 hr", mode: "sheen", cls: "w6", desc: "Machine polish to level fine swirls, finished with a warm, deep wax gloss." },
  { id: "ceramic", name: "Ceramic Coating", base: 3500000, time: "2 days", mode: "bead", cls: "w5", desc: "Paint correction and a multi-year ceramic layer. Water beads up and dirt rinses off." },
  { id: "full", name: "Full Detailing", base: 2500000, time: "1 day", mode: "foam", cls: "w7", desc: "Interior and exterior in one visit: deep clean, decontamination, polish and protection.", flag: "Most complete" },
];

// Urutan section untuk perhitungan "story progress" saat scroll (dipakai HUD + var --clean).
export const SECTION_IDS = [
  "hero",
  "problem",
  "process",
  "deep",
  "detail",
  "transform",
  "services",
  "compare",
  "experience",
  "book",
] as const;

// Nilai "clean" (0..1) tiap section, dipakai untuk melerp SVG mobil fallback & HUD.
export const CLEAN_KEYFRAMES = [0, 0, 0.1, 0.5, 0.96, 1, 1, 1, 1, 1];
