
import React from 'react';

const SpendingInsights = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Insights</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4">
          <div className="text-2xl font-bold text-gray-900">$2,340</div>
          <div className="text-sm text-gray-600">Total Spent</div>
          <div className="text-xs text-green-600 mt-1">12% less than last month</div>
        </div>
        
        <div className="bg-white rounded-xl p-4">
          <div className="text-2xl font-bold text-gray-900">$4,820</div>
          <div className="text-sm text-gray-600">Total Income</div>
          <div className="text-xs text-blue-600 mt-1">On track for goals</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4">
        <h4 className="font-medium text-gray-900 mb-3">Top Categories</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Meals & Entertainment</span>
            <span className="text-sm font-medium text-gray-900">$680</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Transportation</span>
            <span className="text-sm font-medium text-gray-900">$420</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Shopping</span>
            <span className="text-sm font-medium text-gray-900">$380</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;
