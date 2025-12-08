"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP Engineering",
    company: "TechCorp",
    employees: "2,500 employees",
    quote:
      "AssessAI reduced our time-to-hire from 6 weeks to 2 weeks. The AI-generated questions are incredibly relevant and the proctoring caught 3 attempts at cheating that we would've missed.",
    rating: 5.0,
    avatar: "SC",
  },
  {
    name: "John Doe",
    role: "Director of Engineering",
    company: "Enterprise Corp",
    employees: "5,000+ employees",
    quote:
      "The cloud labs feature is game-changing. Candidates can prove their AWS skills, not just talk about them. Our false-positive rate dropped from 30% to 5%.",
    rating: 5.0,
    avatar: "JD",
  },
  {
    name: "Mike Chen",
    role: "CTO",
    company: "StartupXYZ",
    employees: "50 employees",
    quote:
      "Best ROI we've seen in recruiting tools. Paid for itself in 2 months. The DSA competency tests are as good as LeetCode but with built-in proctoring.",
    rating: 5.0,
    avatar: "MC",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by Engineering Teams Worldwide
          </h2>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <TestimonialCard
              testimonial={testimonials[currentIndex]}
              isLarge
            />
          </motion.div>
          <div className="space-y-6">
            {testimonials
              .filter((_, i) => i !== currentIndex)
              .slice(0, 2)
              .map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
          </div>
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard
                testimonial={testimonials[currentIndex]}
                isLarge
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* G2 Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>Read 200+ More Reviews on G2</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  isLarge = false,
}: {
  testimonial: (typeof testimonials)[0]
  isLarge?: boolean
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 ${
        isLarge ? "p-8" : "p-6"
      } shadow-lg hover:shadow-xl transition-shadow`}
    >
      <div className="space-y-4">
        {/* Quote */}
        <div className="text-4xl text-gray-300 leading-none">"</div>
        <p className={`text-gray-700 ${isLarge ? "text-lg" : "text-base"}`}>
          {testimonial.quote}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1">
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

        {/* Author */}
        <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">{testimonial.avatar}</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-600">
              {testimonial.role} @ {testimonial.company}
            </p>
            <p className="text-xs text-gray-500">{testimonial.employees}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

