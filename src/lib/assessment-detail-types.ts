export interface AssessmentDetail {
  id: string
  title: string
  description: string
  type: "assessment" | "dsa" | "cloud" | "ai"
  status: "active" | "draft" | "paused" | "archived"
  createdBy: {
    id: string
    name: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
  lastUpdated: string // Human readable

  // Configuration
  config: {
    duration: number // minutes
    passingScore: number // percentage
    allowResume: boolean
    randomizeQuestions: boolean
    showResultsImmediately: boolean
    proctoring: {
      enabled: boolean
      screenshot: boolean
      tabSwitching: boolean
      copyPaste: boolean
      webcam: boolean
      screenRecording: boolean
    }
  }

  // Content
  questions: Question[]
  skills: string[]
  assessmentLink: string

  // Metrics
  metrics: {
    totalCandidates: number
    inProgress: number
    inProgressLive?: number
    completed: number
    averageScore: number
    averageTime: number // minutes
    passRate: number
    completionRate: number
  }

  // Performance
  performance: {
    scoreDistribution: {
      excellent: number // 90-100%
      good: number // 70-89%
      average: number // 50-69%
      poor: number // <50%
    }
    questionBreakdown: {
      mcq: { average: number; count: number }
      coding: { average: number; count: number }
      subjective: { average: number; count: number }
    }
    topPerformers: CandidatePerformance[]
  }

  // Recent activity
  recentActivity: Activity[]
}

export interface Question {
  id: string
  number: number
  type: "mcq" | "coding" | "subjective" | "pseudo-code"
  title: string
  content: string
  difficulty: "easy" | "medium" | "hard"
  points: number
  timeLimit?: number // minutes

  // For MCQ
  options?: {
    id: string
    text: string
    isCorrect: boolean
  }[]

  // For Coding
  testCases?: TestCase[]
  starterCode?: string

  // Performance metrics
  metrics?: {
    correctRate: number
    averageScore: number
    averageTime: number // seconds
    answerDistribution?: Record<string, number>
  }
}

export interface TestCase {
  id: string
  input: string
  expectedOutput: string
  isVisible: boolean
}

export interface CandidatePerformance {
  id: string
  name: string
  email: string
  avatar?: string
  score: number
  timeSpent: number // minutes
  status: "completed" | "in-progress" | "failed"
  rank: number
  completedAt?: string
}

export interface Activity {
  id: string
  type: "completed" | "started" | "invited"
  candidate: {
    id: string
    name: string
    avatar?: string
  }
  score?: number
  progress?: number
  timestamp: string
  timeAgo: string
}

