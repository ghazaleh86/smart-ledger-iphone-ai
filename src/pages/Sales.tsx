
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Users, FileText, Calendar, Plus } from 'lucide-react';

const Sales = () => {
  const salesMetrics = [
    {
      title: "Total Revenue",
      value: "$124,750",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Active Customers",
      value: "342",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Outstanding Invoices",
      value: "$28,940",
      change: "-5.1%",
      icon: FileText,
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      title: "Avg. Deal Size",
      value: "$3,650",
      change: "+15.3%",
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400"
    }
  ];

  const recentInvoices = [
    { id: "INV-001", customer: "Acme Corp", amount: "$5,200", status: "Paid", date: "2024-06-01" },
    { id: "INV-002", customer: "Tech Solutions", amount: "$3,800", status: "Outstanding", date: "2024-06-03" },
    { id: "INV-003", customer: "Global Industries", amount: "$12,500", status: "Paid", date: "2024-06-05" },
    { id: "INV-004", customer: "StartupXYZ", amount: "$2,100", status: "Draft", date: "2024-06-06" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-foreground">Sales Overview</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Track your sales performance and revenue trends</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto">
        <div className="space-y-4 sm:space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {salesMetrics.map((metric, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${
                    metric.color === 'text-green-600 dark:text-green-400' ? 'bg-green-100 dark:bg-green-900/30' :
                    metric.color === 'text-blue-600 dark:text-blue-400' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    metric.color === 'text-orange-600 dark:text-orange-400' ? 'bg-orange-100 dark:bg-orange-900/30' :
                    'bg-emerald-100 dark:bg-emerald-900/30'
                  }`}>
                    <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{metric.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 dark:text-green-400 mr-1" />
                    <span className="text-green-600 dark:text-green-400">{metric.change}</span>
                    <span className="ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Invoices */}
          <Card className="bg-card border-border">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg font-semibold text-foreground">Recent Invoices</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">Latest invoicing activity</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mobile Card View */}
              <div className="block sm:hidden">
                <div className="divide-y divide-border">
                  {recentInvoices.map((invoice) => (
                    <div key={invoice.id} className="p-3 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-foreground">{invoice.id}</div>
                          <div className="text-xs text-muted-foreground">{invoice.customer}</div>
                          <div className="text-xs text-muted-foreground">{invoice.date}</div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-sm font-medium text-foreground">{invoice.amount}</div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                            invoice.status === 'Outstanding' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' :
                            'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200'
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Invoice ID</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentInvoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-border/50 hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium text-foreground">{invoice.id}</td>
                          <td className="py-3 px-4 text-foreground">{invoice.customer}</td>
                          <td className="py-3 px-4 font-medium text-foreground">{invoice.amount}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              invoice.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                              invoice.status === 'Outstanding' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' :
                              'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200'
                            }`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{invoice.date}</td>
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
    </div>
  );
};

export default Sales;
