"use client"

import { motion } from "framer-motion"
import { Download, TrendingUp, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AssessmentDetail } from "@/lib/assessment-detail-types"

interface AnalyticsTabProps {
  assessment: AssessmentDetail
}

export function AnalyticsTab({ assessment }: AnalyticsTabProps) {
  // Mock score data over time
  const scoreData = [
    { date: "Jan 1", score: 72, mcq: 80, coding: 65, subjective: 70 },
    { date: "Jan 5", score: 75, mcq: 82, coding: 68, subjective: 72 },
    { date: "Jan 10", score: 78, mcq: 85, coding: 72, subjective: 75 },
    { date: "Jan 15", score: 80, mcq: 87, coding: 75, subjective: 77 },
    { date: "Jan 20", score: 78.5, mcq: 85, coding: 72, subjective: 76 },
  ]

  return (
    <div className="p-8 space-y-6" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select
            className="px-4 py-2 rounded-xl border-2 font-medium"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <Download className="w-4 h-4" />
          Export
        </motion.button>
      </div>

      {/* Score Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border-2"
        style={{
          borderColor: "#E8FAF0",
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
        }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Score Distribution Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={scoreData}>
            <XAxis 
              dataKey="date" 
              style={{ fill: "#6B7280", fontSize: "12px" }}
            />
            <YAxis 
              style={{ fill: "#6B7280", fontSize: "12px" }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #C9F4D4",
                borderRadius: "12px",
                color: "#1E5A3B",
              }}
            />
            <Legend 
              wrapperStyle={{ color: "#1E5A3B" }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#80EFC0" 
              strokeWidth={3}
              dot={{ fill: "#80EFC0", r: 5 }}
              name="Overall Score"
            />
            <Line 
              type="monotone" 
              dataKey="mcq" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: "#3B82F6", r: 4 }}
              name="MCQ"
            />
            <Line 
              type="monotone" 
              dataKey="coding" 
              stroke="#14B8A6" 
              strokeWidth={2}
              dot={{ fill: "#14B8A6", r: 4 }}
              name="Coding"
            />
            <Line 
              type="monotone" 
              dataKey="subjective" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={{ fill: "#F59E0B", r: 4 }}
              name="Subjective"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuestionDifficultyCard assessment={assessment} />
        <TimeDistributionCard />
        <ScoreByExperienceCard />
      </div>

      {/* AI Insights */}
      <AIInsightsCard assessment={assessment} />

      {/* Comparison Analytics */}
      <ComparisonCard assessment={assessment} />
    </div>
  )
}

