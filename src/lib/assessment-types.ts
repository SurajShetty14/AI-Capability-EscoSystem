import { FileText, Code, Cloud, Brain } from "lucide-react"
import { LucideIcon } from "lucide-react"

export interface CompetencyType {
  id: 'assessment' | 'dsa' | 'cloud' | 'ai'
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  features: string[]
}

export const competencyTypes: CompetencyType[] = [
  {
    id: 'assessment',
    icon: FileText,
    title: 'Assessment',
    description: 'MCQ + Coding + Subjective',
    gradient: 'from-mint-100 to-mint-200',
    features: ['Multiple Choice Questions', 'Coding Challenges', 'Subjective Answers']
  },
  {
    id: 'dsa',
    icon: Code,
    title: 'DSA Coding',
    description: 'Data Structures & Algorithms',
    gradient: 'from-blue-100 to-blue-200',
    features: ['Algorithm Problems', 'Data Structure Challenges', 'Time Complexity Analysis']
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Labs',
    description: 'Real AWS, Azure, GCP Labs',
    gradient: 'from-cyan-100 to-cyan-200',
    features: ['AWS Hands-on Labs', 'Azure Deployments', 'GCP Configurations']
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI/ML',
    description: 'ML Models & Deployment',
    gradient: 'from-purple-100 to-purple-200',
    features: ['Model Training', 'ML Algorithms', 'Deployment Scenarios']
  }
]

