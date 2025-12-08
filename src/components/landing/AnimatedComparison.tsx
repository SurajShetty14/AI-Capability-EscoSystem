"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Check } from "lucide-react"

const traditionalItems = [
  "3-5 days to create assessments",
  "Static question banks (repeated questions)",
  "Manual code review (slow & inconsistent)",
  "Theoretical tests only",
  "Basic proctoring (easy to cheat)",
  "No skill-gap insights",
]

const assessaiItems = [
  "5 minutes with AI (95% faster)",
  "Dynamic questions (never repeated)",
  "Instant AI evaluation (100% consistent)",
  "Hands-on: Code + Cloud + AI",
  "96% cheating detection (AI-powered)",
  "Detailed skill-gap analysis",
]

export function AnimatedComparison() {
  const [viewMode, setViewMode] = useState<"split" | "traditional" | "assessai">("split")

  return (
    <section className="py-32 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Why Teams Choose AssessAI
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See the difference in seconds, not spreadsheets
          </p>
        </motion.div>

        {/* Toggle (Desktop Only) */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 inline-flex">
            <button
              onClick={() => setViewMode("split")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === "split"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode("traditional")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === "traditional"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Traditional
            </button>
            <button
              onClick={() => setViewMode("assessai")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === "assessai"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              AssessAI
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`bg-red-500/5 border border-red-500/20 rounded-3xl p-8 backdrop-blur-xl ${
              viewMode === "assessai" ? "opacity-50 scale-95" : ""
            } transition-all`}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Traditional</h3>
            <div className="space-y-4">
              {traditionalItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start space-x-3"
                >
                  <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-red-500/20 text-center">
              <p className="text-4xl mb-2">😞</p>
              <p className="text-gray-500 text-sm">Old way is slow & manual</p>
            </div>
          </motion.div>

          {/* AssessAI Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.3)] ${
              viewMode === "traditional" ? "opacity-50 scale-95" : "scale-105"
            } transition-all`}
          >
            <h3 className="text-2xl font-bold text-white mb-6">AssessAI</h3>
            <div className="space-y-4">
              {assessaiItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-purple-500/30 text-center">
              <p className="text-4xl mb-2">🚀</p>
              <p className="text-gray-300 text-sm">Our way is fast & automated</p>
            </div>
          </motion.div>
        </div>

        {/* Stats Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Traditional</span>
                <span className="text-gray-400">45 days</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">AssessAI</span>
                <span className="text-white font-semibold">18 days</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "40%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  className="h-full bg-gradient-to-r from-green-500 via-purple-500 to-pink-500"
                />
              </div>
              <p className="text-sm text-green-400 mt-2">↓ 60% Faster</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          <p className="text-xl text-gray-300 italic mb-4">
            "We cut our hiring time in half and improved quality. AssessAI is a
            no-brainer."
          </p>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-white font-bold">SC</span>
            </div>
            <div>
              <p className="text-white font-semibold">Sarah Chen</p>
              <p className="text-sm text-gray-400">VP Engineering @ TechCorp</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

