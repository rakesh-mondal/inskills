"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

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
  login: (user: User) => Promise<void>
  logout: () => void
  isLoading: boolean
  isLoggingIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
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

  const login = async (userData: User) => {
    try {
      setIsLoggingIn(true)
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      
      // Create a JWT-like token with proper format
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
      const payload = btoa(JSON.stringify({ 
        id: userData.id, 
        role: userData.role,
        email: userData.email,
        name: userData.name
      }))
      const signature = btoa("demo-signature") // In a real app, this would be a proper signature
      const token = `${header}.${payload}.${signature}`
      
      localStorage.setItem("auth-token", token)
      
      // Set cookie for middleware with proper attributes
      document.cookie = `auth-token=${token}; path=/; SameSite=Strict`
      
      // Add a small delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Force a page reload to ensure middleware picks up the new token
      window.location.href = "/"
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoggingIn(false)
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

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isLoggingIn }}>
      {children}
      {isLoggingIn && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Signing you in...</p>
          </div>
        </div>
      )}
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

