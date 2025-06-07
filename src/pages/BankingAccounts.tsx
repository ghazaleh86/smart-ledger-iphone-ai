
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Plus, Building2, TrendingUp, Eye, EyeOff } from 'lucide-react';

const BankingAccounts = () => {
  const accounts = [
    {
      id: 1,
      name: "Business Checking",
      bank: "Chase Bank",
      accountNumber: "****1234",
      balance: "$45,280.50",
      type: "Checking",
      status: "Active",
      lastSync: "2 minutes ago"
    },
    {
      id: 2,
      name: "Business Savings",
      bank: "Chase Bank", 
      accountNumber: "****5678",
      balance: "$125,670.25",
      type: "Savings",
      status: "Active",
      lastSync: "5 minutes ago"
    },
    {
      id: 3,
      name: "Payroll Account",
      bank: "Wells Fargo",
      accountNumber: "****9012",
      balance: "$28,450.00",
      type: "Checking",
      status: "Active",
      lastSync: "1 hour ago"
    },
    {
      id: 4,
      name: "Credit Line",
      bank: "Bank of America",
      accountNumber: "****3456",
      balance: "-$5,230.75",
      type: "Credit",
      status: "Active",
      lastSync: "3 hours ago"
    }
  ];

  const totalBalance = accounts
    .filter(account => account.type !== 'Credit')
    .reduce((sum, account) => {
      const balance = parseFloat(account.balance.replace(/[$,]/g, ''));
      return sum + balance;
    }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Banking Accounts</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your bank accounts and financial institutions</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            Connect Account
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-8">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Balance</p>
                  <p className="text-2xl font-bold text-gray-900">${totalBalance.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Connected Accounts</p>
                  <p className="text-2xl font-bold text-gray-900">{accounts.length}</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Last Sync</p>
                  <p className="text-2xl font-bold text-gray-900">2m ago</p>
                </div>
                <Building2 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account) => (
            <Card key={account.id} className="bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">{account.name}</CardTitle>
                    <CardDescription className="text-gray-600">{account.bank} • {account.accountNumber}</CardDescription>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    account.type === 'Checking' ? 'bg-blue-100 text-blue-800' :
                    account.type === 'Savings' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {account.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Balance</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-bold ${
                      account.balance.startsWith('-') ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {account.balance}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {account.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Last sync: {account.lastSync}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankingAccounts;
