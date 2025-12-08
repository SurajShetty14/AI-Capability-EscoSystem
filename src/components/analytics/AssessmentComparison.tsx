"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface AssessmentComparisonProps {
  data: Array<{
    name: string
    score: number
    candidates: number
  }>
}

export function AssessmentComparison({ data }: AssessmentComparisonProps) {
  const getColor = (score: number) => {
    if (score >= 90) return "#10B981"
    if (score >= 80) return "#3B82F6"
    if (score >= 70) return "#F59E0B"
    return "#EF4444"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 border-2"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      <h3 className="text-xl font-bold mb-6" style={{ color: "#1E5A3B" }}>
        Assessment Performance Comparison
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#E8FAF0" horizontal={true} vertical={false} />
          <XAxis type="number" domain={[0, 100]} stroke="#6B7280" style={{ fontSize: 12 }} />
          <YAxis dataKey="name" type="category" width={120} stroke="#6B7280" style={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "2px solid #C9F4D4",
              borderRadius: "12px",
            }}
            formatter={(value: number) => [`${value}%`, "Score"]}
          />
          <Bar dataKey="score" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}


