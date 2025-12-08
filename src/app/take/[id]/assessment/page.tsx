"use client"

import { useParams, useRouter } from "next/navigation"
import { AssessmentDashboard } from "@/components/assessment-taking/AssessmentDashboard"

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id as string

  const handleSectionSelect = (sectionId: string) => {
    router.push(`/take/${assessmentId}/${sectionId}`)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <AssessmentDashboard assessmentId={assessmentId} onSectionSelect={handleSectionSelect} />
    </div>
  )
}

