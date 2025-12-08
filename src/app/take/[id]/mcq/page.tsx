"use client"

import { useParams } from "next/navigation"
import { MCQInterface } from "@/components/assessment-taking/MCQInterface"

export default function MCQPage() {
  const params = useParams()
  const assessmentId = params.id as string

  return <MCQInterface assessmentId={assessmentId} />
}

