"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Mail, FileText, Star, Archive, Flag, CheckCircle2 } from "lucide-react"
import { CandidateProfile } from "@/lib/candidate-profile-types"

interface ProfileFooterProps {
  candidate: CandidateProfile
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
}

export function ProfileFooter({
  candidate,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: ProfileFooterProps) {
  return (
    <div className="bg-white border-t-2 border-[#E8FAF0] p-6 shadow-[0_-4px_16px_rgba(201,244,212,0.1)]">
      {/* Row 1: Navigation */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="h-11 px-6 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          Previous Candidate
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!hasNext}
          className="h-11 px-6 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          Next Candidate
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Row 2: Primary Actions */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-11 px-6 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <Mail className="w-5 h-5" />
          Email
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-11 px-6 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <FileText className="w-5 h-5" />
          Export
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-11 px-6 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <Star className="w-5 h-5" />
          Add to Pool
        </motion.button>
      </div>

      {/* Row 3: Secondary Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#FEE2E2" }}
          whileTap={{ scale: 0.95 }}
          className="h-11 px-6 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#EF4444",
            color: "#EF4444",
          }}
        >
          <Archive className="w-5 h-5" />
          Archive
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-11 px-6 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#FCA5A5",
            color: "#EF4444",
          }}
        >
          <Flag className="w-5 h-5" />
          Flag for Review
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-11 px-6 rounded-xl font-semibold text-[15px] flex items-center gap-2 transition-all"
          style={{
            background: "linear-gradient(135deg, #10B981, #059669)",
            color: "#FFFFFF",
            boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)",
          }}
        >
          Approve & Continue
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}

