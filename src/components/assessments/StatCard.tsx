"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface StatCardProps {
  value: number
  label: string
  trend?: {
    value: number
    isPositive: boolean
    label?: string
  }
  badge?: string
  pulse?: boolean
  icon?: React.ReactNode
  color?: "mint" | "green" | "amber" | "blue" | "gold" | "gray"
  delay?: number
  onClick?: () => void
}

const colorMap = {
  mint: {
    accent: "#80EFC0",
    bg: "rgba(128, 239, 192, 0.1)",
    border: "rgba(128, 239, 192, 0.3)",
  },
  green: {
    accent: "#10B981",
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.3)",
  },
  amber: {
    accent: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.3)",
  },
  blue: {
    accent: "#3B82F6",
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.3)",
  },
  gold: {
    accent: "#EAB308",
    bg: "rgba(234, 179, 8, 0.1)",
    border: "rgba(234, 179, 8, 0.3)",
  },
  gray: {
    accent: "#6B7280",
    bg: "rgba(107, 114, 128, 0.1)",
    border: "rgba(107, 114, 128, 0.3)",
  },
}

export function StatCard({
  value,
  label,
  trend,
  badge,
  pulse,
  icon,
  color = "mint",
  delay = 0,
  onClick,
}: StatCardProps) {
  const colors = colorMap[color]
  const isDecimal = value % 1 !== 0
  const isScore = label.toLowerCase().includes("score")
  
  // Always show the actual value - no animation needed for visibility
  const displayValue = value
  const hasAnimated = true

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="relative bg-white/80 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg z-10"
      style={{
        borderColor: colors.border,
        cursor: onClick ? "pointer" : "default",
        minHeight: '180px',
      }}
      animate={
        pulse
          ? {
              boxShadow: [
                `0 0 0 0 ${colors.accent}40`,
                `0 0 0 8px ${colors.accent}00`,
                `0 0 0 0 ${colors.accent}00`,
              ],
            }
          : {}
      }
      transition={
        pulse
          ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }
          : {}
      }
    >
      {/* Left accent border - 4px for candidates */}
      <div
        className="absolute left-0 top-0 bottom-0 rounded-l-2xl"
        style={{ backgroundColor: colors.accent, width: "4px" }}
      />

      {/* Icon */}
      {icon && (
        <div className="mb-4 text-2xl" style={{ color: colors.accent }}>
          {icon}
        </div>
      )}

      {/* Value */}
      <motion.div
        className="text-5xl font-black mb-2"
        style={{ color: "#1E5A3B" }}
        animate={{ scale: hasAnimated ? 1 : [1, 1.05, 1] }}
        transition={{ duration: 0.3 }}
      >
        {isDecimal
          ? (hasAnimated ? value.toFixed(1) : Math.max(0, displayValue).toFixed(1))
          : hasAnimated
          ? value.toLocaleString()
          : Math.max(0, Math.floor(displayValue)).toLocaleString()}
        {isScore && "%"}
      </motion.div>

      {/* Label */}
      <div className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: "#4A9A6A" }}>
        {label}
      </div>

      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3 }}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium mt-2"
          style={{
            backgroundColor: colors.bg,
            color: colors.accent,
          }}
        >
          {badge}
        </motion.div>
      )}

      {/* Trend */}
      {trend && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium mt-2"
          style={{
            backgroundColor: trend.isPositive ? colors.bg : "rgba(239, 68, 68, 0.1)",
            color: trend.isPositive ? colors.accent : "#EF4444",
          }}
        >
          <span>{trend.isPositive ? "↗" : "↘"}</span>
          <span>
            {trend.value > 0 ? "+" : ""}
            {trend.value}
            {trend.label || " this week"}
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

