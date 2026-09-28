"use client"
import { useState } from "react"
import { Calendar, CheckCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { z } from "zod"
import DatePicker from "@/components/booking/date-picker"
import TimePicker from "@/components/booking/time-picker"
import ServiceSelector from "@/components/booking/service-selector"
import ContactForm from "@/components/booking/contact-form"
import VehicleForm from "@/components/booking/vehicle-form"
import BookingSummary from "@/components/booking/booking-summary"
import Image from "next/image"

const bookingSchema = z.object({
  selectedDate: z
    .object({
      day: z.number().min(1).max(31),
      month: z.number().min(0).max(11),
      year: z.number().min(2024),
    })
    .nullable()
    .refine((date) => date !== null, {
      message: "Silakan pilih tanggal",
    }),
  selectedTime: z.string().min(1, "Silakan pilih waktu"),
  selectedService: z.string().min(1, "Silakan pilih layanan"),
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter").max(50, "Nama terlalu panjang"),
  phoneNumber: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .regex(/^[0-9+\-\s()]+$/, "Format nomor telepon tidak valid"),
  email: z.string().email("Format email tidak valid"),
  vehicleBrand: z.string().min(2, "Merek kendaraan minimal 2 karakter"),
  vehicleModel: z.string().min(2, "Model kendaraan minimal 2 karakter"),
  licensePlate: z
    .string()
    .min(5, "Nomor plat minimal 5 karakter")
    .regex(/^[A-Z0-9\s]+$/i, "Format plat nomor tidak valid"),
})

type BookingFormData = z.infer<typeof bookingSchema>

const BookingServicePage = () => {
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    selectedDate: null,
    selectedTime: "",
    selectedService: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    vehicleBrand: "",
    vehicleModel: "",
    licensePlate: "",
  })

  const [currentMonth, setCurrentMonth] = useState(4)
  const [currentYear, setCurrentYear] = useState(2024)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]

  const services = [
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

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const handleDateClick = (day: number | null) => {
    if (day) {
      const selectedDate = { day, month: currentMonth, year: currentYear }
      setFormData((prev) => ({ ...prev, selectedDate }))
      if (errors.selectedDate) {
        setErrors((prev) => ({ ...prev, selectedDate: undefined }))
      }
    }
  }

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | { day: number; month: number; year: number } | null,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    try {
      bookingSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof BookingFormData, string>> = {}
        error.issues.forEach((err: z.ZodIssue) => {
          const field = err.path[0] as keyof BookingFormData
          newErrors[field] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const selectedServiceDetails = services.find((s) => s.id === formData.selectedService)
      console.log("Booking submitted:", {
        ...formData,
        service: selectedServiceDetails,
        location: "Sparkle & Shine Car Wash",
      })

      setSubmitSuccess(true)

      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({
          selectedDate: null,
          selectedTime: "",
          selectedService: "",
          fullName: "",
          phoneNumber: "",
          email: "",
          vehicleBrand: "",
          vehicleModel: "",
          licensePlate: "",
        })
      }, 3000)
    } catch (error) {
      console.error("Booking failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="flex flex-1 justify-center items-center py-20 bg-gray-50 min-h-screen">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Berhasil!</h2>
            <p className="text-gray-600 mb-4">Janji temu Anda telah dikonfirmasi. Kami akan menghubungi Anda segera.</p>
            <Badge variant="secondary" className="mb-4">
              {formData.selectedDate &&
                `${formData.selectedDate.day} ${months[formData.selectedDate.month]} ${formData.selectedDate.year}`}{" "}
              • {formData.selectedTime}
            </Badge>
            <Button onClick={() => setSubmitSuccess(false)} className="w-full">
              Buat Booking Lain
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image fill src="/img/jan-kopriva-sh_7sFEFICI-unsplash.jpg" alt="Professional car wash service" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 hover:bg-black/0 transition-colors duration-300 bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Car Wash</h1>
            <p className="text-lg md:text-xl opacity-90">Professional service, convenient scheduling</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 justify-center py-8">
        <div className="max-w-4xl w-full mx-4 space-y-6">
          {/* Header */}
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl">
                <Calendar className="w-8 h-8 text-blue-500" />
                Pesan Janji Temu
              </CardTitle>
              <CardDescription className="text-lg">
                Pilih tanggal dan waktu yang sesuai untuk layanan cuci mobil Anda.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Selected Branch */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-blue-500" />
                Cabang yang Dipilih
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-center rounded-lg bg-blue-100 size-12">
                  <MapPin size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sparkle & Shine Car Wash</p>
                  <p className="text-sm text-gray-600">Jl. Raya Utama No. 123, Jakarta Pusat</p>
                  <p className="text-xs text-blue-600 mt-1">⭐ 4.8 rating • Open 9AM - 6PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Date & Time Selection */}
            <div className="space-y-6">
              <DatePicker
                selectedDate={formData.selectedDate || null}
                currentMonth={currentMonth}
                currentYear={currentYear}
                onDateSelect={handleDateClick}
                onMonthNavigate={navigateMonth}
                error={errors.selectedDate}
              />

              <TimePicker
                selectedTime={formData.selectedTime || ""}
                onTimeSelect={(time) => handleInputChange("selectedTime", time)}
                error={errors.selectedTime}
              />
            </div>

            {/* Service Selection */}
            <ServiceSelector
              selectedService={formData.selectedService || ""}
              onServiceSelect={(serviceId) => handleInputChange("selectedService", serviceId)}
              error={errors.selectedService}
            />
          </div>

          {/* Contact Details */}
          <ContactForm
            formData={{
              fullName: formData.fullName || "",
              phoneNumber: formData.phoneNumber || "",
              email: formData.email || "",
            }}
            errors={{
              fullName: errors.fullName,
              phoneNumber: errors.phoneNumber,
              email: errors.email,
            }}
            onInputChange={(field: string, value: string) => handleInputChange(field as keyof BookingFormData, value)}
          />

          {/* Vehicle Details */}
          <VehicleForm
            formData={{
              vehicleBrand: formData.vehicleBrand || "",
              vehicleModel: formData.vehicleModel || "",
              licensePlate: formData.licensePlate || "",
            }}
            errors={{
              vehicleBrand: errors.vehicleBrand,
              vehicleModel: errors.vehicleModel,
              licensePlate: errors.licensePlate,
            }}
            onInputChange={(field: string, value: string) => handleInputChange(field as keyof BookingFormData, value)}
          />

          {/* Summary & Submit */}
          <BookingSummary
            selectedDate={formData.selectedDate || null}
            selectedTime={formData.selectedTime || ""}
            selectedService={formData.selectedService || ""}
            services={services}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="lg"
              className="min-w-[200px] bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              {isSubmitting ? "Memproses..." : "Konfirmasi Janji Temu"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingServicePage
