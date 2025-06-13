
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-6 px-8 shadow-sm border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Integrations</h1>
            <p className="text-sm text-muted-foreground mt-1">Connect with third-party services and applications</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{connectedCount} connected</span>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" />
              Request Integration
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
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
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Popular Integrations</CardTitle>
            <CardDescription>Most commonly used integrations by our users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIntegrations.filter(i => i.popular).map((integration) => (
                <div key={integration.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.logo}</span>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <span className="text-xs text-muted-foreground">{integration.category}</span>
                      </div>
                    </div>
                    {integration.status === 'Connected' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                  <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    integration.status === 'Connected'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}>
                    {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">All Integrations</CardTitle>
            <CardDescription>{filteredIntegrations.length} integrations available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredIntegrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{integration.logo}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{integration.name}</h3>
                        {integration.popular && (
                          <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs rounded-full">Popular</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                      <span className="text-xs text-muted-foreground">{integration.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      integration.status === 'Connected' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {integration.status}
                    </span>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      integration.status === 'Connected'
                        ? 'border border-border text-foreground hover:bg-muted'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
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
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <Puzzle className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Build Custom Integrations</h3>
              <p className="text-muted-foreground mb-4">
                Use our API to build custom integrations with your existing tools and workflows.
              </p>
              <button className="flex items-center gap-2 bg-purple-600 dark:bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors mx-auto">
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
