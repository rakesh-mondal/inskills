"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart, Download, Mail, Calendar, Filter, PlusCircle, Sparkles } from "lucide-react"
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const reportTemplates = [
  {
    id: 1,
    name: "Individual Progress",
    description: "Track progress of individual students over time",
    icon: <LineChart className="h-8 w-8 text-primary" />,
  },
  {
    id: 2,
    name: "Team Performance",
    description: "Compare performance across teams",
    icon: <BarChart className="h-8 w-8 text-primary" />,
  },
  {
    id: 3,
    name: "Batch Overview",
    description: "Comprehensive view of batch performance",
    icon: <PieChart className="h-8 w-8 text-primary" />,
  },
  {
    id: 4,
    name: "Program Effectiveness",
    description: "Measure overall program impact",
    icon: <BarChart className="h-8 w-8 text-primary" />,
  },
]

const skillDistributionData = [
  { name: "Communication", value: 35 },
  { name: "Teamwork", value: 25 },
  { name: "Leadership", value: 20 },
  { name: "Problem Solving", value: 15 },
  { name: "Innovation", value: 5 },
]

const COLORS = ["#1E5EBF", "#FF7A00", "#10B981", "#8B5CF6", "#EC4899"]

const batchComparisonData = [
  { name: "CS2023A", communication: 85, teamwork: 78, leadership: 72 },
  { name: "CS2023B", communication: 82, teamwork: 75, leadership: 68 },
  { name: "EC2023A", communication: 88, teamwork: 82, leadership: 75 },
  { name: "ME2023A", communication: 80, teamwork: 72, leadership: 65 },
  { name: "BBA2023", communication: 83, teamwork: 80, leadership: 78 },
]

const progressTrendData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 75 },
  { month: "May", score: 80 },
  { month: "Jun", score: 85 },
]

const insightsList = [
  {
    id: 1,
    title: "Communication Skills Improvement",
    description: "CS2023A batch shows 15% improvement in communication skills over the last 3 months.",
  },
  {
    id: 2,
    title: "Engagement Pattern",
    description: "Students with regular role assignments show 25% higher engagement scores.",
  },
  {
    id: 3,
    title: "Team Performance Correlation",
    description: "Teams with diverse role exposure perform better in collaborative tasks.",
  },
]

export function AnalyticsDashboard() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track program effectiveness and generate insights</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {reportTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
              selectedReport === template.id ? "border-primary bg-primary-50" : ""
            }`}
            onClick={() => setSelectedReport(template.id)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-2 text-center">
                {template.icon}
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Report Builder</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      <Tabs defaultValue="visualization">
        <TabsList>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="data">Data Tables</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>Breakdown of skills across the program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={skillDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Batch Comparison</CardTitle>
                <CardDescription>Performance comparison across batches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={batchComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="communication" fill="#1E5EBF" />
                      <Bar dataKey="teamwork" fill="#FF7A00" />
                      <Bar dataKey="leadership" fill="#10B981" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Progress Trend</CardTitle>
              <CardDescription>Average score progression over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={progressTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#1E5EBF" activeDot={{ r: 8 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            <div className="space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Chart
              </Button>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Chart Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="scatter">Scatter Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Schedule Report
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Tables</CardTitle>
              <CardDescription>Detailed data for analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Select a report template to view detailed data tables</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-secondary" />
                AI-Generated Insights
              </CardTitle>
              <CardDescription>Automatically detected patterns and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {insightsList.map((insight) => (
                <Card key={insight.id}>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate More Insights
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

