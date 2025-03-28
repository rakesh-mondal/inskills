"use client"

import { useRoleNotifications } from "@/hooks/use-role-notifications"

interface StudentNotificationProps {
  sessionName: string
  programName: string
  timeUntil?: string
}

export function StudentNotification({ sessionName, programName, timeUntil = "30 minutes" }: StudentNotificationProps) {
  const { sendStudentNotification, studentNotifications } = useRoleNotifications()

  const handleUpcomingSession = () => {
    // Send notification for upcoming session
    sendStudentNotification(studentNotifications.upcomingSession(sessionName, timeUntil))
  }

  const handleEvaluationResult = () => {
    // Send notification for evaluation result
    sendStudentNotification(studentNotifications.evaluationResult(sessionName))
  }

  const handleProgramEnrollment = () => {
    // Send notification for program enrollment
    sendStudentNotification(studentNotifications.programEnrollment(programName))
  }

  const handleFeedbackRequest = () => {
    // Send notification for feedback request
    sendStudentNotification(studentNotifications.feedbackRequest(sessionName))
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleUpcomingSession}
        className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        Schedule Upcoming Session
      </button>

      <button
        onClick={handleEvaluationResult}
        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        View Evaluation Result
      </button>

      <button
        onClick={handleProgramEnrollment}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Enroll in Program
      </button>

      <button
        onClick={handleFeedbackRequest}
        className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Request Feedback
      </button>
    </div>
  )
} 