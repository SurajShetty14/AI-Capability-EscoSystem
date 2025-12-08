"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react"

interface AIInsightsProps {
  totalAssessments: number
  timeRange: string
  trends: {
    warnings: string[]
    positives: string[]
    recommendations: string[]
  }
}

export function AIInsights({ totalAssessments, timeRange, trends }: AIInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 border-2"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🤖</span>
        <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
          AI-Powered Insights
        </h3>
      </div>

      <div className="text-sm mb-6" style={{ color: "#2D7A52" }}>
        Based on {totalAssessments.toLocaleString()} assessments in {timeRange.toLowerCase()}:
      </div>

      <div className="space-y-6">
        {/* Warnings */}
        {trends.warnings.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5" style={{ color: "#F59E0B" }} />
              <div className="text-sm font-semibold" style={{ color: "#1E5A3B" }}>
                ⚠️ Trends to Watch:
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm ml-7" style={{ color: "#2D7A52" }}>
              {trends.warnings.map((warning, idx) => (
                <li key={idx}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Positives */}
        {trends.positives.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5" style={{ color: "#10B981" }} />
              <div className="text-sm font-semibold" style={{ color: "#1E5A3B" }}>
                ✅ Positive Indicators:
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm ml-7" style={{ color: "#2D7A52" }}>
              {trends.positives.map((positive, idx) => (
                <li key={idx}>{positive}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {trends.recommendations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5" style={{ color: "#3B82F6" }} />
              <div className="text-sm font-semibold" style={{ color: "#1E5A3B" }}>
                💡 Recommendations:
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm ml-7" style={{ color: "#2D7A52" }}>
              {trends.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )
}


