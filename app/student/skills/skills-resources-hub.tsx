"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStudent } from "@/contexts/student-context"
import {
  Book,
  FileText,
  Film,
  HelpCircle,
  ListChecks,
  Search,
  BarChart4,
  Award,
  Zap,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export function SkillsResourcesHub() {
  const { student, loading } = useStudent()

  if (loading || !student) {
    return <div className="flex items-center justify-center min-h-[70vh]">Loading...</div>
  }

  const categories = [
    { id: "communication", name: "Communication", progress: 78, total: 12, completed: 8 },
    { id: "teamwork", name: "Teamwork", progress: 65, total: 10, completed: 6 },
    { id: "leadership", name: "Leadership", progress: 43, total: 8, completed: 3 },
    { id: "problem-solving", name: "Problem Solving", progress: 82, total: 15, completed: 12 },
    { id: "critical-thinking", name: "Critical Thinking", progress: 71, total: 9, completed: 6 },
    { id: "time-management", name: "Time Management", progress: 55, total: 11, completed: 6 },
  ]

  const recommendedResources = [
    {
      id: "r-001",
      title: "Leadership Fundamentals",
      type: "document",
      category: "Leadership",
      description: "Essential leadership principles for emerging leaders",
      time: "15 min read",
      level: "Beginner",
      completion: 0,
    },
    {
      id: "r-002",
      title: "Active Listening Techniques",
      type: "video",
      category: "Communication",
      description: "Master the art of active listening for better team communication",
      time: "12 min video",
      level: "Intermediate",
      completion: 75,
    },
    {
      id: "r-003",
      title: "Time Management Self-Assessment",
      type: "quiz",
      category: "Time Management",
      description: "Evaluate your current time management practices",
      time: "10 min quiz",
      level: "All levels",
      completion: 100,
    },
  ]

  const activities = [
    {
      id: "a-001",
      title: "Team Conflict Resolution Challenge",
      category: "Teamwork",
      description: "Practice resolving common team conflicts through guided scenarios",
      time: "30 min activity",
      level: "Intermediate",
      completion: 0,
    },
    {
      id: "a-002",
      title: "Public Speaking Practice",
      category: "Communication",
      description: "Record and analyze a short presentation to improve speaking skills",
      time: "20 min activity",
      level: "All levels",
      completion: 50,
    },
    {
      id: "a-003",
      title: "Decision Matrix Exercise",
      category: "Problem Solving",
      description: "Learn to evaluate options systematically for better decision making",
      time: "15 min activity",
      level: "Advanced",
      completion: 100,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg" />
        <div className="relative p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-2">Skills & Resources Hub</h1>
          <p className="text-muted-foreground mb-6">Discover resources to enhance your professional development</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search resources..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 rounded-md border text-sm">
                <option>All Categories</option>
                {categories.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
              </select>
              <select className="px-3 py-2 rounded-md border text-sm">
                <option>All Types</option>
                <option>Documents</option>
                <option>Videos</option>
                <option>Quizzes</option>
                <option>Activities</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Based on your progress and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedResources.map((resource) => (
                  <div key={resource.id} className="border rounded-md p-4 relative overflow-hidden">
                    {resource.completion > 0 && (
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-primary"
                        style={{ width: `${resource.completion}%` }}
                      />
                    )}
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-1">
                        {resource.type === "document" && <FileText className="h-5 w-5 text-primary" />}
                        {resource.type === "video" && <Film className="h-5 w-5 text-primary" />}
                        {resource.type === "quiz" && <ListChecks className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-medium">{resource.title}</h3>
                          <Badge variant="outline">{resource.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                        <div className="flex flex-wrap gap-3 mt-3">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {resource.time}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <BarChart4 className="h-3 w-3 mr-1" />
                            {resource.level}
                          </div>
                          <div className="flex items-center text-xs">
                            {resource.completion === 100 ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" /> Completed
                              </>
                            ) : resource.completion > 0 ? (
                              <>
                                <Clock className="h-3 w-3 mr-1 text-amber-600" /> In progress
                              </>
                            ) : (
                              <>
                                <Zap className="h-3 w-3 mr-1 text-blue-600" /> New
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View More Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Practice Activities</CardTitle>
              <CardDescription>Enhance your skills with these exercises</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="border rounded-md p-4 relative overflow-hidden">
                    {activity.completion > 0 && (
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-primary"
                        style={{ width: `${activity.completion}%` }}
                      />
                    )}
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-1">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-medium">{activity.title}</h3>
                          <Badge variant="outline">{activity.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        <div className="flex flex-wrap gap-3 mt-3">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.time}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <BarChart4 className="h-3 w-3 mr-1" />
                            {activity.level}
                          </div>
                          <div className="flex items-center text-xs">
                            {activity.completion === 100 ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" /> Completed
                              </>
                            ) : activity.completion > 0 ? (
                              <>
                                <Clock className="h-3 w-3 mr-1 text-amber-600" /> In progress
                              </>
                            ) : (
                              <>
                                <Zap className="h-3 w-3 mr-1 text-blue-600" /> Start activity
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Activities
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request Additional Resources</CardTitle>
              <CardDescription>Can't find what you need? Let us know</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Resource Type</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-md border text-sm">
                    <option>Document</option>
                    <option>Video</option>
                    <option>Tutorial</option>
                    <option>Exercise</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Related Skill</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-md border text-sm">
                    {categories.map((category) => (
                      <option key={category.id}>{category.name}</option>
                    ))}
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description of what you need</label>
                  <Textarea
                    placeholder="Please describe what type of resource would be helpful for you..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button>Submit Request</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Development Pathway</CardTitle>
              <CardDescription>Track your skills progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">{category.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {category.completed}/{category.total} complete
                      </span>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Recommended focus areas:</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Leadership</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Time Management</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resource Library</CardTitle>
              <CardDescription>Browse by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((category) => (
                  <Button key={category.id} variant="outline" className="w-full justify-start text-left h-auto py-3">
                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-2 text-primary" />
                      <div>
                        <div>{category.name}</div>
                        <div className="text-xs text-muted-foreground">{category.total} resources available</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Contact your instructor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 mb-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm">Have questions about your development?</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Schedule a Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

