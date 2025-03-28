"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for student data
export interface SkillArea {
  name: string
  level: number
  progress: number
}

interface TeamMember {
  id: string
  name: string
  avatar?: string
  role?: string
}

interface FeedbackArea {
  name: string
  score: number
}

interface Feedback {
  id: string
  sessionName: string
  date: string
  role: string
  comment: string
  from: string
  areas: FeedbackArea[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  date?: string
}

interface UpcomingSession {
  id: string
  title: string
  date: string
  time: string
  role: string
  preparation: string[]
}

interface Student {
  id: string
  name: string
  email: string
  department: string
  year: number
  avatar: string
  points: number
  rank: number
  totalStudents: number
  skillAreas: SkillArea[]
  teamMembers: TeamMember[]
  feedback: Feedback[]
  achievements: Achievement[]
  upcomingSessions: UpcomingSession[]
}

interface StudentContextType {
  student: Student | null
  loading: boolean
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

// Mock student data with Indian names
const mockStudent: Student = {
  id: "s-001",
  name: "Arjun Sharma",
  email: "arjun.sharma@student.inspiria.edu",
  department: "Computer Science",
  year: 2,
  avatar: "/placeholder.svg?height=40&width=40",
  points: 850,
  rank: 3,
  totalStudents: 45,
  skillAreas: [
    { name: "Communication", level: 75, progress: 75 },
    { name: "Leadership", level: 60, progress: 60 },
    { name: "Teamwork", level: 85, progress: 85 },
    { name: "Problem Solving", level: 82, progress: 82 },
    { name: "Time Management", level: 65, progress: 65 },
  ],
  teamMembers: [
    { id: "tm-001", name: "Priya Patel", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "tm-002", name: "Rahul Singh", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "tm-003", name: "Ananya Gupta", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "tm-004", name: "Vikram Reddy", avatar: "/placeholder.svg?height=32&width=32" },
  ],
  feedback: [
    {
      id: "f-001",
      sessionName: "Leadership Workshop",
      date: "March 15, 2025",
      role: "Team Leader",
      comment: "Arjun demonstrated excellent leadership skills and effectively guided the team through challenges.",
      from: "Dr. Rajesh Verma",
      areas: [
        { name: "Leadership", score: 4.5 },
        { name: "Communication", score: 4.0 },
        { name: "Problem Solving", score: 3.8 },
      ],
    },
    {
      id: "f-002",
      sessionName: "Group Presentation",
      date: "February 28, 2025",
      role: "Presenter",
      comment: "Good presentation skills but could improve on time management and audience engagement.",
      from: "Prof. Priya Mehta",
      areas: [
        { name: "Communication", score: 3.5 },
        { name: "Time Management", score: 2.8 },
        { name: "Content Quality", score: 4.2 },
      ],
    },
  ],
  achievements: [
    {
      id: "a-001",
      title: "Leadership Excellence",
      description: "Demonstrated exceptional leadership in 3 consecutive sessions",
      icon: "award",
      earned: true,
      date: "2024-02-15",
    },
    {
      id: "a-002",
      title: "Team Player",
      description: "Received positive peer feedback from all team members",
      icon: "users",
      earned: true,
      date: "2024-01-20",
    },
    {
      id: "a-003",
      title: "Perfect Attendance",
      description: "Attended 10 consecutive sessions without absence",
      icon: "calendar-check",
      earned: false,
    },
    {
      id: "a-004",
      title: "Feedback Master",
      description: "Provided constructive feedback to 15 peers",
      icon: "message-square",
      earned: false,
    },
  ],
  upcomingSessions: [
    {
      id: "s-001",
      title: "Crisis Management Simulation",
      date: "April 5, 2025",
      time: "10:00 AM - 12:00 PM",
      role: "Session Leader (SL)",
      preparation: [
        "Review crisis management framework document",
        "Prepare opening remarks and team allocation",
        "Review previous session feedback",
      ],
    },
    {
      id: "s-002",
      title: "Effective Communication Workshop",
      date: "April 12, 2025",
      time: "2:00 PM - 4:00 PM",
      role: "Team Leader 2 (TL2)",
      preparation: [
        "Complete pre-session communication assessment",
        "Read chapter 3 of the communication handbook",
        "Prepare a 2-minute introduction for your team",
      ],
    },
    {
      id: "s-003",
      title: "Problem-Solving Challenge",
      date: "April 19, 2025",
      time: "10:00 AM - 12:00 PM",
      role: "Team Member",
      preparation: [
        "Review logical reasoning techniques",
        "Practice collaborative problem-solving methods",
        "Bring a real-world problem to discuss",
      ],
    },
  ],
}

export function StudentProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [student, setStudent] = useState<Student | null>(null)

  useEffect(() => {
    // Simulate API call to fetch student data
    const fetchStudentData = () => {
      setTimeout(() => {
        setStudent(mockStudent)
        setLoading(false)
      }, 1000)
    }

    fetchStudentData()
  }, [])

  return <StudentContext.Provider value={{ student, loading }}>{children}</StudentContext.Provider>
}

export function useStudent() {
  const context = useContext(StudentContext)
  if (context === undefined) {
    throw new Error("useStudent must be used within a StudentProvider")
  }
  return context
}

