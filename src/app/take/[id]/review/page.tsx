"use client"

import { useParams, useRouter } from "next/navigation"
import { ReviewSummary } from "@/components/assessment-taking/ReviewSummary"

export default function ReviewPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id as string

  const handleSubmit = () => {
    router.push(`/take/${assessmentId}/complete`)
  }

  return <ReviewSummary assessmentId={assessmentId} onSubmit={handleSubmit} />
}

