"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, ArrowUpRight, ArrowDownRight, CalendarPlus, Star } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Sample batch data
const batchData = {
  id: 1,
  name: "CS2023A",
  department: "Computer Science",
  semester: 3,
  students: 42,
}

// Update student data with Indian names
const students = [
  {
    id: 1,
    name: "Arjun Sharma",
    rollNumber: "CS2023001",
    overallScore: 4.2,
    attendance: 95,
    strengths: ["Communication", "Leadership"],
    growthAreas: ["Teamwork"],
    trend: "improving",
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNumber: "CS2023002",
    overallScore: 3.8,
    attendance: 88,
    strengths: ["Problem Solving"],
    growthAreas: ["Communication", "Leadership"],
    trend: "stable",
  },
  {
    id: 3,
    name: "Rahul Singh",
    rollNumber: "CS2023003",
    overallScore: 3.5,
    attendance: 75,
    strengths: ["Teamwork"],
    growthAreas: ["Time Management", "Public Speaking"],
    trend: "declining",
  },
  {
    id: 4,
    name: "Ananya Gupta",
    rollNumber: "CS2023004",
    overallScore: 4.5,
    attendance: 98,
    strengths: ["Leadership", "Communication", "Teamwork"],
    growthAreas: [],
    trend: "improving",
  },
  {
    id: 5,
    name: "Vikram Reddy",
    rollNumber: "CS2023005",
    overallScore: 3.7,
    attendance: 85,
    strengths: ["Problem Solving", "Critical Thinking"],
    growthAreas: ["Communication"],
    trend: "stable",
  },
]

// Sample skill categories
const skillCategories = [
  "Communication",
  "Leadership",
  "Teamwork",
  "Problem Solving",
  "Critical Thinking",
  "Time Management",
  "Public Speaking",
]

// Sample progress data for a student
const studentProgressData = [
  { month: "Sep 2024", communication: 3.2, leadership: 2.8, teamwork: 3.5, problemSolving: 3.8 },
  { month: "Oct 2024", communication: 3.4, leadership: 3.0, teamwork: 3.6, problemSolving: 3.9 },
  { month: "Nov 2024", communication: 3.7, leadership: 3.2, teamwork: 3.4, problemSolving: 4.0 },
  { month: "Dec 2024", communication: 3.9, leadership: 3.5, teamwork: 3.5, problemSolving: 4.1 },
  { month: "Jan 2025", communication: 4.1, leadership: 3.8, teamwork: 3.7, problemSolving: 4.2 },
  { month: "Feb 2025", communication: 4.3, leadership: 4.0, teamwork: 3.8, problemSolving: 4.3 },
  { month: "Mar 2025", communication: 4.5, leadership: 4.2, teamwork: 4.0, problemSolving: 4.4 },
]

// Sample radar data for a student
const studentRadarData = [
  { skill: "Communication", value: 4.5 },
  { skill: "Leadership", value: 4.2 },
  { skill: "Teamwork", value: 4.0 },
  { skill: "Problem Solving", value: 4.4 },
  { skill: "Critical Thinking", value: 4.3 },
  { skill: "Time Management", value: 3.8 },
  { skill: "Public Speaking", value: 4.1 },
]

// Sample feedback history
const feedbackHistory = [
  {
    id: 1,
    date: "Mar 15, 2025",
    session: "Communication Skills: Public Speaking",
    role: "Session Leader (SL)",
    rating: 4.5,
    feedback:
      "Alice demonstrated excellent leadership skills as the Session Leader. Her presentation was well-structured and engaging. She managed time effectively and ensured all participants were involved. Continue to work on handling unexpected questions with more confidence.",
    instructor: "John Doe",
  },
  {
    id: 2,
    date: "Mar 1, 2025",
    session: "Team Skills: Conflict Resolution",
    role: "Team Leader 2 (TL2)",
    rating: 4.2,
    feedback:
      "As Team Leader, Alice guided her team effectively through the conflict resolution exercise. She ensured all team members had a chance to contribute and facilitated productive discussion. Consider developing more structured approaches to summarizing key points from team discussions.",
    instructor: "Jane Smith",
  },
  {
    id: 3,
    date: "Feb 15, 2025",
    session: "Leadership Skills: Decision Making",
    role: "Session Recorder (SR)",
    rating: 4.0,
    feedback:
      "Alice captured the key points of the session accurately and comprehensively. Her notes were well-organized and provided valuable documentation of the session. She also participated actively beyond her recording role. Work on highlighting action items more clearly in your notes.",
    instructor: "John Doe",
  },
]

