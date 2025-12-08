import { EnhancedCandidate, CandidateAssessment } from "./candidate-utils"
import { GlobalCandidateProfile, CandidateAssessment as GlobalCandidateAssessment, AggregateSkill, TimelineEvent, DataPoint, TypePerformance, SkillScore, BenchmarkData, AIInsights, Note } from "./global-candidate-profile-types"

export function convertToGlobalProfile(candidate: EnhancedCandidate, platformAvgScore: number = 74.5): GlobalCandidateProfile {
  // Convert assessments
  const assessments: GlobalCandidateAssessment[] = candidate.assessments.map((assess, idx) => ({
    id: `assess-${idx}`,
    assessmentId: assess.assessmentId,
    assessmentTitle: assess.assessmentTitle,
    assessmentType: assess.assessmentType as "assessment" | "dsa" | "cloud" | "ai",
    score: assess.score || 0,
    status: assess.status as "completed" | "in-progress" | "pending" | "failed",
    completedAt: assess.completedAt,
    timeSpent: assess.timeSpent,
    rank: candidate.percentileRank,
    breakdown: {
      mcq: {
        score: assess.breakdown?.mcq || 0,
        total: 20,
        percentage: ((assess.breakdown?.mcq || 0) / 20) * 100,
      },
      coding: {
        score: assess.breakdown?.coding || 0,
        total: 5,
        percentage: ((assess.breakdown?.coding || 0) / 5) * 100,
      },
      subjective: {
        score: assess.breakdown?.subjective || 0,
        total: 3,
        percentage: ((assess.breakdown?.subjective || 0) / 3) * 100,
      },
    },
    proctoring: {
      riskScore: 15,
      violations: 0,
    },
    passed: (assess.score || 0) >= 70,
    passingScore: 70,
  }))

  // Extract skills from assessments
  const skillMap = new Map<string, { scores: number[]; assessments: { assessmentId: string; assessmentTitle: string; score: number }[] }>()
  
  candidate.assessments.forEach((assess) => {
    // Extract skills from assessment title/type
    const skills = extractSkillsFromAssessment(assess)
    skills.forEach((skill) => {
      if (!skillMap.has(skill)) {
        skillMap.set(skill, { scores: [], assessments: [] })
      }
      const skillData = skillMap.get(skill)!
      if (assess.score) {
        skillData.scores.push(assess.score)
        skillData.assessments.push({
          assessmentId: assess.assessmentId,
          assessmentTitle: assess.assessmentTitle,
          score: assess.score,
        })
      }
    })
  })

  const skills: AggregateSkill[] = Array.from(skillMap.entries()).map(([skillName, data]) => {
    const overallScore = data.scores.length > 0 ? data.scores.reduce((a, b) => a + b, 0) / data.scores.length : 0
    return {
      skillName,
      overallScore,
      proficiencyLevel: getProficiencyLevel(overallScore),
      assessments: data.assessments,
      trend: candidate.performanceTrend,
      trendPercentage: candidate.performanceTrend === "improving" ? 5 : candidate.performanceTrend === "declining" ? -3 : 0,
      relatedQuestions: [],
    }
  })

  // Create timeline
  const timeline: TimelineEvent[] = []
  
  candidate.assessments.forEach((assess) => {
    if (assess.appliedAt) {
      timeline.push({
        id: `timeline-${assess.assessmentId}-invite`,
        date: assess.appliedAt,
        timestamp: assess.appliedAt,
        type: "invitation-sent",
        title: "Invitation Sent",
        description: `Invited to ${assess.assessmentTitle}`,
        metadata: {
          assessmentId: assess.assessmentId,
          assessmentTitle: assess.assessmentTitle,
          by: "System",
          role: "Recruiter",
        },
      })
    }
    
    if (assess.status === "in-progress") {
      timeline.push({
        id: `timeline-${assess.assessmentId}-start`,
        date: assess.appliedAt || new Date().toISOString(),
        timestamp: assess.appliedAt || new Date().toISOString(),
        type: "assessment-started",
        title: "Assessment Started",
        description: `Started ${assess.assessmentTitle}`,
        metadata: {
          assessmentId: assess.assessmentId,
          assessmentTitle: assess.assessmentTitle,
        },
      })
    }
    
    if (assess.completedAt) {
      timeline.push({
        id: `timeline-${assess.assessmentId}-complete`,
        date: assess.completedAt,
        timestamp: assess.completedAt,
        type: "assessment-completed",
        title: "Assessment Completed",
        description: `Completed ${assess.assessmentTitle}`,
        metadata: {
          assessmentId: assess.assessmentId,
          assessmentTitle: assess.assessmentTitle,
          score: assess.score || 0,
        },
      })
    }
  })

  // Add profile creation
  timeline.push({
    id: `timeline-${candidate.id}-created`,
    date: candidate.memberSince,
    timestamp: candidate.memberSince,
    type: "profile-created",
    title: "Profile Created",
    description: "Candidate joined platform",
    metadata: {
      by: "System",
      role: "Admin",
    },
  })

  // Sort timeline by date
  timeline.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Score progression
  const scoreProgression: DataPoint[] = assessments
    .filter((a) => a.status === "completed" && a.completedAt)
    .sort((a, b) => new Date(a.completedAt!).getTime() - new Date(b.completedAt!).getTime())
    .map((a, idx) => ({
      x: new Date(a.completedAt!).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      y: a.score,
      label: a.assessmentTitle,
    }))

  // Performance by type
  const typeMap = new Map<string, { scores: number[]; count: number }>()
  assessments.forEach((a) => {
    if (!typeMap.has(a.assessmentType)) {
      typeMap.set(a.assessmentType, { scores: [], count: 0 })
    }
    const data = typeMap.get(a.assessmentType)!
    if (a.status === "completed") {
      data.scores.push(a.score)
      data.count++
    }
  })

  const performanceByType: TypePerformance[] = Array.from(typeMap.entries()).map(([type, data]) => ({
    type: type as "assessment" | "dsa" | "cloud" | "ai",
    averageScore: data.scores.length > 0 ? data.scores.reduce((a, b) => a + b, 0) / data.scores.length : 0,
    count: data.count,
  }))

  // Skill radar
  const skillRadar: SkillScore[] = skills.slice(0, 5).map((s) => ({
    skill: s.skillName,
    score: s.overallScore,
  }))

  // Benchmarking
  const benchmarking: BenchmarkData = {
    platformAverage: platformAvgScore,
    seniorBenchmark: 82,
    difference: candidate.overallScore - platformAvgScore,
    percentile: candidate.percentileRank,
  }

  // AI Insights
  const aiInsights: AIInsights = {
    strengths: skills
      .filter((s) => s.overallScore >= 85)
      .slice(0, 3)
      .map((s) => `Consistently strong in ${s.skillName} (${s.overallScore}% avg)`),
    weaknesses: skills
      .filter((s) => s.overallScore < 70)
      .slice(0, 2)
      .map((s) => `${s.skillName} needs focus (${s.overallScore}%)`),
    recommendations: [
      candidate.overallScore >= 85
        ? "Strong fit for Senior Frontend roles"
        : candidate.overallScore >= 70
        ? "Good fit for Mid-level positions"
        : "Consider for Junior roles or provide training",
      candidate.performanceTrend === "improving"
        ? "Quick learner - recovering from previous dip"
        : candidate.performanceTrend === "declining"
        ? "Performance declining - needs attention"
        : "Stable performance",
      candidate.overallScore >= 90
        ? "Top performer - prioritize for hiring"
        : "Monitor progress",
    ],
    careerLevel: candidate.overallScore >= 85 ? "Senior (4-6 years equivalent)" : candidate.overallScore >= 70 ? "Mid-level (2-4 years)" : "Junior (0-2 years)",
    recommendedRoles: candidate.overallScore >= 85 ? ["Senior React Dev", "Tech Lead"] : candidate.overallScore >= 70 ? ["Mid-level Developer", "Full Stack Dev"] : ["Junior Developer", "Associate Engineer"],
  }

  return {
    id: candidate.id,
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    avatar: undefined,
    memberSince: candidate.memberSince,
    location: "New York, USA",
    timezone: "EST -05:00",
    status: candidate.overallScore >= 90 ? "top-talent" : candidate.status === "completed" ? "active" : candidate.status === "active" ? "in-pipeline" : "active",
    appliedPositions: 3,
    totalAssessments: candidate.assessments.length,
    averageScore: candidate.overallScore,
    overallRank: candidate.percentileRank,
    completionRate: candidate.completionRate,
    performanceTrend: candidate.performanceTrend,
    trendPercentage: candidate.performanceTrend === "improving" ? 8 : candidate.performanceTrend === "declining" ? -5 : 0,
    assessments,
    skills,
    timeline,
    analytics: {
      scoreProgression,
      performanceByType,
      skillRadar,
      benchmarking,
      aiInsights,
    },
    tags: candidate.overallScore >= 90 ? ["Top Performer", "Senior Level"] : candidate.overallScore >= 80 ? ["Strong Candidate"] : [],
    notes: [],
  }
}

