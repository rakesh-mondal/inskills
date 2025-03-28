import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Peer Evaluation - inskills",
  description: "Evaluate your peers after inskills sessions",
}

import { PeerEvaluation } from "./peer-evaluation"

export default function Page() {
  return <PeerEvaluation />
}

