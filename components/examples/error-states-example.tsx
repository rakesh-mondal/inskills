"use client"

import { ErrorState } from "@/components/ui/error-states"

export function ErrorStatesExample() {
  return (
    <div className="space-y-8">
      {/* Critical Error - Full Page */}
      <ErrorState
        variant="critical"
        title="Unable to Connect to Server"
        description="We're having trouble connecting to our servers. This could be due to network issues or server maintenance."
        action={{
          label: "Try Again",
          onClick: () => window.location.reload(),
        }}
        secondaryAction={{
          label: "Back to Dashboard",
          onClick: () => window.location.href = "/dashboard",
        }}
        fullPage
      />

      {/* Warning - Inline */}
      <ErrorState
        variant="warning"
        title="Session About to Expire"
        description="Your session will expire in 5 minutes. Any unsaved changes will be lost."
        action={{
          label: "Extend Session",
          onClick: () => console.log("Extend session"),
        }}
      />

      {/* Info - Inline */}
      <ErrorState
        variant="info"
        title="System Maintenance"
        description="The system will undergo scheduled maintenance on Sunday, 21:00-23:00 UTC. Some features may be unavailable during this time."
        action={{
          label: "Learn More",
          onClick: () => console.log("Show maintenance details"),
        }}
      />

      {/* Critical Error - Inline */}
      <ErrorState
        variant="critical"
        title="Failed to Save Changes"
        description="We couldn't save your recent changes due to a technical issue. Your work may be lost if you leave this page."
        action={{
          label: "Retry",
          onClick: () => console.log("Retry save"),
        }}
        secondaryAction={{
          label: "Discard Changes",
          onClick: () => console.log("Discard changes"),
        }}
      />

      {/* Warning - Full Page */}
      <ErrorState
        variant="warning"
        title="Limited Access Mode"
        description="You're currently in limited access mode due to network constraints. Some features may be unavailable or slower than usual."
        action={{
          label: "Switch to Offline Mode",
          onClick: () => console.log("Switch to offline mode"),
        }}
        secondaryAction={{
          label: "Continue Anyway",
          onClick: () => console.log("Continue in limited mode"),
        }}
        fullPage
      />
    </div>
  )
} 