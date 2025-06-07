
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Vendors</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your vendor relationships and purchase history</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            Add Vendor
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
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">{vendor.name}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {vendor.status}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{vendor.rating}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{vendor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.location}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Total Spent</div>
                      <div className="font-semibold text-gray-900">{vendor.totalSpent}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Orders</div>
                      <div className="font-semibold text-gray-900">{vendor.ordersCount}</div>
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
