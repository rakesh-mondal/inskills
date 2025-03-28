"use client"

import { useRoleNotifications } from "@/hooks/use-role-notifications"

interface SessionNotificationProps {
  sessionName: string
  studentName: string
}

export function SessionNotification({ sessionName, studentName }: SessionNotificationProps) {
  const { sendInstructorNotification, instructorNotifications } = useRoleNotifications()

  const handleNewSession = () => {
    // Send notification for new session assignment
    sendInstructorNotification(instructorNotifications.newSession(sessionName))
  }

  const handleStudentFeedback = () => {
    // Send notification for student feedback
    sendInstructorNotification(instructorNotifications.studentFeedback(studentName))
  }

  const handleEvaluationRequest = () => {
    // Send notification for evaluation request
    sendInstructorNotification(instructorNotifications.evaluationRequest(studentName))
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleNewSession}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Assign New Session
      </button>

      <button
        onClick={handleStudentFeedback}
        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Receive Student Feedback
      </button>

      <button
        onClick={handleEvaluationRequest}
        className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        Request Evaluation
      </button>
    </div>
  )
} 