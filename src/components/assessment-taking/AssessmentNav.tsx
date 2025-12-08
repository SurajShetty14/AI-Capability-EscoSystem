"use client"

import { Timer } from "./Timer"
import { HelpCircle, Menu } from "lucide-react"

interface AssessmentNavProps {
  assessmentTitle: string
  timeRemaining: number
  onHelp: () => void
  onMenu: () => void
}

export function AssessmentNav({ assessmentTitle, timeRemaining, onHelp, onMenu }: AssessmentNavProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b-2 border-[#E8FAF0] px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold" style={{ color: "#1E5A3B" }}>
          {assessmentTitle}
        </h1>
        <div className="flex items-center gap-4">
          <Timer timeRemaining={timeRemaining} />
          <button
            onClick={onHelp}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" style={{ color: "#9CA3AF" }} />
          </button>
          <button
            onClick={onMenu}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" style={{ color: "#9CA3AF" }} />
          </button>
        </div>
      </div>
    </nav>
  )
}

