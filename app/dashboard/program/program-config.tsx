"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Save, Eye, Trash2 } from "lucide-react"

export function ProgramConfig() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Program Configuration</h1>
        <p className="text-muted-foreground">Configure your inskills curriculum structure and parameters</p>
      </div>

      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0">
        <div className="w-full lg:w-1/4">
          <Card>
            <CardContent className="p-4">
              <nav className="flex flex-col space-y-1">
                <Button
                  variant={activeTab === "general" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("general")}
                >
                  General Settings
                </Button>
                <Button
                  variant={activeTab === "modules" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("modules")}
                >
                  Module Configuration
                </Button>
                <Button
                  variant={activeTab === "sessions" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("sessions")}
                >
                  Session Templates
                </Button>
                <Button
                  variant={activeTab === "scoring" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("scoring")}
                >
                  Scoring Parameters
                </Button>
                <Button
                  variant={activeTab === "leaderboard" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("leaderboard")}
                >
                  Leaderboard Settings
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-4">
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure the academic year and semester structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="academic-year">Academic Year</Label>
                    <Select defaultValue="2023-2024">
                      <SelectTrigger id="academic-year">
                        <SelectValue placeholder="Select academic year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2022-2023">2022-2023</SelectItem>
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="active-semester">Active Semester</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="active-semester">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Semester 1</SelectItem>
                        <SelectItem value="2">Semester 2</SelectItem>
                        <SelectItem value="3">Semester 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program-name">Program Name</Label>
                  <Input id="program-name" defaultValue="Inspiria inskills Development Program" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program-description">Program Description</Label>
                  <Textarea
                    id="program-description"
                    rows={3}
                    defaultValue="A comprehensive soft-skills development program designed to enhance communication, teamwork, and leadership abilities."
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-feedback">Enable Student Feedback</Label>
                    <Switch id="enable-feedback" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow students to provide feedback on sessions and instructors
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "modules" && (
            <Card>
              <CardHeader>
                <CardTitle>Module Configuration</CardTitle>
                <CardDescription>Add and edit modules for your curriculum</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <h3 className="font-medium">Communication Skills</h3>
                        <p className="text-sm text-muted-foreground">
                          Public speaking, active listening, presentation skills
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <h3 className="font-medium">Team Skills</h3>
                        <p className="text-sm text-muted-foreground">
                          Collaboration, conflict resolution, team dynamics
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <h3 className="font-medium">Leadership Skills</h3>
                        <p className="text-sm text-muted-foreground">Decision making, delegation, motivation</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Module
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "scoring" && (
            <Card>
              <CardHeader>
                <CardTitle>Scoring Parameters</CardTitle>
                <CardDescription>Configure the weightage for different scoring criteria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label htmlFor="participation">Participation (30%)</Label>
                      <span className="text-sm">30</span>
                    </div>
                    <Slider defaultValue={[30]} max={100} step={5} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label htmlFor="communication">Communication Quality (25%)</Label>
                      <span className="text-sm">25</span>
                    </div>
                    <Slider defaultValue={[25]} max={100} step={5} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label htmlFor="teamwork">Teamwork (20%)</Label>
                      <span className="text-sm">20</span>
                    </div>
                    <Slider defaultValue={[20]} max={100} step={5} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label htmlFor="leadership">Leadership (15%)</Label>
                      <span className="text-sm">15</span>
                    </div>
                    <Slider defaultValue={[15]} max={100} step={5} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label htmlFor="innovation">Innovation (10%)</Label>
                      <span className="text-sm">10</span>
                    </div>
                    <Slider defaultValue={[10]} max={100} step={5} />
                  </div>
                </div>
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm">Total: 100% (All parameters must add up to 100%)</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Default</Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Parameters
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "sessions" && (
            <Card>
              <CardHeader>
                <CardTitle>Session Templates</CardTitle>
                <CardDescription>Create and manage session templates for different modules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="communication">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="communication">Communication</TabsTrigger>
                    <TabsTrigger value="team">Team Skills</TabsTrigger>
                    <TabsTrigger value="leadership">Leadership</TabsTrigger>
                  </TabsList>
                  <TabsContent value="communication" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-title">Session Title</Label>
                      <Input id="session-title" defaultValue="Effective Public Speaking" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-objectives">Learning Objectives</Label>
                      <Textarea
                        id="session-objectives"
                        rows={3}
                        defaultValue="1. Understand the principles of effective public speaking
2. Practice delivery techniques
3. Learn to engage with the audience"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-activities">Activities</Label>
                      <Textarea
                        id="session-activities"
                        rows={3}
                        defaultValue="1. Introduction (10 min)
2. Theory presentation (15 min)
3. Practice exercise (30 min)
4. Feedback and discussion (20 min)
5. Conclusion (5 min)"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="session-duration">Duration (minutes)</Label>
                        <Input id="session-duration" type="number" defaultValue="80" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session-roles">Required Roles</Label>
                        <Input id="session-roles" defaultValue="SL, SR, TL1-4" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="team" className="pt-4">
                    <div className="rounded-md bg-muted p-4 text-center">
                      <p>Select a team skills template or create a new one</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="leadership" className="pt-4">
                    <div className="rounded-md bg-muted p-4 text-center">
                      <p>Select a leadership skills template or create a new one</p>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="flex justify-between pt-4">
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Template
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "leaderboard" && (
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard Configuration</CardTitle>
                <CardDescription>Configure how the leaderboard displays and ranks students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-leaderboard">Enable Leaderboard</Label>
                    <Switch id="enable-leaderboard" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Show leaderboard rankings to students and instructors</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leaderboard-scope">Leaderboard Scope</Label>
                  <Select defaultValue="batch">
                    <SelectTrigger id="leaderboard-scope">
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="batch">Batch-level</SelectItem>
                      <SelectItem value="program">Program-level</SelectItem>
                      <SelectItem value="institution">Institution-level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ranking-criteria">Primary Ranking Criteria</Label>
                  <Select defaultValue="total">
                    <SelectTrigger id="ranking-criteria">
                      <SelectValue placeholder="Select criteria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="total">Total Score</SelectItem>
                      <SelectItem value="participation">Participation Score</SelectItem>
                      <SelectItem value="improvement">Improvement Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-top-performers">Show Top Performers Only</Label>
                    <Switch id="show-top-performers" />
                  </div>
                  <p className="text-sm text-muted-foreground">Only display the top 10 students on the leaderboard</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="anonymous-ranking">Anonymous Ranking</Label>
                    <Switch id="anonymous-ranking" />
                  </div>
                  <p className="text-sm text-muted-foreground">Hide student names and show only ID numbers</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Configuration
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

