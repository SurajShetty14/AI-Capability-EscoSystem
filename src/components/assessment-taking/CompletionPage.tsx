"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Trophy } from "lucide-react"

export function CompletionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8FAF0] via-[#F0FDF4] to-white flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center border-2"
        style={{ borderColor: "#E8FAF0" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        <h1 className="text-4xl font-black mb-4" style={{ color: "#1E5A3B" }}>
          Assessment Completed!
        </h1>
        <p className="text-lg mb-8" style={{ color: "#4A9A6A" }}>
          Thank you for completing the assessment. Your results will be reviewed and you will be notified soon.
        </p>
        <div className="flex items-center justify-center gap-2 text-xl font-bold" style={{ color: "#1E5A3B" }}>
          <Trophy className="w-6 h-6" />
          <span>Great job!</span>
        </div>
      </motion.div>
    </div>
  )
}

