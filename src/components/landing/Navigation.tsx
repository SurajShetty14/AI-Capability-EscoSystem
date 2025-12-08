"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const productItems = [
    { name: "Assessment Builder", href: "#" },
    { name: "DSA Coding Tests", href: "#" },
    { name: "Cloud Labs (AWS/Azure/GCP)", href: "#" },
    { name: "AI/ML Challenges", href: "#" },
    { name: "Proctoring & Security", href: "#" },
    { name: "Analytics & Reports", href: "#" },
  ]

  const solutionsItems = [
    { name: "For Recruiters", href: "#" },
    { name: "For Engineering Teams", href: "#" },
    { name: "For HR Departments", href: "#" },
    { name: "For Enterprises", href: "#" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-xl text-gray-900">AssessAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <span>Product</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {productItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {solutionsItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Customers
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Docs
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Link href="#pricing">Try Free</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div>
                <button
                  className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900"
                  onClick={() =>
                    setOpenDropdown(openDropdown === "product" ? null : "product")
                  }
                >
                  <span>Product</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === "product" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "product" && (
                  <div className="mt-2 pl-4 space-y-2">
                    {productItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-sm text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "solutions" ? null : "solutions"
                    )
                  }
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === "solutions" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "solutions" && (
                  <div className="mt-2 pl-4 space-y-2">
                    {solutionsItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-sm text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="#pricing"
                className="block text-gray-600 hover:text-gray-900"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="block text-gray-600 hover:text-gray-900"
              >
                Customers
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-gray-900">
                Docs
              </Link>

              <div className="pt-4 border-t space-y-2">
                <Link
                  href="/login"
                  className="block text-center text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Link href="#pricing">Try Free</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

