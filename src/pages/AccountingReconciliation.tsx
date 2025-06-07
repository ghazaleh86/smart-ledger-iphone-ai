
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Needs Review':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const reconciledCount = reconciliations.filter(r => r.status === 'Reconciled').length;
  const needsReviewCount = reconciliations.filter(r => r.status === 'Needs Review').length;
  const inProgressCount = reconciliations.filter(r => r.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Reconciliation</h1>
            <p className="text-sm text-gray-600 mt-1">Reconcile your accounts and ensure accuracy</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            Start Reconciliation
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
                  <p className="text-sm text-gray-600">Total Accounts</p>
                  <p className="text-2xl font-bold text-gray-900">{reconciliations.length}</p>
                </div>
                <CheckSquare className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Reconciled</p>
                  <p className="text-2xl font-bold text-green-600">{reconciledCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Needs Review</p>
                  <p className="text-2xl font-bold text-red-600">{needsReviewCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-orange-600">{inProgressCount}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reconciliation Table */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Account Reconciliations</CardTitle>
            <CardDescription>{filteredReconciliations.length} accounts found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Account</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Period</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Statement Balance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Book Balance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Difference</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Last Reconciled</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReconciliations.map((recon) => (
                    <tr key={recon.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{recon.account}</td>
                      <td className="py-3 px-4 text-gray-700">{recon.period}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{recon.statementBalance}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{recon.bookBalance}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${
                          recon.difference === '$0.00' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {recon.difference}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(recon.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            recon.status === 'Reconciled' ? 'bg-green-100 text-green-800' :
                            recon.status === 'Needs Review' ? 'bg-red-100 text-red-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {recon.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {recon.lastReconciled || 'Not reconciled'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckSquare className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">Reconciliation Tips</h3>
                <p className="text-sm text-blue-700 mt-1">
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
