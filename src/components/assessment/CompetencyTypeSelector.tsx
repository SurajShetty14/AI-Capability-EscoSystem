"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { competencyTypes, CompetencyType } from "@/lib/assessment-types"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CompetencyTypeSelectorProps {
  onSelect: (type: CompetencyType) => void
}

export function CompetencyTypeSelector({ onSelect }: CompetencyTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<CompetencyType | null>(null)
  const [hoveredType, setHoveredType] = useState<string | null>(null)

  const handleSelect = (type: CompetencyType) => {
    setSelectedType(type)
    setTimeout(() => {
      onSelect(type)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-50/30 to-white relative overflow-hidden -mt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, #1E5A3B 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 pt-32">
        {/* Back Button */}
        <Link href="/dashboard">
          <motion.div
            whileHover={{ x: -4 }}
            className="inline-flex items-center space-x-2 text-[14px] text-text-subtle hover:text-text-primary mb-8 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </motion.div>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mint-100 to-mint-200 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(128,239,192,0.3)]">
              ✨
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[48px] font-black text-text-primary mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Let's Create Something Great
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[20px] text-text-secondary"
          >
            Build an AI-powered assessment in 5 minutes
          </motion.p>
        </div>

        {/* Competency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {competencyTypes.map((type, index) => {
            const Icon = type.icon
            const isSelected = selectedType?.id === type.id
            const isHovered = hoveredType === type.id

            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredType(type.id)}
                onHoverEnd={() => setHoveredType(null)}
                onClick={() => handleSelect(type)}
                className={cn(
                  "relative bg-white border-2 rounded-3xl p-8 h-[200px] cursor-pointer transition-all",
                  isSelected
                    ? "border-mint-200 bg-gradient-to-br from-mint-50/50 to-white shadow-[0_12px_40px_rgba(128,239,192,0.3)]"
                    : "border-mint-100 hover:border-mint-200 shadow-[0_4px_20px_rgba(201,244,212,0.15)]"
                )}
              >
                {/* Selected Checkmark */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-mint-200 flex items-center justify-center"
                  >
                    <Check className="h-5 w-5 text-text-primary" />
                  </motion.div>
                )}

                {/* Icon */}
                <motion.div
                  animate={{ rotate: isHovered ? 5 : 0, scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center mb-6",
                    type.id === 'assessment' && "from-mint-100 to-mint-50",
                    type.id === 'dsa' && "from-blue-100 to-blue-50",
                    type.id === 'cloud' && "from-cyan-100 to-cyan-50",
                    type.id === 'ai' && "from-purple-100 to-purple-50"
                  )}
                >
                  <Icon className={cn(
                    "h-8 w-8",
                    type.id === 'assessment' && "text-mint-200",
                    type.id === 'dsa' && "text-blue-500",
                    type.id === 'cloud' && "text-cyan-500",
                    type.id === 'ai' && "text-purple-500"
                  )} />
                </motion.div>

                {/* Title */}
                <h3 className="text-[22px] font-bold text-text-primary mb-2">{type.title}</h3>

                {/* Description */}
                <p className="text-[14px] text-text-subtle mb-4">{type.description}</p>

                {/* CTA Button (appears on hover) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered || isSelected ? 1 : 0, y: isHovered || isSelected ? 0 : 10 }}
                  className="mt-auto"
                >
                  <div className={cn(
                    "inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl border-2 transition-all",
                    isHovered || isSelected
                      ? "bg-gradient-to-r from-mint-100 to-mint-200 border-mint-200"
                      : "bg-transparent border-mint-100"
                  )}>
                    <span className="text-[14px] font-semibold text-text-primary">Start</span>
                    <ArrowRight className="h-4 w-4 text-text-primary" />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* AI Suggestion Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center"
        >
          <button className="text-[15px] text-mint-200 hover:text-text-primary hover:underline transition-colors">
            Not sure? Let AI suggest the best type →
          </button>
        </motion.div>

        {/* Keyboard Hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="fixed bottom-6 left-6 bg-mint-50/80 backdrop-blur-sm px-3 py-2 rounded-lg text-[11px] text-text-subtle"
        >
          Press 1-4 to select • Enter to continue
        </motion.div>
      </div>
    </div>
  )
}

