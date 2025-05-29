
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

const SpendingInsights = () => {
  const categoryData = [
    { name: 'Meals & Entertainment', value: 680, color: '#f97316' },
    { name: 'Transportation', value: 420, color: '#3b82f6' },
    { name: 'Shopping', value: 380, color: '#8b5cf6' },
    { name: 'Bills & Utilities', value: 320, color: '#6b7280' },
    { name: 'Other', value: 540, color: '#10b981' },
  ];

  const weeklyData = [
    { week: 'Week 1', spent: 520 },
    { week: 'Week 2', spent: 680 },
    { week: 'Week 3', spent: 450 },
    { week: 'Week 4', spent: 690 },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-100/50 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">This Month's Insights</h3>
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">$2,340</div>
          </div>
          <div className="text-sm text-gray-600">Total Spent</div>
          <div className="flex items-center text-xs text-green-600 mt-1">
            <TrendingDown className="w-3 h-3 mr-1" />
            12% less than last month
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div className="text-2xl font-bold text-gray-900">$4,820</div>
          </div>
          <div className="text-sm text-gray-600">Total Income</div>
          <div className="text-xs text-blue-600 mt-1">On track for goals</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 hidden lg:block">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900">$2,480</div>
          </div>
          <div className="text-sm text-gray-600">Net Savings</div>
          <div className="text-xs text-purple-600 mt-1">+5.2% from last month</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 hidden lg:block">
          <div className="text-2xl font-bold text-gray-900">73%</div>
          <div className="text-sm text-gray-600">Budget Used</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '73%' }}></div>
          </div>
        </div>
      </div>

      {/* Desktop Charts */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
          <h4 className="font-medium text-gray-900 mb-3">Spending by Category</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
          <h4 className="font-medium text-gray-900 mb-3">Weekly Spending Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip formatter={(value) => [`$${value}`, 'Spent']} />
                <Bar dataKey="spent" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Categories (Always Visible) */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
        <h4 className="font-medium text-gray-900 mb-3">Top Categories</h4>
        <div className="space-y-3">
          {categoryData.slice(0, 3).map((category, index) => (
            <div key={category.name} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-600">{category.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">${category.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;
