"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FileText, Sparkles, TrendingUp, Users, ClipboardList } from "lucide-react"
import { StatCard } from "./StatCard"

interface AssessmentsHeaderProps {
  stats: {
    total: number
    active: number
    drafts: number
    candidates: number
    overallScore?: number
  }
}

export function AssessmentsHeader({ stats }: AssessmentsHeaderProps) {
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
        style={{ backgroundColor: "#80EFC0" }}
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
        style={{ backgroundColor: "#C9F4D4" }}
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
        {/* Top section with title and create button */}
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
              className="p-3 rounded-2xl bg-gradient-to-br from-[#C9F4D4] to-[#80EFC0] shadow-lg flex items-center justify-center"
              style={{
                boxShadow: "0 8px 24px rgba(128, 239, 192, 0.4)",
              }}
            >
              <FileText className="w-6 h-6 text-[#1E5A3B]" />
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
                Assessments
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-[#4A9A6A]"
              >
                Manage and track all your assessments
              </motion.p>
            </div>
          </motion.div>

          {/* Right: Create Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/assessments/create">
              <motion.button
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 rounded-2xl text-white font-bold text-base flex items-center gap-2 shadow-lg overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #1E5A3B 0%, #2D7A52 100%)",
                  boxShadow: "0 8px 32px rgba(30, 90, 59, 0.4)",
                }}
              >
                {/* Pulse glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, #1E5A3B 0%, #2D7A52 100%)",
                    opacity: 0.5,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Sparkles className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Create Assessment</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8 relative z-20">
          <StatCard
            value={stats.total}
            label="Total Assessments"
            trend={{ value: 3, isPositive: true }}
            icon={<FileText />}
            color="mint"
            delay={0}
          />
          <StatCard
            value={stats.active}
            label="Active Now"
            icon={<TrendingUp />}
            color="green"
            delay={0}
          />
          <StatCard
            value={stats.drafts}
            label="Drafts"
            icon={<ClipboardList />}
            color="amber"
            delay={0}
          />
          <StatCard
            value={stats.candidates}
            label="Total Participants"
            icon={<Users />}
            color="blue"
            delay={0}
          />
          <StatCard
            value={stats.overallScore !== undefined ? Math.round(stats.overallScore * 10) / 10 : 0}
            label="Overall Score"
            icon={<TrendingUp />}
            color="mint"
            delay={0}
            trend={{ value: 2.1, isPositive: true, label: " vs last month" }}
          />
        </div>
      </div>
    </div>
  )
}

