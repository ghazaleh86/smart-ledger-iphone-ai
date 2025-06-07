
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Plus, Search, FolderOpen, Eye, Edit, Trash2 } from 'lucide-react';

const AccountingChartOfAccounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountTypeFilter, setAccountTypeFilter] = useState('all');

  const chartOfAccounts = [
    // Assets
    { id: 1001, name: "Cash", type: "Assets", subtype: "Current Assets", description: "Petty cash and cash on hand", balance: "$5,280.50" },
    { id: 1010, name: "Business Checking", type: "Assets", subtype: "Current Assets", description: "Primary business bank account", balance: "$45,280.50" },
    { id: 1020, name: "Business Savings", type: "Assets", subtype: "Current Assets", description: "Business savings account", balance: "$125,670.25" },
    { id: 1200, name: "Accounts Receivable", type: "Assets", subtype: "Current Assets", description: "Money owed by customers", balance: "$28,940.00" },
    { id: 1500, name: "Office Equipment", type: "Assets", subtype: "Fixed Assets", description: "Computers, furniture, and equipment", balance: "$15,500.00" },
    
    // Liabilities
    { id: 2000, name: "Accounts Payable", type: "Liabilities", subtype: "Current Liabilities", description: "Money owed to vendors", balance: "$11,090.00" },
    { id: 2100, name: "Credit Card", type: "Liabilities", subtype: "Current Liabilities", description: "Business credit card balance", balance: "$5,230.75" },
    { id: 2500, name: "Payroll Liabilities", type: "Liabilities", subtype: "Current Liabilities", description: "Wages and taxes payable", balance: "$8,750.00" },
    
    // Equity
    { id: 3000, name: "Owner's Equity", type: "Equity", subtype: "Owner's Equity", description: "Owner's investment in the business", balance: "$100,000.00" },
    { id: 3200, name: "Retained Earnings", type: "Equity", subtype: "Retained Earnings", description: "Accumulated business profits", balance: "$75,420.50" },
    
    // Revenue
    { id: 4000, name: "Sales Revenue", type: "Revenue", subtype: "Operating Revenue", description: "Income from sales", balance: "$124,750.00" },
    { id: 4100, name: "Service Revenue", type: "Revenue", subtype: "Operating Revenue", description: "Income from services", balance: "$45,200.00" },
    
    // Expenses
    { id: 5000, name: "Cost of Goods Sold", type: "Expenses", subtype: "Cost of Sales", description: "Direct costs of products sold", balance: "$35,800.00" },
    { id: 6000, name: "Office Rent", type: "Expenses", subtype: "Operating Expenses", description: "Monthly office rental", balance: "$12,000.00" },
    { id: 6100, name: "Utilities", type: "Expenses", subtype: "Operating Expenses", description: "Electricity, water, internet", balance: "$2,450.00" },
    { id: 6200, name: "Marketing", type: "Expenses", subtype: "Operating Expenses", description: "Advertising and promotion", balance: "$8,750.00" },
    { id: 6300, name: "Professional Services", type: "Expenses", subtype: "Operating Expenses", description: "Legal and accounting fees", balance: "$5,200.00" }
  ];

  const accountTypes = ["All", "Assets", "Liabilities", "Equity", "Revenue", "Expenses"];

  const filteredAccounts = chartOfAccounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = accountTypeFilter === 'all' || account.type.toLowerCase() === accountTypeFilter;
    return matchesSearch && matchesType;
  });

  const getAccountTypeIcon = (type: string) => {
    switch (type) {
      case 'Assets':
        return '💰';
      case 'Liabilities':
        return '📋';
      case 'Equity':
        return '🏛️';
      case 'Revenue':
        return '📈';
      case 'Expenses':
        return '📊';
      default:
        return '📁';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Chart of Accounts</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your accounting structure and account categories</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            Add Account
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-6">
        {/* Account Type Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {accountTypes.slice(1).map((type) => {
            const typeAccounts = chartOfAccounts.filter(acc => acc.type === type);
            return (
              <Card key={type} className="bg-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{getAccountTypeIcon(type)}</div>
                  <h3 className="font-medium text-gray-900">{type}</h3>
                  <p className="text-sm text-gray-600">{typeAccounts.length} accounts</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={accountTypeFilter}
                onChange={(e) => setAccountTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {accountTypes.map((type) => (
                  <option key={type} value={type === 'All' ? 'all' : type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Chart of Accounts Table */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">All Accounts</CardTitle>
            <CardDescription>{filteredAccounts.length} accounts found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Account #</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Subtype</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Balance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{account.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{account.name}</div>
                          <div className="text-sm text-gray-600">{account.description}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span>{getAccountTypeIcon(account.type)}</span>
                          <span className="text-gray-700">{account.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{account.subtype}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{account.balance}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Calculator className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-900">Chart of Accounts Structure</h3>
                <p className="text-sm text-green-700 mt-1">
                  Your chart of accounts is organized into five main categories: Assets, Liabilities, Equity, Revenue, and Expenses. 
                  Each account has a unique number for easy identification and reporting.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountingChartOfAccounts;
