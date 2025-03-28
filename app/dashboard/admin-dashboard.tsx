"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, PlusCircle, Users, AlertTriangle, TrendingUp } from "lucide-react"
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
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your inskills program performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Session
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12%</span> from last semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+4</span> new this semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">-1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <Card className="md:col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Program Progress</CardTitle>
            <CardDescription>Average skill development progress across semesters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="semester1" stroke="#1E5EBF" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="semester2" stroke="#FF7A00" />
                  <Line type="monotone" dataKey="semester3" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Batch Performance</CardTitle>
            <CardDescription>Comparison across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#1E5EBF" />
                  <Bar dataKey="engagement" fill="#FF7A00" />
                  <Bar dataKey="progress" fill="#10B981" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <Card className="md:col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Next 3 scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary-50 p-2">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{session.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.batch} • {session.date}
                    </p>
                    <p className="text-xs text-muted-foreground">Instructor: {session.instructor}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Sessions
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-4">
                  <div className={`rounded-full p-2 ${alert.severity === "high" ? "bg-red-50" : "bg-amber-50"}`}>
                    <AlertTriangle
                      className={`h-4 w-4 ${alert.severity === "high" ? "text-red-500" : "text-amber-500"}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityFeed.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="rounded-full bg-secondary-50 p-2">
                    {activity.type === "session" && <Calendar className="h-4 w-4 text-secondary" />}
                    {activity.type === "feedback" && <FileText className="h-4 w-4 text-secondary" />}
                    {activity.type === "alert" && <AlertTriangle className="h-4 w-4 text-secondary" />}
                    {activity.type === "update" && <TrendingUp className="h-4 w-4 text-secondary" />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

