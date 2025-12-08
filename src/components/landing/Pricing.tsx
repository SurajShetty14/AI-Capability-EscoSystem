"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "FREE TRIAL",
    price: "Free",
    duration: "7 days",
    description: "Perfect for trying out AssessAI",
    features: [
      "2 Free Assessments",
      "10 Candidates",
      "All competency types (Assessment, DSA, Cloud, AI)",
      "AI generation",
      "Full proctoring",
      "7-day data retention",
    ],
    cta: "Start Free Trial",
    ctaVariant: "outline" as const,
    popular: false,
  },
  {
    name: "GROWTH",
    price: "$2.50",
    priceSubtext: "per credit",
    package: "200 credits = $500",
    description: "For growing teams",
    features: [
      "Everything in Free +",
      "Unlimited assessments",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom branding",
      "90-day data retention",
    ],
    cta: "Buy Credits",
    ctaVariant: "default" as const,
    popular: true,
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Growth +",
      "Unlimited credits",
      "White-label",
      "SSO/SAML",
      "Dedicated support",
      "Custom integrations",
      "Custom data retention",
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works for you. All plans include full features.
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
              className={`relative bg-white rounded-2xl border p-8 ${
                plan.popular
                  ? "border-blue-600 shadow-2xl scale-105"
                  : "border-gray-200 shadow-sm"
              } hover:shadow-xl transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold mb-2">
                    {plan.name}
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.priceSubtext && (
                      <span className="text-sm text-gray-600">
                        {plan.priceSubtext}
                      </span>
                    )}
                  </div>
                  {plan.duration && (
                    <p className="text-sm text-gray-600 mt-1">{plan.duration}</p>
                  )}
                  {plan.package && (
                    <p className="text-sm text-gray-600 mt-1">{plan.package}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
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
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      : ""
                  }`}
                >
                  <Link href={plan.name === "ENTERPRISE" ? "#contact" : "#"}>
                    {plan.cta}
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
          <p className="text-sm text-gray-600">
            No setup fees • Cancel anytime • Money-back guarantee
          </p>
          <a
            href="#"
            className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View Detailed Feature Comparison ↓
          </a>
        </motion.div>
      </div>
    </section>
  )
}

