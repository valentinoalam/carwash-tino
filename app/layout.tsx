import { Geist, Geist_Mono } from "next/font/google";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from "geist/font/pixel";

import "@/styles/globals.css";
import type { Viewport } from "next";
import { generateMetaData } from "@/lib/metadata";
import Footer from "@/components/layout/footer";
import ClientHeader from "@/components/layout/client-header";

const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export async function generateMetadata() {
  return generateMetaData();
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: 'white',
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable} bg-[#10668B] antialiased relative flex size-full min-h-screen flex-col bg-linear-to-br from-slate-50 to-blue-50 group/design-root overflow-x-hidden`}
      >
        <div className="layout-container flex h-full bg-[#1395cd]/65 grow flex-col min-h-screen">
          <ClientHeader />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
