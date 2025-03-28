"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, FileText, Users, AlertTriangle, CheckCircle2, Play, ClipboardCheck, Bell } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  if (minutes < 60) {
    return `${minutes} minutes`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}

export function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("today")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your sessions and tasks.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClipboardCheck className="mr-2 h-4 w-4" />
                View Evaluations
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Manage Students
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaySessions.length}</div>
            <p className="text-xs text-muted-foreground">
              {todaySessions.filter(s => s.status === "active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Evaluations</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingEvaluations.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingEvaluations.reduce((acc, curr) => acc + (curr.studentsCount - curr.completedCount), 0)} students remaining
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions.length}</div>
            <p className="text-xs text-muted-foreground">
              Next 7 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Role Assignments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleAssignments.length}</div>
            <p className="text-xs text-muted-foreground">
              Pending for next session
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Sessions</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
          <TabsTrigger value="roles">Role Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todaySessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.title}</TableCell>
                      <TableCell>{session.batch}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>
                        <Badge variant={session.status === "active" ? "default" : "secondary"}>
                          {session.status === "active" ? "Active" : `In ${formatTimeRemaining(session.timeRemaining)}`}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          {session.status === "active" ? (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Join
                            </>
                          ) : (
                            <>
                              <Clock className="mr-2 h-4 w-4" />
                              Prepare
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.title}</TableCell>
                      <TableCell>{session.batch}</TableCell>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>{session.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Evaluations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingEvaluations.map((evaluation) => (
                    <TableRow key={evaluation.id}>
                      <TableCell className="font-medium">{evaluation.sessionTitle}</TableCell>
                      <TableCell>{evaluation.batch}</TableCell>
                      <TableCell>{evaluation.date}</TableCell>
                      <TableCell className="w-[200px]">
                        <div className="flex items-center space-x-2">
                          <Progress value={(evaluation.completedCount / evaluation.studentsCount) * 100} />
                          <span className="text-sm text-muted-foreground">
                            {evaluation.completedCount}/{evaluation.studentsCount}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <ClipboardCheck className="mr-2 h-4 w-4" />
                          Evaluate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  {roleAssignments.map((assignment) => (
                    <div key={assignment.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{assignment.sessionTitle}</h4>
                          <p className="text-sm text-muted-foreground">
                            {assignment.batch} • {assignment.date}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit Roles
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                        {assignment.roles.map((role) => (
                          <div key={role.role} className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarFallback>{role.student.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{role.role}</p>
                              <p className="text-xs text-muted-foreground">{role.student}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

