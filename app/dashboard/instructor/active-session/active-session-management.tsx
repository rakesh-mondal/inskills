"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Users,
  AlertTriangle,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Mic,
  Download,
  CheckCheck,
  Star,
} from "lucide-react"

// Sample session data
const sessionData = {
  id: 1,
  title: "Communication Skills: Public Speaking",
  batch: "CS2023A",
  date: "March 28, 2025",
  time: "10:00 AM - 11:30 AM",
  location: "Room 101",
  duration: 90, // minutes
  agenda: [
    { id: 1, title: "Introduction", duration: 10, status: "completed" },
    { id: 2, title: "Theory Presentation", duration: 15, status: "active" },
    { id: 3, title: "Practice Exercise", duration: 30, status: "upcoming" },
    { id: 4, title: "Feedback and Discussion", duration: 20, status: "upcoming" },
    { id: 5, title: "Conclusion", duration: 5, status: "upcoming" },
    { id: 6, title: "Q&A", duration: 10, status: "upcoming" },
  ],
  materials: [
    { id: 1, title: "Presentation Slides", type: "pdf" },
    { id: 2, title: "Exercise Worksheet", type: "doc" },
    { id: 3, title: "Evaluation Rubric", type: "pdf" },
  ],
}

// Update student data with Indian names
const students = [
  { id: 1, name: "Arjun Sharma", role: "SL", present: true, notes: "" },
  { id: 2, name: "Priya Patel", role: "SR", present: true, notes: "" },
  { id: 3, name: "Rahul Singh", role: "TL1", present: false, notes: "" },
  { id: 4, name: "Ananya Gupta", role: "TL2", present: true, notes: "" },
  { id: 5, name: "Vikram Reddy", role: "TL3", present: true, notes: "" },
  { id: 6, name: "Neha Joshi", role: "TL4", present: true, notes: "" },
  { id: 7, name: "Aditya Kumar", role: "TL5", present: true, notes: "" },
  { id: 8, name: "Kavita Mishra", role: "TL6", present: false, notes: "" },
  { id: 9, name: "Sanjay Desai", role: "AF", present: true, notes: "" },
  { id: 10, name: "Meera Iyer", role: "", present: true, notes: "" },
  { id: 11, name: "Rajesh Verma", role: "", present: true, notes: "" },
  { id: 12, name: "Deepa Nair", role: "", present: true, notes: "" },
]

