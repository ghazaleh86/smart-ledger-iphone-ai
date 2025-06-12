
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftRight, Plus, Search, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const BankingTransfers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const transfers = [
    {
      id: "TXN-001",
      fromAccount: "Business Checking",
      toAccount: "Business Savings",
      amount: "$5,000.00",
      status: "Completed",
      date: "2024-06-07",
      reference: "Monthly savings transfer"
    },
    {
      id: "TXN-002", 
      fromAccount: "Business Savings",
      toAccount: "Payroll Account",
      amount: "$15,000.00",
      status: "Pending",
      date: "2024-06-07",
      reference: "Payroll funding"
    },
    {
      id: "TXN-003",
      fromAccount: "Business Checking",
      toAccount: "Tax Reserve",
      amount: "$3,500.00",
      status: "Completed",
      date: "2024-06-06",
      reference: "Quarterly tax reserve"
    },
    {
      id: "TXN-004",
      fromAccount: "Investment Account",
      toAccount: "Business Checking",
      amount: "$2,000.00",
      status: "Failed",
      date: "2024-06-05",
      reference: "Investment withdrawal"
    }
  ];

  const filteredTransfers = transfers.filter(transfer =>
    transfer.fromAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.toAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'Failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const transferStats = {
    totalTransfers: transfers.length,
    completedToday: transfers.filter(t => t.status === 'Completed' && t.date === '2024-06-07').length,
    pendingTransfers: transfers.filter(t => t.status === 'Pending').length,
    totalAmount: '$25,500.00'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold">Bank Transfers</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Transfer funds between your accounts</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Transfer</span>
            <span className="sm:hidden">Transfer</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Transfers</p>
                  <p className="text-lg sm:text-2xl font-bold">{transferStats.totalTransfers}</p>
                </div>
                <ArrowLeftRight className="h-5 w-5 sm:h-8 sm:w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Completed Today</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">{transferStats.completedToday}</p>
                </div>
                <CheckCircle className="h-5 w-5 sm:h-8 sm:w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pending</p>
                  <p className="text-lg sm:text-2xl font-bold text-orange-600">{transferStats.pendingTransfers}</p>
                </div>
                <Clock className="h-5 w-5 sm:h-8 sm:w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg sm:text-2xl font-bold">{transferStats.totalAmount}</p>
                </div>
                <ArrowLeftRight className="h-5 w-5 sm:h-8 sm:w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-3 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search transfers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Transfers List */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Recent Transfers</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{filteredTransfers.length} transfers found</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mobile Card View */}
            <div className="block md:hidden">
              <div className="divide-y divide-border">
                {filteredTransfers.map((transfer) => (
                  <div key={transfer.id} className="p-3 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="text-sm font-medium">{transfer.id}</div>
                        <div className="text-xs text-muted-foreground">{transfer.reference}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transfer.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transfer.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          transfer.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {transfer.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">From:</span>
                        <span className="text-sm font-medium">{transfer.fromAccount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowLeftRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">To:</span>
                        <span className="text-sm font-medium">{transfer.toAccount}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Amount</div>
                        <div className="text-sm font-medium">{transfer.amount}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Date</div>
                        <div className="text-sm">{transfer.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Transfer ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">From Account</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">To Account</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransfers.map((transfer) => (
                      <tr key={transfer.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{transfer.id}</td>
                        <td className="py-3 px-4">{transfer.fromAccount}</td>
                        <td className="py-3 px-4">{transfer.toAccount}</td>
                        <td className="py-3 px-4 font-medium">{transfer.amount}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(transfer.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              transfer.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              transfer.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {transfer.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{transfer.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BankingTransfers;
