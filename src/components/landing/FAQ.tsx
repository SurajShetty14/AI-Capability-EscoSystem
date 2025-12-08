"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How does AI-generated assessment work?",
    answer:
      "Our AI analyzes the job role, required skills, and difficulty level to generate unique, role-specific questions in minutes. Each assessment is tailored to the position and never repeated.",
  },
  {
    question: "What programming languages are supported?",
    answer:
      "We support 13+ languages including Python, JavaScript, Java, C++, Go, Rust, and more. All languages run in real execution environments with instant feedback.",
  },
  {
    question: "How accurate is the AI proctoring?",
    answer:
      "Our custom-built proctoring system has a 96% cheating detection rate. It monitors video, audio, screen activity, and browser behavior to detect violations in real-time.",
  },
  {
    question: "Can I customize assessments?",
    answer:
      "Yes! You can customize question difficulty, time limits, languages, and even add your own questions. Enterprise plans include full white-label customization.",
  },
  {
    question: "What happens to candidate data?",
    answer:
      "Candidate data is encrypted and stored securely. You control retention periods (7 days for Free, 90 days for Growth, custom for Enterprise). We're GDPR and SOC 2 compliant.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation required! Everything runs in the browser. Candidates just need a stable internet connection and a webcam for proctored assessments.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-32 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about AssessAI.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 text-gray-400 border-t border-white/10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

