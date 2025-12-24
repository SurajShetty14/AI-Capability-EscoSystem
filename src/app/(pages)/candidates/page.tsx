"use client"

import { useState, useMemo, useEffect } from "react"
import { CandidatesHeader } from "@/components/candidates/CandidatesHeader"
import { CandidatesSearchAndFilters } from "@/components/candidates/CandidatesSearchAndFilters"
import { CandidateCard } from "@/components/candidates/CandidateCard"
import { BulkActions } from "@/components/candidates/BulkActions"
import { CandidatesEmptyState } from "@/components/candidates/CandidatesEmptyState"
import { GlobalCandidateProfile as GlobalCandidateProfileComponent } from "@/components/candidates/global-profile/GlobalCandidateProfile"
import {
  EnhancedCandidate,
  CandidateAssessment,
  calculateAverageScore,
  getPerformanceTrend,
  getCompletionRate,
} from "@/lib/candidate-utils"
import { convertToGlobalProfile } from "@/lib/candidate-aggregation"
import { GlobalCandidateProfile } from "@/lib/global-candidate-profile-types"

type ViewMode = "cards" | "list" | "board"

// Mock data with multiple assessments per candidate
const mockCandidatesData: EnhancedCandidate[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    status: "completed",
    memberSince: "2024-01-01",
    assessments: [
      {
        assessmentId: "a1",
        assessmentTitle: "Full Stack Developer Assessment",
        assessmentType: "assessment",
        score: 85,
        status: "completed",
        appliedAt: "2024-01-10",
        completedAt: "2024-01-10",
        timeSpent: 154,
        breakdown: { mcq: 92, coding: 78, subjective: 85 },
      },
      {
        assessmentId: "a2",
        assessmentTitle: "DSA Coding Challenge",
        assessmentType: "dsa",
        score: 78,
        status: "completed",
        appliedAt: "2024-01-08",
        completedAt: "2024-01-08",
        timeSpent: 120,
        breakdown: { mcq: 80, coding: 75 },
      },
      {
        assessmentId: "a3",
        assessmentTitle: "System Design Assessment",
        assessmentType: "assessment",
        score: 92,
        status: "completed",
        appliedAt: "2024-01-05",
        completedAt: "2024-01-05",
        timeSpent: 180,
        breakdown: { mcq: 95, subjective: 90 },
      },
    ],
    overallScore: calculateAverageScore([
      { score: 85 } as CandidateAssessment,
      { score: 78 } as CandidateAssessment,
      { score: 92 } as CandidateAssessment,
    ]),
    percentileRank: 15,
    performanceTrend: "improving",
    completionRate: 100,
    latestAssessment: {
      assessmentId: "a1",
      assessmentTitle: "Full Stack Developer Assessment",
      assessmentType: "assessment",
    score: 85,
      status: "completed",
      appliedAt: "2024-01-10",
      completedAt: "2024-01-10",
      timeSpent: 154,
      breakdown: { mcq: 92, coding: 78, subjective: 85 },
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    memberSince: "2024-01-05",
    assessments: [
      {
        assessmentId: "b1",
        assessmentTitle: "Senior Backend Engineer",
        assessmentType: "assessment",
        score: null,
        status: "in-progress",
        appliedAt: "2024-01-12",
        timeSpent: 45,
      },
      {
        assessmentId: "b2",
        assessmentTitle: "Cloud Architecture - AWS",
        assessmentType: "cloud",
        score: 88,
        status: "completed",
        appliedAt: "2024-01-08",
        completedAt: "2024-01-08",
        timeSpent: 165,
        breakdown: { mcq: 90, coding: 85 },
      },
    ],
    overallScore: 88,
    percentileRank: 20,
    performanceTrend: "stable",
    completionRate: 50,
    latestAssessment: {
      assessmentId: "b1",
      assessmentTitle: "Senior Backend Engineer",
      assessmentType: "assessment",
      score: null,
    status: "in-progress",
      appliedAt: "2024-01-12",
      timeSpent: 45,
    },
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    status: "pending",
    memberSince: "2024-01-14",
    assessments: [
      {
        assessmentId: "c1",
        assessmentTitle: "React Developer Assessment",
        assessmentType: "assessment",
        score: null,
        status: "pending",
        appliedAt: "2024-01-14",
        timeSpent: 0,
      },
    ],
    overallScore: 0,
    percentileRank: 0,
    performanceTrend: "stable",
    completionRate: 0,
    latestAssessment: {
      assessmentId: "c1",
      assessmentTitle: "React Developer Assessment",
      assessmentType: "assessment",
      score: null,
      status: "pending",
      appliedAt: "2024-01-14",
      timeSpent: 0,
    },
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    phone: "+1 (555) 345-6789",
    status: "completed",
    memberSince: "2023-12-20",
    assessments: [
      {
        assessmentId: "d1",
        assessmentTitle: "Cloud Architecture Assessment",
        assessmentType: "cloud",
        score: 92,
        status: "completed",
        appliedAt: "2024-01-08",
        completedAt: "2024-01-08",
        timeSpent: 180,
        breakdown: { mcq: 95, coding: 88 },
      },
      {
        assessmentId: "d2",
        assessmentTitle: "AI/ML Engineer Challenge",
        assessmentType: "ai",
        score: 95,
        status: "completed",
        appliedAt: "2024-01-05",
        completedAt: "2024-01-05",
        timeSpent: 200,
        breakdown: { mcq: 98, coding: 92 },
      },
      {
        assessmentId: "d3",
        assessmentTitle: "DSA Advanced",
        assessmentType: "dsa",
        score: 90,
        status: "completed",
        appliedAt: "2024-01-02",
        completedAt: "2024-01-02",
        timeSpent: 150,
        breakdown: { mcq: 92, coding: 88 },
      },
    ],
    overallScore: 92.3,
    percentileRank: 8,
    performanceTrend: "improving",
    completionRate: 100,
    latestAssessment: {
      assessmentId: "d1",
      assessmentTitle: "Cloud Architecture Assessment",
      assessmentType: "cloud",
      score: 92,
      status: "completed",
      appliedAt: "2024-01-08",
      completedAt: "2024-01-08",
      timeSpent: 180,
      breakdown: { mcq: 95, coding: 88 },
    },
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    status: "completed",
    memberSince: "2024-01-09",
    assessments: [
      {
        assessmentId: "e1",
        assessmentTitle: "Data Science & ML Engineer",
        assessmentType: "ai",
        score: 78,
        status: "completed",
        appliedAt: "2024-01-09",
        completedAt: "2024-01-09",
        timeSpent: 165,
        breakdown: { mcq: 80, coding: 75 },
      },
    ],
    overallScore: 78,
    percentileRank: 45,
    performanceTrend: "stable",
    completionRate: 100,
    latestAssessment: {
      assessmentId: "e1",
      assessmentTitle: "Data Science & ML Engineer",
      assessmentType: "ai",
      score: 78,
      status: "completed",
      appliedAt: "2024-01-09",
      completedAt: "2024-01-09",
      timeSpent: 165,
      breakdown: { mcq: 80, coding: 75 },
    },
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    status: "active",
    memberSince: "2024-01-11",
    assessments: [
      {
        assessmentId: "f1",
        assessmentTitle: "DevOps Engineer Assessment",
        assessmentType: "assessment",
        score: null,
        status: "in-progress",
        appliedAt: "2024-01-11",
        timeSpent: 30,
      },
    ],
    overallScore: 0,
    percentileRank: 0,
    performanceTrend: "stable",
    completionRate: 0,
    latestAssessment: {
      assessmentId: "f1",
      assessmentTitle: "DevOps Engineer Assessment",
      assessmentType: "assessment",
      score: null,
      status: "in-progress",
      appliedAt: "2024-01-11",
      timeSpent: 30,
    },
  },
  {
    id: "7",
    name: "Eve Adams",
    email: "eve.adams@example.com",
    status: "completed",
    memberSince: "2024-01-07",
    assessments: [
      {
        assessmentId: "g1",
        assessmentTitle: "Python Developer Assessment",
        assessmentType: "assessment",
        score: 45,
        status: "completed",
        appliedAt: "2024-01-07",
        completedAt: "2024-01-07",
        timeSpent: 120,
        breakdown: { mcq: 50, coding: 40 },
      },
    ],
    overallScore: 45,
    percentileRank: 85,
    performanceTrend: "stable",
    completionRate: 100,
    latestAssessment: {
      assessmentId: "g1",
      assessmentTitle: "Python Developer Assessment",
      assessmentType: "assessment",
      score: 45,
      status: "completed",
      appliedAt: "2024-01-07",
      completedAt: "2024-01-07",
      timeSpent: 120,
      breakdown: { mcq: 50, coding: 40 },
    },
  },
  {
    id: "8",
    name: "Frank Miller",
    email: "frank.miller@example.com",
    status: "completed",
    memberSince: "2024-01-06",
    assessments: [
      {
        assessmentId: "h1",
        assessmentTitle: "Mobile Developer - React Native",
        assessmentType: "assessment",
        score: 35,
        status: "failed",
        appliedAt: "2024-01-06",
        completedAt: "2024-01-06",
        timeSpent: 90,
        breakdown: { mcq: 40, coding: 30 },
      },
    ],
    overallScore: 35,
    percentileRank: 95,
    performanceTrend: "stable",
    completionRate: 100,
    latestAssessment: {
      assessmentId: "h1",
      assessmentTitle: "Mobile Developer - React Native",
      assessmentType: "assessment",
      score: 35,
      status: "failed",
      appliedAt: "2024-01-06",
      completedAt: "2024-01-06",
      timeSpent: 90,
      breakdown: { mcq: 40, coding: 30 },
    },
  },
  {
    id: "9",
    name: "Grace Lee",
    email: "grace.lee@example.com",
    phone: "+1 (555) 456-7890",
    status: "completed",
    memberSince: "2023-12-15",
    assessments: [
      {
        assessmentId: "i1",
        assessmentTitle: "Full Stack Developer Assessment",
        assessmentType: "assessment",
        score: 88,
        status: "completed",
        appliedAt: "2024-01-13",
        completedAt: "2024-01-13",
        timeSpent: 170,
        breakdown: { mcq: 90, coding: 85, subjective: 88 },
      },
      {
        assessmentId: "i2",
        assessmentTitle: "DSA Coding Challenge",
        assessmentType: "dsa",
        score: 82,
        status: "completed",
        appliedAt: "2024-01-10",
        completedAt: "2024-01-10",
        timeSpent: 140,
        breakdown: { mcq: 85, coding: 78 },
      },
      {
        assessmentId: "i3",
        assessmentTitle: "Cloud Labs - AWS",
        assessmentType: "cloud",
        score: 85,
        status: "completed",
        appliedAt: "2024-01-07",
        completedAt: "2024-01-07",
        timeSpent: 160,
        breakdown: { mcq: 88, coding: 82 },
      },
    ],
    overallScore: 85,
    percentileRank: 25,
    performanceTrend: "improving",
    completionRate: 100,
    latestAssessment: {
      assessmentId: "i1",
      assessmentTitle: "Full Stack Developer Assessment",
      assessmentType: "assessment",
      score: 88,
      status: "completed",
      appliedAt: "2024-01-13",
      completedAt: "2024-01-13",
      timeSpent: 170,
      breakdown: { mcq: 90, coding: 85, subjective: 88 },
    },
  },
]

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("cards")
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({
    status: ["all"] as string[],
    scoreRange: null as string | null,
    dateRange: null as string | null,
    assessmentType: ["all"] as string[],
  })
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null)

  // Calculate GLOBAL stats (not just current page)
  const stats = useMemo(() => {
    // In real app, these would come from API
    const total = 2847 // Global total
    const active = 342 // Currently testing
    const activeLive = 23 // Live right now
    const completed = 2156 // Total completed assessments
    const allScores = mockCandidatesData
      .map((c) => c.overallScore)
      .filter((s) => s > 0)
    const avgScore = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 74.5
    const topPerformers = mockCandidatesData.filter((c) => c.overallScore >= 90).length

    return {
      total,
      active,
      activeLive,
      completed,
      avgScore,
      avgTime: 12, // Global average
      topPerformers,
    }
  }, [])

  // Filter and search candidates
  const filteredCandidates = useMemo(() => {
    let filtered = [...mockCandidatesData]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(query) ||
          candidate.email.toLowerCase().includes(query) ||
          candidate.assessments.some((a) =>
            a.assessmentTitle.toLowerCase().includes(query)
          ) ||
          (candidate.overallScore && candidate.overallScore.toString().includes(query))
      )
    }

    // Status filter
    if (!filters.status.includes("all")) {
      filtered = filtered.filter((candidate) => filters.status.includes(candidate.status))
    }

    // Score range filter
    if (filters.scoreRange && filters.scoreRange !== "all") {
      const [min, max] = filters.scoreRange.split("-").map(Number)
      filtered = filtered.filter((candidate) => {
        if (!candidate.overallScore || candidate.overallScore === 0) return false
        if (filters.scoreRange === "0-49") return candidate.overallScore < 50
        return candidate.overallScore >= min && candidate.overallScore <= max
      })
    }

    // Assessment type filter
    if (!filters.assessmentType.includes("all")) {
      filtered = filtered.filter((candidate) =>
        candidate.assessments.some((a) =>
          filters.assessmentType.includes(a.assessmentType)
        )
      )
    }

    // Date filter
    if (filters.dateRange && filters.dateRange !== "all") {
      const now = new Date()
      let cutoffDate: Date
      switch (filters.dateRange) {
        case "today":
          cutoffDate = new Date(now.setHours(0, 0, 0, 0))
          break
        case "7d":
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case "30d":
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        case "3m":
          cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          break
      default:
          cutoffDate = new Date(0)
      }
      filtered = filtered.filter(
        (candidate) => new Date(candidate.memberSince) >= cutoffDate
      )
    }

    return filtered
  }, [searchQuery, filters])

  const handleSelect = (id: string) => {
    setSelectedCandidates((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleViewProfile = (id: string) => {
    setSelectedProfileId(id)
  }

  const selectedProfile = useMemo(() => {
    if (!selectedProfileId) return null
    const candidate = mockCandidatesData.find((c) => c.id === selectedProfileId)
    if (!candidate) return null
    return convertToGlobalProfile(candidate, stats.avgScore)
  }, [selectedProfileId, stats.avgScore])

  const currentProfileIndex = useMemo(() => {
    if (!selectedProfileId) return -1
    return filteredCandidates.findIndex((c) => c.id === selectedProfileId)
  }, [selectedProfileId, filteredCandidates])

  const handlePreviousProfile = () => {
    if (currentProfileIndex > 0) {
      setSelectedProfileId(filteredCandidates[currentProfileIndex - 1].id)
    }
  }

  const handleNextProfile = () => {
    if (currentProfileIndex < filteredCandidates.length - 1) {
      setSelectedProfileId(filteredCandidates[currentProfileIndex + 1].id)
    }
  }

  const handleEmailSelected = () => {
    console.log("Email selected:", Array.from(selectedCandidates))
  }

  const handleExport = () => {
    console.log("Export candidates")
  }

  const handleCopyEmails = () => {
    const emails = Array.from(selectedCandidates)
      .map((id) => {
        const candidate = mockCandidatesData.find((c) => c.id === id)
        return candidate?.email
      })
      .filter(Boolean)
      .join(", ")
    navigator.clipboard.writeText(emails)
    console.log("Emails copied:", emails)
  }

  const handleAddToFavorites = () => {
    console.log("Add to favorites:", Array.from(selectedCandidates))
  }

  const handleArchive = () => {
    console.log("Archive selected:", Array.from(selectedCandidates))
    setSelectedCandidates(new Set())
  }

  const handleDelete = () => {
    if (confirm(`Delete ${selectedCandidates.size} candidate(s)?`)) {
      console.log("Delete selected:", Array.from(selectedCandidates))
      setSelectedCandidates(new Set())
    }
  }

  const handleClearFilters = () => {
    setFilters({ status: ["all"], scoreRange: null, dateRange: null, assessmentType: ["all"] })
    setSearchQuery("")
  }

  // Determine empty state type
  const getEmptyStateType = (): "no-candidates" | "no-results" | "filtered-out" | null => {
    if (mockCandidatesData.length === 0) return "no-candidates"
    if (filteredCandidates.length === 0 && searchQuery) return "no-results"
    if (filteredCandidates.length === 0) return "filtered-out"
    return null
  }

  const emptyStateType = getEmptyStateType()

  return (
    <div className="min-h-screen bg-mint-50 pb-12">
      {/* Header with Stats */}
      <CandidatesHeader
        stats={stats}
        selectedCount={selectedCandidates.size}
        onEmailSelected={handleEmailSelected}
        onExport={handleExport}
      />

      {/* Search and Filters */}
      <CandidatesSearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentView={viewMode}
        onViewChange={setViewMode}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Main Content */}
      <div className="px-8">
        {emptyStateType ? (
          <CandidatesEmptyState
            type={emptyStateType}
            searchQuery={searchQuery}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <>
            {/* Cards View */}
            {viewMode === "cards" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {filteredCandidates.map((candidate, index) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    index={index}
                    isSelected={selectedCandidates.has(candidate.id)}
                    onSelect={handleSelect}
                    onViewProfile={handleViewProfile}
                    platformAvgScore={stats.avgScore}
                  />
                ))}
            </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 bg-[#E8FAF0] border-b-2 border-[#C9F4D4] font-semibold text-sm uppercase text-[#4A9A6A]">
                  <div className="col-span-1">Select</div>
                  <div className="col-span-4">Candidate</div>
                  <div className="col-span-3">Assessment</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Score</div>
                </div>
                {filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b border-[#E8FAF0] hover:bg-[#E8FAF0] transition-colors"
                  >
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedCandidates.has(candidate.id)}
                        onChange={() => handleSelect(candidate.id)}
                        className="w-5 h-5 rounded border-2 border-[#C9F4D4]"
                      />
                    </div>
                    <div className="col-span-4">
                      <div className="font-semibold text-[#1E5A3B]">{candidate.name}</div>
                      <div className="text-sm text-[#4A9A6A]">{candidate.email}</div>
                      <div className="text-xs text-[#6B7280]">
                        {candidate.assessments.length} assessment{candidate.assessments.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                    <div className="col-span-3 text-sm text-[#6B7280]">
                      {candidate.latestAssessment.assessmentTitle}
                    </div>
                    <div className="col-span-2">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor:
                            candidate.status === "completed"
                              ? "rgba(16, 185, 129, 0.1)"
                              : candidate.status === "active"
                              ? "rgba(245, 158, 11, 0.1)"
                              : "rgba(107, 114, 128, 0.1)",
                          color:
                            candidate.status === "completed"
                              ? "#10B981"
                              : candidate.status === "active"
                              ? "#F59E0B"
                              : "#6B7280",
                        }}
                      >
                      {candidate.status}
                      </span>
                    </div>
                    <div className="col-span-2">
                      {candidate.overallScore > 0 ? (
                        <span className="font-bold text-[#1E5A3B]">
                          {candidate.overallScore}%
                        </span>
                      ) : (
                        <span className="text-[#6B7280]">-</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Board View */}
            {viewMode === "board" && (
              <div className="flex gap-6 overflow-x-auto pb-6">
                {["pending", "active", "completed", "inactive"].map((status) => {
                  const statusCandidates = filteredCandidates.filter((c) => c.status === status)
                  return (
                    <div
                      key={status}
                      className="min-w-[320px] rounded-2xl p-4"
                      style={{
                        backgroundColor: "rgba(232, 250, 240, 0.2)",
                        border: "2px dashed #C9F4D4",
                      }}
                    >
                      <div className="font-bold text-[#1E5A3B] mb-4 flex items-center justify-between">
                        <span className="capitalize">{status}</span>
                        <span className="text-sm font-normal text-[#4A9A6A]">
                          ({statusCandidates.length})
                        </span>
                      </div>
                      <div className="space-y-3">
                        {statusCandidates.map((candidate) => (
                          <div
                            key={candidate.id}
                            className="bg-white rounded-xl p-4 border-2 border-[#E8FAF0] hover:border-[#C9F4D4] transition-colors cursor-pointer"
                          >
                            <div className="font-semibold text-[#1E5A3B] mb-1">
                              {candidate.name}
                            </div>
                            <div className="text-sm text-[#4A9A6A] mb-2">{candidate.email}</div>
                            {candidate.overallScore > 0 && (
                              <div className="text-lg font-bold text-[#1E5A3B]">
                                {candidate.overallScore}%
                              </div>
                            )}
                            <div className="text-xs text-[#6B7280] mt-1">
                              {candidate.assessments.length} test{candidate.assessments.length !== 1 ? "s" : ""}
                            </div>
                          </div>
                        ))}
                      </div>
                </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bulk Actions Floating Bar */}
      <BulkActions
        selectedCount={selectedCandidates.size}
        onEmail={handleEmailSelected}
        onExport={handleExport}
        onCopyEmails={handleCopyEmails}
        onAddToFavorites={handleAddToFavorites}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onClear={() => setSelectedCandidates(new Set())}
      />

      {/* Global Candidate Profile */}
      {selectedProfile && (
        <GlobalCandidateProfileComponent
          candidate={selectedProfile}
          isOpen={!!selectedProfileId}
          onClose={() => setSelectedProfileId(null)}
          onPrevious={handlePreviousProfile}
          onNext={handleNextProfile}
          hasPrevious={currentProfileIndex > 0}
          hasNext={currentProfileIndex < filteredCandidates.length - 1}
        />
      )}
    </div>
  )
}
