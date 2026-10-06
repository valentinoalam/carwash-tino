'use client'
// import dynamic from "next/dynamic";
import Hero from "./_sections/hero";
import BusinessProfile from "./_sections/business";
// const BusinessProfile = dynamic(() => import('./_sections/business'), { ssr: false })
export default function Home() {
  return (
    <div className="flex flex-1 justify-center">
      <div className="@container relative flex flex-col flex-1">
        <Hero />
        
        <BusinessProfile />
      </div>
    </div>
  );
}
