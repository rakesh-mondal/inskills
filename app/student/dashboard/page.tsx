"use client"

import { useState } from "react"
import { StudentNotification } from "@/components/student/student-notification"

export default function StudentDashboardPage() {
  const [sessionName, setSessionName] = useState("")
  const [programName, setProgramName] = useState("")
  const [timeUntil, setTimeUntil] = useState("30 minutes")

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Student Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your sessions and programs
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="sessionName" className="block text-sm font-medium text-gray-700">
                Session Name
              </label>
              <input
                type="text"
                id="sessionName"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter session name"
              />
            </div>

            <div>
              <label htmlFor="programName" className="block text-sm font-medium text-gray-700">
                Program Name
              </label>
              <input
                type="text"
                id="programName"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter program name"
              />
            </div>

            <div>
              <label htmlFor="timeUntil" className="block text-sm font-medium text-gray-700">
                Time Until Session
              </label>
              <input
                type="text"
                id="timeUntil"
                value={timeUntil}
                onChange={(e) => setTimeUntil(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter time until session"
              />
            </div>

            <div className="flex justify-end">
              <StudentNotification
                sessionName={sessionName}
                programName={programName}
                timeUntil={timeUntil}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 