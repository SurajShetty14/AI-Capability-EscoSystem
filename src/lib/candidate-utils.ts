export interface CandidateAssessment {
  assessmentId: string
  assessmentTitle: string
  assessmentType: "assessment" | "dsa" | "cloud" | "ai"
  score: number | null
  status: "pending" | "in-progress" | "completed" | "failed"
  appliedAt: Date | string
  completedAt?: Date | string
  timeSpent: number // minutes
  breakdown?: {
    mcq?: number
    coding?: number
    subjective?: number
  }
}

export interface EnhancedCandidate {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  memberSince: Date | string
  assessments: CandidateAssessment[]
  overallScore: number // Average across all
  percentileRank: number // 0-100
  performanceTrend: "improving" | "declining" | "stable"
  completionRate: number // % of assessments completed
  latestAssessment: CandidateAssessment
  status: "pending" | "active" | "completed" | "inactive"
}

export function calculateAverageScore(assessments: CandidateAssessment[]): number {
  const scores = assessments
    .map((a) => a.score)
    .filter((s): s is number => s !== null && s !== undefined && s > 0)
  if (scores.length === 0) return 0
  return scores.reduce((a, b) => a + b, 0) / scores.length
}

export function getPercentileRank(score: number, allScores: number[]): number {
  const sorted = [...allScores].sort((a, b) => b - a)
  const rank = sorted.findIndex((s) => s <= score) + 1
  return Math.round((rank / sorted.length) * 100)
}

export function getPerformanceTrend(
  assessments: CandidateAssessment[]
): "improving" | "declining" | "stable" {
  const scores = assessments
    .map((a) => a.score)
    .filter((s): s is number => s !== null && s !== undefined && s > 0)
    .reverse() // Most recent first

  if (scores.length < 2) return "stable"

  const recent = scores.slice(0, Math.min(3, scores.length))
  const older = scores.slice(3, Math.min(6, scores.length))

  if (older.length === 0) return "stable"

  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
  const olderAvg = older.reduce((a, b) => a + b, 0) / older.length

  const diff = recentAvg - olderAvg
  if (diff > 5) return "improving"
  if (diff < -5) return "declining"
  return "stable"
}

export function getScoreLabel(score: number): {
  label: string
  color: string
  gradient: string
} {
  if (score >= 90) {
    return {
      label: "Excellent",
      color: "#10B981",
      gradient: "linear-gradient(90deg, #10B981, #059669)",
    }
  }
  if (score >= 80) {
    return {
      label: "Very Good",
      color: "#3B82F6",
      gradient: "linear-gradient(90deg, #3B82F6, #2563EB)",
    }
  }
  if (score >= 70) {
    return {
      label: "Good",
      color: "#14B8A6",
      gradient: "linear-gradient(90deg, #14B8A6, #0D9488)",
    }
  }
  if (score >= 60) {
    return {
      label: "Average",
      color: "#F59E0B",
      gradient: "linear-gradient(90deg, #F59E0B, #D97706)",
    }
  }
  if (score >= 50) {
    return {
      label: "Below Average",
      color: "#F97316",
      gradient: "linear-gradient(90deg, #F97316, #EA580C)",
    }
  }
  return {
    label: "Poor",
    color: "#EF4444",
    gradient: "linear-gradient(90deg, #EF4444, #DC2626)",
  }
}

export function getCompletionRate(assessments: CandidateAssessment[]): number {
  if (assessments.length === 0) return 0
  const completed = assessments.filter((a) => a.status === "completed").length
  return Math.round((completed / assessments.length) * 100)
}

