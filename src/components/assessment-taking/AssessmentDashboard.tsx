"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AssessmentNav } from "./AssessmentNav"
import { SectionCard } from "./SectionCard"
import { ArrowRight, Search, Activity, ChevronDown } from "lucide-react"

interface AssessmentDashboardProps {
  assessmentId: string
  onSectionSelect: (section: string) => void
}

interface Section {
  id: string
  name: string
  questionCount: number
  completed: number
  recommendedTime: number
  status: "completed" | "in-progress" | "not-started"
}

export function AssessmentDashboard({ assessmentId, onSectionSelect }: AssessmentDashboardProps) {
  const [timeRemaining] = useState(90 * 60)
  const [isActivityExpanded, setIsActivityExpanded] = useState(false)

  const sections: Section[] = [
    {
      id: "mcq",
      name: "MCQ",
      questionCount: 10,
      completed: 8,
      recommendedTime: 30,
      status: "in-progress",
    },
    {
      id: "coding",
      name: "Coding",
      questionCount: 5,
      completed: 2,
      recommendedTime: 40,
      status: "in-progress",
    },
    {
      id: "subjective",
      name: "Subjective",
      questionCount: 3,
      completed: 0,
      recommendedTime: 20,
      status: "not-started",
    },
  ]

  const totalQuestions = sections.reduce((sum, s) => sum + s.questionCount, 0)
  const completedQuestions = sections.reduce((sum, s) => sum + s.completed, 0)
  const progress = (completedQuestions / totalQuestions) * 100

  const activityItems = [
    { id: 1, text: "Answered Q8 (MCQ)", time: "2 min ago" },
    { id: 2, text: "Answered Q3 (Coding)", time: "5 min ago" },
    { id: 3, text: "Started MCQ section", time: "10 min ago" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <AssessmentNav
        assessmentTitle="Full Stack Developer Assessment"
        timeRemaining={timeRemaining}
        onHelp={() => console.log("Help")}
        onMenu={() => console.log("Menu")}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-black mb-2" style={{ color: "#1E5A3B" }}>
                Choose a section to begin or continue:
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold" style={{ color: "#4A9A6A" }}>
                  Progress: {completedQuestions}/{totalQuestions} ({Math.round(progress)}%)
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl font-semibold text-base border-2 transition-all flex items-center gap-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Search className="w-5 h-5" />
              <span>Review All</span>
            </motion.button>
          </div>

          <div className="mb-8">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r rounded-full relative"
                style={{
                  background: "linear-gradient(90deg, #C9F4D4, #80EFC0)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 12px rgba(128, 239, 192, 0.5)",
                      "0 0 20px rgba(128, 239, 192, 0.7)",
                      "0 0 12px rgba(128, 239, 192, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                section={section}
                index={index}
                onClick={() => onSectionSelect(section.id)}
              />
            ))}
          </div>

          <div className="bg-white rounded-2xl border-2 overflow-hidden mb-6" style={{ borderColor: "#E8FAF0" }}>
            <button
              onClick={() => setIsActivityExpanded(!isActivityExpanded)}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              style={{
                borderColor: isActivityExpanded ? "#80EFC0" : "#E8FAF0",
                backgroundColor: isActivityExpanded ? "rgba(232, 250, 240, 0.3)" : "transparent",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #80EFC0, #10B981)",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
                  Recent Activity
                </h3>
                {activityItems.length > 0 && (
                  <span
                    className="px-2 py-0.5 text-xs font-bold rounded-full"
                    style={{
                      backgroundColor: "rgba(128, 239, 192, 0.2)",
                      color: "#059669",
                    }}
                  >
                    {activityItems.length}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActivityExpanded ? "rotate-180" : ""
                }`}
                style={{ color: "#9CA3AF" }}
              />
            </button>
            <AnimatePresence>
              {isActivityExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 space-y-2 border-t-2" style={{ borderColor: "#E8FAF0" }}>
                    {activityItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: activityItems.indexOf(item) * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ backgroundColor: "#F9FAFB" }}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "#10B981" }}
                        />
                        <span className="text-sm flex-1" style={{ color: "#374151" }}>
                          {item.text}
                        </span>
                        <span className="text-xs" style={{ color: "#9CA3AF" }}>
                          {item.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="sticky bottom-0 mt-8 pt-6 pb-4 bg-[#FAFAFA] border-t-2" style={{ borderColor: "#E8FAF0" }}>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full h-16 text-white font-black text-xl rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #10B981, #059669)",
                boxShadow: "0 8px 32px rgba(16, 185, 129, 0.4)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative">Submit Assessment</span>
              <ArrowRight className="w-6 h-6 relative" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

