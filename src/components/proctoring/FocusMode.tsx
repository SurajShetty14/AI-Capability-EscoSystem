"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Flag, MessageCircle, X, CheckCircle2, TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react"

interface FocusModeProps {
  candidate: {
    id: string
    name: string
    email: string
    avatar?: string
    currentQuestion: number
    totalQuestions: number
    elapsedTime: number
    flags: number
    status: "clean" | "minor" | "major"
  }
  onBack: () => void
}

export function FocusMode({ candidate, onBack }: FocusModeProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const activityLog = [
    { time: "2:45 PM", action: "Answered Question 5 (MCQ)", type: "action" },
    { time: "2:44 PM", action: "⚠️ Tab switched to Stack Overflow", type: "violation" },
    { time: "2:42 PM", action: "Answered Question 4 (Coding)", type: "action" },
    { time: "2:40 PM", action: "Started Question 4", type: "action" },
  ]

  const behaviorAnalysis = {
    faceVisible: 98,
    eyesOnScreen: 95,
    multipleFaces: 2,
    audioClean: true,
    tabSwitches: 3,
    riskScore: 15,
  }

  return (
    <div className="p-8 space-y-6" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 font-semibold"
          style={{ color: "#1E5A3B" }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Grid
        </motion.button>
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold" style={{ color: "#1E5A3B" }}>
            {candidate.name}
          </div>
          <button
            className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#EF4444",
              color: "#EF4444",
            }}
          >
            <Flag className="w-4 h-4" />
            Flag
          </button>
          <button
            className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#EF4444",
              color: "#EF4444",
            }}
          >
            <X className="w-4 h-4" />
            End Test
          </button>
        </div>
      </div>

      {/* Main Video Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black rounded-2xl overflow-hidden border-2"
            style={{ borderColor: "#C9F4D4", aspectRatio: "16/9" }}
          >
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-lg mb-2">Large Video Feed</div>
                <div className="text-sm opacity-70">960px × 540px</div>
              </div>
            </div>
            {/* Screen Share PiP */}
            <div
              className="absolute bottom-4 right-4 w-32 h-24 rounded border-2 border-white bg-gray-800 flex items-center justify-center text-white text-xs"
            >
              Screen Share
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Real-time Activity Log */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 border-2"
            style={{
              borderColor: "#E8FAF0",
              boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
            }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
              Real-time Activity Log
            </h3>
            <div className="space-y-3">
              {activityLog.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-2"
                    style={{
                      backgroundColor: item.type === "violation" ? "#EF4444" : "#10B981",
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-xs mb-1" style={{ color: "#6B7280" }}>
                      {item.time}
                    </div>
                    <div className="text-sm" style={{ color: "#2D7A52" }}>
                      {item.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Behavior Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border-2"
            style={{
              borderColor: "#E8FAF0",
              boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
            }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
              AI Behavior Analysis
            </h3>
            <div className="space-y-3">
              <MetricItem
                label="Face visible"
                value={`${behaviorAnalysis.faceVisible}% of time`}
                status="good"
              />
              <MetricItem
                label="Eyes on screen"
                value={`${behaviorAnalysis.eyesOnScreen}% of time`}
                status="good"
              />
              <MetricItem
                label="Multiple faces"
                value={`Detected ${behaviorAnalysis.multipleFaces} times`}
                status="warning"
              />
              <MetricItem
                label="Audio clean"
                value="No voices detected"
                status="good"
              />
              <MetricItem
                label="Tab switches"
                value={`${behaviorAnalysis.tabSwitches} times`}
                status="warning"
              />
            </div>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "#E8FAF0" }}>
              <div className="flex items-center justify-between">
                <span className="font-semibold" style={{ color: "#1E5A3B" }}>
                  Risk Score:
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    color: "#10B981",
                  }}
                >
                  Low ({behaviorAnalysis.riskScore}/100)
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border-2 flex items-center gap-3"
        style={{
          borderColor: "#E8FAF0",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <span className="font-semibold" style={{ color: "#1E5A3B" }}>
          Quick Actions:
        </span>
        <button
          className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <MessageCircle className="w-4 h-4" />
          Send Message
        </button>
        <button
          className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          Add Note
        </button>
        <button
          className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#EF4444",
            color: "#EF4444",
          }}
        >
          <Flag className="w-4 h-4" />
          Flag Violation
        </button>
        <button
          className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#EF4444",
            color: "#EF4444",
          }}
        >
          <X className="w-4 h-4" />
          End Test
        </button>
      </motion.div>
    </div>
  )
}

function MetricItem({
  label,
  value,
  status,
}: {
  label: string
  value: string
  status: "good" | "warning" | "bad"
}) {
  const icon = status === "good" ? CheckCircle2 : status === "warning" ? AlertTriangle : X
  const Icon = icon
  const color = status === "good" ? "#10B981" : status === "warning" ? "#F59E0B" : "#EF4444"

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color }} />
        <span className="text-sm" style={{ color: "#2D7A52" }}>
          {label}:
        </span>
      </div>
      <span className="text-sm font-semibold" style={{ color }}>
        {value}
      </span>
    </div>
  )
}

