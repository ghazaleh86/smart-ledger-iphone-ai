
import React from 'react';
import SpendingInsights from '@/components/SpendingInsights';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, PieChart, BarChart3, Users } from 'lucide-react';

const Dashboard = () => {
  // Mock data for financial metrics
  const kpiData = [
    {
      title: "Monthly Revenue",
      value: "$52,340",
      change: "+12.5%",
      trend: "up",
      description: "vs last month",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Operating Expenses",
      value: "$28,750",
      change: "-3.2%",
      trend: "down",
      description: "vs last month",
      icon: TrendingDown,
      color: "text-blue-600"
    },
    {
      title: "Net Profit Margin",
      value: "18.2%",
      change: "+2.1%",
      trend: "up",
      description: "vs last month",
      icon: Target,
      color: "text-emerald-600"
    },
    {
      title: "Cash Flow",
      value: "$15,890",
      change: "+8.7%",
      trend: "up",
      description: "vs last month",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ];

  const alertsData = [
    {
      title: "Outstanding Invoices",
      value: "$12,450",
      description: "7 invoices overdue",
      severity: "high",
      icon: AlertTriangle
    },
    {
      title: "Low Cash Warning",
      value: "$8,200",
      description: "Below 30-day threshold",
      severity: "medium",
      icon: DollarSign
    },
    {
      title: "Expense Variance",
      value: "+15%",
      description: "Above budget this month",
      severity: "low",
      icon: BarChart3
    }
  ];

  const quickStats = [
    { label: "Active Customers", value: "1,247", icon: Users },
    { label: "Avg. Invoice Value", value: "$3,420", icon: DollarSign },
    { label: "Days Sales Outstanding", value: "32 days", icon: TrendingUp },
    { label: "Gross Margin", value: "64.2%", icon: PieChart },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Financial Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Get an overview of your financial performance and key metrics</p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-8">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {kpi.change}
                  </span>
                  <span className="ml-1">{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Spending Insights */}
        <SpendingInsights />

        {/* Alerts and Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Financial Alerts */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Financial Alerts</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alertsData.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100' :
                      alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <alert.icon className={`h-4 w-4 ${
                        alert.severity === 'high' ? 'text-red-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{alert.title}</div>
                      <div className="text-sm text-gray-500">{alert.description}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">{alert.value}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Quick Stats</CardTitle>
              <CardDescription>Key business metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <stat.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">{stat.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
