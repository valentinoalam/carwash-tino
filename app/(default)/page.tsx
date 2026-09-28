'use client'
import dynamic from "next/dynamic";
import Hero from "./_sections/hero";

const BusinessProfile = dynamic(() => import('./_sections/business'), { ssr: false })
export default function Home() {
  return (
    <div className="flex flex-1 justify-center">
      <div className="layout-content-container flex flex-col flex-1">
        <Hero />
        <BusinessProfile />
      </div>
    </div>
  );
}
