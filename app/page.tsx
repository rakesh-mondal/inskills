"use client"

import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    // If user is logged in, redirect to appropriate dashboard
    if (user.role === "admin") {
      router.push("/dashboard")
    } else if (user.role === "instructor") {
      router.push("/dashboard/instructor")
    } else if (user.role === "student") {
      router.push("/student")
    }
  }, [user, isLoading, router])

  // Show loading state while checking auth
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

