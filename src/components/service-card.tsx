import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Star,
  ChevronRight,
  Sparkles,
  Shield,
  Droplets,
  Car,
  Brush,
  CircleDollarSign,
} from "lucide-react"

import type { Service } from "@/data/catalog"

interface ServiceCardProps {
  service: Service
  onSelect?: (serviceId: string) => void
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {

  const getCategoryIcon = () => {
    if (service.tags?.includes("protection")) {
      return <Shield className="h-4 w-4" />
    }

    if (
      service.tags?.includes("premium") ||
      service.tags?.includes("detailing")
    ) {
      return <Sparkles className="h-4 w-4" />
    }

    if (
      service.tags?.includes("interior") ||
      service.tags?.includes("basic")
    ) {
      return <Brush className="h-4 w-4" />
    }

    if (service.tags?.includes("complete")) {
      return <Car className="h-4 w-4" />
    }

    return <Droplets className="h-4 w-4" />
  }

  const getCategoryColor = () => {
    if (service.tags?.includes("protection")) {
      return "bg-gradient-to-r from-blue-500 to-purple-600"
    }

    if (service.tags?.includes("premium")) {
      return "bg-gradient-to-r from-yellow-400 to-orange-500"
    }

    if (service.tags?.includes("detailing")) {
      return "bg-gradient-to-r from-purple-500 to-pink-500"
    }

    if (service.tags?.includes("interior")) {
      return "bg-gradient-to-r from-green-400 to-teal-500"
    }

    if (service.tags?.includes("complete")) {
      return "bg-gradient-to-r from-orange-500 to-red-500"
    }

    return "bg-gradient-to-r from-gray-400 to-gray-600"
  }

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(service.price)

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-lg ${service.cls}`}
    >
      {/* Service flag */}
      {service.flag && (
        <Badge className="absolute -top-2 left-4 z-20 bg-linear-to-r from-orange-400 to-red-500 text-white">
          {service.flag}
        </Badge>
      )}

      <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row">
        {/* Service identity */}
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`shrink-0 rounded-lg p-2 text-white ${getCategoryColor()}`}
          >
            {getCategoryIcon()}
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
              {service.name}
            </h3>

            <div className="mt-1 flex items-center text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              <span className="text-sm">{service.duration}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs capitalize"
              >
                <Star className="h-4 w-4" />{tag.replace("-", " ")}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="mb-5 text-sm leading-relaxed text-gray-600">
        {service.desc}
      </p>

      {/* Image + features */}
      <div className="relative overflow-hidden rounded-xl bg-gray-50 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <div className="flex min-h-55 flex-col sm:min-h-60 sm:flex-row">
          {/* Image */}
          <div className="relative min-h-45 w-full overflow-hidden sm:absolute sm:inset-y-0 sm:right-0 sm:w-2/3">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.name}
              fill
              sizes="(max-width: 640px) 100vw, 66vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-50/60 to-transparent sm:from-gray-50 sm:via-gray-50/20 sm:to-transparent" />
          </div>

          {/* Features */}
          <div className="relative z-10 flex w-full flex-col justify-center gap-4 p-5 sm:w-2/3 sm:p-6">
            {service.features && service.features.length > 0 && (
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <h4 className="text-sm font-semibold text-blue-600">
                    Termasuk
                  </h4>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature: string, index: number) => (
                    <li
                      key={`${service.id}-feature-${index}`}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
        {/* Price */}
        <div className="flex min-w-0 items-center gap-2">
          <CircleDollarSign className="h-5 w-5 shrink-0 text-blue-500" />

          <span className="text-xl font-bold text-gray-900 sm:text-2xl">
            {formattedPrice}
          </span>
        </div>

        {/* CTA */}
        <Button
          onClick={() => onSelect?.(service.id)}
          className="z-20 shrink-0 bg-[#309be8] px-5 text-white hover:bg-blue-700"
        >
          <span>Pilih Layanan</span>
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}