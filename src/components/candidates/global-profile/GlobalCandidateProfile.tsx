"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlobalCandidateProfile as GlobalCandidateProfileType } from "@/lib/global-candidate-profile-types"
import { ProfileHeader } from "./ProfileHeader"
import { AggregateMetrics } from "./AggregateMetrics"
import { OverviewTab } from "./OverviewTab"
import { AssessmentsTab } from "./AssessmentsTab"
import { TimelineTab } from "./TimelineTab"
import { SkillsTab } from "./SkillsTab"
import { AnalyticsTab } from "./AnalyticsTab"
import { ProfileFooter } from "./ProfileFooter"

type TabType = "overview" | "assessments" | "timeline" | "skills" | "analytics"

interface GlobalCandidateProfileProps {
  candidate: GlobalCandidateProfileType
  isOpen: boolean
  onClose: () => void
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
}

export function GlobalCandidateProfile({
  candidate,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: GlobalCandidateProfileProps) {
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

            {/* Aggregate Metrics */}
            <AggregateMetrics candidate={candidate} />

            {/* Tab Navigation - Sticky */}
            <div className="sticky top-0 z-10 bg-white border-b-2 border-[#E8FAF0]">
              <div className="flex items-center gap-1 px-6 overflow-x-auto">
                {[
                  { id: "overview" as TabType, label: "Overview" },
                  { id: "assessments" as TabType, label: "Assessments", badge: candidate.totalAssessments },
                  { id: "timeline" as TabType, label: "Timeline" },
                  { id: "skills" as TabType, label: "Skills" },
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
                    {tab.badge !== undefined && (
                      <span
                        className="ml-2 px-2 py-0.5 rounded-md text-xs font-bold"
                        style={{ backgroundColor: "#E8FAF0", color: "#1E5A3B" }}
                      >
                        {tab.badge}
                      </span>
                    )}
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
                {activeTab === "assessments" && (
                  <motion.div
                    key="assessments"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <AssessmentsTab candidate={candidate} />
                  </motion.div>
                )}
                {activeTab === "timeline" && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <TimelineTab candidate={candidate} />
                  </motion.div>
                )}
                {activeTab === "skills" && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <SkillsTab candidate={candidate} />
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


