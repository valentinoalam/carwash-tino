import { useState } from 'react'
import Link from 'next/link';
import { Button } from '@shadcn/button';
import { Input } from '@shadcn/input';
import { ServiceCard } from '@/components/service-card';
import dynamic from 'next/dynamic';
import { Search, ChevronDown, ChevronRight, Phone, Mail, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SERVICES } from '@/data/catalog';

const Compare = dynamic(() => import('../_components/Compare'));
const Process = dynamic(() => import('../_components/Process'));
const ContactUs = dynamic(() => import('../contact-us'));
const BookingTab = () => {
    
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("")
    const handleOnSelect = (serviceId: string) => {
        router.push(`/booking?svc=${serviceId}`);
    };

    const filteredServices = SERVICES.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.desc.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    return (
        <>
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold mb-6">Our Services</h2>
                <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search services..."
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>

                <div className="grid gap-6 z-50">
                {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} onSelect={handleOnSelect} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-8">No services found matching your search.</p>
                )}
                </div>
            </div>
            {/* Special Offers */}
            <div className="bg-linear-to-r from-blue-600 to-[#309be8] rounded-lg p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Special Offers</h2>
                <Button suppressHydrationWarning variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <ChevronDown className="h-5 w-5" />
                </Button>
                </div>
                <div>
                <div className="shadow-md hover:shadow-lg transition-shadow bg-linear-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Summer Special Package</h3>
                        <p className="text-gray-600">3 Premium washes + 1 FREE ceramic coating application</p>
                    </div>
                    <Button suppressHydrationWarning disabled className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                        Hanya Rp 299.000
                    </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Monthly Unlimited</h3>
                    <p className="text-gray-600 text-sm mb-3">Unlimited express washes</p>
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">Rp 239.000/mo</span>
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
                        <span className="text-xl font-bold text-purple-600">Rp 499.000/mo</span>
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
            <Process />
            <Compare />
            {/* Opening Hours */}
            <ContactUs />
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                {/* <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                    <p className="font-medium">Address</p>
                    <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                        123 Main Street, Anytown, USA 12345
                    </Link>
                    </div>
                </div> */}

                <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                    <p className="font-medium">Phone</p>
                    <Link href="tel:+15551234567" className="text-gray-600 hover:text-blue-600 text-sm">
                        +62 555 123 4567
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
        </div>
    </>
  )
}

export default BookingTab