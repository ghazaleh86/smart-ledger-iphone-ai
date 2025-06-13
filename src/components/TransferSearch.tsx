
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface TransferSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TransferSearch = ({ searchTerm, onSearchChange }: TransferSearchProps) => {
  return (
    <Card>
      <CardContent className="p-3 sm:p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search transfers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-background text-foreground"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransferSearch;
