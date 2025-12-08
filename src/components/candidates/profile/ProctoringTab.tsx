"use client"

import { motion } from "framer-motion"
import { Play, Download, Share2, CheckCircle2, AlertTriangle, X, Clock } from "lucide-react"
import { CandidateProfile } from "@/lib/candidate-profile-types"

interface ProctoringTabProps {
  candidate: CandidateProfile
}

export function ProctoringTab({ candidate }: ProctoringTabProps) {
  if (!candidate.proctoring) {
    return (
      <div className="text-center py-12">
        <div className="text-lg font-medium mb-2" style={{ color: "#6B7280" }}>
          Proctoring not enabled for this assessment
        </div>
      </div>
    )
  }

  const riskScore = candidate.proctoring.riskScore
  const getRiskInfo = () => {
    if (riskScore <= 30) return { label: "Low", color: "#10B981", icon: CheckCircle2 }
    if (riskScore <= 60) return { label: "Medium", color: "#F59E0B", icon: AlertTriangle }
    return { label: "High", color: "#EF4444", icon: X }
  }

  const riskInfo = getRiskInfo()
  const RiskIcon = riskInfo.icon

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="space-y-6">
      {/* Risk Score */}
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#C9F4D4" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
            Overall Risk Score
          </h3>
          <div className="flex items-center gap-2">
            <RiskIcon className="w-6 h-6" style={{ color: riskInfo.color }} />
            <span className="text-3xl font-black" style={{ color: riskInfo.color }}>
              {riskScore}
            </span>
            <span className="text-lg font-bold" style={{ color: riskInfo.color }}>
              /100
            </span>
          </div>
        </div>
        <div className="text-base font-semibold" style={{ color: riskInfo.color }}>
          {riskInfo.label} ✅
        </div>
        <div className="text-sm mt-2" style={{ color: "#6B7280" }}>
          Status: {candidate.proctoring.status === "clean" ? "No major violations detected" : candidate.proctoring.status === "minor_issues" ? "Minor issues detected" : "Flagged for review"}
        </div>
      </div>

      {/* Session Recording */}
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#C9F4D4" }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Session Recording
        </h3>
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
              color: "#1E5A3B",
              boxShadow: "0 4px 12px rgba(128, 239, 192, 0.3)",
            }}
          >
            <Play className="w-5 h-5" />
            Play Recording ({formatDuration(candidate.timeTaken)})
          </motion.button>
          <div className="flex items-center gap-3">
            <button
              className="flex-1 px-4 py-2 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              className="flex-1 px-4 py-2 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <Share2 className="w-4 h-4" />
              Share Link
            </button>
          </div>
        </div>
      </div>

      {/* Behavior Analysis */}
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#C9F4D4" }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
          Behavior Analysis
        </h3>
        <div className="space-y-4">
          <MetricBar
            label="Face Visibility"
            value={candidate.proctoring.behaviorAnalysis.faceVisibility}
            status="excellent"
          />
          <MetricBar
            label="Eye Tracking"
            value={candidate.proctoring.behaviorAnalysis.eyeTracking}
            status="excellent"
          />
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm" style={{ color: "#2D7A52" }}>
                Multiple Faces:
              </span>
              <span className="font-bold" style={{ color: "#F59E0B" }}>
                {candidate.proctoring.behaviorAnalysis.multipleFaces} instances
              </span>
            </div>
            <div className="text-xs" style={{ color: "#6B7280" }}>
              ⚠️ Someone else appeared in frame briefly
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm" style={{ color: "#2D7A52" }}>
                Audio Analysis:
              </span>
              <span className="font-bold" style={{ color: candidate.proctoring.behaviorAnalysis.audioClean ? "#10B981" : "#EF4444" }}>
                {candidate.proctoring.behaviorAnalysis.audioClean ? "Clean" : "Suspicious"}
              </span>
            </div>
            <div className="text-xs" style={{ color: "#6B7280" }}>
              {candidate.proctoring.behaviorAnalysis.audioClean ? "✅ No suspicious voices detected" : "⚠️ Voices detected"}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm" style={{ color: "#2D7A52" }}>
                Tab Switches:
              </span>
              <span className="font-bold" style={{ color: "#F59E0B" }}>
                {candidate.proctoring.behaviorAnalysis.tabSwitches} times
              </span>
            </div>
            <div className="text-xs" style={{ color: "#6B7280" }}>
              ⚠️ Minor concern - Visited external sites
            </div>
          </div>
        </div>
      </div>

      {/* Violations */}
      {candidate.proctoring.violations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#C9F4D4" }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
            Violation Timeline
          </h3>
          <div className="space-y-4">
            {candidate.proctoring.violations.map((violation) => (
              <div
                key={violation.id}
                className="p-4 rounded-xl border-2"
                style={{
                  backgroundColor: "rgba(245, 158, 11, 0.05)",
                  borderColor: "#FDE68A",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" style={{ color: "#F59E0B" }} />
                  <span className="font-semibold" style={{ color: "#1E5A3B" }}>
                    {new Date(violation.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="text-sm" style={{ color: "#EF4444" }}>
                    ⚠️ {violation.type.replace("_", " ")}
                  </span>
                </div>
                <div className="text-sm mb-2" style={{ color: "#2D7A52" }}>
                  {violation.description}
                </div>
                <div className="flex items-center gap-2">
                  {violation.screenshot && (
                    <button className="px-3 py-1 rounded-lg text-xs font-medium border-2" style={{ backgroundColor: "#FFFFFF", borderColor: "#C9F4D4", color: "#1E5A3B" }}>
                      View Screenshot
                    </button>
                  )}
                  {violation.videoClip && (
                    <button className="px-3 py-1 rounded-lg text-xs font-medium border-2" style={{ backgroundColor: "#FFFFFF", borderColor: "#C9F4D4", color: "#1E5A3B" }}>
                      Watch Video
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screenshots */}
      {candidate.proctoring.screenshots.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: "#C9F4D4" }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: "#1E5A3B" }}>
            Screenshots ({candidate.proctoring.screenshots.length} captured)
          </h3>
          <div className="grid grid-cols-6 gap-3">
            {candidate.proctoring.screenshots.slice(0, 24).map((ss, idx) => (
              <div
                key={idx}
                className="aspect-video rounded-lg border-2 bg-gray-100 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                style={{ borderColor: "#E8FAF0" }}
              >
                <div className="text-xs text-gray-400">{idx + 1}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MetricBar({ label, value, status }: { label: string; value: number; status: "excellent" | "good" | "warning" }) {
  const color = status === "excellent" ? "#10B981" : status === "good" ? "#3B82F6" : "#F59E0B"
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm" style={{ color: "#2D7A52" }}>
          {label}:
        </span>
        <span className="font-bold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-2 bg-[#E8FAF0] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="text-xs mt-1" style={{ color: "#6B7280" }}>
        {status === "excellent" && "✅ Excellent"}
        {status === "good" && "👍 Good"}
        {status === "warning" && "⚠️ Needs attention"}
      </div>
    </div>
  )
}

