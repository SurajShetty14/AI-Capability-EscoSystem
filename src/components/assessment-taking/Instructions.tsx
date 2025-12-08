"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Rocket, ChevronDown, FileText, BookOpen, AlertTriangle, Target, Clock } from "lucide-react"

interface InstructionsProps {
  onBegin: () => void
  onBack: () => void
}

export function Instructions({ onBegin, onBack }: InstructionsProps) {
  const [consented, setConsented] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    details: false,
    instructions: false,
    rules: false,
    tips: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const assessment = {
    title: "Full Stack Developer Assessment",
    duration: 90,
    sections: 3,
    sectionsList: ["MCQ", "Coding", "Subjective"],
    totalQuestions: 18,
    passingScore: 70,
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <div className="sticky top-0 z-50 bg-white border-b-2 shadow-sm" style={{ borderColor: "#E8FAF0" }}>
        <div className="max-w-4xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-black flex items-center gap-3" style={{ color: "#1E5A3B" }}>
            <FileText className="w-8 h-8" />
            <span>Assessment Instructions</span>
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border-2 overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
              <button
                onClick={() => toggleSection("details")}
                className="w-full p-6 flex items-center justify-between transition-all duration-200 cursor-pointer hover:bg-blue-50"
                style={{
                  borderColor: expandedSections.details ? "#3B82F6" : "#BFDBFE",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239, 246, 255, 1)"
                  e.currentTarget.style.borderColor = "#93C5FD"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = expandedSections.details ? "rgba(239, 246, 255, 1)" : "transparent"
                  e.currentTarget.style.borderColor = "#BFDBFE"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}>
                    <FileText className="w-6 h-6" style={{ color: "#3B82F6" }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
                    Assessment Details
                  </h2>
                </div>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-200 ${expandedSections.details ? "rotate-180" : ""}`}
                  style={{ color: "#9CA3AF" }}
                />
              </button>
              <AnimatePresence>
                {expandedSections.details && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl" style={{ backgroundColor: "#E8FAF0" }}>
                          <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>Title</div>
                          <div className="text-base font-semibold" style={{ color: "#1E5A3B" }}>{assessment.title}</div>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: "#E8FAF0" }}>
                          <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>Duration</div>
                          <div className="text-base font-semibold" style={{ color: "#1E5A3B" }}>{assessment.duration} minutes</div>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: "#E8FAF0" }}>
                          <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>Sections</div>
                          <div className="text-base font-semibold" style={{ color: "#1E5A3B" }}>{assessment.sections} ({assessment.sectionsList.join(", ")})</div>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: "#E8FAF0" }}>
                          <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>Total Questions</div>
                          <div className="text-base font-semibold" style={{ color: "#1E5A3B" }}>{assessment.totalQuestions}</div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl" style={{ backgroundColor: "#E8FAF0" }}>
                        <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>Passing Score</div>
                        <div className="text-base font-semibold" style={{ color: "#1E5A3B" }}>{assessment.passingScore}%</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-2xl border-2 overflow-hidden" style={{ borderColor: "#E8FAF0" }}>
              <button
                onClick={() => toggleSection("instructions")}
                className="w-full p-6 flex items-center justify-between transition-all duration-200 cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(232, 250, 240, 1)"
                  e.currentTarget.style.borderColor = "#80EFC0"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = expandedSections.instructions ? "rgba(232, 250, 240, 1)" : "transparent"
                  e.currentTarget.style.borderColor = "#E8FAF0"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}>
                    <BookOpen className="w-6 h-6" style={{ color: "#10B981" }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
                    Instructions
                  </h2>
                </div>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-200 ${expandedSections.instructions ? "rotate-180" : ""}`}
                  style={{ color: "#9CA3AF" }}
                />
              </button>
              <AnimatePresence>
                {expandedSections.instructions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      <div className="space-y-3">
                        <div>
                          <div className="font-semibold mb-1 text-base" style={{ color: "#1E5A3B" }}>1. Section Selection</div>
                          <div className="text-sm" style={{ color: "#2D7A52" }}>You can choose which section to start with. Navigate between sections anytime.</div>
                        </div>
                        <div>
                          <div className="font-semibold mb-1 text-base" style={{ color: "#1E5A3B" }}>2. Time Management</div>
                          <div className="text-sm" style={{ color: "#2D7A52" }}>Each section has recommended time. Total time: {assessment.duration} minutes for all sections. Timer will be visible at all times.</div>
                        </div>
                        <div>
                          <div className="font-semibold mb-1 text-base" style={{ color: "#1E5A3B" }}>3. Question Navigation</div>
                          <div className="text-sm" style={{ color: "#2D7A52" }}>You can skip and return to questions. Unanswered questions marked clearly. Review all answers before submission.</div>
                        </div>
                        <div>
                          <div className="font-semibold mb-1 text-base" style={{ color: "#1E5A3B" }}>4. Saving & Auto-save</div>
                          <div className="text-sm" style={{ color: "#2D7A52" }}>Answers auto-save every 30 seconds. No need to manually save. You can resume if disconnected.</div>
                        </div>
                        <div>
                          <div className="font-semibold mb-1 text-base" style={{ color: "#1E5A3B" }}>5. Submission</div>
                          <div className="text-sm" style={{ color: "#2D7A52" }}>Submit anytime when complete. Auto-submits when time expires. Cannot edit after submission.</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-2xl border-2 overflow-hidden" style={{ borderColor: "#FCA5A5" }}>
              <button
                onClick={() => toggleSection("rules")}
                className="w-full p-6 flex items-center justify-between transition-all duration-200 cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(254, 226, 226, 1)"
                  e.currentTarget.style.borderColor = "#F87171"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = expandedSections.rules ? "rgba(254, 226, 226, 1)" : "transparent"
                  e.currentTarget.style.borderColor = "#FCA5A5"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}>
                    <AlertTriangle className="w-6 h-6" style={{ color: "#EF4444" }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
                    Important Rules
                  </h2>
                </div>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-200 ${expandedSections.rules ? "rotate-180" : ""}`}
                  style={{ color: "#9CA3AF" }}
                />
              </button>
              <AnimatePresence>
                {expandedSections.rules && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <ul className="space-y-2 text-sm" style={{ color: "#2D7A52" }}>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✗</span>
                          <span>Do not switch tabs or windows</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✗</span>
                          <span>Do not copy/paste from external sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✗</span>
                          <span>Do not communicate with others</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✗</span>
                          <span>Do not use unauthorized tools</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✗</span>
                          <span>Do not exit full screen mode</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: "rgba(239, 68, 68, 0.05)", border: "2px solid #FCA5A5" }}>
                        <div className="text-sm font-semibold" style={{ color: "#EF4444" }}>
                          Violations will be flagged and may result in test termination.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-2xl border-2 overflow-hidden" style={{ borderColor: "#A7F3D0" }}>
              <button
                onClick={() => toggleSection("tips")}
                className="w-full p-6 flex items-center justify-between transition-all duration-200 cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(209, 250, 229, 1)"
                  e.currentTarget.style.borderColor = "#6EE7B7"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = expandedSections.tips ? "rgba(209, 250, 229, 1)" : "transparent"
                  e.currentTarget.style.borderColor = "#A7F3D0"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}>
                    <Target className="w-6 h-6" style={{ color: "#10B981" }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
                    Tips for Success
                  </h2>
                </div>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-200 ${expandedSections.tips ? "rotate-180" : ""}`}
                  style={{ color: "#9CA3AF" }}
                />
              </button>
              <AnimatePresence>
                {expandedSections.tips && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <ul className="space-y-2 text-sm" style={{ color: "#2D7A52" }}>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span>Read questions carefully before answering</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span>Manage your time across all sections</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span>Use the review feature before submitting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span>Stay calm and focused</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span>Don't spend too long on one question</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white rounded-2xl border-2" style={{ borderColor: "#E8FAF0" }}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consented}
                onChange={(e) => setConsented(e.target.checked)}
                className="mt-1 w-6 h-6 rounded-md border-2 cursor-pointer"
                style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
              />
              <span className="text-lg font-semibold" style={{ color: "#2D7A52" }}>
                I have read and understood all instructions
              </span>
            </label>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [1, 0.9, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-6 flex items-center justify-center gap-2 p-4 rounded-xl"
            style={{
              backgroundColor: "rgba(254, 226, 226, 0.5)",
              border: "2px solid #FCA5A5",
            }}
          >
            <Clock className="w-5 h-5" style={{ color: "#EF4444" }} />
            <p className="font-semibold" style={{ color: "#EF4444" }}>
              Time starts when you click "Begin Assessment"
            </p>
          </motion.div>

          <div className="mt-8 flex items-center justify-between pb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="px-6 py-3 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Setup</span>
            </motion.button>

            <motion.button
              whileHover={consented ? { scale: 1.02, y: -2 } : {}}
              whileTap={consented ? { scale: 0.98 } : {}}
              onClick={consented ? onBegin : undefined}
              disabled={!consented}
              className={`px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-3 transition-all duration-200 relative overflow-hidden ${
                consented
                  ? "cursor-pointer shadow-lg hover:shadow-xl"
                  : "cursor-not-allowed opacity-60"
              }`}
              style={{
                background: consented
                  ? "linear-gradient(135deg, #10B981, #059669)"
                  : "linear-gradient(135deg, #9CA3AF, #6B7280)",
                color: "#FFFFFF",
                boxShadow: consented ? "0 8px 32px rgba(16, 185, 129, 0.4)" : "none",
              }}
            >
              {consented && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
              <Rocket className="w-6 h-6 relative" />
              <span className="relative">Begin Assessment</span>
              <ArrowRight className="w-5 h-5 relative" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

