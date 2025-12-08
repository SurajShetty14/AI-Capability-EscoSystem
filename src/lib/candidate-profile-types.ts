export interface CandidateProfile {
  // Basic info
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  memberSince: string
  location?: string
  timezone?: string

  // Assessment specific
  assessmentId: string
  assessmentTitle: string
  status: "completed" | "in-progress" | "pending" | "failed"

  // Performance
  finalScore: number
  timeTaken: number // minutes
  questionsCompleted: number
  questionsTotal: number
  rank: number // percentile
  platformAverage: number

  // Breakdown
  scoreBreakdown: {
    mcq: { score: number; total: number; percentage: number; time: number }
    coding: { score: number; total: number; percentage: number; time: number }
    subjective: { score: number; total: number; percentage: number; time: number }
  }

  // Questions
  questions: CandidateQuestionAnswer[]

  // Timeline
  events: AssessmentEvent[]

  // Proctoring
  proctoring?: ProctoringSession

  // Analytics
  analytics: {
    scoreProgression: DataPoint[]
    timeDistribution: DataPoint[]
    topicPerformance: TopicScore[]
    difficultyAnalysis: DifficultyBreakdown
    comparison: ComparisonData
    aiInsights: AIInsights
  }

  // Assessment events
  invitedAt?: string
  startedAt?: string
  completedAt?: string
}

export interface CandidateQuestionAnswer {
  questionId: string
  questionNumber: number
  questionText: string
  questionType: "mcq" | "coding" | "subjective"
  difficulty: "easy" | "medium" | "hard"
  points: number

  candidateAnswer?: string
  correctAnswer?: string
  isCorrect: boolean
  isPartiallyCorrect?: boolean

  score: number
  maxScore: number
  timeTaken: number // seconds

  // For MCQ
  selectedOption?: string
  options?: { id: string; text: string; isCorrect: boolean }[]

  // For coding
  code?: string
  testResults?: TestCaseResult[]
  attempts?: number

  // For subjective
  answerText?: string
  feedback?: string
}

export interface TestCaseResult {
  id: string
  name: string
  passed: boolean
  input: string
  expectedOutput: string
  actualOutput?: string
  error?: string
}

export interface AssessmentEvent {
  id: string
  timestamp: string
  type: "started" | "question-answered" | "question-viewed" | "tab-switch" | "completed" | "violation" | "system"
  title: string
  description: string
  metadata?: {
    ip?: string
    browser?: string
    questionId?: string
    questionNumber?: number
    answer?: string
    isCorrect?: boolean
    duration?: number
    destination?: string
  }
}

export interface ProctoringSession {
  riskScore: number
  status: "clean" | "minor_issues" | "flagged"
  recordingUrl?: string
  screenshots: string[]
  violations: ProctoringViolation[]
  behaviorAnalysis: {
    faceVisibility: number
    eyeTracking: number
    multipleFaces: number
    audioClean: boolean
    tabSwitches: number
    phoneDetection: number
    copyPaste: number
  }
}

export interface ProctoringViolation {
  id: string
  timestamp: string
  type: "tab_switch" | "no_face" | "multiple_faces" | "phone" | "voice"
  severity: "low" | "medium" | "high"
  description: string
  screenshot?: string
  videoClip?: string
  duration?: number
  resolved: boolean
}

export interface DataPoint {
  x: string | number
  y: number
  label?: string
}

export interface TopicScore {
  topic: string
  score: number
  questions: number
}

export interface DifficultyBreakdown {
  easy: { score: number; total: number; percentage: number }
  medium: { score: number; total: number; percentage: number }
  hard: { score: number; total: number; percentage: number }
}

export interface ComparisonData {
  overall: { candidate: number; average: number; difference: number }
  speed: { candidate: number; average: number; difference: number }
  accuracy: { candidate: number; average: number; difference: number }
  percentiles: {
    overall: number
    mcq: number
    coding: number
    timeEfficiency: number
  }
}

export interface AIInsights {
  strengths: string[]
  weaknesses: string[]
  recommendation: string
  similarCandidates?: Array<{
    id: string
    name: string
    avatar?: string
    score: number
  }>
}

