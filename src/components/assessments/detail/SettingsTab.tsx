"use client"

import { motion } from "framer-motion"
import { Save, Archive, Copy, Trash2 } from "lucide-react"
import { useState } from "react"
import { AssessmentDetail } from "@/lib/assessment-detail-types"
import { ProctoringSettings } from "@/components/proctoring/ProctoringSettings"
import { ScheduleSettings } from "@/components/assessment/scheduling/ScheduleSettings"

interface SettingsTabProps {
  assessment: AssessmentDetail
  onUpdate: (assessment: AssessmentDetail) => void
}

export function SettingsTab({ assessment, onUpdate }: SettingsTabProps) {
  const [formData, setFormData] = useState(assessment)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const keys = field.split(".")
      let current: any = newData
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      return newData
    })
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onUpdate(formData)
    setHasChanges(false)
    setIsSaving(false)
  }

  return (
    <div className="p-8 space-y-8" style={{ backgroundColor: "#FAFAFA" }}>
      {/* General Settings */}
      <SettingsSection title="General Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
              Assessment Name
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 resize-none"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#C9F4D4",
                  color: "#1E5A3B",
                }}
              >
                <option value="assessment">Assessment Competency</option>
                <option value="dsa">DSA Coding</option>
                <option value="cloud">Cloud Labs</option>
                <option value="ai">AI/ML Challenges</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#C9F4D4",
                  color: "#1E5A3B",
                }}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="paused">Paused</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* Assessment Configuration */}
      <SettingsSection title="Assessment Configuration">
        <div className="space-y-4">
          <ToggleSetting
            label="Time Limit"
            value={formData.config.duration}
            onChange={(val) => handleChange("config.duration", val)}
            type="number"
            unit="minutes"
          />
          <ToggleSetting
            label="Passing Score"
            value={formData.config.passingScore}
            onChange={(val) => handleChange("config.passingScore", val)}
            type="number"
            unit="%"
          />
          <ToggleSetting
            label="Allow Resume"
            checked={formData.config.allowResume}
            onChange={(val) => handleChange("config.allowResume", val)}
            type="toggle"
          />
          <ToggleSetting
            label="Randomize Questions"
            checked={formData.config.randomizeQuestions}
            onChange={(val) => handleChange("config.randomizeQuestions", val)}
            type="toggle"
          />
          <ToggleSetting
            label="Show Results Immediately"
            checked={formData.config.showResultsImmediately}
            onChange={(val) => handleChange("config.showResultsImmediately", val)}
            type="toggle"
          />
        </div>
      </SettingsSection>

      {/* Schedule & Availability */}
      <ScheduleSettings assessment={formData} onUpdate={onUpdate} />

      {/* Proctoring & Security */}
      <ProctoringSettings
        config={formData.config.proctoring}
        onUpdate={(newConfig) => handleChange("config.proctoring", newConfig)}
      />

      {/* Notifications */}
      <SettingsSection title="Notifications">
        <div className="space-y-4">
          <ToggleSetting
            label="Email me when candidate completes"
            checked={true}
            onChange={() => {}}
            type="toggle"
          />
          <ToggleSetting
            label="Send reminders to incomplete candidates"
            checked={true}
            onChange={() => {}}
            type="toggle"
          />
          <ToggleSetting
            label="Daily digest of activity"
            checked={false}
            onChange={() => {}}
            type="toggle"
          />
          <ToggleSetting
            label="Alert on proctoring issues"
            checked={true}
            onChange={() => {}}
            type="toggle"
          />
        </div>
      </SettingsSection>

      {/* Candidate Experience */}
      <SettingsSection title="Candidate Experience">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
              Welcome Message
            </label>
            <textarea
              placeholder="Enter welcome message..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none resize-none"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
              Instructions
            </label>
            <textarea
              placeholder="Enter instructions..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none resize-none"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
              Thank You Message
            </label>
            <textarea
              placeholder="Enter thank you message..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none resize-none"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
              Custom Branding
            </label>
            <button
              className="px-4 py-2 rounded-xl border-2 font-medium"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              Upload Logo
            </button>
          </div>
        </div>
      </SettingsSection>

      {/* Danger Zone */}
      <SettingsSection title="Danger Zone">
        <div className="flex items-center gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#F59E0B",
              color: "#F59E0B",
            }}
          >
            <Archive className="w-4 h-4" />
            Archive Assessment
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#EF4444",
              color: "#EF4444",
            }}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </motion.button>
        </div>
      </SettingsSection>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t" style={{ borderColor: "#E8FAF0" }}>
        <button
          className="px-6 py-3 rounded-xl font-semibold text-sm border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          Cancel
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: hasChanges
              ? "linear-gradient(135deg, #C9F4D4, #80EFC0)"
              : "#E8FAF0",
            color: "#1E5A3B",
            boxShadow: hasChanges ? "0 4px 12px rgba(128, 239, 192, 0.3)" : "none",
          }}
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </motion.button>
      </div>
    </div>
  )
}

function SettingsSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border-2"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <h3 className="text-xl font-bold mb-6" style={{ color: "#1E5A3B" }}>
        {title}
      </h3>
      {children}
    </motion.div>
  )
}

function ToggleSetting({
  label,
  checked,
  value,
  onChange,
  type,
  unit,
}: {
  label: string
  checked?: boolean
  value?: number
  onChange: (val: any) => void
  type: "toggle" | "number"
  unit?: string
}) {
  if (type === "toggle") {
    return (
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium" style={{ color: "#2D7A52" }}>
          {label}
        </label>
        <button
          onClick={() => onChange(!checked)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            checked ? "bg-[#10B981]" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              checked ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium" style={{ color: "#2D7A52" }}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-24 px-3 py-2 rounded-lg border-2 focus:outline-none text-right"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        />
        {unit && (
          <span className="text-sm font-medium" style={{ color: "#4A9A6A" }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

