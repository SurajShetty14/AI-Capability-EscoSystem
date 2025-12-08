"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto text-white"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join 500+ companies using AssessAI to hire top developers faster.
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
            >
              <Link href="#pricing">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>
          <p className="text-sm text-blue-100 mt-6">
            No credit card required • 2 free assessments • Full features
          </p>
        </motion.div>
      </div>
    </section>
  )
}

