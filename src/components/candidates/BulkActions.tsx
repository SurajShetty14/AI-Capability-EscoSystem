"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Mail, Download, Archive, Trash2, X, Copy, Star, CheckCircle2 } from "lucide-react"

interface BulkActionsProps {
  selectedCount: number
  onEmail: () => void
  onExport: () => void
  onCopyEmails: () => void
  onAddToFavorites: () => void
  onArchive: () => void
  onDelete: () => void
  onClear: () => void
}

export function BulkActions({
  selectedCount,
  onEmail,
  onExport,
  onCopyEmails,
  onAddToFavorites,
  onArchive,
  onDelete,
  onClear,
}: BulkActionsProps) {
  if (selectedCount === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-[800px] w-full px-4"
      >
        <div
          className="px-6 py-4 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #1E5A3B, #2D7A52)",
            boxShadow: "0 8px 32px rgba(30, 90, 59, 0.6)",
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold text-lg">
              {selectedCount} candidate{selectedCount !== 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEmail}
              className="px-4 py-2 rounded-lg bg-white text-[#1E5A3B] flex items-center gap-2 font-semibold transition-colors hover:bg-gray-100"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Email All</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExport}
              className="px-4 py-2 rounded-lg bg-white text-[#1E5A3B] flex items-center gap-2 font-semibold transition-colors hover:bg-gray-100"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCopyEmails}
              className="px-4 py-2 rounded-lg bg-white text-[#1E5A3B] flex items-center gap-2 font-semibold transition-colors hover:bg-gray-100"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy Emails</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddToFavorites}
              className="px-4 py-2 rounded-lg bg-white text-[#1E5A3B] flex items-center gap-2 font-semibold transition-colors hover:bg-gray-100"
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Add to Favorites</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onArchive}
              className="px-4 py-2 rounded-lg bg-white text-[#1E5A3B] flex items-center gap-2 font-semibold transition-colors hover:bg-gray-100"
            >
              <Archive className="w-4 h-4" />
              <span className="hidden sm:inline">Archive</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="px-4 py-2 rounded-lg bg-red-500 text-white flex items-center gap-2 font-semibold transition-colors hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClear}
              className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

