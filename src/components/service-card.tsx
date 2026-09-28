import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, ChevronRight, Sparkles, Shield, Droplets } from "lucide-react"

interface ServiceCardProps {
  service: {
    id: string
    name: string
    duration: string
    description: string
    price: string
    oldPrice?: string | null
    features?: string[]
    popular?: boolean
    image?: string
    category: string
  }
  onSelect?: (serviceId: string) => void
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "premium":
        return <Sparkles className="h-4 w-4" />
      case "protection":
        return <Shield className="h-4 w-4" />
      case "basic":
        return <Droplets className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "premium":
        return "bg-gradient-to-r from-yellow-400 to-orange-500"
      case "protection":
        return "bg-gradient-to-r from-blue-500 to-purple-600"
      case "basic":
        return "bg-gradient-to-r from-green-400 to-blue-500"
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600"
    }
  }

  const getServiceImage = (serviceId: string) => {
    switch (serviceId) {
      case "premium-wash":
        return "/premium-car-wash-with-wax-application.jpg"
      case "interior-detailing":
        return "/car-interior-detailing-cleaning.jpg"
      case "ceramic-coating":
        return "/ceramic-coating-car-paint-protection.jpg"
      case "engine-bay-cleaning":
        return "/engine-bay-cleaning-car-maintenance.jpg"
      case "express-wash":
        return "/express-car-wash-quick-service.jpg"
      case "full-detail":
        return "/complete-car-detailing-package-luxury.jpg"
      default:
        return service.image || "/placeholder.svg"
    }
  }

  return (
    <div className="group relative w-full bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
      {service.popular && (
        <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-orange-400 to-red-500 text-white">
          Most Popular
        </Badge>
      )}

      <div className="flex flex-col sm:flex-row items-start justify-between mb-4 space-x-4">
        <div className="flex items-center space-x-3 flex-grow-1">
          <div className={`p-2 rounded-lg ${getCategoryColor(service.category)} text-white`}>
            {getCategoryIcon(service.category)}
          </div>
          <div>
            <h3 className="font-semibold text-lg flex-grow-1 flex-1 text-gray-900 group-hover:text-blue-600 transition-colors">
              {service.name}
            </h3>
            <div className="flex items-center text-gray-500 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{service.duration}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 basis-[fit-content] text-sm mb-4 leading-relaxed self-end">{service.description}</p>
      </div>
      

      <div className="flex flex-col sm:flex-row w-full items-stretch overflow-clip justify-between gap-4 relative rounded-xl bg-gray-50 p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <Image
          src={getServiceImage(service.id) || "/placeholder.svg"}
          alt={service.name}
          width={400}
          height={200}
          className="h-auto sm:h-40 translate-y-1 object-cover group-hover:scale-105 transition-transform duration-300 w-full sm:w-2/3 relative sm:absolute top-0 right-0 bg-center bg-no-repeat aspect-video rounded-xl flex-1 overflow-hidden"
        />
        <div className="flex z-10 flex-[2_2_0px] flex-col gap-4">
          {service.features && service.features.length > 0 && (
            <div className="mb-4 w-fit">
              <h4 className="text-sm font-medium text-blue-600 mb-2">What&apos;s included:</h4>
              <ul className="space-y-1 rounded-md mr-1 bg-amber-50/40">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-blue-600">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        

      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">{service.price}</span>
          {service.oldPrice && <span className="text-lg text-gray-400 line-through">{service.oldPrice}</span>}
        </div>

        <Button suppressHydrationWarning onClick={() => onSelect?.(service.id)} className="bg-[#309be8] hover:bg-blue-700 text-white px-6">
          <span>Select Service</span>
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
