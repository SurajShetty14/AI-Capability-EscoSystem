"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Filter, ChevronDown, Check, FileText } from "lucide-react"
import { ViewToggle } from "./ViewToggle"

type ViewMode = "cards" | "list" | "board"

interface CandidatesSearchAndFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
  filters: {
    status: string[]
    scoreRange: string | null
    dateRange: string | null
    assessmentType: string[]
  }
  onFiltersChange: (filters: any) => void
}

const statusOptions = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
]

const scoreRangeOptions = [
  { value: "all", label: "All Scores" },
  { value: "90-100", label: "Excellent (90-100%)" },
  { value: "70-89", label: "Good (70-89%)" },
  { value: "50-69", label: "Average (50-69%)" },
  { value: "0-49", label: "Below Average (<50%)" },
]

const dateOptions = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "3m", label: "Last 3 months" },
]

const assessmentTypeOptions = [
  { value: "all", label: "All Types", count: null },
  { value: "assessment", label: "Assessment Competency", count: 23 },
  { value: "dsa", label: "DSA Coding", count: 12 },
  { value: "cloud", label: "Cloud Labs", count: 8 },
  { value: "ai", label: "AI/ML Challenges", count: 15 },
]

export function CandidatesSearchAndFilters({
  searchQuery,
  onSearchChange,
  currentView,
  onViewChange,
  filters,
  onFiltersChange,
}: CandidatesSearchAndFiltersProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const activeFiltersCount =
    filters.status.filter((s) => s !== "all").length +
    (filters.scoreRange ? 1 : 0) +
    (filters.dateRange ? 1 : 0) +
    filters.assessmentType.filter((t) => t !== "all").length

  const handleStatusToggle = (value: string) => {
    if (value === "all") {
      onFiltersChange({ ...filters, status: ["all"] })
    } else {
      const newStatus = filters.status.includes(value)
        ? filters.status.filter((s) => s !== value)
        : [...filters.status.filter((s) => s !== "all"), value]
      onFiltersChange({ ...filters, status: newStatus.length ? newStatus : ["all"] })
    }
  }

  const handleScoreRangeSelect = (value: string) => {
    onFiltersChange({ ...filters, scoreRange: value === "all" ? null : value })
    setOpenDropdown(null)
  }

  const handleDateSelect = (value: string) => {
    onFiltersChange({ ...filters, dateRange: value === "all" ? null : value })
    setOpenDropdown(null)
  }

  const handleAssessmentTypeToggle = (value: string) => {
    if (value === "all") {
      onFiltersChange({ ...filters, assessmentType: ["all"] })
    } else {
      const newType = filters.assessmentType.includes(value)
        ? filters.assessmentType.filter((t) => t !== value)
        : [...filters.assessmentType.filter((t) => t !== "all"), value]
      onFiltersChange({
        ...filters,
        assessmentType: newType.length ? newType : ["all"],
      })
    }
  }

  return (
    <div className="relative -mt-6 mx-8 mb-8 z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-stretch md:items-center gap-4"
        style={{
          boxShadow: "0 2px 12px rgba(201, 244, 212, 0.15)",
        }}
      >
        {/* View Toggle (Left) */}
        <ViewToggle currentView={currentView} onViewChange={onViewChange} />

        {/* Search Input (Center) */}
        <div className="flex-1 max-w-md relative mx-4">
          <div className="relative">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                isSearchFocused ? "text-[#80EFC0]" : "text-[#4A9A6A]"
              }`}
            />
            <input
              type="text"
              placeholder="Search candidates by name, email, score..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full h-12 pl-12 pr-12 rounded-xl border-2 transition-all focus:outline-none focus:ring-0"
              style={{
                borderColor: isSearchFocused ? "#80EFC0" : "#E8FAF0",
                backgroundColor: isSearchFocused ? "#FFFFFF" : "#FAFAFA",
                boxShadow: isSearchFocused ? "0 0 0 4px rgba(128, 239, 192, 0.1)" : "none",
              }}
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-50"
                style={{ backgroundColor: "rgba(128, 239, 192, 0.1)" }}
              >
                <X className="w-4 h-4 text-[#4A9A6A] hover:text-red-500" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Filter */}
          <div className="relative">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpenDropdown(openDropdown === "status" ? null : "status")}
              className="h-12 px-4 rounded-xl border-2 flex items-center gap-2 transition-all font-medium text-[#2D7A52] bg-white"
              style={{
                borderColor: filters.status.some((s) => s !== "all")
                  ? "#80EFC0"
                  : "#E8FAF0",
                background: filters.status.some((s) => s !== "all")
                  ? "linear-gradient(135deg, #E8FAF0, #C9F4D4)"
                  : "#FFFFFF",
              }}
            >
              <span>Status</span>
              {filters.status.some((s) => s !== "all") && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#80EFC0] text-[#1E5A3B]">
                  {filters.status.filter((s) => s !== "all").length}
                </span>
              )}
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            <AnimatePresence>
              {openDropdown === "status" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 left-0 bg-white rounded-xl border-2 shadow-xl p-2 min-w-[220px] z-50"
                  style={{
                    borderColor: "#C9F4D4",
                    boxShadow: "0 8px 32px rgba(201, 244, 212, 0.3)",
                  }}
                >
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusToggle(option.value)}
                      className="w-full py-3 px-4 rounded-lg flex items-center justify-between hover:bg-[#E8FAF0] transition-colors text-[#1E5A3B]"
                    >
                      <span>{option.label}</span>
                      {filters.status.includes(option.value) && (
                        <Check className="w-4 h-4 text-[#80EFC0]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Score Range Filter */}
          <div className="relative">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpenDropdown(openDropdown === "score" ? null : "score")}
              className="h-12 px-4 rounded-xl border-2 flex items-center gap-2 transition-all font-medium text-[#2D7A52] bg-white"
              style={{
                borderColor: filters.scoreRange ? "#80EFC0" : "#E8FAF0",
              }}
            >
              <span>Score</span>
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            <AnimatePresence>
              {openDropdown === "score" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 left-0 bg-white rounded-xl border-2 shadow-xl p-2 min-w-[220px] z-50"
                  style={{
                    borderColor: "#C9F4D4",
                    boxShadow: "0 8px 32px rgba(201, 244, 212, 0.3)",
                  }}
                >
                  {scoreRangeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleScoreRangeSelect(option.value)}
                      className="w-full py-3 px-4 rounded-lg flex items-center justify-between hover:bg-[#E8FAF0] transition-colors text-[#1E5A3B]"
                    >
                      <span>{option.label}</span>
                      {filters.scoreRange === option.value && (
                        <Check className="w-4 h-4 text-[#80EFC0]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Assessment Type Filter */}
          <div className="relative">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpenDropdown(openDropdown === "type" ? null : "type")}
              className="h-12 px-4 rounded-xl border-2 flex items-center gap-2 transition-all font-medium text-[#2D7A52] bg-white"
              style={{
                borderColor: filters.assessmentType.some((t) => t !== "all")
                  ? "#80EFC0"
                  : "#E8FAF0",
                background: filters.assessmentType.some((t) => t !== "all")
                  ? "linear-gradient(135deg, #E8FAF0, #C9F4D4)"
                  : "#FFFFFF",
              }}
            >
              <span>Assessment Type</span>
              {filters.assessmentType.some((t) => t !== "all") && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#80EFC0] text-[#1E5A3B]">
                  {filters.assessmentType.filter((t) => t !== "all").length}
                </span>
              )}
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            <AnimatePresence>
              {openDropdown === "type" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 left-0 bg-white rounded-xl border-2 shadow-xl p-2 min-w-[220px] z-50"
                  style={{
                    borderColor: "#C9F4D4",
                    boxShadow: "0 8px 32px rgba(201, 244, 212, 0.3)",
                  }}
                >
                  {assessmentTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAssessmentTypeToggle(option.value)}
                      className="w-full py-3 px-4 rounded-lg flex items-center justify-between hover:bg-[#E8FAF0] transition-colors text-[#1E5A3B]"
                    >
                      <div className="flex items-center gap-2">
                        <span>{option.label}</span>
                        {option.count !== null && (
                          <span className="text-xs text-[#4A9A6A]">({option.count})</span>
                        )}
                      </div>
                      {filters.assessmentType.includes(option.value) && (
                        <Check className="w-4 h-4 text-[#80EFC0]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filters Button */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="h-12 px-4 rounded-xl border-2 flex items-center gap-2 transition-all font-medium relative"
            style={{
              borderColor: activeFiltersCount > 0 ? "#80EFC0" : "#E8FAF0",
              backgroundColor: "#FFFFFF",
              color: "#2D7A52",
            }}
          >
            <Filter className="w-5 h-5" />
            <span className="hidden md:inline">Filters</span>
            {activeFiltersCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center"
              >
                {activeFiltersCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Applied Filters Display */}
      {activeFiltersCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 flex flex-wrap items-center gap-2"
        >
          <span className="text-sm text-[#4A9A6A]">Active filters:</span>
          {filters.status
            .filter((s) => s !== "all")
            .map((status) => (
              <motion.button
                key={status}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleStatusToggle(status)}
                className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-colors"
                style={{
                  backgroundColor: "rgba(128, 239, 192, 0.1)",
                  border: "1px solid #80EFC0",
                  color: "#1E5A3B",
                }}
              >
                {status}
                <X className="w-3 h-3 hover:text-red-500" />
              </motion.button>
            ))}
          {filters.scoreRange && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleScoreRangeSelect("all")}
              className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2"
              style={{
                backgroundColor: "rgba(128, 239, 192, 0.1)",
                border: "1px solid #80EFC0",
                color: "#1E5A3B",
              }}
            >
              {scoreRangeOptions.find((o) => o.value === filters.scoreRange)?.label}
              <X className="w-3 h-3 hover:text-red-500" />
            </motion.button>
          )}
          {filters.dateRange && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleDateSelect("all")}
              className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2"
              style={{
                backgroundColor: "rgba(128, 239, 192, 0.1)",
                border: "1px solid #80EFC0",
                color: "#1E5A3B",
              }}
            >
              {dateOptions.find((o) => o.value === filters.dateRange)?.label}
              <X className="w-3 h-3 hover:text-red-500" />
            </motion.button>
          )}
          {filters.assessmentType
            .filter((t) => t !== "all")
            .map((type) => (
              <motion.button
                key={type}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleAssessmentTypeToggle(type)}
                className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-colors"
                style={{
                  backgroundColor: "rgba(128, 239, 192, 0.1)",
                  border: "1px solid #80EFC0",
                  color: "#1E5A3B",
                }}
              >
                {assessmentTypeOptions.find((o) => o.value === type)?.label || type}
                <X className="w-3 h-3 hover:text-red-500" />
              </motion.button>
            ))}
          <button
            onClick={() =>
              onFiltersChange({
                status: ["all"],
                scoreRange: null,
                dateRange: null,
                assessmentType: ["all"],
              })
            }
            className="text-sm text-[#80EFC0] hover:text-[#1E5A3B] font-medium ml-2"
          >
            Clear all
          </button>
        </motion.div>
      )}
    </div>
  )
}

