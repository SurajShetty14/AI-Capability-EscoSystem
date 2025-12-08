"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, Loader2, Clock, XCircle, AlertTriangle, Camera, Mic, Globe, Monitor, MonitorPlay } from "lucide-react"
import { useSystemCheck, SystemCheckResult } from "@/hooks/useSystemCheck"

interface SystemCheckModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
}

const iconMap: Record<string, any> = {
  camera: Camera,
  microphone: Mic,
  internet: Globe,
  browser: Monitor,
  screen: MonitorPlay,
}

export function SystemCheckModal({ isOpen, onClose, onContinue }: SystemCheckModalProps) {
  const {
    checks,
    isRunning,
    progress,
    allPassed,
    hasFailed,
    currentTestIndex,
    runAllTests,
    retryTest,
    reset,
  } = useSystemCheck()

  useEffect(() => {
    if (isOpen && !isRunning) {
      runAllTests()
    } else if (!isOpen) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const getStatusIcon = (check: SystemCheckResult, index: number) => {
    const isCurrent = index === currentTestIndex && isRunning
    
    if (check.status === "passed") {
      return <CheckCircle2 className="w-6 h-6 text-green-600" />
    } else if (check.status === "testing" || isCurrent) {
      return <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
    } else if (check.status === "failed") {
      return <XCircle className="w-6 h-6 text-red-600" />
    } else {
      return <Clock className="w-6 h-6 text-gray-400" />
    }
  }

  const getStatusColor = (check: SystemCheckResult, index: number) => {
    const isCurrent = index === currentTestIndex && isRunning
    
    if (check.status === "passed") {
      return "text-green-600"
    } else if (check.status === "testing" || isCurrent) {
      return "text-blue-600"
    } else if (check.status === "failed") {
      return "text-red-600"
    } else {
      return "text-gray-400"
    }
  }

  const getBgColor = (check: SystemCheckResult, index: number) => {
    const isCurrent = index === currentTestIndex && isRunning
    
    if (check.status === "passed") {
      return "bg-green-50 border-green-200"
    } else if (check.status === "testing" || isCurrent) {
      return "bg-blue-50 border-blue-200"
    } else if (check.status === "failed") {
      return "bg-red-50 border-red-200"
    } else {
      return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-lg z-[9998]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-[90vw] max-w-[600px] max-h-[85vh] bg-white rounded-3xl overflow-hidden flex flex-col mx-auto"
              style={{
                boxShadow: "0 24px 96px rgba(30, 90, 59, 0.2)",
              }}
            >
              {/* Header */}
              <div className="p-8 pb-6 flex items-center justify-between border-b-2" style={{ borderColor: "#E8FAF0" }}>
                <div>
                  <h2 className="text-3xl font-black mb-2 flex items-center gap-3" style={{ color: "#1E5A3B" }}>
                    <span>🔧</span>
                    <span>System Requirements Check</span>
                  </h2>
                  <p className="text-base font-medium" style={{ color: "#4A9A6A" }}>
                    {isRunning ? "Running checks one by one..." : allPassed ? "All checks passed!" : "Some checks failed"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="px-8 pt-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold" style={{ color: "#1E5A3B" }}>Progress</span>
                  <span className="text-sm font-bold" style={{ color: "#4A9A6A" }}>{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #C9F4D4, #80EFC0)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Status List */}
              <div className="px-8 py-4 flex-1 overflow-y-auto">
                <div className="space-y-3">
                  {checks.map((check, index) => {
                    const IconComponent = iconMap[check.id];
                    const isCurrent = index === currentTestIndex && isRunning;
                    return (
                      <motion.div
                        key={check.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-5 rounded-2xl border-2 transition-all duration-300 ${getBgColor(check, index)}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isCurrent ? 'bg-blue-100' : getBgColor(check, index).includes('green') ? 'bg-green-100' : getBgColor(check, index).includes('red') ? 'bg-red-100' : 'bg-gray-100'}`}>
                                {IconComponent && <IconComponent className={`w-6 h-6 ${getStatusColor(check, index)}`} />}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold" style={{ color: "#1E5A3B" }}>{check.name}</h3>
                              </div>
                              <p className="text-sm font-medium" style={{ color: "#6B7280" }}>{check.details || check.message}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                            {getStatusIcon(check, index)}
                            {check.status === "failed" && (
                              <button
                                onClick={() => retryTest(check.id)}
                                className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                Retry
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* All Passed / Error Message */}
              {allPassed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-8 mb-4 p-4 rounded-xl border-2"
                  style={{ backgroundColor: "rgba(16, 185, 129, 0.05)", borderColor: "#A7F3D0" }}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div className="text-sm font-semibold text-green-900">All system checks passed! You're ready to continue.</div>
                  </div>
                </motion.div>
              )}

              {hasFailed && !allPassed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-8 mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-red-900 mb-1">
                        Some tests failed
                      </div>
                      <div className="text-sm text-red-700">
                        Please fix the issues above or continue anyway (not recommended).
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Bottom Actions */}
              <div className="p-8 pt-6 flex items-center justify-between border-t-2" style={{ borderColor: "#E8FAF0" }}>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-semibold text-base transition-colors"
                  style={{ color: "#6B7280" }}
                >
                  Cancel
                </button>

                <div className="flex items-center gap-3">
                  {hasFailed && !allPassed && (
                    <button
                      onClick={() => runAllTests()}
                      className="px-6 py-3 rounded-xl font-semibold text-base border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Retry All
                    </button>
                  )}
                  <motion.button
                    whileHover={allPassed ? { scale: 1.02 } : {}}
                    whileTap={allPassed ? { scale: 0.98 } : {}}
                    onClick={allPassed ? onContinue : undefined}
                    disabled={!allPassed}
                    className="px-8 py-3 rounded-xl font-bold text-base flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    style={{
                      background: allPassed
                        ? "linear-gradient(135deg, #1E5A3B, #2D7A52, #80EFC0)"
                        : "linear-gradient(135deg, #9CA3AF, #6B7280)",
                      color: "#FFFFFF",
                      boxShadow: allPassed
                        ? "0 8px 32px rgba(30, 90, 59, 0.4)"
                        : "none",
                    }}
                  >
                    {allPassed ? (
                      <>
                        <span>Continue</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    ) : (
                      <span>Waiting for tests...</span>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

