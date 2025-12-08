"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Save, Lightbulb, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProgressBar } from "./ProgressBar"
import { JobRoleStep } from "./steps/JobRoleStep"
import { SkillsStep } from "./steps/SkillsStep"
import { ExperienceStep } from "./steps/ExperienceStep"
import { TopicsStep } from "./steps/TopicsStep"
import { ScheduleStep } from "./steps/ScheduleStep"
import { CandidatesStep } from "./steps/CandidatesStep"
import { CompetencyType } from "@/lib/assessment-types"
import { useAssessmentForm } from "@/hooks/useAssessmentForm"

interface ConversationalFormProps {
  competencyType: CompetencyType
  onBack: () => void
  onComplete: (data: any) => void
  initialStep?: number
}

const steps = [
  { id: 1, component: JobRoleStep, title: "Job Role" },
  { id: 2, component: SkillsStep, title: "Skills" },
  { id: 3, component: ExperienceStep, title: "Experience" },
  { id: 4, component: TopicsStep, title: "Topics & Question Types" },
  { id: 5, component: ScheduleStep, title: "Schedule & Availability" },
  { id: 6, component: CandidatesStep, title: "Add Candidates" },
]

export function ConversationalForm({ competencyType, onBack, onComplete, initialStep = 1 }: ConversationalFormProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const { formData, updateField, validateStep, saveDraft } = useAssessmentForm()

  const progress = (currentStep / steps.length) * 100
  const CurrentStepComponent = steps[currentStep - 1].component

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      } else {
        // Step 6 (Candidates) is the last step - proceed to generation
        onComplete(formData)
      }
    }
  }, [currentStep, formData, validateStep, onComplete])

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }, [currentStep, onBack])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleNext()
      } else if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault()
        handleBack()
      } else if (e.metaKey && e.key === "s") {
        e.preventDefault()
        saveDraft()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleNext, handleBack, saveDraft])

  // Auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft()
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [formData])

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-50/30 to-white -mt-24">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-mint-100/30 shadow-sm pt-24">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-text-subtle hover:text-text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              {currentStep < steps.length && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="text-text-subtle hover:text-text-primary"
                >
                  Skip
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={saveDraft}
              className="text-text-secondary hover:text-text-primary bg-mint-50/50 border border-mint-100"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="mb-8">
              <p className="text-[13px] font-medium text-text-subtle uppercase tracking-wide mb-4">
                Step {currentStep} of {steps.length}
              </p>
              <CurrentStepComponent
                formData={formData}
                updateField={updateField}
                competencyType={competencyType}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mt-12"
        >
          <Button
            onClick={handleNext}
            size="lg"
            className="bg-mint-200 text-text-primary hover:bg-mint-300 px-8 py-6 text-[16px] font-semibold rounded-xl shadow-[0_4px_16px_rgba(128,239,192,0.4)] hover:scale-105 transition-transform"
          >
            {currentStep < steps.length ? (
              <>
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              "Review Assessment"
            )}
          </Button>
          <p className="text-[12px] text-text-subtle mt-3">Press Enter ↵</p>
        </motion.div>
      </div>

      {/* Keyboard Hints */}
      <div className="fixed bottom-6 left-6 bg-mint-50/80 backdrop-blur-sm px-3 py-2 rounded-lg text-[11px] text-text-subtle">
        ↵ Continue • ⇧↵ Back • ⌘S Save
      </div>
    </div>
  )
}

