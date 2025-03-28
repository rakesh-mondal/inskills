"use client"

import { useState } from "react"
import { ProgramCreationNotification } from "@/components/admin/program-creation-notification"

export default function CreateProgramPage() {
  const [programName, setProgramName] = useState("")

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create New Program</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create a new program and notify relevant users
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="space-y-4">
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

            <div className="flex justify-end">
              <ProgramCreationNotification programName={programName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 