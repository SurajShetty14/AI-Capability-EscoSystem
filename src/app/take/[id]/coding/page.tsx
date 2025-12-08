"use client"

import { useParams } from "next/navigation"
import { CodingInterface } from "@/components/assessment-taking/CodingInterface"

export default function CodingPage() {
  const params = useParams()
  const assessmentId = params.id as string

  return <CodingInterface assessmentId={assessmentId} />
}

