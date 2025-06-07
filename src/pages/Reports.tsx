
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, PieChart, FileText, Calendar, Download, Filter } from 'lucide-react';

const Reports = () => {
  const reportCategories = [
    {
      title: "Financial Reports",
      description: "Core financial statements and analysis",
      reports: [
        { name: "Profit & Loss", description: "Income and expense summary", icon: TrendingUp },
        { name: "Balance Sheet", description: "Assets, liabilities, and equity", icon: BarChart3 },
        { name: "Cash Flow Statement", description: "Cash inflows and outflows", icon: FileText },
        { name: "Budget vs Actual", description: "Compare budgeted to actual amounts", icon: PieChart }
      ]
    },
    {
      title: "Sales Reports", 
      description: "Revenue and customer analytics",
      reports: [
        { name: "Sales Summary", description: "Revenue trends and metrics", icon: TrendingUp },
        { name: "Customer Analysis", description: "Customer behavior and lifetime value", icon: BarChart3 },
        { name: "Invoice Aging", description: "Outstanding receivables analysis", icon: FileText },
        { name: "Sales by Product", description: "Product performance breakdown", icon: PieChart }
      ]
    },
    {
      title: "Expense Reports",
      description: "Spending analysis and cost management", 
      reports: [
        { name: "Expense Summary", description: "Spending trends by category", icon: TrendingUp },
        { name: "Vendor Analysis", description: "Vendor spending and performance", icon: BarChart3 },
        { name: "Bill Aging", description: "Outstanding payables analysis", icon: FileText },
        { name: "Cost Center Analysis", description: "Expenses by department", icon: PieChart }
      ]
    }
  ];

  const quickReports = [
    { name: "Monthly P&L", period: "Last 30 days", status: "Ready" },
    { name: "Cash Flow", period: "This quarter", status: "Generating" },
    { name: "Expense Summary", period: "Year to date", status: "Ready" },
    { name: "Sales Report", period: "This month", status: "Ready" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
            <p className="text-sm text-gray-600 mt-1">Generate financial reports and analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <FileText className="h-4 w-4" />
              Custom Report
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-8">
        {/* Quick Reports */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Reports</CardTitle>
            <CardDescription>Recently generated and ready-to-view reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickReports.map((report, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{report.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{report.period}</p>
                  {report.status === 'Ready' && (
                    <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Categories */}
        <div className="space-y-8">
          {reportCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.reports.map((report, reportIndex) => (
                    <div key={reportIndex} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <report.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-gray-900">{report.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Builder CTA */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Report Builder</h3>
              <p className="text-gray-600 mb-4">
                Create custom reports with your own filters, date ranges, and data visualizations.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Build Custom Report
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
