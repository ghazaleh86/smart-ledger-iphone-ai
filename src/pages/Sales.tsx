
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
      color: "text-green-600"
    },
    {
      title: "Active Customers",
      value: "342",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Outstanding Invoices",
      value: "$28,940",
      change: "-5.1%",
      icon: FileText,
      color: "text-orange-600"
    },
    {
      title: "Avg. Deal Size",
      value: "$3,650",
      change: "+15.3%",
      icon: TrendingUp,
      color: "text-emerald-600"
    }
  ];

  const recentInvoices = [
    { id: "INV-001", customer: "Acme Corp", amount: "$5,200", status: "Paid", date: "2024-06-01" },
    { id: "INV-002", customer: "Tech Solutions", amount: "$3,800", status: "Outstanding", date: "2024-06-03" },
    { id: "INV-003", customer: "Global Industries", amount: "$12,500", status: "Paid", date: "2024-06-05" },
    { id: "INV-004", customer: "StartupXYZ", amount: "$2,100", status: "Draft", date: "2024-06-06" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Sales Overview</h1>
            <p className="text-sm text-gray-600 mt-1">Track your sales performance and revenue trends</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {salesMetrics.map((metric, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">{metric.change}</span>
                  <span className="ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Invoices */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Invoices</CardTitle>
            <CardDescription>Latest invoicing activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Invoice ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{invoice.id}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.customer}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{invoice.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'Outstanding' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{invoice.date}</td>
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

export default Sales;
