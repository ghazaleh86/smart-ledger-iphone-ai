
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeftRight, CheckCircle, Clock } from 'lucide-react';

interface TransferStatsCardsProps {
  transferStats: {
    totalTransfers: number;
    completedToday: number;
    pendingTransfers: number;
    totalAmount: string;
  };
}

const TransferStatsCards = ({ transferStats }: TransferStatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Card>
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Transfers</p>
              <p className="text-lg sm:text-2xl font-bold text-foreground">{transferStats.totalTransfers}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <ArrowLeftRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Completed Today</p>
              <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">{transferStats.completedToday}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Pending</p>
              <p className="text-lg sm:text-2xl font-bold text-orange-600 dark:text-orange-400">{transferStats.pendingTransfers}</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
              <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Amount</p>
              <p className="text-lg sm:text-2xl font-bold text-foreground">{transferStats.totalAmount}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <ArrowLeftRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferStatsCards;
