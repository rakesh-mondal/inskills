import { type NotificationType, type NotificationCategory } from "@/contexts/notification-context"

export interface RoleNotification {
  type: NotificationType
  category: NotificationCategory
  title: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
}

// Admin Notifications
export const adminNotifications = {
  newUserRegistration: (userName: string): RoleNotification => ({
    type: "info",
    category: "role",
    title: "New User Registration",
    message: `${userName} has registered and needs approval.`,
    action: {
      label: "Review Registration",
      onClick: () => window.location.href = "/admin/users/pending",
    },
  }),

  instructorRequest: (instructorName: string): RoleNotification => ({
    type: "info",
    category: "role",
    title: "New Instructor Request",
    message: `${instructorName} has requested to become an instructor.`,
    action: {
      label: "Review Request",
      onClick: () => window.location.href = "/admin/instructors/pending",
    },
  }),

  programCreated: (programName: string): RoleNotification => ({
    type: "success",
    category: "system",
    title: "New Program Created",
    message: `Program "${programName}" has been created successfully.`,
    action: {
      label: "View Program",
      onClick: () => window.location.href = "/admin/programs",
    },
  }),

  systemUpdate: (updateMessage: string): RoleNotification => ({
    type: "info",
    category: "system",
    title: "System Update",
    message: updateMessage,
  }),
}

// Instructor Notifications
export const instructorNotifications = {
  newSession: (sessionName: string): RoleNotification => ({
    type: "info",
    category: "role",
    title: "New Session Assigned",
    message: `You have been assigned to "${sessionName}".`,
    action: {
      label: "View Session",
      onClick: () => window.location.href = "/instructor/sessions",
    },
  }),

  studentFeedback: (studentName: string): RoleNotification => ({
    type: "success",
    category: "feedback",
    title: "New Student Feedback",
    message: `${studentName} has submitted feedback for your session.`,
    action: {
      label: "View Feedback",
      onClick: () => window.location.href = "/instructor/feedback",
    },
  }),

  evaluationRequest: (studentName: string): RoleNotification => ({
    type: "warning",
    category: "feedback",
    title: "Evaluation Request",
    message: `${studentName} has requested an evaluation.`,
    action: {
      label: "Complete Evaluation",
      onClick: () => window.location.href = "/instructor/evaluations",
    },
  }),

  programUpdate: (programName: string, updateMessage: string): RoleNotification => ({
    type: "info",
    category: "system",
    title: "Program Update",
    message: `Program "${programName}": ${updateMessage}`,
    action: {
      label: "View Program",
      onClick: () => window.location.href = "/instructor/programs",
    },
  }),
}

// Student Notifications
export const studentNotifications = {
  upcomingSession: (sessionName: string, timeUntil: string): RoleNotification => ({
    type: "warning",
    category: "role",
    title: "Upcoming Session",
    message: `Your session "${sessionName}" starts in ${timeUntil}.`,
    action: {
      label: "Join Session",
      onClick: () => window.location.href = "/student/sessions",
    },
  }),

  evaluationResult: (sessionName: string): RoleNotification => ({
    type: "success",
    category: "feedback",
    title: "Evaluation Result",
    message: `Your evaluation for "${sessionName}" is ready.`,
    action: {
      label: "View Result",
      onClick: () => window.location.href = "/student/evaluations",
    },
  }),

  programEnrollment: (programName: string): RoleNotification => ({
    type: "success",
    category: "role",
    title: "Program Enrollment",
    message: `You have been enrolled in "${programName}".`,
    action: {
      label: "View Program",
      onClick: () => window.location.href = "/student/programs",
    },
  }),

  feedbackRequest: (sessionName: string): RoleNotification => ({
    type: "info",
    category: "feedback",
    title: "Feedback Request",
    message: `Please provide feedback for your session "${sessionName}".`,
    action: {
      label: "Submit Feedback",
      onClick: () => window.location.href = "/student/feedback",
    },
  }),
} 