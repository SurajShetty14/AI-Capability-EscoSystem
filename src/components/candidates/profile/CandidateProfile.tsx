"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { CandidateProfile as CandidateProfileType } from "@/lib/candidate-profile-types"
import { ProfileHeader } from "./ProfileHeader"
import { PerformanceOverview } from "./PerformanceOverview"
import { OverviewTab } from "./OverviewTab"
import { QuestionsTab } from "./QuestionsTab"
import { TimelineTab as TimelineTabComponent } from "./TimelineTab"
import { ProctoringTab } from "./ProctoringTab"
import { AnalyticsTab } from "./AnalyticsTab"
import { ProfileFooter } from "./ProfileFooter"

type TabType = "overview" | "questions" | "timeline" | "proctoring" | "analytics"

interface CandidateProfileProps {
  candidate: CandidateProfileType
  isOpen: boolean
  onClose: () => void
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
}

export function CandidateProfile({
  candidate,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: CandidateProfileProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview")

  if (!isOpen) return null

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
            className="fixed inset-0 bg-black/60 backdrop-blur-[8px] z-[99]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-[90vw] max-w-[1400px] bg-[#FAFAFA] shadow-[-8px_0_40px_rgba(0,0,0,0.15)] z-[100] overflow-y-auto"
          >
            {/* Header */}
            <ProfileHeader candidate={candidate} onClose={onClose} />

            {/* Performance Overview */}
            <PerformanceOverview candidate={candidate} />

            {/* Tab Navigation - Sticky */}
            <div className="sticky top-0 z-10 bg-white border-b-2 border-[#E8FAF0]">
              <div className="flex items-center gap-1 px-6 overflow-x-auto">
                {[
                  { id: "overview" as TabType, label: "Overview" },
                  { id: "questions" as TabType, label: "Questions" },
                  { id: "timeline" as TabType, label: "Timeline" },
                  { id: "proctoring" as TabType, label: "Proctoring" },
                  { id: "analytics" as TabType, label: "Analytics" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-4 font-semibold text-[15px] transition-all whitespace-nowrap border-b-3 ${
                      activeTab === tab.id
                        ? "text-[#1E5A3B] border-[#80EFC0]"
                        : "text-[#6B7280] border-transparent hover:text-[#1E5A3B] hover:bg-[rgba(232,250,240,0.3)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 max-w-[1600px] mx-auto">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <OverviewTab candidate={candidate} />
                  </motion.div>
                )}
                {activeTab === "questions" && (
                  <motion.div
                    key="questions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <QuestionsTab candidate={candidate} />
                  </motion.div>
                )}
                {activeTab === "timeline" && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <TimelineTabComponent candidate={candidate} />
                  </motion.div>
                )}
                {activeTab === "proctoring" && (
                  <motion.div
                    key="proctoring"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ProctoringTab candidate={candidate} />
                  </motion.div>
                )}
                {activeTab === "analytics" && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <AnalyticsTab candidate={candidate} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <ProfileFooter
              candidate={candidate}
              onPrevious={onPrevious}
              onNext={onNext}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

