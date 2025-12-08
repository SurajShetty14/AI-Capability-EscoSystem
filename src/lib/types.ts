export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "recruiter" | "interviewer" | "viewer"
  avatar?: string
  phone?: string
  location?: string
  linkedin?: string
  github?: string
}

export interface Assessment {
  id: string
  name: string
  description?: string
  status: "draft" | "active" | "paused" | "archived"
  type: "ai-generated" | "template" | "manual"
  role?: string
  technologyStack?: string[]
  experienceLevel?: "junior" | "mid" | "senior"
  questionCount: number
  difficultyDistribution?: {
    easy: number
    medium: number
    hard: number
  }
  createdAt: string
  updatedAt: string
  createdBy: string
  candidateCount?: number
  inProgressCount?: number
  averageScore?: number
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  status: "pending" | "enrolled" | "in-progress" | "completed" | "failed"
  appliedDate: string
  assessmentId?: string
  assessmentName?: string
  score?: number
  percentile?: number
  timeSpent?: number
  location?: string
  linkedin?: string
  github?: string
  tags?: string[]
  notes?: Note[]
}

export interface Note {
  id: string
  content: string
  author: string
  authorName: string
  createdAt: string
}

export interface ActivityLog {
  id: string
  type: "candidate" | "admin" | "system" | "security"
  action: string
  description: string
  userId?: string
  userName?: string
  candidateId?: string
  candidateName?: string
  assessmentId?: string
  assessmentName?: string
  timestamp: string
  metadata?: Record<string, unknown>
  severity?: "info" | "warning" | "error" | "success"
}

export interface DashboardStats {
  totalAssessments: number
  activeCandidates: number
  completedThisMonth: number
  averageScore: number
  trends: {
    assessments: { value: number; isPositive: boolean }
    candidates: { value: number; isPositive: boolean }
    completed: { value: number; isPositive: boolean }
    score: { value: number; isPositive: boolean }
  }
}

export interface AnalyticsData {
  performanceTrend: {
    date: string
    completionRate: number
    avgScore: number
    passRate: number
  }[]
  candidateDistribution: {
    category: string
    count: number
    percentage: number
  }[]
  skillGapAnalysis: {
    skill: string
    strugglingPercentage: number
  }[]
  topAssessments: {
    id: string
    name: string
    avgScore: number
    candidateCount: number
    passRate: number
  }[]
}

export interface Report {
  id: string
  title: string
  type: string
  status: "completed" | "generating" | "failed"
  generatedAt: string
  generatedBy: string
  fileSize: string
  format: "pdf" | "excel" | "csv"
}

export interface DSACompetency {
  id: string
  name: string
  targetRole: string
  difficultyLevel: "beginner" | "intermediate" | "advanced" | "expert"
  description?: string
  topics: {
    id: string
    name: string
    weightage: number
    questionCount: number
    enabled: boolean
  }[]
  totalQuestions: number
  passingCriteria: {
    minimumScore: number
    mustPassAllTopics: boolean
    timeBonus: boolean
  }
  createdAt: string
  updatedAt: string
}

