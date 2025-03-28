"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  useEffect(() => {
    // Check if user and token are stored in localStorage on component mount
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("auth-token")
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        // Ensure cookie is set if we have a token
        document.cookie = `auth-token=${storedToken}; path=/`
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("auth-token")
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    try {
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      
      // Create a simple JWT-like token with user data
      const token = btoa(JSON.stringify({ 
        id: userData.id, 
        role: userData.role,
        email: userData.email,
        name: userData.name
      }))
      
      localStorage.setItem("auth-token", token)
      
      // Set cookie for middleware with proper attributes
      document.cookie = `auth-token=${token}; path=/; SameSite=Strict`
      
      // Force a page reload to ensure middleware picks up the new token
      window.location.href = "/"
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = () => {
    try {
      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("auth-token")
      // Remove cookie
      document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
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

