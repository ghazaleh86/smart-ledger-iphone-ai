
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, Plus, Search, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

const BankingTransfers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const transfers = [
    {
      id: "TXN-001",
      fromAccount: "Business Checking",
      toAccount: "Business Savings",
      amount: "$5,000.00",
      status: "Completed",
      date: "2024-06-07",
      description: "Monthly savings transfer"
    },
    {
      id: "TXN-002",
      fromAccount: "Business Checking",
      toAccount: "Payroll Account",
      amount: "$15,000.00",
      status: "Processing",
      date: "2024-06-06",
      description: "Payroll funding"
    },
    {
      id: "TXN-003",
      fromAccount: "Business Savings",
      toAccount: "Business Checking",
      amount: "$2,500.00",
      status: "Completed",
      date: "2024-06-05",
      description: "Operating expense funding"
    },
    {
      id: "TXN-004",
      fromAccount: "Business Checking",
      toAccount: "External - Vendor Payment",
      amount: "$3,200.00",
      status: "Failed",
      date: "2024-06-04",
      description: "Vendor payment - insufficient funds"
    },
    {
      id: "TXN-005",
      fromAccount: "Payroll Account",
      toAccount: "Business Checking",
      amount: "$1,200.00",
      status: "Completed",
      date: "2024-06-03",
      description: "Excess payroll return"
    }
  ];

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.fromAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.toAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transfer.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Processing':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Bank Transfers</h1>
            <p className="text-sm text-gray-600 mt-1">Track and manage transfers between accounts</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            New Transfer
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Transfers</p>
                  <p className="text-2xl font-bold text-gray-900">{transfers.length}</p>
                </div>
                <ArrowRightLeft className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {transfers.filter(t => t.status === 'Completed').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Processing</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {transfers.filter(t => t.status === 'Processing').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Failed</p>
                  <p className="text-2xl font-bold text-red-600">
                    {transfers.filter(t => t.status === 'Failed').length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search transfers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Transfers Table */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Transfer History</CardTitle>
            <CardDescription>{filteredTransfers.length} transfers found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Transfer ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">From</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">To</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransfers.map((transfer) => (
                    <tr key={transfer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{transfer.id}</td>
                      <td className="py-3 px-4 text-gray-700">{transfer.fromAccount}</td>
                      <td className="py-3 px-4 text-gray-700">{transfer.toAccount}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{transfer.amount}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(transfer.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transfer.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            transfer.status === 'Processing' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {transfer.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{transfer.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BankingTransfers;
