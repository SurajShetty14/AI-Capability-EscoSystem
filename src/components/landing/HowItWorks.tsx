"use client"

import { motion } from "framer-motion"
import { FileText, Play, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Create Assessment",
    description:
      "Select role, skills, and difficulty. Our AI generates unique questions in 5 minutes.",
  },
  {
    number: "02",
    icon: Play,
    title: "Candidates Take Test",
    description:
      "Candidates code in real environments, solve cloud challenges, or answer AI/ML questions.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Get Instant Results",
    description:
      "AI evaluates submissions, detects cheating, and provides detailed skill-gap analysis.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in minutes. No complex setup required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 -z-10" />
                )}

                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="space-y-6">
                    {/* Number Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <span className="text-6xl font-bold text-gray-100">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

