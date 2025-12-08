"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Users, Target } from "lucide-react"
import { useModeStore } from "@/store/mode-store"
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard"
import { HiringDashboard } from "@/components/dashboard/HiringDashboard"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const { mode, setMode } = useModeStore()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-mint-50 pb-12">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border-2 border-gray-200">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mint-50 pb-12">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-sm border-2 border-gray-200"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">View Mode</h3>
              <p className="text-sm text-gray-600">
                {mode === "employees"
                  ? "Managing internal employee capability building"
                  : "Managing external candidate recruitment"}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setMode("employees")}
                className={cn(
                  "px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2",
                  mode === "employees"
                    ? "bg-white text-mint-600 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Users className="w-5 h-5" />
                Employees
              </button>

              <button
                onClick={() => setMode("hiring")}
                className={cn(
                  "px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2",
                  mode === "hiring"
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Target className="w-5 h-5" />
                Hiring
              </button>
            </div>
          </div>
        </motion.div>

        {/* Conditional Dashboard Content */}
        <AnimatePresence mode="wait">
          {mode === "employees" ? (
            <motion.div
              key="employees"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <EmployeeDashboard />
            </motion.div>
          ) : (
            <motion.div
              key="hiring"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <HiringDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
