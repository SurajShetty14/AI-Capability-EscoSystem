"use client"

import { motion } from "framer-motion"
import { Sparkles, Code, Cloud, Eye, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Questions",
    description:
      "GPT-4 generates unique, role-specific questions in 5 minutes. Never repeat. Always relevant.",
    metric: "⚡ 5 min avg. creation",
    link: "See examples",
    gradient: "from-purple-500/30 to-pink-500/30",
  },
  {
    icon: Code,
    title: "Real Code Execution",
    description:
      "Judge0-powered sandbox in 13+ languages. Instant feedback with hidden test cases.",
    metric: "🔥 13+ languages",
    link: "Try demo",
    gradient: "from-blue-500/30 to-cyan-500/30",
  },
  {
    icon: Cloud,
    title: "Hands-On Cloud Labs",
    description:
      "Spin up real AWS/Azure/GCP environments. Candidates prove skills, not just talk.",
    metric: "🎯 100% practical",
    link: "Explore labs",
    gradient: "from-green-500/30 to-emerald-500/30",
  },
  {
    icon: Eye,
    title: "Smart Proctoring",
    description:
      "Custom AI monitoring with 96% detection rate. Face, voice, screen, tab switching.",
    metric: "🛡️ 96% detection",
    link: "View security",
    gradient: "from-red-500/30 to-orange-500/30",
  },
]

export function GlassFeatureCards() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl"></div>
      </div>

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
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Powerful features that make technical hiring faster, smarter, and
            more accurate.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -12, transition: { duration: 0.2 } }}
                className="relative group"
              >
                {/* Glassmorphism Card */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 overflow-hidden relative hover:border-white/20 hover:shadow-[0_0_80px_rgba(139,92,246,0.4)] transition-all">
                  {/* Inner Gradient Orb */}
                  <div
                    className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${feature.gradient} rounded-full filter blur-3xl opacity-30 group-hover:opacity-50 group-hover:rotate-45 transition-all duration-500`}
                  />

                  <div className="relative z-10 space-y-6">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 flex items-center justify-center"
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Metric Badge */}
                    <div className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 text-sm font-medium text-white group-hover:border-purple-500/50 transition-colors">
                      {feature.metric}
                    </div>

                    {/* Link */}
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-medium group-hover:translate-x-1 transition-transform"
                    >
                      <span>{feature.link}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
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

