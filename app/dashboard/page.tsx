"use client"

import { useAuth } from "@/contexts/auth-context"
import { AdminDashboard } from "./admin-dashboard"
import DashboardLayout from "./dashboard-layout"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user } = useAuth()

  useEffect(() => {
    // If user is an instructor, redirect to instructor dashboard
    if (user && user.role === "instructor") {
      window.location.href = "/dashboard/instructor"
    }
  }, [user])

  // If no user or not admin, don't render anything (will be redirected)
  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  )
}

