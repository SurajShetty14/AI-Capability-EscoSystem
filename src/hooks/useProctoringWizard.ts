import { useState } from "react"

export interface ProctoringWizardState {
  currentStep: number
  cameraGranted: boolean
  cameraDeviceId?: string
  screenShared: boolean
  fullScreenEnabled: boolean
  consentGiven: boolean
  consentNoUnauthorized: boolean
  consentQuietLocation: boolean
}

export function useProctoringWizard() {
  const [state, setState] = useState<ProctoringWizardState>({
    currentStep: 1,
    cameraGranted: false,
    screenShared: false,
    fullScreenEnabled: false,
    consentGiven: false,
    consentNoUnauthorized: false,
    consentQuietLocation: false,
  })

  const totalSteps = 3

  const nextStep = () => {
    if (state.currentStep < totalSteps) {
      setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }))
    }
  }

  const previousStep = () => {
    if (state.currentStep > 1) {
      setState((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }))
    }
  }

  const updateState = (updates: Partial<ProctoringWizardState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const canProceedToNext = () => {
    switch (state.currentStep) {
      case 1:
        return state.cameraGranted
      case 2:
        return state.screenShared
      case 3:
        return (
          state.fullScreenEnabled &&
          state.consentGiven &&
          state.consentNoUnauthorized &&
          state.consentQuietLocation
        )
      default:
        return false
    }
  }

  const progress = (state.currentStep / totalSteps) * 100

  return {
    state,
    totalSteps,
    progress,
    nextStep,
    previousStep,
    updateState,
    canProceedToNext,
  }
}

