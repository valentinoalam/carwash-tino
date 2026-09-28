"use client"
import type React from "react"
import { Clock, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface TimePickerProps {
  selectedTime: string
  onTimeSelect: (time: string) => void
  error?: string
}

const TimePicker: React.FC<TimePickerProps> = ({ selectedTime, onTimeSelect, error }) => {
  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          Pilih Waktu
        </CardTitle>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedTime} onValueChange={onTimeSelect} className="grid grid-cols-2 gap-3">
          {timeSlots.map((time) => (
            <div key={time} className="flex items-center space-x-2">
              <RadioGroupItem value={time} id={time} />
              <Label htmlFor={time} className="cursor-pointer flex-1 p-2 rounded border hover:bg-gray-50">
                {time}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

export default TimePicker