// Update batch heatmap data
const batchHeatmapData = [
  {
    id: 1,
    name: "Arjun Sharma",
    communication: 4.5,
    leadership: 4.2,
    teamwork: 4.0,
    problemSolving: 4.4,
    criticalThinking: 4.3,
    timeManagement: 3.8,
    publicSpeaking: 4.1,
  },
  {
    id: 2,
    name: "Priya Patel",
    communication: 3.2,
    leadership: 3.0,
    teamwork: 3.8,
    problemSolving: 4.5,
    criticalThinking: 4.2,
    timeManagement: 3.5,
    publicSpeaking: 3.0,
  },
  {
    id: 3,
    name: "Rahul Singh",
    communication: 3.5,
    leadership: 3.2,
    teamwork: 4.2,
    problemSolving: 3.8,
    criticalThinking: 3.5,
    timeManagement: 3.0,
    publicSpeaking: 3.2,
  },
  {
    id: 4,
    name: "Ananya Gupta",
    communication: 4.8,
    leadership: 4.5,
    teamwork: 4.3,
    problemSolving: 4.0,
    criticalThinking: 4.2,
    timeManagement: 4.5,
    publicSpeaking: 4.7,
  },
  {
    id: 5,
    name: "Vikram Reddy",
    communication: 3.5,
    leadership: 3.8,
    teamwork: 4.0,
    problemSolving: 4.5,
    criticalThinking: 4.6,
    timeManagement: 3.8,
    publicSpeaking: 3.5,
  },
]

