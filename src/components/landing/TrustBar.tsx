"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Netflix",
  "Stripe",
  "Airbnb",
  "Shopify",
]

export function TrustBar() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm font-medium text-gray-500 mb-8"
        >
          Trusted by 500+ leading companies
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {companies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="flex items-center justify-center"
            >
              <div className="h-10 w-full flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <span className="text-gray-400 font-semibold text-sm">
                  {company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

