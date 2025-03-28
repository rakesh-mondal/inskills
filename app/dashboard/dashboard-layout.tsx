"use client"

import type React from "react"

import type { ReactNode } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Bell,
  Calendar,
  FileText,
  Home,
  LogOut,
  Settings,
  Users,
  ClipboardCheck,
  LineChart,
  Search,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and no user is logged in, redirect to login page
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // If still loading or no user, don't render the dashboard
  if (isLoading || !user) {
    return null
  }

  const userRole = user.role

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-white px-4 dark:bg-gray-950 md:px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileNav />
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>{userRole === "admin" ? "AD" : "IN"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-white dark:bg-gray-950 md:block sticky top-16 h-[calc(100vh-4rem)]">
          <div className="flex h-full flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="pl-8" />
              </div>
            </div>
            <nav className="flex-1 overflow-auto p-2">
              <div className="flex flex-col gap-1 py-2">
                {userRole === "admin" && (
                  <>
                    <NavItem href="/dashboard" icon={<Home className="h-5 w-5" />} label="Dashboard" />
                    <NavItem href="/dashboard/program" icon={<Settings className="h-5 w-5" />} label="Program Config" />
                    <NavItem href="/dashboard/batches" icon={<Users className="h-5 w-5" />} label="Batch Management" />
                    <NavItem
                      href="/dashboard/sessions"
                      icon={<Calendar className="h-5 w-5" />}
                      label="Session Planning"
                    />
                    <NavItem href="/dashboard/analytics" icon={<BarChart3 className="h-5 w-5" />} label="Analytics" />
                    <NavItem href="/dashboard/reports" icon={<FileText className="h-5 w-5" />} label="Reports" />
                  </>
                )}

                {userRole === "instructor" && (
                  <>
                    <NavItem href="/dashboard/instructor" icon={<Home className="h-5 w-5" />} label="Dashboard" />
                    <NavItem
                      href="/dashboard/instructor/active-session"
                      icon={<Calendar className="h-5 w-5" />}
                      label="Active Session"
                    />
                    <NavItem
                      href="/dashboard/instructor/evaluation"
                      icon={<ClipboardCheck className="h-5 w-5" />}
                      label="Evaluation"
                    />
                    <NavItem
                      href="/dashboard/instructor/progress-tracking"
                      icon={<LineChart className="h-5 w-5" />}
                      label="Progress Tracking"
                    />
                    <NavItem
                      href="/dashboard/sessions"
                      icon={<Calendar className="h-5 w-5" />}
                      label="Session Calendar"
                    />
                    <NavItem href="/dashboard/reports" icon={<FileText className="h-5 w-5" />} label="Reports" />
                  </>
                )}
              </div>
            </nav>
            <div className="mt-auto border-t p-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Log out
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
}

function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname ? (pathname === href || pathname.startsWith(`${href}/`)) : false

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
      )}
    >
      {icon}
      {label}
    </Link>
  )
}

