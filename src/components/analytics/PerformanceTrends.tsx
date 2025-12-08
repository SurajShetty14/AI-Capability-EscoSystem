"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MoreVertical, Download, Maximize2 } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

interface PerformanceTrendsProps {
  data: Array<{
    date: string
    completionRate: number
    avgScore: number
    passRate: number
    activeCandidates?: number
    timePerAssessment?: number
  }>
}

export function PerformanceTrends({ data }: PerformanceTrendsProps) {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("daily")
  const [visibleMetrics, setVisibleMetrics] = useState({
    completionRate: true,
    avgScore: true,
    passRate: true,
    activeCandidates: false,
    timePerAssessment: false,
  })

  const toggleMetric = (metric: string) => {
    setVisibleMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric as keyof typeof prev],
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 mb-8"
      style={{
        borderColor: "#E8FAF0",
        boxShadow: "0 4px 24px rgba(201, 244, 212, 0.12)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: "#1E5A3B" }}>
            Performance Trends
          </h3>
          <p className="text-[15px]" style={{ color: "#4A9A6A" }}>
            Last 30 days performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#E8FAF0] transition-colors">
            <MoreVertical className="w-5 h-5" style={{ color: "#4A9A6A" }} />
          </button>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#E8FAF0] transition-colors">
            <Download className="w-5 h-5" style={{ color: "#4A9A6A" }} />
          </button>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#E8FAF0] transition-colors">
            <Maximize2 className="w-5 h-5" style={{ color: "#4A9A6A" }} />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        {/* Time Range Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-gray-100 gap-1">
          {(["daily", "weekly", "monthly"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                timeRange === range
                  ? "bg-white text-[#1E5A3B] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Metrics Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium" style={{ color: "#6B7280" }}>
            Metrics:
          </span>
          {Object.entries(visibleMetrics).map(([key, visible]) => (
            <button
              key={key}
              onClick={() => toggleMetric(key)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                visible
                  ? "bg-[#E8FAF0] text-[#1E5A3B]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {key.replace(/([A-Z])/g, " $1").trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="passGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8FAF0" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              style={{ fontSize: 13, fontWeight: 600 }}
              tickLine={false}
            />
            <YAxis
              stroke="#6B7280"
              style={{ fontSize: 13, fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #C9F4D4",
                borderRadius: "12px",
                padding: "12px",
                boxShadow: "0 8px 24px rgba(201, 244, 212, 0.3)",
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="line"
            />
            {visibleMetrics.completionRate && (
              <Area
                type="monotone"
                dataKey="completionRate"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#completionGradient)"
                dot={{ r: 6, fill: "#3B82F6", strokeWidth: 2, stroke: "#FFFFFF" }}
                activeDot={{ r: 8, fill: "#3B82F6" }}
                name="Completion Rate %"
              />
            )}
            {visibleMetrics.avgScore && (
              <Area
                type="monotone"
                dataKey="avgScore"
                stroke="#10B981"
                strokeWidth={3}
                fill="url(#scoreGradient)"
                dot={{ r: 6, fill: "#10B981", strokeWidth: 2, stroke: "#FFFFFF" }}
                activeDot={{ r: 8, fill: "#10B981" }}
                name="Avg Score %"
              />
            )}
            {visibleMetrics.passRate && (
              <Area
                type="monotone"
                dataKey="passRate"
                stroke="#F59E0B"
                strokeWidth={3}
                fill="url(#passGradient)"
                dot={{ r: 6, fill: "#F59E0B", strokeWidth: 2, stroke: "#FFFFFF" }}
                activeDot={{ r: 8, fill: "#F59E0B" }}
                name="Pass Rate %"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}


