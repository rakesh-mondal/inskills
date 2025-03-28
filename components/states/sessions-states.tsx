"use client"

import { Calendar, Video } from "lucide-react"
import { LoadingSkeleton } from "./loading-skeleton"
import { EmptyState } from "./empty-state"
import { ErrorState } from "./error-state"

export function SessionsLoadingState() {
  return (
    <div className="space-y-6">
      <LoadingSkeleton variant="list" count={5} />
    </div>
  )
}

export function SessionsEmptyState({ onCreateSession }: { onCreateSession: () => void }) {
  return (
    <EmptyState
      icon={Video}
      title="No sessions scheduled"
      description="Schedule your first session to start teaching."
      action={{
        label: "Schedule Session",
        onClick: onCreateSession,
      }}
    />
  )
}

export function SessionsErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Failed to load sessions"
      description="There was an error loading your sessions. Please try again."
      action={{
        label: "Try Again",
        onClick: onRetry,
      }}
    />
  )
} 