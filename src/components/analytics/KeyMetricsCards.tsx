"use client"

import { motion } from "framer-motion"
import { BarChart3, CheckCircle2, Clock, Target, Star, Radio } from "lucide-react"
import { useEffect, useState } from "react"
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from "recharts"

interface MetricCardProps {
  icon: React.ElementType
  label: string
  value: number | string
  trend?: { value: number; isPositive: boolean }
  gradient: string[]
  sparklineData?: { value: number }[]
  isLive?: boolean
  suffix?: string
}

function MetricCard({ icon: Icon, label, value, trend, gradient, sparklineData, isLive, suffix = "" }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const numValue = typeof value === "number" ? value : parseFloat(value.toString().replace(/,/g, ""))
    const duration = 1500
    const steps = 60
    const increment = numValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numValue) {
        setDisplayValue(numValue)
        clearInterval(timer)
        setIsAnimating(false)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const formatValue = (val: number | string) => {
    if (typeof val === "string") return val
    if (val >= 1000) return val.toLocaleString()
    return val.toFixed(val % 1 !== 0 ? 1 : 0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white border-2 border-[#E8FAF0] rounded-2xl p-6 hover:border-[#C9F4D4] transition-all duration-300 cursor-pointer overflow-visible"
      style={{
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.12)",
      }}
    >
      {/* Background Orb */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-5 blur-3xl rounded-full"
        style={{
          background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        }}
      />

      {/* Icon */}
      <motion.div
        className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
        style={{
          background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
          boxShadow: `0 8px 24px ${gradient[0]}4D`,
        }}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>

      {/* Label */}
      <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">{label}</div>

      {/* Number */}
      <div className="text-5xl font-black text-[#1E5A3B] leading-none mb-3" style={{ textShadow: "0 2px 4px rgba(30, 90, 59, 0.1)" }}>
        {isLive && isAnimating ? (
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {formatValue(displayValue)}
          </motion.span>
        ) : (
          formatValue(displayValue)
        )}
        {suffix}
        {isLive && (
          <motion.span
            className="ml-2 inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#10B981" }}
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Trend */}
      {trend && (
        <div className="flex items-center gap-2 mb-3">
          <span style={{ color: trend.isPositive ? "#10B981" : "#EF4444" }}>
            {trend.isPositive ? "↗" : "↘"}
          </span>
          <span className="text-sm font-semibold" style={{ color: trend.isPositive ? "#10B981" : "#EF4444" }}>
            {trend.isPositive ? "+" : ""}{trend.value}% vs last month
          </span>
        </div>
      )}

      {/* Mini Sparkline */}
      {sparklineData && (
        <div className="mt-3 h-6">
          <ResponsiveContainer width="100%" height={24}>
            <AreaChart data={sparklineData}>
              <defs>
                <linearGradient id={`sparkline-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gradient[0]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={gradient[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={gradient[0]}
                strokeWidth={2}
                fill={`url(#sparkline-${label})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  )
}

interface KeyMetricsCardsProps {
  metrics: {
    totalTests: number
    completionRate: number
    avgTime: number
    passRate: number
    avgScore: number
    activeNow: number
  }
}

export function KeyMetricsCards({ metrics }: KeyMetricsCardsProps) {
  const sparklineData = [
    { value: 1200 },
    { value: 1220 },
    { value: 1210 },
    { value: 1230 },
    { value: 1240 },
    { value: 1247 },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      <MetricCard
        icon={BarChart3}
        label="Total Tests"
        value={metrics.totalTests}
        trend={{ value: 12, isPositive: true }}
        gradient={["#3B82F6", "#60A5FA"]}
        sparklineData={sparklineData}
      />
      <MetricCard
        icon={CheckCircle2}
        label="Completion Rate"
        value={metrics.completionRate}
        suffix="%"
        trend={{ value: 5, isPositive: true }}
        gradient={["#10B981", "#34D399"]}
      />
      <MetricCard
        icon={Clock}
        label="Avg Time"
        value={metrics.avgTime}
        suffix=" min"
        trend={{ value: -3, isPositive: false }}
        gradient={["#8B5CF6", "#A78BFA"]}
      />
      <MetricCard
        icon={Target}
        label="Pass Rate"
        value={metrics.passRate}
        suffix="%"
        trend={{ value: 4, isPositive: true }}
        gradient={["#F59E0B", "#FBBF24"]}
      />
      <MetricCard
        icon={Star}
        label="Avg Score"
        value={metrics.avgScore}
        suffix="%"
        trend={{ value: 2.3, isPositive: true }}
        gradient={["#EF4444", "#F87171"]}
      />
      <MetricCard
        icon={Radio}
        label="Active Now"
        value={metrics.activeNow}
        gradient={["#06B6D4", "#22D3EE"]}
        isLive={true}
      />
    </div>
  )
}

