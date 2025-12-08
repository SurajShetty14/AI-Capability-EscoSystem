"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Zap, Bell, HelpCircle, User, Settings, LogOut, Home, Plus, FileText, Users, BarChart3, MoreHorizontal, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/store/auth-store"
import { useNotificationStore } from "@/store/notification-store"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const mockNotifications = [
  {
    id: "1",
    type: "candidate" as const,
    title: "New candidate started test",
    description: "John Doe started Frontend Developer Assessment",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
  },
  {
    id: "2",
    type: "proctoring" as const,
    title: "Proctoring alert",
    description: "Tab switch detected for candidate #123",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
]

const mainNavItems = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: Home },
  { id: "create", label: "Create", href: "/dashboard/assessments/create", icon: Plus, hasDropdown: true },
  { id: "assessments", label: "Assessments", href: "/dashboard/assessments", icon: FileText, badge: 12 },
  { id: "candidates", label: "Candidates", href: "/dashboard/candidates", icon: Users, badge: 47 },
  { id: "analytics", label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
]

const moreNavItems = [
  { id: "reports", label: "Reports", href: "/dashboard/reports" },
  { id: "dsa", label: "DSA", href: "/dashboard/dsa" },
  { id: "logs", label: "Logs", href: "/dashboard/logs" },
  { id: "settings", label: "Settings", href: "/dashboard/settings" },
]

interface UnifiedTopBarProps {
  onCommandPaletteOpen?: () => void
}

export function UnifiedTopBar({ onCommandPaletteOpen }: UnifiedTopBarProps) {
  const { user } = useAuthStore()
  const { unreadCount } = useNotificationStore()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const unreadNotifications = mockNotifications.filter((n) => !n.read)

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-[100] w-full h-16 bg-white/95 backdrop-blur-xl border-b border-mint-100/30 shadow-[0_1px_3px_rgba(201,244,212,0.1)]"
    >
      <div className="max-w-[1600px] mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left Section: Logo + Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-mint-100 to-mint-300 flex items-center justify-center border-2 border-mint-200">
                <span className="text-text-primary font-bold text-xs">AI</span>
              </div>
              <span className="font-bold text-lg text-text-primary">AssessAI</span>
            </Link>

            {/* Navigation Items */}
            <nav className="hidden md:flex items-center space-x-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)

                if (item.hasDropdown) {
                  return (
                    <DropdownMenu key={item.id}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "h-10 px-4 rounded-lg text-sm font-medium transition-all",
                            active
                              ? "text-text-primary font-semibold bg-mint-50"
                              : "text-text-subtle hover:text-text-primary hover:bg-mint-50/50"
                          )}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {item.label}
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="bg-white/95 backdrop-blur-xl border-mint-100 rounded-xl shadow-[0_8px_32px_rgba(201,244,212,0.2)]">
                        <DropdownMenuItem asChild className="text-text-secondary hover:text-text-primary hover:bg-mint-50">
                          <Link href="/dashboard/assessments/create">New Assessment</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-text-secondary hover:text-text-primary hover:bg-mint-50">
                          <Link href="/dashboard/candidates/add">Add Candidate</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-text-secondary hover:text-text-primary hover:bg-mint-50">
                          <Link href="/dashboard/reports">Generate Report</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                }

                return (
                  <Link key={item.id} href={item.href}>
                    <motion.div
                      whileHover={{ y: -1 }}
                      className={cn(
                        "relative h-10 px-4 rounded-lg flex items-center space-x-2 text-sm font-medium transition-all",
                        active
                          ? "text-text-primary font-semibold"
                          : "text-text-subtle hover:text-text-primary hover:bg-mint-50/50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-mint-200 text-text-primary rounded-full">
                          {item.badge}
                        </Badge>
                      )}
                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-mint-200 rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
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
                      "h-10 px-4 rounded-lg text-sm font-medium transition-all",
                      moreNavItems.some((item) => isActive(item.href))
                        ? "text-text-primary font-semibold bg-mint-50"
                        : "text-text-subtle hover:text-text-primary hover:bg-mint-50/50"
                    )}
                  >
                    <MoreHorizontal className="h-4 w-4 mr-2" />
                    More
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-white/95 backdrop-blur-xl border-mint-100 rounded-xl shadow-[0_8px_32px_rgba(201,244,212,0.2)]">
                  {moreNavItems.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      asChild
                      className={cn(
                        "text-text-secondary hover:text-text-primary hover:bg-mint-50",
                        isActive(item.href) && "bg-mint-50 text-text-primary font-medium"
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          {/* Right Section: Search + Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-subtle" />
              <Input
                type="search"
                placeholder="Search... Cmd+K"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => onCommandPaletteOpen?.()}
                className="pl-10 pr-4 w-64 bg-mint-50/60 border-mint-100/40 rounded-lg focus:border-mint-200 focus:ring-2 focus:ring-mint-200/20 focus:bg-white text-text-primary placeholder:text-text-subtle h-10 text-sm"
              />
            </div>

            {/* Quick Create */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-text-subtle hover:text-text-primary hover:bg-mint-50 rounded-lg"
              onClick={() => onCommandPaletteOpen?.()}
            >
              <Zap className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 text-text-subtle hover:text-text-primary hover:bg-mint-50 rounded-lg"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 border-2 border-white">
                      {unreadNotifications.length > 9 ? "9+" : unreadNotifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 bg-white/95 backdrop-blur-xl border-mint-100 rounded-xl shadow-[0_8px_32px_rgba(201,244,212,0.2)]">
                <div className="p-4 border-b border-mint-50 flex items-center justify-between">
                  <DropdownMenuLabel className="text-text-primary font-semibold p-0">Notifications</DropdownMenuLabel>
                  <Button variant="ghost" size="sm" className="text-xs text-mint-200 hover:text-text-primary h-auto p-0">
                    Mark all as read
                  </Button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.length === 0 ? (
                    <div className="p-4 text-sm text-text-subtle text-center">No new notifications</div>
                  ) : (
                    <div className="divide-y divide-mint-50">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "block p-4 hover:bg-mint-50 transition-colors",
                            !notification.read && "bg-mint-50"
                          )}
                        >
                          <p className="text-sm font-semibold text-text-primary">{notification.title}</p>
                          <p className="text-xs text-text-secondary mt-1">{notification.description}</p>
                          <p className="text-xs text-text-subtle mt-2">
                            {notification.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-mint-50 text-center">
                  <Link
                    href="/dashboard/notifications"
                    className="text-sm font-medium text-mint-200 hover:text-text-primary transition-colors"
                  >
                    View All Notifications →
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-text-subtle hover:text-text-primary hover:bg-mint-50 rounded-lg"
              aria-label="Help"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 w-10 p-0 rounded-full hover:scale-110 transition-transform"
                >
                  <Avatar className="h-10 w-10 border-2 border-mint-200">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-mint-100 to-mint-300 text-text-primary">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-mint-100 rounded-xl shadow-[0_8px_32px_rgba(201,244,212,0.2)]">
                <DropdownMenuLabel className="text-text-primary">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-mint-50" />
                <DropdownMenuItem className="text-text-secondary hover:text-text-primary hover:bg-mint-50">
                  <User className="mr-2 h-4 w-4 text-text-subtle" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-text-secondary hover:text-text-primary hover:bg-mint-50">
                  <Settings className="mr-2 h-4 w-4 text-text-subtle" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-mint-50" />
                <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

