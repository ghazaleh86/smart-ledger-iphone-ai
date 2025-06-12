
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Plus, Search, Mail, Phone, MapPin, Building } from 'lucide-react';

const SalesCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 1,
      name: "Acme Corp",
      email: "contact@acmecorp.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      totalRevenue: "$52,400",
      invoicesCount: 12,
      status: "Active"
    },
    {
      id: 2,
      name: "Tech Solutions",
      email: "hello@techsolutions.io",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      totalRevenue: "$38,200",
      invoicesCount: 8,
      status: "Active"
    },
    {
      id: 3,
      name: "Global Industries",
      email: "info@globalind.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      totalRevenue: "$125,600",
      invoicesCount: 15,
      status: "Active"
    },
    {
      id: 4,
      name: "StartupXYZ",
      email: "team@startupxyz.com",
      phone: "+1 (555) 321-0987",
      location: "Austin, TX",
      totalRevenue: "$12,800",
      invoicesCount: 4,
      status: "Inactive"
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold">Customers</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage your customer relationships and information</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Customer</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Search */}
        <Card>
          <CardContent className="p-3 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg font-semibold">{customer.name}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{customer.location}</span>
                  </div>
                </div>
                
                <div className="pt-3 sm:pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Total Revenue</div>
                      <div className="font-semibold text-sm sm:text-base">{customer.totalRevenue}</div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Invoices</div>
                      <div className="font-semibold text-sm sm:text-base">{customer.invoicesCount}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesCustomers;
