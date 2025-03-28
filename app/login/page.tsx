import { Logo } from "@/components/logo"
import { LoginForm } from "./login-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <Logo />
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 md:gap-12 md:px-6 lg:py-10">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome to Inspiria inskills</h1>
              <p className="text-gray-500 dark:text-gray-400">Sign in to access the platform</p>
            </div>
            <div className="relative hidden h-[300px] w-full overflow-hidden rounded-xl md:block">
              <Image
                src="/images/skills-background.jpg"
                alt="Skills background"
                width={1920}
                height={1080}
                className="absolute inset-0 h-full w-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Sign in</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <LoginForm />
                </Suspense>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <div className="text-sm text-muted-foreground">
                  This is a demo platform. Use the provided demo accounts to explore the features.
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

