"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Edit, Trash2, Copy, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react"
import { Question } from "@/lib/assessment-detail-types"

interface QuestionCardProps {
  question: Question
  index: number
  isExpanded: boolean
  onToggleExpand: () => void
}

const typeConfig = {
  mcq: { label: "MCQ", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
  coding: { label: "Coding", color: "#14B8A6", bg: "rgba(20, 184, 166, 0.1)" },
  subjective: { label: "Subjective", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" },
  "pseudo-code": { label: "Pseudo-code", color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.1)" },
}

const difficultyConfig = {
  easy: { label: "Easy", color: "#10B981" },
  medium: { label: "Medium", color: "#F59E0B" },
  hard: { label: "Hard", color: "#EF4444" },
}

export function QuestionCard({ question, index, isExpanded, onToggleExpand }: QuestionCardProps) {
  const type = typeConfig[question.type]
  const difficulty = difficultyConfig[question.difficulty]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 border-2 transition-all hover:border-[#C9F4D4] hover:shadow-lg"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
              Q{question.number}.
            </span>
            <span className="text-lg font-semibold" style={{ color: "#1E5A3B" }}>
              {question.title}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase"
              style={{
                backgroundColor: type.bg,
                color: type.color,
              }}
            >
              {type.label}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: difficulty.color + "20",
                color: difficulty.color,
              }}
            >
              {difficulty.label}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center border-2 transition-colors hover:bg-[#E8FAF0]"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
            }}
          >
            <Edit className="w-4 h-4" style={{ color: "#4A9A6A" }} />
          </button>
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center border-2 transition-colors hover:bg-red-50"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E8FAF0",
            }}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Question Content */}
      <div className="mb-4">
        {question.type === "mcq" && question.options && (
          <div className="space-y-2">
            {question.options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 ${
                  option.isCorrect ? "bg-[#E8FAF0]" : "bg-white"
                }`}
                style={{
                  borderColor: option.isCorrect ? "#10B981" : "#E8FAF0",
                }}
              >
                <span className="font-medium" style={{ color: "#1E5A3B" }}>
                  {option.id})
                </span>
                <span className="flex-1" style={{ color: "#2D7A52" }}>
                  {option.text}
                </span>
                {option.isCorrect && (
                  <CheckCircle2 className="w-5 h-5" style={{ color: "#10B981" }} />
                )}
              </div>
            ))}
          </div>
        )}

        {question.type === "coding" && (
          <div className="p-4 rounded-lg bg-[#F9FAFB] border" style={{ borderColor: "#E8FAF0" }}>
            <p className="text-sm" style={{ color: "#2D7A52" }}>
              {question.content}
            </p>
            {question.testCases && (
              <div className="mt-3 text-xs" style={{ color: "#6B7280" }}>
                Test Cases: {question.testCases.filter((t) => t.isVisible).length} visible,{" "}
                {question.testCases.filter((t) => !t.isVisible).length} hidden
              </div>
            )}
            {question.timeLimit && (
              <div className="mt-2 text-xs" style={{ color: "#6B7280" }}>
                Time Limit: {question.timeLimit} minutes
              </div>
            )}
          </div>
        )}

        {question.type === "subjective" && (
          <div className="p-4 rounded-lg bg-[#F9FAFB] border" style={{ borderColor: "#E8FAF0" }}>
            <p className="text-sm" style={{ color: "#2D7A52" }}>
              {question.content}
            </p>
          </div>
        )}
      </div>

      {/* Performance Metrics */}
      {question.metrics && (
        <div className="flex items-center gap-6 text-sm mb-4">
          <div>
            <span className="font-medium" style={{ color: "#4A9A6A" }}>
              Performance:{" "}
            </span>
            <span className="font-bold" style={{ color: "#1E5A3B" }}>
              {question.metrics.correctRate}% correct ({Math.floor((question.metrics.correctRate * 28) / 100)}/28 candidates)
            </span>
          </div>
          <div>
            <span className="font-medium" style={{ color: "#4A9A6A" }}>
              Avg Time:{" "}
            </span>
            <span className="font-bold" style={{ color: "#1E5A3B" }}>
              {formatTime(question.metrics.averageTime)}
            </span>
          </div>
        </div>
      )}

      {/* Expand Details Button */}
      <button
        onClick={onToggleExpand}
        className="w-full py-2 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
        style={{
          backgroundColor: "rgba(232, 250, 240, 0.5)",
          color: "#1E5A3B",
        }}
      >
        {isExpanded ? (
          <>
            <span>Hide Details</span>
            <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            <span>Expand Details</span>
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && question.metrics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t overflow-hidden"
            style={{ borderColor: "#E8FAF0" }}
          >
            <h4 className="font-bold mb-4" style={{ color: "#1E5A3B" }}>
              Detailed Analytics
            </h4>

            {question.type === "mcq" && question.metrics.answerDistribution && (
              <div className="space-y-3 mb-4">
                <div className="font-medium text-sm mb-2" style={{ color: "#4A9A6A" }}>
                  Answer Distribution:
                </div>
                {Object.entries(question.metrics.answerDistribution).map(([option, percentage]) => {
                  const isCorrect = question.options?.find((o) => o.id === option)?.isCorrect
                  return (
                    <div key={option}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span style={{ color: "#2D7A52" }}>
                          {option}: {percentage}% ({Math.floor((percentage * 28) / 100)} candidates)
                          {isCorrect && " ✓ Correct"}
                        </span>
                      </div>
                      <div className="h-2 bg-[#E8FAF0] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: isCorrect
                              ? "linear-gradient(90deg, #10B981, #059669)"
                              : "linear-gradient(90deg, #6B7280, #4B5563)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium" style={{ color: "#4A9A6A" }}>
                  Time Analysis:
                </span>
                <div className="mt-1" style={{ color: "#2D7A52" }}>
                  Avg: {formatTime(question.metrics.averageTime)}
                </div>
              </div>
              <div>
                <span className="font-medium" style={{ color: "#4A9A6A" }}>
                  Difficulty Assessment:
                </span>
                <div className="mt-1" style={{ color: "#2D7A52" }}>
                  Based on performance, this question is: {difficulty.label} (as expected) ✓
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

