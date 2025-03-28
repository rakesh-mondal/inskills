"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  Menu,
  Settings,
  Users,
  ClipboardCheck,
  LineChart,
  LogOut,
  Search,
} from "lucide-react"
import { Logo } from "./logo"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  // If no user is logged in, don't show the navigation
  if (!user) return null

  const userRole = user.role

  const handleLogout = () => {
    setOpen(false)
    logout()
    router.push("/login")
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <div className="p-4 border-b">
          <Logo />
        </div>
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-8" />
          </div>
        </div>
        <nav className="flex-1 overflow-auto p-4">
          <div className="flex flex-col gap-1">
            {userRole === "admin" && (
              <>
                <MobileNavItem
                  href="/dashboard"
                  icon={<Home className="h-5 w-5" />}
                  label="Dashboard"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/program"
                  icon={<Settings className="h-5 w-5" />}
                  label="Program Config"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/batches"
                  icon={<Users className="h-5 w-5" />}
                  label="Batch Management"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/sessions"
                  icon={<Calendar className="h-5 w-5" />}
                  label="Session Planning"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/analytics"
                  icon={<BarChart3 className="h-5 w-5" />}
                  label="Analytics"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/reports"
                  icon={<FileText className="h-5 w-5" />}
                  label="Reports"
                  onClick={() => setOpen(false)}
                />
              </>
            )}

            {userRole === "instructor" && (
              <>
                <MobileNavItem
                  href="/dashboard/instructor"
                  icon={<Home className="h-5 w-5" />}
                  label="Dashboard"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/instructor/active-session"
                  icon={<Calendar className="h-5 w-5" />}
                  label="Active Session"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/instructor/evaluation"
                  icon={<ClipboardCheck className="h-5 w-5" />}
                  label="Evaluation"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/instructor/progress-tracking"
                  icon={<LineChart className="h-5 w-5" />}
                  label="Progress Tracking"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/sessions"
                  icon={<Calendar className="h-5 w-5" />}
                  label="Session Calendar"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/reports"
                  icon={<FileText className="h-5 w-5" />}
                  label="Reports"
                  onClick={() => setOpen(false)}
                />
              </>
            )}
          </div>
        </nav>
        <div className="mt-auto border-t p-4">
          <div className="text-sm text-muted-foreground mb-2">
            Signed in as <strong>{user.name}</strong>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileNavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

function MobileNavItem({ href, icon, label, onClick }: MobileNavItemProps) {
  const router = useRouter()
  const isActive = router.pathname === href || router.pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
      )}
      onClick={onClick}
    >
      {icon}
      {label}
    </Link>
  )
}

