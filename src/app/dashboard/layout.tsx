"use client"

import { FloatingTopBar } from "@/components/dashboard/FloatingTopBar"
import { FloatingTabs } from "@/components/dashboard/FloatingTabs"
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts"
import { useState } from "react"
import { CommandPalette } from "@/components/dashboard/CommandPalette"

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
    <div className="min-h-screen bg-mint-50">
      <FloatingTopBar onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)} />
      <FloatingTabs />
      <main className="pt-24">
        {children}
      </main>
      <CommandPalette open={isCommandPaletteOpen} onOpenChange={setIsCommandPaletteOpen} />
    </div>
  )
}

