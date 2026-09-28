"use client"
import type React from "react"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BookingStatusProps {
  status: "confirmed" | "pending" | "cancelled" | "completed"
}

const BookingStatus: React.FC<BookingStatusProps> = ({ status }) => {
  const statusConfig = {
    confirmed: {
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      label: "Confirmed",
      badgeVariant: "default" as const,
    },
    pending: {
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      label: "Pending",
      badgeVariant: "secondary" as const,
    },
    cancelled: {
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      label: "Cancelled",
      badgeVariant: "destructive" as const,
    },
    completed: {
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      label: "Completed",
      badgeVariant: "outline" as const,
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${config.bgColor}`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>
      <Badge variant={config.badgeVariant}>{config.label}</Badge>
    </div>
  )
}

export default BookingStatus
