"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GlobalCandidateProfile } from "@/lib/global-candidate-profile-types"

interface TimelineTabProps {
  candidate: GlobalCandidateProfile
}

type FilterType = "all" | "assessments" | "communications" | "actions"

export function TimelineTab({ candidate }: TimelineTabProps) {
  const [filter, setFilter] = useState<FilterType>("all")

  const getEventColor = (type: string) => {
    switch (type) {
      case "assessment-started":
      case "assessment-completed":
        return "#3B82F6" // Blue
      case "invitation-sent":
      case "note-added":
        return "#10B981" // Green
      case "status-changed":
      case "added-to-pool":
        return "#8B5CF6" // Purple
      case "profile-created":
      case "tag-added":
        return "#6B7280" // Gray
      default:
        return "#6B7280"
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "assessment-completed":
        return "✅"
      case "assessment-started":
        return "▶️"
      case "invitation-sent":
        return "📧"
      case "profile-created":
        return "👤"
      case "added-to-pool":
        return "⭐"
      case "status-changed":
        return "🔄"
      case "note-added":
        return "📝"
      case "tag-added":
        return "🏷️"
      default:
        return "●"
    }
  }

  const filteredTimeline = candidate.timeline.filter((event) => {
    if (filter === "all") return true
    if (filter === "assessments") {
      return event.type.includes("assessment")
    }
    if (filter === "communications") {
      return event.type === "invitation-sent" || event.type === "note-added"
    }
    if (filter === "actions") {
      return event.type === "added-to-pool" || event.type === "status-changed" || event.type === "tag-added"
    }
    return true
  })

  // Group by date
  const groupedTimeline = filteredTimeline.reduce((acc, event) => {
    const date = new Date(event.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    if (!acc[date]) acc[date] = []
    acc[date].push(event)
    return acc
  }, {} as Record<string, typeof candidate.timeline>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
          Activity Timeline
        </h3>

        {/* Filter Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-gray-100 gap-1">
          {(["all", "assessments", "communications", "actions"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                filter === f
                  ? "bg-white text-[#1E5A3B] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f === "all" ? "All Activities" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-0.5"
          style={{
            background: "linear-gradient(180deg, #80EFC0, #C9F4D4)",
          }}
        />

        <div className="space-y-8">
          {Object.entries(groupedTimeline).map(([date, events]) => (
            <div key={date} className="relative">
              {/* Date Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm z-10 relative"
                  style={{
                    backgroundColor: "#E8FAF0",
                    color: "#1E5A3B",
                    border: "3px solid #FFFFFF",
                  }}
                >
                  {date.split(" ")[1]}
                </div>
                <div className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
                  {date}
                </div>
              </div>

              {/* Events */}
              <div className="ml-6 space-y-4">
                {events.map((event) => {
                  const eventColor = getEventColor(event.type)
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative pl-8"
                    >
                      {/* Dot */}
                      <div
                        className="absolute left-0 top-2 w-4 h-4 rounded-full z-10"
                        style={{
                          backgroundColor: eventColor,
                          border: "3px solid #FFFFFF",
                          boxShadow: `0 0 0 3px ${eventColor}33`,
                        }}
                      />

                      {/* Event Card */}
                      <div
                        className="bg-white rounded-xl p-4 border-2"
                        style={{
                          borderColor: "#E8FAF0",
                          boxShadow: "0 2px 8px rgba(201, 244, 212, 0.1)",
                        }}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <span className="text-xl">{getEventIcon(event.type)}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold" style={{ color: "#1E5A3B" }}>
                                {new Date(event.timestamp).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                })}
                              </span>
                              <span className="text-sm font-bold" style={{ color: eventColor }}>
                                ●
                              </span>
                              <span className="text-sm font-semibold" style={{ color: "#1E5A3B" }}>
                                {event.title}
                              </span>
                            </div>
                            <div className="text-sm mb-1" style={{ color: "#2D7A52" }}>
                              {event.description}
                            </div>
                            {event.metadata && (
                              <div className="text-xs mt-2 space-y-1" style={{ color: "#6B7280" }}>
                                {event.metadata.assessmentTitle && (
                                  <div>{event.metadata.assessmentTitle}</div>
                                )}
                                {event.metadata.score !== undefined && (
                                  <div>Score: {event.metadata.score}%</div>
                                )}
                                {event.metadata.by && (
                                  <div>
                                    By: {event.metadata.by}
                                    {event.metadata.role && ` (${event.metadata.role})`}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


