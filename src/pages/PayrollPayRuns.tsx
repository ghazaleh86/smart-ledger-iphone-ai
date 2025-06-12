
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Plus, Search, Calendar, CheckCircle, Clock, Users } from 'lucide-react';

const PayrollPayRuns = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const payRuns = [
    {
      id: "PR-2024-06",
      period: "June 2024",
      payDate: "2024-06-30",
      employees: 12,
      grossPay: "$48,500.00",
      netPay: "$36,750.00",
      status: "Completed"
    },
    {
      id: "PR-2024-05",
      period: "May 2024", 
      payDate: "2024-05-31",
      employees: 12,
      grossPay: "$47,200.00",
      netPay: "$35,800.00",
      status: "Completed"
    },
    {
      id: "PR-2024-04",
      period: "April 2024",
      payDate: "2024-04-30",
      employees: 11,
      grossPay: "$44,850.00",
      netPay: "$34,100.00",
      status: "Completed"
    },
    {
      id: "PR-2024-07",
      period: "July 2024",
      payDate: "2024-07-31",
      employees: 12,
      grossPay: "$49,800.00",
      netPay: "$37,650.00",
      status: "Draft"
    }
  ];

  const payrollStats = {
    totalEmployees: 12,
    avgMonthlyPay: "$37,325",
    ytdGrossPay: "$290,350",
    lastPayRun: "June 2024"
  };

  const filteredPayRuns = payRuns.filter(payRun =>
    payRun.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payRun.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold">Pay Runs</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage and process employee payroll</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Pay Run</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Employees</p>
                  <p className="text-lg sm:text-2xl font-bold">{payrollStats.totalEmployees}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Avg Monthly Pay</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">{payrollStats.avgMonthlyPay}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-lg">
                  <Calculator className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">YTD Gross Pay</p>
                  <p className="text-lg sm:text-2xl font-bold">{payrollStats.ytdGrossPay}</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-lg">
                  <Calculator className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Last Pay Run</p>
                  <p className="text-lg sm:text-2xl font-bold">{payrollStats.lastPayRun}</p>
                </div>
                <div className="bg-orange-50 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-3 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search pay runs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pay Runs List */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Pay Run History</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{filteredPayRuns.length} pay runs found</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mobile Card View */}
            <div className="block md:hidden">
              <div className="divide-y divide-border">
                {filteredPayRuns.map((payRun) => (
                  <div key={payRun.id} className="p-3 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="text-sm font-medium">{payRun.id}</div>
                        <div className="text-xs text-muted-foreground">{payRun.period}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payRun.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {payRun.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Employees</div>
                        <div className="text-sm font-medium">{payRun.employees}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Pay Date</div>
                        <div className="text-sm">{payRun.payDate}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Gross Pay</div>
                        <div className="text-sm font-medium">{payRun.grossPay}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Net Pay</div>
                        <div className="text-sm font-medium">{payRun.netPay}</div>
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
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Pay Run ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Period</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Pay Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Employees</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Gross Pay</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Net Pay</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayRuns.map((payRun) => (
                      <tr key={payRun.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{payRun.id}</td>
                        <td className="py-3 px-4">{payRun.period}</td>
                        <td className="py-3 px-4">{payRun.payDate}</td>
                        <td className="py-3 px-4">{payRun.employees}</td>
                        <td className="py-3 px-4 font-medium">{payRun.grossPay}</td>
                        <td className="py-3 px-4 font-medium">{payRun.netPay}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payRun.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {payRun.status}
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

export default PayrollPayRuns;
