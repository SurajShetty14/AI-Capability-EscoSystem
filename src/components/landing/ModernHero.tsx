"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Target, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CountUp from "react-countup"
import { useEffect, useState } from "react"

const stats = [
  {
    value: 12847,
    suffix: "+",
    label: "Developers Assessed",
    subtext: "This month alone",
    icon: Sparkles,
  },
  {
    value: 94,
    suffix: "%",
    label: "Accuracy",
    subtext: "AI evaluation accuracy",
    icon: Target,
  },
  {
    value: 4.8,
    suffix: "/5",
    label: "Rating",
    subtext: "G2 Reviews",
    icon: Star,
  },
]

export function ModernHero() {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    setHasAnimated(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
        {/* Headline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            <span className="bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Hire Developers.
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent">
              10x Faster.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            AI-powered technical assessments that actually work. No more bad
            hires. No more wasted interviews.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl px-8 py-4 text-base font-semibold shadow-[0_0_60px_rgba(139,92,246,0.4)] hover:shadow-[0_0_80px_rgba(139,92,246,0.6)] hover:-translate-y-1 transition-all group"
            >
              <Link href="#pricing" className="flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/5 border-white/10 backdrop-blur-xl text-white hover:bg-white/10 rounded-2xl px-8 py-4"
            >
              <Link href="#demo" className="flex items-center space-x-2">
                <span>↗</span>
                <span>Watch 2-min demo</span>
              </Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
          >
            <span className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>No credit card</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>2 free tests</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>500+ companies</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-5 gap-6 mt-16">
          {/* Large Card - Product Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="lg:col-span-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-white/20 transition-all group"
          >
            <div className="aspect-video bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-center space-y-4 p-8"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">AI</span>
                </div>
                <p className="text-gray-300 font-medium">Product Demo</p>
                <p className="text-sm text-gray-500">
                  Interactive assessment interface
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Small Cards Stack */}
          <div className="lg:col-span-2 space-y-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                        index === 0
                          ? "from-purple-500/20 to-pink-500/20"
                          : index === 1
                          ? "from-blue-500/20 to-cyan-500/20"
                          : "from-yellow-500/20 to-orange-500/20"
                      } flex items-center justify-center border border-white/10`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-1">
                      {hasAnimated ? (
                        <CountUp
                          end={stat.value}
                          decimals={stat.value % 1 !== 0 ? 1 : 0}
                          duration={2}
                          separator=","
                          className="text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                        />
                      ) : (
                        <span className="text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          0
                        </span>
                      )}
                      <span className="text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        {stat.suffix}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-gray-400">{stat.subtext}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

