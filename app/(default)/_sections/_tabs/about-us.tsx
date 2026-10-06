import Image from 'next/image'
import dynamic from 'next/dynamic';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import Link from 'next/link';
const Gallery = dynamic(() => import('@/components/gallery'));
const ContactUs = dynamic(() => import('../contact-us'));
const Contact = dynamic(() => import('../contact'));
function AboutUsTab() {
  return (
    <>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 lg:col-span-2 space-y-8 p-6">
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
            {/* Gallery Preview */}
            <Gallery />
        </div>
        {/* Sidebar */}
        <div className="space-y-8">
            <ContactUs />
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
            <Contact />
        </div>
    </>
  )
}

export default AboutUsTab