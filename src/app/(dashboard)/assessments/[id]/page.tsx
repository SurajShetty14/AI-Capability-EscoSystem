"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AssessmentHeader } from "@/components/assessments/detail/AssessmentHeader"
import { OverviewTab } from "@/components/assessments/detail/OverviewTab"
import { QuestionsTab } from "@/components/assessments/detail/QuestionsTab"
import { CandidatesTab } from "@/components/assessments/detail/CandidatesTab"
import { AnalyticsTab } from "@/components/assessments/detail/AnalyticsTab"
import { SettingsTab } from "@/components/assessments/detail/SettingsTab"
import { MonitoringTab } from "@/components/assessments/detail/MonitoringTab"
import { AssessmentDetail } from "@/lib/assessment-detail-types"

// Mock data - replace with API call
const mockAssessmentDetail: AssessmentDetail = {
  id: "1",
  title: "Full Stack Developer Assessment",
  description: "Comprehensive assessment for full stack developers covering React, TypeScript, Node.js, and system design",
  type: "assessment",
  status: "active",
  createdBy: {
    id: "user1",
    name: "Sarah Chen",
    avatar: undefined,
  },
  createdAt: "2024-01-15",
  updatedAt: "2024-01-15T14:30:00Z",
  lastUpdated: "2 hours ago",
  config: {
    duration: 90,
    passingScore: 70,
    allowResume: true,
    randomizeQuestions: false,
    showResultsImmediately: false,
    proctoring: {
      enabled: true,
      screenshot: true,
      tabSwitching: true,
      copyPaste: true,
      webcam: false,
      screenRecording: false,
    },
  },
  questions: [
    {
      id: "q1",
      number: 1,
      type: "mcq",
      title: "What is the Virtual DOM?",
      content: "What is the Virtual DOM in React?",
      difficulty: "medium",
      points: 10,
      options: [
        { id: "a", text: "A real DOM element", isCorrect: false },
        { id: "b", text: "A lightweight copy of DOM in memory", isCorrect: true },
        { id: "c", text: "A browser API", isCorrect: false },
        { id: "d", text: "A React component", isCorrect: false },
      ],
      metrics: {
        correctRate: 78,
        averageScore: 78,
        averageTime: 83,
        answerDistribution: {
          A: 15,
          B: 78,
          C: 7,
          D: 0,
        },
      },
    },
    {
      id: "q2",
      number: 2,
      type: "coding",
      title: "Implement a custom React Hook",
      content: "Write a custom React hook called useDebounce that delays the execution of a function until after a specified delay.",
      difficulty: "hard",
      points: 20,
      timeLimit: 30,
      testCases: [
        { id: "t1", input: "test", expectedOutput: "test", isVisible: true },
        { id: "t2", input: "test2", expectedOutput: "test2", isVisible: true },
        { id: "t3", input: "test3", expectedOutput: "test3", isVisible: false },
      ],
      metrics: {
        correctRate: 65,
        averageScore: 65,
        averageTime: 1200,
      },
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "System Design"],
  assessmentLink: "https://assessai.com/take/abc123xyz",
  metrics: {
    totalCandidates: 45,
    inProgress: 12,
    inProgressLive: 3,
    completed: 28,
    averageScore: 78.5,
    averageTime: 150, // 2.5 hours
    passRate: 82,
    completionRate: 62,
  },
  performance: {
    scoreDistribution: {
      excellent: 8,
      good: 15,
      average: 5,
      poor: 0,
    },
    questionBreakdown: {
      mcq: { average: 85, count: 10 },
      coding: { average: 72, count: 5 },
      subjective: { average: 68, count: 3 },
    },
    topPerformers: [
      {
        id: "c1",
        name: "Alice Williams",
        email: "alice@example.com",
        score: 95,
        timeSpent: 135,
        status: "completed",
        rank: 1,
        completedAt: "2024-01-10T14:30:00Z",
      },
      {
        id: "c2",
        name: "Bob Johnson",
        email: "bob@example.com",
        score: 92,
        timeSpent: 165,
        status: "completed",
        rank: 2,
        completedAt: "2024-01-10T15:00:00Z",
      },
    ],
  },
  recentActivity: [
    {
      id: "a1",
      type: "completed",
      candidate: { id: "c1", name: "John Doe", avatar: undefined },
      score: 85,
      timestamp: "2024-01-15T12:00:00Z",
      timeAgo: "2 hours ago",
    },
    {
      id: "a2",
      type: "started",
      candidate: { id: "c2", name: "Jane Smith", avatar: undefined },
      progress: 45,
      timestamp: "2024-01-15T11:00:00Z",
      timeAgo: "3 hours ago",
    },
  ],
}

type TabType = "overview" | "questions" | "candidates" | "analytics" | "settings" | "monitoring"

export default function AssessmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [assessment, setAssessment] = useState<AssessmentDetail>(mockAssessmentDetail)

  // In production, fetch assessment data based on params.id
  // useEffect(() => {
  //   fetchAssessmentDetail(params.id as string).then(setAssessment)
  // }, [params.id])

  const handleBack = () => {
    router.push("/dashboard/assessments")
  }

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab assessment={assessment} />
      case "questions":
        return <QuestionsTab assessment={assessment} />
      case "candidates":
        return <CandidatesTab assessment={assessment} />
      case "analytics":
        return <AnalyticsTab assessment={assessment} />
      case "monitoring":
        return <MonitoringTab assessment={assessment} />
      case "settings":
        return <SettingsTab assessment={assessment} onUpdate={setAssessment} />
      default:
        return <OverviewTab assessment={assessment} />
    }
  }

  return (
    <div className="min-h-screen bg-mint-50">
      <AssessmentHeader
        assessment={assessment}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onBack={handleBack}
      />
      <main className="max-w-[1600px] mx-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </main>
    </div>
  )
}

