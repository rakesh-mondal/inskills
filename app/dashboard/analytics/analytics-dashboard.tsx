"use client"

import { useSearchParams } from "next/navigation"

export function AnalyticsDashboard() {
  const searchParams = useSearchParams()

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <p>This is the analytics dashboard.</p>
      <p>Search Params: {searchParams ? searchParams.toString() : "No search params"}</p>
    </div>
  )
}