function extractSkillsFromAssessment(assess: CandidateAssessment): string[] {
  const skills: string[] = []
  const title = assess.assessmentTitle.toLowerCase()
  
  if (title.includes("react") || title.includes("frontend")) skills.push("React")
  if (title.includes("node") || title.includes("backend")) skills.push("Node.js")
  if (title.includes("system design") || title.includes("architecture")) skills.push("System Design")
  if (title.includes("aws") || title.includes("cloud")) skills.push("Cloud (AWS)")
  if (title.includes("dsa") || title.includes("coding") || title.includes("algorithm")) skills.push("DSA")
  if (title.includes("performance")) skills.push("Performance Optimization")
  if (title.includes("test") || title.includes("testing")) skills.push("Testing Strategies")
  
  // Default skills if none found
  if (skills.length === 0) {
    if (assess.assessmentType === "dsa") skills.push("DSA")
    else if (assess.assessmentType === "cloud") skills.push("Cloud (AWS)")
    else if (assess.assessmentType === "ai") skills.push("AI/ML")
    else skills.push("Full Stack")
  }
  
  return skills
}

function getProficiencyLevel(score: number): "expert" | "advanced" | "intermediate" | "basic" | "needs-work" {
  if (score >= 90) return "expert"
  if (score >= 80) return "advanced"
  if (score >= 70) return "intermediate"
  if (score >= 60) return "basic"
  return "needs-work"
}


