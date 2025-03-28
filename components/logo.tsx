import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative h-8 w-8 md:h-10 md:w-10 flex items-center justify-center bg-primary rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 md:h-6 md:w-6 text-white"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-xl font-bold tracking-tight text-primary md:text-2xl">Inspiria</span>
        <span className="text-xs font-medium text-secondary md:text-sm">inskills</span>
      </div>
    </Link>
  )
}

