import type { Metadata } from "next"
import AchievementsPage from "./achievements-page"

export const metadata: Metadata = {
  title: "Achievements - inskills",
  description: "Track your achievements and progress in the inskills program",
}

export default function Page() {
  return <AchievementsPage />
}

