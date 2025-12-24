"use client"

import { motion } from "framer-motion"
import { Plus, Mail, Download, Search, Filter } from "lucide-react"
import { useState } from "react"
import { AssessmentDetail } from "@/lib/assessment-detail-types"
import { CandidateCard } from "@/components/candidates/CandidateCard"
import { EnhancedCandidate } from "@/lib/candidate-utils"
import { CandidateProfile } from "@/components/candidates/profile/CandidateProfile"
import { CandidateProfile as CandidateProfileType } from "@/lib/candidate-profile-types"

interface CandidatesTabProps {
  assessment: AssessmentDetail
}

export function CandidatesTab({ assessment }: CandidatesTabProps) {
  // Mock candidates for this assessment
  const mockCandidates: EnhancedCandidate[] = [
    {
      id: "c1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      memberSince: "2024-01-10",
      assessments: [
        {
          assessmentId: assessment.id,
          assessmentTitle: assessment.title,
          assessmentType: assessment.type,
          score: 85,
          status: "completed",
          appliedAt: "2024-01-10",
          completedAt: "2024-01-10",
          timeSpent: 154,
          breakdown: { mcq: 90, coding: 80, subjective: 85 },
        },
      ],
      overallScore: 85,
      percentileRank: 75,
      performanceTrend: "improving",
      completionRate: 100,
      latestAssessment: {
        assessmentId: assessment.id,
        assessmentTitle: assessment.title,
        assessmentType: assessment.type,
        score: 85,
        status: "completed",
        appliedAt: "2024-01-10",
        completedAt: "2024-01-10",
        timeSpent: 154,
        breakdown: { mcq: 90, coding: 80, subjective: 85 },
      },
      status: "completed",
    },
  ]
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set())
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null)

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || candidate.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedCandidates)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedCandidates(newSelected)
  }

  const statusTabs = [
    { id: "all", label: "All", count: mockCandidates.length },
    { id: "pending", label: "Pending", count: mockCandidates.filter((c) => c.status === "pending").length },
    {
      id: "active",
      label: "In Progress",
      count: mockCandidates.filter((c) => c.status === "active").length,
    },
    {
      id: "completed",
      label: "Completed",
      count: mockCandidates.filter((c) => c.status === "completed").length,
    },
    { id: "inactive", label: "Inactive", count: mockCandidates.filter((c) => c.status === "inactive").length },
  ]

  return (
    <div className="p-8 space-y-6" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Top Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-xl font-semibold text-[15px] flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
              color: "#1E5A3B",
              boxShadow: "0 4px 12px rgba(128, 239, 192, 0.3)",
            }}
          >
            <Plus className="w-5 h-5" />
            Invite More
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <Mail className="w-5 h-5" />
            Email All
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-xl font-semibold text-[15px] flex items-center gap-2 border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C9F4D4",
              color: "#1E5A3B",
            }}
          >
            <Download className="w-5 h-5" />
            Export
          </motion.button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#4A9A6A" }} />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2 rounded-xl border-2 focus:outline-none focus:ring-0 w-64"
              style={{
                borderColor: "#E8FAF0",
                backgroundColor: "#FAFAFA",
              }}
            />
          </div>
          <button
            className="w-12 h-12 rounded-xl border-2 flex items-center justify-center"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E8FAF0",
            }}
          >
            <Filter className="w-5 h-5" style={{ color: "#4A9A6A" }} />
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="text-sm font-medium" style={{ color: "#4A9A6A" }}>
        {assessment.metrics.totalCandidates} candidates • {assessment.metrics.inProgress} in progress •{" "}
        {assessment.metrics.completed} completed
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStatus(tab.id)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              selectedStatus === tab.id
                ? "text-white"
                : "text-[#1E5A3B] border-2"
            }`}
            style={{
              backgroundColor: selectedStatus === tab.id ? "#1E5A3B" : "#FFFFFF",
              borderColor: selectedStatus === tab.id ? "#1E5A3B" : "#E8FAF0",
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate, idx) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            index={idx}
            isSelected={selectedCandidates.has(candidate.id)}
            onSelect={handleSelect}
            onViewProfile={(id) => setSelectedProfileId(id)}
            platformAvgScore={assessment.metrics.averageScore}
          />
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-lg font-medium mb-2" style={{ color: "#6B7280" }}>
            No candidates found
          </div>
          <div className="text-sm" style={{ color: "#9CA3AF" }}>
            Try adjusting your search or filters
          </div>
        </div>
      )}

      {/* Candidate Profile Panel */}
      {selectedProfileId && (
        <CandidateProfile
          candidate={createMockProfile(selectedProfileId, assessment, mockCandidates)}
          isOpen={!!selectedProfileId}
          onClose={() => setSelectedProfileId(null)}
          onPrevious={() => {
            const currentIndex = filteredCandidates.findIndex((c) => c.id === selectedProfileId)
            if (currentIndex > 0) {
              setSelectedProfileId(filteredCandidates[currentIndex - 1].id)
            }
          }}
          onNext={() => {
            const currentIndex = filteredCandidates.findIndex((c) => c.id === selectedProfileId)
            if (currentIndex < filteredCandidates.length - 1) {
              setSelectedProfileId(filteredCandidates[currentIndex + 1].id)
            }
          }}
          hasPrevious={filteredCandidates.findIndex((c) => c.id === selectedProfileId) > 0}
          hasNext={filteredCandidates.findIndex((c) => c.id === selectedProfileId) < filteredCandidates.length - 1}
        />
      )}
    </div>
  )
}

// Helper function to create mock profile data
function createMockProfile(
  candidateId: string,
  assessment: AssessmentDetail,
  candidates: EnhancedCandidate[]
): CandidateProfileType {
  const candidate = candidates.find((c) => c.id === candidateId)
  const assessmentData = candidate?.assessments.find((a) => a.assessmentId === assessment.id)

  return {
    id: candidate?.id || candidateId,
    name: candidate?.name || "Unknown",
    email: candidate?.email || "",
    phone: candidate?.phone,
    memberSince: candidate?.memberSince instanceof Date 
      ? candidate.memberSince.toISOString() 
      : (candidate?.memberSince || new Date().toISOString()),
    location: "New York, USA",
    timezone: "EST -05:00",
    assessmentId: assessment.id,
    assessmentTitle: assessment.title,
    status: (assessmentData?.status as any) || "pending",
    finalScore: assessmentData?.score || 0,
    timeTaken: assessmentData?.timeSpent || 0,
    questionsCompleted: 18,
    questionsTotal: 18,
    rank: candidate?.percentileRank || 0,
    platformAverage: assessment.metrics.averageScore,
    scoreBreakdown: {
      mcq: {
        score: 18,
        total: 10,
        percentage: assessmentData?.breakdown?.mcq || 90,
        time: 930,
      },
      coding: {
        score: 4,
        total: 5,
        percentage: assessmentData?.breakdown?.coding || 80,
        time: 6300,
      },
      subjective: {
        score: 2,
        total: 3,
        percentage: assessmentData?.breakdown?.subjective || 67,
        time: 1980,
      },
    },
    questions: [],
    events: [
      {
        id: "e1",
        timestamp: candidate?.assessments[0]?.appliedAt instanceof Date
          ? candidate.assessments[0].appliedAt.toISOString()
          : (candidate?.assessments[0]?.appliedAt || new Date().toISOString()),
        type: "started",
        title: "Assessment Started",
        description: `${candidate?.name || "Candidate"} began the assessment`,
        metadata: {
          ip: "192.168.1.100",
          browser: "Chrome 120",
        },
      },
    ],
    proctoring: {
      riskScore: 15,
      status: "clean",
      screenshots: Array.from({ length: 24 }, (_, i) => `screenshot-${i + 1}.jpg`),
      violations: [],
      behaviorAnalysis: {
        faceVisibility: 98,
        eyeTracking: 95,
        multipleFaces: 2,
        audioClean: true,
        tabSwitches: 3,
        phoneDetection: 0,
        copyPaste: 0,
      },
    },
    analytics: {
      scoreProgression: [
        { x: "Q1", y: 5 },
        { x: "Q5", y: 25 },
        { x: "Q10", y: 50 },
        { x: "Q15", y: 75 },
        { x: "Q18", y: 85 },
      ],
      timeDistribution: [
        { x: "Q1", y: 83 },
        { x: "Q5", y: 95 },
        { x: "Q10", y: 120 },
        { x: "Q15", y: 150 },
        { x: "Q18", y: 180 },
      ],
      topicPerformance: [
        { topic: "React Fundamentals", score: 95, questions: 5 },
        { topic: "State Management", score: 90, questions: 4 },
        { topic: "API Integration", score: 88, questions: 3 },
        { topic: "Performance", score: 60, questions: 3 },
        { topic: "Testing", score: 55, questions: 3 },
      ],
      difficultyAnalysis: {
        easy: { score: 5, total: 5, percentage: 100 },
        medium: { score: 7, total: 8, percentage: 88 },
        hard: { score: 3, total: 5, percentage: 60 },
      },
      comparison: {
        overall: { candidate: 85, average: 74.5, difference: 10.5 },
        speed: { candidate: 154, average: 165, difference: -11 },
        accuracy: { candidate: 88, average: 75, difference: 13 },
        percentiles: {
          overall: 15,
          mcq: 10,
          coding: 25,
          timeEfficiency: 20,
        },
      },
      aiInsights: {
        strengths: [
          "Strong fundamentals in React and JavaScript",
          "Good problem-solving speed",
          "Consistent performance across easy/medium questions",
        ],
        weaknesses: [
          "Performance optimization concepts need work",
          "Testing strategies could be stronger",
          "Struggled with advanced coding challenges",
        ],
        recommendation:
          "Strong candidate for Mid-Level position. Would benefit from mentorship in performance tuning. Consider for roles with moderate complexity.",
      },
    },
    invitedAt: candidate?.assessments[0]?.appliedAt instanceof Date
      ? candidate.assessments[0].appliedAt.toISOString()
      : candidate?.assessments[0]?.appliedAt,
    startedAt: candidate?.assessments[0]?.appliedAt instanceof Date
      ? candidate.assessments[0].appliedAt.toISOString()
      : candidate?.assessments[0]?.appliedAt,
    completedAt: candidate?.assessments[0]?.completedAt instanceof Date
      ? candidate.assessments[0].completedAt.toISOString()
      : candidate?.assessments[0]?.completedAt,
  }
}

