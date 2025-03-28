"use client"

import { useState } from "react"
import { SessionNotification } from "@/components/instructor/session-notification"

export default function InstructorSessionsPage() {
  const [sessionName, setSessionName] = useState("")
  const [studentName, setStudentName] = useState("")

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Session Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage sessions and send notifications to students
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
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter student name"
              />
            </div>

            <div className="flex justify-end">
              <SessionNotification sessionName={sessionName} studentName={studentName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 