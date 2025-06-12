
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold">Banking Accounts</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage your bank accounts and financial institutions</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Connect Account</span>
            <span className="sm:hidden">Connect</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Balance</p>
                  <p className="text-lg sm:text-2xl font-bold">${totalBalance.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Connected Accounts</p>
                  <p className="text-lg sm:text-2xl font-bold">{accounts.length}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Last Sync</p>
                  <p className="text-lg sm:text-2xl font-bold">2m ago</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Building2 className="h-4 w-4 text-purple-600" />
                </div>
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
