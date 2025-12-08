"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Download, Award, Clock, CheckCircle2, XCircle } from "lucide-react"
import { GlobalCandidateProfile } from "@/lib/global-candidate-profile-types"

interface AssessmentsTabProps {
  candidate: GlobalCandidateProfile
}

type FilterType = "all" | "completed" | "in-progress" | "pending"

export function AssessmentsTab({ candidate }: AssessmentsTabProps) {
  const [filter, setFilter] = useState<FilterType>("all")
  const [sortBy, setSortBy] = useState<"date" | "score" | "name">("date")

  const getAssessmentIcon = (type: string) => {
    switch (type) {
      case "assessment":
        return "📝"
      case "dsa":
        return "💻"
      case "cloud":
        return "☁️"
      case "ai":
        return "🤖"
      default:
        return "📝"
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
  }

  const filteredAssessments = candidate.assessments.filter((a) => {
    if (filter === "all") return true
    return a.status === filter
  })

  const sortedAssessments = [...filteredAssessments].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0
      const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0
      return dateB - dateA
    }
    if (sortBy === "score") return b.score - a.score
    return a.assessmentTitle.localeCompare(b.assessmentTitle)
  })

  const filterCounts = {
    all: candidate.assessments.length,
    completed: candidate.assessments.filter((a) => a.status === "completed").length,
    "in-progress": candidate.assessments.filter((a) => a.status === "in-progress").length,
    pending: candidate.assessments.filter((a) => a.status === "pending").length,
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
          Assessments ({candidate.totalAssessments} total)
        </h3>

        <div className="flex items-center gap-3">
          {/* Filter Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-gray-100 gap-1">
            {(["all", "completed", "in-progress", "pending"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === f
                    ? "bg-white text-[#1E5A3B] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")} ({filterCounts[f]})
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "score" | "name")}
            className="px-4 py-2 rounded-xl border-2 font-medium text-sm"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <option value="date">Sort: Date</option>
            <option value="score">Sort: Score</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="space-y-4">
        {sortedAssessments.map((assessment) => (
          <motion.div
            key={assessment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border-2"
            style={{
              borderColor: "#C9F4D4",
              boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getAssessmentIcon(assessment.assessmentType)}</span>
                <div>
                  <h4 className="text-lg font-bold mb-1" style={{ color: "#1E5A3B" }}>
                    {assessment.assessmentTitle}
                  </h4>
                </div>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                style={{
                  backgroundColor:
                    assessment.status === "completed"
                      ? "rgba(16, 185, 129, 0.1)"
                      : assessment.status === "in-progress"
                      ? "rgba(59, 130, 246, 0.1)"
                      : "rgba(245, 158, 11, 0.1)",
                  color:
                    assessment.status === "completed"
                      ? "#10B981"
                      : assessment.status === "in-progress"
                      ? "#3B82F6"
                      : "#F59E0B",
                }}
              >
                {assessment.status === "completed"
                  ? "COMPLETED"
                  : assessment.status === "in-progress"
                  ? "IN PROGRESS"
                  : "PENDING"}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-[#E8FAF0] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5" style={{ color: "#80EFC0" }} />
                  <span className="text-sm font-medium" style={{ color: "#4A9A6A" }}>
                    Score
                  </span>
                </div>
                <div className="text-2xl font-black" style={{ color: "#1E5A3B" }}>
                  {assessment.score}%
                </div>
              </div>
              <div className="bg-[#E8FAF0] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" style={{ color: "#80EFC0" }} />
                  <span className="text-sm font-medium" style={{ color: "#4A9A6A" }}>
                    Time
                  </span>
                </div>
                <div className="text-2xl font-black" style={{ color: "#1E5A3B" }}>
                  {formatTime(assessment.timeSpent)}
                </div>
              </div>
              <div className="bg-[#E8FAF0] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5" style={{ color: "#80EFC0" }} />
                  <span className="text-sm font-medium" style={{ color: "#4A9A6A" }}>
                    Rank
                  </span>
                </div>
                <div className="text-2xl font-black" style={{ color: "#1E5A3B" }}>
                  Top {assessment.rank}%
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="mb-4">
              <div className="text-sm font-semibold mb-2" style={{ color: "#1E5A3B" }}>
                Breakdown:
              </div>
              <div className="space-y-1 text-sm" style={{ color: "#2D7A52" }}>
                <div>
                  • MCQ: {assessment.breakdown.mcq.score}/{assessment.breakdown.mcq.total} ({assessment.breakdown.mcq.percentage}%)
                </div>
                <div>
                  • Coding: {assessment.breakdown.coding.score}/{assessment.breakdown.coding.total} ({assessment.breakdown.coding.percentage}%)
                </div>
                <div>
                  • Subjective: {assessment.breakdown.subjective.score}/{assessment.breakdown.subjective.total} ({assessment.breakdown.subjective.percentage}%)
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-2 mb-4 text-sm" style={{ color: "#4A9A6A" }}>
              {assessment.completedAt && (
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>
                    Completed: {new Date(assessment.completedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>Duration: {formatTime(assessment.timeSpent)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎯</span>
                <span>
                  Status: {assessment.passed ? "Passed" : "Failed"} (threshold: {assessment.passingScore}%)
                </span>
              </div>
              {assessment.proctoring && (
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>
                    Proctoring: {assessment.proctoring.violations === 0 ? "No violations" : `${assessment.proctoring.violations} violation(s)`}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t-2" style={{ borderColor: "#E8FAF0" }}>
              <motion.button
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 font-semibold text-sm"
                style={{ color: "#80EFC0" }}
              >
                <span>View Full Report</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              {assessment.passed && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 border-2"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#C9F4D4",
                    color: "#1E5A3B",
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download Certificate
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


