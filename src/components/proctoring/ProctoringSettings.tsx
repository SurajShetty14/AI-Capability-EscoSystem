"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Info, Eye } from "lucide-react"

interface ProctoringSettingsProps {
  config: {
    enabled: boolean
    screenshot: boolean
    tabSwitching: boolean
    copyPaste: boolean
    webcam: boolean
    screenRecording: boolean
  }
  onUpdate: (config: any) => void
}

export function ProctoringSettings({ config, onUpdate }: ProctoringSettingsProps) {
  const [liveProctoring, setLiveProctoring] = useState(false)
  const [proctoringLevel, setProctoringLevel] = useState<"basic" | "standard" | "advanced">("standard")
  const [sensitivity, setSensitivity] = useState(50)
  const [autoPause, setAutoPause] = useState(true)
  const [autoAlert, setAutoAlert] = useState(true)
  const [autoFlag, setAutoFlag] = useState(true)
  const [autoTerminate, setAutoTerminate] = useState(false)

  return (
    <div className="space-y-6">
      {/* Live Proctoring Section */}
      <div
        className="rounded-2xl p-6 border-2"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#C9F4D4",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.15)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎥</span>
            <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
              Live Proctoring
            </h3>
          </div>
          <button className="text-sm font-medium flex items-center gap-1" style={{ color: "#4A9A6A" }}>
            <Info className="w-4 h-4" />
            Learn More
          </button>
        </div>

        <div className="space-y-6">
          {/* Enable Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold mb-1" style={{ color: "#1E5A3B" }}>
                Enable Live Proctoring
              </div>
              <div className="text-sm" style={{ color: "#6B7280" }}>
                Real-time monitoring with AI-powered detection
              </div>
            </div>
            <ToggleSwitch checked={liveProctoring} onChange={setLiveProctoring} />
          </div>

          {liveProctoring && (
            <>
              {/* Proctoring Level */}
              <div>
                <div className="font-semibold mb-3" style={{ color: "#1E5A3B" }}>
                  Proctoring Level:
                </div>
                <div className="space-y-3">
                  <RadioOption
                    value="basic"
                    selected={proctoringLevel}
                    onChange={setProctoringLevel}
                    label="Basic"
                    description="Screenshots only"
                  />
                  <RadioOption
                    value="standard"
                    selected={proctoringLevel}
                    onChange={setProctoringLevel}
                    label="Standard"
                    description="Webcam + Screenshots"
                  />
                  <RadioOption
                    value="advanced"
                    selected={proctoringLevel}
                    onChange={setProctoringLevel}
                    label="Advanced"
                    description="Webcam + Screen Share + Audio"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="font-semibold mb-3" style={{ color: "#1E5A3B" }}>
                  Features Included:
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <ToggleOption label="Webcam Recording" checked={proctoringLevel !== "basic"} disabled={proctoringLevel === "basic"} />
                  <ToggleOption label="Screen Recording" checked={proctoringLevel === "advanced"} disabled={proctoringLevel !== "advanced"} />
                  <ToggleOption label="Audio Recording" checked={proctoringLevel === "advanced"} disabled={proctoringLevel !== "advanced"} />
                  <ToggleOption label="Tab Switching Detection" checked={true} />
                  <ToggleOption label="Multiple Faces Detection" checked={proctoringLevel !== "basic"} disabled={proctoringLevel === "basic"} />
                  <ToggleOption label="No Face Detection Alert" checked={proctoringLevel !== "basic"} disabled={proctoringLevel === "basic"} />
                  <ToggleOption label="Mobile Phone Detection" checked={proctoringLevel !== "basic"} disabled={proctoringLevel === "basic"} />
                  <ToggleOption label="Voice Detection" checked={proctoringLevel === "advanced"} disabled={proctoringLevel !== "advanced"} />
                  <ToggleOption label="Copy/Paste Prevention" checked={true} />
                  <ToggleOption label="Right-Click Prevention" checked={true} />
                </div>
              </div>

              {/* Recording Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                    Store recordings:
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-xl border-2"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C9F4D4",
                      color: "#1E5A3B",
                    }}
                  >
                    <option>AWS S3</option>
                    <option>Google Cloud Storage</option>
                    <option>Azure Blob</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                    Retention period:
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-xl border-2"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C9F4D4",
                      color: "#1E5A3B",
                    }}
                  >
                    <option>30 days</option>
                    <option>60 days</option>
                    <option>90 days</option>
                    <option>1 year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                    Video quality:
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-xl border-2"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C9F4D4",
                      color: "#1E5A3B",
                    }}
                  >
                    <option>480p</option>
                    <option>720p</option>
                    <option>1080p</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
                    Frame rate:
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-xl border-2"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C9F4D4",
                      color: "#1E5A3B",
                    }}
                  >
                    <option>1 fps</option>
                    <option>5 fps</option>
                    <option>10 fps</option>
                  </select>
                </div>
              </div>

              {/* AI Detection Sensitivity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold" style={{ color: "#1E5A3B" }}>
                    AI Detection Sensitivity:
                  </div>
                  <div className="text-sm" style={{ color: "#6B7280" }}>
                    {sensitivity}%
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm" style={{ color: "#6B7280" }}>
                    Low
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sensitivity}
                    onChange={(e) => setSensitivity(Number(e.target.value))}
                    className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #C9F4D4 0%, #80EFC0 ${sensitivity}%, #E8FAF0 ${sensitivity}%, #E8FAF0 100%)`,
                    }}
                  />
                  <span className="text-sm" style={{ color: "#6B7280" }}>
                    High
                  </span>
                </div>
                <div className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
                  (Fewer false positives vs More accurate)
                </div>
              </div>

              {/* Auto Actions */}
              <div>
                <div className="font-semibold mb-3" style={{ color: "#1E5A3B" }}>
                  Auto Actions:
                </div>
                <div className="space-y-3">
                  <ToggleOption
                    label="Auto-pause test after 3 violations"
                    checked={autoPause}
                    onChange={setAutoPause}
                  />
                  <ToggleOption
                    label="Send alert to admin on suspicious behavior"
                    checked={autoAlert}
                    onChange={setAutoAlert}
                  />
                  <ToggleOption
                    label="Auto-flag candidates with violations"
                    checked={autoFlag}
                    onChange={setAutoFlag}
                  />
                  <ToggleOption
                    label="Auto-terminate test after 5 violations"
                    checked={autoTerminate}
                    onChange={setAutoTerminate}
                  />
                </div>
              </div>

              {/* Preview Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 border-2"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#C9F4D4",
                  color: "#1E5A3B",
                }}
              >
                <Eye className="w-4 h-4" />
                Preview Candidate Experience
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Screenshot Monitoring */}
      <div
        className="rounded-2xl p-6 border-2"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E8FAF0",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📸</span>
          <h3 className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
            Screenshot Monitoring
          </h3>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-medium" style={{ color: "#1E5A3B" }}>
              Enabled (captured every 30 seconds)
            </div>
          </div>
          <ToggleSwitch checked={config.screenshot} onChange={(val) => onUpdate({ ...config, screenshot: val })} />
        </div>
        {config.screenshot && (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
              Frequency:
            </label>
            <select
              className="w-full px-4 py-2 rounded-xl border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <option>15 seconds</option>
              <option>30 seconds</option>
              <option>60 seconds</option>
            </select>
          </div>
        )}
      </div>

      {/* Browser Restrictions */}
      <div
        className="rounded-2xl p-6 border-2"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E8FAF0",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🚫</span>
          <h3 className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
            Browser Restrictions
          </h3>
        </div>
        <div className="space-y-3">
          <ToggleOption
            label="Fullscreen Mode Required"
            checked={true}
          />
          <ToggleOption
            label="Block Developer Tools"
            checked={true}
          />
          <ToggleOption
            label="Disable Print Screen"
            checked={true}
          />
        </div>
      </div>

      {/* Info Note */}
      <div
        className="rounded-xl p-4 border-2"
        style={{
          backgroundColor: "rgba(232, 250, 240, 0.3)",
          borderColor: "#C9F4D4",
        }}
      >
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 mt-0.5" style={{ color: "#4A9A6A" }} />
          <div className="text-sm" style={{ color: "#2D7A52" }}>
            <strong>Note:</strong> Candidates will be informed about proctoring before starting the assessment and must consent.
          </div>
        </div>
      </div>
    </div>
  )
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (val: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? "bg-[#80EFC0]" : "bg-[#E5E7EB]"
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  )
}

function ToggleOption({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string
  checked: boolean
  onChange?: (val: boolean) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${disabled ? "opacity-50" : ""}`} style={{ color: disabled ? "#9CA3AF" : "#2D7A52" }}>
        {label}
      </span>
      <ToggleSwitch checked={checked} onChange={onChange || (() => {})} />
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
  value: "basic" | "standard" | "advanced"
  selected: string
  onChange: (val: "basic" | "standard" | "advanced") => void
  label: string
  description: string
}) {
  const isSelected = selected === value
  return (
    <button
      onClick={() => onChange(value)}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
        isSelected ? "border-[#80EFC0] bg-[#E8FAF0]" : "border-[#E8FAF0] bg-white"
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
          <div className="text-xs" style={{ color: "#6B7280" }}>
            {description}
          </div>
        </div>
      </div>
    </button>
  )
}

