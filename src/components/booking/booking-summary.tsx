"use client"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BookingSummaryProps {
  selectedDate: { day: number; month: number; year: number } | null
  selectedTime: string
  selectedService: string
  services: Array<{ id: string; name: string; price: string }>
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ selectedDate, selectedTime, selectedService, services }) => {
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

  const selectedServiceDetails = services.find((s) => s.id === selectedService)

  if (!selectedDate && !selectedTime && !selectedService) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ringkasan Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          {selectedDate && (
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggal:</span>
              <span className="font-medium">
                {selectedDate.day} {months[selectedDate.month]} {selectedDate.year}
              </span>
            </div>
          )}
          {selectedTime && (
            <div className="flex justify-between">
              <span className="text-gray-600">Waktu:</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
          )}
          {selectedServiceDetails && (
            <div className="flex justify-between">
              <span className="text-gray-600">Layanan:</span>
              <span className="font-medium">
                {selectedServiceDetails.name} - {selectedServiceDetails.price}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary
