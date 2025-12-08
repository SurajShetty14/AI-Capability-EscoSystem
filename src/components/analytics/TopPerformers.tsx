"use client"

import { motion } from "framer-motion"
import { Trophy, ArrowRight } from "lucide-react"

interface Performer {
  rank: number
  name: string
  avatar?: string
  score: number
  time: string
}

interface TopPerformersProps {
  performers: Performer[]
}

export function TopPerformers({ performers }: TopPerformersProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return { bg: "linear-gradient(135deg, #EAB308, #F59E0B)", text: "#FFFFFF" }
    if (rank === 2) return { bg: "linear-gradient(135deg, #94A3B8, #64748B)", text: "#FFFFFF" }
    if (rank === 3) return { bg: "linear-gradient(135deg, #CD7F32, #A0522D)", text: "#FFFFFF" }
    return { bg: "#E8FAF0", text: "#1E5A3B" }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 border-2"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
          Top Performers Leaderboard
        </h3>
        <button className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: "#80EFC0" }}>
          View Full <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        {performers.map((performer) => {
          const rankStyle = getRankColor(performer.rank)
          const initials = performer.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
          return (
            <motion.div
              key={performer.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: performer.rank * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#E8FAF0] transition-colors"
            >
              {/* Rank */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                style={{
                  background: rankStyle.bg,
                  color: rankStyle.text,
                }}
              >
                {performer.rank <= 3 ? <Trophy className="w-5 h-5" /> : performer.rank}
              </div>

              {/* Avatar */}
              {performer.avatar ? (
                <img
                  src={performer.avatar}
                  alt={performer.name}
                  className="w-12 h-12 rounded-full border-2 border-[#C9F4D4]"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full border-2 border-[#C9F4D4] flex items-center justify-center font-bold text-sm"
                  style={{
                    background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
                    color: "#1E5A3B",
                  }}
                >
                  {initials}
                </div>
              )}

              {/* Info */}
              <div className="flex-1">
                <div className="font-semibold" style={{ color: "#1E5A3B" }}>
                  {performer.name}
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <div className="text-xl font-black" style={{ color: "#1E5A3B" }}>
                  {performer.score}%
                </div>
                <div className="text-xs" style={{ color: "#6B7280" }}>
                  {performer.time}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}


