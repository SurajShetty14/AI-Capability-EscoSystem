"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AssessmentFormData, Candidate } from "@/hooks/useAssessmentForm"
import { CompetencyType } from "@/lib/assessment-types"
import { CandidatesStep } from "./steps/CandidatesStep"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail } from "lucide-react"
import { motion } from "framer-motion"

interface CandidatesPageProps {
  formData: AssessmentFormData
  competencyType: CompetencyType
  onBack: () => void
}

export function CandidatesPage({ formData, competencyType, onBack }: CandidatesPageProps) {
  const router = useRouter()
  const [localFormData, setLocalFormData] = useState(formData)
  const [showConfirm, setShowConfirm] = useState(false)

  const updateField = (field: keyof AssessmentFormData, value: any) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateAndSend = () => {
    if (localFormData.candidates.length === 0) {
      alert('Please add at least one candidate')
      return
    }
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    // Create assessment and send invitations
    router.push('/dashboard/assessments')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-50/30 to-white -mt-24">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-mint-100/30 shadow-sm pt-24">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-text-subtle hover:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="h-1 bg-mint-50 rounded-full">
            <div className="h-full bg-gradient-to-r from-mint-100 to-mint-200 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <CandidatesStep
          formData={localFormData}
          updateField={updateField}
          competencyType={competencyType}
        />

        {/* Create & Send Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mt-12"
        >
          <Button
            onClick={handleCreateAndSend}
            disabled={localFormData.candidates.length === 0}
            size="lg"
            className="bg-gradient-to-r from-mint-100 to-mint-200 text-text-primary hover:scale-105 transition-transform px-8 py-6 text-[18px] font-bold rounded-xl shadow-[0_4px_20px_rgba(128,239,192,0.5)] w-full max-w-[600px]"
          >
            <Mail className="h-5 w-5 mr-2" />
            Create & Send Invitations →
          </Button>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-[500px] mx-4"
          >
            <h3 className="text-[24px] font-bold text-text-primary mb-4">🎉 Ready to Launch!</h3>
            <p className="text-[16px] text-text-secondary mb-6">
              You're about to:
            </p>
            <ul className="space-y-2 mb-6 text-[14px] text-text-secondary">
              <li>• Create assessment</li>
              <li>• Send invites to {localFormData.candidates.length} candidates</li>
              <li>• Start accepting submissions</li>
            </ul>
            <div className="flex items-center justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirm} className="bg-gradient-to-r from-mint-100 to-mint-200 text-text-primary">
                Confirm & Send →
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

