"use client"

import { useRoleNotifications } from "@/hooks/use-role-notifications"

interface ProgramCreationNotificationProps {
  programName: string
}

export function ProgramCreationNotification({ programName }: ProgramCreationNotificationProps) {
  const { sendAdminNotification, adminNotifications } = useRoleNotifications()

  const handleProgramCreation = () => {
    // Send notification when a program is created
    sendAdminNotification(adminNotifications.programCreated(programName))
  }

  return (
    <button
      onClick={handleProgramCreation}
      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Create Program
    </button>
  )
} 