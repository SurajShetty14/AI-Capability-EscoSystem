"use client"

import { useState, useEffect } from "react"
import { AssessmentFormData, Topic } from "@/hooks/useAssessmentForm"
import { CompetencyType } from "@/lib/assessment-types"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Plus, MoreVertical, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TopicsStepProps {
  formData: AssessmentFormData
  updateField: (field: keyof AssessmentFormData, value: any) => void
  competencyType: CompetencyType
}

// Mock AI-generated topics based on skills
const generateTopics = (skills: string[]): Topic[] => {
  const topicMap: Record<string, Topic> = {
    'React': {
      id: 'react-fundamentals',
      name: 'React Fundamentals',
      icon: '📝',
      questionTypes: {
        mcq: { enabled: true, count: 5 },
        coding: { enabled: true, count: 2 },
        subjective: { enabled: false, count: 0 },
        pseudoCode: { enabled: false, count: 0 },
      },
      difficulty: 'medium',
      isCustom: false,
    },
    'TypeScript': {
      id: 'typescript-types',
      name: 'TypeScript Type System',
      icon: '💻',
      questionTypes: {
        mcq: { enabled: true, count: 3 },
        coding: { enabled: true, count: 1 },
        subjective: { enabled: false, count: 0 },
        pseudoCode: { enabled: true, count: 1 },
      },
      difficulty: 'medium',
      isCustom: false,
    },
    'Node.js': {
      id: 'node-apis',
      name: 'Node.js & Express APIs',
      icon: '⚡',
      questionTypes: {
        mcq: { enabled: true, count: 4 },
        coding: { enabled: true, count: 2 },
        subjective: { enabled: true, count: 1 },
        pseudoCode: { enabled: false, count: 0 },
      },
      difficulty: 'hard',
      isCustom: false,
    },
  }

  return skills
    .filter(skill => topicMap[skill])
    .map(skill => topicMap[skill])
    .slice(0, 6) // Limit to 6 topics
}

