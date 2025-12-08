"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Settings, Grid, List, Focus, AlertTriangle } from "lucide-react"
import { VideoTile } from "./VideoTile"
import { FocusMode } from "./FocusMode"

interface LiveCandidate {
  id: string
  name: string
  email: string
  avatar?: string
  currentQuestion: number
  totalQuestions: number
  elapsedTime: number // seconds
  flags: number
  status: "clean" | "minor" | "major"
  lastViolation?: {
    type: string
    timestamp: string
  }
}

interface LiveMonitoringDashboardProps {
  candidates: LiveCandidate[]
}

export function LiveMonitoringDashboard({ candidates }: LiveMonitoringDashboardProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "focus">("grid")
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const recentAlerts = [
    {
      id: "1",
      time: "2:45 PM",
      candidate: "Bob Johnson",
      type: "Multiple faces detected",
      severity: "medium",
    },
    {
      id: "2",
      time: "2:42 PM",
      candidate: "Charlie Brown",
      type: "Tab switching detected",
      severity: "low",
    },
    {
      id: "3",
      time: "2:40 PM",
      candidate: "Diana Prince",
      type: "No face visible for 30s",
      severity: "low",
    },
  ]

  if (viewMode === "focus" && selectedCandidate) {
    const candidate = candidates.find((c) => c.id === selectedCandidate)
    if (candidate) {
      return (
        <FocusMode
          candidate={candidate}
          onBack={() => {
            setViewMode("grid")
            setSelectedCandidate(null)
          }}
        />
      )
    }
  }

  return (
    <div className="p-8 space-y-6" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <h2 className="text-3xl font-black" style={{ color: "#1E5A3B" }}>
            Live Monitoring
          </h2>
          <span
            className="px-4 py-1 rounded-full text-sm font-bold"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#EF4444",
            }}
          >
            {candidates.length} candidates live
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#4A9A6A" }} />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2 rounded-xl border-2 focus:outline-none focus:ring-0 w-64"
              style={{
                borderColor: "#E8FAF0",
                backgroundColor: "#FAFAFA",
              }}
            />
          </div>
          <button
            className="w-12 h-12 rounded-xl border-2 flex items-center justify-center"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E8FAF0",
            }}
          >
            <Settings className="w-5 h-5" style={{ color: "#4A9A6A" }} />
          </button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setViewMode("grid")}
          className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
            viewMode === "grid"
              ? "text-white"
              : "text-[#1E5A3B] border-2"
          }`}
          style={{
            backgroundColor: viewMode === "grid" ? "#1E5A3B" : "#FFFFFF",
            borderColor: viewMode === "grid" ? "#1E5A3B" : "#E8FAF0",
          }}
        >
          <Grid className="w-4 h-4" />
          Grid View
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
            viewMode === "list"
              ? "text-white"
              : "text-[#1E5A3B] border-2"
          }`}
          style={{
            backgroundColor: viewMode === "list" ? "#1E5A3B" : "#FFFFFF",
            borderColor: viewMode === "list" ? "#1E5A3B" : "#E8FAF0",
          }}
        >
          <List className="w-4 h-4" />
          List View
        </button>
        <button
          onClick={() => setViewMode("focus")}
          className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
            viewMode === "focus"
              ? "text-white"
              : "text-[#1E5A3B] border-2"
          }`}
          style={{
            backgroundColor: viewMode === "focus" ? "#1E5A3B" : "#FFFFFF",
            borderColor: viewMode === "focus" ? "#1E5A3B" : "#E8FAF0",
          }}
        >
          <Focus className="w-4 h-4" />
          Focus Mode
        </button>
      </div>

      {/* Video Grid */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCandidates.map((candidate, idx) => (
            <VideoTile
              key={candidate.id}
              candidate={candidate}
              index={idx}
              onExpand={() => {
                setSelectedCandidate(candidate.id)
                setViewMode("focus")
              }}
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border-2 flex items-center gap-6"
              style={{
                borderColor: "#E8FAF0",
                boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
              }}
            >
              <div className="w-32 h-20 rounded-xl border-2 flex items-center justify-center bg-black" style={{ borderColor: "#C9F4D4" }}>
                <div className="text-white text-xs">Video Feed</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg mb-1" style={{ color: "#1E5A3B" }}>
                  {candidate.name}
                </div>
                <div className="text-sm mb-2" style={{ color: "#6B7280" }}>
                  {candidate.email}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span style={{ color: "#4A9A6A" }}>
                    🟢 Question {candidate.currentQuestion} of {candidate.totalQuestions}
                  </span>
                  <span style={{ color: "#6B7280" }}>
                    ⏱️ {Math.floor(candidate.elapsedTime / 60)}:{(candidate.elapsedTime % 60).toString().padStart(2, "0")}
                  </span>
                  {candidate.flags > 0 && (
                    <span style={{ color: "#EF4444" }}>
                      ⚠️ {candidate.flags} flags
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedCandidate(candidate.id)
                  setViewMode("focus")
                }}
                className="px-4 py-2 rounded-xl font-semibold text-sm border-2"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#C9F4D4",
                  color: "#1E5A3B",
                }}
              >
                View
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Recent Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border-2"
        style={{
          borderColor: "#E8FAF0",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5" style={{ color: "#EF4444" }} />
          <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
            Recent Alerts (Last 15 minutes)
          </h3>
        </div>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl border-2"
              style={{
                backgroundColor: alert.severity === "medium" ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.05)",
                borderColor: alert.severity === "medium" ? "#F59E0B" : "#FEE2E2",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium" style={{ color: "#6B7280" }}>
                      ⚠️ {alert.time}
                    </span>
                    <span className="font-bold" style={{ color: "#1E5A3B" }}>
                      {alert.candidate}
                    </span>
                  </div>
                  <div className="text-sm" style={{ color: "#2D7A52" }}>
                    {alert.type}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 rounded-lg text-xs font-medium border-2"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C9F4D4",
                      color: "#1E5A3B",
                    }}
                  >
                    View Recording
                  </button>
                  <button
                    className="px-3 py-1 rounded-lg text-xs font-medium border-2"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C9F4D4",
                      color: "#1E5A3B",
                    }}
                  >
                    Flag
                  </button>
                  <button
                    className="px-3 py-1 rounded-lg text-xs font-medium border-2"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C9F4D4",
                      color: "#1E5A3B",
                    }}
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 w-full py-2 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          style={{
            backgroundColor: "rgba(232, 250, 240, 0.5)",
            color: "#1E5A3B",
          }}
        >
          View All Alerts
        </button>
      </motion.div>
    </div>
  )
}

