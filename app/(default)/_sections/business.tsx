'use client'
import { Suspense, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { BadgeCheckIcon, CalendarIcon, ImageIcon, InfoIcon, StarIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shadcn/tabs';

import BorderBeam from 'border-beam';
import { PixelHeading } from '@shadcn/pixel-heading-character';
import { useTabStore } from '@/stores/ui-store';

const BookingTab = dynamic(() => import('./_tabs/booking'));
const AboutUsTab = dynamic(() => import('./_tabs/about-us'));
const CertificatesSection = dynamic(() => import('./_tabs/certificates-section'));
const GalleryTab = dynamic(() => import('./_tabs/gallery'));
const ReviewsTab = dynamic(() => import('./_tabs/reviews'));

const SectionPlaceholder = ({ minHeight = 300 }: { minHeight?: number }) => (
  <div 
    className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6 animate-pulse" 
    style={{ minHeight: `${minHeight}px` }}
  />
);
const BusinessProfile = () => {
    const car = {
    "booking": "1car-dirty",
    "about-us": "2car-rinsed",
    "gallery": "3car-soapy",
    "certificates": "4car-clean",
    "reviews": "5car-polished",
  } as const;
  type TabKey = keyof typeof car;
  const {activeTab, setActiveTab} = useTabStore();
  const [blobStyle, setBlobStyle] = useState({});
  const blobRef = useRef<HTMLDivElement>(null);
  const [carPosition, setCarPosition] = useState(0)
  const [carWidth, setCarWidth] = useState(0)
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<{[key: string]: HTMLButtonElement | null}>({})
  const updateBlobPosition = () => {
    if (!tabsRef.current) return;

    const activeTabElement = tabsRef.current.querySelector(`[data-state="active"]`);
    if (!activeTabElement) return;

    const tabsListRect = tabsRef.current.getBoundingClientRect();
    const activeTabRect = activeTabElement.getBoundingClientRect();

    const left = activeTabRect.left - tabsListRect.left;
    const width = activeTabRect.width;
    const height = activeTabRect.height;

    setBlobStyle({
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
    });

    // Add blob morph animation
    if (blobRef.current) {
      const randomness = Math.random() * 3;
      blobRef.current.animate([
        { 
          borderRadius: `${height / 2}px`,
          transform: 'scale(1)'
        },
        { 
          borderRadius: `${(height / 2) + randomness}px ${(height / 2) - randomness}px ${(height / 2) + randomness}px ${(height / 2) - randomness}px`,
          transform: 'scale(1.02)'
        },
        { 
          borderRadius: `${height / 2}px`,
          transform: 'scale(1)'
        }
      ], {
        duration: 400,
        easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
      });
    }
  };
  
  // Set up the car animation when the active tab changes
  useEffect(() => {
    const updateCarPosition = () => {
      if (tabsRef.current && tabRefs.current[activeTab]) {
        const tabElement = tabRefs.current[activeTab]
        if (tabElement) {
          const tabRect = tabElement.getBoundingClientRect()
          const tabsRect = tabsRef.current.getBoundingClientRect()
          const position = tabRect.left - tabsRect.left + (tabRect.width / 2) - 16
          setCarPosition(position)
          setCarWidth(tabRect.width)
        }
      }
    }

    // Update position immediately and on window resize
    setTimeout(() => {
      updateCarPosition()
      updateBlobPosition()
    }, 100);
    window.addEventListener('resize', updateCarPosition)
    // Handle window resize
    const handleResize = () => updateBlobPosition();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', updateCarPosition);
      window.removeEventListener('resize', handleResize);
    }
  }, [activeTab])



  return (
    <div className="container mx-auto px-4 -mt-20 relative z-10">
      
      <Tabs onValueChange={setActiveTab} defaultValue="booking" value={activeTab} className="w-full relative">
        <div className=' min-h-42 w-full relative'>
          <Link href={'/booking'} className='absolute -top-1/4 -translate-x-1/2 left-1/2 mx-auto z-30 group'
            >
            <BorderBeam
              active={true}
              brightness={1.3}
              className="py-4 hover:bg-[#309be8]/80 flex min-w-21 max-w-120 transition-all ease-in-out duration-300 hover:border-2 rounded-full border border-blue-950/60 hover:border-white/50 hover:text-lg  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent shadow-2xl cursor-pointer items-center justify-center overflow-hidden h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#309be8]"
              colorVariant="colorful"
              duration={19.6 / 3.1 / 2.3}
              hueRange={30}
              // onActivate={onActivate}
              // onDeactivate={onDeactivate}
              // ref={ref}
              saturation={1.7}
              size="md"
              staticColors={false}
              strength={2}
              // style={borderBeamStyle}
              theme="dark"
            >
              <PixelHeading as='h3' mode="wave" cycleInterval={340} autoPlay className="text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] truncate">Go Wash</PixelHeading>
            </BorderBeam>
          </Link>
          <div className='absolute opacity-90 inset-0 h-full w-full flex overflow-visible -z-50'>
            
            <div className={cn(`bubble-shape-divider-top bubble-shape-divider-mask`, "top-0 md:top-[-10%] lg:top-[-65%] w-full h-full sm:h-[100vw] [clip-path:inset(0%_0%_20%_0%)] sm:[clip-path:inset(0%_0%_40%_0%)] lg::[clip-path:inset(0%_0%_60%_0%)]")}></div>

            <div className="bg-white absolute bottom-0 left-0 w-full h-[20%] basis-1/3 grow rounded-lg shadow-lg"></div>
          </div>
          {/* Navigation Tabs */}

          {/* Navigation Tabs */}
          <div ref={tabsRef}>
            <TabsList className="absolute bottom-0 grid w-full grid-cols-5 bg-white border border-gray-200">
              {/* Animated Blob */}
              <div
                ref={blobRef}
                className="absolute transition-all duration-500 ease-out bg-linear-to-r translate-y-1 from-[#309be8] to-white rounded-md shadow-lg z-0"
                style={{
                  ...blobStyle,
                  top: '0px',
                  transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
                }}
              />
              <div 
                className="absolute bottom-full z-0 transition-all duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(${carPosition-40}px) translateY(10px)`,
                  width: `${carWidth}px`
                }}
              >
                <div className="relative w-full flex justify-center -mb-1">
                  <Image
                    src={`/illustration/cars/caro/${car[activeTab as TabKey]}.png`}
                    alt="car"
                    width={100}
                    height={100}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
              <TabsTrigger 
                ref={el => { tabRefs.current.booking = el }}
                value="booking" 
                className="data-[state=active]:bg-[#309be8] transition-all duration-500 ease-out data-[state=active]:text-white relative z-10"
              >
                <span className="hidden sm:inline">Booking</span>
                <CalendarIcon className="sm:hidden w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger 
                ref={el => { tabRefs.current['about-us'] = el }}
                value="about-us" 
                className="data-[state=active]:bg-[#309be8] transition-all duration-500 ease-out data-[state=active]:text-white relative z-10"
              >
                <span className="hidden sm:inline">About us</span>
                <InfoIcon className="sm:hidden w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger 
                ref={el => { tabRefs.current.gallery = el }}
                value="gallery" 
                className="data-[state=active]:bg-[#309be8] transition-all duration-500 ease-out data-[state=active]:text-white relative z-10"
              >
                <span className="hidden sm:inline">Place Gallery</span>
                <ImageIcon className="sm:hidden w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger
                ref={el => { tabRefs.current.certificates = el }}
                value="certificates"
                className="data-[state=active]:bg-[#309be8] transition-all duration-500 ease-out data-[state=active]:text-white relative z-10"
              >
                <span className="hidden sm:inline">Certificates</span>
                <BadgeCheckIcon className="sm:hidden w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger 
                ref={el => { tabRefs.current.reviews = el }}
                value="reviews" 
                className="data-[state=active]:bg-[#309be8] data-[state=active]:text-white relative z-10"
              >
                <span className="hidden sm:inline">Reviews</span>
                <StarIcon className="sm:hidden w-5 h-5" />
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <div className='absolute hidden lg:flex top-50 w-full h-1/6 rounded-2xl -z-10 bg-linear-to-b from-[#EFF8FC] to-[#EFF8FC]/0'></div>
        <TabsContent value="booking" className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
            <BookingTab />
          </Suspense>
        </TabsContent>

        <TabsContent value="about-us" className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
            <AboutUsTab />
          </Suspense>
          
        </TabsContent>

        <TabsContent value="gallery" className="py-8">
          <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
            <GalleryTab />
          </Suspense>
        </TabsContent>

        <TabsContent value="certificates" className="py-8">
            <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
              <CertificatesSection />
            </Suspense>
        </TabsContent>

        <TabsContent value="reviews" className="py-8">
          <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
            <ReviewsTab />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default BusinessProfile