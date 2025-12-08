"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="relative w-full h-1 bg-mint-50 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-mint-100 to-mint-200 rounded-full"
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] font-medium text-text-subtle">
        {Math.round(progress)}%
      </div>
    </div>
  )
}

