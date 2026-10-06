// Data & konfigurasi bisnis. Ganti angka/nomor di sini untuk data asli.
export const PICK_SERVICE_EVENT = "kilap:pick-service";

export const CFG = {
  wa: "6281200000000", // Nomor WhatsApp, format internasional tanpa "+"
  currency: "Rp",
  brand: "Kilap",
};

export interface Location {
  id: number
  name: string
  address: string
  phone: string
  email: string
  lat: number
  lng: number
  features: string[]
  image: string
}

export const BRANCHES: Location[] = [
  {
    id: 1,
    name: "BSD City",
    address: "Jl. Pahlawan Seribu, BSD City, Tangerang Selatan",
    phone: "0812-3456-7890",
    email: "bsd@carwash.id",
    lat: -6.3024,
    lng: 106.6527,
    features: ["Car Wash", "Detailing", "Vacuum", "Polishing"],
    image: "/images/branches/bsd.jpg",
  },
  {
    id: 2,
    name: "Pamulang",
    address: "Jl. Siliwangi, Pamulang, Tangerang Selatan",
    phone: "0812-3456-7890",
    email: "pamulang@carwash.id",
    lat: -6.3428,
    lng: 106.7386,
    features: ["Car Wash", "Vacuum", "Waxing"],
    image: "/images/branches/pamulang.jpg",
  },
  {
    id: 3,
    name: "Ciputat",
    address: "Jl. Ir. H. Juanda, Ciputat, Tangerang Selatan",
    phone: "0812-3456-7890",
    email: "ciputat@carwash.id",
    lat: -6.3116,
    lng: 106.7609,
    features: ["Car Wash", "Detailing", "Vacuum"],
    image: "/images/branches/ciputat.jpg",
  },
]


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
// const vehicleTypes = ["Sedan", "SUV", "Truck", "Hatchback", "Coupe", "Van", "Motorcycle"]

export type ServiceMode = "ripple" | "foam" | "dust" | "sheen" | "bead";

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  mode: string;
  cls: string;
  desc: string;
  image: string;
  tags?: string[];
  features?: string[];
  flag?: string;
}

