import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Student Dashboard - inskills",
  description: "Student dashboard for the inskills platform",
}

import { StudentDashboard } from "./student-dashboard"

export default function Page() {
  return <StudentDashboard />
}

