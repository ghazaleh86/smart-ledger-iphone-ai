
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Plus, Search, Users, DollarSign, CheckCircle, Clock, Play } from 'lucide-react';

const PayrollPayRuns = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const payRuns = [
    {
      id: "PR-2024-06",
      period: "June 2024",
      payDate: "2024-06-30",
      employees: 15,
      grossPay: "$42,750",
      taxes: "$8,550",
      netPay: "$34,200",
      status: "Completed"
    },
    {
      id: "PR-2024-05",
      period: "May 2024", 
      payDate: "2024-05-31",
      employees: 15,
      grossPay: "$42,750",
      taxes: "$8,550",
      netPay: "$34,200",
      status: "Completed"
    },
    {
      id: "PR-2024-04",
      period: "April 2024",
      payDate: "2024-04-30",
      employees: 14,
      grossPay: "$39,900",
      taxes: "$7,980",
      netPay: "$31,920",
      status: "Completed"
    },
    {
      id: "PR-2024-07",
      period: "July 2024",
      payDate: "2024-07-31",
      employees: 16,
      grossPay: "$45,600",
      taxes: "$9,120",
      netPay: "$36,480",
      status: "Draft"
    }
  ];

  const filteredPayRuns = payRuns.filter(payRun =>
    payRun.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payRun.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingPayRun = payRuns.find(pr => pr.status === 'Draft');
  const totalEmployees = Math.max(...payRuns.map(pr => pr.employees));
  const avgMonthlyPayroll = payRuns
    .filter(pr => pr.status === 'Completed')
    .reduce((sum, pr) => sum + parseFloat(pr.netPay.replace(/[$,]/g, '')), 0) / 
    payRuns.filter(pr => pr.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Pay Runs</h1>
            <p className="text-sm text-gray-600 mt-1">Process and manage payroll runs</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            New Pay Run
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Monthly Payroll</p>
                  <p className="text-2xl font-bold text-gray-900">${avgMonthlyPayroll.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Next Pay Date</p>
                  <p className="text-2xl font-bold text-gray-900">Jul 31</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pay Runs YTD</p>
                  <p className="text-2xl font-bold text-gray-900">{payRuns.filter(pr => pr.status === 'Completed').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Pay Run */}
        {upcomingPayRun && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Upcoming Pay Run</CardTitle>
              <CardDescription>Ready to process payroll for {upcomingPayRun.period}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Employees</p>
                  <p className="text-lg font-semibold text-gray-900">{upcomingPayRun.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gross Pay</p>
                  <p className="text-lg font-semibold text-gray-900">{upcomingPayRun.grossPay}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Taxes</p>
                  <p className="text-lg font-semibold text-gray-900">{upcomingPayRun.taxes}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Net Pay</p>
                  <p className="text-lg font-semibold text-gray-900">{upcomingPayRun.netPay}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Play className="h-4 w-4" />
                  Process Pay Run
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Preview
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search pay runs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pay Runs History */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Pay Run History</CardTitle>
            <CardDescription>{filteredPayRuns.length} pay runs found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Pay Run ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Period</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Employees</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Gross Pay</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Net Pay</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayRuns.map((payRun) => (
                    <tr key={payRun.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{payRun.id}</td>
                      <td className="py-3 px-4 text-gray-700">{payRun.period}</td>
                      <td className="py-3 px-4 text-gray-700">{payRun.employees}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{payRun.grossPay}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{payRun.netPay}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payRun.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {payRun.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{payRun.payDate}</td>
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

export default PayrollPayRuns;
