import { StudentProvider } from "@/contexts/student-context"
import type React from "react"
import StudentDashboardLayout from "./student-dashboard-layout"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudentProvider>
      <StudentDashboardLayout>{children}</StudentDashboardLayout>
    </StudentProvider>
  )
}

