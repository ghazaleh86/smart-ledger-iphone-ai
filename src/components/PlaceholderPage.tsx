
import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          {description && (
            <p className="text-lg text-gray-600 mb-8">{description}</p>
          )}
          <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-200">
            <p className="text-gray-500">This page is coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
