
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, TrendingDown, FileText, Users, Calendar, Plus } from 'lucide-react';

const Purchases = () => {
  const purchaseMetrics = [
    {
      title: "Total Expenses",
      value: "$89,340",
      change: "+3.2%",
      icon: ShoppingCart,
      color: "text-red-600"
    },
    {
      title: "Active Vendors",
      value: "28",
      change: "+2",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Pending Bills",
      value: "$15,720",
      change: "-8.1%",
      icon: FileText,
      color: "text-orange-600"
    },
    {
      title: "Avg. Order Value",
      value: "$2,450",
      change: "+5.7%",
      icon: TrendingDown,
      color: "text-purple-600"
    }
  ];

  const recentPurchases = [
    { id: "PO-001", vendor: "Office Supplies Co", amount: "$1,240", status: "Delivered", date: "2024-06-01" },
    { id: "PO-002", vendor: "Tech Equipment Inc", amount: "$5,800", status: "Pending", date: "2024-06-03" },
    { id: "PO-003", vendor: "Marketing Agency", amount: "$3,200", status: "Approved", date: "2024-06-05" },
    { id: "PO-004", vendor: "Legal Services", amount: "$2,100", status: "Draft", date: "2024-06-06" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Purchases Overview</h1>
            <p className="text-sm text-gray-600 mt-1">Track your purchase orders and vendor relationships</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            New Purchase Order
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {purchaseMetrics.map((metric, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="text-green-600">{metric.change}</span>
                  <span className="ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Purchase Orders */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Purchase Orders</CardTitle>
            <CardDescription>Latest purchasing activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">PO Number</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Vendor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPurchases.map((purchase) => (
                    <tr key={purchase.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{purchase.id}</td>
                      <td className="py-3 px-4 text-gray-700">{purchase.vendor}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{purchase.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          purchase.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          purchase.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          purchase.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {purchase.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{purchase.date}</td>
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

export default Purchases;
