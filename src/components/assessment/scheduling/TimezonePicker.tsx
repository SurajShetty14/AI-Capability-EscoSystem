"use client"

import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Timezone {
  value: string
  label: string
  offset: string
}

const commonTimezones: Timezone[] = [
  { value: "UTC", label: "UTC", offset: "+00:00" },
  { value: "America/New_York", label: "EST", offset: "-05:00" },
  { value: "America/Chicago", label: "CST", offset: "-06:00" },
  { value: "America/Denver", label: "MST", offset: "-07:00" },
  { value: "America/Los_Angeles", label: "PST", offset: "-08:00" },
  { value: "Europe/London", label: "GMT", offset: "+00:00" },
  { value: "Europe/Paris", label: "CET", offset: "+01:00" },
  { value: "Asia/Dubai", label: "GST", offset: "+04:00" },
  { value: "Asia/Kolkata", label: "IST", offset: "+05:30" },
  { value: "Asia/Singapore", label: "SGT", offset: "+08:00" },
  { value: "Asia/Tokyo", label: "JST", offset: "+09:00" },
  { value: "Australia/Sydney", label: "AEDT", offset: "+11:00" },
]

interface TimezonePickerProps {
  value: string
  onChange: (timezone: string) => void
}

export function TimezonePicker({ value, onChange }: TimezonePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

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

  const selectedTimezone = commonTimezones.find((tz) => tz.value === value) || commonTimezones[8] // Default to IST

  const filteredTimezones = commonTimezones.filter(
    (tz) =>
      tz.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.value.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#C9F4D4",
          color: "#1E5A3B",
        }}
      >
        <Globe className="w-5 h-5" style={{ color: "#4A9A6A" }} />
        <span>{selectedTimezone.label} {selectedTimezone.offset}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-xl border-2 shadow-lg z-50 w-64"
            style={{
              borderColor: "#C9F4D4",
              boxShadow: "0 4px 16px rgba(201, 244, 212, 0.3)",
            }}
          >
            <div className="p-3 border-b" style={{ borderColor: "#E8FAF0" }}>
              <input
                type="text"
                placeholder="Search timezone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border-2 text-sm"
                style={{
                  backgroundColor: "#FAFAFA",
                  borderColor: "#E8FAF0",
                  color: "#1E5A3B",
                }}
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filteredTimezones.map((tz) => (
                <button
                  key={tz.value}
                  onClick={() => {
                    onChange(tz.value)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-[#E8FAF0] transition-colors ${
                    value === tz.value ? "bg-[#E8FAF0]" : ""
                  }`}
                  style={{ color: "#1E5A3B" }}
                >
                  <div className="font-medium">{tz.label}</div>
                  <div className="text-xs" style={{ color: "#6B7280" }}>
                    {tz.value} ({tz.offset})
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