// Format time for display
function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours > 0 ? `${hours}h ` : ""}${mins}m`
}

export function ActiveSessionManagement() {
  const [isRunning, setIsRunning] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(25) // minutes
  const [remainingTime, setRemainingTime] = useState(65) // minutes
  const [currentAgendaItem, setCurrentAgendaItem] = useState(1)
  const [attendanceTab, setAttendanceTab] = useState("present")
  const [studentNotes, setStudentNotes] = useState<Record<number, string>>({})
  const [studentRatings, setStudentRatings] = useState<Record<number, number>>({})
  const [isOfflineMode, setIsOfflineMode] = useState(false)

  // Update student notes
  const updateStudentNote = (studentId: number, note: string) => {
    setStudentNotes((prev) => ({
      ...prev,
      [studentId]: note,
    }))
  }

  // Update student ratings
  const updateStudentRating = (studentId: number, rating: number) => {
    setStudentRatings((prev) => ({
      ...prev,
      [studentId]: rating,
    }))
  }

  // Toggle student attendance
  const toggleAttendance = (studentId: number) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return { ...student, present: !student.present }
      }
      return student
    })
  }

  // Move to next agenda item
  const nextAgendaItem = () => {
    if (currentAgendaItem < sessionData.agenda.length - 1) {
      setCurrentAgendaItem(currentAgendaItem + 1)
    }
  }

  // Move to previous agenda item
  const prevAgendaItem = () => {
    if (currentAgendaItem > 0) {
      setCurrentAgendaItem(currentAgendaItem - 1)
    }
  }

  // Toggle session timer
  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  // Toggle offline mode
  const toggleOfflineMode = () => {
    setIsOfflineMode(!isOfflineMode)
  }

  // Calculate progress percentage
  const progressPercentage = (elapsedTime / sessionData.duration) * 100

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-950 p-4 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{sessionData.title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{sessionData.batch}</Badge>
            <span>
              {sessionData.date} • {sessionData.time}
            </span>
            <span>{sessionData.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={isOfflineMode ? "destructive" : "outline"}
            className="cursor-pointer"
            onClick={toggleOfflineMode}
          >
            {isOfflineMode ? "Offline Mode" : "Online"}
          </Badge>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Materials
          </Button>
          <Button variant="destructive" size="sm">
            End Session
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Timer and Agenda */}
        <div className="space-y-6">
          {/* Session Timer */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Session Timer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">
                  {formatTime(elapsedTime)} / {formatTime(sessionData.duration)}
                </div>
                <Progress value={progressPercentage} className="h-2 w-full mb-4" />
                <div className="text-sm text-muted-foreground mb-4">{formatTime(remainingTime)} remaining</div>
                <div className="flex gap-2">
                  <Button variant={isRunning ? "default" : "outline"} onClick={toggleTimer}>
                    {isRunning ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Resume
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agenda Tracker */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sessionData.agenda.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-2 rounded-md ${
                      index === currentAgendaItem
                        ? "bg-primary-50 border border-primary"
                        : item.status === "completed"
                          ? "bg-muted line-through"
                          : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.status === "completed" && <CheckCheck className="h-4 w-4 text-green-500" />}
                      {item.status === "active" && <Play className="h-4 w-4 text-primary" />}
                      <span>{item.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.duration}m</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline" size="sm" onClick={prevAgendaItem} disabled={currentAgendaItem === 0}>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextAgendaItem}
                  disabled={currentAgendaItem === sessionData.agenda.length - 1}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Session Materials */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Session Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sessionData.materials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>{material.title}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Attendance and Notes */}
        <div className="space-y-6">
          {/* Attendance Tracker */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Attendance</CardTitle>
              <CardDescription>
                {students.filter((s) => s.present).length}/{students.length} students present
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="present" onValueChange={setAttendanceTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="present">Present ({students.filter((s) => s.present).length})</TabsTrigger>
                  <TabsTrigger value="absent">Absent ({students.filter((s) => !s.present).length})</TabsTrigger>
                </TabsList>
                <TabsContent value="present" className="max-h-[300px] overflow-y-auto">
                  <div className="space-y-2 mt-2">
                    {students
                      .filter((s) => s.present)
                      .map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{student.name}</span>
                          </div>
                          {student.role && <Badge variant="outline">{student.role}</Badge>}
                          <Checkbox checked={student.present} onCheckedChange={() => toggleAttendance(student.id)} />
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="absent" className="max-h-[300px] overflow-y-auto">
                  <div className="space-y-2 mt-2">
                    {students
                      .filter((s) => !s.present)
                      .map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{student.name}</span>
                          </div>
                          {student.role && <Badge variant="outline">{student.role}</Badge>}
                          <Checkbox checked={student.present} onCheckedChange={() => toggleAttendance(student.id)} />
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Observation Notes */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Observation Notes</CardTitle>
              <CardDescription>Record notes for role-based participants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="SL">Session Leader (SL)</SelectItem>
                      <SelectItem value="SR">Session Recorder (SR)</SelectItem>
                      <SelectItem value="TL">Team Leaders (TL)</SelectItem>
                      <SelectItem value="AF">Activity Facilitator (AF)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {students
                    .filter((s) => s.role && s.present)
                    .map((student) => (
                      <div key={student.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{student.role}</Badge>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </div>
                        <Textarea
                          placeholder={`Notes for ${student.name}...`}
                          value={studentNotes[student.id] || ""}
                          onChange={(e) => updateStudentNote(student.id, e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Rating and Session Controls */}
        <div className="space-y-6">
          {/* Quick Rating Panel */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Quick Rating</CardTitle>
              <CardDescription>Rate student participation in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {students
                  .filter((s) => s.present)
                  .map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{student.name}</div>
                          {student.role && <div className="text-xs text-muted-foreground">{student.role}</div>}
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Star
                            key={rating}
                            className={`h-5 w-5 cursor-pointer ${
                              (studentRatings[student.id] || 0) >= rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                            onClick={() => updateStudentRating(student.id, rating)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Session Controls */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Session Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Breakout Groups
              </Button>
              <Button className="w-full" variant="outline">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
              <Button className="w-full" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Save Session Notes
              </Button>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="destructive">
                End Session & Evaluate
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

