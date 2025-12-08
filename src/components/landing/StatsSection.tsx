"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, Star } from "lucide-react"
import CountUp from "react-countup"
import { useEffect, useState } from "react"

const stats = [
  {
    icon: Users,
    value: 12847,
    suffix: "+",
    label: "Developers Assessed",
    subtext: "This month alone",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: TrendingUp,
    value: 94,
    suffix: "%",
    label: "Pass Rate Accuracy",
    subtext: "Industry-leading AI evaluation",
    color: "from-green-500 to-green-600",
    comparison: { traditional: 67, assessai: 94 },
  },
  {
    icon: Star,
    value: 4.8,
    suffix: "/5.0",
    label: "G2 Rating",
    subtext: "From 200+ reviews",
    color: "from-yellow-500 to-yellow-600",
  },
]

export function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById("stats-section")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section
      id="stats-section"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline space-x-1">
                    {hasAnimated ? (
                      <CountUp
                        end={stat.value}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                        duration={2}
                        separator=","
                        className="text-4xl font-bold text-gray-900"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-gray-900">0</span>
                    )}
                    <span className="text-4xl font-bold text-gray-900">
                      {stat.suffix}
                    </span>
                  </div>

                  <h3 className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-gray-500">{stat.subtext}</p>

                  {stat.comparison && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Traditional</span>
                        <span className="text-gray-600">AssessAI</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={
                              hasAnimated ? { width: `${stat.comparison.traditional}%` } : {}
                            }
                            transition={{ delay: 1, duration: 1 }}
                            className="h-full bg-red-500"
                          />
                        </div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={
                              hasAnimated ? { width: `${stat.comparison.assessai}%` } : {}
                            }
                            transition={{ delay: 1.2, duration: 1 }}
                            className="h-full bg-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

