"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mail, User, CheckCircle2 } from "lucide-react"

export default function TakeAssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id as string
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    agreeTerms: false,
    consentProctoring: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.email && formData.name && formData.agreeTerms && formData.consentProctoring) {
      router.push(`/take/${assessmentId}/system-check`)
    }
  }

  const isFormValid = formData.email && formData.name && formData.agreeTerms && formData.consentProctoring

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8FAF0] via-[#F0FDF4] to-white flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2"
        style={{ borderColor: "#E8FAF0" }}
      >
        <h1 className="text-3xl font-black mb-2 text-center" style={{ color: "#1E5A3B" }}>
          Assessment Login
        </h1>
        <p className="text-center mb-8" style={{ color: "#4A9A6A" }}>
          Enter your details to begin
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1E5A3B" }}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#9CA3AF" }} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 transition-all"
                style={{ borderColor: "#E8FAF0", backgroundColor: "#FAFAFA" }}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1E5A3B" }}>
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#9CA3AF" }} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 transition-all"
                style={{ borderColor: "#E8FAF0", backgroundColor: "#FAFAFA" }}
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="mt-1 w-5 h-5 rounded-md border-2 cursor-pointer"
                style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
              />
              <span className="text-sm" style={{ color: "#2D7A52" }}>
                I agree to the terms and conditions
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consentProctoring}
                onChange={(e) => setFormData({ ...formData, consentProctoring: e.target.checked })}
                className="mt-1 w-5 h-5 rounded-md border-2 cursor-pointer"
                style={{ borderColor: "#C9F4D4", accentColor: "#80EFC0" }}
              />
              <span className="text-sm" style={{ color: "#2D7A52" }}>
                I consent to proctoring during this assessment
              </span>
            </label>
          </div>

          <motion.button
            type="submit"
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            disabled={!isFormValid}
            className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: isFormValid
                ? "linear-gradient(135deg, #1E5A3B, #2D7A52, #80EFC0)"
                : "linear-gradient(135deg, #9CA3AF, #6B7280)",
              color: "#FFFFFF",
              boxShadow: isFormValid ? "0 8px 32px rgba(30, 90, 59, 0.4)" : "none",
            }}
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

