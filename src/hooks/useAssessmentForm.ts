import { useState, useEffect } from "react"

export interface Topic {
  id: string
  name: string
  icon: string
  questionTypes: {
    mcq: { enabled: boolean; count: number }
    coding: { enabled: boolean; count: number }
    subjective: { enabled: boolean; count: number }
    pseudoCode: { enabled: boolean; count: number }
  }
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  isCustom: boolean
}

export interface Question {
  id: string
  topicId: string
  type: 'mcq' | 'coding' | 'subjective' | 'pseudoCode'
  questionText: string
  options?: string[]
  correctAnswer?: string | number
  codeTemplate?: string
  testCases?: Array<{ input: string; expectedOutput: string; isHidden: boolean }>
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  timeLimit: number
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone?: string
  status: 'pending' | 'invited' | 'started' | 'completed'
  invitedAt?: Date
}

export interface AssessmentFormData {
  jobRole: string
  skills: string[]
  experienceRange: { min: number; max: number; label: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead' | 'Custom' }
  topics: Topic[]
  questions: Question[]
  candidates: Candidate[]
  totalQuestions: number
  estimatedDuration: number
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed'
  questionTypes?: ('mcq' | 'coding' | 'subjective')[]
}

const initialFormData: AssessmentFormData = {
  jobRole: "",
  skills: [],
  experienceRange: { min: 3, max: 5, label: 'Mid-Level' },
  topics: [],
  questions: [],
  candidates: [],
  totalQuestions: 0,
  estimatedDuration: 0,
  difficulty: 'mixed',
  questionTypes: [],
}

export function useAssessmentForm() {
  const [formData, setFormData] = useState<AssessmentFormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('assessment-draft')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Ensure all fields are present (merge with initial to handle missing fields)
        return { ...initialFormData, ...parsed, topics: parsed.topics || [], candidates: parsed.candidates || [], questions: parsed.questions || [] }
      }
    }
    return initialFormData
  })

  const updateField = (field: keyof AssessmentFormData, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      if (typeof window !== 'undefined') {
        localStorage.setItem('assessment-draft', JSON.stringify(updated))
      }
      return updated
    })
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.jobRole.length >= 3
      case 2:
        return formData.skills.length >= 2
      case 3:
        return formData.experienceRange.min >= 0 && formData.experienceRange.max > formData.experienceRange.min
      case 4:
        return formData.topics && formData.topics.length > 0 && formData.topics.some(t => 
          t.questionTypes.mcq.enabled || 
          t.questionTypes.coding.enabled || 
          t.questionTypes.subjective.enabled || 
          t.questionTypes.pseudoCode.enabled
        )
      case 5:
        return formData.candidates && formData.candidates.length > 0
      default:
        return true
    }
  }

  const saveDraft = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('assessment-draft', JSON.stringify(formData))
      // Show toast notification
      console.log('Draft saved!')
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('assessment-draft')
    }
  }

  return {
    formData,
    updateField,
    validateStep,
    saveDraft,
    resetForm,
  }
}

