"use client"

import { AssessmentFormData } from "@/hooks/useAssessmentForm"
import { CompetencyType } from "@/lib/assessment-types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { motion } from "framer-motion"

interface DifficultyStepProps {
  formData: AssessmentFormData
  updateField: (field: keyof AssessmentFormData, value: any) => void
  competencyType: CompetencyType
}

const difficultyOptions = [
  { value: 'easy' as const, label: 'Easy', description: 'Suitable for 0-2 years' },
  { value: 'medium' as const, label: 'Medium', description: 'Suitable for 3-5 years' },
  { value: 'hard' as const, label: 'Hard', description: 'Suitable for 5+ years' },
  { value: 'mixed' as const, label: 'Mixed', description: 'Adaptive difficulty' },
]

export function DifficultyStep({ formData, updateField, competencyType }: DifficultyStepProps) {
  const handleDurationChange = (delta: number) => {
    const newDuration = Math.max(15, Math.min(180, formData.estimatedDuration + delta))
    updateField('estimatedDuration', newDuration)
  }

  return (
    <div className="w-full">
      <h2 className="text-[40px] font-bold text-text-primary mb-8" style={{ letterSpacing: "-0.02em" }}>
        Set difficulty and test duration
      </h2>

      <div className="grid grid-cols-2 gap-6 w-full max-w-[700px]">
        {/* Difficulty */}
        <div>
          <label className="block text-[16px] font-semibold text-text-primary mb-4">
            Difficulty
          </label>
          <div className="space-y-2">
            {difficultyOptions.map((option) => {
              const isSelected = formData.difficulty === option.value
              return (
                <motion.button
                  key={option.value}
                  onClick={() => updateField('difficulty', option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full p-4 rounded-xl border-2 text-left transition-all
                    ${
                      isSelected
                        ? "border-mint-200 bg-mint-50 shadow-md"
                        : "border-mint-100 hover:border-mint-200"
                    }
                  `}
                >
                  <p className="text-[16px] font-semibold text-text-primary mb-1">
                    {option.label}
                  </p>
                  <p className="text-[13px] text-text-subtle">{option.description}</p>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-[16px] font-semibold text-text-primary mb-4">
            Duration
          </label>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDurationChange(-15)}
                disabled={formData.estimatedDuration <= 15}
                className="border-mint-100 hover:bg-mint-50"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={formData.estimatedDuration}
                onChange={(e) => updateField('estimatedDuration', parseInt(e.target.value) || 60)}
                min={15}
                max={180}
                className="text-center text-[18px] font-semibold border-2 border-mint-100 rounded-xl"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDurationChange(15)}
                disabled={formData.estimatedDuration >= 180}
                className="border-mint-100 hover:bg-mint-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[14px] text-text-subtle">
              About {Math.floor(formData.estimatedDuration / 10)} questions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

