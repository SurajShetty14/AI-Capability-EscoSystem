"use client"

import { motion } from "framer-motion"
import { Copy, Mail, FileText, Target, Clock, Shield, BarChart3, TrendingUp, Trophy, Users } from "lucide-react"
import { AssessmentDetail } from "@/lib/assessment-detail-types"
import { PerformanceChart } from "./PerformanceChart"
import { LeaderboardTable } from "./LeaderboardTable"

interface OverviewTabProps {
  assessment: AssessmentDetail
}

export function OverviewTab({ assessment }: OverviewTabProps) {
  return (
    <div className="p-8 space-y-8" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Assessment Info Card */}
      <AssessmentInfoCard assessment={assessment} />

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceOverviewCard assessment={assessment} />
        <QuestionBreakdownCard assessment={assessment} />
        <RecentActivityCard assessment={assessment} />
      </div>

      {/* Top Performers */}
      <LeaderboardTable performers={assessment.performance.topPerformers} />

      {/* Hiring Funnel */}
      <HiringFunnelCard assessment={assessment} />
    </div>
  )
}

function AssessmentInfoCard({ assessment }: { assessment: AssessmentDetail }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(assessment.assessmentLink)
    // Show toast notification
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border-2"
      style={{
        borderColor: "#C9F4D4",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.15)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: "#1E5A3B" }}>
          Assessment Details
        </h2>
        <button
          onClick={handleCopyLink}
          className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <Copy className="w-4 h-4" />
          Copy Link
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 mt-0.5" style={{ color: "#4A9A6A" }} />
          <div>
            <span className="text-base font-medium" style={{ color: "#2D7A52" }}>
              Type:{" "}
            </span>
            <span className="text-base" style={{ color: "#2D7A52" }}>
              Assessment Competency (MCQ + Coding + Subjective)
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 mt-0.5" style={{ color: "#4A9A6A" }} />
          <div>
            <span className="text-base font-medium" style={{ color: "#2D7A52" }}>
              Skills:{" "}
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {assessment.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex px-3 py-1 rounded-full text-sm font-medium border"
                  style={{
                    backgroundColor: "rgba(128, 239, 192, 0.15)",
                    borderColor: "#80EFC0",
                    color: "#1E5A3B",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 mt-0.5" style={{ color: "#4A9A6A" }} />
          <div>
            <span className="text-base font-medium" style={{ color: "#2D7A52" }}>
              Duration:{" "}
            </span>
            <span className="text-base" style={{ color: "#2D7A52" }}>
              {assessment.config.duration} minutes
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <BarChart3 className="w-5 h-5 mt-0.5" style={{ color: "#4A9A6A" }} />
          <div>
            <span className="text-base font-medium" style={{ color: "#2D7A52" }}>
              Difficulty:{" "}
            </span>
            <span className="text-base" style={{ color: "#2D7A52" }}>
              Medium (suitable for 3-5 years experience)
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 mt-0.5" style={{ color: "#4A9A6A" }} />
          <div>
            <span className="text-base font-medium" style={{ color: "#2D7A52" }}>
              Proctoring:{" "}
            </span>
            <span className="text-base" style={{ color: "#2D7A52" }}>
              {assessment.config.proctoring.enabled
                ? "Enabled (screenshot + tab tracking)"
                : "Disabled"}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-base font-medium mb-2" style={{ color: "#2D7A52" }}>
            {assessment.questions.length} Questions:{" "}
            {assessment.performance.questionBreakdown.mcq.count} MCQ •{" "}
            {assessment.performance.questionBreakdown.coding.count} Coding •{" "}
            {assessment.performance.questionBreakdown.subjective.count} Subjective
          </div>
        </div>

        {/* Assessment Link */}
        <div
          className="mt-6 p-4 rounded-xl border border-dashed"
          style={{
            backgroundColor: "rgba(232, 250, 240, 0.3)",
            borderColor: "#C9F4D4",
          }}
        >
          <div className="text-sm font-medium mb-2" style={{ color: "#4A9A6A" }}>
            Assessment Link:
          </div>
          <div className="flex items-center gap-3">
            <code
              className="flex-1 font-mono text-sm p-2 rounded-lg bg-white border"
              style={{ borderColor: "#E8FAF0" }}
            >
              {assessment.assessmentLink}
            </code>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-lg border-2 transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              className="px-4 py-2 rounded-lg border-2 transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PerformanceOverviewCard({ assessment }: { assessment: AssessmentDetail }) {
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
        Performance Distribution
      </h3>
      <PerformanceChart distribution={assessment.performance.scoreDistribution} />
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10B981" }} />
            <span className="text-sm" style={{ color: "#2D7A52" }}>
              Excellent (90-100%):
            </span>
          </div>
          <span className="font-bold" style={{ color: "#1E5A3B" }}>
            {assessment.performance.scoreDistribution.excellent}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3B82F6" }} />
            <span className="text-sm" style={{ color: "#2D7A52" }}>
              Good (70-89%):
            </span>
          </div>
          <span className="font-bold" style={{ color: "#1E5A3B" }}>
            {assessment.performance.scoreDistribution.good}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
            <span className="text-sm" style={{ color: "#2D7A52" }}>
              Average (50-69%):
            </span>
          </div>
          <span className="font-bold" style={{ color: "#1E5A3B" }}>
            {assessment.performance.scoreDistribution.average}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#EF4444" }} />
            <span className="text-sm" style={{ color: "#2D7A52" }}>
              Poor (&lt;50%):
            </span>
          </div>
          <span className="font-bold" style={{ color: "#1E5A3B" }}>
            {assessment.performance.scoreDistribution.poor}
          </span>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t" style={{ borderColor: "#E8FAF0" }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: "#4A9A6A" }}>
            Pass Rate:
          </span>
          <span className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
            {assessment.metrics.passRate}% ({Math.floor((assessment.metrics.completed * assessment.metrics.passRate) / 100)}/{assessment.metrics.completed})
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function QuestionBreakdownCard({ assessment }: { assessment: AssessmentDetail }) {
  const breakdown = assessment.performance.questionBreakdown

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
        Question Performance
      </h3>
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold" style={{ color: "#1E5A3B" }}>
              MCQ ({breakdown.mcq.count} questions)
            </span>
            <span className="font-bold" style={{ color: "#1E5A3B" }}>
              Avg: {breakdown.mcq.average}%
            </span>
          </div>
          <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #3B82F6, #2563EB)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${breakdown.mcq.average}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold" style={{ color: "#1E5A3B" }}>
              Coding ({breakdown.coding.count} questions)
            </span>
            <span className="font-bold" style={{ color: "#1E5A3B" }}>
              Avg: {breakdown.coding.average}%
            </span>
          </div>
          <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #14B8A6, #0D9488)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${breakdown.coding.average}%` }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold" style={{ color: "#1E5A3B" }}>
              Subjective ({breakdown.subjective.count} questions)
            </span>
            <span className="font-bold" style={{ color: "#1E5A3B" }}>
              Avg: {breakdown.subjective.average}%
            </span>
          </div>
          <div className="h-3 bg-[#E8FAF0] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D97706)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${breakdown.subjective.average}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
      <button
        className="mt-6 w-full py-2 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
        style={{
          backgroundColor: "rgba(232, 250, 240, 0.5)",
          color: "#1E5A3B",
        }}
      >
        View Detailed Breakdown
        <TrendingUp className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

function RecentActivityCard({ assessment }: { assessment: AssessmentDetail }) {
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
      <h3 className="text-xl font-bold mb-4" style={{ color: "#1E5A3B" }}>
        Recent Activity
      </h3>
      <div className="space-y-4">
        {assessment.recentActivity.map((activity, idx) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="relative">
              <div
                className="w-3 h-3 rounded-full border-2 border-white"
                style={{
                  backgroundColor:
                    activity.type === "completed"
                      ? "#10B981"
                      : activity.type === "started"
                      ? "#3B82F6"
                      : "#6B7280",
                }}
              />
              {idx < assessment.recentActivity.length - 1 && (
                <div
                  className="absolute top-3 left-1/2 w-0.5 h-8 -translate-x-1/2"
                  style={{ backgroundColor: "#E8FAF0" }}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {activity.candidate.avatar ? (
                  <img
                    src={activity.candidate.avatar}
                    alt={activity.candidate.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{
                      background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
                    }}
                  >
                    {activity.candidate.name[0]}
                  </div>
                )}
                <span className="text-sm font-medium" style={{ color: "#2D7A52" }}>
                  {activity.candidate.name}{" "}
                  {activity.type === "completed" && (
                    <>
                      completed {activity.score && `(Score: ${activity.score}%)`}
                    </>
                  )}
                  {activity.type === "started" && (
                    <>
                      started (In progress: {activity.progress}%)
                    </>
                  )}
                  {activity.type === "invited" && "invited"}
                </span>
              </div>
              <div className="text-xs" style={{ color: "#6B7280" }}>
                {activity.timeAgo}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-4 w-full py-2 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
        style={{
          backgroundColor: "rgba(232, 250, 240, 0.5)",
          color: "#1E5A3B",
        }}
      >
        View All Activity
        <TrendingUp className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

function HiringFunnelCard({ assessment }: { assessment: AssessmentDetail }) {
  const invited = assessment.metrics.totalCandidates
  const started = assessment.metrics.inProgress + assessment.metrics.completed
  const completed = assessment.metrics.completed
  const passed = Math.floor((completed * assessment.metrics.passRate) / 100)

  const conversionRates = {
    started: (started / invited) * 100,
    completed: (completed / invited) * 100,
    passed: (passed / invited) * 100,
  }

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
      <h3 className="text-xl font-bold mb-6" style={{ color: "#1E5A3B" }}>
        Hiring Funnel
      </h3>

      {/* Funnel Visualization */}
      <div className="space-y-4 mb-6">
        <FunnelStep
          label="Invited"
          count={invited}
          percentage={100}
          color="#3B82F6"
        />
        <FunnelStep
          label="Started"
          count={started}
          percentage={conversionRates.started}
          color="#10B981"
        />
        <FunnelStep
          label="Completed"
          count={completed}
          percentage={conversionRates.completed}
          color="#14B8A6"
        />
        <FunnelStep
          label="Passed"
          count={passed}
          percentage={conversionRates.passed}
          color="#059669"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: "#E8FAF0" }}>
        <div>
          <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
            Average Time to Complete:
          </div>
          <div className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
            {Math.floor(assessment.metrics.averageTime / 60)}h {assessment.metrics.averageTime % 60}m
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
            Drop-off Rate:
          </div>
          <div className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
            {100 - conversionRates.completed}% (Started but not completed)
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-1" style={{ color: "#4A9A6A" }}>
            Pass Rate:
          </div>
          <div className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
            {assessment.metrics.passRate}% (of completed)
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FunnelStep({
  label,
  count,
  percentage,
  color,
}: {
  label: string
  count: number
  percentage: number
  color: string
}) {
  return (
    <div className="relative">
      <div
        className="h-16 rounded-lg flex items-center justify-between px-6 transition-all hover:opacity-90"
        style={{
          backgroundColor: color,
          width: `${percentage}%`,
          minWidth: "200px",
        }}
      >
        <div className="text-white font-bold text-lg">{label}</div>
        <div className="text-white font-bold text-lg">
          {count} ({percentage.toFixed(0)}%)
        </div>
      </div>
    </div>
  )
}

