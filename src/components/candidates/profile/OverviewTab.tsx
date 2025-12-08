"use client"

import { motion } from "framer-motion"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { CandidateProfile } from "@/lib/candidate-profile-types"

interface OverviewTabProps {
  candidate: CandidateProfile
}

export function OverviewTab({ candidate }: OverviewTabProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "#10B981"
    if (percentage >= 80) return "#3B82F6"
    if (percentage >= 70) return "#14B8A6"
    if (percentage >= 60) return "#F59E0B"
    return "#EF4444"
  }

  return (
    <div className="space-y-6">
      {/* Score Breakdown */}
      <div>
        <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: "#1E5A3B", borderColor: "#E8FAF0" }}>
          Score Breakdown
        </h3>
        <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#E8FAF0" }}>
          <div className="space-y-6">
            {/* MCQ */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-lg font-bold" style={{ color: "#1E5A3B" }}>MCQ</span>
                  <span className="text-sm ml-2" style={{ color: "#4A9A6A" }}>({candidate.scoreBreakdown.mcq.total} questions)</span>
                </div>
                <div className="text-2xl font-black" style={{ color: getScoreColor(candidate.scoreBreakdown.mcq.percentage) }}>
                  {candidate.scoreBreakdown.mcq.score}/{candidate.scoreBreakdown.mcq.total * 2} ({candidate.scoreBreakdown.mcq.percentage}%)
                </div>
              </div>
              <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${candidate.scoreBreakdown.mcq.percentage}%` }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getScoreColor(candidate.scoreBreakdown.mcq.percentage) }}
                />
              </div>
              <div className="flex justify-between text-sm" style={{ color: "#6B7280" }}>
                <span>Time: {formatTime(candidate.scoreBreakdown.mcq.time)}</span>
                <span>Avg: {formatTime(Math.floor(candidate.scoreBreakdown.mcq.time / candidate.scoreBreakdown.mcq.total))} per question</span>
              </div>
            </div>

            {/* Coding */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-lg font-bold" style={{ color: "#1E5A3B" }}>Coding</span>
                  <span className="text-sm ml-2" style={{ color: "#4A9A6A" }}>({candidate.scoreBreakdown.coding.total} questions)</span>
                </div>
                <div className="text-2xl font-black" style={{ color: getScoreColor(candidate.scoreBreakdown.coding.percentage) }}>
                  {candidate.scoreBreakdown.coding.score}/{candidate.scoreBreakdown.coding.total * 5} ({candidate.scoreBreakdown.coding.percentage}%)
                </div>
              </div>
              <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${candidate.scoreBreakdown.coding.percentage}%` }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getScoreColor(candidate.scoreBreakdown.coding.percentage) }}
                />
              </div>
              <div className="flex justify-between text-sm" style={{ color: "#6B7280" }}>
                <span>Time: {formatTime(candidate.scoreBreakdown.coding.time)}</span>
                <span>Avg: {formatTime(Math.floor(candidate.scoreBreakdown.coding.time / candidate.scoreBreakdown.coding.total))} per question</span>
              </div>
            </div>

            {/* Subjective */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-lg font-bold" style={{ color: "#1E5A3B" }}>Subjective</span>
                  <span className="text-sm ml-2" style={{ color: "#4A9A6A" }}>({candidate.scoreBreakdown.subjective.total} questions)</span>
                </div>
                <div className="text-2xl font-black" style={{ color: getScoreColor(candidate.scoreBreakdown.subjective.percentage) }}>
                  {candidate.scoreBreakdown.subjective.score}/{candidate.scoreBreakdown.subjective.total * 3} ({candidate.scoreBreakdown.subjective.percentage}%)
                </div>
              </div>
              <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${candidate.scoreBreakdown.subjective.percentage}%` }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getScoreColor(candidate.scoreBreakdown.subjective.percentage) }}
                />
              </div>
              <div className="flex justify-between text-sm" style={{ color: "#6B7280" }}>
                <span>Time: {formatTime(candidate.scoreBreakdown.subjective.time)}</span>
                <span>Avg: {formatTime(Math.floor(candidate.scoreBreakdown.subjective.time / candidate.scoreBreakdown.subjective.total))} per question</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: "#1E5A3B", borderColor: "#E8FAF0" }}>
            Strengths
          </h3>
          <div className="space-y-3">
            {candidate.analytics.aiInsights.strengths.map((strength, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl border"
                style={{
                  backgroundColor: "#D1FAE5",
                  borderColor: "#A7F3D0",
                }}
              >
                <span className="text-2xl">✅</span>
                <p className="text-base font-semibold" style={{ color: "#065F46" }}>
                  {strength}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: "#1E5A3B", borderColor: "#E8FAF0" }}>
            Areas for Improvement
          </h3>
          <div className="space-y-3">
            {candidate.analytics.aiInsights.weaknesses.map((weakness, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl border"
                style={{
                  backgroundColor: "#FEF3C7",
                  borderColor: "#FDE68A",
                }}
              >
                <span className="text-2xl">⚠️</span>
                <p className="text-base font-semibold" style={{ color: "#92400E" }}>
                  {weakness}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment Events */}
      <div>
        <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: "#1E5A3B", borderColor: "#E8FAF0" }}>
          Assessment Events
        </h3>
        <div className="space-y-3">
          {candidate.invitedAt && (
            <div className="flex items-center gap-3 text-[15px]" style={{ color: "#2D7A52" }}>
              <span>📅</span>
              <span>Invited: {new Date(candidate.invitedAt).toLocaleString()}</span>
            </div>
          )}
          {candidate.startedAt && (
            <div className="flex items-center gap-3 text-[15px]" style={{ color: "#2D7A52" }}>
              <span>▶️</span>
              <span>
                Started: {new Date(candidate.startedAt).toLocaleString()}
                {candidate.invitedAt && (
                  <span className="ml-2" style={{ color: "#6B7280" }}>
                    ({Math.floor((new Date(candidate.startedAt).getTime() - new Date(candidate.invitedAt).getTime()) / (1000 * 60 * 60))}h{" "}
                    {Math.floor(((new Date(candidate.startedAt).getTime() - new Date(candidate.invitedAt).getTime()) / (1000 * 60)) % 60)}m after invite)
                  </span>
                )}
              </span>
            </div>
          )}
          {candidate.completedAt && (
            <div className="flex items-center gap-3 text-[15px]" style={{ color: "#2D7A52" }}>
              <span>✅</span>
              <span>Completed: {new Date(candidate.completedAt).toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-[15px]" style={{ color: "#2D7A52" }}>
            <span>⏱️</span>
            <span>
              Duration: {Math.floor(candidate.timeTaken / 60)}h {candidate.timeTaken % 60}m (under limit ✓)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

