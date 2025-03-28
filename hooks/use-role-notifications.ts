import { useNotification } from "./use-notification"
import { useAuth } from "@/contexts/auth-context"
import {
  adminNotifications,
  instructorNotifications,
  studentNotifications,
  type RoleNotification,
} from "@/utils/notifications"

export function useRoleNotifications() {
  const { notify } = useNotification()
  const { user } = useAuth()

  const sendNotification = (notification: RoleNotification) => {
    notify(notification)
  }

  const sendAdminNotification = (notification: RoleNotification) => {
    if (user?.role === "admin") {
      sendNotification(notification)
    }
  }

  const sendInstructorNotification = (notification: RoleNotification) => {
    if (user?.role === "instructor") {
      sendNotification(notification)
    }
  }

  const sendStudentNotification = (notification: RoleNotification) => {
    if (user?.role === "student") {
      sendNotification(notification)
    }
  }

  return {
    sendNotification,
    sendAdminNotification,
    sendInstructorNotification,
    sendStudentNotification,
    adminNotifications,
    instructorNotifications,
    studentNotifications,
  }
} 