'use client'
import { Suspense, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Search, ChevronDown, ChevronRight, MapPin, Phone, Mail, Globe, BadgeCheckIcon, CalendarIcon, ImageIcon, InfoIcon, StarIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookingForm } from '@/components/booking-form';
import { Input } from '@/components/ui/input';
import { ServiceCard } from '@/components/service-card';

const ContactUs = dynamic(() => import('./contact-us'));
const CertificatesSection = dynamic(() => import('./certificates-section'));
const ReviewsSection = dynamic(() => import('./reviews-section'));
const Gallery = dynamic(() => import('@/components/gallery'));

const SectionPlaceholder = ({ minHeight = 300 }: { minHeight?: number }) => (
  <div 
    className="w-full bg-gray-800 rounded-xl animate-pulse" 
    style={{ minHeight: `${minHeight}px` }}
  />
);
const BusinessProfile = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [activeTab, setActiveTab] = useState("booking")
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


  const services = [
    {
      id: "premium-wash",
      name: "Premium Wash & Wax",
      duration: "45 min.",
      description:
        "Our signature wash includes exterior hand wash, tire shine, and a protective wax application for a lasting shine that protects your vehicle's paint.",
      price: "299,5 $",
      oldPrice: "599 $",
      category: "premium",
      popular: true,
      image: "/premium-car-wash-with-wax-application.jpg",
      features: [
        "Hand wash with premium soap",
        "Tire cleaning and shine",
        "Protective wax coating",
        "Interior vacuum",
        "Window cleaning inside & out",
        "Dashboard and console wipe",
      ],
    },
    {
      id: "interior-detailing",
      name: "Interior Detailing",
      duration: "60 min.",
      description:
        "Deep cleaning of your car's interior, including vacuuming, surface wipe-down, window cleaning, and air freshener for a fresh, clean cabin.",
      price: "499 $",
      oldPrice: null,
      category: "basic",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkimNYcTKmpULmhBpQWeHfnsHif1jJWoJRgapxK52sxtoL-rXtnw65n_3xrzvUXUfXSaw9XuQwis1wj7qekjs-NP-16e3jcD8o0DfzKxB_PuPA4aBZzTxQNE-mo6t66JtDHVDq6wuEvfLswcbxXZDV22MeADmh4NYmsikRwIzcgjd1BI9hwUFnfzsd0L2zGMNxCMSW61OCI_evamTUzANuhSOf_ePuVcJgbAnHkwrs4n1FNTEzVTmLrvGKsFTB85sJhHBm5Ji7Wb4G",
      features: [
        "Deep vacuum all surfaces",
        "Leather/fabric conditioning",
        "Dashboard deep clean",
        "Door panel cleaning",
        "Cup holder sanitization",
        "Air freshener application",
      ],
    },
    {
      id: "ceramic-coating",
      name: "Ceramic Coating Application",
      duration: "120 min.",
      description:
        "Long-lasting ceramic coating for ultimate paint protection and hydrophobic properties. Professional grade coating that lasts up to 2 years.",
      price: "1999 $",
      oldPrice: null,
      category: "protection",
      image: "/ceramic-coating-car-paint-protection.jpg",
      features: [
        "Paint decontamination",
        "Surface preparation",
        "Professional ceramic coating",
        "UV protection",
        "Hydrophobic properties",
        "2-year warranty",
      ],
    },
    {
      id: "engine-bay-cleaning",
      name: "Engine Bay Cleaning",
      duration: "30 min.",
      description:
        "Thorough cleaning and dressing of your engine bay to keep it looking new and prevent dirt buildup. Safe for all engine types.",
      price: "149,5 $",
      oldPrice: "299 $",
      category: "basic",
      image: "/engine-bay-cleaning-car-maintenance.jpg",
      features: [
        "Safe degreasing process",
        "Component protection",
        "Plastic and rubber dressing",
        "Corrosion prevention",
        "Professional inspection",
      ],
    },
    {
      id: "express-wash",
      name: "Express Exterior Wash",
      duration: "15 min.",
      description:
        "A quick and efficient exterior wash for when you're on the go. Includes soft-touch wash and spot-free rinse.",
      price: "99 $",
      oldPrice: null,
      category: "basic",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhZjYuNbSF4mZNI5EoP80Iq91aUUpA0zxPnSPwA_gR9OtbfVXuvalMaDSV-czO71NZQqON1EGuYHCP_YiNjdFgj24umb3TZKIo9bnDcFYk6C9C2APlX7TnHdNT_gq8cq4JTdda52foCarvUYEWguT1iYy4jd8twvj94HH64zWt0ac7JgjuZELSKkHauhwW6uJ9jicXLx9Mr29hMCC00m0m_nTv_R6SS1aTrz-RpIRwnwDqPd1IZNC5Cu7mq1zZOA1wg25Ob_ktViJE",
      features: ["Soft-touch wash system", "Spot-free rinse", "Basic tire cleaning", "Quick dry"],
    },
    {
      id: "full-detail",
      name: "Complete Detail Package",
      duration: "180 min.",
      description:
        "The ultimate car care experience combining exterior wash, interior detailing, and protective treatments for showroom-quality results.",
      price: "899 $",
      oldPrice: "1299 $",
      category: "premium",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDl-AUzHTqmxAap9kP3toTivccxFB0-ZIXXfeDJmQ52eXoWqDgNLGJwSuAsQw1JZ5YOPfWrJfhxvh055Iw5YxKNjaMMpUXZ4iau4G4F7DYBhngpdEUZJorZF2Tp0R_wBPxK9lIe-apghEYKzZnk30FlTP9FjGLs0s4eohe-jh36GWyd39eW27OFeGFT7hLn29rp8jGtkKQoIKzG048GDATBqfRVH2x7s3yft0z3m3A2C14_-v7R2Abqcyo-DoJH1vJm5WJ0RHh1lwCF",
      features: [
        "Everything from Premium Wash",
        "Complete interior detailing",
        "Paint correction (minor)",
        "Headlight restoration",
        "Trim restoration",
        "6-month protection guarantee",
      ],
    },
  ]

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )
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
      
      <Tabs onValueChange={setActiveTab} defaultValue="booking" className="w-full relative">
        <div className=' min-h-42 w-full relative'>
          <div className='absolute opacity-90 inset-0 h-full w-full flex overflow-visible -z-50'>
            <div className={cn(`bubble-shape-divider-top bubble-shape-divider-mask`, "top-0 md:-top-[10%] lg:-top-[65%] w-full h-full sm:h-[100vw] [clip-path:inset(0%_0%_20%_0%)] sm:[clip-path:inset(0%_0%_40%_0%)] lg::[clip-path:inset(0%_0%_60%_0%)]")}></div>

            <div className="bg-white absolute bottom-0 left-0 w-full h-[20%] basis-1/3 grow rounded-lg shadow-lg"></div>
          </div>
          {/* Navigation Tabs */}

          {/* Navigation Tabs */}
          <div ref={tabsRef}>
            <TabsList className="absolute bottom-0 grid w-full grid-cols-5 bg-white border border-gray-200">
              {/* Animated Blob */}
              <div
                ref={blobRef}
                className="absolute transition-all duration-500 ease-out bg-gradient-to-r translate-y-1 from-[#309be8] to-white rounded-md shadow-lg z-0"
                style={{
                  ...blobStyle,
                  top: '0px',
                  transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
                }}
              />
              <div 
                className="absolute bottom-full z-0 transition-all duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(${carPosition-30}px)`,
                  width: `${carWidth}px`
                }}
              >
                <div className="relative w-full flex justify-center -mb-1">
                  <Image
                    src="/illustration/cars/caro.svg"
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
        

        <TabsContent value="booking" className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">Our Services</h2>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input suppressHydrationWarning
                  type="text"
                  placeholder="Search services..."
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid gap-6">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} onSelect={setSelectedService} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No services found matching your search.</p>
                )}
              </div>
            </div>

            {/* Special Offers */}
            <div className="bg-gradient-to-r from-blue-600 to-[#309be8] rounded-lg p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Special Offers</h2>
                <Button suppressHydrationWarning variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>
              <div>
                <div className="shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Summer Special Package</h3>
                      <p className="text-gray-600">3 Premium washes + 1 FREE ceramic coating application</p>
                    </div>
                    <Button suppressHydrationWarning className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                      Save $150
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Monthly Unlimited</h3>
                    <p className="text-gray-600 text-sm mb-3">Unlimited express washes</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">$39/mo</span>
                      <Button suppressHydrationWarning variant="secondary" className='text-black cursor-pointer' size="sm">
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-white shadow-md  hover:shadow-lg transition-shadow border border-gray-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">VIP Membership</h3>
                    <p className="text-gray-600 text-sm mb-3">All services + priority booking</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-purple-600">$99/mo</span>
                      <Button suppressHydrationWarning variant="secondary" className='text-black cursor-pointer' size="sm">
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <BookingForm selectedService={selectedService} />

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                      123 Main Street, Anytown, USA 12345
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <Link href="tel:+15551234567" className="text-gray-600 hover:text-blue-600 text-sm">
                      +1 555 123 4567
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <Link
                      href="mailto:info@shinecarwash.com"
                      className="text-gray-600 hover:text-blue-600 text-sm"
                    >
                      info@shinecarwash.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Website</p>
                    <Link href="https://shinecarwash.com" className="text-gray-600 hover:text-blue-600 text-sm">
                      shinecarwash.com
                    </Link>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  <Link href="https://www.instagram.com/almanak_kopi" className="text-gray-400 hover:text-pink-600 transition-colors">
                    {/* <Instagram className="h-6 w-6" /> */}Instagram
                  </Link>
                  <Link href="https://www.facebook.com/valentinonooralam" className="text-gray-400 hover:text-blue-600 transition-colors">
                    {/* <Facebook className="h-6 w-6" /> */}Facebook
                  </Link>
                </div>
                
              </div>
            </div>
            {/* Gallery Preview */}
            <Gallery />
            {/* Opening Hours */}
            <ContactUs />
          </div>
        </TabsContent>

        <TabsContent value="about-us" className="py-8">
          <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-bold mb-6">About Shine Carwash</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Since 2015, Shine Carwash has been the premier destination for professional car care
                    services in the area. We combine state-of-the-art equipment with eco-friendly products to deliver
                    exceptional results while protecting the environment.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our team of certified professionals is passionate about making your vehicle look its absolute
                    best. From quick express washes to comprehensive detailing packages, we offer services tailored to
                    meet every need and budget.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We pride ourselves on using only the finest products and latest techniques to ensure your vehicle
                    receives the care it deserves. Our commitment to excellence has earned us a 5-star rating and
                    loyal customer base.
                  </p>
                  <p className="text-gray-600 mb-6">Our team of certified professionals is dedicated to restoring and protecting your vehicle with the highest quality products and techniques.</p>
                      
                      <div className="mb-8">
                          <div className="flex items-center mb-4">
                              <div className="bg-blue-100 p-3 rounded-full mr-4">
                                  <i className="fas fa-medal text-blue-600"></i>
                              </div>
                              <h3 className="text-xl font-bold text-gray-800">Certified Professionals</h3>
                          </div>
                          <p className="text-gray-600 ml-16">Our team undergoes continuous training to stay updated with the latest detailing techniques and products.</p>
                      </div>
                      
                      <div className="mb-8">
                          <div className="flex items-center mb-4">
                              <div className="bg-blue-100 p-3 rounded-full mr-4">
                                  <i className="fas fa-leaf text-blue-600"></i>
                              </div>
                              <h3 className="text-xl font-bold text-gray-800">Eco-Friendly Products</h3>
                          </div>
                          <p className="text-gray-600 ml-16">We use biodegradable, water-based products that are safe for your vehicle and the environment.</p>
                      </div>
                      
                      <div className="mb-8">
                          <div className="flex items-center mb-4">
                              <div className="bg-blue-100 p-3 rounded-full mr-4">
                                  <i className="fas fa-thumbs-up text-blue-600"></i>
                              </div>
                              <h3 className="text-xl font-bold text-gray-800">Customer Satisfaction</h3>
                          </div>
                          <p className="text-gray-600 ml-16">Your satisfaction is our top priority. We offer a 100% satisfaction guarantee on all our services.</p>
                      </div>
                </div>
                <div>
                  <Image
                    src="/professional-car-wash-team-at-work.jpg"
                    alt="Our professional team at work"
                    width={500}
                    height={350}
                    className="rounded-lg shadow-md w-auto h-auto aspect-square"
                  />
                </div>
              </div>
            </div>
          </Suspense>
          
        </TabsContent>

        <TabsContent value="gallery" className="py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-bold mb-4">Experience Our Facility</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Take a virtual tour of our state-of-the-art facility and see what makes us special.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  image: "/modern-car-wash-bay-with-equipment.jpg",
                  title: "Professional Wash Bays",
                  description:
                    "Our climate-controlled wash bays feature the latest soft-touch technology and premium cleaning products for a scratch-free experience that leaves your car spotless.",
                },
                {
                  image: "/car-interior-detailing-station.jpg",
                  title: "Interior Detailing Station",
                  description:
                    "Dedicated spaces for meticulous interior cleaning with professional-grade equipment and eco-friendly products that restore your cabin to like-new condition.",
                },
                {
                  image: "/comfortable-customer-waiting-area.jpg",
                  title: "Comfortable Waiting Area",
                  description:
                    "Relax in our comfortable lounge with complimentary WiFi, refreshments, and real-time service updates while we pamper your vehicle.",
                },
                {
                  image: "/ceramic-coating-application-booth.jpg",
                  title: "Ceramic Coating Booth",
                  description:
                    "Dust-free environment for precision ceramic coating application with controlled temperature and humidity, ensuring maximum protection and longevity.",
                },
                {
                  image: "/eco-friendly-water-recycling-system.jpg",
                  title: "Eco-Friendly Systems",
                  description:
                    "Our advanced water recycling system reduces environmental impact by 80% while maintaining the highest cleaning standards for your peace of mind.",
                },
                {
                  image: "/quality-control-inspection-area.jpg",
                  title: "Quality Inspection",
                  description:
                    "Every vehicle undergoes thorough quality inspection by our trained professionals to ensure our high standards are met before we hand you the keys.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
              <CertificatesSection />
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
              <ReviewsSection />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default BusinessProfile