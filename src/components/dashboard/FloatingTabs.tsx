"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useScrollTrigger } from "@/hooks/useScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { NavigationTab } from "@/types/navigation"
import { Home, Plus, FileText, Users, BarChart3, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Plus,
  FileText,
  Users,
  BarChart3,
}

const mainTabs = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: Home },
  { id: "create", label: "Create", href: "/dashboard/assessments/create", icon: Plus },
  { id: "assessments", label: "Assessments", href: "/dashboard/assessments", icon: FileText, badge: 12 },
  { id: "candidates", label: "Candidates", href: "/dashboard/candidates", icon: Users, badge: 47 },
  { id: "analytics", label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
] as const

const moreTabs: NavigationTab[] = [
  { id: "dsa", label: "DSA", href: "/dashboard/dsa" },
  { id: "reports", label: "Reports", href: "/dashboard/reports" },
  { id: "logs", label: "Logs", href: "/dashboard/logs" },
  { id: "settings", label: "Settings", href: "/dashboard/settings" },
]

export function FloatingTabs() {
  const pathname = usePathname()
  const isScrolled = useScrollTrigger(200)

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[90]"
        >
          <div className="bg-white/80 backdrop-blur-2xl border border-mint-100/30 rounded-full shadow-[0_8px_32px_rgba(128,239,192,0.15)] px-2 py-2 flex items-center space-x-1">
            {mainTabs.map((tab) => {
              const Icon = tab.icon
              const active = isActive(tab.href)

              return (
                <Link key={tab.id} href={tab.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2",
                      active
                        ? "bg-white text-text-primary font-semibold shadow-[0_2px_8px_rgba(128,239,192,0.2)] border border-mint-100"
                        : "text-text-subtle hover:bg-mint-50/50 hover:text-text-primary"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{tab.label}</span>
                    {"badge" in tab && tab.badge && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-mint-200 text-text-primary rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </motion.div>
                </Link>
              )
            })}

            {/* More Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    pathname !== "/dashboard" &&
                      moreTabs.some((tab) => isActive(tab.href))
                      ? "bg-white text-text-primary font-semibold shadow-[0_2px_8px_rgba(128,239,192,0.2)] border border-mint-100"
                      : "text-text-subtle hover:bg-mint-50/50 hover:text-text-primary"
                  )}
                >
                  <MoreHorizontal className="h-4 w-4 mr-2" />
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-xl border-mint-100 rounded-xl shadow-[0_8px_32px_rgba(201,244,212,0.2)]">
                {moreTabs.map((tab) => (
                  <DropdownMenuItem
                    key={tab.id}
                    asChild
                    className={cn(
                      "text-text-secondary hover:text-text-primary hover:bg-mint-50",
                      isActive(tab.href) && "bg-mint-50 text-text-primary font-medium"
                    )}
                  >
                    <Link href={tab.href}>{tab.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

