"use client"

import { motion } from "framer-motion"
import { RefreshCw, Download, Calendar, Filter, Settings } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface AnalyticsHeaderProps {
  dateRange: string
  onDateRangeChange: (range: string) => void
  onRefresh: () => void
  onExport: (format: string) => void
  lastUpdated?: string
}

export function AnalyticsHeader({
  dateRange,
  onDateRangeChange,
  onRefresh,
  onExport,
  lastUpdated = "2 min ago",
}: AnalyticsHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const exportMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false)
      }
    }

    if (showExportMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showExportMenu])

  const handleRefresh = () => {
    setIsRefreshing(true)
    onRefresh()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const dateRangeOptions = [
    "Last 7 days",
    "Last 30 days",
    "Last 3 months",
    "Last 6 months",
    "Last year",
    "Custom range",
  ]

  return (
    <div className="mb-8">
      {/* Title Section */}
      <div className="mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black mb-2"
          style={{ color: "#1E5A3B", letterSpacing: "-0.03em" }}
        >
          Analytics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg"
          style={{ color: "#4A9A6A" }}
        >
          Comprehensive insights and performance metrics
        </motion.p>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Date Range Selector */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="h-12 px-4 pr-10 rounded-xl border-2 font-medium text-sm appearance-none cursor-pointer transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              {dateRangeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: "#4A9A6A" }} />
          </div>

          {/* Assessment Filter */}
          <div className="relative">
            <select
              className="h-12 px-4 pr-10 rounded-xl border-2 font-medium text-sm appearance-none cursor-pointer transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <option>All Assessments</option>
              <option>Full Stack Assessment</option>
              <option>DSA Challenge</option>
              <option>Cloud Architecture</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: "#4A9A6A" }} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="h-12 px-4 rounded-xl font-medium text-sm flex items-center gap-2 border-2 transition-all"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
            title={`Last updated ${lastUpdated}`}
          >
            <motion.div
              animate={{ rotate: isRefreshing ? 360 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.div>
            <span className="hidden sm:inline">Refresh</span>
          </motion.button>

          {/* Export Button */}
          <div className="relative" ref={exportMenuRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="h-12 px-6 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all"
              style={{
                background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
                color: "#1E5A3B",
                boxShadow: "0 4px 12px rgba(128, 239, 192, 0.3)",
              }}
            >
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </motion.button>

            {/* Export Menu */}
            {showExportMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border-2 shadow-lg z-10"
                style={{ borderColor: "#E8FAF0" }}
              >
                <button
                  onClick={() => {
                    onExport("pdf")
                    setShowExportMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-[#E8FAF0] transition-colors rounded-t-xl"
                  style={{ color: "#1E5A3B" }}
                >
                  📄 PDF Report
                </button>
                <button
                  onClick={() => {
                    onExport("excel")
                    setShowExportMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-[#E8FAF0] transition-colors"
                  style={{ color: "#1E5A3B" }}
                >
                  📊 Excel
                </button>
                <button
                  onClick={() => {
                    onExport("csv")
                    setShowExportMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-[#E8FAF0] transition-colors"
                  style={{ color: "#1E5A3B" }}
                >
                  📋 CSV
                </button>
                <button
                  onClick={() => {
                    onExport("png")
                    setShowExportMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-[#E8FAF0] transition-colors rounded-b-xl"
                  style={{ color: "#1E5A3B" }}
                >
                  🖼️ PNG (Charts)
                </button>
              </motion.div>
            )}
          </div>

          {/* Settings Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-12 w-12 rounded-xl flex items-center justify-center border-2 transition-all"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

