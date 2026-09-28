/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Send, MessageCircle } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface ChatBotProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm here to help you with information about The Haircut barbershop. You can ask me about our schedules, barbers, locations, or services!",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const barberData = {
    ethan: {
      name: "Ethan Carter",
      schedule: {
        monday: "9:00 AM - 4:00 PM (with lunch break)",
        tuesday: "9:00 AM - 4:00 PM (with lunch break)",
        wednesday: "9:00 AM - 4:00 PM (with lunch break)",
        thursday: "9:00 AM - 4:00 PM (with lunch break)",
        friday: "9:00 AM - 4:00 PM",
        saturday: "8:00 AM - 11:30 AM",
        sunday: "Closed",
      },
      location: "Downtown - 123 Main St",
    },
    liam: {
      name: "Liam Harper",
      schedule: {
        monday: "10:00 AM - 4:00 PM",
        tuesday: "10:00 AM - 4:00 PM",
        wednesday: "Closed",
        thursday: "10:00 AM - 4:00 PM",
        friday: "10:00 AM - 4:00 PM",
        saturday: "9:00 AM - 12:00 PM",
        sunday: "10:00 AM - 12:30 PM",
      },
      location: "Uptown - 456 Oak Ave",
    },
    noah: {
      name: "Noah Bennett",
      schedule: {
        monday: "9:30 AM - 4:00 PM",
        tuesday: "9:30 AM - 4:00 PM",
        wednesday: "9:30 AM - 4:00 PM",
        thursday: "9:30 AM - 4:00 PM",
        friday: "9:30 AM - 4:00 PM",
        saturday: "Closed",
        sunday: "Closed",
      },
      location: "Westside - 789 Pine St",
    },
  }

  const locations = [
    {
      name: "Downtown",
      address: "123 Main Street, Downtown District, NY 10001",
      phone: "(555) 123-4567",
      hours: "Mon-Fri: 9:00 AM - 8:00 PM, Sat: 8:00 AM - 6:00 PM, Sun: 10:00 AM - 5:00 PM",
      manager: "Ethan Carter",
    },
    {
      name: "Uptown",
      address: "456 Oak Avenue, Uptown Plaza, NY 10002",
      phone: "(555) 234-5678",
      hours: "Mon-Fri: 8:00 AM - 7:00 PM, Sat: 8:00 AM - 6:00 PM, Sun: Closed",
      manager: "Liam Harper",
    },
    {
      name: "Westside",
      address: "789 Pine Road, Westside Mall, NY 10003",
      phone: "(555) 345-6789",
      hours: "Mon-Fri: 10:00 AM - 9:00 PM, Sat: 9:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM",
      manager: "Noah Bennett",
    },
    {
      name: "Eastside",
      address: "321 Elm Street, Eastside Center, NY 10004",
      phone: "(555) 456-7890",
      hours: "Mon-Fri: 9:00 AM - 7:00 PM, Sat: 8:00 AM - 5:00 PM, Sun: 10:00 AM - 4:00 PM",
      manager: "Marcus Thompson",
    },
  ]

  const services = [
    { name: "Classic Cut", price: "$35", duration: "45 minutes" },
    { name: "Modern Fade", price: "$40", duration: "60 minutes" },
    { name: "Beard Trim & Style", price: "$25", duration: "30 minutes" },
    { name: "Complete Package", price: "$65", duration: "90 minutes" },
  ]

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Schedule queries
    if (
      message.includes("schedule") ||
      message.includes("hours") ||
      message.includes("when") ||
      message.includes("time")
    ) {
      if (message.includes("ethan")) {
        const schedule = Object.entries(barberData.ethan.schedule)
          .map(([day, hours]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours}`)
          .join("\n")
        return `Ethan Carter's schedule:\n${schedule}\n\nHe works at our ${barberData.ethan.location} location.`
      }
      if (message.includes("liam")) {
        const schedule = Object.entries(barberData.liam.schedule)
          .map(([day, hours]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours}`)
          .join("\n")
        return `Liam Harper's schedule:\n${schedule}\n\nHe works at our ${barberData.liam.location} location.`
      }
      if (message.includes("noah")) {
        const schedule = Object.entries(barberData.noah.schedule)
          .map(([day, hours]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours}`)
          .join("\n")
        return `Noah Bennett's schedule:\n${schedule}\n\nHe works at our ${barberData.noah.location} location.`
      }
      return "Our barbers have different schedules:\n\n• Ethan Carter (Downtown): Mon-Thu 9AM-4PM, Fri 9AM-4PM, Sat 8AM-11:30AM\n• Liam Harper (Uptown): Mon,Tue,Thu,Fri 10AM-4PM, Wed Closed, Sat 9AM-12PM, Sun 10AM-12:30PM\n• Noah Bennett (Westside): Mon-Fri 9:30AM-4PM, Weekends Closed\n\nWhich barber would you like to know more about?"
    }

    // Barber queries
    if (message.includes("barber") || message.includes("capster") || message.includes("who")) {
      if (message.includes("active") || message.includes("available") || message.includes("working")) {
        const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
        const activeBarbers = Object.entries(barberData)
          .filter(([_, barber]) => barber.schedule[today as keyof typeof barber.schedule] !== "Closed")
          .map(([_, barber]) => `• ${barber.name} at ${barber.location}`)
          .join("\n")

        return activeBarbers
          ? `Today's active barbers:\n${activeBarbers}\n\nWould you like to book an appointment?`
          : "I couldn't determine today's active barbers. Please call us or check our booking page for real-time availability!"
      }
      return "We have three skilled barbers:\n\n• Ethan Carter - Works at Downtown location\n• Liam Harper - Works at Uptown location\n• Noah Bennett - Works at Westside location\n\nEach has their own specialties and schedule. Who would you like to know more about?"
    }

    // Location queries
    if (
      message.includes("location") ||
      message.includes("address") ||
      message.includes("where") ||
      message.includes("branch")
    ) {
      if (message.includes("downtown")) {
        const loc = locations[0]
        return `${loc.name} Location:\n📍 ${loc.address}\n📞 ${loc.phone}\n🕒 ${loc.hours}\n👨‍💼 Manager: ${loc.manager}`
      }
      if (message.includes("uptown")) {
        const loc = locations[1]
        return `${loc.name} Location:\n📍 ${loc.address}\n📞 ${loc.phone}\n🕒 ${loc.hours}\n👨‍💼 Manager: ${loc.manager}`
      }
      if (message.includes("westside")) {
        const loc = locations[2]
        return `${loc.name} Location:\n📍 ${loc.address}\n📞 ${loc.phone}\n🕒 ${loc.hours}\n👨‍💼 Manager: ${loc.manager}`
      }
      if (message.includes("eastside")) {
        const loc = locations[3]
        return `${loc.name} Location:\n📍 ${loc.address}\n📞 ${loc.phone}\n🕒 ${loc.hours}\n👨‍💼 Manager: ${loc.manager}`
      }
      return "We have 4 locations:\n\n• Downtown - 123 Main St\n• Uptown - 456 Oak Ave\n• Westside - 789 Pine Rd\n• Eastside - 321 Elm St\n\nWhich location would you like details about?"
    }

    // Service queries
    if (
      message.includes("service") ||
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("cut")
    ) {
      const serviceList = services.map((s) => `• ${s.name} - ${s.price} (${s.duration})`).join("\n")
      return `Our services:\n\n${serviceList}\n\nWould you like to book an appointment?`
    }

    // Booking queries
    if (message.includes("book") || message.includes("appointment") || message.includes("reserve")) {
      return "Great! You can book an appointment in several ways:\n\n• Visit our booking page online\n• Call any of our locations directly\n• Walk-ins are welcome (subject to availability)\n\nWould you like me to provide contact information for a specific location?"
    }

    // Default response
    return "I can help you with information about:\n\n• Barber schedules and availability\n• Our 4 locations and contact details\n• Services and pricing\n• Booking appointments\n\nWhat would you like to know?"
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-4 z-50">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">Sharp Edge Assistant</h3>
              <p className="text-xs text-slate-400">Ask about schedules, barbers & locations</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isBot ? "bg-slate-700 text-slate-100" : "bg-amber-500 text-slate-900"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-700 text-slate-100 p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about schedules, barbers, or locations..."
              className="flex-1 bg-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 p-2 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
