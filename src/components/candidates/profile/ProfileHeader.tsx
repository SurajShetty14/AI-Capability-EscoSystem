"use client"

import { motion } from "framer-motion"
import { ArrowLeft, X, Mail, Copy, Star, Archive, MoreVertical } from "lucide-react"
import { CandidateProfile } from "@/lib/candidate-profile-types"

interface ProfileHeaderProps {
  candidate: CandidateProfile
  onClose: () => void
}

export function ProfileHeader({ candidate, onClose }: ProfileHeaderProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const avatarGradient = `linear-gradient(135deg, #C9F4D4, #80EFC0)`

  const statusConfig = {
    completed: { label: "Completed", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
    "in-progress": { label: "In Progress", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
    pending: { label: "Pending", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" },
    failed: { label: "Failed", color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" },
  }

  const status = statusConfig[candidate.status]

  return (
    <div className="bg-white border-b-2 border-[#E8FAF0]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[15px] font-medium transition-colors"
            style={{ color: "#4A9A6A" }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h2 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
            {candidate.name} - {candidate.assessmentTitle}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#E8FAF0] transition-colors">
            <MoreVertical className="w-5 h-5" style={{ color: "#4A9A6A" }} />
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#E8FAF0] hover:bg-[#EF4444] hover:text-white transition-all"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className="px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-8 border-2 relative"
          style={{
            background: "linear-gradient(135deg, #E8FAF0 0%, #FFFFFF 100%)",
            borderColor: "#C9F4D4",
            boxShadow: "0 4px 20px rgba(201, 244, 212, 0.15)",
          }}
        >
          {/* Status Badge */}
          <div className="absolute top-6 right-6">
            <div
              className="px-4 py-2 rounded-full text-xs font-bold uppercase"
              style={{
                backgroundColor: status.bg,
                color: status.color,
              }}
            >
              {status.label}
            </div>
          </div>

          {/* Avatar */}
          <div className="flex items-start gap-6 mb-6">
            {candidate.avatar ? (
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-[120px] h-[120px] rounded-full border-4 border-white shadow-[0_8px_24px_rgba(128,239,192,0.3)]"
              />
            ) : (
              <div
                className="w-[120px] h-[120px] rounded-full border-4 border-white flex items-center justify-center text-white font-black text-4xl shadow-[0_8px_24px_rgba(128,239,192,0.3)]"
                style={{ background: avatarGradient }}
              >
                {initials}
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl font-black mb-2" style={{ color: "#1E5A3B", letterSpacing: "-0.02em" }}>
                {candidate.name}
              </h1>

              <div className="space-y-1 mb-4">
                <div className="flex items-center gap-2 text-base" style={{ color: "#2D7A52" }}>
                  <Mail className="w-4 h-4" />
                  {candidate.email}
                </div>
                {candidate.phone && (
                  <div className="flex items-center gap-2 text-[15px]" style={{ color: "#4A9A6A" }}>
                    <span>📱</span>
                    {candidate.phone}
                  </div>
                )}
              </div>

              <div className="space-y-1 text-sm" style={{ color: "#4A9A6A" }}>
                {candidate.memberSince && (
                  <div>Member since: {new Date(candidate.memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
                )}
                {candidate.location && <div>Location: {candidate.location}</div>}
                {candidate.timezone && <div>Timezone: {candidate.timezone}</div>}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Mail className="w-4 h-4" />
              Email
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Copy className="w-4 h-4" />
              Copy Info
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Star className="w-4 h-4" />
              Add Note
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#FCA5A5",
                color: "#EF4444",
              }}
            >
              <Archive className="w-4 h-4" />
              Archive
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

