"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  Play,
  RotateCcw,
  ArrowRight,
  Code2,
  Terminal,
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
  Maximize2,
  HelpCircle,
  Menu,
} from "lucide-react"
import dynamic from "next/dynamic"
import { Timer } from "./Timer"

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface CodingInterfaceProps {
  assessmentId: string
}

interface TestCase {
  id: number
  input: string
  expected: string
  actual?: string
  passed?: boolean
  status?: "pending" | "running" | "completed"
}

export function CodingInterface({ assessmentId }: CodingInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [timeRemaining] = useState(45 * 60)
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false)
  const [isRightCollapsed, setIsRightCollapsed] = useState(false)
  const [code, setCode] = useState(`function reverseLinkedList(head) {
  // Your code here
  
}`)
  const [activeTab, setActiveTab] = useState<"testcases" | "console">("testcases")
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 1,
      input: "[1, 2, 3]",
      expected: "[3, 2, 1]",
      status: "pending",
    },
    {
      id: 2,
      input: "[1]",
      expected: "[1]",
      status: "pending",
    },
    {
      id: 3,
      input: "[]",
      expected: "[]",
      status: "pending",
    },
  ])
  const [consoleOutput, setConsoleOutput] = useState<string>("")

  // Calculate panel widths
  const leftPanelWidth = isLeftCollapsed ? 0 : 30
  const rightPanelWidth = isRightCollapsed ? 0 : 20
  const editorWidth = 100 - leftPanelWidth - rightPanelWidth

  const handleRunTests = () => {
    setTestCases((prev) =>
      prev.map((test) => ({
        ...test,
        status: "running" as const,
      }))
    )

    setTimeout(() => {
      setTestCases((prev) =>
        prev.map((test, index) => ({
          ...test,
          status: "completed" as const,
          actual: index === 0 ? "[3, 2, 1]" : index === 1 ? "[1]" : "[]",
          passed: index !== 2,
        }))
      )
      setConsoleOutput("All tests completed. 2 passed, 1 failed.")
    }, 1500)
  }

  const handleResetCode = () => {
    setCode(`function reverseLinkedList(head) {
  // Your code here
  
}`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="h-screen flex flex-col bg-[#1E1E1E] overflow-hidden">
      {/* Top Navigation Bar - Dark Theme */}
      <nav className="h-16 bg-[#252526] border-b border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 transition-colors hover:opacity-80" style={{ color: "#80EFC0" }}>
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>
          <div className="h-6 w-px bg-gray-700" />
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5" style={{ color: "#80EFC0" }} />
            <span className="text-lg font-bold text-gray-200">Coding Section</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#2D2D2D] rounded-xl border-2" style={{ borderColor: "rgba(128, 239, 192, 0.2)" }}>
            <Clock className="w-5 h-5" style={{ color: "#80EFC0" }} />
            <span className="text-xl font-mono font-bold" style={{ color: "#80EFC0" }}>
              {formatTime(timeRemaining)}
            </span>
          </div>

          <button className="p-2 hover:bg-[#2D2D2D] rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>

          <button className="p-2 hover:bg-[#2D2D2D] rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-400" />
          </button>

          <button className="p-2 hover:bg-[#2D2D2D] rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </nav>

      {/* Main Content - Three Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL - Problem Description */}
        <AnimatePresence>
          {!isLeftCollapsed && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${leftPanelWidth}%` }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E1E1E] border-r border-gray-800 overflow-hidden flex flex-col"
            >
              {/* Panel Header */}
              <div className="h-12 bg-[#252526] border-b border-gray-800 flex items-center justify-between px-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" style={{ color: "#80EFC0" }} />
                  <span className="text-sm font-semibold text-gray-200">Problem</span>
                </div>
                <button
                  onClick={() => setIsLeftCollapsed(true)}
                  className="p-1 hover:bg-[#2D2D2D] rounded transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Problem Content */}
              <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin", scrollbarColor: "#4A4A4A #1E1E1E" }}>
                {/* Question Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-black mb-2" style={{ color: "#80EFC0" }}>
                    Question {currentQuestion} of 5
                  </h2>
                  <h3 className="text-xl font-bold text-gray-200">Reverse a Linked List</h3>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-300 leading-relaxed">
                    Implement a function to reverse a linked list. The function should take the head of a linked list as input and return the reversed list.
                  </p>
                </div>

                {/* Example */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Example:</h4>
                  <div className="bg-[#2D2D2D] rounded-xl p-4 border border-gray-700">
                    <pre className="text-sm font-mono">
                      <code>
                        <span style={{ color: "#60A5FA" }}>Input:</span>
                        <span className="text-gray-300"> [1, 2, 3]</span>
                        {"\n"}
                        <span style={{ color: "#34D399" }}>Expected:</span>
                        <span className="text-gray-300"> [3, 2, 1]</span>
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Constraints */}
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Constraints:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span style={{ color: "#80EFC0" }} className="mt-1">•</span>
                      <span>The number of nodes in the list is in the range [0, 5000]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: "#80EFC0" }} className="mt-1">•</span>
                      <span>-5000 &lt;= Node.val &lt;= 5000</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show Left Panel Button (when collapsed) */}
        {isLeftCollapsed && (
          <button
            onClick={() => setIsLeftCollapsed(false)}
            className="w-8 bg-[#252526] border-r border-gray-800 hover:bg-[#2D2D2D] transition-colors flex items-center justify-center flex-shrink-0"
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        )}

        {/* MIDDLE PANEL - Code Editor */}
        <div
          className="flex-1 flex flex-col bg-[#1E1E1E] min-w-0"
          style={{ width: `${editorWidth}%` }}
        >
          {/* Editor Header */}
          <div className="h-12 bg-[#252526] border-b border-gray-800 flex items-center justify-between px-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Code2 className="w-4 h-4" style={{ color: "#80EFC0" }} />
              <span className="text-sm font-semibold text-gray-200">Code Editor</span>

              {/* Language Selector */}
              <select className="ml-4 px-3 py-1 bg-[#2D2D2D] border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-[#80EFC0]">
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                className="px-3 py-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
              >
                Restore Default
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "JetBrains Mono, Fira Code, monospace",
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                formatOnPaste: true,
                formatOnType: true,
                tabSize: 2,
                wordWrap: "on",
                lineNumbers: "on",
                renderWhitespace: "selection",
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>

        {/* RIGHT PANEL - Test Cases & Output */}
        <AnimatePresence>
          {!isRightCollapsed && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${rightPanelWidth}%` }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E1E1E] border-l border-gray-800 overflow-hidden flex flex-col"
            >
              {/* Panel Header */}
              <div className="h-12 bg-[#252526] border-b border-gray-800 flex items-center justify-between px-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveTab("testcases")}
                    className={`text-sm font-semibold transition-colors ${
                      activeTab === "testcases"
                        ? "text-[#80EFC0]"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Test Cases
                  </button>
                  <button
                    onClick={() => setActiveTab("console")}
                    className={`text-sm font-semibold transition-colors ${
                      activeTab === "console"
                        ? "text-[#80EFC0]"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Console
                  </button>
                </div>
                <button
                  onClick={() => setIsRightCollapsed(true)}
                  className="p-1 hover:bg-[#2D2D2D] rounded transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#4A4A4A #1E1E1E" }}>
                {activeTab === "testcases" ? (
                  <div className="space-y-3">
                    {testCases.map((test) => (
                      <div
                        key={test.id}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          test.passed
                            ? "bg-green-500/10 border-green-500/30"
                            : test.status === "running"
                            ? "bg-blue-500/10 border-blue-500/30"
                            : test.passed === false
                            ? "bg-red-500/10 border-red-500/30"
                            : "bg-gray-800 border-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-gray-200">Test Case {test.id}</span>
                          {test.status === "running" && (
                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                          )}
                          {test.passed === true && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                              <CheckCircle2 className="w-3 h-3" />
                              Passed
                            </span>
                          )}
                          {test.passed === false && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                              <XCircle className="w-3 h-3" />
                              Failed
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-xs font-mono">
                          <div style={{ color: "#60A5FA" }}>
                            Input: <span className="text-gray-300">{test.input}</span>
                          </div>
                          <div style={{ color: "#34D399" }}>
                            Expected: <span className="text-gray-300">{test.expected}</span>
                          </div>
                          {test.actual && (
                            <div className={test.passed ? "text-green-400" : "text-red-400"}>
                              Actual: <span className="text-gray-300">{test.actual}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleRunTests}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Run All Tests
                    </motion.button>
                  </div>
                ) : (
                  <div className="h-full bg-[#252526] rounded-xl p-4 font-mono text-sm text-gray-400">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-4 h-4" />
                      <span className="font-bold">Console Output</span>
                    </div>
                    <div className="text-xs whitespace-pre-wrap">
                      {consoleOutput || "Run your code to see output here..."}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show Right Panel Button (when collapsed) */}
        {isRightCollapsed && (
          <button
            onClick={() => setIsRightCollapsed(false)}
            className="w-8 bg-[#252526] border-l border-gray-800 hover:bg-[#2D2D2D] transition-colors flex items-center justify-center flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="h-16 bg-[#252526] border-t border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </motion.button>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleResetCode}
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all duration-200 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Code
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRunTests}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Play className="w-4 h-4" />
            Run Tests
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-2.5 font-bold text-lg rounded-xl transition-all duration-200 flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #80EFC0, #10B981)",
              color: "#1E5A3B",
              boxShadow: "0 8px 24px rgba(128, 239, 192, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(128, 239, 192, 0.5)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(128, 239, 192, 0.4)"
            }}
          >
            Submit Code
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
