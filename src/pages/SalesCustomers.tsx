
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your customer relationships and information</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-6">
        {/* Search */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">{customer.name}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{customer.location}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                      <div className="font-semibold text-gray-900">{customer.totalRevenue}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Invoices</div>
                      <div className="font-semibold text-gray-900">{customer.invoicesCount}</div>
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
