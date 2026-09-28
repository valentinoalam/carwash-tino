"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import ChatBot from "./ChatBot"

export default function FloatingChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-base font-bold leading-normal tracking-[0.015em] min-w-0 gap-4 pl-4 pr-6 shadow-lg transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="truncate">Chat with us</span>
        </button>
      </div>

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
