"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileBarChart, Download, Mail, RefreshCw, Trash2 } from "lucide-react"

const reportTemplates = [
  {
    id: "1",
    name: "Candidate Performance Report",
    description: "Detailed performance analysis for individual candidates",
    icon: FileBarChart,
  },
  {
    id: "2",
    name: "Assessment Analytics",
    description: "Comprehensive analytics for assessment performance",
    icon: FileBarChart,
  },
  {
    id: "3",
    name: "Performance Trends",
    description: "Historical trends and patterns in candidate performance",
    icon: FileBarChart,
  },
  {
    id: "4",
    name: "Skill Gap Analysis",
    description: "Identify skill gaps across candidate pool",
    icon: FileBarChart,
  },
]

const recentReports = [
  {
    id: "1",
    title: "Monthly Performance Report",
    type: "Performance Trends",
    status: "completed",
    generatedAt: "2024-01-15",
    fileSize: "2.4 MB",
  },
  {
    id: "2",
    title: "Q4 Assessment Summary",
    type: "Assessment Analytics",
    status: "completed",
    generatedAt: "2024-01-10",
    fileSize: "1.8 MB",
  },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and manage reports</p>
        </div>
        <Button>Create Custom Report</Button>
      </div>

      {/* Report Templates */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => {
            const Icon = template.icon
            return (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <Icon className="h-8 w-8 text-primary-500 mb-2" />
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="text-sm">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Generate →
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        <div className="space-y-4">
          {recentReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileBarChart className="h-8 w-8 text-primary-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{report.type}</Badge>
                        <Badge variant="success">Completed</Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(report.generatedAt).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-500">• {report.fileSize}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

