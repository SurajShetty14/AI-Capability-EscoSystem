"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  Archive,
  MoreVertical,
  Calendar,
  Timer,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Copy,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  Trophy,
  AlertTriangle,
  BarChart3,
  Phone,
} from "lucide-react"
import {
  EnhancedCandidate,
  CandidateAssessment,
  getScoreLabel,
  calculateAverageScore,
} from "@/lib/candidate-utils"

interface CandidateCardProps {
  candidate: EnhancedCandidate
  index: number
  isSelected: boolean
  onSelect: (id: string) => void
  onViewProfile: (id: string) => void
  platformAvgScore?: number
}

const statusConfig = {
  completed: {
    label: "Completed",
    color: "#10B981",
    bg: "rgba(16, 185, 129, 0.1)",
    icon: CheckCircle2,
  },
  "in-progress": {
    label: "In Progress",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.1)",
    icon: Clock,
    pulse: true,
  },
  pending: {
    label: "Pending",
    color: "#6B7280",
    bg: "rgba(107, 114, 128, 0.1)",
    icon: Clock,
  },
  failed: {
    label: "Failed",
    color: "#EF4444",
    bg: "rgba(239, 68, 68, 0.1)",
    icon: XCircle,
  },
  active: {
    label: "Active",
    color: "#3B82F6",
    bg: "rgba(59, 130, 246, 0.1)",
    icon: Clock,
    pulse: true,
  },
  inactive: {
    label: "Inactive",
    color: "#9CA3AF",
    bg: "rgba(156, 163, 175, 0.1)",
    icon: Clock,
  },
}

