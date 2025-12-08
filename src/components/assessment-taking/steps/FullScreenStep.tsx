"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Maximize2, CheckCircle2, AlertTriangle } from "lucide-react"

interface FullScreenStepProps {
  onFullScreenEnabled: (enabled: boolean) => void
  onConsentChange: (field: string, value: boolean) => void
  fullScreenEnabled: boolean
  consentGiven: boolean
  consentNoUnauthorized: boolean
  consentQuietLocation: boolean
}

export function FullScreenStep({
  onFullScreenEnabled,
  onConsentChange,
  fullScreenEnabled,
  consentGiven,
  consentNoUnauthorized,
  consentQuietLocation,
}: FullScreenStepProps) {
  const [isEnabling, setIsEnabling] = useState(false)

  const handleEnableFullScreen = async () => {
    setIsEnabling(true)
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        onFullScreenEnabled(true)
      } else {
        onFullScreenEnabled(true)
      }
    } catch (error) {
      console.error("Fullscreen failed:", error)
      onFullScreenEnabled(true)
    } finally {
      setIsEnabling(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center"
        >
          <div
            className="w-32 h-32 rounded-3xl flex items-center justify-center"
            style={{
              backgroundColor: "rgba(128, 239, 192, 0.1)",
            }}
          >
            <Maximize2 className="w-16 h-16" style={{ color: "#80EFC0" }} />
          </div>
        </motion.div>

        <div className="max-w-md mx-auto space-y-4">
          <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
            The assessment will run in full screen
          </h3>
          <p className="text-lg leading-relaxed" style={{ color: "#2D7A52" }}>
            This helps prevent distractions and ensures a focused testing environment.
          </p>
        </div>

        {!fullScreenEnabled ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEnableFullScreen}
            disabled={isEnabling}
            className="w-72 h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-3 mx-auto transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #80EFC0, #10B981)",
              color: "#1E5A3B",
              boxShadow: "0 8px 32px rgba(128, 239, 192, 0.4)",
            }}
          >
            {isEnabling ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Enabling...</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-6 h-6" />
                <span>Enable Full Screen</span>
              </>
            )}
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl mx-auto max-w-md"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "2px solid #A7F3D0",
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="text-lg font-bold text-green-900">Full screen enabled</span>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl mx-auto max-w-md"
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "2px solid #FCA5A5",
          }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm font-semibold text-red-900">
              Exiting full screen will pause your test
            </div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-4 pt-8 border-t-2" style={{ borderColor: "#E8FAF0" }}>
        <h4 className="text-lg font-bold" style={{ color: "#1E5A3B" }}>
          Consent & Agreement
        </h4>
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => onConsentChange("consentGiven", e.target.checked)}
              className="mt-1 w-6 h-6 rounded-md border-2 cursor-pointer"
              style={{
                borderColor: consentGiven ? "#80EFC0" : "#C9F4D4",
                accentColor: "#80EFC0",
              }}
            />
            <span className="text-base flex-1" style={{ color: "#2D7A52" }}>
              I understand and consent to proctoring during this assessment
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={consentNoUnauthorized}
              onChange={(e) => onConsentChange("consentNoUnauthorized", e.target.checked)}
              className="mt-1 w-6 h-6 rounded-md border-2 cursor-pointer"
              style={{
                borderColor: consentNoUnauthorized ? "#80EFC0" : "#C9F4D4",
                accentColor: "#80EFC0",
              }}
            />
            <span className="text-base flex-1" style={{ color: "#2D7A52" }}>
              I will not use unauthorized resources or assistance
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={consentQuietLocation}
              onChange={(e) => onConsentChange("consentQuietLocation", e.target.checked)}
              className="mt-1 w-6 h-6 rounded-md border-2 cursor-pointer"
              style={{
                borderColor: consentQuietLocation ? "#80EFC0" : "#C9F4D4",
                accentColor: "#80EFC0",
              }}
            />
            <span className="text-base flex-1" style={{ color: "#2D7A52" }}>
              I am in a quiet, private location suitable for testing
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

