"use client"

import { motion } from "framer-motion"
import { X, Check } from "lucide-react"

const comparisons = [
  {
    feature: "Time to create test",
    traditional: "3-5 days",
    assessai: "5 minutes with AI",
  },
  {
    feature: "Question quality",
    traditional: "Static question banks",
    assessai: "Dynamic, unique questions",
  },
  {
    feature: "Code evaluation",
    traditional: "Manual code review",
    assessai: "Instant AI evaluation",
  },
  {
    feature: "Assessment type",
    traditional: "Theoretical only",
    assessai: "Hands-on: Code/Cloud/AI",
  },
  {
    feature: "Results",
    traditional: "Generic results",
    assessai: "Skill-gap analysis",
  },
  {
    feature: "Proctoring",
    traditional: "Basic proctoring",
    assessai: "96% cheating detection",
  },
  {
    feature: "Language support",
    traditional: "Limited languages",
    assessai: "13+ programming languages",
  },
]

export function Comparison() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why AssessAI Beats Traditional Screening
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how we compare to traditional assessment methods.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="p-6 font-semibold">Feature</div>
            <div className="p-6 font-semibold border-l border-white/20">
              Traditional Screening
            </div>
            <div className="p-6 font-semibold border-l border-white/20">
              AssessAI
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {comparisons.map((comparison, index) => (
              <motion.div
                key={comparison.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="grid grid-cols-3 hover:bg-gray-50 transition-colors"
              >
                <div className="p-6 font-medium text-gray-900">
                  {comparison.feature}
                </div>
                <div className="p-6 border-l border-gray-200 flex items-center space-x-2 text-gray-700">
                  <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span>{comparison.traditional}</span>
                </div>
                <div className="p-6 border-l border-gray-200 flex items-center space-x-2 text-gray-700 font-medium">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{comparison.assessai}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Customer Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">SC</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-4 italic">
                "We reduced time-to-hire from 45 days to 18 days"
              </p>
              <div>
                <p className="font-semibold text-gray-900">Sarah Chen</p>
                <p className="text-sm text-gray-600">VP Engineering @ TechCorp</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

