"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Rocket } from "lucide-react"
import { useProctoringWizard } from "@/hooks/useProctoringWizard"
import { CameraStep } from "./steps/CameraStep"
import { ScreenShareStep } from "./steps/ScreenShareStep"
import { FullScreenStep } from "./steps/FullScreenStep"

interface ProctoringWizardProps {
  isOpen: boolean
  onComplete: () => void
  onClose: () => void
}

const stepTitles = [
  { icon: "📹", title: "Camera Setup" },
  { icon: "🖥️", title: "Screen Sharing" },
  { icon: "⤢", title: "Full Screen Mode" },
]

export function ProctoringWizard({ isOpen, onComplete, onClose }: ProctoringWizardProps) {
  const {
    state,
    totalSteps,
    progress,
    nextStep,
    previousStep,
    updateState,
    canProceedToNext,
  } = useProctoringWizard()

  const handleNext = () => {
    if (state.currentStep < totalSteps) {
      nextStep()
    } else {
      onComplete()
    }
  }

  const handleStateUpdate = (updates: any) => {
    updateState(updates)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-lg z-[9998]"
            onClick={(e) => {
              e.stopPropagation()
            }}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-[800px] max-h-[90vh] bg-white rounded-3xl overflow-hidden flex flex-col"
              style={{
                boxShadow: "0 24px 96px rgba(30, 90, 59, 0.2)",
              }}
            >
              {/* Progress Bar */}
              <div className="px-8 pt-8 pb-4">
                <div className="text-center mb-3">
                  <span className="text-sm font-semibold" style={{ color: "#4A9A6A" }}>
                    Step {state.currentStep} of {totalSteps}
                  </span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #C9F4D4, #80EFC0)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Step Title */}
              <div className="px-8 pb-6">
                <h2 className="text-4xl font-black mb-2 flex items-center gap-4" style={{ color: "#1E5A3B" }}>
                  <span className="text-5xl">{stepTitles[state.currentStep - 1].icon}</span>
                  <span>{stepTitles[state.currentStep - 1].title}</span>
                </h2>
              </div>

              {/* Step Content */}
              <div className="px-8 pb-8 flex-1 overflow-y-auto min-h-[400px]">
                <AnimatePresence mode="wait">
                  {state.currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <CameraStep
                        onCameraGranted={(granted, deviceId) =>
                          handleStateUpdate({ cameraGranted: granted, cameraDeviceId: deviceId })
                        }
                        cameraGranted={state.cameraGranted}
                      />
                    </motion.div>
                  )}

                  {state.currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ScreenShareStep
                        onScreenShared={(shared) => handleStateUpdate({ screenShared: shared })}
                        screenShared={state.screenShared}
                      />
                    </motion.div>
                  )}

                  {state.currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <FullScreenStep
                        onFullScreenEnabled={(enabled) => handleStateUpdate({ fullScreenEnabled: enabled })}
                        onConsentChange={(field, value) => handleStateUpdate({ [field]: value })}
                        fullScreenEnabled={state.fullScreenEnabled}
                        consentGiven={state.consentGiven}
                        consentNoUnauthorized={state.consentNoUnauthorized}
                        consentQuietLocation={state.consentQuietLocation}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Navigation */}
              <div className="p-6 border-t-2 flex items-center justify-between" style={{ borderColor: "#E8FAF0" }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={previousStep}
                  disabled={state.currentStep === 1}
                  className="px-6 py-3 rounded-xl font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  style={{
                    color: state.currentStep === 1 ? "#9CA3AF" : "#6B7280",
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </motion.button>

                <motion.button
                  whileHover={canProceedToNext() ? { scale: 1.02 } : {}}
                  whileTap={canProceedToNext() ? { scale: 0.98 } : {}}
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  className="px-8 py-4 rounded-xl font-bold text-base flex items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: canProceedToNext()
                      ? state.currentStep === totalSteps
                        ? "linear-gradient(135deg, #1E5A3B, #2D7A52, #80EFC0)"
                        : "linear-gradient(135deg, #80EFC0, #10B981)"
                      : "linear-gradient(135deg, #9CA3AF, #6B7280)",
                    color: "#FFFFFF",
                    boxShadow: canProceedToNext()
                      ? "0 8px 32px rgba(30, 90, 59, 0.4)"
                      : "none",
                    width: state.currentStep === totalSteps ? "240px" : "200px",
                    height: state.currentStep === totalSteps ? "64px" : "52px",
                    fontSize: state.currentStep === totalSteps ? "20px" : "16px",
                  }}
                >
                  {state.currentStep === totalSteps ? (
                    <>
                      <Rocket className="w-6 h-6" />
                      <span>Start Assessment</span>
                    </>
                  ) : (
                    <>
                      <span>Next Step</span>
                      <span>→</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

