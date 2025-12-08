export function formatDateWithTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date)
}

export function getTimezoneOffset(timezone: string): string {
  const date = new Date()
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  })
  const parts = formatter.formatToParts(date)
  const offset = parts.find((part) => part.type === "timeZoneName")?.value || "+00:00"
  return offset
}

export function calculateDuration(start: Date, end: Date): string {
  const diff = end.getTime() - start.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""}`
  }
  return `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${minutes !== 1 ? "s" : ""}`
}

export function getTimeRemaining(deadline: Date): string {
  const now = new Date()
  const diff = deadline.getTime() - now.getTime()

  if (diff <= 0) {
    return "Expired"
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""}`
  }
  if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${minutes !== 1 ? "s" : ""}`
  }
  return `${minutes} minute${minutes !== 1 ? "s" : ""}`
}

export function getDeadlineStatus(deadline: Date): {
  status: "critical" | "warning" | "on-track" | "completed"
  color: string
  icon: string
} {
  const now = new Date()
  const diff = deadline.getTime() - now.getTime()

  if (diff <= 0) {
    return { status: "completed", color: "#6B7280", icon: "✅" }
  }

  const days = diff / (1000 * 60 * 60 * 24)

  if (days < 2) {
    return { status: "critical", color: "#EF4444", icon: "⚠️" }
  }
  if (days < 7) {
    return { status: "warning", color: "#F59E0B", icon: "📌" }
  }
  return { status: "on-track", color: "#10B981", icon: "✅" }
}

