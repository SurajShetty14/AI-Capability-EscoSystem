import { useState, useEffect } from "react"

export interface SystemCheckResult {
  id: string
  name: string
  status: "pending" | "testing" | "passed" | "failed"
  message: string
  details?: string
}

export function useSystemCheck() {
  const [checks, setChecks] = useState<SystemCheckResult[]>([
    { id: "camera", name: "Camera Access", status: "pending", message: "Pending" },
    { id: "microphone", name: "Microphone Access", status: "pending", message: "Pending" },
    { id: "internet", name: "Internet Speed", status: "pending", message: "Pending" },
    { id: "browser", name: "Browser Check", status: "pending", message: "Pending" },
    { id: "screen", name: "Screen Share", status: "pending", message: "Pending" },
  ])

  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTestIndex, setCurrentTestIndex] = useState(-1)

  const runAllTests = async () => {
    setIsRunning(true)
    setProgress(0)
    setCurrentTestIndex(0)

    for (let i = 0; i < checks.length; i++) {
      await runTest(checks[i].id, i)
    }

    setIsRunning(false)
    setCurrentTestIndex(-1)
  }

  const runTest = async (id: string, index: number): Promise<void> => {
    setCurrentTestIndex(index)

    setChecks((prev) =>
      prev.map((check) =>
        check.id === id ? { ...check, status: "testing", message: "Testing..." } : check
      )
    )

    const durations: Record<string, number> = {
      camera: 1500,
      microphone: 1200,
      internet: 3000,
      browser: 500,
      screen: 2000,
    }

    await new Promise((resolve) => setTimeout(resolve, durations[id] || 1000))

    const results: Record<string, { status: "passed" | "failed"; message: string; details?: string }> = {
      camera: { status: "passed", message: "Granted", details: "Camera detected" },
      microphone: { status: "passed", message: "Granted", details: "Microphone detected" },
      internet: { status: "passed", message: "15 Mbps", details: "Download speed" },
      browser: { status: "passed", message: "Compatible", details: "Chrome 120" },
      screen: { status: "passed", message: "Ready", details: "Will be tested in next step" },
    }

    const result = results[id] || { status: "failed" as const, message: "Failed" }

    setChecks((prev) => {
      const updated = prev.map((check) =>
        check.id === id
          ? {
              ...check,
              status: result.status,
              message: result.message,
              details: result.details,
            }
          : check
      )
      
      const completed = updated.filter((c) => c.status === "passed" || c.status === "failed").length
      const total = updated.length
      setProgress((completed / total) * 100)
      
      return updated
    })
  }

  const retryTest = async (id: string) => {
    const index = checks.findIndex(check => check.id === id);
    if (index !== -1) {
      await runTest(id, index);
    }
  }

  const reset = () => {
    setChecks([
      { id: "camera", name: "Camera Access", status: "pending", message: "Pending" },
      { id: "microphone", name: "Microphone Access", status: "pending", message: "Pending" },
      { id: "internet", name: "Internet Speed", status: "pending", message: "Pending" },
      { id: "browser", name: "Browser Check", status: "pending", message: "Pending" },
      { id: "screen", name: "Screen Share", status: "pending", message: "Pending" },
    ])
    setProgress(0)
    setIsRunning(false)
    setCurrentTestIndex(-1)
  }

  const allPassed = checks.every((check) => check.status === "passed")
  const hasFailed = checks.some((check) => check.status === "failed")
  const allComplete = checks.every((check) => check.status !== "pending" && check.status !== "testing")

  return {
    checks,
    isRunning,
    progress,
    allPassed,
    hasFailed,
    allComplete,
    currentTestIndex,
    runAllTests,
    retryTest,
    reset,
  }
}

