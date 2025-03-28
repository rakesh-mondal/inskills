"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Loader2 } from "lucide-react"

// Demo login credentials
const DEMO_CREDENTIALS = [
  { role: "admin", email: "admin@inskills.com" },
  { role: "instructor", email: "instructor@inskills.com" },
  { role: "student", email: "student@inskills.com" },
]

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    // Determine role based on email
    let role = null

    if (email === DEMO_CREDENTIALS[0].email) {
      role = "admin"
    } else if (email === DEMO_CREDENTIALS[1].email) {
      role = "instructor"
    } else if (email === DEMO_CREDENTIALS[2].email) {
      role = "student"
    } else {
      setError("Invalid email. Please use one of the demo accounts.")
      setIsLoading(false)
      return
    }

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)

      // Login with determined role
      login({ email, role })

      // Redirect based on role
      if (role === "admin") {
        router.push("/dashboard")
      } else if (role === "instructor") {
        router.push("/dashboard/instructor")
      } else if (role === "student") {
        router.push("/student")
      }
    }, 1000)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Alert className="bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-sm">
          <strong>Demo Accounts:</strong>
          <br />
          Administrator: {DEMO_CREDENTIALS[0].email}
          <br />
          Instructor: {DEMO_CREDENTIALS[1].email}
          <br />
          Student: {DEMO_CREDENTIALS[2].email}
          <br />
          (Any password will work)
        </AlertDescription>
      </Alert>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="Enter your email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label
          htmlFor="remember"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </Label>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="text-center text-sm">
        New to Inspiria inskills?{" "}
        <Link href="/register" className="font-medium text-primary underline underline-offset-4 hover:text-primary/90">
          Create an account
        </Link>
      </div>
    </form>
  )
}

