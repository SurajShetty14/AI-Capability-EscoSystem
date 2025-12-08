"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

interface SkillGapData {
  skill: string
  score: number
  candidatesCount: number
}

interface SkillGapAnalysisProps {
  data: SkillGapData[]
}

export function SkillGapAnalysis({ data }: SkillGapAnalysisProps) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const getScoreColor = (score: number) => {
    if (score >= 86) return { gradient: "linear-gradient(90deg, #10B981, #059669)", label: "Excellent", bg: "rgba(16, 185, 129, 0.1)", text: "#10B981" }
    if (score >= 76) return { gradient: "linear-gradient(90deg, #3B82F6, #2563EB)", label: "Good", bg: "rgba(59, 130, 246, 0.1)", text: "#3B82F6" }
    if (score >= 61) return { gradient: "linear-gradient(90deg, #F59E0B, #F59E0B)", label: "Fair", bg: "rgba(245, 158, 11, 0.1)", text: "#F59E0B" }
    if (score >= 41) return { gradient: "linear-gradient(90deg, #F59E0B, #D97706)", label: "Poor", bg: "rgba(245, 158, 11, 0.1)", text: "#F59E0B" }
    return { gradient: "linear-gradient(90deg, #EF4444, #DC2626)", label: "Critical", bg: "rgba(239, 68, 68, 0.1)", text: "#EF4444" }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 border-2 h-full"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold mb-2" style={{ color: "#1E5A3B" }}>
            Skill Gap Analysis
          </h3>
          <p className="text-sm" style={{ color: "#4A9A6A" }}>
            Most common weaknesses
          </p>
        </div>
        <button className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: "#80EFC0" }}>
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs font-medium mb-4" style={{ color: "#6B7280" }}>
        Showing: Top {data.length} gaps
      </div>

      {/* Skill Bars */}
      <div className="space-y-4">
        {data.map((item, index) => {
          const colorInfo = getScoreColor(item.score)
          return (
            <motion.div
              key={item.skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gradient-to-br from-transparent to-[#F9FAFB] rounded-xl hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setExpandedSkill(expandedSkill === item.skill ? null : item.skill)}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-base font-semibold" style={{ color: "#1E5A3B" }}>
                  {item.skill}
                </h4>
                <div className="text-right">
                  <div className="text-2xl font-black" style={{ color: colorInfo.text }}>
                    {item.score}%
                  </div>
                  <div
                    className="text-xs font-bold uppercase px-2 py-0.5 rounded-full mt-1"
                    style={{
                      backgroundColor: colorInfo.bg,
                      color: colorInfo.text,
                    }}
                  >
                    {colorInfo.label}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-8 bg-[#E8FAF0] rounded-full overflow-hidden shadow-inner mb-2 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                  className="h-full rounded-full flex items-center px-3"
                  style={{
                    background: colorInfo.gradient,
                    boxShadow: `0 0 16px ${colorInfo.text}66`,
                  }}
                >
                  {item.score > 20 && (
                    <span className="text-xs font-bold text-white">{item.score}%</span>
                  )}
                </motion.div>
                {item.score <= 20 && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold" style={{ color: colorInfo.text }}>
                    {item.score}%
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex justify-between items-center text-sm">
                <span style={{ color: "#6B7280" }}>
                  💡 {item.candidatesCount} candidates need improvement
                </span>
                <button className="font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: "#80EFC0" }}>
                  View Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}


