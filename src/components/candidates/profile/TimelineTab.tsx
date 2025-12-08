"use client"

import { motion } from "framer-motion"
import { CheckCircle2, X, AlertTriangle, Play, Eye } from "lucide-react"
import { CandidateProfile } from "@/lib/candidate-profile-types"

interface TimelineTabProps {
  candidate: CandidateProfile
}

export function TimelineTab({ candidate }: TimelineTabProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "started":
        return <Play className="w-5 h-5" style={{ color: "#3B82F6" }} />
      case "completed":
        return <CheckCircle2 className="w-5 h-5" style={{ color: "#10B981" }} />
      case "question-answered":
        return <CheckCircle2 className="w-5 h-5" style={{ color: "#3B82F6" }} />
      case "violation":
        return <AlertTriangle className="w-5 h-5" style={{ color: "#EF4444" }} />
      default:
        return <Eye className="w-5 h-5" style={{ color: "#6B7280" }} />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "started":
      case "question-answered":
        return "#3B82F6"
      case "completed":
        return "#10B981"
      case "violation":
        return "#EF4444"
      default:
        return "#6B7280"
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: "#E8FAF0" }} />

        {/* Events */}
        <div className="space-y-6">
          {candidate.events.map((event, idx) => {
            const color = getEventColor(event.type)
            const icon = getEventIcon(event.type)

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative pl-16"
              >
                {/* Dot */}
                <div
                  className="absolute left-4 top-2 w-4 h-4 rounded-full border-4 border-white flex items-center justify-center"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 0 4px ${color}20`,
                  }}
                >
                  {icon}
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl p-4 border-2" style={{ borderColor: "#E8FAF0" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold" style={{ color: "#4A9A6A" }}>
                      {formatTime(event.timestamp)}
                    </span>
                    <span className="text-base font-semibold" style={{ color: "#1E5A3B" }}>
                      {event.title}
                    </span>
                  </div>
                  <div className="text-sm mb-2" style={{ color: "#2D7A52" }}>
                    {event.description}
                  </div>
                  {event.metadata && (
                    <div className="text-xs space-y-1" style={{ color: "#6B7280" }}>
                      {event.metadata.ip && <div>IP: {event.metadata.ip} | Browser: {event.metadata.browser}</div>}
                      {event.metadata.destination && (
                        <div>
                          Switched to: {event.metadata.destination}
                          {event.metadata.duration && ` (${event.metadata.duration} seconds)`}
                        </div>
                      )}
                      {event.metadata.isCorrect !== undefined && (
                        <div className={event.metadata.isCorrect ? "text-green-600" : "text-red-600"}>
                          {event.metadata.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </div>
                      )}
                    </div>
                  )}
                  {event.type === "violation" && (
                    <button
                      className="mt-2 px-3 py-1 rounded-lg text-xs font-medium border-2"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#C9F4D4",
                        color: "#1E5A3B",
                      }}
                    >
                      View Screenshot
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

