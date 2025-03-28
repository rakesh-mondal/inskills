"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Search, Upload, Settings, Download, Edit, Trash2, UserPlus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Update instructor names
const batches = [
  {
    id: 1,
    name: "CS2023A",
    department: "Computer Science",
    students: 42,
    instructor: "Dr. Rajesh Verma",
    startDate: "Aug 1, 2023",
    endDate: "Dec 15, 2023",
    status: "active",
  },
  {
    id: 2,
    name: "CS2023B",
    department: "Computer Science",
    students: 38,
    instructor: "Dr. Priya Mehta",
    startDate: "Aug 1, 2023",
    endDate: "Dec 15, 2023",
    status: "active",
  },
  {
    id: 3,
    name: "EC2023A",
    department: "Electronics",
    students: 35,
    instructor: "Prof. Sunil Kapoor",
    startDate: "Aug 1, 2023",
    endDate: "Dec 15, 2023",
    status: "active",
  },
  {
    id: 4,
    name: "ME2023A",
    department: "Mechanical Engineering",
    students: 40,
    instructor: "Dr. Anjali Sharma",
    startDate: "Aug 1, 2023",
    endDate: "Dec 15, 2023",
    status: "active",
  },
  {
    id: 5,
    name: "BBA2023",
    department: "Business Administration",
    students: 45,
    instructor: "Prof. Vikram Malhotra",
    startDate: "Aug 1, 2023",
    endDate: "Dec 15, 2023",
    status: "active",
  },
]

const archivedBatches = [
  {
    id: 6,
    name: "CS2022A",
    department: "Computer Science",
    students: 40,
    instructor: "Dr. Rajesh Verma",
    startDate: "Aug 1, 2022",
    endDate: "Dec 15, 2022",
    status: "completed",
  },
  {
    id: 7,
    name: "CS2022B",
    department: "Computer Science",
    students: 38,
    instructor: "Dr. Priya Mehta",
    startDate: "Aug 1, 2022",
    endDate: "Dec 15, 2022",
    status: "completed",
  },
]

export function BatchManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewBatchDialog, setShowNewBatchDialog] = useState(false)

  const filteredBatches = batches.filter(
    (batch) =>
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredArchivedBatches = archivedBatches.filter(
    (batch) =>
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Batch Management</h1>
          <p className="text-muted-foreground">Organize students into batches and manage their progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showNewBatchDialog} onOpenChange={setShowNewBatchDialog}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Batch
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Batch</DialogTitle>
                <DialogDescription>Enter the details for the new batch. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batch-name">Batch Name</Label>
                    <Input id="batch-name" placeholder="e.g., CS2023C" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department/Course</Label>
                    <Input id="department" placeholder="e.g., Computer Science" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor">Assign Instructor</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="description">Batch Description</Label>
                  <Textarea id="description" placeholder="Enter a brief description of this batch" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewBatchDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowNewBatchDialog(false)}>Create Batch</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search batches..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current">Current Batches</TabsTrigger>
            <TabsTrigger value="archived">Archived Batches</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBatches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell className="font-medium">{batch.name}</TableCell>
                        <TableCell>{batch.department}</TableCell>
                        <TableCell>{batch.students}</TableCell>
                        <TableCell>{batch.instructor}</TableCell>
                        <TableCell>
                          {batch.startDate} - {batch.endDate}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <UserPlus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Import</CardTitle>
                <CardDescription>Add students to batches by importing data or manual entry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">CSV Upload</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-md border border-dashed p-6 text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm font-medium">Drag and drop your CSV file here</p>
                        <p className="text-xs text-muted-foreground">or click to browse files</p>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download Template
                        </Button>
                        <Button size="sm">Upload</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Manual Entry</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="batch-select">Select Batch</Label>
                        <Select>
                          <SelectTrigger id="batch-select">
                            <SelectValue placeholder="Select batch" />
                          </SelectTrigger>
                          <SelectContent>
                            {batches.map((batch) => (
                              <SelectItem key={batch.id} value={batch.name}>
                                {batch.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Students
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Formation</CardTitle>
                <CardDescription>Create and manage teams within batches</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-batch">Select Batch</Label>
                  <Select>
                    <SelectTrigger id="team-batch">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches.map((batch) => (
                        <SelectItem key={batch.id} value={batch.name}>
                          {batch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-md bg-muted p-4 text-center">
                  <p className="text-sm">Select a batch to view and manage teams</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Auto-Generate Teams
                  </Button>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="archived">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArchivedBatches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell className="font-medium">{batch.name}</TableCell>
                        <TableCell>{batch.department}</TableCell>
                        <TableCell>{batch.students}</TableCell>
                        <TableCell>{batch.instructor}</TableCell>
                        <TableCell>
                          {batch.startDate} - {batch.endDate}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

