
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

const SpendingInsights = () => {
  const categoryData = [
    { name: 'Meals & Entertainment', value: 680, color: '#60a5fa' },
    { name: 'Transportation', value: 420, color: '#34d399' },
    { name: 'Shopping', value: 380, color: '#fbbf24' },
    { name: 'Bills & Utilities', value: 320, color: '#a78bfa' },
    { name: 'Other', value: 540, color: '#fb7185' },
  ];

  const weeklyData = [
    { week: 'Week 1', spent: 520 },
    { week: 'Week 2', spent: 680 },
    { week: 'Week 3', spent: 450 },
    { week: 'Week 4', spent: 690 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="font-semibold">${payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="font-semibold">${payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 mb-8 shadow-sm border border-blue-200/50">
      <h3 className="text-xl font-semibold text-gray-900 mb-8">This Month's Insights</h3>
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-lg p-6 border border-blue-100/50 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <div className="text-2xl font-semibold text-gray-900">$2,340</div>
          </div>
          <div className="text-sm text-gray-700 mb-2">Total Spent</div>
          <div className="flex items-center text-xs text-red-600 font-medium">
            <TrendingDown className="w-3 h-3 mr-1" />
            12% less than last month
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-lg p-6 border border-blue-100/50 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <div className="text-2xl font-semibold text-gray-900">$4,820</div>
          </div>
          <div className="text-sm text-gray-700 mb-2">Total Income</div>
          <div className="text-xs text-green-600 font-medium">On track for goals</div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-lg p-6 border border-blue-100/50 shadow-sm hidden lg:block">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <div className="text-2xl font-semibold text-gray-900">$2,480</div>
          </div>
          <div className="text-sm text-gray-700 mb-2">Net Savings</div>
          <div className="text-xs text-green-600 font-medium">+5.2% from last month</div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-lg p-6 border border-blue-100/50 shadow-sm hidden lg:block">
          <div className="text-2xl font-semibold text-gray-900 mb-2">73%</div>
          <div className="text-sm text-gray-700 mb-4">Budget Used</div>
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '73%' }}></div>
          </div>
        </div>
      </div>

      {/* Desktop Charts */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-lg p-6 border border-blue-100/50 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-6">Spending by Category</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-lg p-6 border border-blue-100/50 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-6">Weekly Spending Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd6fe" vertical={false} />
                <XAxis 
                  dataKey="week" 
                  stroke="#6b7280" 
                  fontSize={12} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12} 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="spent" fill="#60a5fa" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Categories (Always Visible) */}
      <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-lg p-6 border border-blue-100/50 shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-6">Top Categories</h4>
        <div className="space-y-4">
          {categoryData.slice(0, 3).map((category, index) => (
            <div key={category.name} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">${category.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;
