"use client"

import Image from "next/image"
import { Award, Shield, Leaf, Users } from "lucide-react"

const certificates = [
  {
    id: "1",
    title: "EPA Environmental Compliance",
    description: "Certified for eco-friendly water treatment and chemical disposal practices",
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    year: "2024",
    image: "/epa-certificate.jpg",
  },
  {
    id: "2",
    title: "Professional Car Care Association",
    description: "Member of PCCA with advanced training certifications for all staff",
    icon: <Award className="w-8 h-8 text-blue-600" />,
    year: "2023",
    image: "/pcca-certificate.jpg",
  },
  {
    id: "3",
    title: "Insurance & Bonding",
    description: "Fully insured and bonded for customer protection and peace of mind",
    icon: <Shield className="w-8 h-8 text-purple-600" />,
    year: "2024",
    image: "/insurance-certificate.jpg",
  },
  {
    id: "4",
    title: "Better Business Bureau A+",
    description: "Accredited business with A+ rating for customer service excellence",
    icon: <Users className="w-8 h-8 text-orange-600" />,
    year: "2024",
    image: "/bbb-certificate.jpg",
  },
]

export default function CertificatesSection() {
  return (

    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Certificates & Accreditations</h2>
        <p className="text-gray-600">
          We maintain the highest standards through continuous training and certification. Our accreditations ensure
          quality service and environmental responsibility.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="shrink-0">{cert.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{cert.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{cert.year}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{cert.description}</p>
                <div className="flex justify-center">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    width={120}
                    height={120}
                    className="rounded border border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Our Commitment to Excellence</h3>
        <p className="text-blue-800 text-sm">
          All our technicians undergo continuous training and certification to stay current with the latest car care
          techniques and environmental standards. We&apos;re committed to providing the highest quality service while
          protecting the environment for future generations.
        </p>
      </div>
    </div>
  )
}
