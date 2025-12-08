"use client"

import { motion } from "framer-motion"
import { GlobalCandidateProfile } from "@/lib/global-candidate-profile-types"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface AnalyticsTabProps {
  candidate: GlobalCandidateProfile
}

export function AnalyticsTab({ candidate }: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      {/* Score Trend Over Time */}
      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Score Trend Over Time
        </h3>
        <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#E8FAF0" }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={candidate.analytics.scoreProgression}>
              <XAxis dataKey="x" style={{ fill: "#6B7280", fontSize: "12px" }} />
              <YAxis domain={[0, 100]} style={{ fill: "#6B7280", fontSize: "12px" }} />
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
                dot={{ fill: "#80EFC0", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm" style={{ color: "#2D7A52" }}>
            Insight: {candidate.performanceTrend === "improving" ? "Recovered from December dip" : candidate.performanceTrend === "declining" ? "Performance declining over time" : "Stable performance"}
          </div>
        </div>
      </div>

      {/* Performance by Assessment Type */}
      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Performance by Assessment Type
        </h3>
        <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#E8FAF0" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={candidate.analytics.performanceByType}>
              <XAxis dataKey="type" style={{ fill: "#6B7280", fontSize: "12px" }} />
              <YAxis domain={[0, 100]} style={{ fill: "#6B7280", fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #C9F4D4",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="averageScore" fill="#80EFC0" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill Radar Chart */}
      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Skill Radar Chart
        </h3>
        <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#E8FAF0" }}>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={candidate.analytics.skillRadar}>
              <PolarGrid stroke="#E8FAF0" />
              <PolarAngleAxis dataKey="skill" style={{ fill: "#1E5A3B", fontSize: "12px" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} style={{ fill: "#6B7280", fontSize: "10px" }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#80EFC0"
                fill="#80EFC0"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #C9F4D4",
                  borderRadius: "12px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparative Benchmarking */}
      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Comparative Benchmarking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#E8FAF0" }}>
            <div className="text-sm font-semibold mb-4" style={{ color: "#1E5A3B" }}>
              vs Platform Average:
            </div>
            <div className="space-y-2 text-sm" style={{ color: "#2D7A52" }}>
              <div>• Your Avg: {candidate.averageScore}%</div>
              <div>• Platform Avg: {candidate.analytics.benchmarking.platformAverage}%</div>
              <div className="font-bold" style={{ color: candidate.analytics.benchmarking.difference >= 0 ? "#10B981" : "#EF4444" }}>
                • Difference: {candidate.analytics.benchmarking.difference > 0 ? "+" : ""}{candidate.analytics.benchmarking.difference}% ({candidate.analytics.benchmarking.difference >= 0 ? "Excellent" : "Below Average"}) ✓
              </div>
            </div>
          </div>
          {candidate.analytics.benchmarking.seniorBenchmark && (
            <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#E8FAF0" }}>
              <div className="text-sm font-semibold mb-4" style={{ color: "#1E5A3B" }}>
                vs Senior Role Benchmark:
              </div>
              <div className="space-y-2 text-sm" style={{ color: "#2D7A52" }}>
                <div>• Your Avg: {candidate.averageScore}%</div>
                <div>• Senior Benchmark: {candidate.analytics.benchmarking.seniorBenchmark}%</div>
                <div className="font-bold" style={{ color: candidate.averageScore >= candidate.analytics.benchmarking.seniorBenchmark ? "#10B981" : "#EF4444" }}>
                  • Difference: {candidate.averageScore >= candidate.analytics.benchmarking.seniorBenchmark ? "+" : ""}{(candidate.averageScore - candidate.analytics.benchmarking.seniorBenchmark).toFixed(1)}% ({candidate.averageScore >= candidate.analytics.benchmarking.seniorBenchmark ? "Exceeds" : "Below"}) ✓
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI-Powered Insights */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "#1E5A3B" }}>
          <span>🤖</span>
          <span>AI-Powered Insights</span>
        </h3>
        <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#E8FAF0" }}>
          <div className="text-sm mb-4" style={{ color: "#2D7A52" }}>
            Based on {candidate.totalAssessments} {candidate.totalAssessments === 1 ? "assessment" : "assessments"}:
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#10B981" }}>
                <span>✅</span>
                <span>Strengths:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm ml-6" style={{ color: "#2D7A52" }}>
                {candidate.analytics.aiInsights.strengths.map((strength, idx) => (
                  <li key={idx}>{strength}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#F59E0B" }}>
                <span>⚠️</span>
                <span>Development Areas:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm ml-6" style={{ color: "#2D7A52" }}>
                {candidate.analytics.aiInsights.weaknesses.map((weakness, idx) => (
                  <li key={idx}>{weakness}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "#3B82F6" }}>
                <span>💡</span>
                <span>Recommendations:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm ml-6" style={{ color: "#2D7A52" }}>
                {candidate.analytics.aiInsights.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t-2" style={{ borderColor: "#E8FAF0" }}>
              <div className="text-sm font-semibold mb-2" style={{ color: "#1E5A3B" }}>
                Career Level: {candidate.analytics.aiInsights.careerLevel}
              </div>
              <div className="text-sm" style={{ color: "#2D7A52" }}>
                Recommended Roles: {candidate.analytics.aiInsights.recommendedRoles.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


