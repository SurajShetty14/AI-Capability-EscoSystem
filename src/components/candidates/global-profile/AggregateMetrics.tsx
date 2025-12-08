"use client"

import { motion } from "framer-motion"
import { FileText, Award, Trophy, CheckCircle2, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { GlobalCandidateProfile } from "@/lib/global-candidate-profile-types"

interface AggregateMetricsProps {
  candidate: GlobalCandidateProfile
}

export function AggregateMetrics({ candidate }: AggregateMetricsProps) {
  const getTrendIcon = () => {
    switch (candidate.performanceTrend) {
      case "improving":
        return <TrendingUp className="w-5 h-5" style={{ color: "#10B981" }} />
      case "declining":
        return <TrendingDown className="w-5 h-5" style={{ color: "#EF4444" }} />
      default:
        return <Minus className="w-5 h-5" style={{ color: "#6B7280" }} />
    }
  }

  const getTrendColor = () => {
    switch (candidate.performanceTrend) {
      case "improving":
        return "#10B981"
      case "declining":
        return "#EF4444"
      default:
        return "#6B7280"
    }
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "#10B981" }
    if (score >= 80) return { label: "Very Good", color: "#3B82F6" }
    if (score >= 70) return { label: "Good", color: "#14B8A6" }
    if (score >= 60) return { label: "Average", color: "#F59E0B" }
    return { label: "Below Average", color: "#EF4444" }
  }

  const scoreInfo = getScoreLabel(candidate.averageScore)

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
          Overall Performance Metrics
        </h3>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="text-center p-4">
            <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: "#80EFC0" }} />
            <div className="text-6xl font-black mb-3 leading-none" style={{ color: "#1E5A3B" }}>
              {candidate.totalAssessments}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A9A6A" }}>
              Assessments Taken
            </div>
          </div>
          <div className="text-center p-4">
            <Award className="w-12 h-12 mx-auto mb-3" style={{ color: "#80EFC0" }} />
            <div className="text-6xl font-black mb-3 leading-none" style={{ color: "#1E5A3B" }}>
              {candidate.averageScore}%
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A9A6A" }}>
              Avg Score (All Tests)
            </div>
          </div>
          <div className="text-center p-4">
            <Trophy className="w-12 h-12 mx-auto mb-3" style={{ color: "#80EFC0" }} />
            <div className="text-6xl font-black mb-3 leading-none" style={{ color: "#1E5A3B" }}>
              Top {candidate.overallRank}%
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A9A6A" }}>
              Ranking
            </div>
          </div>
          <div className="text-center p-4">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: "#80EFC0" }} />
            <div className="text-6xl font-black mb-3 leading-none" style={{ color: "#1E5A3B" }}>
              {candidate.completionRate}%
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A9A6A" }}>
              Complete Rate
            </div>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {getTrendIcon()}
              <div className="text-2xl font-bold" style={{ color: getTrendColor() }}>
                Performance Trend: {candidate.performanceTrend === "improving" ? "↗ Improving" : candidate.performanceTrend === "declining" ? "↘ Declining" : "→ Stable"}
                {candidate.trendPercentage !== 0 && ` (${candidate.trendPercentage > 0 ? "+" : ""}${candidate.trendPercentage}% over time)`}
              </div>
            </div>
            <div className="text-xl font-semibold" style={{ color: "#1E5A3B" }}>
              {candidate.averageScore}%
            </div>
          </div>
          <div className="h-4 bg-[#E8FAF0] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${candidate.averageScore}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${scoreInfo.color}, ${scoreInfo.color}dd)`,
              }}
            />
          </div>
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-semibold mb-2" style={{ color: "#1E5A3B" }}>
              ✅ Strengths:
            </div>
            <div className="text-sm" style={{ color: "#2D7A52" }}>
              {candidate.analytics.aiInsights.strengths.slice(0, 2).map((s, idx) => (
                <div key={idx} className="mb-1">
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2" style={{ color: "#1E5A3B" }}>
              ⚠️ Focus Areas:
            </div>
            <div className="text-sm" style={{ color: "#2D7A52" }}>
              {candidate.analytics.aiInsights.weaknesses.slice(0, 1).map((w, idx) => (
                <div key={idx} className="mb-1">
                  {w}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


