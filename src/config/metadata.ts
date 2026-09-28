import type { Metadata } from 'next'

interface MetadataConfig {
  [key: string]: Metadata
}
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://carwash-tino.vercel.app"
export const METADATA: MetadataConfig = {
  global: {
      title: {
        template: '%s | Shine Carwash',
        default: 'Shine Carwash | Home', // Digunakan jika halaman tidak menyediakan judulnya sendiri
      },
      category: 'carwash',
      description: 'Layanan cuci mobil premium yang cepat dan bersih. Dari cuci eksterior hingga detailing lengkap, kami punya semuanya.',
      keywords: ['carwash', 'cuci mobil', 'detailing mobil', 'auto detailing', 'perawatan mobil', 'pembersihan mobil', 'cuci cepat', 'poles mobil', 'interior mobil'],
      icons: {
        icon: [
          { url: '/favicon.ico' },
          { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
          { url: '/icon.png', sizes: '96x96', type: 'image/png' },
          { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
          { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
          
        ],
        apple: [
          { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
      },
      manifest: '/manifest.json',
      // Open Graph protocol for social media sharing
      openGraph: {
        title: "Shine Carwash | Cuci Mobil & Detailing Profesional",
        description:  "Mobil Anda akan tampak seperti baru dengan layanan cuci mobil profesional kami. Pesan jadwal Anda hari ini!",
        url: `${baseUrl}`,
        siteName: "Shine Carwash",
        images: [
          {
            url: `${baseUrl}/express-car-wash-quick-service.jpg`,
            width: 1024,
            height: 1024,
            alt: "Shine Carwash - Mobil Bersih Cemerlang",
          },
        ],
        locale: "id_ID",
        type: "website",
      },
      // Landing page specific Twitter Card
      twitter: {
        title: 'Shine Carwash | Cuci Mobil Terbaik & Terbersih',
        description: 'Dapatkan mobil bersih sempurna dengan layanan cuci mobil profesional kami. Pesan jadwal online sekarang.',
        card: "summary_large_image",
        creator: "@yourtwitterhandle", // Ganti dengan handle Twitter Anda
        images: `${baseUrl}/express-car-wash-quick-service.jpg`,
      },
      formatDetection: {
          email: false,
          address: false,
          telephone: false,
      },
      // Robots directives
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      facebook: {
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string,
      },
      // Verification for search console
      verification: {
        google: "",
        yandex: "",
      },
      other: {
        "msvalidate.01": '',
        "p:domain_verify": '',

      },
    
      // App link metadata (if applicable)
      // appLinks: {
      //   ios: {
      //     url: "https://yourapp.com/ios",
      //     appStoreId: "123456789",
      //   },
      //   android: {
      //     package: "com.yourapp.android",
      //     url: "https://yourapp.com/android",
      //   },
      // },
    
      // Additional metadata
      authors: [{ 
          name: "YourName", // Ganti dengan nama Anda
          url: baseUrl }], // Ganti dengan URL proyek Anda
      creator: 'YourName', // Ganti dengan nama Anda
      publisher: 'YourName', // Ganti dengan nama Anda
  },
  default: {
    // Basic metadata
    title: "Cuci Mobil Terbaik di Kota Anda",
    // 150-160 characters. Sertakan kata kunci relevan secara alami sambil berfokus pada proposisi nilai
    description: "Mobil Anda akan berkilau seperti baru dengan layanan cuci mobil ekspres dan detailing lengkap kami. Bersih, cepat, dan terpercaya.",
    
    // Additional metadata
    keywords: [
      'carwash', 
      'cuci mobil',
      'detailing mobil',
      'pembersihan interior mobil', 
      'poles mobil',
      'layanan cuci mobil', 
      'cuci mobil profesional', 
      'perawatan eksterior mobil', 
      'kilau mobil'
    ],
  
  
    // Canonical URL 
    alternates: {
      canonical: "https://carwash-landingpage.vercel.app/", // Ganti dengan URL proyek Anda
    },
  },
  about: {
      title: "Tentang Kami | Shine Carwash",
      description: "Pelajari tentang komitmen kami terhadap kebersihan dan tim ahli kami yang berdedikasi.",
      keywords: ["tentang kami", "cerita kami", "tim carwash"],
  }
  // Add more page entries
};