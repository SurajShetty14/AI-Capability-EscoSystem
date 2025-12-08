"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, AlertTriangle, Edit, Pause, Play } from "lucide-react"
import { DateTimePicker } from "./DateTimePicker"
import { TimezonePicker } from "./TimezonePicker"
import { AssessmentDetail } from "@/lib/assessment-detail-types"
import { getTimeRemaining, getDeadlineStatus } from "@/lib/scheduling/timezone-utils"

interface ScheduleSettingsProps {
  assessment: AssessmentDetail
  onUpdate: (assessment: AssessmentDetail) => void
}

export function ScheduleSettings({ assessment, onUpdate }: ScheduleSettingsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showExtendModal, setShowExtendModal] = useState(false)
  const [showPauseModal, setShowPauseModal] = useState(false)

  // Mock schedule data - in production, this would come from assessment
  const schedule = {
    availabilityType: "scheduled" as const,
    startDateTime: new Date("2025-01-15T09:00:00"),
    endDateTime: new Date("2025-01-30T23:59:59"),
    deadlineDateTime: new Date("2025-01-30T23:59:59"),
    timezone: "Asia/Kolkata",
    hasDeadline: true,
    autoSubmit: true,
    status: "active" as const,
  }

  const deadlineStatus = schedule.deadlineDateTime
    ? getDeadlineStatus(schedule.deadlineDateTime)
    : { status: "on-track" as const, color: "#10B981", icon: "✅" }

  const timeRemaining = schedule.deadlineDateTime
    ? getTimeRemaining(schedule.deadlineDateTime)
    : "N/A"

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Current Schedule Status */}
      <div
        className="rounded-2xl p-6 border-2"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#C9F4D4",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
            Current Schedule
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <Edit className="w-4 h-4" />
            Quick Edit
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{deadlineStatus.icon}</span>
            <div>
              <div className="font-semibold" style={{ color: "#1E5A3B" }}>
                Status: {schedule.status === "active" ? "🟢 Active" : "⏸️ Paused"} (Currently accepting submissions)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
                Available from:
              </div>
              <div className="text-base" style={{ color: "#1E5A3B" }}>
                {formatDate(schedule.startDateTime)} IST
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
                Deadline:
              </div>
              <div className="text-base" style={{ color: "#1E5A3B" }}>
                {formatDate(schedule.deadlineDateTime)} IST
              </div>
            </div>
          </div>

          <div
            className="p-3 rounded-lg"
            style={{
              backgroundColor: "rgba(232, 250, 240, 0.5)",
            }}
          >
            <div className="text-sm font-medium" style={{ color: "#4A9A6A" }}>
              Time remaining: {timeRemaining}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowExtendModal(true)}
              className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              Extend Deadline
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPauseModal(true)}
              className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#F59E0B",
                color: "#F59E0B",
              }}
            >
              <Pause className="w-4 h-4" />
              Pause Submissions
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Edit className="w-4 h-4" />
              Edit Schedule
            </motion.button>
          </div>
        </div>
      </div>

      {/* Schedule Configuration */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
          }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
            Schedule Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                Availability Type:
              </label>
              <div className="space-y-2">
                <RadioOption value="immediate" selected={schedule.availabilityType} onChange={() => {}} label="Available Immediately" />
                <RadioOption value="scheduled" selected={schedule.availabilityType} onChange={() => {}} label={`Scheduled Window (${formatDate(schedule.startDateTime)} - ${formatDate(schedule.endDateTime)})`} />
                <RadioOption value="custom" selected={schedule.availabilityType} onChange={() => {}} label="Custom Per Candidate" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                Assessment Window:
              </label>
              <div className="space-y-3">
                <div>
                  <div className="text-xs mb-1" style={{ color: "#6B7280" }}>Start:</div>
                  <div className="flex items-center gap-3">
                    <DateTimePicker value={schedule.startDateTime} onChange={() => {}} />
                    <TimezonePicker value={schedule.timezone} onChange={() => {}} />
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: "#6B7280" }}>End:</div>
                  <div className="flex items-center gap-3">
                    <DateTimePicker value={schedule.endDateTime} onChange={() => {}} />
                    <TimezonePicker value={schedule.timezone} onChange={() => {}} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                Completion Deadline:
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={schedule.hasDeadline}
                    className="w-5 h-5 rounded border-2"
                    style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
                  />
                  <span style={{ color: "#2D7A52" }}>Hard deadline:</span>
                  {schedule.hasDeadline && (
                    <div className="flex items-center gap-3">
                      <DateTimePicker value={schedule.deadlineDateTime} onChange={() => {}} />
                      <TimezonePicker value={schedule.timezone} onChange={() => {}} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={schedule.autoSubmit}
                    className="w-5 h-5 rounded border-2"
                    style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
                  />
                  <span style={{ color: "#2D7A52" }}>Auto-submit incomplete tests at deadline</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                Reminders:
              </label>
              <div className="space-y-2">
                <CheckboxOption label="3 days before (Jan 27)" checked={true} />
                <CheckboxOption label="1 day before (Jan 29)" checked={true} />
                <CheckboxOption label="2 hours before (Jan 30, 9:59 PM)" checked={true} />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "#E8FAF0" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-xl font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
                  color: "#1E5A3B",
                  boxShadow: "0 4px 12px rgba(128, 239, 192, 0.3)",
                }}
              >
                Save Changes
              </motion.button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-xl font-semibold text-sm border-2"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#C9F4D4",
                  color: "#1E5A3B",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Extend Deadline Modal */}
      {showExtendModal && (
        <ExtendDeadlineModal
          currentDeadline={schedule.deadlineDateTime}
          onClose={() => setShowExtendModal(false)}
          onExtend={(newDeadline) => {
            // Handle extend deadline
            setShowExtendModal(false)
          }}
        />
      )}

      {/* Pause Modal */}
      {showPauseModal && (
        <PauseModal
          onClose={() => setShowPauseModal(false)}
          onPause={() => {
            // Handle pause
            setShowPauseModal(false)
          }}
        />
      )}
    </div>
  )
}

