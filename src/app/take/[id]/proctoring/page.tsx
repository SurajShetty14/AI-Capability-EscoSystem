"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ProctoringWizard } from "@/components/assessment-taking/ProctoringWizard"

export default function ProctoringPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id as string
  const [isWizardOpen, setIsWizardOpen] = useState(true)

  const handleComplete = () => {
    setIsWizardOpen(false)
    router.push(`/take/${assessmentId}/instructions`)
  }

  const handleClose = () => {
    setIsWizardOpen(false)
    router.push(`/take/${assessmentId}/system-check`)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
      <ProctoringWizard
        isOpen={isWizardOpen}
        onComplete={handleComplete}
        onClose={handleClose}
      />
    </div>
  )
}

