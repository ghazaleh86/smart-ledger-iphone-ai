
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Puzzle, Plus, Search, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const integrations = [
    {
      id: 1,
      name: "Stripe",
      description: "Accept online payments and manage subscriptions",
      category: "Payments",
      status: "Connected",
      logo: "💳",
      popular: true
    },
    {
      id: 2,
      name: "QuickBooks Online",
      description: "Sync accounting data and financial records",
      category: "Accounting",
      status: "Available",
      logo: "📊",
      popular: true
    },
    {
      id: 3,
      name: "Shopify",
      description: "Import sales data from your online store",
      category: "E-commerce",
      status: "Available",
      logo: "🛍️",
      popular: true
    },
    {
      id: 4,
      name: "PayPal",
      description: "Process payments and track transactions",
      category: "Payments",
      status: "Connected",
      logo: "💰",
      popular: false
    },
    {
      id: 5,
      name: "Slack",
      description: "Get financial alerts and notifications",
      category: "Communication",
      status: "Available",
      logo: "💬",
      popular: false
    },
    {
      id: 6,
      name: "Xero",
      description: "Alternative accounting software integration",
      category: "Accounting",
      status: "Available",
      logo: "📈",
      popular: false
    },
    {
      id: 7,
      name: "Square",
      description: "Point of sale and payment processing",
      category: "Payments",
      status: "Available",
      logo: "⚡",
      popular: true
    },
    {
      id: 8,
      name: "HubSpot CRM",
      description: "Sync customer data and sales information",
      category: "CRM",
      status: "Available",
      logo: "👥",
      popular: false
    }
  ];

  const categories = ["All", "Payments", "Accounting", "E-commerce", "Communication", "CRM"];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || integration.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const connectedCount = integrations.filter(i => i.status === 'Connected').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
            <p className="text-sm text-gray-600 mt-1">Connect with third-party services and applications</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{connectedCount} connected</span>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              Request Integration
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-6">
        {/* Filters */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category === 'All' ? 'all' : category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Popular Integrations */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Popular Integrations</CardTitle>
            <CardDescription>Most commonly used integrations by our users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIntegrations.filter(i => i.popular).map((integration) => (
                <div key={integration.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.logo}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{integration.name}</h3>
                        <span className="text-xs text-gray-500">{integration.category}</span>
                      </div>
                    </div>
                    {integration.status === 'Connected' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                  <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    integration.status === 'Connected'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Integrations */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">All Integrations</CardTitle>
            <CardDescription>{filteredIntegrations.length} integrations available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredIntegrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{integration.logo}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{integration.name}</h3>
                        {integration.popular && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Popular</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                      <span className="text-xs text-gray-500">{integration.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      integration.status === 'Connected' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {integration.status}
                    </span>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      integration.status === 'Connected'
                        ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Developer Section */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <Puzzle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Custom Integrations</h3>
              <p className="text-gray-600 mb-4">
                Use our API to build custom integrations with your existing tools and workflows.
              </p>
              <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors mx-auto">
                <ExternalLink className="h-4 w-4" />
                View API Documentation
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;
