
import React from 'react';
import { ArrowLeftRight, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface Transfer {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: string;
  status: string;
  date: string;
  reference: string;
}

interface TransferListMobileProps {
  transfers: Transfer[];
}

const TransferListMobile = ({ transfers }: TransferListMobileProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'Failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="block md:hidden">
      <div className="divide-y divide-border">
        {transfers.map((transfer) => (
          <div key={transfer.id} className="p-3 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <div className="text-sm font-medium text-foreground">{transfer.id}</div>
                <div className="text-xs text-muted-foreground">{transfer.reference}</div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(transfer.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  transfer.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                  transfer.status === 'Pending' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' :
                  'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                }`}>
                  {transfer.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3 pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">From:</span>
                <span className="text-sm font-medium text-foreground">{transfer.fromAccount}</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">To:</span>
                <span className="text-sm font-medium text-foreground">{transfer.toAccount}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <div className="text-xs text-muted-foreground">Amount</div>
                <div className="text-sm font-medium text-foreground">{transfer.amount}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Date</div>
                <div className="text-sm text-foreground">{transfer.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferListMobile;
