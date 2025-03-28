import { Logo } from "@/components/logo"
import { RegistrationForm } from "./registration-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <Logo />
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 px-4 py-6 md:gap-12 md:px-6 lg:py-10">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Create an account</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Complete the registration process to join the Inspiria inskills platform
              </p>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </main>
    </div>
  )
}

