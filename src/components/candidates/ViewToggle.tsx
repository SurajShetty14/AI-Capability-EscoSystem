"use client"

import { motion } from "framer-motion"
import { LayoutGrid, List, Kanban } from "lucide-react"

type ViewMode = "cards" | "list" | "board"

interface ViewToggleProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  const views: { mode: ViewMode; icon: React.ComponentType<{ className?: string }>; label: string }[] =
    [
      { mode: "cards", icon: LayoutGrid, label: "Cards" },
      { mode: "list", icon: List, label: "List" },
      { mode: "board", icon: Kanban, label: "Board" },
    ]

  return (
    <div className="inline-flex p-1 rounded-xl bg-gray-100 gap-1">
      {views.map((view) => {
        const Icon = view.icon
        const isActive = currentView === view.mode

        return (
          <motion.button
            key={view.mode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewChange(view.mode)}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
              isActive
                ? "bg-white text-[#1E5A3B] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            style={{
              color: isActive ? "#1E5A3B" : undefined,
            }}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-[#80EFC0]" : "text-gray-400"}`} />
            <span>{view.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

