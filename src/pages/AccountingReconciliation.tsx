
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckSquare, Plus, Search, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const AccountingReconciliation = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const reconciliations = [
    {
      id: 1,
      account: "Business Checking",
      period: "May 2024",
      statementBalance: "$45,280.50",
      bookBalance: "$45,280.50",
      difference: "$0.00",
      status: "Reconciled",
      lastReconciled: "2024-06-01",
      reconciledBy: "Sarah Johnson"
    },
    {
      id: 2,
      account: "Business Savings",
      period: "May 2024",
      statementBalance: "$125,670.25",
      bookBalance: "$125,670.25",
      difference: "$0.00",
      status: "Reconciled",
      lastReconciled: "2024-06-01",
      reconciledBy: "Michael Chen"
    },
    {
      id: 3,
      account: "Credit Card",
      period: "May 2024",
      statementBalance: "-$5,230.75",
      bookBalance: "-$5,150.75",
      difference: "-$80.00",
      status: "Needs Review",
      lastReconciled: "2024-05-28",
      reconciledBy: "Emily Rodriguez"
    },
    {
      id: 4,
      account: "Payroll Account",
      period: "May 2024",
      statementBalance: "$28,450.00",
      bookBalance: "$28,450.00",
      difference: "$0.00",
      status: "In Progress",
      lastReconciled: null,
      reconciledBy: null
    }
  ];

  const filteredReconciliations = reconciliations.filter(recon =>
    recon.account.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Reconciled':
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'Needs Review':
        return <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const reconciledCount = reconciliations.filter(r => r.status === 'Reconciled').length;
  const needsReviewCount = reconciliations.filter(r => r.status === 'Needs Review').length;
  const inProgressCount = reconciliations.filter(r => r.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-foreground">Reconciliation</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Reconcile your accounts and ensure accuracy</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Start Reconciliation</span>
            <span className="sm:hidden">Start</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Accounts</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{reconciliations.length}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <CheckSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Reconciled</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">{reconciledCount}</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Needs Review</p>
                  <p className="text-lg sm:text-2xl font-bold text-red-600 dark:text-red-400">{needsReviewCount}</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">In Progress</p>
                  <p className="text-lg sm:text-2xl font-bold text-orange-600 dark:text-orange-400">{inProgressCount}</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-card border-border">
          <CardContent className="p-3 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background text-foreground"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reconciliation List */}
        <Card className="bg-card border-border">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold text-foreground">Account Reconciliations</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground">{filteredReconciliations.length} accounts found</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mobile Card View */}
            <div className="block md:hidden">
              <div className="divide-y divide-border">
                {filteredReconciliations.map((recon) => (
                  <div key={recon.id} className="p-3 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="text-sm font-medium text-foreground">{recon.account}</div>
                        <div className="text-xs text-muted-foreground">{recon.period}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(recon.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          recon.status === 'Reconciled' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                          recon.status === 'Needs Review' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                          'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                        }`}>
                          {recon.status === 'Reconciled' ? 'OK' :
                           recon.status === 'Needs Review' ? 'Review' : 'Progress'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Statement</div>
                        <div className="text-sm font-medium text-foreground">{recon.statementBalance}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Book</div>
                        <div className="text-sm font-medium text-foreground">{recon.bookBalance}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Difference</div>
                        <div className={`text-sm font-medium ${
                          recon.difference === '$0.00' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {recon.difference}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Statement Balance</TableHead>
                      <TableHead>Book Balance</TableHead>
                      <TableHead>Difference</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Reconciled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReconciliations.map((recon) => (
                      <TableRow key={recon.id}>
                        <TableCell className="font-medium text-foreground">{recon.account}</TableCell>
                        <TableCell className="text-foreground">{recon.period}</TableCell>
                        <TableCell className="font-medium text-foreground">{recon.statementBalance}</TableCell>
                        <TableCell className="font-medium text-foreground">{recon.bookBalance}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            recon.difference === '$0.00' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {recon.difference}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(recon.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              recon.status === 'Reconciled' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                              recon.status === 'Needs Review' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                              'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                            }`}>
                              {recon.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {recon.lastReconciled || 'Not reconciled'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-start gap-3">
              <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-100 text-sm sm:text-base">Reconciliation Tips</h3>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-200 mt-1">
                  Regular reconciliation helps catch errors early and ensures your financial records are accurate. 
                  Reconcile your accounts monthly for best results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountingReconciliation;
