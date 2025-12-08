"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Edit, MoreVertical, Copy, Mail, Share2, Download, Archive, Trash2 } from "lucide-react"
import { useState } from "react"
import { AssessmentDetail } from "@/lib/assessment-detail-types"
import Link from "next/link"

type TabType = "overview" | "questions" | "candidates" | "analytics" | "settings" | "monitoring"

interface AssessmentHeaderProps {
  assessment: AssessmentDetail
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  onBack: () => void
}

const statusConfig = {
  active: {
    label: "Active",
    color: "#10B981",
    bg: "rgba(16, 185, 129, 0.1)",
    pulse: true,
  },
  draft: {
    label: "Draft",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.1)",
    pulse: false,
  },
  paused: {
    label: "Paused",
    color: "#6B7280",
    bg: "rgba(107, 114, 128, 0.1)",
    pulse: false,
  },
  archived: {
    label: "Archived",
    color: "#E5E7EB",
    bg: "rgba(229, 231, 235, 0.1)",
    pulse: false,
  },
}

export function AssessmentHeader({ assessment, activeTab, onTabChange, onBack }: AssessmentHeaderProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const status = statusConfig[assessment.status]

  const tabs: { id: TabType; label: string; badge?: number }[] = [
    { id: "overview", label: "Overview" },
    { id: "questions", label: "Questions", badge: assessment.questions.length },
    { id: "candidates", label: "Candidates", badge: assessment.metrics.totalCandidates },
    { id: "analytics", label: "Analytics" },
    ...(assessment.config.proctoring.enabled && assessment.metrics.inProgress > 0
      ? [{ id: "monitoring" as TabType, label: "Live Monitoring", badge: assessment.metrics.inProgress }]
      : []),
    { id: "settings", label: "Settings" },
  ]

  return (
    <div
      className="rounded-b-[24px] py-8 px-8 mb-8"
      style={{
        background: "linear-gradient(135deg, #E8FAF0 0%, #FFFFFF 100%)",
        boxShadow: "0 4px 16px rgba(201, 244, 212, 0.15)",
      }}
    >
      {/* Top Row: Back + Actions */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-[15px] font-medium transition-colors"
          style={{ color: "#4A9A6A" }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Assessments</span>
        </motion.button>

        <div className="flex items-center gap-3">
          <Link href={`/dashboard/assessments/${assessment.id}/edit`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2 transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Edit className="w-4 h-4" />
              Edit
            </motion.button>
          </Link>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E8FAF0",
                color: "#1E5A3B",
              }}
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>

            {showMoreMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 bg-white rounded-xl p-2 shadow-xl border-2 min-w-[200px] z-10"
                style={{ borderColor: "#C9F4D4" }}
              >
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#E8FAF0] transition-colors flex items-center gap-2 text-sm">
                  <Copy className="w-4 h-4" />
                  Duplicate Assessment
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#E8FAF0] transition-colors flex items-center gap-2 text-sm">
                  <Share2 className="w-4 h-4" />
                  Share Link
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#E8FAF0] transition-colors flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  Export Results
                </button>
                <div className="h-px bg-[#E8FAF0] my-1" />
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#E8FAF0] transition-colors flex items-center gap-2 text-sm">
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2 text-sm text-red-600">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Title + Status */}
      <div className="flex items-start gap-4 mb-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
          style={{
            background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
            boxShadow: "0 4px 16px rgba(128, 239, 192, 0.3)",
          }}
        >
          📝
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h1
              className="text-5xl font-black leading-tight"
              style={{
                color: "#1E5A3B",
                letterSpacing: "-0.03em",
              }}
            >
              {assessment.title}
            </h1>
            <motion.div
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide"
              style={{
                backgroundColor: status.bg,
                color: status.color,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              animate={
                status.pulse
                  ? {
                      boxShadow: [
                        `0 2px 8px ${status.color}40`,
                        `0 2px 16px ${status.color}60`,
                        `0 2px 8px ${status.color}40`,
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {status.label}
            </motion.div>
          </div>
          <div className="flex items-center gap-3 text-sm" style={{ color: "#4A9A6A" }}>
            <span>Created by {assessment.createdBy.name}</span>
            <span>•</span>
            <span>{new Date(assessment.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>Last updated {assessment.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 my-6">
        <StatCard
          value={assessment.metrics.totalCandidates}
          label="Candidates"
          delay={0}
        />
        <StatCard
          value={assessment.metrics.inProgress}
          label="In Progress"
          delay={0.1}
          badge={assessment.metrics.inProgressLive ? `🟢 ${assessment.metrics.inProgressLive} live now` : undefined}
          pulse={true}
        />
        <StatCard
          value={assessment.metrics.completed}
          label="Completed"
          delay={0.2}
        />
        <StatCard
          value={assessment.metrics.averageScore}
          label="Average Score"
          delay={0.3}
          isPercentage={true}
          trend={{ value: 5.2, isPositive: true, label: " vs last week" }}
        />
        <StatCard
          value={assessment.metrics.averageTime}
          label="Average Time"
          delay={0.4}
          isTime={true}
        />
      </div>

      {/* Tabs */}
      <div className="bg-white border-b-2" style={{ borderColor: "#E8FAF0" }}>
        <div className="flex items-center gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-4 font-semibold text-base transition-all relative ${
                activeTab === tab.id
                  ? "text-[#1E5A3B]"
                  : "text-[#6B7280] hover:text-[#1E5A3B] hover:bg-[#E8FAF0]"
              }`}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className="ml-2 px-2 py-0.5 rounded-md text-xs font-bold"
                  style={{
                    backgroundColor: "#E8FAF0",
                    color: "#1E5A3B",
                  }}
                >
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: "#80EFC0" }}
                  layoutId="activeTab"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  value: number
  label: string
  delay?: number
  badge?: string
  pulse?: boolean
  isPercentage?: boolean
  isTime?: boolean
  trend?: {
    value: number
    isPositive: boolean
    label?: string
  }
}

function StatCard({ value, label, delay = 0, badge, pulse, isPercentage, isTime, trend }: StatCardProps) {
  const formatValue = () => {
    if (isPercentage) return `${value.toFixed(1)}%`
    if (isTime) {
      const hours = Math.floor(value / 60)
      const minutes = value % 60
      return `${hours}h ${minutes}m`
    }
    return value.toLocaleString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={
        pulse
          ? {
              opacity: 1,
              y: 0,
              boxShadow: [
                `0 0 0 0 rgba(16, 185, 129, 0.4)`,
                `0 0 0 8px rgba(16, 185, 129, 0)`,
                `0 0 0 0 rgba(16, 185, 129, 0)`,
              ],
            }
          : { opacity: 1, y: 0 }
      }
      transition={
        pulse
          ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              opacity: { duration: 0.5, delay },
              y: { duration: 0.5, delay },
            }
          : { duration: 0.5, delay }
      }
      whileHover={{ y: -4 }}
      className="bg-white/80 backdrop-blur-lg border rounded-2xl p-5 text-center transition-all hover:shadow-lg"
      style={{
        borderColor: "rgba(201, 244, 212, 0.3)",
      }}
    >
      <div className="text-4xl font-black mb-2" style={{ color: "#1E5A3B" }}>
        {formatValue()}
      </div>
      <div className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "#4A9A6A" }}>
        {label}
      </div>
      {badge && (
        <div
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium mt-2"
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            color: "#10B981",
          }}
        >
          {badge}
        </div>
      )}
      {trend && (
        <div
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium mt-2"
          style={{
            backgroundColor: trend.isPositive ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
            color: trend.isPositive ? "#10B981" : "#EF4444",
          }}
        >
          <span>{trend.isPositive ? "↗" : "↘"}</span>
          <span>
            {trend.value > 0 ? "+" : ""}
            {trend.value}
            {trend.label || ""}
          </span>
        </div>
      )}
    </motion.div>
  )
}

