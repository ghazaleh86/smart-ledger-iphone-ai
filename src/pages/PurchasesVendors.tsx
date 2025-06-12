
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Plus, Search, Mail, Phone, MapPin, Star } from 'lucide-react';

const PurchasesVendors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const vendors = [
    {
      id: 1,
      name: "Office Supplies Co",
      email: "orders@officesupplies.com",
      phone: "+1 (555) 111-2222",
      location: "Dallas, TX",
      totalSpent: "$12,400",
      ordersCount: 24,
      rating: 4.8,
      status: "Active"
    },
    {
      id: 2,
      name: "Tech Equipment Inc",
      email: "sales@techequipment.com",
      phone: "+1 (555) 333-4444",
      location: "Seattle, WA",
      totalSpent: "$45,200",
      ordersCount: 8,
      rating: 4.9,
      status: "Active"
    },
    {
      id: 3,
      name: "Marketing Agency",
      email: "hello@marketingpro.com",
      phone: "+1 (555) 555-6666",
      location: "Los Angeles, CA",
      totalSpent: "$28,600",
      ordersCount: 6,
      rating: 4.5,
      status: "Active"
    },
    {
      id: 4,
      name: "Legal Services",
      email: "contact@legalservices.com",
      phone: "+1 (555) 777-8888",
      location: "Boston, MA",
      totalSpent: "$8,400",
      ordersCount: 3,
      rating: 4.7,
      status: "Inactive"
    }
  ];

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-3 sm:py-6 px-3 sm:px-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold">Vendors</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage your vendor relationships and purchase history</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm self-end">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Vendor</span>
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
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg font-semibold">{vendor.name}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {vendor.status}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-yellow-50 p-1 rounded">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 fill-current" />
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">{vendor.rating}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <div className="bg-blue-50 p-1 rounded">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                    <span>{vendor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <div className="bg-green-50 p-1 rounded">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <div className="bg-purple-50 p-1 rounded">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                    </div>
                    <span>{vendor.location}</span>
                  </div>
                </div>
                
                <div className="pt-3 sm:pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Total Spent</div>
                      <div className="font-semibold text-sm sm:text-base">{vendor.totalSpent}</div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Orders</div>
                      <div className="font-semibold text-sm sm:text-base">{vendor.ordersCount}</div>
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

export default PurchasesVendors;
