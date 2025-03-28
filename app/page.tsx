"use client"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"

export default function Home() {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      window.location.href = "/login"
      return
    }

    if (user.role === "admin") {
      window.location.href = "/dashboard"
    } else if (user.role === "instructor") {
      window.location.href = "/dashboard/instructor"
    } else if (user.role === "student") {
      window.location.href = "/student"
    }
  }, [user, isLoading])

  // Show nothing while redirecting
  return null
}

