"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Calendar, FileText, Settings, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface OnboardingStep {
  title: string
  description: string
  icon: React.ReactNode
}

const adminSteps: OnboardingStep[] = [
  {
    title: "Program Setup",
    description: "Configure your curriculum structure, modules, and scoring parameters for each semester.",
    icon: <Settings className="h-12 w-12 text-primary" />,
  },
  {
    title: "Batch Management",
    description: "Create and manage student batches, import student data, and assign instructors.",
    icon: <Users className="h-12 w-12 text-primary" />,
  },
  {
    title: "Session Planning",
    description: "Schedule sessions, assign student roles, and send notifications to participants.",
    icon: <Calendar className="h-12 w-12 text-primary" />,
  },
  {
    title: "Analytics Dashboard",
    description: "Track program effectiveness with comprehensive reports and data visualizations.",
    icon: <BarChart3 className="h-12 w-12 text-primary" />,
  },
]

const instructorSteps: OnboardingStep[] = [
  {
    title: "Session Facilitation",
    description: "Access session plans, track attendance, and manage in-session activities.",
    icon: <Calendar className="h-12 w-12 text-primary" />,
  },
  {
    title: "Student Evaluation",
    description: "Score student performances based on predefined parameters and provide feedback.",
    icon: <FileText className="h-12 w-12 text-primary" />,
  },
  {
    title: "Progress Tracking",
    description: "Monitor individual and batch progress through interactive dashboards.",
    icon: <BarChart3 className="h-12 w-12 text-primary" />,
  },
]

const studentSteps: OnboardingStep[] = [
  {
    title: "Role Participation",
    description: "View your assigned roles for upcoming sessions and prepare accordingly.",
    icon: <Users className="h-12 w-12 text-primary" />,
  },
  {
    title: "Feedback Review",
    description: "Access instructor feedback and scores to understand your performance.",
    icon: <FileText className="h-12 w-12 text-primary" />,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your skill development journey through personalized dashboards.",
    icon: <BarChart3 className="h-12 w-12 text-primary" />,
  },
]

export function OnboardingContent() {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  // Determine role from auth context
  const role = user?.role || "admin"

  const steps = role === "admin" ? adminSteps : role === "instructor" ? instructorSteps : studentSteps

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Redirect based on role
      if (role === "admin") {
        router.push("/dashboard")
      } else if (role === "instructor") {
        router.push("/dashboard/instructor")
      } else {
        router.push("/dashboard/student")
      }
    }
  }

  function handleSkip() {
    // Redirect based on role
    if (role === "admin") {
      router.push("/dashboard")
    } else if (role === "instructor") {
      router.push("/dashboard/instructor")
    } else {
      router.push("/dashboard/student")
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 p-4 sm:p-6">
          <div className="flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-primary-50">
            {steps[currentStep].icon}
          </div>
          <p className="max-w-md text-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {steps[currentStep].description}
          </p>
          <div className="relative mt-4 sm:mt-6 aspect-video w-full max-w-lg overflow-hidden rounded-lg border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs sm:text-sm text-gray-500">Feature illustration would appear here</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-gray-200"}`}
              />
            ))}
          </div>
          <Button onClick={handleNext}>{currentStep === steps.length - 1 ? "Get Started" : "Next"}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

