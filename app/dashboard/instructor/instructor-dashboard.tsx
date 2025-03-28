"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, FileText, Users, AlertTriangle, CheckCircle2, Play, ClipboardCheck } from "lucide-react"

// Sample data for today's sessions
const todaySessions = [
  {
    id: 1,
    title: "Communication Skills: Public Speaking",
    batch: "CS2023A",
    time: "10:00 AM - 11:30 AM",
    location: "Room 101",
    timeRemaining: 45, // minutes
    status: "upcoming", // upcoming, active, completed
  },
  {
    id: 2,
    title: "Team Skills: Conflict Resolution",
    batch: "BBA2023",
    time: "2:00 PM - 3:30 PM",
    location: "Room 203",
    timeRemaining: 240, // minutes
    status: "upcoming",
  },
]

// Sample data for upcoming sessions
const upcomingSessions = [
  {
    id: 3,
    title: "Leadership Skills: Decision Making",
    batch: "EC2023A",
    date: "Tomorrow",
    time: "11:00 AM - 12:30 PM",
    location: "Room 105",
  },
  {
    id: 4,
    title: "Communication Skills: Active Listening",
    batch: "CS2023B",
    date: "Wed, Mar 30",
    time: "9:00 AM - 10:30 AM",
    location: "Room 102",
  },
  {
    id: 5,
    title: "Team Skills: Collaboration",
    batch: "ME2023A",
    date: "Thu, Mar 31",
    time: "1:00 PM - 2:30 PM",
    location: "Room 201",
  },
]

// Sample data for pending evaluations
const pendingEvaluations = [
  {
    id: 1,
    sessionTitle: "Communication Skills: Presentation",
    batch: "CS2023A",
    date: "Yesterday",
    studentsCount: 42,
    completedCount: 0,
  },
  {
    id: 2,
    sessionTitle: "Team Skills: Problem Solving",
    batch: "BBA2023",
    date: "Mar 25, 2025",
    studentsCount: 38,
    completedCount: 12,
  },
]

// Update role assignments with Indian names
const roleAssignments = [
  {
    id: 1,
    sessionTitle: "Leadership Skills: Decision Making",
    batch: "EC2023A",
    date: "Tomorrow",
    roles: [
      { role: "SL", student: "Arjun Sharma" },
      { role: "SR", student: "Priya Patel" },
      { role: "TL1", student: "Rahul Singh" },
      { role: "TL2", student: "Ananya Gupta" },
      { role: "TL3", student: "Vikram Reddy" },
    ],
  },
  {
    id: 2,
    sessionTitle: "Communication Skills: Active Listening",
    batch: "CS2023B",
    date: "Wed, Mar 30",
    roles: [
      { role: "SL", student: "Neha Joshi" },
      { role: "SR", student: "Aditya Kumar" },
      { role: "TL1", student: "Kavita Mishra" },
      { role: "TL2", student: "Sanjay Desai" },
      { role: "TL3", student: "Meera Iyer" },
    ],
  },
]

// Update performance alerts with Indian names
const performanceAlerts = [
  {
    id: 1,
    type: "improvement",
    student: "Arjun Sharma",
    batch: "CS2023A",
    message: "15% improvement in communication skills over last 3 sessions",
  },
  {
    id: 2,
    type: "decline",
    student: "Priya Patel",
    batch: "CS2023A",
    message: "20% decline in participation over last 2 sessions",
  },
  {
    id: 3,
    type: "improvement",
    student: "Rahul Singh",
    batch: "CS2023A",
    message: "Consistent improvement in leadership skills",
  },
]

