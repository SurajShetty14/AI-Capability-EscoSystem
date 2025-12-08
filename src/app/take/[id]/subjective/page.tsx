"use client"

import { useParams } from "next/navigation"
import { SubjectiveInterface } from "@/components/assessment-taking/SubjectiveInterface"

export default function SubjectivePage() {
  const params = useParams()
  const assessmentId = params.id as string

  return <SubjectiveInterface assessmentId={assessmentId} />
}

