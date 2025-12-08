export type AvailabilityType = "immediate" | "scheduled" | "custom"

export interface ReminderConfig {
  onInvite: boolean
  threeDaysBefore: boolean
  oneDayBefore: boolean
  twoHoursBefore: boolean
  custom: number[]
}

export interface ScheduleConfig {
  availabilityType: AvailabilityType
  startDateTime?: Date
  endDateTime?: Date
  timezone: string
  hasDeadline: boolean
  deadlineDateTime?: Date
  autoSubmit: boolean
  reminders: ReminderConfig
  allowLateSubmission: boolean
  gracePeriodMinutes?: number
  latePenalty?: number
}

export interface CandidateSchedule {
  id: string
  candidateId: string
  assessmentId: string
  customStartDateTime?: Date
  customEndDateTime?: Date
  invitedAt?: Date
  startedAt?: Date
  completedAt?: Date
  remindersSent: {
    type: string
    sentAt: Date
  }[]
  status: "invited" | "started" | "completed" | "expired"
}

