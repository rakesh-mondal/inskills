"use client"

import { BookOpen, Plus } from "lucide-react"
import { LoadingSkeleton } from "./loading-skeleton"
import { EmptyState } from "./empty-state"
import { ErrorState } from "./error-state"

export function BatchesLoadingState() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <LoadingSkeleton variant="card" count={6} />
    </div>
  )
}

export function BatchesEmptyState({ onCreateBatch }: { onCreateBatch: () => void }) {
  return (
    <EmptyState
      icon={BookOpen}
      title="No batches found"
      description="Get started by creating your first batch of students."
      action={{
        label: "Create Batch",
        onClick: onCreateBatch,
      }}
    />
  )
}

export function BatchesErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Failed to load batches"
      description="There was an error loading your batches. Please try again."
      action={{
        label: "Try Again",
        onClick: onRetry,
      }}
    />
  )
} 