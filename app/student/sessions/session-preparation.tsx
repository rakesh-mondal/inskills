"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStudent } from "@/contexts/student-context"
import { CalendarIcon, CheckSquare, Square, FileText, Clock, MapPin, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

export function SessionPreparation() {
  const { student, loading } = useStudent()
  const [checklist, setChecklist] = useState({
    "review-materials": false,
    "watch-video": false,
    "practice-skills": false,
    "prepare-questions": false,
    "ready-session": false,
  })

  const toggleCheckItem = (key: string) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (loading || !student) {
    return <div className="flex items-center justify-center min-h-[70vh]">Loading...</div>
  }

  const nextSession = student.upcomingSessions[0]
  const secondSession = student.upcomingSessions[1]

  const sessionMaterials = [
    { id: "m-001", title: "Crisis Management Framework", type: "PDF", size: "1.2 MB" },
    { id: "m-002", title: "Team Leader Role Description", type: "DOC", size: "0.5 MB" },
    { id: "m-003", title: "Example Crisis Response", type: "Video", size: "15 min" },
    { id: "m-004", title: "Decision Tree Template", type: "XLS", size: "0.8 MB" },
  ]

  const upcomingSessions = [
    {
      id: "1",
      date: new Date("2025-04-05"),
      title: "Crisis Management Simulation",
      role: "Team Leader",
    },
    {
      id: "2",
      date: new Date("2025-04-12"),
      title: "Negotiation Workshop",
      role: "Negotiator",
    },
    {
      id: "3",
      date: new Date("2025-04-19"),
      title: "Product Pitch Practice",
      role: "Observer",
    },
    {
      id: "4",
      date: new Date("2025-04-26"),
      title: "Conflict Resolution Scenario",
      role: "Mediator",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          {/* Session Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{nextSession.title}</CardTitle>
                  <CardDescription>Prepare for your upcoming session</CardDescription>
                </div>
                <Badge className="ml-2">{nextSession.role}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{nextSession.date}</span>
                  <span className="text-muted-foreground">•</span>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{nextSession.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{nextSession.location}</span>
                </div>
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Role Description:</h4>
                  <p className="text-sm text-muted-foreground">{nextSession.description}</p>
                </div>
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-2">Preparation Checklist:</h4>
                  <div className="space-y-2">
                    {Object.entries(checklist).map(([key, checked]) => (
                      <div key={key} className="flex items-start">
                        <button onClick={() => toggleCheckItem(key)} className="mr-2 mt-0.5 flex-shrink-0">
                          {checked ? (
                            <CheckSquare className="h-5 w-5 text-primary" />
                          ) : (
                            <Square className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>
                        <span className="text-sm">
                          {key === "review-materials" && "Review all session materials"}
                          {key === "watch-video" && "Watch the example crisis response video"}
                          {key === "practice-skills" && "Practice leadership communication skills"}
                          {key === "prepare-questions" && "Prepare questions for the facilitator"}
                          {key === "ready-session" && "Confirm readiness for the session"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Previous Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Previous Feedback in Similar Roles</CardTitle>
              <CardDescription>Learn from past experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm">Team Strategy Session</h4>
                    <Badge variant="outline">Team Leader</Badge>
                  </div>
                  <p className="text-sm mt-1">
                    "Excellent at keeping the team focused on objectives. Could improve time allocation for different
                    discussion points."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">From: Dr. Sarah Miller</p>
                </div>
                <div className="border-l-4 border-secondary pl-4 py-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm">Change Management Workshop</h4>
                    <Badge variant="outline">Team Leader</Badge>
                  </div>
                  <p className="text-sm mt-1">
                    "Good delegation of tasks. Consider creating more opportunities for quiet team members to
                    contribute."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">From: Prof. James Wilson</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goal Setting */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Goals for This Session</CardTitle>
              <CardDescription>Set objectives to focus your participation</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What do you want to achieve in this session? What specific skills do you want to develop?"
                className="min-h-[100px]"
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Primary Focus Area:</h4>
                  <select className="w-full p-2 border rounded-md text-sm">
                    <option>Communication</option>
                    <option>Leadership</option>
                    <option>Problem Solving</option>
                    <option>Decision Making</option>
                    <option>Team Coordination</option>
                  </select>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Secondary Focus Area:</h4>
                  <select className="w-full p-2 border rounded-md text-sm">
                    <option>Time Management</option>
                    <option>Conflict Resolution</option>
                    <option>Adaptability</option>
                    <option>Critical Thinking</option>
                    <option>Active Listening</option>
                  </select>
                </div>
              </div>
              <Button className="mt-4">Save Goals</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3 space-y-6">
          {/* Next Session Preview */}
          <Card>
            <CardHeader>
              <CardTitle>After This Session</CardTitle>
              <CardDescription>Coming up next</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{secondSession.date}</span>
                  </div>
                  <h4 className="font-medium mt-2">{secondSession.title}</h4>
                  <Badge className="mt-2">{secondSession.role}</Badge>
                  <p className="text-xs text-muted-foreground mt-2">{secondSession.description}</p>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Materials */}
          <Card>
            <CardHeader>
              <CardTitle>Session Materials</CardTitle>
              <CardDescription>Resources to help you prepare</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessionMaterials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{material.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {material.type} • {material.size}
                        </p>
                      </div>
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
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions Calendar</CardTitle>
          <CardDescription>Your scheduled roles for the month</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between border-b last:border-0 pb-3">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-md">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-muted-foreground">{format(session.date, "MMMM d, yyyy")}</p>
                      </div>
                    </div>
                    <Badge>{session.role}</Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="calendar">
              <div className="border rounded-md p-4">
                <div className="text-center mb-4">
                  <h3 className="font-medium">April 2025</h3>
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="text-center font-medium py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1
                    const hasSession = upcomingSessions.find((s) => new Date(s.date).getDate() === day)
                    return (
                      <div
                        key={day}
                        className={`text-center py-2 rounded-md ${hasSession ? "bg-primary/10 relative" : ""}`}
                      >
                        {day}
                        {hasSession && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

