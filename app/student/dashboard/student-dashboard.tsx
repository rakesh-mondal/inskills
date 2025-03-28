"use client"

const StudentDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Leaderboard Section */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Leaderboard</h2>
          {/* Update the leaderboard names */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">1</div>
              <div className="font-medium">Rahul Singh</div>
            </div>
            <div>980 pts</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/80 text-white">
                2
              </div>
              <div className="font-medium">Ananya Gupta</div>
            </div>
            <div>925 pts</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/60 text-white">
                3
              </div>
              <div className="font-medium">Priya Patel</div>
            </div>
            <div>890 pts</div>
          </div>
        </div>

        {/* Other Sections (Example) */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Announcements</h2>
          <p className="text-sm">No new announcements.</p>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