// Format time remaining for countdown
function formatTimeRemaining(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours > 0 ? `${hours}h ` : ""}${mins}m`
}

export function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John Doe. Here's your facilitation overview.</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          View Calendar
        </Button>
      </div>

      {/* Today's Sessions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Sessions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {todaySessions.map((session) => (
            <Card key={session.id} className={session.status === "active" ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{session.title}</CardTitle>
                    <CardDescription>
                      {session.batch} • {session.location}
                    </CardDescription>
                  </div>
                  <Badge variant={session.status === "active" ? "default" : "outline"}>
                    {session.status === "active" ? "Active" : session.status === "completed" ? "Completed" : "Upcoming"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {session.time}
                  </div>
                  <div className="text-sm font-medium">
                    {session.status === "upcoming"
                      ? `Starts in ${formatTimeRemaining(session.timeRemaining)}`
                      : session.status === "active"
                        ? `${formatTimeRemaining(session.timeRemaining)} remaining`
                        : "Completed"}
                  </div>
                </div>
                {session.status === "active" && <Progress value={65} className="h-2 mb-2" />}
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Materials
                  </Button>
                  {session.status === "upcoming" ? (
                    <Button size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Start Session
                    </Button>
                  ) : session.status === "active" ? (
                    <Button size="sm">Continue Session</Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      View Summary
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
          {todaySessions.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No sessions scheduled for today</p>
                <Button variant="outline" className="mt-4">
                  View Upcoming Sessions
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="evaluations">Pending Evaluations</TabsTrigger>
          <TabsTrigger value="roles">Role Assignments</TabsTrigger>
          <TabsTrigger value="alerts">Performance Alerts</TabsTrigger>
        </TabsList>

        {/* Upcoming Sessions Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions This Week</CardTitle>
              <CardDescription>Your scheduled sessions for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start space-x-4 p-3 rounded-md hover:bg-muted transition-colors"
                  >
                    <div className="rounded-full bg-primary-50 p-2 mt-1">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{session.title}</p>
                        <Badge variant="outline">{session.batch}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>
                          {session.date} • {session.time}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">Location: {session.location}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Materials
                    </Button>
                  </div>
                ))}
                {upcomingSessions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No upcoming sessions scheduled for this week</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Calendar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Pending Evaluations Tab */}
        <TabsContent value="evaluations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Evaluations</CardTitle>
              <CardDescription>Sessions requiring your evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingEvaluations.map((evaluation) => (
                  <div
                    key={evaluation.id}
                    className="flex items-start space-x-4 p-3 rounded-md hover:bg-muted transition-colors"
                  >
                    <div className="rounded-full bg-amber-50 p-2 mt-1">
                      <ClipboardCheck className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{evaluation.sessionTitle}</p>
                        <Badge variant="outline">{evaluation.batch}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Session Date: {evaluation.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {evaluation.completedCount}/{evaluation.studentsCount} students evaluated
                        </div>
                        <Progress
                          value={(evaluation.completedCount / evaluation.studentsCount) * 100}
                          className="h-2 w-24"
                        />
                      </div>
                    </div>
                    <Button size="sm">Complete Evaluation</Button>
                  </div>
                ))}
                {pendingEvaluations.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ClipboardCheck className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No pending evaluations</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Role Assignments Tab */}
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Role Assignments</CardTitle>
              <CardDescription>Upcoming session roles for the next 3 sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {roleAssignments.map((assignment) => (
                  <div key={assignment.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{assignment.sessionTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                          {assignment.batch} • {assignment.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Users className="mr-2 h-4 w-4" />
                        Modify Roles
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                      {assignment.roles.map((role, index) => (
                        <div key={index} className="flex items-center space-x-2 rounded-md border p-2">
                          <Badge variant="outline">{role.role}</Badge>
                          <span className="text-sm truncate">{role.student}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {roleAssignments.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No role assignments for upcoming sessions</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Alerts</CardTitle>
              <CardDescription>Significant changes in student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start space-x-4 p-3 rounded-md hover:bg-muted transition-colors"
                  >
                    <div
                      className={`rounded-full p-2 mt-1 ${alert.type === "improvement" ? "bg-green-50" : "bg-red-50"}`}
                    >
                      {alert.type === "improvement" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{alert.student}</p>
                        <Badge variant="outline">{alert.batch}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
                {performanceAlerts.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No performance alerts at this time</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Batch Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Batch Overview</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">CS2023A</CardTitle>
              <CardDescription>Computer Science • Semester 3</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between mb-2">
                <div className="text-sm text-muted-foreground">Students</div>
                <div className="font-medium">42</div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="text-sm text-muted-foreground">Avg. Attendance</div>
                <div className="font-medium">92%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">Avg. Engagement</div>
                <div className="font-medium">85%</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Batch
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">BBA2023</CardTitle>
              <CardDescription>Business Administration • Semester 3</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between mb-2">
                <div className="text-sm text-muted-foreground">Students</div>
                <div className="font-medium">45</div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="text-sm text-muted-foreground">Avg. Attendance</div>
                <div className="font-medium">88%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">Avg. Engagement</div>
                <div className="font-medium">82%</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Batch
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">EC2023A</CardTitle>
              <CardDescription>Electronics • Semester 3</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between mb-2">
                <div className="text-sm text-muted-foreground">Students</div>
                <div className="font-medium">35</div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="text-sm text-muted-foreground">Avg. Attendance</div>
                <div className="font-medium">90%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">Avg. Engagement</div>
                <div className="font-medium">88%</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Batch
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

