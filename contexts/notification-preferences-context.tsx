"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type NotificationPreferences } from "@/components/notifications/notification-preferences"
import { type NotificationCategory } from "@/contexts/notification-context"

interface NotificationPreferencesContextType {
  preferences: NotificationPreferences
  updatePreferences: (newPreferences: NotificationPreferences) => void
  isCategoryEnabled: (category: NotificationCategory) => boolean
}

const defaultPreferences: NotificationPreferences = {
  inApp: true,
  email: true,
  push: true,
  categories: {
    role: true,
    feedback: true,
    system: true,
  },
}

const NotificationPreferencesContext = createContext<NotificationPreferencesContextType | undefined>(
  undefined
)

export function NotificationPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedPreferences = localStorage.getItem("notificationPreferences")
    if (storedPreferences) {
      try {
        setPreferences(JSON.parse(storedPreferences))
      } catch (error) {
        console.error("Failed to parse stored notification preferences:", error)
        localStorage.removeItem("notificationPreferences")
      }
    }
  }, [])

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notificationPreferences", JSON.stringify(preferences))
  }, [preferences])

  const updatePreferences = (newPreferences: NotificationPreferences) => {
    setPreferences(newPreferences)
  }

  const isCategoryEnabled = (category: NotificationCategory): boolean => {
    if (category === "all") {
      return Object.values(preferences.categories).every((enabled) => enabled)
    }
    return preferences.categories[category]
  }

  return (
    <NotificationPreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        isCategoryEnabled,
      }}
    >
      {children}
    </NotificationPreferencesContext.Provider>
  )
}

export function useNotificationPreferences() {
  const context = useContext(NotificationPreferencesContext)
  if (context === undefined) {
    throw new Error(
      "useNotificationPreferences must be used within a NotificationPreferencesProvider"
    )
  }
  return context
} 