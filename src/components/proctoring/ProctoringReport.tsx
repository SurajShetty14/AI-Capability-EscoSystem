"use client"

import { motion } from "framer-motion"
import { Play, Download, Share2, CheckCircle2, AlertTriangle, X, Calendar, Clock } from "lucide-react"

interface ProctoringReportProps {
  candidate: {
    id: string
    name: string
    email: string
    sessionDuration: number // minutes
    riskScore: number
    status: "clean" | "minor_issues" | "flagged"
  }
}

export function ProctoringReport({ candidate }: ProctoringReportProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getRiskColor = (score: number) => {
    if (score <= 30) return { color: "#10B981", label: "Low", icon: CheckCircle2 }
    if (score <= 60) return { color: "#F59E0B", label: "Medium", icon: AlertTriangle }
    return { color: "#EF4444", label: "High", icon: X }
  }

  const risk = getRiskColor(candidate.riskScore)
  const RiskIcon = risk.icon

  const metrics = {
    faceVisibility: 98,
    eyeTracking: 95,
    multipleFaces: 2,
    audioClean: true,
    tabSwitches: 3,
    copyPaste: 0,
    phoneDetection: 0,
  }

  const violations = [
    {
      time: "2:44 PM",
      type: "Tab switch to Stack Overflow",
      screenshot: "screenshot-1.jpg",
      videoClip: "clip-1.mp4",
      status: "Minor violation",
    },
    {
      time: "2:38 PM",
      type: "Multiple faces detected",
      duration: "3 minutes",
      screenshot: "screenshot-2.jpg",
      status: "Flagged for review",
    },
  ]

  const screenshots = Array.from({ length: 24 }, (_, i) => ({
    id: `ss-${i}`,
    url: `screenshot-${i + 1}.jpg`,
    timestamp: `${Math.floor(i / 4)}:${(i % 4) * 15}`,
  }))

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border-2"
        style={{
          borderColor: "#E8FAF0",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎥</span>
            <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
              Proctoring Report
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "#F0FDF4" }}>
            <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
              Overall Risk Score
            </div>
            <div className="flex items-center justify-center gap-2">
              <RiskIcon className="w-6 h-6" style={{ color: risk.color }} />
              <div className="text-3xl font-black" style={{ color: risk.color }}>
                {candidate.riskScore}
              </div>
              <span className="text-lg font-bold" style={{ color: risk.color }}>
                /100
              </span>
            </div>
            <div className="text-sm font-semibold mt-1" style={{ color: risk.color }}>
              {risk.label} ✅
            </div>
          </div>
          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "#F0FDF4" }}>
            <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
              Status
            </div>
            <div className="text-lg font-bold mt-2" style={{ color: "#1E5A3B" }}>
              {candidate.status === "clean"
                ? "No major violations detected"
                : candidate.status === "minor_issues"
                ? "Minor issues detected"
                : "Flagged for review"}
            </div>
          </div>
          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "#F0FDF4" }}>
            <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
              Session Duration
            </div>
            <div className="text-2xl font-black mt-2" style={{ color: "#1E5A3B" }}>
              {formatDuration(candidate.sessionDuration)}
            </div>
          </div>
        </div>

        {/* Session Recording */}
        <div className="p-4 rounded-xl border-2" style={{ backgroundColor: "#F9FAFB", borderColor: "#E8FAF0" }}>
          <div className="text-sm font-medium mb-3" style={{ color: "#4A9A6A" }}>
            Session Recording:
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
                color: "#1E5A3B",
                boxShadow: "0 4px 12px rgba(128, 239, 192, 0.3)",
              }}
            >
              <Play className="w-5 h-5" />
              Play Recording ({formatDuration(candidate.sessionDuration)})
            </motion.button>
            <button
              className="px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              className="px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </motion.div>

      {/* Behavior Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 border-2"
        style={{
          borderColor: "#E8FAF0",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Behavior Analysis
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <MetricBar label="Face Visibility" value={metrics.faceVisibility} status="excellent" />
          <MetricBar label="Eye Tracking" value={metrics.eyeTracking} status="excellent" />
          <MetricBar label="Multiple Faces" value={metrics.multipleFaces} status="warning" isCount />
          <MetricBar label="Audio Analysis" value={metrics.audioClean ? 100 : 0} status="excellent" />
          <MetricBar label="Tab Switches" value={metrics.tabSwitches} status="warning" isCount />
          <MetricBar label="Copy/Paste" value={metrics.copyPaste} status="excellent" isCount />
          <MetricBar label="Phone Detection" value={metrics.phoneDetection} status="excellent" isCount />
        </div>
      </motion.div>

      {/* Violation Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 border-2"
        style={{
          borderColor: "#E8FAF0",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Violation Timeline
        </h3>
        <div className="space-y-4">
          {violations.map((violation, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border-2"
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.05)",
                borderColor: "#FDE68A",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" style={{ color: "#F59E0B" }} />
                <span className="font-semibold" style={{ color: "#1E5A3B" }}>
                  {violation.time}
                </span>
                <span className="text-sm" style={{ color: "#EF4444" }}>
                  ⚠️ {violation.type}
                </span>
              </div>
              {violation.duration && (
                <div className="text-sm mb-2" style={{ color: "#6B7280" }}>
                  Duration: {violation.duration}
                </div>
              )}
              <div className="flex items-center gap-2 mt-3">
                <button
                  className="px-3 py-1 rounded-lg text-xs font-medium border-2"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#C9F4D4",
                    color: "#1E5A3B",
                  }}
                >
                  View Screenshot
                </button>
                <button
                  className="px-3 py-1 rounded-lg text-xs font-medium border-2"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#C9F4D4",
                    color: "#1E5A3B",
                  }}
                >
                  Watch Video Clip
                </button>
                <span
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    color: "#F59E0B",
                  }}
                >
                  {violation.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Screenshots Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 border-2"
        style={{
          borderColor: "#E8FAF0",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Screenshots ({screenshots.length} captured)
        </h3>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {screenshots.map((ss) => (
            <motion.div
              key={ss.id}
              whileHover={{ scale: 1.05 }}
              className="aspect-video rounded-lg border-2 bg-gray-100 flex items-center justify-center cursor-pointer"
              style={{ borderColor: "#E8FAF0" }}
            >
              <div className="text-xs text-gray-400">{ss.timestamp}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Examiner Notes & Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 border-2"
        style={{
          borderColor: "#E8FAF0",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Examiner Notes
        </h3>
        <textarea
          placeholder="Add note about this candidate's proctoring session..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none resize-none mb-4"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        />
        <div className="flex items-center gap-3 flex-wrap">
          <button
            className="px-4 py-2 rounded-xl font-semibold text-sm border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            Mark as Reviewed
          </button>
          <button
            className="px-4 py-2 rounded-xl font-semibold text-sm border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#EF4444",
              color: "#EF4444",
            }}
          >
            Flag for Investigation
          </button>
          <button
            className="px-4 py-2 rounded-xl font-semibold text-sm border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#F59E0B",
              color: "#F59E0B",
            }}
          >
            Request Retake
          </button>
          <button
            className="px-4 py-2 rounded-xl font-semibold text-sm border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#10B981",
              color: "#10B981",
            }}
          >
            Approve Results
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function MetricBar({
  label,
  value,
  status,
  isCount,
}: {
  label: string
  value: number
  status: "excellent" | "good" | "warning" | "bad"
  isCount?: boolean
}) {
  const colorMap = {
    excellent: "#10B981",
    good: "#3B82F6",
    warning: "#F59E0B",
    bad: "#EF4444",
  }
  const color = colorMap[status]

  if (isCount) {
    return (
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm" style={{ color: "#2D7A52" }}>
            {label}:
          </span>
          <span className="font-bold" style={{ color }}>
            {value} {value === 1 ? "time" : "times"}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm" style={{ color: "#2D7A52" }}>
          {label}:
        </span>
        <span className="font-bold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-2 bg-[#E8FAF0] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="text-xs mt-1" style={{ color: "#6B7280" }}>
        {status === "excellent" && "✅ Excellent"}
        {status === "good" && "👍 Good"}
        {status === "warning" && "⚠️ Needs attention"}
        {status === "bad" && "❌ Poor"}
      </div>
    </div>
  )
}

