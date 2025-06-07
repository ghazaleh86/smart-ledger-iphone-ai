
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, User, CreditCard, Bell, Shield, Building, Palette, Database } from 'lucide-react';

const Settings = () => {
  const settingsCategories = [
    {
      title: "Account Settings",
      description: "Manage your personal account preferences",
      icon: User,
      settings: [
        { name: "Profile Information", description: "Update your name, email, and contact details" },
        { name: "Password & Security", description: "Change password and security settings" },
        { name: "Notification Preferences", description: "Control email and push notifications" },
        { name: "Two-Factor Authentication", description: "Add an extra layer of security" }
      ]
    },
    {
      title: "Company Settings", 
      description: "Configure your business information",
      icon: Building,
      settings: [
        { name: "Company Profile", description: "Business name, address, and tax information" },
        { name: "Fiscal Year Settings", description: "Set your company's fiscal year dates" },
        { name: "Currency & Localization", description: "Default currency and regional settings" },
        { name: "Chart of Accounts", description: "Customize your accounting structure" }
      ]
    },
    {
      title: "Financial Settings",
      description: "Configure financial and accounting preferences", 
      icon: CreditCard,
      settings: [
        { name: "Bank Connections", description: "Manage connected bank accounts" },
        { name: "Payment Methods", description: "Credit cards and payment processors" },
        { name: "Invoice Templates", description: "Customize invoice layouts and branding" },
        { name: "Tax Settings", description: "Configure tax rates and compliance" }
      ]
    },
    {
      title: "System Settings",
      description: "Application preferences and data management",
      icon: SettingsIcon,
      settings: [
        { name: "Data Export", description: "Export your financial data" },
        { name: "Backup & Restore", description: "Manage data backups and recovery" },
        { name: "API Access", description: "Manage API keys and integrations" },
        { name: "Audit Logs", description: "View system activity and changes" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-6 px-8 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-600 mt-1">Configure your application preferences and account settings</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Profile</h3>
              <p className="text-sm text-gray-600">Update your info</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Bell className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-600">Control alerts</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Security</h3>
              <p className="text-sm text-gray-600">Privacy settings</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Data</h3>
              <p className="text-sm text-gray-600">Export & backup</p>
            </CardContent>
          </Card>
        </div>

        {/* Settings Categories */}
        <div className="space-y-8">
          {settingsCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-white">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <category.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div>
                        <h3 className="font-medium text-gray-900">{setting.name}</h3>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <div className="text-gray-400">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Section */}
        <Card className="bg-gray-900 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-300 mb-4">
              Contact our support team or check out our knowledge base for answers to common questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
              <button className="border border-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Knowledge Base
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
