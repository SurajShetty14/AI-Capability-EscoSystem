"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface TimerProps {
  timeRemaining: number
}

export function Timer({ timeRemaining: initialTime }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)

  useEffect(() => {
    setTimeRemaining(initialTime)
  }, [initialTime])

  useEffect(() => {
    if (timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeRemaining])

  const hours = Math.floor(timeRemaining / 3600)
  const minutes = Math.floor((timeRemaining % 3600) / 60)
  const seconds = timeRemaining % 60

  const formatTime = (value: number) => value.toString().padStart(2, "0")

  const isLowTime = timeRemaining < 300 // Less than 5 minutes

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
        isLowTime ? "bg-red-100 text-red-700" : "bg-[#E8FAF0]"
      }`}
      style={isLowTime ? {} : { color: "#1E5A3B" }}
    >
      <Clock className="w-5 h-5" />
      <span>
        {hours > 0 ? `${formatTime(hours)}:` : ""}
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  )
}

