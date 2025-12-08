"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, Trophy } from "lucide-react"
import { GlobalCandidateProfile } from "@/lib/global-candidate-profile-types"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface OverviewTabProps {
  candidate: GlobalCandidateProfile
}

export function OverviewTab({ candidate }: OverviewTabProps) {
  const getAssessmentIcon = (type: string) => {
    switch (type) {
      case "assessment":
        return "📝"
      case "dsa":
        return "💻"
      case "cloud":
        return "☁️"
      case "ai":
        return "🤖"
      default:
        return "📝"
    }
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "#10B981" }
    if (score >= 80) return { label: "Very Good", color: "#3B82F6" }
    if (score >= 70) return { label: "Good", color: "#14B8A6" }
    return { label: "Average", color: "#F59E0B" }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "#10B981"
    if (percentage >= 80) return "#3B82F6"
    if (percentage >= 70) return "#14B8A6"
    if (percentage >= 60) return "#F59E0B"
    return "#EF4444"
  }

  return (
    <div className="space-y-6">
      {/* Assessment History */}
      <div>
        <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: "#1E5A3B", borderColor: "#E8FAF0" }}>
          Assessment History ({candidate.assessments.length} assessments)
        </h3>
        <div className="space-y-4">
          {candidate.assessments.map((assessment) => {
            const scoreInfo = getScoreLabel(assessment.score)
            return (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all"
                style={{
                  borderColor: "#C9F4D4",
                  boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getAssessmentIcon(assessment.assessmentType)}</span>
                    <div>
                      <div className="text-lg font-bold mb-1" style={{ color: "#1E5A3B" }}>
                        {assessment.assessmentTitle}
                      </div>
                      <div className="flex items-center gap-4 text-sm" style={{ color: "#6B7280" }}>
                        <span>Score: {assessment.score}% ({scoreInfo.label})</span>
                        {assessment.completedAt && (
                          <span>Completed: {new Date(assessment.completedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                    style={{
                      backgroundColor: assessment.status === "completed" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                      color: assessment.status === "completed" ? "#10B981" : "#F59E0B",
                    }}
                  >
                    {assessment.status.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm mb-1" style={{ color: "#4A9A6A" }}>Time</div>
                    <div className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
                      {formatTime(assessment.timeSpent)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm mb-1" style={{ color: "#4A9A6A" }}>Rank</div>
                    <div className="text-lg font-bold flex items-center gap-1" style={{ color: "#1E5A3B" }}>
                      Top {assessment.rank}% {assessment.rank <= 10 && <Trophy className="w-4 h-4" style={{ color: "#EAB308" }} />}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm mb-1" style={{ color: "#4A9A6A" }}>Status</div>
                    <div className="text-lg font-bold" style={{ color: assessment.passed ? "#10B981" : "#EF4444" }}>
                      {assessment.passed ? "Passed" : "Failed"}
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-[#80EFC0] font-semibold group"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Performance Progression */}
      <div>
        <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: "#1E5A3B", borderColor: "#E8FAF0" }}>
          Performance Progression
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
            Trend: {candidate.performanceTrend === "improving" ? "Recovering after dip ↗" : candidate.performanceTrend === "declining" ? "Declining ↘" : "Stable →"}
          </div>
        </div>
      </div>

      {/* Skill Ratings */}
      <div>
        <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: "#1E5A3B", borderColor: "#E8FAF0" }}>
          Skill Ratings (Aggregate)
        </h3>
        <div className="bg-white rounded-2xl p-6 border-2 space-y-4" style={{ borderColor: "#E8FAF0" }}>
          {candidate.skills
            .sort((a, b) => b.overallScore - a.overallScore)
            .slice(0, 5)
            .map((skill) => {
              const scoreInfo = getScoreLabel(skill.overallScore)
              return (
                <div key={skill.skillName}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold" style={{ color: "#1E5A3B" }}>
                      {skill.skillName}:
                    </span>
                    <span className="font-bold" style={{ color: getScoreColor(skill.overallScore) }}>
                      {skill.overallScore}% ({scoreInfo.label})
                    </span>
                  </div>
                  <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.overallScore}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: getScoreColor(skill.overallScore) }}
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: "#1E5A3B", borderColor: "#E8FAF0" }}>
          Recent Activity
        </h3>
        <div className="bg-white rounded-2xl p-6 border-2 space-y-3" style={{ borderColor: "#E8FAF0" }}>
          {candidate.timeline.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-start gap-3 text-sm" style={{ color: "#2D7A52" }}>
              <span>•</span>
              <div>
                <div>{event.title}</div>
                <div className="text-xs" style={{ color: "#6B7280" }}>
                  {new Date(event.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: "#1E5A3B", borderColor: "#E8FAF0" }}>
            Tags
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {candidate.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(128, 239, 192, 0.2)",
                  border: "1px solid #80EFC0",
                  color: "#1E5A3B",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            className="px-3 py-1 rounded-lg text-xs font-medium border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            + Add Tag
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: "#1E5A3B", borderColor: "#E8FAF0" }}>
            Internal Notes ({candidate.notes.length})
          </h3>
          <div className="space-y-3">
            {candidate.notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-xl p-4 border-2"
                style={{ borderColor: "#E8FAF0" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {note.author.avatar ? (
                    <img src={note.author.avatar} alt={note.author.name} className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                      {note.author.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-semibold" style={{ color: "#1E5A3B" }}>
                    {note.author.name}
                  </span>
                  <span className="text-xs" style={{ color: "#6B7280" }}>
                    {note.author.role}
                  </span>
                </div>
                <div className="text-sm mb-1" style={{ color: "#2D7A52" }}>
                  "{note.content}"
                </div>
                <div className="text-xs" style={{ color: "#6B7280" }}>
                  {new Date(note.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-3 px-3 py-1 rounded-lg text-xs font-medium border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            + Add Note
          </button>
        </div>
      </div>
    </div>
  )
}


