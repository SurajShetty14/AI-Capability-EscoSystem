"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface TimeDistributionProps {
  data: Array<{
    range: string
    count: number
  }>
  peak: string
  average: number
}

export function TimeDistribution({ data, peak, average }: TimeDistributionProps) {
  const maxCount = Math.max(...data.map((d) => d.count))

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
        Time Distribution Analysis
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8FAF0" vertical={false} />
          <XAxis dataKey="range" stroke="#6B7280" style={{ fontSize: 12 }} />
          <YAxis stroke="#6B7280" style={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "2px solid #C9F4D4",
              borderRadius: "12px",
            }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.count === maxCount ? "#80EFC0" : "#C9F4D4"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2 text-sm" style={{ color: "#2D7A52" }}>
        <div>
          <strong>Peak:</strong> {peak} ({data.find((d) => d.count === maxCount)?.count} candidates)
        </div>
        <div>
          <strong>Average:</strong> {average} minutes
        </div>
      </div>
    </motion.div>
  )
}


