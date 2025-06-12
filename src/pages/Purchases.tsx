
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold">Purchases Overview</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Track your purchase orders and vendor relationships</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto text-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Purchase Order</span>
            <span className="sm:hidden">New PO</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {purchaseMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-lg sm:text-2xl font-bold">{metric.value}</p>
                  </div>
                  <metric.icon className={`h-5 w-5 sm:h-8 sm:w-8 ${metric.color}`} />
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">{metric.change}</span>
                  <span className="ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Purchase Orders */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Recent Purchase Orders</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Latest purchasing activity</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mobile Card View */}
            <div className="block md:hidden">
              <div className="divide-y divide-border">
                {recentPurchases.map((purchase) => (
                  <div key={purchase.id} className="p-3 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="text-sm font-medium">{purchase.id}</div>
                        <div className="text-xs text-muted-foreground">{purchase.vendor}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          purchase.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          purchase.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          purchase.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {purchase.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Amount</div>
                        <div className="text-sm font-medium">{purchase.amount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Date</div>
                        <div className="text-sm">{purchase.date}</div>
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
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">PO Number</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Vendor</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPurchases.map((purchase) => (
                      <tr key={purchase.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{purchase.id}</td>
                        <td className="py-3 px-4">{purchase.vendor}</td>
                        <td className="py-3 px-4 font-medium">{purchase.amount}</td>
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
                        <td className="py-3 px-4 text-muted-foreground">{purchase.date}</td>
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

export default Purchases;
