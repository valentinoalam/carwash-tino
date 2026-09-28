"use client"
import type React from "react"
import { Car } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VehicleFormProps {
  formData: {
    vehicleBrand: string
    vehicleModel: string
    licensePlate: string
  }
  errors: {
    vehicleBrand?: string
    vehicleModel?: string
    licensePlate?: string
  }
  onInputChange: (field: string, value: string) => void
}

const VehicleForm: React.FC<VehicleFormProps> = ({ formData, errors, onInputChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="w-5 h-5 text-blue-500" />
          Detail Kendaraan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleBrand">Merek Kendaraan</Label>
            <Input
              id="vehicleBrand"
              type="text"
              placeholder="Misalnya, Toyota"
              value={formData.vehicleBrand}
              onChange={(e) => onInputChange("vehicleBrand", e.target.value)}
              className={errors.vehicleBrand ? "border-red-500" : ""}
            />
            {errors.vehicleBrand && <p className="text-sm text-red-500">{errors.vehicleBrand}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleModel">Model Kendaraan</Label>
            <Input
              id="vehicleModel"
              type="text"
              placeholder="Misalnya, Avanza"
              value={formData.vehicleModel}
              onChange={(e) => onInputChange("vehicleModel", e.target.value)}
              className={errors.vehicleModel ? "border-red-500" : ""}
            />
            {errors.vehicleModel && <p className="text-sm text-red-500">{errors.vehicleModel}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="licensePlate">Nomor Plat Kendaraan</Label>
            <Input
              id="licensePlate"
              type="text"
              placeholder="Misalnya, B 1234 XYZ"
              value={formData.licensePlate}
              onChange={(e) => onInputChange("licensePlate", e.target.value)}
              className={errors.licensePlate ? "border-red-500" : ""}
            />
            {errors.licensePlate && <p className="text-sm text-red-500">{errors.licensePlate}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default VehicleForm
