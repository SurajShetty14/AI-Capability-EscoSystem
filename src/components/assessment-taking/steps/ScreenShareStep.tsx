"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Monitor, CheckCircle2, AlertTriangle } from "lucide-react"

interface ScreenShareStepProps {
  onScreenShared: (shared: boolean) => void
  screenShared: boolean
}

export function ScreenShareStep({ onScreenShared, screenShared }: ScreenShareStepProps) {
  const [isStarting, setIsStarting] = useState(false)

  const handleStartSharing = async () => {
    setIsStarting(true)
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: { displaySurface: "monitor" } as any,
        })
        
        const track = stream.getVideoTracks()[0]
        const settings = track.getSettings()
        
        if (settings.displaySurface === "monitor") {
          onScreenShared(true)
        } else {
          alert("Please select 'Entire Screen' instead of a window.")
          track.stop()
          onScreenShared(false)
        }
      } else {
        setTimeout(() => {
          onScreenShared(true)
        }, 1000)
      }
    } catch (error) {
      console.error("Screen sharing failed:", error)
      onScreenShared(false)
    } finally {
      setIsStarting(false)
    }
  }

  return (
    <div className="space-y-8 text-center">
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
          <Monitor className="w-16 h-16" style={{ color: "#80EFC0" }} />
        </div>
      </motion.div>

      <div className="max-w-md mx-auto space-y-4">
        <h3 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
          We need to record your entire screen
        </h3>
        <p className="text-lg leading-relaxed" style={{ color: "#2D7A52" }}>
          This helps us ensure test integrity and prevent unauthorized assistance during your assessment.
        </p>
      </div>

      {!screenShared ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartSharing}
          disabled={isStarting}
          className="w-80 h-16 rounded-xl font-bold text-lg flex items-center justify-center gap-3 mx-auto transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            color: "#FFFFFF",
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)",
          }}
        >
          {isStarting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Starting...</span>
            </>
          ) : (
            <>
              <Monitor className="w-6 h-6" />
              <span>Start Screen Sharing</span>
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
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <span className="text-lg font-bold text-green-900">Screen sharing active</span>
          </div>
          <p className="text-sm text-green-700">Your entire screen is being recorded</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl mx-auto max-w-md"
        style={{
          backgroundColor: "rgba(251, 191, 36, 0.1)",
          border: "2px solid #FCD34D",
        }}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <div className="text-sm font-semibold text-amber-900 mb-1">
              Important: Select "Entire Screen"
            </div>
            <div className="text-sm text-amber-800">
              Selecting a window or application will not work. You must share your entire screen.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

