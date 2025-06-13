
import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface Transfer {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: string;
  status: string;
  date: string;
  reference: string;
}

interface TransferListDesktopProps {
  transfers: Transfer[];
}

const TransferListDesktop = ({ transfers }: TransferListDesktopProps) => {
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
    <div className="hidden md:block">
      <div className="overflow-x-auto p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Transfer ID</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">From Account</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">To Account</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer) => (
              <tr key={transfer.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-4 font-medium text-foreground">{transfer.id}</td>
                <td className="py-3 px-4 text-foreground">{transfer.fromAccount}</td>
                <td className="py-3 px-4 text-foreground">{transfer.toAccount}</td>
                <td className="py-3 px-4 font-medium text-foreground">{transfer.amount}</td>
                <td className="py-3 px-4">
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
                </td>
                <td className="py-3 px-4 text-muted-foreground">{transfer.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferListDesktop;
