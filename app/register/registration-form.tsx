"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

type Step = "basic" | "role" | "profile" | "confirmation"

export function RegistrationForm() {
  const [step, setStep] = useState<Step>("basic")
  const [role, setRole] = useState<string>("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  function handleNext() {
    if (step === "basic") setStep("role")
    else if (step === "role") setStep("profile")
    else if (step === "profile") setStep("confirmation")
    else if (step === "confirmation") {
      setIsLoading(true)
      // Simulate registration
      setTimeout(() => {
        setIsLoading(false)

        // Login the user with the selected role
        const userRole = role === "admin" ? "admin" : role === "instructor" ? "instructor" : null
        const name = `${firstName} ${lastName}`

        if (userRole) {
          login(userRole, name, email)
        }

        router.push("/onboarding")
      }, 1000)
    }
  }

  function handleBack() {
    if (step === "role") setStep("basic")
    else if (step === "profile") setStep("role")
    else if (step === "confirmation") setStep("profile")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Registration</CardTitle>
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${step === "basic" ? "bg-primary" : "bg-gray-200"}`} />
            <div className={`h-2 w-2 rounded-full ${step === "role" ? "bg-primary" : "bg-gray-200"}`} />
            <div className={`h-2 w-2 rounded-full ${step === "profile" ? "bg-primary" : "bg-gray-200"}`} />
            <div className={`h-2 w-2 rounded-full ${step === "confirmation" ? "bg-primary" : "bg-gray-200"}`} />
          </div>
        </div>
        <CardDescription>
          {step === "basic" && "Step 1: Enter your basic information"}
          {step === "role" && "Step 2: Select your role"}
          {step === "profile" && "Step 3: Complete your profile"}
          {step === "confirmation" && "Step 4: Confirm your details"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "basic" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  placeholder="John"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  placeholder="Doe"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+91 9876543210" required type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Create Password</Label>
              <Input id="password" required type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" required type="password" />
            </div>
          </div>
        )}

        {step === "role" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select your role</Label>
              <RadioGroup defaultValue={role} onValueChange={setRole} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="flex-1 cursor-pointer">
                    Program Administrator
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="instructor" id="instructor" />
                  <Label htmlFor="instructor" className="flex-1 cursor-pointer">
                    Instructor
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="flex-1 cursor-pointer">
                    Student
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {step === "profile" && (
          <div className="space-y-4">
            {role === "admin" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution Name</Label>
                  <Input id="institution" placeholder="Inspiria College" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Academic Affairs" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Program Director" required />
                </div>
              </>
            )}

            {role === "instructor" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution Name</Label>
                  <Input id="institution" placeholder="Inspiria College" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Computer Science" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input id="specialization" placeholder="Communication Skills" required />
                </div>
              </>
            )}

            {role === "student" && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="batch-code">Batch Code</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                            <HelpCircle className="h-4 w-4" />
                            <span className="sr-only">Batch code information</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Enter the batch code provided by your instructor or program administrator
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input id="batch-code" placeholder="CS2023A" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution Name</Label>
                  <Input id="institution" placeholder="Inspiria College" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" placeholder="B.Tech Computer Science" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Current Semester</Label>
                  <Select>
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Semester 1</SelectItem>
                      <SelectItem value="2">Semester 2</SelectItem>
                      <SelectItem value="3">Semester 3</SelectItem>
                      <SelectItem value="4">Semester 4</SelectItem>
                      <SelectItem value="5">Semester 5</SelectItem>
                      <SelectItem value="6">Semester 6</SelectItem>
                      <SelectItem value="7">Semester 7</SelectItem>
                      <SelectItem value="8">Semester 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        )}

        {step === "confirmation" && (
          <div className="space-y-4">
            <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
              <h3 className="mb-2 font-medium">Review your information</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please review your information before completing registration. You can go back to make changes if
                needed.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Name:{" "}
                <span className="font-normal">
                  {firstName} {lastName}
                </span>
              </p>
              <p className="text-sm font-medium">
                Role:{" "}
                <span className="font-normal">
                  {role === "admin" ? "Program Administrator" : role === "instructor" ? "Instructor" : "Student"}
                </span>
              </p>
              <p className="text-sm font-medium">
                Email: <span className="font-normal">{email}</span>
              </p>
              {role === "student" && (
                <p className="text-sm font-medium">
                  Batch Code: <span className="font-normal">CS2023A</span>
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        {step !== "basic" ? (
          <Button variant="outline" onClick={handleBack} className="w-full sm:w-auto">
            Back
          </Button>
        ) : (
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary underline underline-offset-4">
              Sign in
            </Link>
          </div>
        )}
        <Button onClick={handleNext} disabled={isLoading} className="w-full sm:w-auto">
          {step === "confirmation" ? (isLoading ? "Completing Registration..." : "Complete Registration") : "Next"}
        </Button>
      </CardFooter>
    </Card>
  )
}

