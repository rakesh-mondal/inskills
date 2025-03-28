"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, PlusCircle, Users, AlertTriangle, TrendingUp, Bell } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
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
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const performanceData = [
  { name: "CS2023A", attendance: 92, engagement: 85, progress: 78 },
  { name: "CS2023B", attendance: 88, engagement: 82, progress: 75 },
  { name: "EC2023A", attendance: 95, engagement: 90, progress: 82 },
  { name: "ME2023A", attendance: 85, engagement: 78, progress: 70 },
  { name: "BBA2023", attendance: 90, engagement: 88, progress: 80 },
]

const progressData = [
  { month: "Jan", semester1: 65, semester2: 78, semester3: 90 },
  { month: "Feb", semester1: 68, semester2: 82, semester3: 92 },
  { month: "Mar", semester1: 72, semester2: 85, semester3: 93 },
  { month: "Apr", semester1: 75, semester2: 86, semester3: 94 },
  { month: "May", semester1: 80, semester2: 88, semester3: 95 },
  { month: "Jun", semester1: 85, semester2: 90, semester3: 96 },
]

const activityFeed = [
  {
    id: 1,
    type: "session",
    title: "Communication Skills Session Completed",
    description: "Batch CS2023A completed the session with 95% attendance",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "feedback",
    title: "Feedback Submitted",
    description: "Instructor John Doe submitted feedback for 24 students",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "alert",
    title: "Low Engagement Alert",
    description: "Batch ME2023A showing 15% drop in engagement",
    time: "Yesterday",
  },
  {
    id: 4,
    type: "update",
    title: "System Update",
    description: "New scoring parameters added for Team Skills module",
    time: "2 days ago",
  },
]

const upcomingSessions = [
  {
    id: 1,
    title: "Communication Skills: Public Speaking",
    batch: "CS2023A",
    date: "Tomorrow, 10:00 AM",
    instructor: "John Doe",
  },
  {
    id: 2,
    title: "Team Skills: Conflict Resolution",
    batch: "BBA2023",
    date: "Tomorrow, 2:00 PM",
    instructor: "Jane Smith",
  },
  {
    id: 3,
    title: "Leadership Skills: Decision Making",
    batch: "EC2023A",
    date: "Wed, 11:00 AM",
    instructor: "Robert Johnson",
  },
]

const alerts = [
  {
    id: 1,
    title: "Missing Role Assignments",
    description: "5 students in CS2023B haven't been assigned roles in the last 30 days",
    severity: "high",
  },
  {
    id: 2,
    title: "Feedback Pending",
    description: "12 students from yesterday's session are awaiting feedback",
    severity: "medium",
  },
  {
    id: 3,
    title: "Low Attendance Warning",
    description: "ME2023A batch has below 80% attendance in the last 3 sessions",
    severity: "high",
  },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your platform.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +4 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              -1 from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="semester1" stroke="#8884d8" />
                <Line type="monotone" dataKey="semester2" stroke="#82ca9d" />
                <Line type="monotone" dataKey="semester3" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Batch Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RechartsBarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#8884d8" />
                <Bar dataKey="engagement" fill="#82ca9d" />
                <Bar dataKey="progress" fill="#ffc658" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Instructor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.title}</TableCell>
                    <TableCell>{session.batch}</TableCell>
                    <TableCell>{session.date}</TableCell>
                    <TableCell>{session.instructor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <Badge variant="secondary" className="text-xs">
                        {activity.time}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

