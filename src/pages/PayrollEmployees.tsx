
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Plus, Search, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const PayrollEmployees = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Software Engineer",
      department: "Engineering",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 123-4567",
      salary: "$85,000",
      startDate: "2022-03-15",
      status: "Active"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Manager",
      department: "Product",
      email: "michael.chen@company.com",
      phone: "+1 (555) 234-5678",
      salary: "$95,000",
      startDate: "2021-11-20",
      status: "Active"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Marketing Specialist",
      department: "Marketing",
      email: "emily.rodriguez@company.com",
      phone: "+1 (555) 345-6789",
      salary: "$65,000",
      startDate: "2023-01-10",
      status: "Active"
    },
    {
      id: 4,
      name: "David Park",
      position: "Senior Developer",
      department: "Engineering",
      email: "david.park@company.com",
      phone: "+1 (555) 456-7890",
      salary: "$92,000",
      startDate: "2020-08-05",
      status: "On Leave"
    }
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const departmentStats = {
    Engineering: employees.filter(e => e.department === 'Engineering').length,
    Product: employees.filter(e => e.department === 'Product').length,
    Marketing: employees.filter(e => e.department === 'Marketing').length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-foreground">Employees</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage employee information and payroll details</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Employee</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Employees</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{employees.length}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Engineering</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{departmentStats.Engineering}</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Product</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{departmentStats.Product}</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Marketing</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{departmentStats.Marketing}</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-card border-border">
          <CardContent className="p-3 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background text-foreground"
              />
            </div>
          </CardContent>
        </Card>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg font-semibold text-foreground">{employee.name}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    employee.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                  }`}>
                    {employee.status}
                  </span>
                </div>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                  {employee.position} • {employee.department}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Started {employee.startDate}</span>
                  </div>
                </div>
                
                <div className="pt-3 sm:pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">Annual Salary</span>
                    <span className="font-semibold text-sm sm:text-base text-foreground">{employee.salary}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayrollEmployees;
