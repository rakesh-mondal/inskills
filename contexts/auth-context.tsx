"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import Cookies from "js-cookie"

type UserRole = "admin" | "instructor" | "student" | null

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    console.log("AuthProvider mounted")
    // Check if user is stored in localStorage and token in cookies
    const storedUser = localStorage.getItem("user")
    const token = Cookies.get("auth-token")
    
    console.log("Stored user:", storedUser)
    console.log("Stored token:", token)
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser)
        console.log("Parsed user:", parsedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
        Cookies.remove("auth-token")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    console.log("Login called with:", userData)
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    // Create a simple JWT-like token with user data
    const token = btoa(JSON.stringify({ id: userData.id, role: userData.role }))
    Cookies.set("auth-token", token, { expires: 7 }) // Token expires in 7 days
    console.log("Login completed, user set to:", userData)
  }

  const logout = () => {
    console.log("Logout called")
    setUser(null)
    localStorage.removeItem("user")
    Cookies.remove("auth-token")
    console.log("Logout completed")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

