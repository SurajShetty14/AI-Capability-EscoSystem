"use client"

import { useState } from "react"
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader"
import { KeyMetricsCards } from "@/components/analytics/KeyMetricsCards"
import { PerformanceTrends } from "@/components/analytics/PerformanceTrends"
import { CandidateDistribution } from "@/components/analytics/CandidateDistribution"
import { SkillGapAnalysis } from "@/components/analytics/SkillGapAnalysis"
import { AssessmentComparison } from "@/components/analytics/AssessmentComparison"
import { TimeDistribution } from "@/components/analytics/TimeDistribution"
import { TopPerformers } from "@/components/analytics/TopPerformers"
import { AIInsights } from "@/components/analytics/AIInsights"

// Mock data
const performanceData = [
  { date: "Jan 1", completionRate: 65, avgScore: 72, passRate: 58 },
  { date: "Jan 8", completionRate: 68, avgScore: 74, passRate: 60 },
  { date: "Jan 15", completionRate: 72, avgScore: 76, passRate: 62 },
  { date: "Jan 22", completionRate: 75, avgScore: 78, passRate: 65 },
  { date: "Jan 29", completionRate: 78, avgScore: 80, passRate: 68 },
]

const candidateDistribution = [
  { name: "Excellent", value: 456, color: "#10B981" },
  { name: "Good", value: 534, color: "#3B82F6" },
  { name: "Average", value: 189, color: "#F59E0B" },
  { name: "Poor", value: 68, color: "#EF4444" },
]

const skillGapData = [
  { skill: "System Design", score: 28, candidatesCount: 234 },
  { skill: "Advanced Algorithms", score: 35, candidatesCount: 189 },
  { skill: "DevOps Concepts", score: 42, candidatesCount: 156 },
  { skill: "Database Optimization", score: 48, candidatesCount: 134 },
  { skill: "Security Best Practices", score: 52, candidatesCount: 112 },
]

const assessmentComparison = [
  { name: "Full Stack", score: 85, candidates: 342 },
  { name: "DSA Challenge", score: 78, candidates: 289 },
  { name: "Cloud (AWS)", score: 92, candidates: 156 },
  { name: "React Advanced", score: 88, candidates: 201 },
]

const timeDistribution = [
  { range: "0-20", count: 45 },
  { range: "21-40", count: 234 },
  { range: "41-60", count: 342 },
  { range: "61-80", count: 289 },
  { range: "81-100", count: 156 },
  { range: "100+", count: 89 },
]

const topPerformers = [
  { rank: 1, name: "Alice Williams", score: 95, time: "2h 15m" },
  { rank: 2, name: "Bob Johnson", score: 92, time: "2h 45m" },
  { rank: 3, name: "Charlie Brown", score: 90, time: "2h 30m" },
  { rank: 4, name: "Diana Prince", score: 88, time: "2h 10m" },
  { rank: 5, name: "Eve Adams", score: 87, time: "3h 05m" },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("Last 30 days")

  const metrics = {
    totalTests: 1247,
    completionRate: 78,
    avgTime: 45,
    passRate: 68,
    avgScore: 74.5,
    activeNow: 24,
  }

  const handleRefresh = () => {
    console.log("Refreshing analytics...")
  }

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}...`)
  }

  const aiInsights = {
    warnings: [
      "System Design gap widening (+8% vs last month)",
      "Completion rate dropped 3% (investigate)",
      "Average time increased to 45min (from 40min)",
    ],
    positives: [
      "Pass rate improved 4%",
      "Average score trending up (+2.3%)",
      "More candidates completing assessments",
    ],
    recommendations: [
      "Focus training on System Design (72% gap)",
      "Review assessment difficulty (time increase)",
      "Celebrate improvement in pass rates",
    ],
  }

  return (
    <div className="min-h-screen bg-mint-50 pb-12 px-8 pt-8">
      {/* Header */}
      <AnalyticsHeader
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      {/* Key Metrics Cards */}
      <KeyMetricsCards metrics={metrics} />

      {/* Performance Trends */}
      <PerformanceTrends data={performanceData} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CandidateDistribution data={candidateDistribution} />
        <SkillGapAnalysis data={skillGapData} />
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AssessmentComparison data={assessmentComparison} />
        <TimeDistribution data={timeDistribution} peak="40-50 minutes" average={45} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TopPerformers performers={topPerformers} />
        <AIInsights totalAssessments={1247} timeRange={dateRange} trends={aiInsights} />
      </div>
    </div>
  )
}
