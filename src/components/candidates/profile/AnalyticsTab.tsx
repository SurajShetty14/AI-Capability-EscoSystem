"use client"

import { motion } from "framer-motion"
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { CandidateProfile } from "@/lib/candidate-profile-types"

interface AnalyticsTabProps {
  candidate: CandidateProfile
}

export function AnalyticsTab({ candidate }: AnalyticsTabProps) {
  const scoreProgression = candidate.analytics.scoreProgression
  const timeDistribution = candidate.analytics.timeDistribution
  const topicPerformance = candidate.analytics.topicPerformance.map((t) => ({
    topic: t.topic,
    score: t.score,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      {/* Score Progression */}
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#C9F4D4" }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Score Progression Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={scoreProgression}>
            <XAxis dataKey="x" style={{ fill: "#6B7280", fontSize: "12px" }} />
            <YAxis style={{ fill: "#6B7280", fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #C9F4D4",
                borderRadius: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#80EFC0"
              strokeWidth={3}
              dot={{ fill: "#80EFC0", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Time Distribution */}
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#C9F4D4" }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Time Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timeDistribution}>
            <XAxis dataKey="x" style={{ fill: "#6B7280", fontSize: "12px" }} />
            <YAxis style={{ fill: "#6B7280", fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #C9F4D4",
                borderRadius: "12px",
              }}
            />
            <Bar dataKey="y" fill="#80EFC0" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Topic Performance */}
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#C9F4D4" }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Topic Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={topicPerformance}>
            <PolarGrid />
            <PolarAngleAxis dataKey="topic" style={{ fill: "#1E5A3B", fontSize: "12px" }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} style={{ fill: "#6B7280", fontSize: "10px" }} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#80EFC0"
              fill="#80EFC0"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Difficulty Analysis */}
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#C9F4D4" }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Difficulty Analysis
        </h3>
        <div className="space-y-4">
          {Object.entries(candidate.analytics.difficultyAnalysis).map(([difficulty, data]) => {
            const color = difficulty === "easy" ? "#10B981" : difficulty === "medium" ? "#3B82F6" : "#F59E0B"
            return (
              <div key={difficulty}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold capitalize" style={{ color: "#1E5A3B" }}>
                    {difficulty} ({data.total} questions):
                  </span>
                  <span className="font-bold" style={{ color }}>
                    {data.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-[#E8FAF0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.percentage}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Comparative Analysis */}
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#C9F4D4" }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Comparative Analysis
        </h3>
        <div className="space-y-3 text-[15px]">
          <div className="flex items-center justify-between">
            <span style={{ color: "#2D7A52" }}>Overall:</span>
            <span style={{ color: candidate.analytics.comparison.overall.difference > 0 ? "#10B981" : "#EF4444" }}>
              {candidate.analytics.comparison.overall.candidate}% vs {candidate.analytics.comparison.overall.average}% ({candidate.analytics.comparison.overall.difference > 0 ? "+" : ""}
              {candidate.analytics.comparison.overall.difference.toFixed(1)} points) {candidate.analytics.comparison.overall.difference > 0 ? "✓" : ""}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: "#2D7A52" }}>Speed:</span>
            <span style={{ color: candidate.analytics.comparison.speed.difference < 0 ? "#10B981" : "#EF4444" }}>
              {Math.floor(candidate.analytics.comparison.speed.candidate / 60)}h {candidate.analytics.comparison.speed.candidate % 60}m vs {Math.floor(candidate.analytics.comparison.speed.average / 60)}h {candidate.analytics.comparison.speed.average % 60}m ({Math.abs(candidate.analytics.comparison.speed.difference)} min {candidate.analytics.comparison.speed.difference < 0 ? "faster" : "slower"}) {candidate.analytics.comparison.speed.difference < 0 ? "✓" : ""}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: "#2D7A52" }}>Accuracy:</span>
            <span style={{ color: candidate.analytics.comparison.accuracy.difference > 0 ? "#10B981" : "#EF4444" }}>
              {candidate.analytics.comparison.accuracy.candidate}% vs {candidate.analytics.comparison.accuracy.average}% ({candidate.analytics.comparison.accuracy.difference > 0 ? "+" : ""}
              {candidate.analytics.comparison.accuracy.difference.toFixed(1)} points) {candidate.analytics.comparison.accuracy.difference > 0 ? "✓" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div
        className="rounded-2xl p-6 border-2"
        style={{
          background: "linear-gradient(135deg, #E8FAF0 0%, #FFFFFF 100%)",
          borderColor: "#80EFC0",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🤖</span>
          <h3 className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
            AI Insights
          </h3>
        </div>
        <div className="space-y-4 text-[15px]">
          <div>
            <div className="font-semibold mb-2" style={{ color: "#1E5A3B" }}>
              ✅ Strengths:
            </div>
            <ul className="list-disc list-inside space-y-1" style={{ color: "#2D7A52" }}>
              {candidate.analytics.aiInsights.strengths.map((strength, idx) => (
                <li key={idx}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2" style={{ color: "#1E5A3B" }}>
              ⚠️ Areas for Improvement:
            </div>
            <ul className="list-disc list-inside space-y-1" style={{ color: "#2D7A52" }}>
              {candidate.analytics.aiInsights.weaknesses.map((weakness, idx) => (
                <li key={idx}>{weakness}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2" style={{ color: "#1E5A3B" }}>
              💡 Recommendation:
            </div>
            <div style={{ color: "#2D7A52" }}>{candidate.analytics.aiInsights.recommendation}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

