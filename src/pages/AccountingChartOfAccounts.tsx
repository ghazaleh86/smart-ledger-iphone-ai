
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
      <div className="bg-card py-4 sm:py-6 px-4 sm:px-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Chart of Accounts</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your company's account structure</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Account</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-6 sm:py-8 max-w-7xl mx-auto">
        <div className="space-y-6">
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

          {/* Accounts Table - Mobile Cards on small screens */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg font-semibold">Accounts</CardTitle>
              <CardDescription>{filteredAccounts.length} accounts found</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mobile Card View */}
              <div className="block sm:hidden">
                <div className="divide-y divide-border">
                  {filteredAccounts.map((account) => (
                    <div key={account.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{account.name}</div>
                          <div className="text-sm text-muted-foreground">Code: {account.code}</div>
                          <div className="text-sm text-muted-foreground">{account.status}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{account.balance}</div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getAccountTypeColor(account.type)}`}>
                            {account.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 pt-2 border-t border-border">
                        <Button variant="ghost" size="sm" className="h-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Code</TableHead>
                        <TableHead className="min-w-48">Account Name</TableHead>
                        <TableHead className="w-24">Type</TableHead>
                        <TableHead className="w-32">Balance</TableHead>
                        <TableHead className="w-32">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-mono text-sm">{account.code}</TableCell>
                          <TableCell>
                            <div className="font-medium text-sm">{account.name}</div>
                            <div className="text-xs text-muted-foreground">{account.status}</div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccountTypeColor(account.type)}`}>
                              {account.type}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium text-sm">{account.balance}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Assets</p>
                    <p className="text-xl font-bold text-green-600">$89,361</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Liabilities</p>
                    <p className="text-xl font-bold text-red-600">$20,841</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Equity</p>
                    <p className="text-xl font-bold text-purple-600">$75,000</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Net Income</p>
                    <p className="text-xl font-bold text-green-600">$83,280</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingChartOfAccounts;