export const SERVICES: Service[] = [
  {
    id: "quick",
    name: "Cuci Kilat",
    price: 25000,
    duration: "30 min",
    mode: "ripple",
    cls: "",
    desc: "Pembersihan eksterior cepat untuk menghilangkan debu dan kotoran ringan pada permukaan mobil.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhZjYuNbSF4mZNI5EoP80Iq91aUUpA0zxPnSPwA_gR9OtbfVXuvalMaDSV-czO71NZQqON1EGuYHCP_YiNjdFgj24umb3TZKIo9bnDcFYk6C9C2APlX7TnHdNT_gq8cq4JTdda52foCarvUYEWguT1iYy4jd8twvj94HH64zWt0ac7JgjuZELSKkHauhwW6uJ9jicXLx9Mr29hMCC00m0m_nTv_R6SS1aTrz-RpIRwnwDqPd1IZNC5Cu7mq1zZOA1wg25Ob_ktViJE",
    tags: ["kilat"],
    features: [
      "Cuci eksterior",
      "Pembersihan debu dan kotoran ringan",
      "Pembersihan kaca luar",
      "Lap kering",
      "Semir ban",
    ],
  },

  {
    id: "standard",
    name: "Cuci Standar",
    price: 60000,
    duration: "30 min",
    mode: "ripple",
    cls: "",
    desc: "Cuci dasar untuk membersihkan kotoran dan debu ringan. Cocok untuk perawatan rutin kendaraan sehari-hari.",
    image: "/img/premium-car-wash-with-wax-application.jpg",
    tags: ["basic"],
    features: [
      "Cuci eksterior menyeluruh",
      "Pembersihan kaca luar",
      "Pembersihan velg dan ban",
      "Lap kering",
      "Pembersihan interior ringan",
      "Semir ban",
    ],
  },

  {
    id: "premium",
    name: "Cuci Premium",
    price: 120000,
    duration: "1 jam",
    mode: "foam",
    cls: "",
    desc: "Cuci menyeluruh dengan perawatan tambahan untuk menjaga tampilan eksterior dan kebersihan interior mobil.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5pYlS_1-J1ptIELLEYO04uxI5GTMKCJL_nmr1lnta2NbVegLslDLIwYsxGGo601B0Ma49XNyUmlFazZCS0Qtuuo2I96W2i55LHu82qw6zYeJAs-CC6wH_YBPvDZHa7Jm3PMfoeNG2b7CMU-WSzrakAbWoU5EL_xA-5zLya-HvgW_cXcUYcdijsIe1V9FpVqsnYhIAmboLKYTYrmOCQu1OxogNWUa2OYfFalkO2dh2AkN0Se-rzRdPEtatTjsPyDLX4JJvtFeoPi0z",
    tags: ["premium", "popular"],
    features: [
      "Cuci tangan dengan sabun premium",
      "Pembersihan velg dan ban",
      "Semir ban",
      "Lapisan wax pelindung",
      "Vakum interior",
      "Pembersihan kaca bagian dalam dan luar",
      "Pembersihan dashboard dan konsol",
    ],
  },

  {
    id: "interior",
    name: "Interior Cleaning",
    price: 250000,
    duration: "2 jam",
    mode: "dust",
    cls: "",
    desc: "Pembersihan mendalam bagian dalam mobil untuk mengangkat debu, kotoran, dan noda pada berbagai permukaan interior.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkimNYcTKmpULmhBpQWeHfnsHif1jJWoJRgapxK52sxtoL-rXtnw65n_3xrzvUXUfXSaw9XuQwis1wj7qekjs-NP-16e3jcD8o0DfzKxB_PuPA4aBZzTxQNE-mo6t66JtDHVDq6wuEvfLswcbxXZDV22MeADmh4NYmsikRwIzcgjd1BI9hwUFnfzsd0L2zGMNxCMSW61OCI_evamTUzANuhSOf_ePuVcJgbAnHkwrs4n1FNTEzVTmLrvGKsFTB85sJhHBm5Ji7Wb4G",
    tags: ["interior"],
    features: [
      "Vakum seluruh permukaan interior",
      "Pembersihan jok kulit atau kain",
      "Pembersihan karpet dan lantai",
      "Pembersihan dashboard secara menyeluruh",
      "Pembersihan door panel",
      "Pembersihan cup holder",
      "Sanitasi permukaan interior",
      "Pengharum interior",
    ],
  },

  {
    id: "exterior",
    name: "Exterior Detailing",
    price: 600000,
    duration: "4 jam",
    mode: "sheen",
    cls: "w6",
    desc: "Perawatan eksterior menyeluruh untuk mengembalikan kebersihan, kehalusan, dan kilau cat kendaraan.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrAmzAnZ_fZ-BAbNbUymsbJass0QpyvaYz_oJ-eLm9qdSnBtydjH5BTZa2mEEFFQbs54yTCSpcbJWpSlTEO0fXaatWdD15GPRA6HuqNZz83Ia1I9MFKfUE5dhkZetLPQoP4GD2R7isBxsmDQs_9qnVfP8VvictWLR6wH4oa1PKfH92I83jIyziK954IWY0wmkyxBDdOSBHbRKCXv9A-mZQTtFg4qg_3E8dudYvjNwqyGbhpZzL_UVJWvvY4hAd_lVczRMdSGWsIw0t",
    tags: ["detailing"],
    features: [
      "Cuci premium",
      "Paint decontamination",
      "Clay bar treatment",
      "Pembersihan detail pada celah eksterior",
      "Poles ringan untuk mengembalikan kilau",
      "Pembersihan velg dan ban",
      "Perawatan trim eksterior",
      "Lapisan pelindung cat",
    ],
  },

  {
    id: "wax",
    name: "Wax & Polish",
    price: 750000,
    duration: "5 jam",
    mode: "sheen",
    cls: "w6",
    desc: "Poles mesin untuk menyamarkan baret halus dan swirl marks, kemudian diakhiri dengan lapisan wax untuk menghasilkan kilau yang lebih dalam.",
    image: "/img/engine-bay-cleaning-car-maintenance.jpg",
    tags: ["detailing", "paint-care"],
    features: [
      "Cuci dan dekontaminasi cat",
      "Paint preparation",
      "Poles mesin bertahap",
      "Penyamaran swirl marks dan baret halus",
      "Finishing untuk meningkatkan kilau cat",
      "Aplikasi wax pelindung",
      "Perawatan trim dan karet",
      "Pemeriksaan hasil akhir",
    ],
  },

  {
    id: "ceramic",
    name: "Ceramic Coating",
    price: 3500000,
    duration: "2 hari",
    mode: "bead",
    cls: "w5",
    desc: "Koreksi cat dan pelapisan keramik profesional untuk memberikan perlindungan jangka panjang, kilau lebih dalam, serta efek hidrofobik.",
    image: "/img/ceramic-coating-car-paint-protection.jpg",
    tags: ["protection", "premium"],
    features: [
      "Cuci dan dekontaminasi cat",
      "Paint decontamination",
      "Persiapan permukaan",
      "Paint correction",
      "Aplikasi ceramic coating profesional",
      "Perlindungan terhadap sinar UV",
      "Efek hidrofobik",
      "Perlindungan terhadap kontaminan lingkungan",
      "Garansi 2 tahun",
    ],
  },

  {
    id: "full",
    name: "Paket Lengkap",
    price: 2500000,
    duration: "1 hari",
    mode: "foam",
    cls: "w7",
    desc: "Perawatan menyeluruh untuk mobil Anda, mulai dari pencucian premium hingga detailing interior dan eksterior untuk hasil maksimal.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDl-AUzHTqmxAap9kP3toTivccxFB0-ZIXXfeDJmQ52eXoWqDgNLGJwSuAsQw1JZ5YOPfWrJfhxvh055Iw5YxKNjaMMpUXZ4iau4G4F7DYBhngpdEUZJorZF2Tp0R_wBPxK9lIe-apghEYKzZnk30FlTP9FjGLs0s4eohe-jh36GWyd39eW27OFeGFT7hLn29rp8jGtkKQoIKzG048GDATBqfRVH2x7s3yft0z3m3A2C14_-v7R2Abqcyo-DoJH1vJm5WJ0RHh1lwCF",
    tags: ["premium", "complete"],
    features: [
      "Cuci premium",
      "Detailing interior",
      "Detailing eksterior",
      "Paint decontamination",
      "Paint correction",
      "Poles dan finishing cat",
      "Perawatan velg dan ban",
      "Perawatan trim eksterior",
      "Pelindung cat",
      "Pemeriksaan kondisi umum kendaraan",
      "Pemeriksaan akhir oleh teknisi",
    ],
    flag: "Paling Lengkap",
  },
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
