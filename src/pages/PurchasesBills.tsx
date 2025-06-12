
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Search, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

const PurchasesBills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const bills = [
    { id: "BILL-001", vendor: "Office Supplies Co", amount: "$1,240", status: "Paid", date: "2024-06-01", dueDate: "2024-06-15" },
    { id: "BILL-002", vendor: "Tech Equipment Inc", amount: "$5,800", status: "Pending", date: "2024-06-03", dueDate: "2024-06-17" },
    { id: "BILL-003", vendor: "Marketing Agency", amount: "$3,200", status: "Overdue", date: "2024-05-20", dueDate: "2024-06-05" },
    { id: "BILL-004", vendor: "Legal Services", amount: "$2,100", status: "Draft", date: "2024-06-06", dueDate: "2024-06-20" },
    { id: "BILL-005", vendor: "Cloud Services", amount: "$890", status: "Paid", date: "2024-06-01", dueDate: "2024-06-15" },
  ];

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bill.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold">Bills</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage and track all your purchase bills and expenses</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Bill</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Outstanding</p>
                  <p className="text-lg sm:text-2xl font-bold">$11,090</p>
                </div>
                <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Overdue Bills</p>
                  <p className="text-lg sm:text-2xl font-bold text-red-600">$3,200</p>
                </div>
                <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Paid This Month</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">$2,130</p>
                </div>
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search bills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Bills List */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold">All Bills</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{filteredBills.length} bills found</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mobile Card View */}
            <div className="block md:hidden">
              <div className="divide-y divide-border">
                {filteredBills.map((bill) => (
                  <div key={bill.id} className="p-3 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="text-sm font-medium">{bill.id}</div>
                        <div className="text-xs text-muted-foreground">{bill.vendor}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          bill.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          bill.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                          bill.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {bill.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Amount</div>
                        <div className="text-sm font-medium">{bill.amount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Due Date</div>
                        <div className="text-sm">{bill.dueDate}</div>
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
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Bill ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Vendor</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBills.map((bill) => (
                      <tr key={bill.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{bill.id}</td>
                        <td className="py-3 px-4">{bill.vendor}</td>
                        <td className="py-3 px-4 font-medium">{bill.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            bill.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            bill.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                            bill.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {bill.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{bill.dueDate}</td>
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

export default PurchasesBills;
