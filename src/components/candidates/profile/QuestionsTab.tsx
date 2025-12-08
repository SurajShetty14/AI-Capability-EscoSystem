"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, X, AlertTriangle, ChevronDown, ChevronUp, Code } from "lucide-react"
import { CandidateProfile } from "@/lib/candidate-profile-types"

interface QuestionsTabProps {
  candidate: CandidateProfile
}

type FilterType = "all" | "correct" | "incorrect" | "skipped"

export function QuestionsTab({ candidate }: QuestionsTabProps) {
  const [filter, setFilter] = useState<FilterType>("all")
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())

  const filteredQuestions = candidate.questions.filter((q) => {
    if (filter === "all") return true
    if (filter === "correct") return q.isCorrect
    if (filter === "incorrect") return !q.isCorrect && !q.isPartiallyCorrect
    if (filter === "skipped") return !q.candidateAnswer
    return true
  })

  const toggleExpand = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId)
    } else {
      newExpanded.add(questionId)
    }
    setExpandedQuestions(newExpanded)
  }

  const getStatusIcon = (question: typeof candidate.questions[0]) => {
    if (question.isCorrect) return <CheckCircle2 className="w-6 h-6" style={{ color: "#10B981" }} />
    if (question.isPartiallyCorrect) return <AlertTriangle className="w-6 h-6" style={{ color: "#F59E0B" }} />
    return <X className="w-6 h-6" style={{ color: "#EF4444" }} />
  }

  const getBorderColor = (question: typeof candidate.questions[0]) => {
    if (question.isCorrect) return "#10B981"
    if (question.isPartiallyCorrect) return "#F59E0B"
    return "#EF4444"
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "correct", "incorrect", "skipped"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-medium text-sm border-2 transition-all ${
                filter === f
                  ? "bg-[#E8FAF0] border-[#80EFC0] text-[#1E5A3B]"
                  : "bg-white border-[#E8FAF0] text-[#6B7280] hover:border-[#C9F4D4]"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== "all" && (
                <span className="ml-2 px-2 py-0.5 rounded text-xs" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                  {candidate.questions.filter((q) => {
                    if (f === "correct") return q.isCorrect
                    if (f === "incorrect") return !q.isCorrect && !q.isPartiallyCorrect
                    if (f === "skipped") return !q.candidateAnswer
                    return false
                  }).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <select
          className="px-4 py-2 rounded-xl border-2 text-sm font-medium"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E8FAF0",
            color: "#1E5A3B",
          }}
        >
          <option>Sort: Order</option>
          <option>Sort: Score</option>
          <option>Sort: Time</option>
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => {
          const isExpanded = expandedQuestions.has(question.questionId)
          const borderColor = getBorderColor(question)

          return (
            <motion.div
              key={question.questionId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 border-2 border-l-4"
              style={{
                borderColor: "#E8FAF0",
                borderLeftColor: borderColor,
              }}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  {getStatusIcon(question)}
                  <div>
                    <div className="font-semibold text-base" style={{ color: "#1E5A3B" }}>
                      Q{question.questionNumber}. {question.questionText} ({question.questionType.toUpperCase()})
                    </div>
                    <div className="text-sm mt-1" style={{ color: "#6B7280" }}>
                      Score: {question.score}/{question.maxScore} points • Time: {formatTime(question.timeTaken)} • Difficulty: {question.difficulty}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleExpand(question.questionId)}
                  className="p-2 rounded-lg hover:bg-[#E8FAF0] transition-colors"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" style={{ color: "#4A9A6A" }} />
                  ) : (
                    <ChevronDown className="w-5 h-5" style={{ color: "#4A9A6A" }} />
                  )}
                </button>
              </div>

              {/* Answer Details */}
              {question.questionType === "mcq" && (
                <div className="space-y-2 mb-4">
                  <div className="text-sm" style={{ color: "#2D7A52" }}>
                    <strong>Candidate's Answer:</strong> {question.selectedOption} {question.isCorrect ? "✓" : "✗"}
                  </div>
                  {!question.isCorrect && (
                    <div className="text-sm" style={{ color: "#6B7280" }}>
                      <strong>Correct Answer:</strong> {question.correctAnswer}
                    </div>
                  )}
                </div>
              )}

              {question.questionType === "coding" && (
                <div className="space-y-3 mb-4">
                  <div className="text-sm" style={{ color: "#2D7A52" }}>
                    <strong>Score:</strong> {question.score}/{question.maxScore} points
                    {question.attempts && ` (${question.attempts} attempts)`}
                  </div>
                  {question.testResults && question.testResults.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold mb-2" style={{ color: "#1E5A3B" }}>
                        Test Results:
                      </div>
                      <div className="space-y-1">
                        {question.testResults.map((test, idx) => (
                          <div
                            key={idx}
                            className={`text-sm p-2 rounded flex items-center gap-2 ${
                              test.passed ? "bg-[rgba(16,185,129,0.1)]" : "bg-[rgba(239,68,68,0.1)]"
                            }`}
                          >
                            {test.passed ? (
                              <CheckCircle2 className="w-4 h-4" style={{ color: "#10B981" }} />
                            ) : (
                              <X className="w-4 h-4" style={{ color: "#EF4444" }} />
                            )}
                            <span>
                              {test.name}: {test.passed ? "Passed" : `Expected '${test.expectedOutput}', got '${test.actualOutput || "undefined"}'`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 rounded-lg text-xs font-medium border-2"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#C9F4D4",
                        color: "#1E5A3B",
                      }}
                    >
                      <Code className="w-4 h-4 inline mr-1" />
                      View Code
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg text-xs font-medium border-2"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#C9F4D4",
                        color: "#1E5A3B",
                      }}
                    >
                      Compare with Expected
                    </button>
                  </div>
                </div>
              )}

              {/* Expanded Details */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t"
                  style={{ borderColor: "#E8FAF0" }}
                >
                  <div className="text-sm space-y-2" style={{ color: "#6B7280" }}>
                    <div>
                      <strong>Full Question:</strong> {question.questionText}
                    </div>
                    {question.options && (
                      <div>
                        <strong>Options:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {question.options.map((opt) => (
                            <li key={opt.id}>
                              {opt.text} {opt.isCorrect ? "(Correct)" : ""}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

