"use client"

import { MainNav } from "@/components/main-nav"
import { usePathname } from "next/navigation"

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const shouldHideNav = pathname?.startsWith('/dashboard') || 
                       pathname === '/login' || 
                       pathname?.startsWith('/student')

  return (
    <div className="relative flex min-h-screen flex-col">
      {!shouldHideNav && <MainNav />}
      <main className="flex-1">{children}</main>
    </div>
  )
} 