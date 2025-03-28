"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import Cookies from "js-cookie"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "instructor" | "student"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const demoUsers: Record<string, User> = {
  "admin@example.com": {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  "instructor@example.com": {
    id: "2",
    name: "Instructor User",
    email: "instructor@example.com",
    role: "instructor",
  },
  "student@example.com": {
    id: "3",
    name: "Student User",
    email: "student@example.com",
    role: "student",
  },
}

const demoPasswords: Record<string, string> = {
  "admin@example.com": "admin123",
  "instructor@example.com": "instructor123",
  "student@example.com": "student123",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    console.log("AuthProvider mounted")
    const storedUser = localStorage.getItem("user")
    const token = Cookies.get("token")
    console.log("Stored user:", storedUser)
    console.log("Token:", token)

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser)
        console.log("Parsed user:", parsedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
        Cookies.remove("token")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    console.log("Login called with email:", email)
    
    // Demo authentication
    const demoUser = demoUsers[email]
    const correctPassword = demoPasswords[email]

    if (demoUser && password === correctPassword) {
      console.log("Demo user found:", demoUser)
      setUser(demoUser)
      localStorage.setItem("user", JSON.stringify(demoUser))
      Cookies.set("token", "demo-token", { expires: 7 })
      console.log("Login completed")
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const logout = () => {
    console.log("Logout called")
    setUser(null)
    localStorage.removeItem("user")
    Cookies.remove("token")
    console.log("Logout completed")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

