"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const companies = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Stripe"]

export function BoldFinalCTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-purple-950/30 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-purple-300 via-pink-300 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Ready to Transform Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent">
            Hiring Process?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl text-gray-400 mb-12"
        >
          Start free. No credit card required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          className="mb-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl px-12 py-6 text-xl font-bold shadow-[0_0_120px_rgba(139,92,246,0.6)] hover:shadow-[0_0_150px_rgba(139,92,246,0.8)] transition-all group max-w-md mx-auto"
          >
            <Link href="/dashboard" className="flex items-center justify-center space-x-3">
              <span>Start Your Free Trial</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-base text-gray-500 mb-6">Join 500+ companies</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
                className="h-10 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
              >
                <span className="text-gray-400 font-semibold text-sm">
                  {company}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

