"use client"

import { motion } from "framer-motion"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface CandidateDistributionProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
}

const COLORS = {
  Excellent: "#10B981",
  Good: "#3B82F6",
  Average: "#F59E0B",
  Poor: "#EF4444",
}

export function CandidateDistribution({ data }: CandidateDistributionProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 border-2 h-full"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2" style={{ color: "#1E5A3B" }}>
          Candidate Distribution
        </h3>
        <p className="text-sm" style={{ color: "#4A9A6A" }}>
          Performance level breakdown
        </p>
      </div>

      {/* Chart */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#FFFFFF"
                  strokeWidth={3}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #C9F4D4",
                borderRadius: "12px",
                padding: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-3xl font-black mb-1" style={{ color: "#1E5A3B" }}>
              {total.toLocaleString()}
            </div>
            <div className="text-sm font-medium" style={{ color: "#6B7280" }}>
              Total
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1)
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-[#E8FAF0] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <div className="font-semibold text-sm" style={{ color: "#1E5A3B" }}>
                    {item.name} ({item.name === "Excellent" ? "90-100%" : item.name === "Good" ? "70-89%" : item.name === "Average" ? "50-69%" : "<50%"})
                  </div>
                  <div className="text-xs" style={{ color: "#6B7280" }}>
                    {item.value.toLocaleString()} candidates ({percentage}%)
                  </div>
                </div>
              </div>
              <div className="text-lg font-bold" style={{ color: item.color }}>
                {percentage}%
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}


