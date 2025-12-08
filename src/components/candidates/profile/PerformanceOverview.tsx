"use client"

import { motion } from "framer-motion"
import { Trophy, Clock, CheckCircle2 } from "lucide-react"
import { CandidateProfile } from "@/lib/candidate-profile-types"

interface PerformanceOverviewProps {
  candidate: CandidateProfile
}

export function PerformanceOverview({ candidate }: PerformanceOverviewProps) {
  const getScoreLabel = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "#10B981" }
    if (score >= 80) return { label: "Very Good", color: "#3B82F6" }
    if (score >= 70) return { label: "Good", color: "#14B8A6" }
    if (score >= 60) return { label: "Average", color: "#F59E0B" }
    return { label: "Below Average", color: "#EF4444" }
  }

  const scoreInfo = getScoreLabel(candidate.finalScore)
  const isAboveAverage = candidate.finalScore > candidate.platformAverage
  const difference = Math.abs(candidate.finalScore - candidate.platformAverage)

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 border-2"
        style={{
          borderColor: "#C9F4D4",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: "#1E5A3B" }}>
          Assessment Performance
        </h3>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="text-center p-4">
            <div className="text-6xl font-black mb-3 leading-none" style={{ color: "#1E5A3B" }}>
              {candidate.finalScore}%
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A9A6A" }}>
              Final Score
            </div>
          </div>
          <div className="text-center p-4">
            <Clock className="w-10 h-10 mx-auto mb-3" style={{ color: "#80EFC0" }} />
            <div className="text-6xl font-black mb-3 leading-none" style={{ color: "#1E5A3B" }}>
              {formatTime(candidate.timeTaken)}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A9A6A" }}>
              Time Taken
            </div>
          </div>
          <div className="text-center p-4">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: "#80EFC0" }} />
            <div className="text-6xl font-black mb-3 leading-none" style={{ color: "#1E5A3B" }}>
              {candidate.questionsCompleted}/{candidate.questionsTotal}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A9A6A" }}>
              Completed
            </div>
          </div>
          <div className="text-center p-4">
            <Trophy className="w-10 h-10 mx-auto mb-3" style={{ color: "#80EFC0" }} />
            <div className="text-6xl font-black mb-3 leading-none" style={{ color: "#1E5A3B" }}>
              Top {candidate.rank}%
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A9A6A" }}>
              Rank
            </div>
          </div>
        </div>

        {/* Performance Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold" style={{ color: scoreInfo.color }}>
              Overall Performance: {scoreInfo.label}
            </div>
            <div className="text-xl font-semibold" style={{ color: "#1E5A3B" }}>
              {candidate.finalScore}%
            </div>
          </div>
          <div className="h-4 bg-[#E8FAF0] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${candidate.finalScore}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${scoreInfo.color}, ${scoreInfo.color}dd)`,
              }}
            />
          </div>
        </div>

        {/* Comparison Stats */}
        <div className="space-y-2 text-[15px]" style={{ color: "#2D7A52" }}>
          <div className="flex items-center gap-2">
            <span>{isAboveAverage ? "✓" : "⚠️"}</span>
            <span>
              vs Platform Average: {candidate.platformAverage}% ({isAboveAverage ? "+" : "-"}
              {difference.toFixed(1)}% {isAboveAverage ? "above" : "below"}) {isAboveAverage ? "✓" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏆</span>
            <span>Rank: Top {candidate.rank}% of all candidates</span>
          </div>
          <div className="flex items-center gap-2">
            <span>↗</span>
            <span>Performance Trend: Strong throughout</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

