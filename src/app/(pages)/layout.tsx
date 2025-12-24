"use client"

import { UnifiedTopBar } from "@/components/dashboard/UnifiedTopBar"
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts"
import { useState } from "react"
import { CommandPalette } from "@/components/dashboard/CommandPalette"
import { ModeProvider } from "@/contexts/ModeContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  // Global keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: "k",
      metaKey: true,
      callback: () => setIsCommandPaletteOpen(true),
    },
  ])

  return (
    <ModeProvider>
      <div className="min-h-screen bg-mint-50">
        <UnifiedTopBar onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)} />
        <main className="pt-0">
          {children}
        </main>
        <CommandPalette open={isCommandPaletteOpen} onOpenChange={setIsCommandPaletteOpen} />
      </div>
    </ModeProvider>
  )
}
