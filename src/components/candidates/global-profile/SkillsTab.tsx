"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react"
import { GlobalCandidateProfile } from "@/lib/global-candidate-profile-types"

interface SkillsTabProps {
  candidate: GlobalCandidateProfile
}

type SkillCategory = "all" | "technical" | "soft-skills" | "domain"
type SortOption = "score" | "name" | "trend"

export function SkillsTab({ candidate }: SkillsTabProps) {
  const [category, setCategory] = useState<SkillCategory>("all")
  const [sortBy, setSortBy] = useState<SortOption>("score")

  const getProficiencyLevel = (score: number) => {
    if (score >= 90) return { label: "Expert", color: "#10B981" }
    if (score >= 80) return { label: "Advanced", color: "#3B82F6" }
    if (score >= 70) return { label: "Intermediate", color: "#14B8A6" }
    if (score >= 60) return { label: "Basic", color: "#F59E0B" }
    return { label: "Needs Work", color: "#EF4444" }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4" style={{ color: "#10B981" }} />
      case "declining":
        return <TrendingDown className="w-4 h-4" style={{ color: "#EF4444" }} />
      default:
        return <Minus className="w-4 h-4" style={{ color: "#6B7280" }} />
    }
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "#10B981"
    if (percentage >= 80) return "#3B82F6"
    if (percentage >= 70) return "#14B8A6"
    if (percentage >= 60) return "#F59E0B"
    return "#EF4444"
  }

  const sortedSkills = [...candidate.skills].sort((a, b) => {
    if (sortBy === "score") return b.overallScore - a.overallScore
    if (sortBy === "name") return a.skillName.localeCompare(b.skillName)
    // Sort by trend (improving > stable > declining)
    const trendOrder = { improving: 0, stable: 1, declining: 2 }
    return trendOrder[a.trend] - trendOrder[b.trend]
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
          Skills Analysis
        </h3>

        <div className="flex items-center gap-3">
          {/* Category Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-gray-100 gap-1">
            {(["all", "technical", "soft-skills", "domain"] as SkillCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                  category === cat
                    ? "bg-white text-[#1E5A3B] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {cat === "all" ? "All Skills" : cat.replace("-", " ")}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 rounded-xl border-2 font-medium text-sm"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <option value="score">Sort: Score</option>
            <option value="name">Sort: Name</option>
            <option value="trend">Sort: Trend</option>
          </select>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {sortedSkills.map((skill) => {
          const proficiency = getProficiencyLevel(skill.overallScore)
          return (
            <motion.div
              key={skill.skillName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border-2"
              style={{
                borderColor: "#C9F4D4",
                boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
                      {skill.skillName}
                    </h4>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                      style={{
                        backgroundColor: `${proficiency.color}1A`,
                        color: proficiency.color,
                      }}
                    >
                      {proficiency.label}
                    </span>
                    <span className="text-2xl font-black" style={{ color: proficiency.color }}>
                      {skill.overallScore}%
                    </span>
                  </div>
                  <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.overallScore}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: proficiency.color }}
                    />
                  </div>
                </div>
              </div>

              {/* Assessment Breakdown */}
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2" style={{ color: "#1E5A3B" }}>
                  Assessed in: {skill.assessments.length} {skill.assessments.length === 1 ? "assessment" : "assessments"}
                </div>
                <div className="space-y-1 text-sm" style={{ color: "#2D7A52" }}>
                  {skill.assessments.map((assess, idx) => (
                    <div key={idx}>
                      • {assess.assessmentTitle}: {assess.score}%
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend */}
              <div className="flex items-center gap-2 mb-4">
                {getTrendIcon(skill.trend)}
                <span className="text-sm font-medium" style={{ color: "#4A9A6A" }}>
                  Trend: {skill.trend === "improving" ? "↗ Improving" : skill.trend === "declining" ? "↘ Declining" : "→ Stable"}
                  {skill.trendPercentage !== undefined && skill.trendPercentage !== 0 && (
                    <span> ({skill.trendPercentage > 0 ? "+" : ""}{skill.trendPercentage}%)</span>
                  )}
                </span>
              </div>

              {/* Related Questions */}
              {skill.relatedQuestions.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2" style={{ color: "#1E5A3B" }}>
                    Related Questions Answered:
                  </div>
                  <div className="space-y-1 text-sm" style={{ color: "#2D7A52" }}>
                    {skill.relatedQuestions.slice(0, 3).map((q, idx) => (
                      <div key={idx}>
                        • {q.questionText}: {q.isCorrect ? `${q.score}/${q.maxScore} (${Math.round((q.score / q.maxScore) * 100)}%)` : "Incorrect"}
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-sm font-semibold mt-2"
                    style={{ color: "#80EFC0" }}
                  >
                    <span>View Question Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Recommended Focus Areas */}
      {candidate.analytics.aiInsights.weaknesses.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
            Recommended Focus Areas
          </h3>
          <div className="bg-white rounded-2xl p-6 border-2 space-y-3" style={{ borderColor: "#E8FAF0" }}>
            {candidate.analytics.aiInsights.weaknesses.map((weakness, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm" style={{ color: "#2D7A52" }}>
                <span>⚠️</span>
                <span>{weakness}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


