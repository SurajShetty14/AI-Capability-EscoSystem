"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Users, TrendingUp, CheckCircle2, Award, Clock, Plus, Mail, Download } from "lucide-react"
import { StatCard } from "@/components/assessments/StatCard"

interface CandidatesHeaderProps {
  stats: {
    total: number
    active: number
    activeLive?: number
    completed: number
    avgScore: number
    avgTime: number
    topPerformers: number
  }
  selectedCount: number
  onEmailSelected: () => void
  onExport: () => void
}

export function CandidatesHeader({
  stats,
  selectedCount,
  onEmailSelected,
  onExport,
}: CandidatesHeaderProps) {
  return (
    <div className="relative rounded-b-[32px] py-12 px-8 mb-8" style={{ overflow: 'visible' }}>
      {/* Background gradient */}
      <div
        className="absolute inset-0 rounded-b-[32px]"
        style={{
          background: "linear-gradient(135deg, #E8FAF0 0%, #F0FDF4 50%, #FFFFFF 100%)",
          overflow: 'visible',
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: "#3B82F6" }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: "#60A5FA" }}
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #1E5A3B 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Top section with title and action buttons */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          {/* Left: Icon + Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4 mb-6 md:mb-0"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-3 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] shadow-lg flex items-center justify-center"
              style={{
                boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
              }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>

            {/* Title + Subtitle */}
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl font-black text-[#1E5A3B] leading-tight mb-2"
                style={{ letterSpacing: "-0.03em" }}
              >
                Candidates
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-[#4A9A6A]"
              >
                Manage and track candidate progress
              </motion.p>
            </div>
          </motion.div>

          {/* Right: Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link href="/candidates/add">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl text-white font-semibold text-[15px] flex items-center gap-2 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #1E5A3B 0%, #2D7A52 100%)",
                  boxShadow: "0 4px 16px rgba(30, 90, 59, 0.4)",
                }}
              >
                <Plus className="w-5 h-5" />
                Add Candidate
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEmailSelected}
              disabled={selectedCount === 0}
              className="px-6 py-3 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Mail className="w-5 h-5" />
              Email Selected
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExport}
              className="px-6 py-3 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2 transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Download className="w-5 h-5" />
              Export
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Grid - 5 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8 relative z-20">
          <StatCard
            value={stats.total}
            label="Total Candidates"
            icon={<Users />}
            color="blue"
            delay={0}
          />
          <StatCard
            value={stats.active}
            label="Active Now"
            icon={<TrendingUp />}
            color="green"
            delay={0}
            badge={stats.activeLive ? `🟢 ${stats.activeLive} live now` : undefined}
            pulse={true}
          />
          <StatCard
            value={stats.completed}
            label="Completed Tests"
            icon={<CheckCircle2 />}
            color="gray"
            delay={0}
          />
          <StatCard
            value={Math.round(stats.avgScore * 10) / 10}
            label="Average Score"
            icon={<Award />}
            color="amber"
            delay={0}
            trend={{ value: 2.3, isPositive: true, label: " vs last month" }}
          />
          <StatCard
            value={stats.topPerformers}
            label="Top Performers"
            icon={<Award />}
            color="gold"
            delay={0}
            onClick={() => {
              // Filter to show only top performers
              console.log("Filter top performers")
            }}
          />
        </div>
      </div>
    </div>
  )
}

