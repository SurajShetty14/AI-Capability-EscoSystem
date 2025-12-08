"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DateTimePickerProps {
  value?: Date
  onChange: (date: Date) => void
  placeholder?: string
  showTime?: boolean
  minDate?: Date
  maxDate?: Date
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Select date",
  showTime = true,
  minDate,
  maxDate,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null)
  const [selectedTime, setSelectedTime] = useState<string>(
    value ? formatTime(value) : "09:00"
  )
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      setSelectedDate(value)
      setSelectedTime(formatTime(value))
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    if (showTime) {
      const [hours, minutes] = selectedTime.split(":")
      const newDate = new Date(date)
      newDate.setHours(parseInt(hours), parseInt(minutes))
      onChange(newDate)
    } else {
      onChange(date)
    }
  }

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
    if (selectedDate) {
      const [hours, minutes] = time.split(":")
      const newDate = new Date(selectedDate)
      newDate.setHours(parseInt(hours), parseInt(minutes))
      onChange(newDate)
    }
  }

  const getTimeSlots = () => {
    const slots = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(time)
      }
    }
    return slots
  }

  const displayValue = selectedDate
    ? `${formatDate(selectedDate)}${showTime ? ` ${formatTimeDisplay(selectedTime)}` : ""}`
    : placeholder

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all w-full text-left"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#C9F4D4",
          color: selectedDate ? "#1E5A3B" : "#9CA3AF",
        }}
      >
        <Calendar className="w-5 h-5" style={{ color: "#4A9A6A" }} />
        <span className="flex-1">{displayValue}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-xl border-2 shadow-lg z-50"
            style={{
              borderColor: "#C9F4D4",
              boxShadow: "0 4px 16px rgba(201, 244, 212, 0.3)",
            }}
          >
            <CalendarPicker
              selectedDate={selectedDate}
              onSelect={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
            />
            {showTime && (
              <div className="p-4 border-t" style={{ borderColor: "#E8FAF0" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4" style={{ color: "#4A9A6A" }} />
                  <span className="text-sm font-semibold" style={{ color: "#1E5A3B" }}>
                    Time
                  </span>
                </div>
                <select
                  value={selectedTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border-2"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#C9F4D4",
                    color: "#1E5A3B",
                  }}
                >
                  {getTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {formatTimeDisplay(time)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CalendarPicker({
  selectedDate,
  onSelect,
  minDate,
  maxDate,
}: {
  selectedDate: Date | null
  onSelect: (date: Date) => void
  minDate?: Date
  maxDate?: Date
}) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate || new Date()
  )

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const days = getDaysInMonth(currentMonth)

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E8FAF0] transition-colors"
          style={{ color: "#4A9A6A" }}
        >
          ←
        </button>
        <div className="font-bold" style={{ color: "#1E5A3B" }}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E8FAF0] transition-colors"
          style={{ color: "#4A9A6A" }}
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold py-2"
            style={{ color: "#6B7280" }}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => {
          if (!date) {
            return <div key={idx} className="aspect-square" />
          }

          const disabled = isDateDisabled(date)
          const selected = isDateSelected(date)
          const today = isToday(date)

          return (
            <button
              key={idx}
              onClick={() => !disabled && onSelect(date)}
              disabled={disabled}
              className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                disabled
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-[#E8FAF0] cursor-pointer"
              } ${selected ? "bg-[#80EFC0] text-white" : ""} ${today && !selected ? "ring-2 ring-[#80EFC0]" : ""}`}
              style={{
                color: selected ? "#FFFFFF" : today ? "#1E5A3B" : "#2D7A52",
              }}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: "#E8FAF0" }}>
        <button
          onClick={() => onSelect(new Date())}
          className="flex-1 px-3 py-2 rounded-lg text-sm font-medium border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          Today
        </button>
        <button
          onClick={() => onSelect(new Date())}
          className="flex-1 px-3 py-2 rounded-lg text-sm font-medium border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

function formatTimeDisplay(time: string) {
  const [hours, minutes] = time.split(":")
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

