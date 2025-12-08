"use client"

import { motion } from "framer-motion"
import { Sparkles, Code, Cloud, Eye, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Sparkles,
    title: "AI-Generated Questions",
    description:
      "Role-based questions generated in 5 minutes using GPT-4, Gemini, and Claude. Always unique, never repeated.",
    metric: "5 min average creation time",
    cta: "See Example",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Code,
    title: "Real Coding Environment",
    description:
      "Judge0-powered execution in 13+ languages with instant feedback and hidden test cases.",
    metric: "13+ languages supported",
    cta: "Try Live Demo",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Cloud,
    title: "Hands-on Cloud Labs",
    description:
      "Real AWS, Azure, and GCP environments. Candidates perform actual infrastructure tasks with automated validation.",
    metric: "100% hands-on evaluation",
    cta: "Learn More",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Eye,
    title: "AI-Powered Proctoring",
    description:
      "Custom-built proctoring with 96% cheating detection rate. Video, audio, screen recording with violation alerts.",
    metric: "96% detection accuracy",
    cta: "View Demo",
    color: "from-red-500 to-orange-500",
  },
]

export function FeaturesSection() {
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
            Everything You Need to Hire Better
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="space-y-6">
                  {/* Screenshot Placeholder */}
                  <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                    <div className="text-center space-y-2 p-8">
                      <div
                        className={`w-16 h-16 mx-auto rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-sm text-gray-500">
                        {feature.title} Preview
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {feature.metric}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="#"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform"
                  >
                    <span>{feature.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

