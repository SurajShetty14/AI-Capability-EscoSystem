"use client"

import { AssessmentFormData } from "@/hooks/useAssessmentForm"
import { CompetencyType } from "@/lib/assessment-types"
import { motion } from "framer-motion"
import { CheckCircle, FileText, Code, PenTool } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuestionTypesStepProps {
  formData: AssessmentFormData
  updateField: (field: keyof AssessmentFormData, value: any) => void
  competencyType: CompetencyType
}

const questionTypes = [
  {
    id: 'mcq' as const,
    label: 'MCQ',
    description: 'Multiple choice questions',
    icon: FileText,
    count: '5-10 questions',
  },
  {
    id: 'coding' as const,
    label: 'Coding',
    description: 'Programming challenges',
    icon: Code,
    count: '3-5 challenges',
  },
  {
    id: 'subjective' as const,
    label: 'Subjective',
    description: 'Open-ended questions',
    icon: PenTool,
    count: '2-4 questions',
  },
]

export function QuestionTypesStep({ formData, updateField, competencyType }: QuestionTypesStepProps) {
  const handleToggle = (type: 'mcq' | 'coding' | 'subjective') => {
    const current = formData.questionTypes || []
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type]
    updateField('questionTypes', updated)
  }

  return (
    <div className="w-full">
      <h2 className="text-[40px] font-bold text-text-primary mb-8" style={{ letterSpacing: "-0.02em" }}>
        What types of questions do you want? <span className="text-red-500">*</span>
      </h2>

      <div className="grid grid-cols-3 gap-6 w-full max-w-[700px]">
        {questionTypes.map((type) => {
          const Icon = type.icon
          const isSelected = (formData.questionTypes || []).includes(type.id)

          return (
            <motion.button
              key={type.id}
              onClick={() => handleToggle(type.id)}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative p-6 rounded-2xl border-2 transition-all text-left h-[160px]",
                isSelected
                  ? "border-mint-200 bg-mint-50/50 shadow-md"
                  : "border-mint-100 hover:border-mint-200"
              )}
            >
              {/* Checkmark Badge */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-mint-200 flex items-center justify-center"
                >
                  <CheckCircle className="h-4 w-4 text-text-primary" />
                </motion.div>
              )}

              {/* Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mint-100 to-mint-50 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-mint-200" />
                </div>
              </div>

              {/* Label */}
              <p className="text-[18px] font-semibold text-text-primary mb-1">{type.label}</p>

              {/* Description */}
              <p className="text-[13px] text-text-subtle mb-2">{type.description}</p>

              {/* Count */}
              <p className="text-[12px] text-text-subtle">{type.count}</p>
            </motion.button>
          )
        })}
      </div>

      {(formData.questionTypes || []).length === 0 && (
        <p className="text-[13px] text-text-subtle mt-6">
          Select at least one question type
        </p>
      )}
    </div>
  )
}

