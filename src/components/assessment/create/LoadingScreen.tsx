"use client"

import { motion } from "framer-motion"
import { Sparkles, CheckCircle, Loader2 } from "lucide-react"

interface LoadingScreenProps {
  progress: number
  currentStep: string
  steps: Array<{ id: string; label: string; status: 'pending' | 'in-progress' | 'completed' }>
}

export function LoadingScreen({ progress, currentStep, steps }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-50/30 to-white flex items-center justify-center -mt-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* AI Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block mb-8"
        >
          <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-mint-100 to-mint-200 flex items-center justify-center shadow-[0_0_60px_rgba(128,239,192,0.4)]">
            <Sparkles className="h-16 w-16 text-text-primary" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[32px] font-bold text-text-primary mb-6"
        >
          AI is Crafting Your Assessment
        </motion.h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="relative w-full max-w-[400px] mx-auto h-2 bg-mint-50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-mint-100 to-mint-200 rounded-full"
            />
          </div>
          <p className="text-[20px] font-bold text-text-primary mt-3">{Math.round(progress)}%</p>
        </div>

        {/* Status Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 text-left"
            >
              {step.status === 'completed' && (
                <CheckCircle className="h-5 w-5 text-mint-200" />
              )}
              {step.status === 'in-progress' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-5 w-5 text-yellow-500" />
                </motion.div>
              )}
              {step.status === 'pending' && (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
              )}
              <span
                className={`text-[14px] ${
                  step.status === 'completed'
                    ? 'text-text-primary'
                    : step.status === 'in-progress'
                    ? 'text-yellow-600'
                    : 'text-text-subtle'
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Time Estimate */}
        <p className="text-[14px] text-text-subtle">
          This usually takes 30-60 seconds...
        </p>
      </div>
    </div>
  )
}

