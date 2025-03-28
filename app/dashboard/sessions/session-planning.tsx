"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Save, Send, AlertTriangle, HelpCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

const students = [
  { id: 1, name: "Arjun Sharma", recentRoles: ["SL", "TL2"], lastAssigned: "2 weeks ago" },
  { id: 2, name: "Priya Patel", recentRoles: ["SR", "TL4"], lastAssigned: "1 week ago" },
  { id: 3, name: "Rahul Singh", recentRoles: ["TL1", "AF"], lastAssigned: "3 weeks ago" },
  { id: 4, name: "Ananya Gupta", recentRoles: ["TL3", "SR"], lastAssigned: "2 days ago" },
  { id: 5, name: "Vikram Reddy", recentRoles: ["TL5", "SL"], lastAssigned: "1 month ago" },
  { id: 6, name: "Neha Joshi", recentRoles: ["TL6", "SR"], lastAssigned: "3 weeks ago" },
  { id: 7, name: "Aditya Kumar", recentRoles: ["AF", "TL2"], lastAssigned: "2 weeks ago" },
  { id: 8, name: "Kavita Mishra", recentRoles: ["TL4", "SL"], lastAssigned: "1 week ago" },
  { id: 9, name: "Sanjay Desai", recentRoles: ["SR", "TL1"], lastAssigned: "4 weeks ago" },
  { id: 10, name: "Meera Iyer", recentRoles: ["TL3", "AF"], lastAssigned: "3 days ago" },
]

const roles = [
  { id: "SL", name: "Session Leader", description: "Leads the entire session" },
  { id: "SR", name: "Session Recorder", description: "Takes notes and records session activities" },
  { id: "TL1", name: "Team Leader 1", description: "Leads Team 1 activities" },
  { id: "TL2", name: "Team Leader 2", description: "Leads Team 2 activities" },
  { id: "TL3", name: "Team Leader 3", description: "Leads Team 3 activities" },
  { id: "TL4", name: "Team Leader 4", description: "Leads Team 4 activities" },
  { id: "TL5", name: "Team Leader 5", description: "Leads Team 5 activities" },
  { id: "TL6", name: "Team Leader 6", description: "Leads Team 6 activities" },
  { id: "AF", name: "Activity Facilitator", description: "Facilitates specific activities during the session" },
]

export function SessionPlanning() {
  const [selectedRoles, setSelectedRoles] = useState<Record<number, string>>({})

  const handleRoleSelect = (studentId: number, roleId: string) => {
    setSelectedRoles({
      ...selectedRoles,
      [studentId]: roleId,
    })
  }

  const getAssignmentStatus = (student: (typeof students)[0]) => {
    if (student.lastAssigned === "1 month ago") {
      return "warning"
    }
    if (student.lastAssigned === "4 weeks ago") {
      return "warning"
    }
    return "normal"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Session Planning</h1>
        <p className="text-muted-foreground">Schedule sessions and assign student roles</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Session</CardTitle>
            <CardDescription>Configure session details and schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-type">Session Type</Label>
              <Select>
                <SelectTrigger id="session-type">
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="communication">Communication Skills</SelectItem>
                  <SelectItem value="team">Team Skills</SelectItem>
                  <SelectItem value="leadership">Leadership Skills</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-title">Session Title</Label>
              <Input id="session-title" placeholder="e.g., Effective Public Speaking" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="batch">Batch</Label>
                <Select>
                  <SelectTrigger id="batch">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs2023a">CS2023A</SelectItem>
                    <SelectItem value="cs2023b">CS2023B</SelectItem>
                    <SelectItem value="ec2023a">EC2023A</SelectItem>
                    <SelectItem value="me2023a">ME2023A</SelectItem>
                    <SelectItem value="bba2023">BBA2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Select>
                  <SelectTrigger id="instructor">
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="flex">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="date" type="date" className="pl-8" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <div className="flex">
                  <div className="relative flex-1">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="time" type="time" className="pl-8" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="venue" placeholder="e.g., Room 101, Main Building" className="pl-8" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Session Description</Label>
              <Textarea id="description" placeholder="Enter a brief description of this session" rows={3} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save as Draft</Button>
            <Button>Create Session</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Requirements</CardTitle>
            <CardDescription>Roles needed for this session type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h3 className="mb-2 font-medium">Communication Skills: Public Speaking</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This session requires the following roles to be assigned:
              </p>
              <div className="space-y-2">
                {roles.slice(0, 5).map((role) => (
                  <div key={role.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{role.id}</Badge>
                      <span className="text-sm font-medium">{role.name}</span>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{role.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-suggest">Auto-Suggest Roles</Label>
                <Button variant="outline" size="sm">
                  Generate Suggestions
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Automatically suggest optimal role assignments based on past participation
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Assignment</CardTitle>
          <CardDescription>Assign roles to students for this session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="overflow-x-auto -mx-4 px-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Recent Roles</TableHead>
                    <TableHead>Last Assigned</TableHead>
                    {roles.slice(0, 5).map((role) => (
                      <TableHead key={role.id} className="text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>{role.id}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{role.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          {getAssignmentStatus(student) === "warning" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Not assigned recently</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          <span>{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {student.recentRoles.map((role, index) => (
                            <Badge key={index} variant="outline">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{student.lastAssigned}</TableCell>
                      {roles.slice(0, 5).map((role) => (
                        <TableCell key={role.id} className="text-center">
                          <input
                            type="radio"
                            name={`role-${role.id}`}
                            checked={selectedRoles[student.id] === role.id}
                            onChange={() => handleRoleSelect(student.id, role.id)}
                            className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Not assigned recently</span>
          </div>
          <div className="space-x-2">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Assignments
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Save & Notify Students
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