export function TopicsStep({ formData, updateField, competencyType }: TopicsStepProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTopicName, setNewTopicName] = useState("")

  // Generate topics on mount if not already generated
  useEffect(() => {
    if ((!formData.topics || formData.topics.length === 0) && formData.skills && formData.skills.length > 0) {
      const generatedTopics = generateTopics(formData.skills)
      updateField('topics', generatedTopics)
    }
  }, [formData.skills, formData.topics, updateField])

  const handleToggleQuestionType = (topicId: string, type: 'mcq' | 'coding' | 'subjective' | 'pseudoCode') => {
    if (!formData.topics) return
    const updatedTopics = formData.topics.map(topic => {
      if (topic.id === topicId) {
        const updated = {
          ...topic,
          questionTypes: {
            ...topic.questionTypes,
            [type]: {
              ...topic.questionTypes[type],
              enabled: !topic.questionTypes[type].enabled,
            },
          },
        }
        return updated
      }
      return topic
    })
    updateField('topics', updatedTopics)
    updateTotals(updatedTopics)
  }

  const handleUpdateCount = (topicId: string, type: 'mcq' | 'coding' | 'subjective' | 'pseudoCode', count: number) => {
    if (!formData.topics) return
    const updatedTopics = formData.topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          questionTypes: {
            ...topic.questionTypes,
            [type]: {
              ...topic.questionTypes[type],
              count: Math.max(0, Math.min(20, count)),
            },
          },
        }
      }
      return topic
    })
    updateField('topics', updatedTopics)
    updateTotals(updatedTopics)
  }

  const updateTotals = (topics: Topic[]) => {
    if (!topics || topics.length === 0) {
      updateField('totalQuestions', 0)
      updateField('estimatedDuration', 0)
      return
    }
    
    const totalQuestions = topics.reduce((sum, topic) => {
      return sum + 
        (topic.questionTypes.mcq.enabled ? topic.questionTypes.mcq.count : 0) +
        (topic.questionTypes.coding.enabled ? topic.questionTypes.coding.count : 0) +
        (topic.questionTypes.subjective.enabled ? topic.questionTypes.subjective.count : 0) +
        (topic.questionTypes.pseudoCode.enabled ? topic.questionTypes.pseudoCode.count : 0)
    }, 0)
    
    const estimatedDuration = totalQuestions * 2.5 // ~2.5 min per question
    
    updateField('totalQuestions', totalQuestions)
    updateField('estimatedDuration', estimatedDuration)
  }

  const handleAddCustomTopic = () => {
    if (newTopicName.trim().length < 3) return
    
    const newTopic: Topic = {
      id: `custom-${Date.now()}`,
      name: newTopicName.trim(),
      icon: '📚',
      questionTypes: {
        mcq: { enabled: true, count: 5 },
        coding: { enabled: false, count: 0 },
        subjective: { enabled: false, count: 0 },
        pseudoCode: { enabled: false, count: 0 },
      },
      difficulty: 'medium',
      isCustom: true,
    }
    
    const currentTopics = formData.topics || []
    updateField('topics', [...currentTopics, newTopic])
    setNewTopicName("")
    setShowAddModal(false)
    updateTotals([...currentTopics, newTopic])
  }

  const handleRemoveTopic = (topicId: string) => {
    if (!formData.topics) return
    const updatedTopics = formData.topics.filter(t => t.id !== topicId)
    updateField('topics', updatedTopics)
    updateTotals(updatedTopics)
  }

  const questionTypeLabels = {
    mcq: 'MCQ',
    coding: 'Coding',
    subjective: 'Subjective',
    pseudoCode: 'Pseudo Code',
  }

  return (
    <div className="w-full">
      <h2 className="text-[40px] font-bold text-text-primary mb-4" style={{ letterSpacing: "-0.02em" }}>
        Configure topics and question types <span className="text-red-500">*</span>
      </h2>

      {/* AI Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow-50/30 border border-yellow-200 mb-4"
      >
        <Sparkles className="h-4 w-4 text-yellow-600" />
        <span className="text-[14px] text-amber-900">AI generated these topics based on your skills</span>
      </motion.div>

      {/* Add Custom Topic Button */}
      <Button
        onClick={() => setShowAddModal(true)}
        variant="outline"
        className="mb-6 border-2 border-dashed border-mint-100 text-text-secondary hover:border-mint-200 hover:bg-mint-50/30"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Custom Topic
      </Button>

      {/* Topics List */}
      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {(formData.topics || []).map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-mint-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              {/* Topic Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{topic.icon}</span>
                  <h3 className="text-[20px] font-bold text-text-primary">{topic.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveTopic(topic.id)}
                    className="h-8 w-8 text-text-subtle hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Question Types */}
              <div className="mb-4">
                <p className="text-[14px] font-medium text-text-secondary mb-3">Select question types:</p>
                <div className="flex flex-wrap gap-3">
                  {(['mcq', 'coding', 'subjective', 'pseudoCode'] as const).map((type) => {
                    const isEnabled = topic.questionTypes[type].enabled
                    return (
                      <motion.button
                        key={type}
                        onClick={() => handleToggleQuestionType(topic.id, type)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "px-4 py-2.5 rounded-xl border-2 transition-all text-[15px] font-medium",
                          isEnabled
                            ? "border-mint-200 bg-mint-50/50 text-text-primary"
                            : "border-mint-100 text-text-subtle hover:border-mint-200"
                        )}
                      >
                        {isEnabled ? '☑' : '☐'} {questionTypeLabels[type]}
                        {isEnabled && (
                          <input
                            type="number"
                            min={0}
                            max={20}
                            value={topic.questionTypes[type].count}
                            onChange={(e) => handleUpdateCount(topic.id, type, parseInt(e.target.value) || 0)}
                            onClick={(e) => e.stopPropagation()}
                            className="ml-2 w-12 px-1 py-0.5 rounded border border-mint-200 text-center text-[13px]"
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Difficulty & Total */}
              <div className="flex items-center justify-between pt-4 border-t border-mint-50">
                <div className="flex items-center space-x-2">
                  <span className="text-[13px] text-text-subtle">Difficulty:</span>
                  <select
                    value={topic.difficulty}
                    onChange={(e) => {
                      if (!formData.topics) return
                      const updated = formData.topics.map(t =>
                        t.id === topic.id ? { ...t, difficulty: e.target.value as any } : t
                      )
                      updateField('topics', updated)
                    }}
                    className="px-3 py-1.5 rounded-lg border border-mint-100 text-[14px] text-text-primary"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
                <span className="text-[15px] font-medium text-text-primary">
                  Total: {Object.values(topic.questionTypes).reduce((sum, qt) => sum + (qt.enabled ? qt.count : 0), 0)} questions
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-mint-50 to-mint-100 border-2 border-mint-200 rounded-2xl p-6 mb-6"
      >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="text-[18px] font-semibold text-text-primary">
                📚 {(formData.topics || []).length} topics • 📝 {formData.totalQuestions || 0} questions • ⏱️ ~{Math.round(formData.estimatedDuration || 0)} mins
              </span>
            </div>
          </div>
      </motion.div>

      {/* Add Topic Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-[500px] mx-4"
          >
            <h3 className="text-[24px] font-bold text-text-primary mb-6">Add Custom Topic</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-text-secondary mb-2">Topic Name *</label>
                <input
                  type="text"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="e.g., Advanced React Patterns"
                  className="w-full px-4 py-3 border-2 border-mint-100 rounded-xl focus:border-mint-200 focus:ring-4 focus:ring-mint-200/10 outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddCustomTopic()
                  }}
                />
              </div>
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCustomTopic} disabled={newTopicName.trim().length < 3}>
                  Add Topic →
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

