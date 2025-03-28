"use client"

import type React from "react"

import { Logo } from "@/components/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Users, Book, Award, LogOut, Menu } from "lucide-react"
import { useState } from "react"
import { useStudent } from "@/contexts/student-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"

export default function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "" // Provide default empty string if pathname is undefined
  const { student } = useStudent()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)

  const getInitials = (name: string) => {
    if (!name) return "" // Add null check for name
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const navItems = [
    { href: "/student", label: "Dashboard", icon: Home },
    { href: "/student/sessions", label: "Upcoming Sessions", icon: Calendar },
    { href: "/student/evaluation", label: "Peer Evaluation", icon: Users },
    { href: "/student/skills", label: "Skills & Resources", icon: Book },
    { href: "/student/achievements", label: "Achievements", icon: Award },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b">
        <Logo />
      </div>
      <div className="flex flex-col flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          )
        })}
      </div>
      <div className="mt-auto px-4 py-6 border-t">
        <Link
          href="/login"
          className="flex items-center px-3 py-3 text-red-500 hover:bg-red-500/10 rounded-md text-sm font-medium transition-colors"
          onClick={() => setOpen(false)}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Log out
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && (
        <aside className="w-64 border-r bg-card h-screen sticky top-0">
          <SidebarContent />
        </aside>
      )}
      <div className="flex flex-col flex-1">
        <header className="h-16 border-b flex items-center justify-between px-4 sticky top-0 bg-background z-10">
          {isMobile && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          )}
          <div className="flex-1" />
          {student && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium mr-2">{student.name}</span>
              <Avatar>
                <AvatarImage src={student.avatar} alt={student.name || ""} />
                <AvatarFallback>{getInitials(student.name || "")}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

