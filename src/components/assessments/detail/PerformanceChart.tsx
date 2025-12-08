"use client"

import { motion } from "framer-motion"

interface PerformanceChartProps {
  distribution: {
    excellent: number
    good: number
    average: number
    poor: number
  }
}

export function PerformanceChart({ distribution }: PerformanceChartProps) {
  const total = distribution.excellent + distribution.good + distribution.average + distribution.poor
  const colors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"]
  const labels = ["Excellent", "Good", "Average", "Poor"]
  const values = [
    distribution.excellent,
    distribution.good,
    distribution.average,
    distribution.poor,
  ]

  const percentages = values.map((v) => (v / total) * 100)
  const circumference = 2 * Math.PI * 80 // radius = 80
  let currentOffset = 0

  return (
    <div className="flex items-center justify-center relative">
      <svg width="200" height="200" className="transform -rotate-90">
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#E8FAF0"
          strokeWidth="20"
        />
        {percentages.map((percentage, idx) => {
          const strokeDasharray = (percentage / 100) * circumference
          const strokeDashoffset = currentOffset
          currentOffset -= strokeDasharray
          return (
            <motion.circle
              key={idx}
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={colors[idx]}
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, delay: idx * 0.2, ease: "easeOut" }}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-black" style={{ color: "#1E5A3B" }}>
            {total}
          </div>
          <div className="text-xs font-medium" style={{ color: "#4A9A6A" }}>
            Total
          </div>
        </div>
      </div>
    </div>
  )
}