function QuestionDifficultyCard({ assessment }: { assessment: AssessmentDetail }) {
  const difficulties = [
    { label: "Easy", count: 5, avg: 92, expected: 85, status: "appropriate" },
    { label: "Medium", count: 8, avg: 75, expected: 70, status: "appropriate" },
    { label: "Hard", count: 5, avg: 45, expected: 60, status: "too-difficult" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border-2"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
        Question Difficulty
      </h3>
      <div className="space-y-4">
        {difficulties.map((diff) => (
          <div key={diff.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold" style={{ color: "#1E5A3B" }}>
                {diff.label} ({diff.count} questions)
              </span>
              <span className="font-bold" style={{ color: "#1E5A3B" }}>
                Avg: {diff.avg}%
              </span>
            </div>
            <div className="h-2 bg-[#E8FAF0] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    diff.status === "appropriate"
                      ? "linear-gradient(90deg, #10B981, #059669)"
                      : "linear-gradient(90deg, #EF4444, #DC2626)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${diff.avg}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="text-xs mt-1" style={{ color: "#6B7280" }}>
              {diff.status === "appropriate" ? (
                <span className="text-green-600">✓ Appropriate</span>
              ) : (
                <span className="text-red-600">⚠️ Too difficult - Review Q5, Q7</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function TimeDistributionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-6 border-2"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
        Time Distribution
      </h3>
      <div className="h-48 flex items-center justify-center border-2 border-dashed rounded-xl" style={{ borderColor: "#E8FAF0" }}>
        <div className="text-center">
          <div className="text-sm font-medium" style={{ color: "#6B7280" }}>
            Histogram showing completion times
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ScoreByExperienceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 border-2"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
        Score by Experience
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: "#2D7A52" }}>
              Junior (0-2y)
            </span>
            <span className="font-bold" style={{ color: "#1E5A3B" }}>
              68%
            </span>
          </div>
          <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #3B82F6, #2563EB)" }}
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: "#2D7A52" }}>
              Mid (3-5y)
            </span>
            <span className="font-bold" style={{ color: "#1E5A3B" }}>
              78%
            </span>
          </div>
          <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #10B981, #059669)" }}
              initial={{ width: 0 }}
              animate={{ width: "78%" }}
              transition={{ duration: 1, delay: 0.1 }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: "#2D7A52" }}>
              Senior (6-10y)
            </span>
            <span className="font-bold" style={{ color: "#1E5A3B" }}>
              88%
            </span>
          </div>
          <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #14B8A6, #0D9488)" }}
              initial={{ width: 0 }}
              animate={{ width: "88%" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t text-sm" style={{ borderColor: "#E8FAF0", color: "#4A9A6A" }}>
        Insight: Senior candidates score 15% higher
      </div>
    </motion.div>
  )
}

function AIInsightsCard({ assessment }: { assessment: AssessmentDetail }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl p-6 border-2"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xl">
          🤖
        </div>
        <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
          AI Insights & Recommendations
        </h3>
      </div>
      <div className="text-sm mb-4" style={{ color: "#6B7280" }}>
        Based on {assessment.metrics.completed} completed assessments:
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-xl border-2" style={{ borderColor: "#FEE2E2", backgroundColor: "#FEF2F2" }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-600">Issues Detected:</span>
          </div>
          <ul className="space-y-2 text-sm" style={{ color: "#991B1B" }}>
            <li>• Question 5 has 35% correct rate (expected 60%) - Consider reviewing or replacing</li>
            <li>• 40% of candidates run out of time - Recommendation: Increase duration to 2 hours</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl border-2" style={{ borderColor: "#D1FAE5", backgroundColor: "#F0FDF4" }}>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-600">What's Working:</span>
          </div>
          <ul className="space-y-2 text-sm" style={{ color: "#065F46" }}>
            <li>• MCQ questions are well-calibrated</li>
            <li>• Coding challenges show good discrimination</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl border-2" style={{ borderColor: "#FEF3C7", backgroundColor: "#FFFBEB" }}>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <span className="font-semibold text-amber-600">Suggestions:</span>
          </div>
          <ul className="space-y-2 text-sm" style={{ color: "#92400E" }}>
            <li>• Add 2-3 more questions on React Hooks</li>
            <li>• Consider splitting into Junior/Senior tracks</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function ComparisonCard({ assessment }: { assessment: AssessmentDetail }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 border-2"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
        Benchmark Comparison
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F0FDF4" }}>
          <div>
            <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
              Your Avg Score:
            </div>
            <div className="text-2xl font-black" style={{ color: "#1E5A3B" }}>
              {assessment.metrics.averageScore}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
              Platform Avg:
            </div>
            <div className="text-2xl font-black" style={{ color: "#6B7280" }}>
              72.3%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
              Difference:
            </div>
            <div className="text-2xl font-black text-green-600">
              +{(assessment.metrics.averageScore - 72.3).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "#F0FDF4" }}>
            <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
              Pass Rate
            </div>
            <div className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
              {assessment.metrics.passRate}%
            </div>
            <div className="text-xs mt-1" style={{ color: "#6B7280" }}>
              Platform: 75%
            </div>
          </div>
          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "#F0FDF4" }}>
            <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
              Completion Rate
            </div>
            <div className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
              {assessment.metrics.completionRate}%
            </div>
            <div className="text-xs mt-1" style={{ color: "#6B7280" }}>
              Platform: 78%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

