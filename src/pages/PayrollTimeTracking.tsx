
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Time Tracking</h1>
            <p className="text-sm text-gray-600 mt-1">Track employee time and attendance</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            Add Time Entry
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-6">
        {/* Weekly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold text-gray-900">{weeklyStats.totalHours}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overtime Hours</p>
                  <p className="text-2xl font-bold text-orange-600">{weeklyStats.overtimeHours}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg per Employee</p>
                  <p className="text-2xl font-bold text-gray-900">{weeklyStats.avgHoursPerEmployee}</p>
                </div>
                <User className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{weeklyStats.projectsActive}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Timer */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Timer</CardTitle>
            <CardDescription>Start tracking time for current tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select Employee</option>
                <option>Sarah Johnson</option>
                <option>Michael Chen</option>
                <option>Emily Rodriguez</option>
                <option>David Park</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select Project</option>
                <option>Website Redesign</option>
                <option>Mobile App Development</option>
                <option>Marketing Campaign</option>
                <option>API Development</option>
              </select>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Play className="h-4 w-4" />
                  Start
                </button>
                <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  <Pause className="h-4 w-4" />
                  Pause
                </button>
                <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  <Square className="h-4 w-4" />
                  Stop
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search time entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* Time Entries */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Today's Time Entries</CardTitle>
            <CardDescription>{filteredEntries.length} entries found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Employee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Project</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Start Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">End Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Hours</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{entry.employee}</td>
                      <td className="py-3 px-4 text-gray-700">{entry.project}</td>
                      <td className="py-3 px-4 text-gray-600">{entry.date}</td>
                      <td className="py-3 px-4 text-gray-600">{entry.startTime}</td>
                      <td className="py-3 px-4 text-gray-600">{entry.endTime}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{entry.hours}h</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayrollTimeTracking;
