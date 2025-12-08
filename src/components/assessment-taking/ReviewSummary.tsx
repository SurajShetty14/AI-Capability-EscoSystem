"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"

interface ReviewSummaryProps {
  assessmentId: string
  onSubmit: () => void
}

export function ReviewSummary({ assessmentId, onSubmit }: ReviewSummaryProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-8" style={{ color: "#1E5A3B" }}>
          Review Your Answers
        </h1>
        <div className="bg-white rounded-2xl p-8 border-2" style={{ borderColor: "#E8FAF0" }}>
          <p className="text-lg mb-6" style={{ color: "#2D7A52" }}>
            Please review all your answers before submitting.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSubmit}
            className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
            style={{
              background: "linear-gradient(135deg, #10B981, #059669)",
              color: "#FFFFFF",
              boxShadow: "0 8px 32px rgba(16, 185, 129, 0.4)",
            }}
          >
            <CheckCircle2 className="w-6 h-6" />
            <span>Submit Assessment</span>
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

