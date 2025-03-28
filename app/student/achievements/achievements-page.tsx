"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStudent } from "@/contexts/student-context"
import { Award, Calendar, CheckCircle, Star, Trophy, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AchievementsPage() {
  const { student, loading } = useStudent()

  if (loading || !student) {
    return <div className="flex items-center justify-center min-h-[70vh]">Loading...</div>
  }

  // Additional mock achievements
  const allAchievements = [
    ...(student.achievements || []),
    {
      id: "a-005",
      title: "Communication Expert",
      description: "Received top scores in communication for 3 consecutive sessions",
      icon: "message-square",
      earned: false,
    },
    {
      id: "a-006",
      title: "Valuable Contributor",
      description: "Provided meaningful contributions recognized by peers",
      icon: "star",
      earned: true,
      date: "2023-12-10",
    },
    {
      id: "a-007",
      title: "Session Streak",
      description: "Participated in 10 consecutive sessions",
      icon: "calendar",
      earned: false,
    },
    {
      id: "a-008",
      title: "Problem Solver",
      description: "Demonstrated excellent problem-solving in challenging scenarios",
      icon: "lightbulb",
      earned: true,
      date: "2024-01-15",
    },
  ]

  // Mock milestones
  const milestones = [
    { id: "m-001", title: "Complete 5 Sessions", progress: 100, total: 5, current: 5 },
    { id: "m-002", title: "Try 3 Different Roles", progress: 67, total: 3, current: 2 },
    { id: "m-003", title: "Earn 1000 Points", progress: 85, total: 1000, current: 850 },
    { id: "m-004", title: "Provide Feedback to 10 Peers", progress: 40, total: 10, current: 4 },
    { id: "m-005", title: 'Achieve "Advanced" in 2 Skills', progress: 50, total: 2, current: 1 },
  ]

  const earnedCount = allAchievements.filter((a) => a.earned).length
  const totalCount = allAchievements.length
  const progressPercentage = Math.round((earnedCount / totalCount) * 100)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>
            You've earned {earnedCount} out of {totalCount} possible achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{progressPercentage}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allAchievements.map((achievement) => {
              let IconComponent

              if (achievement.icon === "award") IconComponent = Award
              else if (achievement.icon === "users") IconComponent = Users
              else if (achievement.icon === "message-square") IconComponent = CheckCircle
              else if (achievement.icon === "calendar-check") IconComponent = Calendar
              else if (achievement.icon === "star") IconComponent = Star
              else if (achievement.icon === "calendar") IconComponent = Calendar
              else if (achievement.icon === "lightbulb") IconComponent = Trophy
              else IconComponent = Award

              return (
                <div
                  key={achievement.id}
                  className={`border rounded-lg p-4 flex flex-col items-center text-center ${
                    achievement.earned ? "bg-primary/5 border-primary/30" : "bg-muted/30 border-dashed"
                  }`}
                >
                  <div className={`rounded-full p-3 mb-3 ${achievement.earned ? "bg-primary/20" : "bg-muted"}`}>
                    <IconComponent
                      className={`h-6 w-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <h3 className="font-medium">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                  {achievement.earned && achievement.date && (
                    <span className="text-xs mt-3 text-primary">Earned on {achievement.date}</span>
                  )}
                  {!achievement.earned && <span className="text-xs mt-3 text-muted-foreground">Locked</span>}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Milestones</CardTitle>
          <CardDescription>Track your progress towards key goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">{milestone.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {milestone.current}/{milestone.total}
                  </span>
                </div>
                <div className="relative">
                  <Progress value={milestone.progress} className="h-2" />
                  {milestone.progress === 100 && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-6">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Total Points</CardTitle>
            <CardDescription>Your accumulated score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{student.points}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Rank {student.rank} of {student.totalStudents}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Sessions Completed</CardTitle>
            <CardDescription>Your participation record</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">Next session in 2 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top Skill</CardTitle>
            <CardDescription>Your strongest competency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Problem Solving</div>
            <div className="flex items-center mt-1">
              <Progress value={82} className="h-2 flex-1 mr-2" />
              <span className="text-xs font-medium">82%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

