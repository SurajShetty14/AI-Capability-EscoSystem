"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, FileText } from "lucide-react"

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[500px] flex flex-col items-center justify-center p-16 rounded-3xl border-3 border-dashed"
      style={{
        backgroundColor: "#FAFAFA",
        borderColor: "#C9F4D4",
      }}
    >
      {/* Animated Illustration */}
      <motion.div
        className="relative mb-8"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-60 h-60">
          {/* Main folder */}
          <div
            className="absolute inset-0 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #E8FAF0 0%, #C9F4D4 100%)",
              boxShadow: "0 8px 32px rgba(201, 244, 212, 0.3)",
            }}
          >
            <FileText className="w-24 h-24 text-[#80EFC0]" />
          </div>

          {/* Floating sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-6 h-6 text-[#80EFC0]" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-[#2D7A52] mb-3"
      >
        No assessments yet
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-[#4A9A6A] text-center max-w-md leading-relaxed mb-8"
      >
        Create your first AI-powered assessment to start building employee capabilities and tracking
        skill development
      </motion.p>

      {/* CTA Button */}
      <Link href="/assessments/create">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 rounded-2xl text-[#1E5A3B] font-bold text-lg flex items-center gap-2 shadow-lg relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
            boxShadow: "0 8px 32px rgba(128, 239, 192, 0.5)",
          }}
        >
          {/* Pulse glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #C9F4D4, #80EFC0)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Sparkles className="w-6 h-6 relative z-10" />
          <span className="relative z-10">Create Your First Assessment</span>
        </motion.button>
      </Link>
    </motion.div>
  )
}

