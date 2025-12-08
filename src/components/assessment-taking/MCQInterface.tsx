"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Star, Check, ChevronLeft, ChevronRight, CheckCircle2, Loader2 } from "lucide-react"
import { AssessmentNav } from "./AssessmentNav"

interface MCQInterfaceProps {
  assessmentId: string
}

interface Question {
  id: number
  text: string
  options: string[]
  selectedAnswer?: number
  markedForReview: boolean
}

export function MCQInterface({ assessmentId }: MCQInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [timeRemaining] = useState(45 * 60)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | null>(null)

  const totalQuestions = 10

  const questions: Question[] = [
    {
      id: 1,
      text: "What is the Virtual DOM in React?",
      options: [
        "A real DOM element stored in memory",
        "A lightweight copy of the DOM in memory",
        "A browser API for virtual rendering",
        "A React component lifecycle method",
      ],
      selectedAnswer: 1,
      markedForReview: false,
    },
    {
      id: 2,
      text: "Which hook is used to manage state in functional components?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      selectedAnswer: undefined,
      markedForReview: true,
    },
  ]

  const currentQ = questions[currentQuestion - 1] || questions[0]
  const progress = (currentQuestion / totalQuestions) * 100

  // Auto-save simulation
  useEffect(() => {
    if (selectedAnswer !== null) {
      setIsSaving(true)
      setSaveStatus("saving")
      const timer = setTimeout(() => {
        setIsSaving(false)
        setSaveStatus("saved")
        setTimeout(() => setSaveStatus(null), 2000)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [selectedAnswer])

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
  }

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
    }
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    }
  }

  const handleQuestionJump = (questionNum: number) => {
    setCurrentQuestion(questionNum)
    setSelectedAnswer(null)
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Sidebar - Question Navigator */}
      <div className="w-52 bg-white/50 backdrop-blur-sm border-r-2 border-[#E8FAF0] p-4 overflow-y-auto flex-shrink-0">
        <div className="mb-4">
          <select className="w-full h-10 px-3 rounded-lg border-2 border-[#C9F4D4] text-sm font-medium">
            <option>All Sections</option>
            <option>MCQ</option>
            <option>Coding</option>
            <option>Subjective</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const questionNum = idx + 1
            const isAnswered = questionNum === 1
            const isCurrent = questionNum === currentQuestion
            const isMarked = questionNum === 2

            return (
              <button
                key={questionNum}
                onClick={() => handleQuestionJump(questionNum)}
                className={`w-20 h-20 rounded-xl font-bold text-lg border-2 transition-all ${
                  isCurrent
                    ? "bg-[#80EFC0] text-white border-[#80EFC0]"
                    : isAnswered
                    ? "bg-green-100 text-green-700 border-green-300"
                    : isMarked
                    ? "bg-amber-100 text-amber-700 border-amber-300"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                {isMarked && <Star className="w-4 h-4 mx-auto mb-1" />}
                Q{questionNum}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AssessmentNav
          assessmentTitle="MCQ Section"
          timeRemaining={timeRemaining}
          onHelp={() => console.log("Help")}
          onMenu={() => console.log("Menu")}
        />

        <div className="flex-1 p-8 max-w-4xl mx-auto w-full flex flex-col min-h-0 overflow-hidden">
          {/* Progress Bar Enhancement */}
          <div className="mb-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: "#4A9A6A" }}>
                Question {currentQuestion} of {totalQuestions}
              </span>
              <span className="text-sm" style={{ color: "#6B7280" }}>
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r rounded-full"
                style={{
                  background: "linear-gradient(90deg, #80EFC0, #10B981)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-4 flex-shrink-0">
            <h2 className="text-xl font-semibold" style={{ color: "#1E5A3B" }}>
              {currentQ.text}
            </h2>
          </div>

          {/* Enhanced Option Cards - No scrolling, fit all 4 options */}
          <div className="space-y-3 mb-4 flex-1 flex flex-col justify-center min-h-0">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const letter = String.fromCharCode(65 + index)

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full p-4 rounded-2xl border-3 transition-all duration-200 flex items-center gap-4 text-left flex-shrink-0 ${
                    isSelected
                      ? "bg-[rgba(232,250,240,1)] border-[#80EFC0] shadow-[0_4px_16px_rgba(128,239,192,0.3)]"
                      : "bg-white border-gray-200 hover:border-[#C9F4D4] hover:bg-[rgba(232,250,240,0.3)]"
                  }`}
                >
                  {/* Radio Circle with Letter */}
                  <div
                    className={`w-12 h-12 rounded-full border-3 flex items-center justify-center font-bold text-lg transition-all flex-shrink-0 ${
                      isSelected
                        ? "bg-[#80EFC0] border-[#10B981] text-white shadow-lg"
                        : "bg-white border-gray-300 text-gray-600"
                    }`}
                  >
                    {letter}
                  </div>

                  {/* Option Text */}
                  <span
                    className={`flex-1 text-base leading-relaxed ${
                      isSelected ? "text-gray-900 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {option}
                  </span>

                  {/* Checkmark for Selected */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-[#80EFC0] rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="sticky bottom-0 bg-white border-t-2 border-[#E8FAF0] p-6 flex items-center justify-between shadow-[0_-4px_16px_rgba(201,244,212,0.1)] flex-shrink-0 mt-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={currentQuestion === 1}
              className="px-6 py-3 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </motion.button>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl font-semibold text-sm border-2 transition-all"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#C9F4D4",
                  color: "#1E5A3B",
                }}
              >
                <Star className="w-4 h-4 inline mr-2" />
                Mark for Review
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={currentQuestion === totalQuestions}
                className="px-6 py-3 rounded-xl font-semibold text-base flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #10B981, #059669)",
                  color: "#FFFFFF",
                }}
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Save Indicator */}
      <AnimatePresence>
        {isSaving && saveStatus === "saving" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg flex items-center gap-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </motion.div>
        )}

        {saveStatus === "saved" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-green-500 text-white rounded-full shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Saved 2s ago
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
