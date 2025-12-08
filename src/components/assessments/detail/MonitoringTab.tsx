"use client"

import { AssessmentDetail } from "@/lib/assessment-detail-types"
import { LiveMonitoringDashboard } from "@/components/proctoring/LiveMonitoringDashboard"

interface MonitoringTabProps {
  assessment: AssessmentDetail
}

// Mock live candidates data
const mockLiveCandidates = [
  {
    id: "c1",
    name: "John Doe",
    email: "john.doe@example.com",
    currentQuestion: 5,
    totalQuestions: 18,
    elapsedTime: 2723, // 45:23
    flags: 0,
    status: "clean" as const,
  },
  {
    id: "c2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    currentQuestion: 12,
    totalQuestions: 18,
    elapsedTime: 3420, // 57:00
    flags: 0,
    status: "clean" as const,
  },
  {
    id: "c3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    currentQuestion: 8,
    totalQuestions: 18,
    elapsedTime: 2100, // 35:00
    flags: 2,
    status: "minor" as const,
    lastViolation: {
      type: "Tab switch",
      timestamp: "2:44 PM",
    },
  },
  {
    id: "c4",
    name: "Alice Williams",
    email: "alice@example.com",
    currentQuestion: 3,
    totalQuestions: 18,
    elapsedTime: 1200, // 20:00
    flags: 0,
    status: "clean" as const,
  },
]

export function MonitoringTab({ assessment }: MonitoringTabProps) {
  return <LiveMonitoringDashboard candidates={mockLiveCandidates} />
}

