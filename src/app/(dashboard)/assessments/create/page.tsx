"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CompetencyTypeSelector } from "@/components/assessment/CompetencyTypeSelector"
import { ConversationalForm } from "@/components/assessment/create/ConversationalForm"
import { ReviewScreen } from "@/components/assessment/create/ReviewScreen"
import { LoadingScreen } from "@/components/assessment/create/LoadingScreen"
import { CompetencyType } from "@/lib/assessment-types"
import { AssessmentFormData } from "@/hooks/useAssessmentForm"

type FlowStep = 'select' | 'form' | 'review' | 'loading'

export default function CreateAssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<FlowStep>('select')
  const [selectedType, setSelectedType] = useState<CompetencyType | null>(null)
  const [formData, setFormData] = useState<AssessmentFormData | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingSteps, setLoadingSteps] = useState([
    { id: 'analyze', label: 'Analyzing job requirements', status: 'completed' as const },
    { id: 'mcq', label: 'Generating MCQ questions', status: 'in-progress' as const },
    { id: 'coding', label: 'Creating coding challenges', status: 'pending' as const },
    { id: 'finalize', label: 'Finalizing assessment', status: 'pending' as const },
  ])

  const handleTypeSelect = (type: CompetencyType) => {
    setSelectedType(type)
    setCurrentStep('form')
  }

  const handleFormComplete = (data: AssessmentFormData) => {
    setFormData(data)
    setCurrentStep('review')
  }

  const handleGenerate = () => {
    setCurrentStep('loading')
    
    // Simulate AI generation progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push('/dashboard/assessments')
          }, 1000)
          return 100
        }

        // Update steps based on progress
        if (prev < 25 && loadingSteps[1].status !== 'completed') {
          setLoadingSteps([
            { ...loadingSteps[0], status: 'completed' },
            { ...loadingSteps[1], status: 'completed' },
            { ...loadingSteps[2], status: 'in-progress' },
            { ...loadingSteps[3], status: 'pending' },
          ])
        } else if (prev < 75 && loadingSteps[2].status !== 'completed') {
          setLoadingSteps([
            { ...loadingSteps[0], status: 'completed' },
            { ...loadingSteps[1], status: 'completed' },
            { ...loadingSteps[2], status: 'completed' },
            { ...loadingSteps[3], status: 'in-progress' },
          ])
        } else if (prev >= 100) {
          setLoadingSteps([
            { ...loadingSteps[0], status: 'completed' },
            { ...loadingSteps[1], status: 'completed' },
            { ...loadingSteps[2], status: 'completed' },
            { ...loadingSteps[3], status: 'completed' },
          ])
        }

        return prev + 2
      })
    }, 100)
  }

  if (currentStep === 'select') {
    return <CompetencyTypeSelector onSelect={handleTypeSelect} />
  }

  if (currentStep === 'form' && selectedType) {
    return (
      <ConversationalForm
        competencyType={selectedType}
        onBack={() => setCurrentStep('select')}
        onComplete={handleFormComplete}
      />
    )
  }

  if (currentStep === 'review' && formData && selectedType) {
    return (
      <ReviewScreen
        formData={formData}
        competencyType={selectedType}
        onBack={() => setCurrentStep('form')}
        onEdit={() => setCurrentStep('form')}
        onGenerate={handleGenerate}
      />
    )
  }

  if (currentStep === 'loading') {
    return <LoadingScreen progress={loadingProgress} currentStep="" steps={loadingSteps} />
  }

  return null
}

