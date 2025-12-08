"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { SystemCheckModal } from "@/components/assessment-taking/SystemCheckModal"

export default function SystemCheckPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id as string
  const [isOpen, setIsOpen] = useState(true)

  const handleComplete = () => {
    setIsOpen(false)
    router.push(`/take/${assessmentId}/proctoring`)
  }

  const handleClose = () => {
    setIsOpen(false)
    router.push(`/take/${assessmentId}`)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
      <SystemCheckModal
        isOpen={isOpen}
        onContinue={handleComplete}
        onClose={handleClose}
      />
    </div>
  )
}

