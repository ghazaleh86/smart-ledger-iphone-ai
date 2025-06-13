
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import TransferStatsCards from '@/components/TransferStatsCards';
import TransferSearch from '@/components/TransferSearch';
import TransferListMobile from '@/components/TransferListMobile';
import TransferListDesktop from '@/components/TransferListDesktop';

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

  const transferStats = {
    totalTransfers: transfers.length,
    completedToday: transfers.filter(t => t.status === 'Completed' && t.date === '2024-06-07').length,
    pendingTransfers: transfers.filter(t => t.status === 'Pending').length,
    totalAmount: '$25,500.00'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-foreground">Bank Transfers</h1>
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
        <TransferStatsCards transferStats={transferStats} />

        {/* Search */}
        <TransferSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Transfers List */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold text-foreground">Recent Transfers</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{filteredTransfers.length} transfers found</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <TransferListMobile transfers={filteredTransfers} />
            <TransferListDesktop transfers={filteredTransfers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BankingTransfers;
