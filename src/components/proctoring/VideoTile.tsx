"use client"

import { motion } from "framer-motion"
import { Expand, Flag, MessageCircle } from "lucide-react"

interface VideoTileProps {
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
  index: number
  onExpand: () => void
}

const statusConfig = {
  clean: { color: "#10B981", label: "No issues" },
  minor: { color: "#F59E0B", label: "Minor flag" },
  major: { color: "#EF4444", label: "Major violation" },
}

export function VideoTile({ candidate, index, onExpand }: VideoTileProps) {
  const status = statusConfig[candidate.status]
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl border-2 overflow-hidden"
      style={{
        borderColor: "#C9F4D4",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      {/* Video Feed */}
      <div className="relative w-full h-48 bg-black flex items-center justify-center">
        <div className="text-white text-sm">Live Video Feed</div>
        {/* Picture-in-Picture for Screen Share */}
        <div
          className="absolute bottom-2 right-2 w-20 h-15 rounded border-2 border-white bg-gray-800 flex items-center justify-center"
          style={{ fontSize: "10px", color: "#FFFFFF" }}
        >
          Screen
        </div>
        {/* Overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-2"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="text-white text-xs space-y-1">
            <div className="font-bold">{candidate.name}</div>
            <div className="flex items-center gap-2">
              <span style={{ color: status.color }}>🟢</span>
              <span>Question {candidate.currentQuestion} of {candidate.totalQuestions}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️ {formatTime(candidate.elapsedTime)}</span>
              {candidate.flags > 0 && (
                <span style={{ color: "#EF4444" }}>⚠️ {candidate.flags} flags</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-3 border-t" style={{ borderColor: "#E8FAF0" }}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium" style={{ color: "#1E5A3B" }}>
            {candidate.name}
          </div>
          <div
            className="px-2 py-1 rounded text-xs font-semibold"
            style={{
              backgroundColor: `${status.color}20`,
              color: status.color,
            }}
          >
            {status.label}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExpand}
            className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <Expand className="w-3 h-3" />
            Expand
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
            }}
          >
            <Flag className="w-4 h-4" style={{ color: "#EF4444" }} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
            }}
          >
            <MessageCircle className="w-4 h-4" style={{ color: "#4A9A6A" }} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

