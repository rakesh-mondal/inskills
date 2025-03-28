import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className = "", width = 120, height = 40 }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <Image
        src="/images/logo.png"
        alt="InSkills Logo"
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
      />
    </Link>
  )
} 