"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lightbulb, Sparkles } from "lucide-react"
import { AssessmentFormData } from "@/hooks/useAssessmentForm"
import { CompetencyType } from "@/lib/assessment-types"
import { motion } from "framer-motion"

interface JobRoleStepProps {
  formData: AssessmentFormData
  updateField: (field: keyof AssessmentFormData, value: any) => void
  competencyType: CompetencyType
}

export function JobRoleStep({ formData, updateField, competencyType }: JobRoleStepProps) {
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  const handleAISuggest = async () => {
    setIsLoadingAI(true)
    // Simulate AI API call
    setTimeout(() => {
      updateField('jobRole', 'Frontend Developer')
      setIsLoadingAI(false)
    }, 1500)
  }

  return (
    <div className="w-full">
      <h2 className="text-[40px] font-bold text-text-primary mb-8" style={{ letterSpacing: "-0.02em" }}>
        What's the job role? <span className="text-red-500">*</span>
      </h2>

      <div className="w-full max-w-[600px]">
        <Input
          type="text"
          placeholder="e.g., Frontend Developer, Full Stack Engineer..."
          value={formData.jobRole}
          onChange={(e) => updateField('jobRole', e.target.value)}
          className="text-[18px] p-4 border-2 border-mint-100 rounded-xl focus:border-mint-200 focus:ring-4 focus:ring-mint-200/10 outline-none bg-white"
        />

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-lg bg-yellow-50/30 border border-yellow-200 max-w-[600px]"
        >
          <div className="flex items-start space-x-2">
            <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-[14px] text-text-secondary">
              Tip: Be specific for better AI-generated questions
            </p>
          </div>
        </motion.div>

        {/* AI Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Button
            onClick={handleAISuggest}
            disabled={isLoadingAI}
            className="bg-gradient-to-r from-mint-100 to-mint-200 text-text-primary hover:scale-105 transition-transform"
          >
            {isLoadingAI ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-text-primary border-t-transparent rounded-full mr-2"
                />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Get AI Skills →
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

