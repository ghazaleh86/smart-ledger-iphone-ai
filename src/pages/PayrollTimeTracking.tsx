
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Plus, Search, Calendar, User, Play, Pause, Square } from 'lucide-react';

const PayrollTimeTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const timeEntries = [
    {
      id: 1,
      employee: "Sarah Johnson",
      project: "Website Redesign",
      date: "2024-06-07",
      startTime: "09:00 AM",
      endTime: "05:30 PM",
      hours: 8.5,
      status: "Completed"
    },
    {
      id: 2,
      employee: "Michael Chen",
      project: "Mobile App Development",
      date: "2024-06-07",
      startTime: "08:30 AM",
      endTime: "05:00 PM",
      hours: 8.5,
      status: "Completed"
    },
    {
      id: 3,
      employee: "Emily Rodriguez",
      project: "Marketing Campaign",
      date: "2024-06-07",
      startTime: "09:30 AM",
      endTime: "06:00 PM",
      hours: 8.5,
      status: "Completed"
    },
    {
      id: 4,
      employee: "David Park",
      project: "API Development",
      date: "2024-06-07",
      startTime: "10:00 AM",
      endTime: "In Progress",
      hours: 6.2,
      status: "Active"
    }
  ];

  const weeklyStats = {
    totalHours: 156.5,
    overtimeHours: 12.5,
    avgHoursPerEmployee: 39.1,
    projectsActive: 8
  };

  const filteredEntries = timeEntries.filter(entry =>
    entry.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold">Time Tracking</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Track employee time and attendance</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Time Entry</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Weekly Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Hours</p>
                  <p className="text-lg sm:text-2xl font-bold">{weeklyStats.totalHours}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Overtime Hours</p>
                  <p className="text-lg sm:text-2xl font-bold text-orange-600 dark:text-orange-400">{weeklyStats.overtimeHours}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Avg per Employee</p>
                  <p className="text-lg sm:text-2xl font-bold">{weeklyStats.avgHoursPerEmployee}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-lg">
                  <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-lg sm:text-2xl font-bold">{weeklyStats.projectsActive}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Timer */}
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Quick Timer</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Start tracking time for current tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <select className="flex-1 px-3 sm:px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background">
                <option>Select Employee</option>
                <option>Sarah Johnson</option>
                <option>Michael Chen</option>
                <option>Emily Rodriguez</option>
                <option>David Park</option>
              </select>
              <select className="flex-1 px-3 sm:px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background">
                <option>Select Project</option>
                <option>Website Redesign</option>
                <option>Mobile App Development</option>
                <option>Marketing Campaign</option>
                <option>API Development</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                <Play className="h-4 w-4" />
                Start
              </button>
              <button className="flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                <Pause className="h-4 w-4" />
                Pause
              </button>
              <button className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                <Square className="h-4 w-4" />
                Stop
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card>
          <CardContent className="p-3 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search time entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Time Entries */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Today's Time Entries</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{filteredEntries.length} entries found</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mobile Card View */}
            <div className="block md:hidden">
              <div className="divide-y divide-border">
                {filteredEntries.map((entry) => (
                  <div key={entry.id} className="p-3 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="text-sm font-medium">{entry.employee}</div>
                        <div className="text-xs text-muted-foreground">{entry.project}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        }`}>
                          {entry.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Start Time</div>
                        <div className="text-sm">{entry.startTime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">End Time</div>
                        <div className="text-sm">{entry.endTime}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Hours</div>
                        <div className="text-sm font-medium">{entry.hours}h</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Date</div>
                        <div className="text-sm">{entry.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Employee</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Project</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Start Time</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">End Time</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Hours</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.map((entry) => (
                      <tr key={entry.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{entry.employee}</td>
                        <td className="py-3 px-4">{entry.project}</td>
                        <td className="py-3 px-4 text-muted-foreground">{entry.date}</td>
                        <td className="py-3 px-4 text-muted-foreground">{entry.startTime}</td>
                        <td className="py-3 px-4 text-muted-foreground">{entry.endTime}</td>
                        <td className="py-3 px-4 font-medium">{entry.hours}h</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            entry.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                          }`}>
                            {entry.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayrollTimeTracking;
