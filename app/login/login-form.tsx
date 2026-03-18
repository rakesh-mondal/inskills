"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"
import type { User } from "@/contexts/auth-context"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Demo login credentials
const DEMO_CREDENTIALS: User[] = [
  { role: "admin", email: "admin@inskills.com", name: "Admin User", id: "admin-001" },
  { role: "instructor", email: "instructor@inskills.com", name: "Instructor User", id: "instructor-001" },
  { role: "student", email: "student@inskills.com", name: "Student User", id: "student-001" },
]

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      // Find matching demo credential
      const userData = DEMO_CREDENTIALS.find(cred => cred.email === values.email)
      
      if (!userData) {
        toast.error("Invalid email. Please use one of the demo accounts.")
        return
      }

      // Login with complete user data
      await login(userData)
      const from = searchParams.get("from") || "/dashboard"
      router.push(from)
      toast.success("Successfully logged in!")
    } catch (error) {
      toast.error("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm"><strong>Demo Accounts:</strong></p>
          <p className="text-sm">Administrator: {DEMO_CREDENTIALS[0].email}</p>
          <p className="text-sm">Instructor: {DEMO_CREDENTIALS[1].email}</p>
          <p className="text-sm">Student: {DEMO_CREDENTIALS[2].email}</p>
          <p className="text-sm">(Any password will work)</p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  )
}
