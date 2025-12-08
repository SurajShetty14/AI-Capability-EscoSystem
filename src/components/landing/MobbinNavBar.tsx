"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

/**
 * Mobbin-style glassmorphic navigation bar component
 * 
 * Features:
 * - Floating pill-shaped navbar with glassmorphism effect
 * - Sticky positioning at top center
 * - Dark mode support based on current theme
 * - Scroll detection with dynamic opacity
 * - Hidden on mobile, visible on screens >= 720px
 * - Smooth hover and focus transitions
 * 
 * Usage:
 * ```tsx
 * <MobbinNavBar />
 * ```
 */
export function MobbinNavBar() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    // Initial check
    checkDarkMode()

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Watch for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => checkDarkMode()
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Dynamic background based on theme and scroll
  const bgColor = isDark
    ? isScrolled
      ? "bg-[hsla(0,0%,10%,0.85)]"
      : "bg-[hsla(0,0%,10%,0.72)]"
    : isScrolled
    ? "bg-[hsla(0,0%,93%,0.85)]"
    : "bg-[hsla(0,0%,93%,0.72)]"

  // Dynamic text color based on theme
  const textColor = isDark ? "text-white" : "text-text-primary"

  return (
    <div className="hidden min-[720px]:block fixed top-6 left-0 right-0 z-50 pointer-events-none">
      <nav
        className={`flex h-[60px] w-[584px] rounded-full ${bgColor} backdrop-blur-xl mx-auto items-center gap-x-24 px-24 py-8 transition-all duration-300 pointer-events-auto ${
          isScrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
      {/* Logo Section - Left side with flex grow */}
      <div className="flex grow items-center">
        <Link
          href="/"
          className="flex items-center space-x-2 focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:outline-none rounded-sm transition-transform hover:scale-105"
        >
          {/* Logo with gradient box */}
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className={`text-xl font-bold ${textColor}`}>AssessAI</span>
        </Link>
      </div>

      {/* Pricing Link */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/pricing"
          className={`w-fit transition-opacity ease-out hover:opacity-80 focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:outline-none rounded-sm font-bold ${textColor}`}
        >
          Pricing
        </Link>
      </motion.span>

      {/* Log in Link */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Link
          href="/login"
          className={`w-fit transition-opacity ease-out hover:opacity-80 focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:outline-none rounded-sm font-bold ${textColor}`}
        >
          Log in
        </Link>
      </motion.span>
      </nav>
    </div>
  )
}

