"use client"

import { useAuth } from "@/contexts/auth-context"
import { InstructorDashboard } from "./instructor-dashboard"
import DashboardLayout from "../dashboard-layout"
import { useEffect } from "react"

export default function InstructorDashboardPage() {
  const { user } = useAuth()

  useEffect(() => {
    // If user is an admin, redirect to admin dashboard
    if (user && user.role === "admin") {
      window.location.href = "/dashboard"
    }
  }, [user])

  // If no user or not instructor, don't render anything (will be redirected)
  if (!user || user.role !== "instructor") {
    return null
  }

  return (
    <DashboardLayout>
      <InstructorDashboard />
    </DashboardLayout>
  )
}

