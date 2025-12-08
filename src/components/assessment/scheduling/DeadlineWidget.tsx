"use client"

import { motion } from "framer-motion"
import { Calendar, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { getDeadlineStatus, getTimeRemaining } from "@/lib/scheduling/timezone-utils"

interface Deadline {
  id: string
  assessmentTitle: string
  deadline: Date
  incompleteCount: number
  totalCount: number
}

interface DeadlineWidgetProps {
  deadlines: Deadline[]
  onViewAll?: () => void
}

export function DeadlineWidget({ deadlines, onViewAll }: DeadlineWidgetProps) {
  const sortedDeadlines = [...deadlines].sort(
    (a, b) => a.deadline.getTime() - b.deadline.getTime()
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border-2"
      style={{
        borderColor: "#C9F4D4",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" style={{ color: "#4A9A6A" }} />
          <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
            Upcoming Deadlines
          </h3>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-semibold"
            style={{ color: "#4A9A6A" }}
          >
            View All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {sortedDeadlines.map((deadline, idx) => {
          const status = getDeadlineStatus(deadline.deadline)
          const timeRemaining = getTimeRemaining(deadline.deadline)
          const isCompleted = deadline.incompleteCount === 0

          return (
            <motion.div
              key={deadline.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl border-2 ${
                isCompleted ? "opacity-75" : ""
              }`}
              style={{
                backgroundColor:
                  status.status === "critical"
                    ? "rgba(239, 68, 68, 0.05)"
                    : status.status === "warning"
                    ? "rgba(245, 158, 11, 0.05)"
                    : "rgba(232, 250, 240, 0.3)",
                borderColor:
                  status.status === "critical"
                    ? "#FEE2E2"
                    : status.status === "warning"
                    ? "#FDE68A"
                    : "#C9F4D4",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{status.icon}</span>
                  <div>
                    <div className="font-bold" style={{ color: "#1E5A3B" }}>
                      {deadline.assessmentTitle}
                    </div>
                    <div className="text-sm" style={{ color: "#6B7280" }}>
                      Deadline: {deadline.deadline.toLocaleDateString()} at{" "}
                      {deadline.deadline.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>

              {!isCompleted ? (
                <>
                  <div className="text-sm mb-2" style={{ color: status.color }}>
                    {timeRemaining} remaining • {deadline.incompleteCount}/{deadline.totalCount}{" "}
                    candidates incomplete
                  </div>
                  <button
                    className="px-3 py-1 rounded-lg text-xs font-semibold border-2"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C9F4D4",
                      color: "#1E5A3B",
                    }}
                  >
                    Send Reminder
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 text-sm" style={{ color: "#6B7280" }}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>All candidates completed! Deadline was: {deadline.deadline.toLocaleDateString()} ✓</span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {sortedDeadlines.length === 0 && (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 mx-auto mb-2" style={{ color: "#C9F4D4" }} />
          <div className="text-sm" style={{ color: "#6B7280" }}>
            No upcoming deadlines
          </div>
        </div>
      )}
    </motion.div>
  )
}

