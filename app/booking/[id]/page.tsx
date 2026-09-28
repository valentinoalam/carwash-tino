"use client"
import type React from "react"
import { CheckCircle, Calendar, Clock, Car, MapPin, Phone, Mail, ArrowLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import BookingStatus from "@/components/booking/booking-status"
import { getBookingById } from "@/utils/booking-data"
import { use } from "react";
interface BookingConfirmationPageProps {
  params: Promise<{ id: string }>
}

const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({ params }) => {
  const { id } = use(params);
  const bookingData = getBookingById(id)

  const handleAddToCalendar = () => {
    if (!bookingData) return

    // Parse date and time for calendar
    const startDate = new Date("2024-07-20T10:00:00")
    const endDate = new Date("2024-07-20T11:00:00")

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Car Wash Appointment&dates=${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=${encodeURIComponent(`${bookingData.service} at ${bookingData.location}`)}&location=${encodeURIComponent(bookingData.address)}`

    window.open(calendarUrl, "_blank")
  }

  // Handle booking not found
  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find a booking with ID: <strong>{id}</strong>
            </p>
            <div className="space-y-3">
              <Link href="/booking">
                <Button className="w-full">Make New Booking</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Your appointment has been confirmed. We'll send you a reminder 24 hours before."
      case "pending":
        return "Your booking is being processed. We'll confirm your appointment shortly."
      case "cancelled":
        return "This appointment has been cancelled. Contact us if you need assistance."
      case "completed":
        return "Thank you for choosing our service! We hope you're satisfied with the results."
      default:
        return "Booking status unknown."
    }
  }

  const getHeaderColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "from-green-50 to-blue-50"
      case "pending":
        return "from-yellow-50 to-orange-50"
      case "cancelled":
        return "from-red-50 to-pink-50"
      case "completed":
        return "from-blue-50 to-purple-50"
      default:
        return "from-gray-50 to-gray-100"
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getHeaderColor(bookingData.status)}`}>
      {/* Header with status message */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {bookingData.status === "confirmed"
                    ? "Booking Confirmed!"
                    : bookingData.status === "pending"
                      ? "Booking Received!"
                      : bookingData.status === "cancelled"
                        ? "Booking Cancelled"
                        : "Service Completed!"}
                </h1>
                <p className="text-gray-600 mt-1">{getStatusMessage(bookingData.status)}</p>
              </div>
            </div>
            <BookingStatus status={bookingData.status} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main appointment details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Summary */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Appointment Details
                </CardTitle>
                <Badge variant="secondary" className="w-fit bg-green-100 text-green-800">
                  Booking ID: #{bookingData.id}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{bookingData.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{bookingData.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Service</p>
                        <p className="font-medium">{bookingData.service}</p>
                        <p className="text-sm text-blue-600 font-semibold">{bookingData.servicePrice}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{bookingData.location}</p>
                        <p className="text-sm text-gray-600">{bookingData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer & Vehicle Info */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Customer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Name:</span>
                        <span>{bookingData.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{bookingData.customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{bookingData.customerEmail}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Vehicle Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-gray-500" />
                        <span>{bookingData.vehicleInfo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Booked:</span>
                        <span>{bookingData.bookingTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action sidebar */}
          <div className="space-y-6">
            {/* Quick Actions - only show for confirmed bookings */}
            {bookingData.status === "confirmed" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleAddToCalendar} className="w-full bg-[#309be8] hover:bg-blue-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Location
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* What to Expect - only for confirmed/pending */}
            {(bookingData.status === "confirmed" || bookingData.status === "pending") && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What to Expect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p>Arrive 5 minutes before your appointment</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p>Remove personal items from your vehicle</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p>Service duration: approximately 90 minutes</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p>Payment accepted: Cash, Card, Digital wallet</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="space-y-3">
              <Link href="/booking">
                <Button variant="outline" className="w-full bg-transparent">
                  Book Another Appointment
                </Button>
              </Link>

              <Link href="/">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmationPage
