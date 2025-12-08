"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Code } from "lucide-react"
import Link from "next/link"

const mockCompetencies = [
  {
    id: "1",
    name: "Data Structures - Intermediate",
    level: "intermediate",
    questionCount: 25,
    avgScore: 78.5,
  },
  {
    id: "2",
    name: "Algorithms - Advanced",
    level: "advanced",
    questionCount: 30,
    avgScore: 82.3,
  },
  {
    id: "3",
    name: "Problem Solving - Beginner",
    level: "beginner",
    questionCount: 20,
    avgScore: 75.2,
  },
]

export default function DSAPage() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "success"
      case "intermediate":
        return "warning"
      case "advanced":
        return "destructive"
      case "expert":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DSA Competency Builder</h1>
          <p className="text-gray-600 mt-1">Build and manage data structures and algorithms competencies</p>
        </div>
        <Button asChild>
          <Link href="/dsa/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Competency
          </Link>
        </Button>
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Code className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">What is DSA Competency?</h3>
              <p className="text-sm text-blue-700 mt-1">
                DSA Competency is a framework for assessing candidates' proficiency in data structures
                and algorithms. Create custom competencies with specific topics, weightage, and
                question distributions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competencies List */}
      <div className="grid gap-4">
        {mockCompetencies.map((competency) => (
          <Card key={competency.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{competency.name}</CardTitle>
                  <CardDescription className="mt-2">
                    <Badge variant={getLevelColor(competency.level) as any} className="mr-2">
                      {competency.level}
                    </Badge>
                    {competency.questionCount} questions • Avg Score: {competency.avgScore}%
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

