export const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "Home",
    href: "/dashboard",
  },
  {
    id: "create",
    label: "Create",
    icon: "Plus",
    href: "#",
    submenu: [
      { id: "assessment", label: "Assessment", href: "/dashboard/assessments/create" },
      { id: "question", label: "Question", href: "/dashboard/questions/create" },
      { id: "dsa", label: "DSA Competency", href: "/dashboard/dsa/create" },
    ],
  },
  {
    id: "assessments",
    label: "Assessments",
    icon: "FileText",
    href: "/dashboard/assessments",
    submenu: [
      { id: "all", label: "All", href: "/dashboard/assessments" },
      { id: "active", label: "Active", href: "/dashboard/assessments?status=active" },
      { id: "drafts", label: "Drafts", href: "/dashboard/assessments?status=drafts" },
      { id: "templates", label: "Templates", href: "/dashboard/assessments?type=templates" },
      { id: "archive", label: "Archive", href: "/dashboard/assessments?status=archive" },
    ],
  },
  {
    id: "candidates",
    label: "Candidates",
    icon: "Users",
    href: "/dashboard/candidates",
    submenu: [
      { id: "all", label: "All", href: "/dashboard/candidates" },
      { id: "enrolled", label: "Enrolled", href: "/dashboard/candidates?status=enrolled" },
      { id: "in-progress", label: "In Progress", href: "/dashboard/candidates?status=in-progress" },
      { id: "completed", label: "Completed", href: "/dashboard/candidates?status=completed" },
      { id: "add-new", label: "Add New", href: "/dashboard/candidates/add" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "BarChart3",
    href: "/dashboard/analytics",
    submenu: [
      { id: "overview", label: "Overview", href: "/dashboard/analytics" },
      { id: "reports", label: "Reports", href: "/dashboard/analytics/reports" },
      { id: "trends", label: "Trends", href: "/dashboard/analytics/trends" },
      { id: "comparison", label: "Comparison", href: "/dashboard/analytics/comparison" },
    ],
  },
  {
    id: "dsa",
    label: "DSA",
    icon: "Code",
    href: "/dashboard/dsa",
    submenu: [
      { id: "competency", label: "Competency Builder", href: "/dashboard/dsa" },
      { id: "question-bank", label: "Question Bank", href: "/dashboard/dsa/questions" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: "FileBarChart",
    href: "/dashboard/reports",
  },
  {
    id: "logs",
    label: "Logs",
    icon: "Activity",
    href: "/dashboard/logs",
    submenu: [
      { id: "activity", label: "Activity", href: "/dashboard/logs" },
      { id: "system", label: "System", href: "/dashboard/logs?type=system" },
      { id: "security", label: "Security", href: "/dashboard/logs?type=security" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    href: "/dashboard/settings",
  },
] as const

export const TECHNOLOGY_STACK = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "TypeScript",
  "JavaScript",
  "AWS",
  "Docker",
  "Kubernetes",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "GraphQL",
  "REST API",
  "Microservices",
  "CI/CD",
  "Git",
  "Linux",
  "Agile",
]

export const ROLES = [
  "Software Developer",
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
  "DevOps Engineer",
  "QA Engineer",
  "Data Engineer",
  "ML Engineer",
  "Product Manager",
  "Technical Lead",
  "Architect",
]

export const EXPERIENCE_LEVELS = [
  { value: "junior", label: "Junior (0-2 years)" },
  { value: "mid", label: "Mid-Level (3-5 years)" },
  { value: "senior", label: "Senior (5+ years)" },
] as const

export const QUESTION_TYPES = [
  { id: "mcq", label: "Technical MCQ", max: 20 },
  { id: "coding", label: "Coding Challenges", max: 15 },
  { id: "scenario", label: "Scenario-Based", max: 10 },
  { id: "system-design", label: "System Design", max: 5 },
] as const

export const CANDIDATE_STATUS = {
  PENDING: "pending",
  ENROLLED: "enrolled",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  FAILED: "failed",
} as const

export const ASSESSMENT_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  PAUSED: "paused",
  ARCHIVED: "archived",
} as const

