"use client"

import { useParams, useRouter } from "next/navigation"
import { Instructions } from "@/components/assessment-taking/Instructions"

export default function InstructionsPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id as string

  const handleBegin = () => {
    router.push(`/take/${assessmentId}/assessment`)
  }

  const handleBack = () => {
    router.push(`/take/${assessmentId}/proctoring`)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Instructions onBegin={handleBegin} onBack={handleBack} />
    </div>
  )
}

