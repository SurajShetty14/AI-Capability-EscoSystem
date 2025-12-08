"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Globe, AlertTriangle, Mail } from "lucide-react"
import { AssessmentFormData } from "@/hooks/useAssessmentForm"
import { DateTimePicker } from "@/components/assessment/scheduling/DateTimePicker"
import { TimezonePicker } from "@/components/assessment/scheduling/TimezonePicker"
import { AvailabilityType, ScheduleConfig } from "@/lib/scheduling/types"
import { calculateDuration } from "@/lib/scheduling/timezone-utils"

interface ScheduleStepProps {
  formData: AssessmentFormData
  updateField: (field: keyof AssessmentFormData, value: any) => void
}

export function ScheduleStep({ formData, updateField }: ScheduleStepProps) {
  const [availabilityType, setAvailabilityType] = useState<AvailabilityType>(
    (formData as any).schedule?.availabilityType || "immediate"
  )
  const [startDateTime, setStartDateTime] = useState<Date | undefined>(
    (formData as any).schedule?.startDateTime
      ? new Date((formData as any).schedule.startDateTime)
      : undefined
  )
  const [endDateTime, setEndDateTime] = useState<Date | undefined>(
    (formData as any).schedule?.endDateTime
      ? new Date((formData as any).schedule.endDateTime)
      : undefined
  )
  const [timezone, setTimezone] = useState<string>(
    (formData as any).schedule?.timezone || "Asia/Kolkata"
  )
  const [hasDeadline, setHasDeadline] = useState<boolean>(
    (formData as any).schedule?.hasDeadline || false
  )
  const [deadlineDateTime, setDeadlineDateTime] = useState<Date | undefined>(
    (formData as any).schedule?.deadlineDateTime
      ? new Date((formData as any).schedule.deadlineDateTime)
      : undefined
  )
  const [autoSubmit, setAutoSubmit] = useState<boolean>(
    (formData as any).schedule?.autoSubmit || false
  )
  const [reminders, setReminders] = useState({
    onInvite: true,
    threeDaysBefore: true,
    oneDayBefore: true,
    twoHoursBefore: true,
    custom: [] as number[],
  })

  const handleAvailabilityTypeChange = (type: AvailabilityType) => {
    setAvailabilityType(type)
    updateSchedule({ availabilityType: type })
  }

  const updateSchedule = (updates: Partial<ScheduleConfig>) => {
    const currentSchedule = (formData as any).schedule || {}
    const newSchedule = {
      ...currentSchedule,
      ...updates,
      reminders,
    }
    updateField("schedule" as any, newSchedule)
  }

  const handleStartDateChange = (date: Date) => {
    setStartDateTime(date)
    updateSchedule({ startDateTime: date })
  }

  const handleEndDateChange = (date: Date) => {
    setEndDateTime(date)
    updateSchedule({ endDateTime: date })
  }

  const handleDeadlineChange = (date: Date) => {
    setDeadlineDateTime(date)
    updateSchedule({ deadlineDateTime: date })
  }

  const handleTimezoneChange = (tz: string) => {
    setTimezone(tz)
    updateSchedule({ timezone: tz })
  }

  const handleReminderChange = (key: keyof typeof reminders, value: boolean | number[]) => {
    const newReminders = { ...reminders, [key]: value }
    setReminders(newReminders)
    updateSchedule({ reminders: newReminders })
  }

  const durationText =
    startDateTime && endDateTime ? calculateDuration(startDateTime, endDateTime) : ""

  const formatDatePreview = (date: Date | undefined) => {
    if (!date) return "Not set"
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8" style={{ backgroundColor: "#FAFAFA" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-2" style={{ color: "#1E5A3B" }}>
            Schedule Assessment Availability
          </h2>
          <p className="text-lg" style={{ color: "#4A9A6A" }}>
            Choose when candidates can take this assessment
          </p>
        </div>

        {/* Availability Type */}
        <div
          className="rounded-2xl p-6 border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
          }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
            Assessment Availability
          </h3>
          <div className="space-y-3">
            <RadioOption
              value="immediate"
              selected={availabilityType}
              onChange={handleAvailabilityTypeChange}
              label="Available Immediately (Default)"
              description="Candidates can start as soon as they receive invite"
            />
            <RadioOption
              value="scheduled"
              selected={availabilityType}
              onChange={handleAvailabilityTypeChange}
              label="Schedule Specific Window"
              description="Set start and end dates/times"
            />
            <RadioOption
              value="custom"
              selected={availabilityType}
              onChange={handleAvailabilityTypeChange}
              label="Custom Schedule Per Candidate"
              description="Set individual time slots (configure in next step)"
            />
          </div>
        </div>

        {/* Assessment Window */}
        {availabilityType === "scheduled" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="rounded-2xl p-6 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
            }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
              Assessment Window
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                  Start Date & Time:
                </label>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <DateTimePicker
                      value={startDateTime}
                      onChange={handleStartDateChange}
                      placeholder="Select start date"
                      minDate={new Date()}
                    />
                  </div>
                  <TimezonePicker value={timezone} onChange={handleTimezoneChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                  End Date & Time:
                </label>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <DateTimePicker
                      value={endDateTime}
                      onChange={handleEndDateChange}
                      placeholder="Select end date"
                      minDate={startDateTime}
                    />
                  </div>
                  <TimezonePicker value={timezone} onChange={handleTimezoneChange} />
                </div>
              </div>
              {durationText && (
                <div
                  className="py-2 px-4 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: "rgba(232, 250, 240, 0.5)",
                    color: "#4A9A6A",
                  }}
                >
                  Duration: {durationText}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Completion Deadline */}
        <div
          className="rounded-2xl p-6 border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
          }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
            Completion Deadline
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="hasDeadline"
                checked={hasDeadline}
                onChange={(e) => {
                  setHasDeadline(e.target.checked)
                  updateSchedule({ hasDeadline: e.target.checked })
                }}
                className="w-5 h-5 rounded border-2"
                style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
              />
              <label htmlFor="hasDeadline" className="font-semibold" style={{ color: "#1E5A3B" }}>
                Set hard deadline
              </label>
            </div>
            {hasDeadline && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                    Candidates must complete by:
                  </label>
                  <div className="flex items-center gap-3">
                    <DateTimePicker
                      value={deadlineDateTime}
                      onChange={handleDeadlineChange}
                      placeholder="Select deadline"
                      minDate={startDateTime || new Date()}
                    />
                    <TimezonePicker value={timezone} onChange={handleTimezoneChange} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="autoSubmit"
                    checked={autoSubmit}
                    onChange={(e) => {
                      setAutoSubmit(e.target.checked)
                      updateSchedule({ autoSubmit: e.target.checked })
                    }}
                    className="w-5 h-5 rounded border-2"
                    style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
                  />
                  <label htmlFor="autoSubmit" className="text-sm" style={{ color: "#2D7A52" }}>
                    ⚠️ Tests will auto-submit at deadline if incomplete
                  </label>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Automated Reminders */}
        <div
          className="rounded-2xl p-6 border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
          }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
            Automated Reminders
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="reminderOnInvite"
                checked={reminders.onInvite}
                onChange={(e) => handleReminderChange("onInvite", e.target.checked)}
                className="w-5 h-5 rounded border-2"
                style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
              />
              <label htmlFor="reminderOnInvite" style={{ color: "#2D7A52" }}>
                When invitation is sent
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="reminderThreeDays"
                checked={reminders.threeDaysBefore}
                onChange={(e) => handleReminderChange("threeDaysBefore", e.target.checked)}
                className="w-5 h-5 rounded border-2"
                style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
              />
              <label htmlFor="reminderThreeDays" style={{ color: "#2D7A52" }}>
                3 days before deadline
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="reminderOneDay"
                checked={reminders.oneDayBefore}
                onChange={(e) => handleReminderChange("oneDayBefore", e.target.checked)}
                className="w-5 h-5 rounded border-2"
                style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
              />
              <label htmlFor="reminderOneDay" style={{ color: "#2D7A52" }}>
                1 day before deadline
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="reminderTwoHours"
                checked={reminders.twoHoursBefore}
                onChange={(e) => handleReminderChange("twoHoursBefore", e.target.checked)}
                className="w-5 h-5 rounded border-2"
                style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
              />
              <label htmlFor="reminderTwoHours" style={{ color: "#2D7A52" }}>
                2 hours before deadline
              </label>
            </div>
          </div>
        </div>

        {/* Timezone Handling */}
        <div
          className="rounded-2xl p-6 border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
          }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
            Time Zone Handling
          </h3>
          <div className="space-y-3">
            <RadioOption
              value="org"
              selected="candidate"
              onChange={() => {}}
              label="Organization timezone (IST +05:30)"
              description=""
            />
            <RadioOption
              value="candidate"
              selected="candidate"
              onChange={() => {}}
              label="Candidate's local timezone (Auto-detect)"
              description=""
            />
          </div>
          <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: "rgba(232, 250, 240, 0.3)" }}>
            <p className="text-sm" style={{ color: "#2D7A52" }}>
              ℹ️ Candidates will see times in their local timezone
            </p>
          </div>
        </div>

        {/* Email Preview */}
        <div
          className="rounded-2xl p-6 border-2 border-dashed"
          style={{
            backgroundColor: "rgba(232, 250, 240, 0.3)",
            borderColor: "#C9F4D4",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5" style={{ color: "#4A9A6A" }} />
            <h3 className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
              Candidate Email Preview
            </h3>
          </div>
          <div className="space-y-2 text-sm" style={{ color: "#2D7A52" }}>
            <p>"You have been invited to take the Full Stack Developer Assessment.</p>
            {startDateTime && (
              <p>
                Available from: {formatDatePreview(startDateTime)} {timezone === "Asia/Kolkata" ? "IST" : ""}
              </p>
            )}
            {deadlineDateTime && (
              <p>
                Must complete by: {formatDatePreview(deadlineDateTime)} {timezone === "Asia/Kolkata" ? "IST" : ""}
              </p>
            )}
            <p>Duration: 90 minutes</p>
            <p className="mt-4">[Start Assessment]"</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function RadioOption({
  value,
  selected,
  onChange,
  label,
  description,
}: {
  value: string
  selected: string
  onChange: (value: string) => void
  label: string
  description: string
}) {
  const isSelected = selected === value
  return (
    <button
      onClick={() => onChange(value)}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
        isSelected ? "border-[#80EFC0] bg-[#E8FAF0]" : "border-[#E8FAF0] bg-white hover:border-[#C9F4D4]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isSelected ? "border-[#80EFC0]" : "border-[#9CA3AF]"
          }`}
        >
          {isSelected && <div className="w-3 h-3 rounded-full bg-[#80EFC0]" />}
        </div>
        <div>
          <div className="font-semibold" style={{ color: "#1E5A3B" }}>
            {label}
          </div>
          {description && (
            <div className="text-xs mt-1" style={{ color: "#6B7280" }}>
              {description}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

