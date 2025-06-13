
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Search, Filter, Download, Eye, Edit, Send } from 'lucide-react';

const SalesInvoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const invoices = [
    { id: "INV-001", customer: "Acme Corp", amount: "$5,200", status: "Paid", date: "2024-06-01", dueDate: "2024-06-15" },
    { id: "INV-002", customer: "Tech Solutions", amount: "$3,800", status: "Outstanding", date: "2024-06-03", dueDate: "2024-06-17" },
    { id: "INV-003", customer: "Global Industries", amount: "$12,500", status: "Paid", date: "2024-06-05", dueDate: "2024-06-19" },
    { id: "INV-004", customer: "StartupXYZ", amount: "$2,100", status: "Draft", date: "2024-06-06", dueDate: "2024-06-20" },
    { id: "INV-005", customer: "Enterprise Ltd", amount: "$8,900", status: "Outstanding", date: "2024-06-07", dueDate: "2024-06-21" },
    { id: "INV-006", customer: "Innovation Co", amount: "$4,300", status: "Overdue", date: "2024-05-15", dueDate: "2024-05-29" },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-foreground">Invoices</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Create and manage your sales invoices</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Invoice</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Outstanding</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">$16,000</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                  <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Overdue Invoices</p>
                  <p className="text-lg sm:text-2xl font-bold text-red-600 dark:text-red-400">$4,300</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                  <FileText className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Paid This Month</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">$17,700</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background text-foreground"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background text-foreground"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="outstanding">Outstanding</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Invoices List */}
        <Card className="bg-card border-border">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold text-foreground">All Invoices</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground">{filteredInvoices.length} invoices found</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mobile Card View */}
            <div className="block md:hidden">
              <div className="divide-y divide-border">
                {filteredInvoices.map((invoice) => (
                  <div key={invoice.id} className="p-3 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="text-sm font-medium text-foreground">{invoice.id}</div>
                        <div className="text-xs text-muted-foreground">{invoice.customer}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                          invoice.status === 'Outstanding' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' :
                          invoice.status === 'Overdue' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                          'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Amount</div>
                        <div className="text-sm font-medium text-foreground">{invoice.amount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Due Date</div>
                        <div className="text-sm text-foreground">{invoice.dueDate}</div>
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
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Invoice ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-foreground">{invoice.id}</td>
                        <td className="py-3 px-4 text-foreground">{invoice.customer}</td>
                        <td className="py-3 px-4 font-medium text-foreground">{invoice.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                            invoice.status === 'Outstanding' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' :
                            invoice.status === 'Overdue' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                            'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{invoice.dueDate}</td>
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

export default SalesInvoices;
