"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStudent } from "@/contexts/student-context"
import { Award, Calendar, Lightbulb, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

export function StudentDashboard() {
  const { student, loading } = useStudent()

  if (loading || !student) {
    return <div className="flex items-center justify-center min-h-[70vh]">Loading...</div>
  }

  // Calculate days until next session
  const nextSession = student.upcomingSessions[0]
  const daysUntil = nextSession
    ? Math.ceil((new Date(nextSession.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  // Format skills data for radar chart
  const skillChartData = student.skills.map((skill) => ({
    subject: skill.name,
    A: skill.progress,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      {/* Welcome and Upcoming Session */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {student.name}</CardTitle>
            <CardDescription>Your inskills Dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Next Session in {daysUntil} days</p>
                  <div className="text-sm text-muted-foreground">
                    {nextSession.title} on {nextSession.date}
                  </div>
                  <Badge className="mt-2">{nextSession.role}</Badge>
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium">Session Preparation: 2 of 5 steps completed</div>
                <Progress value={40} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Your Current Standing</CardTitle>
            <CardDescription>
              Ranking {student.rank} out of {student.totalStudents} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{student.points}</p>
                  <p className="text-xs text-muted-foreground">Total points earned</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Top 15%</p>
                <p className="text-xs text-muted-foreground">of your cohort</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    1
                  </div>
                  <div className="font-medium">Taylor Brown</div>
                </div>
                <div>980 pts</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/80 text-white">
                    2
                  </div>
                  <div className="font-medium">Jordan Lee</div>
                </div>
                <div>925 pts</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/60 text-white">
                    3
                  </div>
                  <div className="font-medium">Jamie Smith</div>
                </div>
                <div>890 pts</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/40 text-white">
                    {student.rank}
                  </div>
                  <div className="font-medium">You</div>
                </div>
                <div>{student.points} pts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Skill Development */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Development</CardTitle>
            <CardDescription>Your progress across key competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Skills" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest insights from your sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {student.feedback.map((item) => (
                <div key={item.id} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{item.sessionName}</h4>
                    <Badge variant="outline">{item.role}</Badge>
                  </div>
                  <p className="text-sm mt-1">{item.comment}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.areas.map((area) => (
                      <Badge key={area.name} variant={area.score >= 4 ? "default" : "secondary"} className="text-xs">
                        {area.name}: {area.score}/5
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">From: {item.from}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Achievement Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Your earned badges and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {student.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`border rounded-lg p-3 text-center ${
                    achievement.earned ? "bg-primary/5" : "bg-muted/30 opacity-60"
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <div className={`rounded-full p-2 ${achievement.earned ? "bg-primary/20" : "bg-muted"}`}>
                      <Award className={`h-6 w-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                  </div>
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                  {achievement.earned && achievement.date && (
                    <p className="text-xs mt-2">Earned on {achievement.date}</p>
                  )}
                  {!achievement.earned && <p className="text-xs mt-2 text-primary">In progress</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvement Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle>Personalized Suggestions</CardTitle>
            <CardDescription>Based on your performance patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="rounded-full bg-amber-100 p-2 h-fit">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Improve your leadership skills</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Taking more initiative in team discussions would help strengthen your leadership competency.
                  </p>
                  <p className="text-xs text-primary mt-2">View leadership resources →</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="rounded-full bg-green-100 p-2 h-fit">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Develop time management</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Setting clearer agenda items and timeboxing activities could improve session outcomes.
                  </p>
                  <p className="text-xs text-primary mt-2">Try time management exercise →</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="rounded-full bg-blue-100 p-2 h-fit">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Build on your strengths</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your problem solving skills are excellent. Consider mentoring others in this area.
                  </p>
                  <p className="text-xs text-primary mt-2">Explore mentoring opportunities →</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

