"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { OnboardingContent } from "./onboarding-content"
import { useAuth } from "@/contexts/auth-context"

export default function OnboardingPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and no user is logged in, redirect to login page
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // If still loading or no user, don't render the onboarding
  if (isLoading || !user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <Logo />
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 px-4 py-6 md:gap-12 md:px-6 lg:py-10">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome to Inspiria inskills</h1>
              <p className="text-gray-500 dark:text-gray-400">Let's get you familiar with the platform</p>
            </div>
            <OnboardingContent />
          </div>
        </div>
      </main>
    </div>
  )
}

