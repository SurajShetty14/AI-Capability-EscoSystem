export interface GlobalCandidateProfile {
  // Basic info
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string

  // Platform data
  memberSince: string
  location?: string
  timezone?: string

  // Status
  status: "active" | "in-pipeline" | "hired" | "archived" | "top-talent"
  appliedPositions: number

  // Aggregate metrics
  totalAssessments: number
  averageScore: number // across all
  overallRank: number // percentile
  completionRate: number // %

  // Trend data
  performanceTrend: "improving" | "declining" | "stable"
  trendPercentage: number

  // All assessments
  assessments: CandidateAssessment[]

  // Skills aggregate
  skills: AggregateSkill[]

  // Complete timeline
  timeline: TimelineEvent[]

  // Analytics
  analytics: {
    scoreProgression: DataPoint[]
    performanceByType: TypePerformance[]
    skillRadar: SkillScore[]
    benchmarking: BenchmarkData
    aiInsights: AIInsights
  }

  // Hiring data
  tags: string[]
  notes: Note[]
}

export interface CandidateAssessment {
  id: string
  assessmentId: string
  assessmentTitle: string
  assessmentType: "assessment" | "dsa" | "cloud" | "ai"
  score: number
  status: "completed" | "in-progress" | "pending" | "failed"
  completedAt?: string
  timeSpent: number // minutes
  rank: number // percentile
  breakdown: {
    mcq: { score: number; total: number; percentage: number }
    coding: { score: number; total: number; percentage: number }
    subjective: { score: number; total: number; percentage: number }
  }
  proctoring?: {
    riskScore: number
    violations: number
  }
  passed: boolean
  passingScore: number
}

export interface AggregateSkill {
  skillName: string
  overallScore: number
  proficiencyLevel: "expert" | "advanced" | "intermediate" | "basic" | "needs-work"
  assessments: {
    assessmentId: string
    assessmentTitle: string
    score: number
  }[]
  trend: "improving" | "declining" | "stable"
  trendPercentage?: number
  relatedQuestions: QuestionPerformance[]
}

export interface QuestionPerformance {
  questionId: string
  questionText: string
  score: number
  maxScore: number
  isCorrect: boolean
}

export interface TimelineEvent {
  id: string
  date: string
  timestamp: string
  type: "assessment-started" | "assessment-completed" | "invitation-sent" | "profile-created" | "added-to-pool" | "status-changed" | "note-added" | "tag-added"
  title: string
  description: string
  metadata?: {
    assessmentId?: string
    assessmentTitle?: string
    score?: number
    by?: string
    role?: string
  }
}

export interface DataPoint {
  x: string | number
  y: number
  label?: string
}

export interface TypePerformance {
  type: "assessment" | "dsa" | "cloud" | "ai"
  averageScore: number
  count: number
}

export interface SkillScore {
  skill: string
  score: number
}

export interface BenchmarkData {
  platformAverage: number
  seniorBenchmark?: number
  difference: number
  percentile: number
}

export interface AIInsights {
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  careerLevel: string
  recommendedRoles: string[]
}

export interface Note {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
    role: string
  }
  createdAt: string
  isPrivate: boolean
}


