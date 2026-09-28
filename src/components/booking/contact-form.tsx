"use client"
import type React from "react"
import { User, Phone, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ContactFormProps {
  formData: {
    fullName: string
    phoneNumber: string
    email: string
  }
  errors: {
    fullName?: string
    phoneNumber?: string
    email?: string
  }
  onInputChange: (field: string, value: string) => void
}

const ContactForm: React.FC<ContactFormProps> = ({ formData, errors, onInputChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          Detail Kontak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              Nama Lengkap
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              value={formData.fullName}
              onChange={(e) => onInputChange("fullName", e.target.value)}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="flex items-center gap-2">
              <Phone size={16} className="text-gray-500" />
              Nomor Telepon
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Masukkan nomor telepon Anda"
              value={formData.phoneNumber}
              onChange={(e) => onInputChange("phoneNumber", e.target.value)}
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan alamat email Anda"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactForm
