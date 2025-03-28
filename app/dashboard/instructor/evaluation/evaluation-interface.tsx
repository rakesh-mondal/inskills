"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { CheckCircle2, ChevronLeft, ChevronRight, Mic, Save, Send, Star, History, Lightbulb } from "lucide-react"

// Sample session data
const sessionData = {
  id: 1,
  title: "Communication Skills: Public Speaking",
  batch: "CS2023A",
  date: "March 28, 2025",
  time: "10:00 AM - 11:30 AM",
  location: "Room 101",
}

// Update student data with Indian names
const students = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "SL",
    present: true,
    previousRatings: [
      { date: "Mar 15, 2025", role: "TL2", overall: 4.2 },
      { date: "Mar 1, 2025", role: "SR", overall: 3.8 },
    ],
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "SR",
    present: true,
    previousRatings: [
      { date: "Mar 15, 2025", role: "TL1", overall: 3.5 },
      { date: "Mar 1, 2025", role: "AF", overall: 4.0 },
    ],
  },
  {
    id: 3,
    name: "Rahul Singh",
    role: "TL1",
    present: false,
    previousRatings: [],
  },
  {
    id: 4,
    name: "Ananya Gupta",
    role: "TL2",
    present: true,
    previousRatings: [
      { date: "Mar 15, 2025", role: "SL", overall: 4.5 },
      { date: "Mar 1, 2025", role: "TL3", overall: 4.2 },
    ],
  },
  {
    id: 5,
    name: "Vikram Reddy",
    role: "TL3",
    present: true,
    previousRatings: [
      { date: "Mar 15, 2025", role: "TL4", overall: 3.7 },
      { date: "Mar 1, 2025", role: "SR", overall: 3.5 },
    ],
  },
]

// Evaluation criteria for different roles
const evaluationCriteria = {
  SL: [
    {
      id: "preparation",
      label: "Preparation & Organization",
      description: "How well the session was planned and structured",
    },
    {
      id: "delivery",
      label: "Delivery & Presentation",
      description: "Clarity, confidence, and effectiveness of communication",
    },
    { id: "engagement", label: "Audience Engagement", description: "Ability to involve and interest the audience" },
    { id: "timeManagement", label: "Time Management", description: "Effective use of allocated time" },
    { id: "leadership", label: "Leadership Skills", description: "Guidance and direction provided during the session" },
  ],
  SR: [
    {
      id: "accuracy",
      label: "Accuracy & Completeness",
      description: "Thoroughness and correctness of session documentation",
    },
    { id: "organization", label: "Organization & Clarity", description: "Structured and understandable documentation" },
    { id: "attentiveness", label: "Attentiveness", description: "Focus and attention to session details" },
    { id: "participation", label: "Active Participation", description: "Involvement beyond note-taking" },
  ],
  TL: [
    { id: "teamManagement", label: "Team Management", description: "Coordination and direction of team activities" },
    { id: "communication", label: "Communication", description: "Clear and effective communication with team members" },
    { id: "problemSolving", label: "Problem Solving", description: "Ability to address challenges within the team" },
    {
      id: "participation",
      label: "Participation & Contribution",
      description: "Active involvement in team activities",
    },
  ],
  AF: [
    {
      id: "activityDesign",
      label: "Activity Design",
      description: "Appropriateness and effectiveness of the activity",
    },
    { id: "facilitation", label: "Facilitation Skills", description: "Guidance and support during the activity" },
    { id: "adaptability", label: "Adaptability", description: "Flexibility in response to participant needs" },
    { id: "engagement", label: "Participant Engagement", description: "Ability to involve all participants" },
  ],
  general: [
    { id: "participation", label: "Participation", description: "Active involvement in the session" },
    { id: "teamwork", label: "Teamwork", description: "Collaboration with other participants" },
    { id: "communication", label: "Communication", description: "Clarity and effectiveness of expression" },
    { id: "attentiveness", label: "Attentiveness", description: "Focus and attention during the session" },
  ],
}

// Feedback templates
const feedbackTemplates = {
  positive: [
    "Demonstrated excellent leadership skills by effectively guiding the team through challenges.",
    "Communicated ideas clearly and concisely, enhancing overall understanding.",
    "Showed remarkable improvement in presentation skills compared to previous sessions.",
    "Actively participated in discussions and contributed valuable insights.",
    "Managed time efficiently, ensuring all agenda items were covered adequately.",
  ],
  constructive: [
    "Could improve preparation by reviewing materials more thoroughly before the session.",
    "Consider practicing public speaking to enhance confidence and delivery.",
    "Work on time management to ensure all topics receive adequate attention.",
    "Try to engage more actively with team members during group activities.",
    "Focus on developing more structured approaches to problem-solving scenarios.",
  ],
}

// Team dynamics assessment criteria
const teamDynamicsCriteria = [
  { id: "collaboration", label: "Collaboration", description: "How well team members worked together" },
  { id: "communication", label: "Communication", description: "Effectiveness of information exchange within the team" },
  { id: "roleClarity", label: "Role Clarity", description: "Understanding and fulfillment of assigned roles" },
  { id: "conflictResolution", label: "Conflict Resolution", description: "Handling of disagreements or challenges" },
  { id: "overallDynamics", label: "Overall Team Dynamics", description: "General assessment of team functioning" },
]

export function EvaluationInterface() {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0)
  const [evaluations, setEvaluations] = useState<Record<number, Record<string, number>>>({})
  const [feedback, setFeedback] = useState<Record<number, string>>({})
  const [teamDynamics, setTeamDynamics] = useState<Record<string, number>>({})
  const [showHistory, setShowHistory] = useState(false)
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  const currentStudent = students[currentStudentIndex]

  // Get criteria based on student role
  const getCriteriaForStudent = (student: (typeof students)[0]) => {
    if (!student.present) return []
    if (student.role === "SL") return evaluationCriteria.SL
    if (student.role === "SR") return evaluationCriteria.SR
    if (student.role.startsWith("TL")) return evaluationCriteria.TL
    if (student.role === "AF") return evaluationCriteria.AF
    return evaluationCriteria.general
  }

  // Update rating for a student and criterion
  const updateRating = (studentId: number, criterionId: string, value: number) => {
    setEvaluations((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [criterionId]: value,
      },
    }))
  }

  // Update feedback for a student
  const updateFeedback = (studentId: number, text: string) => {
    setFeedback((prev) => ({
      ...prev,
      [studentId]: text,
    }))
  }

  // Update team dynamics rating
  const updateTeamDynamics = (criterionId: string, value: number) => {
    setTeamDynamics((prev) => ({
      ...prev,
      [criterionId]: value,
    }))
  }

  // Navigate to next student
  const nextStudent = () => {
    if (currentStudentIndex < students.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1)
      setShowHistory(false)
    }
  }

  // Navigate to previous student
  const prevStudent = () => {
    if (currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1)
      setShowHistory(false)
    }
  }

  // Toggle voice input
  const toggleVoiceInput = () => {
    setIsVoiceActive(!isVoiceActive)
  }

  // Add template text to feedback
  const addTemplateText = (template: string) => {
    const currentFeedback = feedback[currentStudent.id] || ""
    updateFeedback(currentStudent.id, currentFeedback ? `${currentFeedback}\n\n${template}` : template)
  }

  // Calculate completion percentage
  const calculateCompletion = () => {
    let totalCriteria = 0
    let completedCriteria = 0

    students.forEach((student) => {
      if (student.present) {
        const criteria = getCriteriaForStudent(student)
        totalCriteria += criteria.length + 1 // +1 for feedback

        const studentEvals = evaluations[student.id] || {}
        completedCriteria += Object.keys(studentEvals).length

        if (feedback[student.id]) completedCriteria += 1
      }
    })

    // Add team dynamics criteria
    totalCriteria += teamDynamicsCriteria.length
    completedCriteria += Object.keys(teamDynamics).length

    return totalCriteria > 0 ? (completedCriteria / totalCriteria) * 100 : 0
  }

  // Calculate average rating for a student
  const calculateAverageRating = (studentId: number) => {
    const studentEvals = evaluations[studentId] || {}
    const ratings = Object.values(studentEvals)
    return ratings.length > 0 ? ratings.reduce((sum, val) => sum + val, 0) / ratings.length : 0
  }

  return (
    <div className="space-y-6">
      {/* Evaluation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-950 p-4 rounded-lg border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Session Evaluation</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{sessionData.title}</span>
            <Badge variant="outline">{sessionData.batch}</Badge>
            <span>
              {sessionData.date} • {sessionData.time}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={calculateCompletion()} className="w-24 h-2" />
          <span className="text-sm">{Math.round(calculateCompletion())}% Complete</span>
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button size="sm">
            <Send className="mr-2 h-4 w-4" />
            Submit Evaluation
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Student List and Navigation */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Students</CardTitle>
              <CardDescription>
                {students.filter((s) => s.present).length}/{students.length} students present
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {students.map((student, index) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                      index === currentStudentIndex
                        ? "bg-primary-50 border border-primary"
                        : !student.present
                          ? "opacity-50"
                          : "hover:bg-muted"
                    }`}
                    onClick={() => setCurrentStudentIndex(index)}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="flex items-center gap-1">
                          {student.role && <Badge variant="outline">{student.role}</Badge>}
                          {!student.present && <Badge variant="destructive">Absent</Badge>}
                        </div>
                      </div>
                    </div>
                    {student.present && evaluations[student.id] && (
                      <div className="flex items-center">
                        <div className="text-sm font-medium">{calculateAverageRating(student.id).toFixed(1)}</div>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline" size="sm" onClick={prevStudent} disabled={currentStudentIndex === 0}>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextStudent}
                  disabled={currentStudentIndex === students.length - 1}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Team Dynamics Assessment</CardTitle>
              <CardDescription>Evaluate overall team functioning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamDynamicsCriteria.map((criterion) => (
                  <div key={criterion.id} className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={criterion.id} className="text-sm font-medium">
                        {criterion.label}
                      </Label>
                      <span className="text-sm">{teamDynamics[criterion.id] || 0}/5</span>
                    </div>
                    <Slider
                      id={criterion.id}
                      min={0}
                      max={5}
                      step={0.5}
                      value={[teamDynamics[criterion.id] || 0]}
                      onValueChange={(value) => updateTeamDynamics(criterion.id, value[0])}
                    />
                    <p className="text-xs text-muted-foreground">{criterion.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle and Right Columns - Evaluation Form */}
        <div className="md:col-span-2 space-y-6">
          {currentStudent && (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{currentStudent.name}</CardTitle>
                      <CardDescription>
                        {currentStudent.role ? `Role: ${currentStudent.role}` : "General Participant"}
                        {!currentStudent.present && " (Absent)"}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHistory(!showHistory)}
                      disabled={!currentStudent.present || currentStudent.previousRatings.length === 0}
                    >
                      <History className="mr-2 h-4 w-4" />
                      {showHistory ? "Hide History" : "Show History"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {!currentStudent.present ? (
                    <div className="p-4 text-center">
                      <p className="text-muted-foreground">This student was absent from the session.</p>
                    </div>
                  ) : showHistory && currentStudent.previousRatings.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="font-medium">Previous Performance</h3>
                      {currentStudent.previousRatings.map((rating, index) => (
                        <div key={index} className="p-3 rounded-md border">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">{rating.date}</div>
                            <Badge variant="outline">{rating.role}</Badge>
                          </div>
                          <div className="flex items-center">
                            <div className="text-sm mr-2">Overall Rating:</div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= Math.round(rating.overall)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="ml-2 text-sm font-medium">{rating.overall.toFixed(1)}</div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full" onClick={() => setShowHistory(false)}>
                        Return to Evaluation
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Role-Specific Criteria</h3>
                        {getCriteriaForStudent(currentStudent).map((criterion) => (
                          <div key={criterion.id} className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor={criterion.id} className="text-sm font-medium">
                                {criterion.label}
                              </Label>
                              <span className="text-sm">
                                {(evaluations[currentStudent.id]?.[criterion.id] || 0).toFixed(1)}/5
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">1</span>
                              <Slider
                                id={criterion.id}
                                min={0}
                                max={5}
                                step={0.5}
                                value={[evaluations[currentStudent.id]?.[criterion.id] || 0]}
                                onValueChange={(value) => updateRating(currentStudent.id, criterion.id, value[0])}
                                className="flex-1"
                              />
                              <span className="text-sm">5</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{criterion.description}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="feedback" className="text-sm font-medium">
                            Qualitative Feedback
                          </Label>
                          <Button variant={isVoiceActive ? "default" : "outline"} size="sm" onClick={toggleVoiceInput}>
                            <Mic className="mr-2 h-4 w-4" />
                            {isVoiceActive ? "Stop Voice" : "Voice Input"}
                          </Button>
                        </div>
                        <Textarea
                          id="feedback"
                          placeholder="Enter your feedback for this student..."
                          value={feedback[currentStudent.id] || ""}
                          onChange={(e) => updateFeedback(currentStudent.id, e.target.value)}
                          className="min-h-[150px]"
                        />
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Feedback Templates</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <div className="text-sm font-medium flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                Positive Feedback
                              </div>
                              <div className="space-y-1">
                                {feedbackTemplates.positive.map((template, index) => (
                                  <div
                                    key={index}
                                    className="text-xs p-2 rounded-md border cursor-pointer hover:bg-muted"
                                    onClick={() => addTemplateText(template)}
                                  >
                                    {template}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm font-medium flex items-center">
                                <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
                                Constructive Feedback
                              </div>
                              <div className="space-y-1">
                                {feedbackTemplates.constructive.map((template, index) => (
                                  <div
                                    key={index}
                                    className="text-xs p-2 rounded-md border cursor-pointer hover:bg-muted"
                                    onClick={() => addTemplateText(template)}
                                  >
                                    {template}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm" onClick={prevStudent} disabled={currentStudentIndex === 0}>
                      <ChevronLeft className="h-4 w-4" />
                      Previous Student
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextStudent}
                      disabled={currentStudentIndex === students.length - 1}
                    >
                      Next Student
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