const avatarGradients = [
  "linear-gradient(135deg, #C9F4D4, #80EFC0)",
  "linear-gradient(135deg, #BFDBFE, #60A5FA)",
  "linear-gradient(135deg, #DDD6FE, #A78BFA)",
  "linear-gradient(135deg, #FED7AA, #FB923C)",
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function CandidateCard({
  candidate,
  index,
  isSelected,
  onSelect,
  onViewProfile,
  platformAvgScore = 74.5,
}: CandidateCardProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)

  const latestAssessment = candidate.latestAssessment
  const assessmentCount = candidate.assessments.length
  const isRepeatCandidate = assessmentCount >= 3
  const isTopPerformer = candidate.overallScore >= 90
  const isLowPerformer = candidate.overallScore < 50 && candidate.overallScore > 0
  const isCurrentlyTesting = candidate.status === "active" || latestAssessment?.status === "in-progress"
  const isInactive = candidate.status === "inactive"

  const status = statusConfig[candidate.status] || statusConfig.pending
  const StatusIcon = status.icon
  const avatarGradient = avatarGradients[index % avatarGradients.length]
  const initials = getInitials(candidate.name)

  const scoreInfo = candidate.overallScore > 0 ? getScoreLabel(candidate.overallScore) : null
  const scoreDiff = candidate.overallScore > 0 ? candidate.overallScore - platformAvgScore : 0

  // Animate score counter
  useEffect(() => {
    if (candidate.overallScore > 0) {
      const duration = 2000
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        setDisplayScore(Math.floor(candidate.overallScore * easeOutExpo))
        if (progress < 1) requestAnimationFrame(animate)
      }
      animate()
    }
  }, [candidate.overallScore])

  const memberSince = new Date(candidate.memberSince).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })

  const visibleHistory = isHistoryExpanded
    ? candidate.assessments
    : candidate.assessments.slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onHoverStart={() => setShowQuickActions(true)}
      onHoverEnd={() => setShowQuickActions(false)}
      className={`relative bg-white rounded-3xl p-6 border-2 transition-all duration-400 cursor-pointer group overflow-hidden h-full flex flex-col ${
        isSelected ? "ring-4 ring-[#80EFC0] ring-offset-2" : ""
      } ${isInactive ? "opacity-90" : ""}`}
      style={{
        borderColor: isSelected ? "#80EFC0" : "#E8FAF0",
        boxShadow: isSelected
          ? "0 16px 48px rgba(128, 239, 192, 0.3)"
          : isTopPerformer
          ? "0 4px 20px rgba(234, 179, 8, 0.3)"
          : "0 2px 16px rgba(201, 244, 212, 0.12)",
        transform: isTopPerformer ? "scale(1.02)" : undefined,
      }}
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
        style={{
          background: "linear-gradient(135deg, #C9F4D4 0%, #80EFC0 100%)",
        }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Top Performer Gold Border */}
      {isTopPerformer && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
          style={{ backgroundColor: "#EAB308" }}
        />
      )}

      {/* Low Performer Red Border */}
      {isLowPerformer && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
          style={{ backgroundColor: "#EF4444" }}
        />
      )}

      {/* Top Section */}
      <div className="flex items-start justify-between mb-4 gap-4">
        {/* Checkbox + Avatar */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(candidate.id)
            }}
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
              isSelected
                ? "bg-[#80EFC0] border-[#80EFC0]"
                : "border-[#C9F4D4] hover:border-[#80EFC0]"
            }`}
            style={{ marginTop: "4px" }}
          >
            {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
          </motion.button>

          {/* Avatar */}
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative flex-shrink-0">
            {candidate.avatar ? (
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-[72px] h-[72px] rounded-full border-[3px]"
                style={{ borderColor: "#C9F4D4" }}
              />
            ) : (
              <div
                className="w-[72px] h-[72px] rounded-full border-[3px] flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                style={{
                  background: avatarGradient,
                  borderColor: "#C9F4D4",
                  boxShadow: "0 4px 16px rgba(201, 244, 212, 0.3)",
                }}
              >
                {initials}
              </div>
            )}
          </motion.div>

          {/* Name + Email + Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold text-[#1E5A3B] group-hover:underline truncate">
                {candidate.name}
              </h3>
              {isTopPerformer && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-lg flex-shrink-0"
                >
                  🏆
                </motion.span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#4A9A6A] mb-1 flex-wrap">
              <div className="flex items-center gap-1 min-w-0">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{candidate.email}</span>
              </div>
              {candidate.phone && (
                <>
                  <span className="flex-shrink-0">•</span>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 flex-shrink-0" />
                    <span>{candidate.phone}</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-[#6B7280] flex-wrap">
              <div className="flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="font-medium">{assessmentCount} assessment{assessmentCount !== 1 ? "s" : ""}</span>
              </div>
              <span className="flex-shrink-0">•</span>
              <span>Member since {memberSince}</span>
            </div>
          </div>
        </div>

        {/* Status Badge + Menu + Quick Actions */}
        <div className="flex flex-col items-end gap-2 relative flex-shrink-0">
          {/* Badges Row */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {isRepeatCandidate && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 whitespace-nowrap"
              >
                🔁 Repeat Candidate
              </motion.div>
            )}
            {isCurrentlyTesting && (
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 0 0 rgba(245, 158, 11, 0.7)`,
                    `0 0 0 8px rgba(245, 158, 11, 0)`,
                    `0 0 0 0 rgba(245, 158, 11, 0)`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 whitespace-nowrap"
              >
                🟢 LIVE
              </motion.div>
            )}
            {isInactive && (
              <div className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 whitespace-nowrap">
                Inactive
              </div>
            )}
            <motion.div
              className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide flex items-center gap-2 whitespace-nowrap"
              style={{
                backgroundColor: status.bg,
                color: status.color,
              }}
              animate={
                "pulse" in status && status.pulse
                  ? {
                      boxShadow: [
                        `0 0 0 0 ${status.color}70`,
                        `0 0 0 8px ${status.color}00`,
                        `0 0 0 0 ${status.color}00`,
                      ],
                    }
                  : {}
              }
              transition={
                "pulse" in status && status.pulse
                  ? {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }
                  : {}
              }
            >
              <StatusIcon className="w-3 h-3 flex-shrink-0" />
              {status.label}
            </motion.div>
          </div>

          {/* Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[#E8FAF0] flex-shrink-0"
          >
            <MoreVertical className="w-4 h-4 text-[#4A9A6A]" />
          </motion.button>

          {/* Hover Quick Actions */}
          <AnimatePresence>
            {showQuickActions && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-12 right-0 flex flex-col gap-2 bg-white rounded-xl p-2 shadow-xl border-2 z-10"
                style={{ borderColor: "#C9F4D4" }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-colors hover:bg-[#E8FAF0]"
                  style={{ borderColor: "#C9F4D4" }}
                  title="Send Email"
                >
                  <Mail className="w-4 h-4 text-[#4A9A6A]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-colors hover:bg-[#E8FAF0]"
                  style={{ borderColor: "#C9F4D4" }}
                  title="Copy Info"
                >
                  <Copy className="w-4 h-4 text-[#4A9A6A]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-colors hover:bg-[#E8FAF0]"
                  style={{ borderColor: "#C9F4D4" }}
                  title="Add to Favorites"
                >
                  <Star className="w-4 h-4 text-[#4A9A6A]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-colors hover:bg-[#E8FAF0]"
                  style={{ borderColor: "#C9F4D4" }}
                  title="View Full Profile"
                  onClick={() => onViewProfile(candidate.id)}
                >
                  <BarChart3 className="w-4 h-4 text-[#4A9A6A]" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Latest Assessment Section */}
      {latestAssessment && (
        <div
          className="rounded-2xl p-5 mb-4"
          style={{
            backgroundColor: "rgba(232, 250, 240, 0.3)",
            border: "1px solid #E8FAF0",
          }}
        >
          <div className="text-sm font-medium text-[#4A9A6A] mb-3">Latest Assessment</div>
          <div className="font-semibold text-[#1E5A3B] mb-3">{latestAssessment.assessmentTitle}</div>

          {latestAssessment.score !== null && latestAssessment.score !== undefined && (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#4A9A6A]">Score:</span>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="text-3xl font-black"
                    style={{ color: getScoreLabel(latestAssessment.score).color }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    {latestAssessment.score}%
                  </motion.span>
                  <span
                    className="px-2 py-1 rounded-md text-xs font-semibold"
                    style={{
                      backgroundColor: `${getScoreLabel(latestAssessment.score).color}20`,
                      color: getScoreLabel(latestAssessment.score).color,
                    }}
                  >
                    {getScoreLabel(latestAssessment.score).label}
                  </span>
                </div>
              </div>

              {/* Score Bar */}
              <div className="h-2 bg-[#E8FAF0] rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: getScoreLabel(latestAssessment.score).gradient,
                    boxShadow: `0 0 12px ${getScoreLabel(latestAssessment.score).color}66`,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${latestAssessment.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Score Breakdown */}
              {latestAssessment.breakdown && (
                <div className="space-y-2 mt-3">
                  {latestAssessment.breakdown.mcq !== undefined && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[#4A9A6A]">MCQ:</span>
                        <span className="font-semibold text-[#1E5A3B]">
                          {latestAssessment.breakdown.mcq}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#E8FAF0] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #C9F4D4, #80EFC0)",
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${latestAssessment.breakdown.mcq}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                  {latestAssessment.breakdown.coding !== undefined && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[#4A9A6A]">Coding:</span>
                        <span className="font-semibold text-[#1E5A3B]">
                          {latestAssessment.breakdown.coding}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#E8FAF0] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #C9F4D4, #80EFC0)",
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${latestAssessment.breakdown.coding}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.6 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Latest Assessment Metadata */}
              <div className="flex items-center justify-between text-sm text-[#4A9A6A] mt-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Completed:{" "}
                    {latestAssessment.completedAt
                      ? new Date(latestAssessment.completedAt).toLocaleDateString()
                      : "Pending"}
                  </span>
                </div>
                {latestAssessment.timeSpent && (
                  <div className="flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    <span>
                      {Math.floor(latestAssessment.timeSpent / 60)}h {latestAssessment.timeSpent % 60}m
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Assessment History */}
      {candidate.assessments.length > 1 && (
        <div className="mb-4">
          <button
            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
            className="flex items-center justify-between w-full text-sm font-medium text-[#4A9A6A] mb-2 hover:text-[#1E5A3B] transition-colors"
          >
            <span>Assessment History ({candidate.assessments.length})</span>
            {isHistoryExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          <div className="space-y-2">
            {visibleHistory.map((assessment, idx) => (
              <motion.div
                key={assessment.assessmentId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#E8FAF0] transition-colors"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        assessment.status === "completed"
                          ? "#10B981"
                          : assessment.status === "in-progress"
                          ? "#F59E0B"
                          : "#6B7280",
                    }}
                  />
                  <span className="text-sm text-[#1E5A3B] truncate">{assessment.assessmentTitle}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  {assessment.score !== null && (
                    <span className="font-semibold text-[#1E5A3B]">{assessment.score}%</span>
                  )}
                  <span className="text-[#6B7280]">
                    {new Date(assessment.appliedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {assessment.status === "completed" && (
                    <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                  )}
                </div>
              </motion.div>
            ))}
            {!isHistoryExpanded && candidate.assessments.length > 3 && (
              <div className="text-xs text-[#4A9A6A] text-center pt-1">
                +{candidate.assessments.length - 3} more
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overall Performance Summary */}
      {candidate.overallScore > 0 && (
        <div
          className="rounded-2xl p-5 mb-4"
          style={{
            backgroundColor: "rgba(232, 250, 240, 0.3)",
            border: "1px solid #E8FAF0",
          }}
        >
          <div className="text-sm font-medium text-[#4A9A6A] mb-3">Overall Performance</div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-black text-[#1E5A3B]">Avg Score: {displayScore}%</span>
            {candidate.percentileRank <= 10 && <Trophy className="w-5 h-5 text-[#EAB308]" />}
            {candidate.percentileRank <= 25 && candidate.percentileRank > 10 && (
              <span className="text-lg">🥇</span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm mb-3">
            <span className="text-[#4A9A6A]">
              Rank: Top {100 - candidate.percentileRank}%
            </span>
            <div className="flex items-center gap-1">
              {candidate.performanceTrend === "improving" && (
                <>
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981] font-medium">Improving</span>
                </>
              )}
              {candidate.performanceTrend === "declining" && (
                <>
                  <TrendingDown className="w-4 h-4 text-[#EF4444]" />
                  <span className="text-[#EF4444] font-medium">Declining</span>
                </>
              )}
              {candidate.performanceTrend === "stable" && (
                <>
                  <Minus className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-[#6B7280] font-medium">Stable</span>
                </>
              )}
            </div>
          </div>
          {scoreDiff !== 0 && (
            <div className="text-sm">
              <span className="text-[#4A9A6A]">vs Platform Avg: </span>
              <span className="font-semibold text-[#1E5A3B]">{platformAvgScore}%</span>
              <span
                className={`ml-2 font-semibold ${scoreDiff > 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}
              >
                ({scoreDiff > 0 ? "+" : ""}
                {scoreDiff.toFixed(1)}%)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Low Performer Warning with Actions */}
      {isLowPerformer && candidate.overallScore > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-xl p-4 mb-4"
          style={{
            backgroundColor: "rgba(254, 226, 226, 0.5)",
            border: "1px solid #FCA5A5",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
            <span className="text-sm font-semibold text-[#EF4444]">
              Score below average ({candidate.overallScore}%)
            </span>
          </div>
          <div className="text-xs text-[#991B1B] mb-3">
            <div className="font-medium mb-2">Possible actions:</div>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-white border border-[#FCA5A5] hover:bg-red-50 transition-colors text-xs font-medium">
                Resend Assessment
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-[#FCA5A5] hover:bg-red-50 transition-colors text-xs font-medium">
                Send Feedback Email
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-[#FCA5A5] hover:bg-red-50 transition-colors text-xs font-medium">
                Archive Candidate
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons Row */}
      <div className="flex items-center gap-2 mt-auto">
        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => onViewProfile(candidate.id)}
          className="flex-1 py-3 px-5 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
            color: "#1E5A3B",
            boxShadow: "0 4px 12px rgba(128, 239, 192, 0.3)",
          }}
        >
          <span>View Full Profile</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-colors"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
          }}
        >
          <Mail className="w-5 h-5 text-[#4A9A6A]" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-colors"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
          }}
        >
          <Copy className="w-5 h-5 text-[#4A9A6A]" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-colors hover:bg-red-50 hover:border-red-300"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E8FAF0",
          }}
        >
          <Archive className="w-5 h-5 text-[#4A9A6A] hover:text-red-500" />
        </motion.button>
      </div>
    </motion.div>
  )
}
