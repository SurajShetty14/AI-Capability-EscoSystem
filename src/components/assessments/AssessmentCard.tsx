"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MoreVertical, Eye, Users, TrendingUp, Star, Calendar, ArrowRight } from "lucide-react"
import { Assessment } from "@/lib/types"

interface AssessmentCardProps {
  assessment: Assessment
  index: number
  isFeatured?: boolean
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
  completed: {
    label: "Completed",
    color: "#6B7280",
    bg: "rgba(107, 114, 128, 0.1)",
    pulse: false,
  },
  archived: {
    label: "Archived",
    color: "#9CA3AF",
    bg: "rgba(156, 163, 175, 0.1)",
    pulse: false,
  },
  paused: {
    label: "Paused",
    color: "#6B7280",
    bg: "rgba(107, 114, 128, 0.1)",
    pulse: false,
  },
}

export function AssessmentCard({ assessment, index, isFeatured = false }: AssessmentCardProps) {
  const status = statusConfig[assessment.status] || statusConfig.draft
  const progress = assessment.candidateCount
    ? Math.round(
        ((assessment.candidateCount - (assessment.inProgressCount || 0)) /
          assessment.candidateCount) *
          100
      )
    : 0

  const isHighPerformer = (assessment.averageScore || 0) > 85
  const isLowActivity = assessment.candidateCount === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative bg-white rounded-3xl p-6 border-2 transition-all duration-400 cursor-pointer group ${
        isFeatured ? "md:col-span-2" : ""
      } ${assessment.status === "archived" ? "opacity-70 grayscale" : ""}`}
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 16px rgba(201, 244, 212, 0.12)",
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

      {/* High performer gold accent */}
      {isHighPerformer && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
          style={{ backgroundColor: "#F59E0B" }}
        />
      )}

      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        {/* Status Badge */}
        <motion.div
          className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide flex items-center gap-2"
          style={{
            backgroundColor: status.bg,
            color: status.color,
          }}
          animate={
            status.pulse
              ? {
                  boxShadow: [
                    `0 0 0 0 rgba(16, 185, 129, 0.7)`,
                    `0 0 0 8px rgba(16, 185, 129, 0)`,
                    `0 0 0 0 rgba(16, 185, 129, 0)`,
                  ],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: status.color }}
          />
          {status.label}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[#E8FAF0]"
          >
            <Eye className="w-4 h-4 text-[#4A9A6A]" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[#E8FAF0]"
          >
            <MoreVertical className="w-4 h-4 text-[#4A9A6A]" />
          </motion.button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-[#1E5A3B] mb-3 line-clamp-2 group-hover:underline">
        {assessment.name}
      </h3>

      {/* Created Date */}
      <div className="flex items-center gap-2 text-sm text-[#4A9A6A] mb-6">
        <Calendar className="w-4 h-4" />
        <span>Created on {new Date(assessment.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Metrics Section */}
      <div
        className="rounded-2xl p-5 mb-5 grid grid-cols-3 gap-4"
        style={{
          backgroundColor: "rgba(232, 250, 240, 0.3)",
          border: "1px solid #E8FAF0",
        }}
      >
        {/* Employees */}
        <div className="text-center">
          <Users className="w-6 h-6 mx-auto mb-2 text-[#80EFC0]" />
          <motion.div
            className="text-3xl font-black text-[#1E5A3B] mb-1"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            {assessment.candidateCount || 0}
          </motion.div>
          <div className="text-xs uppercase tracking-wide text-[#4A9A6A]">Employees</div>
        </div>

        {/* In Progress */}
        <div className="text-center border-x border-[#E8FAF0]">
          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-[#80EFC0]" />
          <motion.div
            className="text-3xl font-black text-[#1E5A3B] mb-1"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          >
            {assessment.inProgressCount || 0}
          </motion.div>
          <div className="text-xs uppercase tracking-wide text-[#4A9A6A]">In Progress</div>
        </div>

        {/* Average Score */}
        <div className="text-center">
          <Star className="w-6 h-6 mx-auto mb-2 text-[#80EFC0]" />
          <motion.div
            className="text-3xl font-black text-[#1E5A3B] mb-1 flex items-center justify-center gap-1"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
          >
            {assessment.averageScore ? `${assessment.averageScore}%` : "N/A"}
            {isHighPerformer && <span className="text-lg">🏆</span>}
          </motion.div>
          <div className="text-xs uppercase tracking-wide text-[#4A9A6A]">Avg Score</div>
        </div>
      </div>

      {/* Progress Bar */}
      {assessment.status !== "draft" && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#4A9A6A]">Progress</span>
            <span className="text-sm font-bold text-[#1E5A3B]">{progress}%</span>
          </div>
          <div className="h-2 bg-[#E8FAF0] rounded-full overflow-hidden relative">
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: "linear-gradient(90deg, #C9F4D4 0%, #80EFC0 100%)",
                boxShadow: "0 0 12px rgba(128, 239, 192, 0.5)",
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: index * 0.1 + 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* Low Activity Warning */}
      {isLowActivity && (
        <div
          className="mb-4 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2"
          style={{
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            color: "#F59E0B",
          }}
        >
          <span>⚠️</span>
          <span>No activity in 30 days</span>
        </div>
      )}

      {/* View Details Link */}
      <Link href={`/dashboard/assessments/${assessment.id}`}>
        <motion.div
          className="flex items-center gap-2 text-[#80EFC0] font-semibold group/link"
          whileHover={{ x: 4 }}
        >
          <span>{assessment.status === "draft" ? "Complete Setup" : "View Details"}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </motion.div>
      </Link>

      {/* Hover Shadow Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: "0 16px 48px rgba(201, 244, 212, 0.3)",
        }}
      />
    </motion.div>
  )
}

