"use client"

import { useState } from "react"
import { AssessmentFormData } from "@/hooks/useAssessmentForm"
import { CompetencyType } from "@/lib/assessment-types"
import { motion } from "framer-motion"

interface ExperienceStepProps {
  formData: AssessmentFormData
  updateField: (field: keyof AssessmentFormData, value: any) => void
  competencyType: CompetencyType
}

const experienceRanges = [
  { label: "Junior" as const, range: [0, 2], description: "0-2 yrs" },
  { label: "Mid-Level" as const, range: [3, 5], description: "3-5 yrs" },
  { label: "Senior" as const, range: [6, 10], description: "6-10 yrs" },
  { label: "Lead" as const, range: [11, 15], description: "10+ yrs" },
]

export function ExperienceStep({ formData, updateField, competencyType }: ExperienceStepProps) {
  const handleRangeSelect = (range: [number, number], label: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead' | 'Custom') => {
    const newRange = { min: range[0], max: range[1], label }
    updateField('experienceRange', newRange)
  }

  const selectedLabel = formData.experienceRange.label
  const isSelected = (range: [number, number]) => {
    return formData.experienceRange.min === range[0] && formData.experienceRange.max === range[1]
  }

  return (
    <div className="w-full">
      <h2 className="text-[40px] font-bold text-text-primary mb-8" style={{ letterSpacing: "-0.02em" }}>
        What experience level are you looking for?
      </h2>

      <div className="w-full max-w-[600px]">
        {/* Range Slider */}
        <div className="relative mb-8">
          <div className="flex justify-between mb-4">
            {experienceRanges.map((range) => (
              <div key={range.label} className="text-center">
                <p className="text-[14px] font-semibold text-text-primary mb-1">{range.label}</p>
                <p className="text-[12px] text-text-subtle">{range.description}</p>
              </div>
            ))}
          </div>

          <div className="relative h-2 bg-mint-50 rounded-full">
            <div className="absolute inset-0 flex justify-between items-center">
              {experienceRanges.map((_, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full bg-mint-100 border-2 border-white"
                />
              ))}
            </div>
            <motion.div
              className="absolute h-2 bg-gradient-to-r from-mint-100 to-mint-200 rounded-full"
              initial={{ width: "50%" }}
              animate={{
                width: `${((formData.experienceRange.max - formData.experienceRange.min) / 15) * 100}%`,
                left: `${(formData.experienceRange.min / 15) * 100}%`,
              }}
            />
            <motion.div
              className="absolute w-6 h-6 rounded-full bg-mint-200 border-4 border-white shadow-lg -top-2"
              initial={{ left: "25%" }}
              animate={{ left: `${(formData.experienceRange.min / 15) * 100}%` }}
            />
          </div>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-4 gap-3">
            {experienceRanges.map((range) => {
              const selected = isSelected(range.range as [number, number])

              return (
              <motion.button
                key={range.label}
                onClick={() => handleRangeSelect(range.range as [number, number], range.label)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  p-4 rounded-xl border-2 transition-all text-left
                  ${
                    selected
                      ? "border-mint-200 bg-mint-50 shadow-md"
                      : "border-mint-100 hover:border-mint-200"
                  }
                `}
              >
                <p className="text-[16px] font-semibold text-text-primary mb-1">
                  {range.label}
                </p>
                <p className="text-[13px] text-text-subtle">{range.description}</p>
              </motion.button>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 rounded-xl bg-mint-50 border border-mint-100"
        >
          <p className="text-[14px] text-text-secondary">
            Selected: <span className="font-semibold text-text-primary">{selectedLabel}</span> (
            {formData.experienceRange.min}-{formData.experienceRange.max} years)
          </p>
        </motion.div>
      </div>
    </div>
  )
}

