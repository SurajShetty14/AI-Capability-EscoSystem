"use client"

import { motion } from "framer-motion"
import { Trophy, ArrowRight } from "lucide-react"
import { CandidatePerformance } from "@/lib/assessment-detail-types"

interface LeaderboardTableProps {
  performers: CandidatePerformance[]
}

export function LeaderboardTable({ performers }: LeaderboardTableProps) {
  const getMedal = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return null
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 border-2"
      style={{
        background: "linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 100%)",
        borderColor: "#FDE68A",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6" style={{ color: "#EAB308" }} />
          <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
            Top Performers
          </h3>
        </div>
        <button
          className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all"
          style={{
            backgroundColor: "rgba(232, 250, 240, 0.5)",
            color: "#1E5A3B",
          }}
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {performers.map((performer, idx) => (
          <motion.div
            key={performer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#FEF3C7] transition-colors cursor-pointer"
          >
            <div className="w-12 text-center">
              {getMedal(performer.rank) || (
                <span className="text-lg font-bold" style={{ color: "#6B7280" }}>
                  {performer.rank}
                </span>
              )}
            </div>
            {performer.avatar ? (
              <img
                src={performer.avatar}
                alt={performer.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
                }}
              >
                {performer.name[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate" style={{ color: "#1E5A3B" }}>
                {performer.name}
              </div>
              <div className="text-sm truncate" style={{ color: "#6B7280" }}>
                {performer.email}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black" style={{ color: "#1E5A3B" }}>
                {performer.score}%
              </div>
            </div>
            <div className="text-right w-20">
              <div className="text-sm font-medium" style={{ color: "#4A9A6A" }}>
                {formatTime(performer.timeSpent)}
              </div>
            </div>
            <div>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase"
                style={{
                  backgroundColor:
                    performer.status === "completed"
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(245, 158, 11, 0.1)",
                  color: performer.status === "completed" ? "#10B981" : "#F59E0B",
                }}
              >
                {performer.status === "completed" ? "Completed" : "In Progress"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

