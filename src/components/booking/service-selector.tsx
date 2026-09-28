"use client"
import type React from "react"
import { Car, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Service {
  id: string
  name: string
  duration: string
  price: string
  description: string
}

interface ServiceSelectorProps {
  selectedService: string
  onServiceSelect: (serviceId: string) => void
  error?: string
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ selectedService, onServiceSelect, error }) => {
  const services: Service[] = [
    { id: "quick", name: "Cuci Kilat", duration: "30 menit", price: "Rp 25.000", description: "Cuci eksterior cepat" },
    {
      id: "standard",
      name: "Cuci Standar",
      duration: "60 menit",
      price: "Rp 50.000",
      description: "Cuci eksterior + interior",
    },
    {
      id: "premium",
      name: "Cuci Premium",
      duration: "90 menit",
      price: "Rp 75.000",
      description: "Cuci lengkap + waxing",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="w-5 h-5 text-blue-500" />
          Pilih Layanan
        </CardTitle>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedService} onValueChange={onServiceSelect} className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="flex items-center space-x-3">
              <RadioGroupItem value={service.id} id={service.id} />
              <Label
                htmlFor={service.id}
                className="cursor-pointer flex-1 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-gray-500">{service.description}</div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {service.duration}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-blue-600">{service.price}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

export default ServiceSelector
