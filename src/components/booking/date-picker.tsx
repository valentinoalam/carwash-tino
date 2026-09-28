"use client"
import type React from "react"
import { ChevronLeft, ChevronRight, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DatePickerProps {
  selectedDate: { day: number; month: number; year: number } | null
  currentMonth: number
  currentYear: number
  onDateSelect: (day: number | null) => void
  onMonthNavigate: (direction: "prev" | "next") => void
  error?: string
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  currentMonth,
  currentYear,
  onDateSelect,
  onMonthNavigate,
  error,
}) => {
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

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year)
    const firstDay = getFirstDayOfMonth(month, year)
    const days: (number | null)[] = []

    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const calendarDays = generateCalendarDays(currentMonth, currentYear)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Pilih Tanggal
        </CardTitle>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" onClick={() => onMonthNavigate("prev")}>
                <ChevronLeft size={16} />
              </Button>
              <h4 className="font-semibold">
                {months[currentMonth]} {currentYear}
              </h4>
              <Button variant="ghost" size="sm" onClick={() => onMonthNavigate("next")}>
                <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["M", "S", "S", "R", "K", "J", "S"].map((day, idx) => (
                <div key={idx} className="text-xs font-medium text-gray-500 text-center p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => (
                <Button
                  key={idx}
                  variant={
                    selectedDate?.day === day &&
                    selectedDate?.month === currentMonth &&
                    selectedDate?.year === currentYear
                      ? "default"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() => onDateSelect(day)}
                  disabled={!day}
                  className={`h-8 w-8 p-0 ${!day ? "invisible" : ""}`}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DatePicker
