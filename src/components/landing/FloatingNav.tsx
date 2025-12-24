"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, Tv, Film, Activity, Download, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Product", href: "#features", icon: Search },
  { name: "Pricing", href: "#pricing", icon: Tv },
  { name: "Docs", href: "#", icon: Film },
  { name: "About", href: "#", icon: Activity },
  { name: "Contact", href: "#", icon: Download },
]

export function FloatingNav() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0) // Home is active by default

  return (
    <>
      {/* Logo - Top Left Corner */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50 hidden md:block"
      >
        <Link href="/" onClick={() => setActiveIndex(0)}>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-lg text-white">AssessAI</span>
          </div>
        </Link>
      </motion.div>

      {/* Desktop Vertical Navbar - Left Side */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed left-6 top-[35%] -translate-y-[35%] z-50 hidden md:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-start bg-transparent">
          {/* Navigation Items - Icons with Hover Labels */}
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeIndex === index

            return (
              <div
                key={item.name}
                className="outline-none mb-2"
              >
                <Link
                  href={item.href}
                  onClick={() => setActiveIndex(index)}
                  className="outline-none"
                  aria-label={item.name}
                >
                  <button
                    type="button"
                    className={`flex items-center duration-200 ease-in-out transform origin-left transition-all ${
                      isActive
                        ? "text-white font-bold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {/* Icon */}
                    <span className="py-2 px-3 flex items-center justify-center">
                      <Icon
                        className={`h-6 w-6 transition-all ${
                          isActive ? "font-bold stroke-[2.5]" : "stroke-[1.5]"
                        }`}
                      />
                    </span>

                    {/* Text Label - Appears on hover */}
                    <motion.span
                      initial={false}
                      animate={{
                        width: isHovered || isActive ? "auto" : 0,
                        opacity: isHovered || isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      <p className={`px-2 text-sm ${isActive ? "font-bold" : "font-semibold"}`}>
                        {item.name}
                      </p>
                    </motion.span>
                  </button>
                </Link>
              </div>
            )
          })}

          {/* Profile/User at bottom */}
          <div className="mt-[6.5rem] pt-6 border-t border-white/10 w-full">
            <div className="outline-none">
              <Link href="/dashboard" className="outline-none" aria-label="My Space">
                <button
                  type="button"
                  className="flex items-center duration-200 ease-in-out transform origin-left transition-all text-gray-400 hover:text-white w-full"
                >
                  {/* Avatar/Icon */}
                  <span className="py-2 px-3 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </span>

                  {/* Text Label - Appears on hover */}
                  <motion.span
                    initial={false}
                    animate={{
                      width: isHovered ? "auto" : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <p className="px-2 font-semibold text-sm">My Space</p>
                  </motion.span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Button - Top Left */}
      <motion.button
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50 md:hidden p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </motion.button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          navItems={navItems}
          activeIndex={activeIndex}
          onClose={() => setIsMobileMenuOpen(false)}
          onItemClick={(index) => {
            setActiveIndex(index)
            setIsMobileMenuOpen(false)
          }}
        />
      )}
    </>
  )
}

function MobileMenu({
  navItems,
  activeIndex,
  onClose,
  onItemClick,
}: {
  navItems: Array<{ name: string; href: string; icon: React.ComponentType<{ className?: string }> }>
  activeIndex: number
  onClose: () => void
  onItemClick: (index: number) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-2xl border-r border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 h-full flex flex-col">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="self-end p-2 hover:bg-white/10 rounded-lg transition-colors mb-8"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="font-bold text-xl text-white">AssessAI</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeIndex === index

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => onItemClick(index)}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        isActive ? "font-bold stroke-[2.5]" : "stroke-[1.5]"
                      }`}
                    />
                    <span className={`text-lg ${isActive ? "font-bold" : "font-medium"}`}>
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* CTA Button */}
          <Button
            asChild
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl py-4 mt-8"
          >
            <Link href="/dashboard" onClick={onClose}>
              Start Free Trial
            </Link>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
