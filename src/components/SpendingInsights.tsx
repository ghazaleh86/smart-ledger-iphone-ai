import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

const SpendingInsights = () => {
  const categoryData = [
    { name: 'Meals & Entertainment', value: 680, color: '#93c5fd' },
    { name: 'Transportation', value: 420, color: '#86efac' },
    { name: 'Shopping', value: 380, color: '#fde68a' },
    { name: 'Bills & Utilities', value: 320, color: '#c4b5fd' },
    { name: 'Other', value: 540, color: '#fda4af' },
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
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-2xl p-4 md:p-8 mb-8 shadow-lg border border-blue-200/50">
      <h3 className="text-xl font-medium text-gray-700 mb-6 md:mb-8">This Month's Insights</h3>
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white/90 rounded-xl p-4 md:p-6 border border-white/40 shadow-sm backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-3 md:mb-4">
            <DollarSign className="w-5 h-5 text-blue-500" />
            <div className="text-xl md:text-2xl font-medium text-gray-700">$2,340</div>
          </div>
          <div className="text-sm text-gray-500 mb-2">Total Spent</div>
          <div className="flex items-center text-xs text-red-500 font-medium">
            <TrendingDown className="w-3 h-3 mr-1" />
            12% less than last month
          </div>
        </div>
        
        <div className="bg-white/90 rounded-xl p-4 md:p-6 border border-white/40 shadow-sm backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-3 md:mb-4">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <div className="text-xl md:text-2xl font-medium text-gray-700">$4,820</div>
          </div>
          <div className="text-sm text-gray-500 mb-2">Total Income</div>
          <div className="text-xs text-emerald-500 font-medium">On track for goals</div>
        </div>

        <div className="bg-white/90 rounded-xl p-4 md:p-6 border border-white/40 shadow-sm backdrop-blur-sm hidden lg:block">
          <div className="flex items-center space-x-3 mb-3 md:mb-4">
            <Target className="w-5 h-5 text-blue-500" />
            <div className="text-xl md:text-2xl font-medium text-gray-700">$2,480</div>
          </div>
          <div className="text-sm text-gray-500 mb-2">Net Savings</div>
          <div className="text-xs text-emerald-500 font-medium">+5.2% from last month</div>
        </div>

        <div className="bg-white/90 rounded-xl p-4 md:p-6 border border-white/40 shadow-sm backdrop-blur-sm hidden lg:block">
          <div className="text-xl md:text-2xl font-medium text-gray-700 mb-2">73%</div>
          <div className="text-sm text-gray-500 mb-3 md:mb-4">Budget Used</div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-blue-400 h-2 rounded-full" style={{ width: '73%' }}></div>
          </div>
        </div>
      </div>

      {/* Desktop Charts */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/90 rounded-xl p-6 border border-white/40 shadow-sm backdrop-blur-sm">
          <h4 className="font-medium text-gray-600 mb-6">Spending by Category</h4>
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

        <div className="bg-white/90 rounded-xl p-6 border border-white/40 shadow-sm backdrop-blur-sm">
          <h4 className="font-medium text-gray-600 mb-6">Weekly Spending Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis 
                  dataKey="week" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="spent" fill="#93c5fd" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Categories (Always Visible) */}
      <div className="bg-white/90 rounded-xl p-4 md:p-6 border border-white/40 shadow-sm backdrop-blur-sm">
        <h4 className="font-medium text-gray-600 mb-4 md:mb-6">Top Categories</h4>
        <div className="space-y-4">
          {categoryData.slice(0, 3).map((category, index) => (
            <div key={category.name} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-500">{category.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-600">${category.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;
