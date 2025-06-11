
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';

const AccountingChartOfAccounts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const accounts = [
    {
      id: 1,
      code: "1000",
      name: "Cash",
      type: "Asset",
      balance: "$25,430.50",
      status: "Active"
    },
    {
      id: 2,
      code: "1100",
      name: "Accounts Receivable",
      type: "Asset",
      balance: "$18,250.75",
      status: "Active"
    },
    {
      id: 3,
      code: "1200",
      name: "Inventory",
      type: "Asset",
      balance: "$45,680.25",
      status: "Active"
    },
    {
      id: 4,
      code: "2000",
      name: "Accounts Payable",
      type: "Liability",
      balance: "$12,340.80",
      status: "Active"
    },
    {
      id: 5,
      code: "2100",
      name: "Short-term Loans",
      type: "Liability",
      balance: "$8,500.00",
      status: "Active"
    },
    {
      id: 6,
      code: "3000",
      name: "Owner's Equity",
      type: "Equity",
      balance: "$75,000.00",
      status: "Active"
    },
    {
      id: 7,
      code: "4000",
      name: "Sales Revenue",
      type: "Revenue",
      balance: "$125,430.90",
      status: "Active"
    },
    {
      id: 8,
      code: "5000",
      name: "Cost of Goods Sold",
      type: "Expense",
      balance: "$42,150.60",
      status: "Active"
    }
  ];

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.code.includes(searchTerm) ||
    account.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'Asset':
        return 'bg-blue-100 text-blue-800';
      case 'Liability':
        return 'bg-red-100 text-red-800';
      case 'Equity':
        return 'bg-purple-100 text-purple-800';
      case 'Revenue':
        return 'bg-green-100 text-green-800';
      case 'Expense':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-4 sm:py-6 px-4 sm:px-8 shadow-sm border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Chart of Accounts</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your company's account structure</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Account</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-6 max-w-full overflow-hidden">
        {/* Search */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Accounts Table */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg font-semibold">Accounts</CardTitle>
            <CardDescription>{filteredAccounts.length} accounts found</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] min-w-[100px]">Code</TableHead>
                    <TableHead className="w-[200px] min-w-[200px]">Account Name</TableHead>
                    <TableHead className="w-[120px] min-w-[120px]">Type</TableHead>
                    <TableHead className="w-[140px] min-w-[140px]">Balance</TableHead>
                    <TableHead className="w-[100px] min-w-[100px] hidden sm:table-cell">Status</TableHead>
                    <TableHead className="w-[120px] min-w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="w-[100px] min-w-[100px] font-mono text-sm">{account.code}</TableCell>
                      <TableCell className="w-[200px] min-w-[200px]">
                        <div className="font-medium text-sm">{account.name}</div>
                        <div className="text-xs text-muted-foreground sm:hidden">{account.status}</div>
                      </TableCell>
                      <TableCell className="w-[120px] min-w-[120px]">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccountTypeColor(account.type)}`}>
                          {account.type}
                        </span>
                      </TableCell>
                      <TableCell className="w-[140px] min-w-[140px] font-medium text-sm">{account.balance}</TableCell>
                      <TableCell className="w-[100px] min-w-[100px] hidden sm:table-cell">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {account.status}
                        </span>
                      </TableCell>
                      <TableCell className="w-[120px] min-w-[120px]">
                        <div className="flex items-center gap-1">
                          <button className="p-1 hover:bg-muted rounded" title="View">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded" title="Edit">
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded" title="Delete">
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Assets</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">$89,361</p>
                </div>
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Liabilities</p>
                  <p className="text-lg sm:text-xl font-bold text-red-600">$20,841</p>
                </div>
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Equity</p>
                  <p className="text-lg sm:text-xl font-bold text-purple-600">$75,000</p>
                </div>
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Net Income</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">$83,280</p>
                </div>
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountingChartOfAccounts;
