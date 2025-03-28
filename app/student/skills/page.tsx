import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skills & Resources - inskills",
  description: "Explore skills and resources to enhance your development",
}

import { SkillsResourcesHub } from "./skills-resources-hub"

export default function Page() {
  return <SkillsResourcesHub />
}

