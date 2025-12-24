"use client"

import { useState, useMemo, useEffect } from "react"
import { AssessmentsHeader } from "@/components/assessments/AssessmentsHeader"
import { SearchAndFilters } from "@/components/assessments/SearchAndFilters"
import { AssessmentCard } from "@/components/assessments/AssessmentCard"
import { EmptyState } from "@/components/assessments/EmptyState"
import { Pagination } from "@/components/assessments/Pagination"
import { Assessment } from "@/lib/types"

// Mock data - replace with actual API call
const mockAssessments: Assessment[] = [
  {
    id: "1",
    name: "Full Stack Developer Assessment",
    status: "active",
    type: "ai-generated",
    questionCount: 25,
    candidateCount: 45,
    inProgressCount: 12,
    averageScore: 78.5,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    createdBy: "user1",
  },
  {
    id: "2",
    name: "Senior Backend Engineer - System Design",
    status: "active",
    type: "template",
    questionCount: 30,
    candidateCount: 32,
    inProgressCount: 8,
    averageScore: 82.3,
    createdAt: "2024-01-14",
    updatedAt: "2024-01-19",
    createdBy: "user1",
  },
  {
    id: "3",
    name: "React Developer Assessment",
    status: "draft",
    type: "manual",
    questionCount: 20,
    candidateCount: 0,
    inProgressCount: 0,
    averageScore: 0,
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
    createdBy: "user1",
  },
  {
    id: "4",
    name: "Cloud Architecture Assessment - AWS",
    status: "active",
    type: "ai-generated",
    questionCount: 35,
    candidateCount: 28,
    inProgressCount: 5,
    averageScore: 88.2,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-18",
    createdBy: "user1",
  },
  {
    id: "5",
    name: "Data Science & ML Engineer",
    status: "active",
    type: "ai-generated",
    questionCount: 40,
    candidateCount: 19,
    inProgressCount: 3,
    averageScore: 75.8,
    createdAt: "2024-01-11",
    updatedAt: "2024-01-17",
    createdBy: "user1",
  },
  {
    id: "6",
    name: "DevOps Engineer Assessment",
    status: "archived",
    type: "template",
    questionCount: 28,
    candidateCount: 15,
    inProgressCount: 0,
    averageScore: 80.5,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-16",
    createdBy: "user1",
  },
  {
    id: "7",
    name: "Frontend Developer - Vue.js",
    status: "draft",
    type: "manual",
    questionCount: 22,
    candidateCount: 0,
    inProgressCount: 0,
    averageScore: 0,
    createdAt: "2024-01-09",
    updatedAt: "2024-01-09",
    createdBy: "user1",
  },
  {
    id: "8",
    name: "Python Developer Assessment",
    status: "active",
    type: "ai-generated",
    questionCount: 30,
    candidateCount: 52,
    inProgressCount: 18,
    averageScore: 79.1,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-15",
    createdBy: "user1",
  },
  {
    id: "9",
    name: "Mobile Developer - React Native",
    status: "archived",
    type: "template",
    questionCount: 25,
    candidateCount: 8,
    inProgressCount: 0,
    averageScore: 72.3,
    createdAt: "2023-12-20",
    updatedAt: "2024-01-05",
    createdBy: "user1",
  },
]

export default function AssessmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    status: ["all"] as string[],
    dateRange: null as string | null,
    type: ["all"] as string[],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Calculate stats
  const stats = useMemo(() => {
    const total = mockAssessments.length
    const active = mockAssessments.filter((a) => a.status === "active").length
    const drafts = mockAssessments.filter((a) => a.status === "draft").length
    const candidates = mockAssessments.reduce((sum, a) => sum + (a.candidateCount || 0), 0)
    
    // Calculate overall average score across all assessments
    const scoresWithValues = mockAssessments
      .map((a) => a.averageScore)
      .filter((s): s is number => s !== null && s !== undefined && s > 0)
    const overallScore =
      scoresWithValues.length > 0
        ? scoresWithValues.reduce((sum, score) => sum + score, 0) / scoresWithValues.length
        : 0

    return { total, active, drafts, candidates, overallScore }
  }, [])

  // Filter and search assessments
  const filteredAssessments = useMemo(() => {
    let filtered = [...mockAssessments]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (assessment) =>
          assessment.name.toLowerCase().includes(query) ||
          assessment.role?.toLowerCase().includes(query)
      )
    }

    // Status filter
    if (!filters.status.includes("all")) {
      filtered = filtered.filter((assessment) => filters.status.includes(assessment.status))
    }

    // Type filter
    if (!filters.type.includes("all")) {
      filtered = filtered.filter((assessment) => {
        const typeMap: Record<string, string> = {
          assessment: "ai-generated",
          dsa: "template",
          cloud: "ai-generated",
          ai: "ai-generated",
        }
        return filters.type.some((t) => assessment.type === typeMap[t] || assessment.type === t)
      })
    }

    // Date filter (simplified - would need proper date range logic)
    if (filters.dateRange && filters.dateRange !== "all") {
      const now = new Date()
      const daysAgo = filters.dateRange === "7d" ? 7 : filters.dateRange === "30d" ? 30 : 90
      const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      filtered = filtered.filter((assessment) => new Date(assessment.createdAt) >= cutoffDate)
    }

    return filtered
  }, [searchQuery, filters])

  // Pagination
  const totalPages = Math.ceil(filteredAssessments.length / itemsPerPage)
  const paginatedAssessments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredAssessments.slice(start, start + itemsPerPage)
  }, [filteredAssessments, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, searchQuery])

  return (
    <div className="min-h-screen bg-mint-50 pb-12">
      {/* Header with Stats */}
      <AssessmentsHeader stats={stats} />

      {/* Search and Filters */}
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Main Content */}
      <div className="px-8">
        {paginatedAssessments.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Assessment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedAssessments.map((assessment, index) => (
                <AssessmentCard
                  key={assessment.id}
                  assessment={assessment}
                  index={index}
                  isFeatured={index === 0 && assessment.status === "active"}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredAssessments.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