export function ProgressTrackingInterface() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(students[0])
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("all")
  const [instructorNotes, setInstructorNotes] = useState("")
  const [sessionDate, setSessionDate] = useState("")

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filter feedback based on selected skill category
  const filteredFeedback =
    selectedSkillCategory === "all"
      ? feedbackHistory
      : feedbackHistory.filter((feedback) =>
          feedback.session.toLowerCase().includes(selectedSkillCategory.toLowerCase()),
        )

  // Get color for trend indicator
  const getTrendColor = (trend: string) => {
    if (trend === "improving") return "text-green-500"
    if (trend === "declining") return "text-red-500"
    return "text-amber-500"
  }

  // Get icon for trend indicator
  const getTrendIcon = (trend: string) => {
    if (trend === "improving") return <ArrowUpRight className="h-4 w-4 text-green-500" />
    if (trend === "declining") return <ArrowDownRight className="h-4 w-4 text-red-500" />
    return null
  }

  // Get color for heatmap cell
  const getHeatmapColor = (value: number) => {
    if (value >= 4.5) return "bg-green-500 text-white"
    if (value >= 4.0) return "bg-green-300"
    if (value >= 3.5) return "bg-green-100"
    if (value >= 3.0) return "bg-yellow-100"
    if (value >= 2.5) return "bg-orange-100"
    return "bg-red-100"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Progress Tracking</h1>
        <p className="text-muted-foreground">Monitor student development and identify growth areas</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Batch Overview and Student Selector */}
        <div className="space-y-6">
          {/* Batch Overview Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Batch Overview</CardTitle>
              <CardDescription>
                {batchData.name} • {batchData.department} • Semester {batchData.semester}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Students</span>
                  <span className="font-medium">{batchData.students}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Performance Distribution</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 h-4">
                    <div className="bg-red-400 rounded-l-full" title="Below 3.0"></div>
                    <div className="bg-orange-400" title="3.0-3.5"></div>
                    <div className="bg-yellow-400" title="3.5-4.0"></div>
                    <div className="bg-green-300" title="4.0-4.5"></div>
                    <div className="bg-green-500 rounded-r-full" title="Above 4.5"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Heatmap */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Performance Heatmap</CardTitle>
              <CardDescription>Relative strengths and weaknesses across the batch</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-xs font-medium text-muted-foreground">Student</th>
                      {Object.keys(batchHeatmapData[0])
                        .filter((key) => key !== "id" && key !== "name")
                        .map((skill) => (
                          <th key={skill} className="p-2 text-left text-xs font-medium text-muted-foreground">
                            {skill.charAt(0).toUpperCase() + skill.slice(1).replace(/([A-Z])/g, " $1")}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {batchHeatmapData.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedStudent(students.find((s) => s.id === student.id) || null)}
                      >
                        <td className="p-2 text-xs font-medium">{student.name}</td>
                        {Object.entries(student)
                          .filter(([key]) => key !== "id" && key !== "name")
                          .map(([skill, value]) => (
                            <td key={skill} className={`p-2 text-xs text-center ${getHeatmapColor(value as number)}`}>
                              {(value as number).toFixed(1)}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Student Selector */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Student Selector</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name or roll number..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                      selectedStudent?.id === student.id ? "bg-primary-50 border border-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-muted-foreground">{student.rollNumber}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="text-sm font-medium">{student.overallScore.toFixed(1)}</div>
                      {getTrendIcon(student.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle and Right Columns - Student Details */}
        {selectedStudent && (
          <div className="md:col-span-2 space-y-6">
            {/* Student Overview */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedStudent.name}</CardTitle>
                    <CardDescription>
                      {selectedStudent.rollNumber} • {batchData.name}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 ${getTrendColor(selectedStudent.trend)}`}>
                      {getTrendIcon(selectedStudent.trend)}
                      <span className="text-sm font-medium capitalize">{selectedStudent.trend}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Overall Score</div>
                    <div className="flex items-center gap-1">
                      <div className="text-3xl font-bold">{selectedStudent.overallScore.toFixed(1)}</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.round(selectedStudent.overallScore)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Attendance</div>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold">{selectedStudent.attendance}%</div>
                      <Progress value={selectedStudent.attendance} className="h-2 w-24" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Last Session</div>
                    <div className="text-sm">Mar 15, 2025</div>
                    <div className="text-xs text-muted-foreground">Communication Skills: Public Speaking</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Strengths</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedStudent.strengths.map((strength, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50">
                          {strength}
                        </Badge>
                      ))}
                      {selectedStudent.strengths.length === 0 && (
                        <span className="text-sm text-muted-foreground">No identified strengths yet</span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Growth Areas</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedStudent.growthAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="bg-amber-50">
                          {area}
                        </Badge>
                      ))}
                      {selectedStudent.growthAreas.length === 0 && (
                        <span className="text-sm text-muted-foreground">No identified growth areas</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Development Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Skill Development Timeline</CardTitle>
                  <CardDescription>Progress across key skill areas over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={studentProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="communication" stroke="#1E5EBF" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="leadership" stroke="#FF7A00" />
                        <Line type="monotone" dataKey="teamwork" stroke="#10B981" />
                        <Line type="monotone" dataKey="problemSolving" stroke="#8B5CF6" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Current Skill Profile</CardTitle>
                  <CardDescription>Comprehensive view of skill development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={studentRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis domain={[0, 5]} />
                        <Radar name="Skills" dataKey="value" stroke="#1E5EBF" fill="#1E5EBF" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feedback History */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Feedback History</CardTitle>
                    <CardDescription>Historical feedback organized by skill category</CardDescription>
                  </div>
                  <Select value={selectedSkillCategory} onValueChange={setSelectedSkillCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {skillCategories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {filteredFeedback.map((feedback) => (
                    <div key={feedback.id} className="p-3 rounded-md border">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{feedback.session}</div>
                          <div className="text-sm text-muted-foreground">
                            {feedback.date} • {feedback.role}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="text-sm font-medium">{feedback.rating.toFixed(1)}</div>
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm mb-2">{feedback.feedback}</p>
                      <div className="text-xs text-muted-foreground">Instructor: {feedback.instructor}</div>
                    </div>
                  ))}
                  {filteredFeedback.length === 0 && (
                    <div className="p-4 text-center">
                      <p className="text-muted-foreground">No feedback found for the selected category.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Instructor Notes and One-on-One Scheduling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Instructor Notes</CardTitle>
                  <CardDescription>Private observations for future reference</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter your notes about this student..."
                    value={instructorNotes}
                    onChange={(e) => setInstructorNotes(e.target.value)}
                    className="min-h-[150px]"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Notes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>One-on-One Session</CardTitle>
                  <CardDescription>Schedule a personal coaching session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-date">Session Date</Label>
                    <Input
                      id="session-date"
                      type="date"
                      value={sessionDate}
                      onChange={(e) => setSessionDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-time">Session Time</Label>
                    <Select>
                      <SelectTrigger id="session-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="1:00">1:00 PM</SelectItem>
                        <SelectItem value="2:00">2:00 PM</SelectItem>
                        <SelectItem value="3:00">3:00 PM</SelectItem>
                        <SelectItem value="4:00">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-focus">Session Focus</Label>
                    <Select>
                      <SelectTrigger id="session-focus">
                        <SelectValue placeholder="Select focus area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="communication">Communication Skills</SelectItem>
                        <SelectItem value="leadership">Leadership Development</SelectItem>
                        <SelectItem value="teamwork">Teamwork Improvement</SelectItem>
                        <SelectItem value="problemSolving">Problem Solving</SelectItem>
                        <SelectItem value="timeManagement">Time Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-notes">Session Notes</Label>
                    <Textarea
                      id="session-notes"
                      placeholder="Enter any specific topics or concerns to address..."
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Schedule Session
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

