"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Edit, FileText, Code, PenTool, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AssessmentFormData } from "@/hooks/useAssessmentForm"
import { CompetencyType } from "@/lib/assessment-types"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface ReviewScreenProps {
  formData: AssessmentFormData
  competencyType: CompetencyType
  onBack: () => void
  onEdit: () => void
  onContinue: () => void
}

export function ReviewScreen({ formData, competencyType, onBack, onEdit, onContinue }: ReviewScreenProps) {
  const questionTypeLabels = {
    mcq: 'MCQ',
    coding: 'Coding',
    subjective: 'Subjective',
  }

  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    mixed: 'Mixed',
  }

  const experienceLabel = `${formData.experienceRange.label} (${formData.experienceRange.min}-${formData.experienceRange.max} years)`

  const estimatedQuestions = formData.totalQuestions || formData.questions.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-50/30 to-white -mt-24">
      <div className="max-w-4xl mx-auto px-6 py-16 pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-block mb-4"
          >
            <Sparkles className="h-12 w-12 text-mint-200" />
          </motion.div>
          <h1 className="text-[36px] font-bold text-text-primary mb-2">Almost There!</h1>
          <p className="text-[18px] text-text-secondary">
            Review your assessment before we generate questions
          </p>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-mint-50 to-white border-2 border-mint-100 rounded-3xl p-8 shadow-[0_8px_32px_rgba(201,244,212,0.2)] mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="h-8 w-8 text-mint-200" />
            <h2 className="text-[24px] font-bold text-text-primary">
              {formData.jobRole} Assessment
            </h2>
          </div>

          <div className="space-y-4">
            {/* Skills */}
            <div className="flex items-start space-x-3">
              <span className="text-text-secondary font-medium min-w-[100px]">Skills:</span>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-white border border-mint-100 text-text-primary px-3 py-1 rounded-full"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center space-x-3">
              <span className="text-text-secondary font-medium min-w-[100px]">Experience:</span>
              <span className="text-text-primary">{experienceLabel}</span>
            </div>

            {/* Topics */}
            <div className="flex items-start space-x-3">
              <span className="text-text-secondary font-medium min-w-[100px]">Topics:</span>
              <div className="flex flex-wrap gap-2">
                {(formData.topics || []).map((topic) => (
                  <Badge
                    key={topic.id}
                    className="bg-white border border-mint-100 text-text-primary px-3 py-1 rounded-full"
                  >
                    {topic.icon} {topic.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Total Questions */}
            <div className="flex items-center space-x-3">
              <span className="text-text-secondary font-medium min-w-[100px]">Total Questions:</span>
              <span className="text-text-primary">{formData.totalQuestions}</span>
            </div>

            {/* Estimated Duration */}
            <div className="flex items-center space-x-3">
              <span className="text-text-secondary font-medium min-w-[100px]">Estimated Duration:</span>
              <span className="text-text-primary">~{Math.round(formData.estimatedDuration)} minutes</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={onEdit}
            className="mt-6 border-mint-200 text-mint-200 hover:bg-mint-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </motion.div>

        {/* AI Generation Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-yellow-50/30 border border-yellow-200 rounded-xl p-4 mb-8"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="h-6 w-6 text-yellow-600" />
            <h3 className="text-[16px] font-semibold text-text-primary">AI will generate:</h3>
          </div>
          <ul className="space-y-2 text-[14px] text-text-secondary ml-8">
            <li>• {formData.totalQuestions || 0} questions across {(formData.topics || []).length} topics</li>
            <li>• Estimated time: ~{Math.round(formData.estimatedDuration)} minutes</li>
            <li>• Questions will be generated based on your configuration</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center space-x-4"
        >
          <Button
            variant="outline"
            onClick={onBack}
            className="border-mint-100 text-text-secondary hover:bg-mint-50 px-6 py-3"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Edit
          </Button>
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-mint-100 to-mint-200 text-text-primary hover:scale-105 transition-transform px-8 py-4 text-[16px] font-bold rounded-xl shadow-[0_4px_20px_rgba(128,239,192,0.4)]"
          >
            Continue to Candidates <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

