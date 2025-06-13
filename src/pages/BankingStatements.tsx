
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Upload, Calendar, Eye, AlertCircle } from 'lucide-react';

const BankingStatements = () => {
  const [selectedAccount, setSelectedAccount] = useState('all');

  const statements = [
    {
      id: 1,
      account: "Business Checking",
      period: "May 2024",
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      transactions: 147,
      startBalance: "$42,350.25",
      endBalance: "$45,280.50",
      status: "Available"
    },
    {
      id: 2,
      account: "Business Savings",
      period: "May 2024", 
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      transactions: 12,
      startBalance: "$120,450.75",
      endBalance: "$125,670.25",
      status: "Available"
    },
    {
      id: 3,
      account: "Business Checking",
      period: "April 2024",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      transactions: 134,
      startBalance: "$38,920.40",
      endBalance: "$42,350.25",
      status: "Available"
    },
    {
      id: 4,
      account: "Payroll Account",
      period: "May 2024",
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      transactions: 68,
      startBalance: "$25,680.00",
      endBalance: "$28,450.00",
      status: "Processing"
    }
  ];

  const accounts = ["All Accounts", "Business Checking", "Business Savings", "Payroll Account"];

  const filteredStatements = selectedAccount === 'all' 
    ? statements 
    : statements.filter(statement => statement.account === selectedAccount);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-6 px-8 shadow-sm border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Bank Statements</h1>
            <p className="text-sm text-muted-foreground mt-1">View and import your bank statements</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            <Upload className="h-4 w-4" />
            Import Statement
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-6">
        {/* Account Filter */}
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-foreground">Filter by Account:</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
              >
                {accounts.map((account) => (
                  <option key={account} value={account === 'All Accounts' ? 'all' : account}>
                    {account}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Statements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStatements.map((statement) => (
            <Card key={statement.id} className="bg-card hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">{statement.account}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statement.status === 'Available' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                  }`}>
                    {statement.status}
                  </span>
                </div>
                <CardDescription className="text-muted-foreground">{statement.period}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Period:</span>
                    <span className="text-foreground">{statement.startDate} to {statement.endDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transactions:</span>
                    <span className="text-foreground">{statement.transactions}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Starting Balance:</span>
                    <span className="font-medium text-foreground">{statement.startBalance}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ending Balance:</span>
                    <span className="font-medium text-foreground">{statement.endBalance}</span>
                  </div>
                </div>
                
                <div className="pt-4 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Automatic Statement Import</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Connect your bank accounts to automatically import statements each month. 
                  This helps ensure your financial records are always up to date.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BankingStatements;
