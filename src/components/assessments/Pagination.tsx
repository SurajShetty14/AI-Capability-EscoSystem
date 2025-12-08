"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl shadow-lg"
      style={{
        boxShadow: "0 2px 12px rgba(201, 244, 212, 0.15)",
      }}
    >
      {/* Left: Showing text */}
      <div className="text-sm text-[#4A9A6A]">
        Showing <span className="font-semibold text-[#1E5A3B]">{startItem}</span> to{" "}
        <span className="font-semibold text-[#1E5A3B]">{endItem}</span> of{" "}
        <span className="font-semibold text-[#1E5A3B]">{totalItems}</span> assessments
      </div>

      {/* Right: Pagination buttons */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            borderColor: currentPage === 1 ? "#E8FAF0" : "#E8FAF0",
            backgroundColor: "#FFFFFF",
          }}
        >
          <ChevronLeft className="w-5 h-5 text-[#4A9A6A]" />
        </motion.button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-[#4A9A6A]">
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isActive = pageNum === currentPage

          return (
            <motion.button
              key={pageNum}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(pageNum)}
              className="w-11 h-11 rounded-xl border-2 flex items-center justify-center font-medium transition-all"
              style={{
                borderColor: isActive ? "transparent" : "#E8FAF0",
                backgroundColor: isActive
                  ? "linear-gradient(135deg, #C9F4D4, #80EFC0)"
                  : "#FFFFFF",
                background: isActive
                  ? "linear-gradient(135deg, #C9F4D4, #80EFC0)"
                  : "#FFFFFF",
                color: isActive ? "#1E5A3B" : "#2D7A52",
                boxShadow: isActive ? "0 4px 12px rgba(128, 239, 192, 0.4)" : "none",
              }}
            >
              {pageNum}
            </motion.button>
          )
        })}

        {/* Next button */}
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            borderColor: "#E8FAF0",
            backgroundColor: "#FFFFFF",
          }}
        >
          <ChevronRight className="w-5 h-5 text-[#4A9A6A]" />
        </motion.button>
      </div>
    </motion.div>
  )
}