function RadioOption({
  value,
  selected,
  onChange,
  label,
}: {
  value: string
  selected: string
  onChange: (value: string) => void
  label: string
}) {
  const isSelected = selected === value
  return (
    <button
      onClick={() => onChange(value)}
      className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
        isSelected ? "border-[#80EFC0] bg-[#E8FAF0]" : "border-[#E8FAF0] bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            isSelected ? "border-[#80EFC0]" : "border-[#9CA3AF]"
          }`}
        >
          {isSelected && <div className="w-2 h-2 rounded-full bg-[#80EFC0]" />}
        </div>
        <span className="text-sm" style={{ color: "#1E5A3B" }}>
          {label}
        </span>
      </div>
    </button>
  )
}

function CheckboxOption({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        className="w-5 h-5 rounded border-2"
        style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
      />
      <span className="text-sm" style={{ color: "#2D7A52" }}>
        {label}
      </span>
    </div>
  )
}

function ExtendDeadlineModal({
  currentDeadline,
  onClose,
  onExtend,
}: {
  currentDeadline: Date
  onClose: () => void
  onExtend: (newDeadline: Date) => void
}) {
  const [newDeadline, setNewDeadline] = useState<Date>(currentDeadline)
  const [notifyCandidates, setNotifyCandidates] = useState(true)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 border-2 max-w-md w-full mx-4"
        style={{
          borderColor: "#C9F4D4",
          boxShadow: "0 8px 32px rgba(201, 244, 212, 0.3)",
        }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Extend Deadline
        </h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm mb-2" style={{ color: "#6B7280" }}>
              Current: {currentDeadline.toLocaleDateString()} {currentDeadline.toLocaleTimeString()}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                New Deadline:
              </label>
              <DateTimePicker value={newDeadline} onChange={setNewDeadline} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifyCandidates}
              onChange={(e) => setNotifyCandidates(e.target.checked)}
              className="w-5 h-5 rounded border-2"
              style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
            />
            <span className="text-sm" style={{ color: "#2D7A52" }}>
              Notify all candidates
            </span>
          </div>
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-xl font-semibold text-sm border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => onExtend(newDeadline)}
              className="flex-1 px-4 py-2 rounded-xl font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
                color: "#1E5A3B",
              }}
            >
              Extend →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function PauseModal({
  onClose,
  onPause,
}: {
  onClose: () => void
  onPause: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 border-2 max-w-md w-full mx-4"
        style={{
          borderColor: "#C9F4D4",
          boxShadow: "0 8px 32px rgba(201, 244, 212, 0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5" style={{ color: "#F59E0B" }} />
          <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
            Pause Submissions
          </h3>
        </div>
        <p className="text-sm mb-4" style={{ color: "#6B7280" }}>
          This will immediately stop new submissions. 12 candidates are currently testing.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-xl font-semibold text-sm border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onPause}
            className="flex-1 px-4 py-2 rounded-xl font-semibold text-sm"
            style={{
              backgroundColor: "#F59E0B",
              color: "#FFFFFF",
            }}
          >
            Pause
          </button>
        </div>
      </motion.div>
    </div>
  )
}

