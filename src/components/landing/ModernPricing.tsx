"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "FREE",
    badge: "Try It Out",
    price: "$0",
    subtext: "Forever free",
    duration: "2 assessments",
    features: [
      "2 Free Assessments",
      "10 Candidates",
      "All Competency Types",
      "AI Generation",
      "Basic Proctoring",
      "7-day Data Retention",
    ],
    cta: "Start Free",
    ctaVariant: "outline" as const,
    popular: false,
  },
  {
    name: "GROWTH",
    badge: "🔥 Most Popular",
    price: "$2.50",
    subtext: "per credit",
    duration: "200 credits = $500",
    features: [
      "Everything in Free +",
      "Unlimited Assessments",
      "Advanced Analytics",
      "Priority Support",
      "API Access",
      "Custom Branding",
      "90-day Retention",
    ],
    cta: "Get Started",
    ctaVariant: "default" as const,
    popular: true,
  },
  {
    name: "ENTERPRISE",
    badge: "Custom",
    price: "Let's Talk",
    subtext: "Tailored for you",
    duration: "Unlimited",
    features: [
      "Everything in Growth +",
      "Unlimited Credits",
      "White-Label",
      "SSO/SAML",
      "Dedicated Support",
      "Custom Integrations",
      "Custom Retention",
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    popular: false,
  },
]

export function ModernPricing() {
  return (
    <section id="pricing" className="py-32 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl"></div>
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
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free. Scale when ready. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative ${
                plan.popular ? "md:scale-110 z-10" : ""
              }`}
            >
              {/* Gradient Border for Popular Plan */}
              {plan.popular && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur opacity-75 animate-pulse"></div>
              )}

              <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 overflow-hidden hover:border-white/20 transition-all">
                {/* Badge */}
                <div className="mb-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-7xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{plan.subtext}</p>
                  <p className="text-gray-500 text-xs mt-1">{plan.duration}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  variant={plan.ctaVariant}
                  size="lg"
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-[0_0_60px_rgba(139,92,246,0.5)]"
                      : "border-white/20 text-white hover:bg-white/10"
                  } rounded-2xl py-4 group`}
                >
                  <Link href={plan.name === "ENTERPRISE" ? "#contact" : "#"} className="flex items-center justify-center space-x-2">
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>No setup fees</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>Cancel anytime</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>Money-back guarantee</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

