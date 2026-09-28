export interface BookingData {
  id: string
  date: string
  time: string
  service: string
  servicePrice: string
  location: string
  address: string
  customerName: string
  customerPhone: string
  customerEmail: string
  vehicleInfo: string
  bookingTime: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
}

// Mock database - in real app, this would be from a database
const mockBookings: Record<string, BookingData> = {
  BK001: {
    id: "BK001",
    date: "Saturday, July 20, 2024",
    time: "10:00 AM - 11:00 AM",
    service: "Premium Wash",
    servicePrice: "Rp 75.000",
    location: "Sparkle & Shine Car Wash - Central City",
    address: "Jl. Raya Utama No. 123, Jakarta Pusat",
    customerName: "John Doe",
    customerPhone: "+62 812-3456-7890",
    customerEmail: "john.doe@email.com",
    vehicleInfo: "Toyota Avanza - B 1234 XYZ",
    bookingTime: "2024-07-15 14:30:00",
    status: "confirmed",
  },
  BK002: {
    id: "BK002",
    date: "Sunday, July 21, 2024",
    time: "14:00 PM - 15:00 PM",
    service: "Standard Wash",
    servicePrice: "Rp 50.000",
    location: "Sparkle & Shine Car Wash - Central City",
    address: "Jl. Raya Utama No. 123, Jakarta Pusat",
    customerName: "Jane Smith",
    customerPhone: "+62 813-7890-1234",
    customerEmail: "jane.smith@email.com",
    vehicleInfo: "Honda Jazz - B 5678 ABC",
    bookingTime: "2024-07-16 09:15:00",
    status: "pending",
  },
  BK003: {
    id: "BK003",
    date: "Monday, July 22, 2024",
    time: "09:00 AM - 09:30 AM",
    service: "Quick Wash",
    servicePrice: "Rp 25.000",
    location: "Sparkle & Shine Car Wash - Central City",
    address: "Jl. Raya Utama No. 123, Jakarta Pusat",
    customerName: "Bob Wilson",
    customerPhone: "+62 814-5678-9012",
    customerEmail: "bob.wilson@email.com",
    vehicleInfo: "Suzuki Ertiga - B 9012 DEF",
    bookingTime: "2024-07-17 16:45:00",
    status: "completed",
  },
}

export const getBookingById = (id: string): BookingData | null => {
  return mockBookings[id] || null
}

export const getAllBookings = (): BookingData[] => {
  return Object.values(mockBookings)
}

export const generateBookingId = (): string => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `BK${timestamp}${random}`.toUpperCase()
}
