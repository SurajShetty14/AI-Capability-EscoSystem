"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, RefreshCw } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"

const mockLogs = [
  {
    id: "1",
    type: "candidate",
    action: "Completed assessment",
    description: "John Doe completed Full Stack Developer Assessment",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    severity: "success",
  },
  {
    id: "2",
    type: "admin",
    action: "Created assessment",
    description: "Admin created new assessment: React Developer Assessment",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    severity: "info",
  },
  {
    id: "3",
    type: "system",
    action: "Email sent",
    description: "Assessment invitation email sent to 5 candidates",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    severity: "info",
  },
  {
    id: "4",
    type: "security",
    action: "Suspicious activity",
    description: "Multiple tab switches detected for candidate Jane Smith",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    severity: "warning",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "success":
      return "bg-green-500"
    case "warning":
      return "bg-yellow-500"
    case "error":
      return "bg-red-500"
    default:
      return "bg-blue-500"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "candidate":
      return "👤"
    case "admin":
      return "👨‍💼"
    case "system":
      return "⚙️"
    case "security":
      return "🔒"
    default:
      return "📝"
  }
}

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [autoRefresh, setAutoRefresh] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-600 mt-1">Monitor all system activities and events</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setAutoRefresh(!autoRefresh)}>
            <RefreshCw className={`mr-2 h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`} />
            Auto-refresh: {autoRefresh ? "ON" : "OFF"}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Live Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full mt-2 ${getSeverityColor(log.severity)}`} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xl">{getTypeIcon(log.type)}</span>
                    <Badge variant="outline" className="text-xs">
                      {log.type}
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">{log.action}</span>
                    <span className="text-xs text-gray-500">{formatRelativeTime(log.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{log.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

