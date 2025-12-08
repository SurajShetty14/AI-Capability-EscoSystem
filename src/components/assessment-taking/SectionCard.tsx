"use client"

import { motion } from "framer-motion"
import { FileQuestion, Code2, FileText, Clock, ArrowRight } from "lucide-react"

interface Section {
  id: string
  name: string
  questionCount: number
  completed: number
  recommendedTime: number
  status: "completed" | "in-progress" | "not-started"
}

interface SectionCardProps {
  section: Section
  index: number
  onClick: () => void
}

const iconMap = {
  mcq: FileQuestion,
  coding: Code2,
  subjective: FileText,
}

const statusConfig = {
  "in-progress": {
    borderColor: "#3B82F6",
    shadowColor: "rgba(59, 130, 246, 0.15)",
    hoverShadowColor: "rgba(59, 130, 246, 0.25)",
    innerGlow: "from-blue-50/50",
    iconGradient: "from-blue-500 to-blue-600",
    iconShadow: "rgba(59, 130, 246, 0.4)",
    iconHoverShadow: "rgba(59, 130, 246, 0.5)",
    progressGradient: "from-blue-500 to-blue-600",
    progressShadow: "rgba(59, 130, 246, 0.5)",
    buttonBg: "bg-blue-600",
    buttonHover: "hover:bg-blue-700",
  },
  "not-started": {
    borderColor: "#6B7280",
    shadowColor: "rgba(107, 114, 128, 0.1)",
    hoverShadowColor: "rgba(107, 114, 128, 0.2)",
    innerGlow: "from-gray-50/50",
    iconGradient: "from-gray-500 to-gray-600",
    iconShadow: "rgba(107, 114, 128, 0.3)",
    iconHoverShadow: "rgba(107, 114, 128, 0.4)",
    progressGradient: "from-gray-400 to-gray-500",
    progressShadow: "rgba(107, 114, 128, 0.3)",
    buttonBg: "bg-gray-600",
    buttonHover: "hover:bg-gray-700",
  },
  completed: {
    borderColor: "#10B981",
    shadowColor: "rgba(16, 185, 129, 0.15)",
    hoverShadowColor: "rgba(16, 185, 129, 0.25)",
    innerGlow: "from-green-50/50",
    iconGradient: "from-green-500 to-green-600",
    iconShadow: "rgba(16, 185, 129, 0.4)",
    iconHoverShadow: "rgba(16, 185, 129, 0.5)",
    progressGradient: "from-green-500 to-green-600",
    progressShadow: "rgba(16, 185, 129, 0.5)",
    buttonBg: "bg-green-600",
    buttonHover: "hover:bg-green-700",
  },
}

export function SectionCard({ section, index, onClick }: SectionCardProps) {
  const IconComponent = iconMap[section.id as keyof typeof iconMap] || FileQuestion
  const config = statusConfig[section.status]
  const progress = (section.completed / section.questionCount) * 100
  const timeUsed = Math.floor(section.recommendedTime * (progress / 100))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative border-4 rounded-3xl p-8 bg-white cursor-pointer transition-all duration-300"
      style={{
        borderColor: config.borderColor,
        boxShadow: `0 8px 24px ${config.shadowColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)"
        e.currentTarget.style.boxShadow = `0 16px 48px ${config.hoverShadowColor}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = `0 8px 24px ${config.shadowColor}`
      }}
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.innerGlow} to-transparent rounded-3xl pointer-events-none`}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div
            className={`relative w-20 h-20 bg-gradient-to-br ${config.iconGradient} rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
            style={{
              boxShadow: `0 8px 24px ${config.iconShadow}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 12px 32px ${config.iconHoverShadow}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 24px ${config.iconShadow}`
            }}
          >
            <IconComponent className="w-10 h-10 text-white absolute inset-0 m-auto" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl" />
          </div>

          {section.status === "in-progress" && (
            <div className="relative">
              <span className="absolute inset-0 animate-ping bg-blue-400 rounded-full opacity-75" />
              <span
                className="relative px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center gap-2"
                style={{
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                IN PROGRESS
              </span>
            </div>
          )}

          {section.status === "completed" && (
            <span
              className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full"
              style={{
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
              }}
            >
              ✓ COMPLETED
            </span>
          )}

          {section.status === "not-started" && (
            <span
              className="px-3 py-1.5 bg-gray-500 text-white text-xs font-bold rounded-full"
              style={{
                boxShadow: "0 4px 12px rgba(107, 114, 128, 0.3)",
              }}
            >
              NOT STARTED
            </span>
          )}
        </div>

        <h3 className="text-2xl font-black mb-2" style={{ color: "#1E5A3B" }}>
          {section.name} Section
        </h3>

        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: "#4A9A6A" }}>Questions</span>
            <span className="font-bold" style={{ color: "#1E5A3B" }}>
              {section.completed}/{section.questionCount}
            </span>
          </div>

          <div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${config.progressGradient} rounded-full relative`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                style={{
                  boxShadow: `0 0 12px ${config.progressShadow}`,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      `0 0 12px ${config.progressShadow}`,
                      `0 0 20px ${config.progressShadow.replace("0.5", "0.7")}`,
                      `0 0 12px ${config.progressShadow}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
            <div className="text-xs font-semibold mt-1" style={{ color: "#4A9A6A" }}>
              {Math.round(progress)}% Complete
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
            <Clock className="w-3 h-3" />
            <span>~{timeUsed} min used of {section.recommendedTime} min</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(timeUsed / section.recommendedTime) * 100}%`,
                background: `linear-gradient(90deg, ${config.borderColor}, ${config.borderColor}88)`,
              }}
            />
          </div>
        </div>

        {section.status === "not-started" && progress === 0 && (
          <div className="mt-4 p-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
            <p className="text-sm text-center" style={{ color: "#6B7280" }}>
              🚀 Ready to start? Click below!
            </p>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full h-14 ${config.buttonBg} ${config.buttonHover} text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-all duration-200 relative overflow-hidden`}
          style={{
            boxShadow: `0 8px 24px ${config.shadowColor}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 12px 32px ${config.hoverShadowColor}`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 8px 24px ${config.shadowColor}`
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <span className="relative">
            {section.status === "completed" ? "Review" : section.status === "in-progress" ? "Continue" : "Start"}
          </span>
          <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  )
}

