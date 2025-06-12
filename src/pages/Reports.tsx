
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold">Reports</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Generate financial reports and analytics</p>
          </div>
          <div className="flex items-center gap-3 self-end">
            <button className="flex items-center gap-2 border border-input text-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Custom Report</span>
              <span className="sm:hidden">Custom</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Quick Reports */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Quick Reports</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Recently generated and ready-to-view reports</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {quickReports.map((report, index) => (
                <div key={index} className="p-3 sm:p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm sm:text-base">{report.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">{report.period}</p>
                  {report.status === 'Ready' && (
                    <button className="flex items-center gap-2 text-xs sm:text-sm text-primary hover:text-primary/80">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                      Download
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Categories */}
        <div className="space-y-6 sm:space-y-8">
          {reportCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-semibold">{category.title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {category.reports.map((report, reportIndex) => (
                    <div key={reportIndex} className="p-3 sm:p-4 border border-border rounded-lg hover:shadow-sm transition-shadow cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <report.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-sm sm:text-base">{report.name}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Builder CTA */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="max-w-md mx-auto">
              <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Custom Report Builder</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                Create custom reports with your own filters, date ranges, and data visualizations.
              </p>
              <button className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm">
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
