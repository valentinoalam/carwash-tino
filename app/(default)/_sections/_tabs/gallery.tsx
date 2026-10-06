import React from 'react'
import Image from 'next/image'
function GalleryTab() {
  return (
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
  )
}

export default GalleryTab