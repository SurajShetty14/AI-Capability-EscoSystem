"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Bold, Italic, Underline, Code, List, ListOrdered, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { AssessmentNav } from "./AssessmentNav"
import { cn } from "@/lib/utils"

interface SubjectiveInterfaceProps {
  assessmentId: string
}

export function SubjectiveInterface({ assessmentId }: SubjectiveInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(2)
  const [timeRemaining] = useState(45 * 60)
  const [wordCount, setWordCount] = useState(0)
  const [content, setContent] = useState("")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const editorRef = useRef<HTMLDivElement>(null)
  const minWords = 200

  // Dynamic word counter color function
  const getWordCountColor = (count: number, minimum: number) => {
    if (count === 0) return "text-gray-500" // Empty state - neutral
    if (count < minimum * 0.5) return "text-red-600" // Very low - red
    if (count < minimum * 0.75) return "text-orange-600" // Getting there - orange
    if (count < minimum) return "text-amber-600" // Close - amber
    return "text-green-600" // Met requirement - green
  }

  const handleContentChange = () => {
    if (editorRef.current) {
      const text = editorRef.current.textContent || ""
      const words = text.trim().split(/\s+/).filter((w) => w.length > 0)
      setWordCount(words.length)
      setContent(text)
    }
  }

  // Auto-save logic
  useEffect(() => {
    if (content.length === 0) {
      setSaveStatus("idle")
      return
    }

    setSaveStatus("saving")

    const timer = setTimeout(() => {
      // Save logic here (could save to localStorage or backend)
      console.log("Saving:", content)
      setSaveStatus("saved")

      // Hide "Saved" after 2 seconds
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000) // Save 1 second after stopping typing

    return () => clearTimeout(timer)
  }, [content])

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-52 bg-white/50 backdrop-blur-sm border-r-2 border-[#E8FAF0] p-4 overflow-y-auto flex-shrink-0">
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 3 }).map((_, idx) => {
            const questionNum = idx + 1
            const isCurrent = questionNum === currentQuestion
            return (
              <button
                key={questionNum}
                onClick={() => setCurrentQuestion(questionNum)}
                className={`w-20 h-20 rounded-xl font-bold text-lg border-2 transition-all ${
                  isCurrent
                    ? "bg-[#80EFC0] text-white border-[#80EFC0]"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                Q{questionNum}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AssessmentNav
          assessmentTitle="Subjective Section"
          timeRemaining={timeRemaining}
          onHelp={() => console.log("Help")}
          onMenu={() => console.log("Menu")}
        />

        <div className="flex-1 p-8 max-w-4xl mx-auto w-full overflow-y-auto">
          {/* Question Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#1E5A3B" }}>
              Question {currentQuestion}: Explain the concept of RESTful APIs
            </h2>
            <p className="text-base" style={{ color: "#2D7A52" }}>
              Provide a detailed explanation covering the principles, methods, and best practices of RESTful API design.
            </p>
          </div>

          {/* Rich Text Editor with Toolbar */}
          <div
            className="border-2 rounded-2xl overflow-hidden transition-all duration-200"
            style={{
              borderColor: "#E5E7EB",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#80EFC0"
              e.currentTarget.style.boxShadow = "0 0 0 4px rgba(128, 239, 192, 0.1)"
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#E5E7EB"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            {/* Enhanced Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
              <button
                onClick={() => execCommand("bold")}
                className="p-2 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-[#80EFC0]"
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-4 h-4" style={{ color: "#374151" }} />
              </button>

              <button
                onClick={() => execCommand("italic")}
                className="p-2 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-[#80EFC0]"
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-4 h-4" style={{ color: "#374151" }} />
              </button>

              <button
                onClick={() => execCommand("underline")}
                className="p-2 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-[#80EFC0]"
                title="Underline (Ctrl+U)"
              >
                <Underline className="w-4 h-4" style={{ color: "#374151" }} />
              </button>

              <div className="w-px h-6 bg-gray-300 mx-1" />

              <button
                onClick={() => execCommand("insertUnorderedList")}
                className="p-2 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-[#80EFC0]"
                title="Bullet List"
              >
                <List className="w-4 h-4" style={{ color: "#374151" }} />
              </button>

              <button
                onClick={() => execCommand("insertOrderedList")}
                className="p-2 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-[#80EFC0]"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" style={{ color: "#374151" }} />
              </button>

              <button
                onClick={() => {
                  document.execCommand("formatBlock", false, "pre")
                  editorRef.current?.focus()
                }}
                className="p-2 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-[#80EFC0]"
                title="Code Block"
              >
                <Code className="w-4 h-4" style={{ color: "#374151" }} />
              </button>

              {/* Enhanced Word Counter */}
              <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded-lg">
                <span className={cn("text-sm font-bold transition-colors", getWordCountColor(wordCount, minWords))}>
                  {wordCount} / {minWords}
                </span>
                {wordCount >= minWords && <CheckCircle2 className="w-4 h-4 text-green-600" />}
              </div>
            </div>

            {/* Editor Area with Auto-save Indicator */}
            <div className="relative">
              <div
                ref={editorRef}
                contentEditable
                onInput={handleContentChange}
                className="min-h-[400px] p-6 text-gray-900 leading-relaxed focus:outline-none"
                data-placeholder="Write your answer here..."
                style={{
                  minHeight: "400px",
                }}
              />

              {/* Auto-save Indicator */}
              <AnimatePresence>
                {saveStatus === "saving" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute bottom-4 right-4 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-2 z-10"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Saving...
                  </motion.div>
                )}

                {saveStatus === "saved" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute bottom-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-2 z-10"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Saved
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Progress</span>
                <span className={cn("text-sm font-bold", wordCount >= minWords ? "text-green-600" : "text-amber-600")}>
                  {Math.round((wordCount / minWords) * 100)}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    wordCount >= minWords
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : "bg-gradient-to-r from-amber-500 to-amber-600"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((wordCount / minWords) * 100, 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {wordCount < minWords ? (
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {minWords - wordCount} more words needed
                </p>
              ) : (
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Minimum requirement met!
                </p>
              )}
            </div>
          </div>

          {/* Placeholder Styling */}
          <style jsx global>{`
            [contenteditable][data-placeholder]:empty:before {
              content: attr(data-placeholder);
              color: #9CA3AF;
              cursor: text;
            }
          `}</style>


          {/* Bottom Navigation */}
          <div className="sticky bottom-0 bg-white border-t-2 border-[#E8FAF0] p-6 flex items-center justify-between mt-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl font-semibold text-base flex items-center gap-2 border-2 transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C9F4D4",
                color: "#1E5A3B",
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl font-semibold text-base flex items-center gap-2 transition-all"
              style={{
                background: "linear-gradient(135deg, #10B981, #059669)",
                color: "#FFFFFF",
              }}
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
