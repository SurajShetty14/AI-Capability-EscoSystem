"use client"

import { motion } from "framer-motion"
import { Plus, Upload, GripVertical, MoreVertical, Edit, Trash2, Copy, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { AssessmentDetail, Question } from "@/lib/assessment-detail-types"
import { QuestionCard } from "./QuestionCard"

interface QuestionsTabProps {
  assessment: AssessmentDetail
}

export function QuestionsTab({ assessment }: QuestionsTabProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())

  const toggleExpand = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId)
    } else {
      newExpanded.add(questionId)
    }
    setExpandedQuestions(newExpanded)
  }

  const totalTime = assessment.questions.reduce((sum, q) => sum + (q.timeLimit || 0), 0)

  return (
    <div className="p-8 space-y-6" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Top Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-xl font-semibold text-[15px] flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
              color: "#1E5A3B",
              boxShadow: "0 4px 12px rgba(128, 239, 192, 0.3)",
            }}
          >
            <Plus className="w-5 h-5" />
            Add Question
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <Upload className="w-5 h-5" />
            Import
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <GripVertical className="w-5 h-5" />
            Reorder
          </motion.button>
        </div>
        <div className="text-sm font-medium" style={{ color: "#4A9A6A" }}>
          {assessment.questions.length} Questions • {totalTime} min estimated time
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {assessment.questions.map((question, idx) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={idx}
            isExpanded={expandedQuestions.has(question.id)}
            onToggleExpand={() => toggleExpand(question.id)}
          />
        ))}
      </div>
    </div>
  )
}

