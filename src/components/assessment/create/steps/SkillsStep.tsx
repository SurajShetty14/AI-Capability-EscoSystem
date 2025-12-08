"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { AssessmentFormData } from "@/hooks/useAssessmentForm"
import { CompetencyType } from "@/lib/assessment-types"
import { motion, AnimatePresence } from "framer-motion"

interface SkillsStepProps {
  formData: AssessmentFormData
  updateField: (field: keyof AssessmentFormData, value: any) => void
  competencyType: CompetencyType
}

export function SkillsStep({ formData, updateField, competencyType }: SkillsStepProps) {
  const [inputValue, setInputValue] = useState("")

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newSkills = [...formData.skills, inputValue.trim()]
      updateField('skills', newSkills)
      setInputValue("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    updateField('skills', formData.skills.filter(s => s !== skill))
  }

  return (
    <div className="w-full">
      <h2 className="text-[40px] font-bold text-text-primary mb-8" style={{ letterSpacing: "-0.02em" }}>
        Which skills do you want to assess? <span className="text-red-500">*</span>
      </h2>

      <div className="w-full max-w-[600px]">
        <Input
          type="text"
          placeholder="e.g., React, TypeScript, Node.js, System Design..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddSkill}
          className="text-[18px] p-4 border-2 border-mint-100 rounded-xl focus:border-mint-200 focus:ring-4 focus:ring-mint-200/10 outline-none bg-white"
        />

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          <AnimatePresence>
            {formData.skills.map((skill) => (
              <motion.div
                key={skill}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-mint-100 text-text-primary"
              >
                <span className="text-[14px] font-medium">{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:bg-mint-50 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {formData.skills.length < 2 && (
          <p className="text-[13px] text-text-subtle mt-4">
            Add at least 2 skills (press Enter after each)
          </p>
        )}
      </div>
    </div>
  )
}

