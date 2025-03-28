"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStudent } from "@/contexts/student-context"
import { CheckCircle, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PeerEvaluation() {
  const { student, loading } = useStudent()
  const [currentTeamMember, setCurrentTeamMember] = useState<string | null>(null)
  const [evaluationState, setEvaluationState] = useState<"pending" | "active" | "submitted">("active")
  const [formState, setFormState] = useState<{
    [key: string]: {
      communication: number
      teamwork: number
      problemSolving: number
      roleSpecific: number
      strengths: string
      improvements: string
    }
  }>({})

  const getInitials = (name: string) => {
    if (!name) return "" // Add null check for name
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const updateFormValue = (memberId: string, field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [memberId]: {
        ...(prev[memberId] || {
          communication: 3,
          teamwork: 3,
          problemSolving: 3,
          roleSpecific: 3,
          strengths: "",
          improvements: "",
        }),
        [field]: value,
      },
    }))
  }

  const getCharacterCount = (memberId: string, field: string) => {
    if (!formState[memberId]) return 0
    return formState[memberId][field]?.length || 0
  }

  if (loading || !student) {
    return <div className="flex items-center justify-center min-h-[70vh]">Loading...</div>
  }

  // Update the mock team members with Indian names
  const teamMembers = student.teamMembers
    ? [
        ...student.teamMembers.map((member, index) => ({
          ...member,
          role: ["Facilitator", "Timekeeper", "Note Taker", "Observer"][index % 4],
        })),
      ]
    : []

  // Choose first team member if none selected
  if (!currentTeamMember && teamMembers.length > 0) {
    setCurrentTeamMember(teamMembers[0].id)
  }

  const currentMember = teamMembers.find((m) => m.id === currentTeamMember)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Peer Evaluation</CardTitle>
              <CardDescription>Crisis Management Simulation - April 5, 2025</CardDescription>
            </div>
            {evaluationState === "active" && (
              <div className="flex items-center space-x-2 text-amber-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Due in 2 days</span>
              </div>
            )}
            {evaluationState === "submitted" && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Submitted</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="team-evaluation">
            <TabsList className="mb-4">
              <TabsTrigger value="team-evaluation">Team Evaluation</TabsTrigger>
              <TabsTrigger value="self-reflection">Self Reflection</TabsTrigger>
            </TabsList>

            <TabsContent value="team-evaluation">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Team Members</h3>
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => setCurrentTeamMember(member.id)}
                      className={`flex items-center p-3 rounded-md cursor-pointer ${
                        currentTeamMember === member.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                      }`}
                    >
                      <Avatar className="mr-3 h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name || ""} />
                        <AvatarFallback>{getInitials(member.name || "")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        <Badge variant="outline" className="mt-1">
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-2">
                  {currentMember && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={currentMember.avatar} alt={currentMember.name || ""} />
                          <AvatarFallback>{getInitials(currentMember.name || "")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{currentMember.name}</h3>
                          <p className="text-sm text-muted-foreground">Role: {currentMember.role}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-sm font-medium">
                            Communication Skills <span className="text-muted-foreground ml-1">(1-5)</span>
                          </label>
                          <Slider
                            value={[formState[currentMember.id]?.communication || 3]}
                            min={1}
                            max={5}
                            step={1}
                            onValueChange={(value) => updateFormValue(currentMember.id, "communication", value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Needs improvement</span>
                            <span>Excellent</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-medium">
                            Teamwork <span className="text-muted-foreground ml-1">(1-5)</span>
                          </label>
                          <Slider
                            value={[formState[currentMember.id]?.teamwork || 3]}
                            min={1}
                            max={5}
                            step={1}
                            onValueChange={(value) => updateFormValue(currentMember.id, "teamwork", value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Needs improvement</span>
                            <span>Excellent</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-medium">
                            Problem Solving <span className="text-muted-foreground ml-1">(1-5)</span>
                          </label>
                          <Slider
                            value={[formState[currentMember.id]?.problemSolving || 3]}
                            min={1}
                            max={5}
                            step={1}
                            onValueChange={(value) => updateFormValue(currentMember.id, "problemSolving", value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Needs improvement</span>
                            <span>Excellent</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-medium">
                            Role-Specific Performance <span className="text-muted-foreground ml-1">(1-5)</span>
                          </label>
                          <Slider
                            value={[formState[currentMember.id]?.roleSpecific || 3]}
                            min={1}
                            max={5}
                            step={1}
                            onValueChange={(value) => updateFormValue(currentMember.id, "roleSpecific", value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Needs improvement</span>
                            <span>Excellent</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">What were their key strengths?</label>
                          <Textarea
                            placeholder="What did they do well? Be specific with examples..."
                            value={formState[currentMember.id]?.strengths || ""}
                            onChange={(e) => updateFormValue(currentMember.id, "strengths", e.target.value)}
                            maxLength={250}
                          />
                          <div className="text-xs text-right text-muted-foreground">
                            {getCharacterCount(currentMember.id, "strengths")}/250
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">What could they improve?</label>
                          <Textarea
                            placeholder="Suggest specific, constructive improvements..."
                            value={formState[currentMember.id]?.improvements || ""}
                            onChange={(e) => updateFormValue(currentMember.id, "improvements", e.target.value)}
                            maxLength={250}
                          />
                          <div className="text-xs text-right text-muted-foreground">
                            {getCharacterCount(currentMember.id, "improvements")}/250
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="self-reflection">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} alt={student.name || ""} />
                    <AvatarFallback>{getInitials(student.name || "")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Self Reflection</h3>
                    <p className="text-sm text-muted-foreground">Your role: Team Leader</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">How would you rate your overall performance?</label>
                    <Select defaultValue="good">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="needsImprovement">Needs Improvement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">What were your key strengths in this session?</label>
                    <Textarea placeholder="What do you think you did well? Be specific..." maxLength={250} />
                    <div className="text-xs text-right text-muted-foreground">0/250</div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">What could you have done better?</label>
                    <Textarea
                      placeholder="Where do you see room for improvement? Be honest with yourself..."
                      maxLength={250}
                    />
                    <div className="text-xs text-right text-muted-foreground">0/250</div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">What did you learn from this session?</label>
                    <Textarea
                      placeholder="What insights or skills did you gain? How will you apply this learning?"
                      maxLength={250}
                    />
                    <div className="text-xs text-right text-muted-foreground">0/250</div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Set one specific goal for your next session:</label>
                    <Textarea placeholder="What will you focus on improving next time?" maxLength={150} />
                    <div className="text-xs text-right text-muted-foreground">0/150</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button variant="outline">Save Draft</Button>
            <Button>Submit Evaluation</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Feedback Received</CardTitle>
          <CardDescription>Review feedback from past sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {student.feedback &&
              student.feedback.map((feedback) => (
                <div key={feedback.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{feedback.sessionName}</h4>
                      <p className="text-sm text-muted-foreground">{feedback.date}</p>
                    </div>
                    <Badge>{feedback.role}</Badge>
                  </div>
                  <p className="mt-3 text-sm">{feedback.comment}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {feedback.areas &&
                      feedback.areas.map((area) => (
                        <Badge key={area.name} variant={area.score >= 4 ? "default" : "secondary"} className="text-xs">
                          {area.name}: {area.score}/5
                        </Badge>
                      ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">From: {feedback.from}</p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

