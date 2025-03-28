import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Upcoming Sessions - inskills",
  description: "Prepare for your upcoming inskills sessions",
}

import { SessionPreparation } from "./session-preparation"

export default function Page() {
  return <SessionPreparation />
}

