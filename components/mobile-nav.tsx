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
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  // If still loading or no user, don't show the navigation
  if (isLoading || !user) return null

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
                  href="/dashboard"
                  icon={<Home className="h-5 w-5" />}
                  label="Dashboard"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/sessions"
                  icon={<Calendar className="h-5 w-5" />}
                  label="My Sessions"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/attendance"
                  icon={<ClipboardCheck className="h-5 w-5" />}
                  label="Attendance"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/dashboard/feedback"
                  icon={<FileText className="h-5 w-5" />}
                  label="Feedback"
                  onClick={() => setOpen(false)}
                />
              </>
            )}

            {userRole === "student" && (
              <>
                <MobileNavItem
                  href="/student"
                  icon={<Home className="h-5 w-5" />}
                  label="Dashboard"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/student/sessions"
                  icon={<Calendar className="h-5 w-5" />}
                  label="My Sessions"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/student/progress"
                  icon={<LineChart className="h-5 w-5" />}
                  label="Progress"
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/student/feedback"
                  icon={<FileText className="h-5 w-5" />}
                  label="Feedback"
                  onClick={() => setOpen(false)}
                />
              </>
            )}
          </div>
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            <span>Logout</span>
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
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        "transition-colors"
      )}
      onClick={onClick}
    >
      {icon}
      {label}
    </Link>
  )
}

