"use client"

import { useState } from "react"
import { AssessmentFormData, Candidate } from "@/hooks/useAssessmentForm"
import { CompetencyType } from "@/lib/assessment-types"
import { motion, AnimatePresence } from "framer-motion"
import { User, FileText, Plus, X, MoreVertical, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CandidatesStepProps {
  formData: AssessmentFormData
  updateField: (field: keyof AssessmentFormData, value: any) => void
  competencyType: CompetencyType
}

export function CandidatesStep({ formData, updateField, competencyType }: CandidatesStepProps) {
  const [method, setMethod] = useState<'individual' | 'bulk'>('individual')
  const [currentCandidate, setCurrentCandidate] = useState({ name: "", email: "", phone: "" })
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadErrors, setUploadErrors] = useState<Array<{ row: number; error: string }>>([])
  const [uploadFileName, setUploadFileName] = useState<string>("")
  const [uploadSuccess, setUploadSuccess] = useState<{ imported: number; errors: number } | null>(null)
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set())

  const handleAddCandidate = () => {
    if (!currentCandidate.name || !currentCandidate.email) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(currentCandidate.email)) {
      alert('Please enter a valid email address')
      return
    }

    // Check for duplicate email
    const existingCandidates = formData.candidates || []
    if (existingCandidates.some(c => c.email.toLowerCase() === currentCandidate.email.toLowerCase())) {
      alert('This email is already added')
      return
    }

    const newCandidate: Candidate = {
      id: `candidate-${Date.now()}`,
      name: currentCandidate.name,
      email: currentCandidate.email,
      phone: currentCandidate.phone || undefined,
      status: 'pending',
    }

    updateField('candidates', [...existingCandidates, newCandidate])
    setCurrentCandidate({ name: "", email: "", phone: "" })
  }

  const handleRemoveCandidate = (id: string) => {
    const existingCandidates = formData.candidates || []
    updateField('candidates', existingCandidates.filter(c => c.id !== id))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setUploadProgress(0)
    setUploadErrors([])
    setUploadSuccess(null)
    setUploadFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        
        // Better CSV parsing (handles quoted fields and commas)
        const lines = text.split('\n').filter(line => line.trim())
        if (lines.length < 2) {
          alert('CSV file must have a header row and at least one data row')
          setIsProcessing(false)
          return
        }

        // Parse header
        const header = lines[0].split(',').map(h => h.trim().toLowerCase())
        const nameIndex = header.findIndex(h => h.includes('name'))
        const emailIndex = header.findIndex(h => h.includes('email'))
        const phoneIndex = header.findIndex(h => h.includes('phone'))

        if (nameIndex === -1 || emailIndex === -1) {
          alert('CSV must have "Name" and "Email" columns')
          setIsProcessing(false)
          return
        }

        // Parse data rows
        const errors: Array<{ row: number; error: string }> = []
        const newCandidates: Candidate[] = []
        const existingCandidates = formData.candidates || []
        const existingEmails = new Set(existingCandidates.map(c => c.email.toLowerCase()))

        lines.slice(1).forEach((line, index) => {
          const rowNum = index + 2 // +2 because we start from row 2 (after header)
          setUploadProgress((index / (lines.length - 1)) * 100)

          // Parse CSV line (handles quoted values)
          const values: string[] = []
          let current = ''
          let inQuotes = false
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i]
            if (char === '"') {
              inQuotes = !inQuotes
            } else if (char === ',' && !inQuotes) {
              values.push(current.trim())
              current = ''
            } else {
              current += char
            }
          }
          values.push(current.trim()) // Add last value

          const name = values[nameIndex]?.trim() || ''
          const email = values[emailIndex]?.trim() || ''
          const phone = values[phoneIndex]?.trim() || ''

          // Validation
          if (!name) {
            errors.push({ row: rowNum, error: 'Missing name' })
            return
          }

          if (!email) {
            errors.push({ row: rowNum, error: 'Missing email' })
            return
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(email)) {
            errors.push({ row: rowNum, error: 'Invalid email format' })
            return
          }

          if (existingEmails.has(email.toLowerCase()) || newCandidates.some(c => c.email.toLowerCase() === email.toLowerCase())) {
            errors.push({ row: rowNum, error: 'Duplicate email' })
            return
          }

          newCandidates.push({
            id: `bulk-${Date.now()}-${index}`,
            name,
            email,
            phone: phone || undefined,
            status: 'pending' as const,
          })

          existingEmails.add(email.toLowerCase())
        })

        setUploadProgress(100)
        setUploadErrors(errors)
        setUploadSuccess({ imported: newCandidates.length, errors: errors.length })

        if (newCandidates.length > 0) {
          updateField('candidates', [...existingCandidates, ...newCandidates])
        }

        setIsProcessing(false)
      } catch (error) {
        console.error('Error parsing file:', error)
        alert('Error parsing file. Please check the format and try again.')
        setIsProcessing(false)
        setUploadProgress(0)
      }
    }

    if (file.name.endsWith('.csv')) {
      reader.readAsText(file)
    } else {
      // For Excel files, you'd need a library like xlsx
      alert('Excel file support coming soon. Please use CSV format for now.')
      setIsProcessing(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-[14px] font-medium text-text-subtle uppercase tracking-wide">Step 5 of 5</span>
          <span className="text-[14px] font-medium text-mint-200">🎉 Final Step!</span>
        </div>
        <h2 className="text-[40px] font-black text-text-primary mb-4" style={{ letterSpacing: "-0.02em" }}>
          Add Candidates
        </h2>
        <p className="text-[16px] text-text-secondary mb-6">
          Choose how you want to add candidates:
        </p>
      </div>

      {/* Method Selection */}
      <div className="flex gap-4 mb-8">
        <motion.button
          onClick={() => setMethod('individual')}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-[240px] h-[100px] border-2 rounded-2xl p-4 transition-all text-left",
            method === 'individual'
              ? "border-mint-200 border-[3px] bg-gradient-to-br from-mint-50 to-mint-100 shadow-[0_4px_16px_rgba(128,239,192,0.3)]"
              : "border-mint-100 hover:border-mint-200 bg-white"
          )}
        >
          <User className={cn("h-12 w-12 mb-2", method === 'individual' ? "text-mint-200" : "text-text-subtle")} />
          <p className={cn("text-[16px] font-semibold mb-1", method === 'individual' ? "text-text-primary" : "text-text-secondary")}>
            Add Individual
          </p>
          {method === 'individual' && (
            <span className="text-[12px] text-mint-200 font-medium">Selected</span>
          )}
        </motion.button>

        <motion.button
          onClick={() => setMethod('bulk')}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-[240px] h-[100px] border-2 rounded-2xl p-4 transition-all text-left",
            method === 'bulk'
              ? "border-mint-200 border-[3px] bg-gradient-to-br from-mint-50 to-mint-100 shadow-[0_4px_16px_rgba(128,239,192,0.3)]"
              : "border-mint-100 hover:border-mint-200 bg-white"
          )}
        >
          <FileText className={cn("h-12 w-12 mb-2", method === 'bulk' ? "text-mint-200" : "text-text-subtle")} />
          <p className={cn("text-[16px] font-semibold mb-1", method === 'bulk' ? "text-text-primary" : "text-text-secondary")}>
            Bulk Upload
          </p>
          {method === 'bulk' && (
            <span className="text-[12px] text-mint-200 font-medium">Selected</span>
          )}
        </motion.button>
      </div>

      {/* Individual Form */}
      {method === 'individual' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-mint-100 rounded-2xl p-6 mb-6 max-w-[600px]"
        >
          <h3 className="text-[18px] font-semibold text-text-primary mb-6">Candidate Information</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-[14px] font-medium text-text-secondary mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={currentCandidate.name}
                onChange={(e) => setCurrentCandidate({ ...currentCandidate, name: e.target.value })}
                placeholder="John Doe"
                className="h-12 border-2 border-mint-100 rounded-xl focus:border-mint-200 focus:ring-4 focus:ring-mint-200/10 outline-none text-[15px] text-text-primary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCandidate()
                }}
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-text-secondary mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={currentCandidate.email}
                onChange={(e) => setCurrentCandidate({ ...currentCandidate, email: e.target.value })}
                placeholder="john.doe@example.com"
                className="h-12 border-2 border-mint-100 rounded-xl focus:border-mint-200 focus:ring-4 focus:ring-mint-200/10 outline-none text-[15px] text-text-primary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCandidate()
                }}
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-text-secondary mb-2">
                Phone (optional)
              </label>
              <Input
                value={currentCandidate.phone}
                onChange={(e) => setCurrentCandidate({ ...currentCandidate, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="h-12 border-2 border-mint-100 rounded-xl focus:border-mint-200 focus:ring-4 focus:ring-mint-200/10 outline-none text-[15px] text-text-primary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCandidate()
                }}
              />
            </div>
            <Button
              onClick={handleAddCandidate}
              disabled={!currentCandidate.name || !currentCandidate.email}
              className="w-full border-2 border-dashed border-mint-100 bg-transparent text-[15px] font-medium text-text-secondary hover:border-mint-200 hover:bg-mint-50 py-3 rounded-xl transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Candidate
            </Button>
          </div>
        </motion.div>
      )}

      {/* Bulk Upload */}
      {method === 'bulk' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragging(false)
              const file = e.dataTransfer.files[0]
              if (file && file.name.endsWith('.csv')) {
                const input = document.createElement('input')
                input.type = 'file'
                const dataTransfer = new DataTransfer()
                dataTransfer.items.add(file)
                input.files = dataTransfer.files
                handleFileUpload({ target: input } as any)
              }
            }}
            className={cn(
              "h-[300px] border-[3px] rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all relative",
              isDragging
                ? "border-mint-200 bg-mint-50/50 border-solid"
                : "border-dashed border-mint-100 bg-mint-50/30 hover:border-mint-200",
              isProcessing && "pointer-events-none"
            )}
          >
            {isProcessing ? (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-3 border-mint-200 border-t-transparent rounded-full"
                  />
                  <span className="text-[14px] font-medium text-text-primary">✓ {uploadFileName}</span>
                </div>
                <p className="text-[16px] text-text-secondary mb-2">
                  Processing... {Math.round(uploadProgress)}%
                </p>
                <div className="w-64 h-2 bg-mint-50 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full bg-gradient-to-r from-mint-100 to-mint-200"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </>
            ) : (
              <>
                <FileText className="h-16 w-16 text-mint-200 mb-4" />
                <p className="text-[16px] text-text-secondary mb-2" style={{ lineHeight: 1.6 }}>
                  Drag & drop CSV or Excel file here
                </p>
                <p className="text-[14px] text-text-subtle mb-4">or click to browse</p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="bulk-upload"
                  disabled={isProcessing}
                />
                <label htmlFor="bulk-upload">
                  <Button 
                    className="bg-gradient-to-r from-mint-100 to-mint-200 text-text-primary hover:scale-105 transition-transform py-3 px-6 rounded-xl text-[15px] font-semibold"
                    disabled={isProcessing}
                  >
                    Browse Files
                  </Button>
                </label>
                <p className="text-[13px] text-text-subtle mt-4">
                  Supported formats: .csv, .xlsx, .xls
                </p>
                <button
                  onClick={() => {
                    // Generate and download sample CSV
                    const csv = 'Name,Email,Phone\nJohn Doe,john.doe@example.com,+1 (555) 123-4567\nJane Smith,jane.smith@example.com,+1 (555) 987-6543'
                    const blob = new Blob([csv], { type: 'text/csv' })
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'candidates_template.csv'
                    a.click()
                    window.URL.revokeObjectURL(url)
                  }}
                  className="text-[14px] text-mint-200 hover:text-text-primary mt-2 hover:underline transition-colors"
                >
                  Download Sample Template →
                </button>
              </>
            )}
          </div>

          {/* Upload Success/Error Summary */}
          {uploadSuccess && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-4 p-4 rounded-xl border-2",
                uploadSuccess.errors > 0
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-mint-50 border-mint-200"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {uploadSuccess.errors > 0 ? (
                    <>
                      <span className="text-[14px] font-semibold text-yellow-700">✅ {uploadSuccess.imported} candidates imported</span>
                      <span className="text-[14px] font-semibold text-yellow-700">⚠️ {uploadSuccess.errors} errors found</span>
                    </>
                  ) : (
                    <span className="text-[14px] font-semibold text-text-primary">✅ {uploadSuccess.imported} candidates imported successfully</span>
                  )}
                </div>
                {uploadSuccess.errors > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setUploadErrors([])}
                    className="text-[13px] border-mint-100"
                  >
                    View Errors
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Upload Errors */}
          {uploadErrors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-[14px] font-semibold text-red-600 mb-3">
                ⚠️ {uploadErrors.length} error(s) found:
              </p>
              <ul className="space-y-1 text-[13px] text-red-700 max-h-40 overflow-y-auto">
                {uploadErrors.map((error, index) => (
                  <li key={index}>Row {error.row}: {error.error}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Candidates List */}
      <div className="mb-6">
        <h3 className="text-[18px] font-semibold text-text-primary mb-4">
          Added Candidates ({formData.candidates?.length || 0})
        </h3>

        {!formData.candidates || formData.candidates.length === 0 ? (
          <div className="text-center py-12 bg-mint-50/30 rounded-2xl border-2 border-dashed border-mint-100">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-[16px] text-text-subtle">No candidates added yet</p>
            <p className="text-[14px] text-text-subtle mt-2">Add candidates to send them invitations</p>
          </div>
        ) : (
          <>
            {/* Bulk Actions Bar */}
            {formData.candidates.length > 1 && selectedCandidates.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-mint-50 border border-mint-100 rounded-xl flex items-center justify-between"
              >
                <span className="text-[14px] font-medium text-text-primary">
                  {selectedCandidates.size} selected
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const updated = formData.candidates.filter(c => !selectedCandidates.has(c.id))
                      updateField('candidates', updated)
                      setSelectedCandidates(new Set())
                    }}
                    className="text-[13px] border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCandidates(new Set())}
                    className="text-[13px] border-mint-100"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Select All Checkbox */}
            {formData.candidates.length > 1 && (
              <div className="mb-3 flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCandidates.size === formData.candidates.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCandidates(new Set(formData.candidates.map(c => c.id)))
                    } else {
                      setSelectedCandidates(new Set())
                    }
                  }}
                  className="w-4 h-4 rounded border-mint-200 text-mint-200 focus:ring-mint-200"
                />
                <label className="text-[14px] text-text-secondary">Select all</label>
              </div>
            )}

            <div className="space-y-3">
              <AnimatePresence>
                {formData.candidates.map((candidate) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={cn(
                      "bg-white border rounded-xl p-4 flex items-center justify-between transition-all",
                      selectedCandidates.has(candidate.id)
                        ? "border-mint-200 bg-mint-50/50"
                        : "border-mint-100"
                    )}
                  >
                    {formData.candidates.length > 1 && (
                      <input
                        type="checkbox"
                        checked={selectedCandidates.has(candidate.id)}
                        onChange={(e) => {
                          const newSelected = new Set(selectedCandidates)
                          if (e.target.checked) {
                            newSelected.add(candidate.id)
                          } else {
                            newSelected.delete(candidate.id)
                          }
                          setSelectedCandidates(newSelected)
                        }}
                        className="w-4 h-4 rounded border-mint-200 text-mint-200 focus:ring-mint-200 mr-3"
                      />
                    )}
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mint-100 to-mint-200 flex items-center justify-center text-text-primary font-semibold border-2 border-white shadow-sm">
                        {getInitials(candidate.name)}
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-text-primary">{candidate.name}</p>
                        <p className="text-[14px] text-text-secondary">{candidate.email}</p>
                        {candidate.phone && (
                          <p className="text-[13px] text-text-subtle">{candidate.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-mint-50">
                        <MoreVertical className="h-4 w-4 text-text-subtle" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCandidate(candidate.id)}
                        className="h-8 w-8 text-text-subtle hover:text-red-500 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

