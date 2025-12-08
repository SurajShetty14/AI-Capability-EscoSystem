"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Mail, Phone, FileText, Star, Tag, Archive, X, Calendar, Target } from "lucide-react"
import { GlobalCandidateProfile } from "@/lib/global-candidate-profile-types"

interface ProfileFooterProps {
  candidate: GlobalCandidateProfile
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
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <Mail className="w-5 h-5" />
          Email Candidate
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <Phone className="w-5 h-5" />
          Schedule Interview
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <FileText className="w-5 h-5" />
          Export Full Report
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 transition-all"
          style={{
            background: "linear-gradient(135deg, #10B981, #059669)",
            color: "#FFFFFF",
            boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)",
          }}
        >
          <Target className="w-5 h-5" />
          Add to Position
        </motion.button>
      </div>

      {/* Row 3: Secondary Actions */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <Star className="w-5 h-5" />
          Add to Favorites
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <Tag className="w-5 h-5" />
          Edit Tags
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <FileText className="w-5 h-5" />
          Add Note
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C9F4D4",
            color: "#1E5A3B",
          }}
        >
          <Target className="w-5 h-5" />
          Move to Pipeline Stage
        </motion.button>
      </div>

      {/* Row 4: Danger Zone */}
      <div className="flex items-center gap-3 flex-wrap pt-4 border-t-2" style={{ borderColor: "#E8FAF0" }}>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#FEE2E2" }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#EF4444",
            color: "#EF4444",
          }}
        >
          <Archive className="w-5 h-5" />
          Archive Candidate
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-6 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#EF4444",
            color: "#EF4444",
          }}
        >
          <X className="w-5 h-5" />
          Reject & Notify
        </motion.button>
      </div>
    </div>
  )
}


