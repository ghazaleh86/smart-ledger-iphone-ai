
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
}

interface AccountSelectorProps {
  accounts: Account[];
  selectedAccount: string;
  onAccountChange: (accountId: string) => void;
}

const AccountSelector = ({ accounts, selectedAccount, onAccountChange }: AccountSelectorProps) => {
  const selectedAccountData = accounts.find(acc => acc.id === selectedAccount);

  const insights = [
    "🎯 You're on track to save $500 more than last month!",
    "💰 Emergency fund goal is 67% complete - keep going!",
    "📈 Savings rate increased by 15% this quarter",
    "🏆 You've saved $1,200 toward your vacation goal",
    "✨ On pace to reach your annual savings target early!"
  ];

  const randomInsight = insights[Math.floor(Math.random() * insights.length)];

  return (
    <div className="mb-12">
      {/* Mobile Layout */}
      <div className="block md:hidden text-center">
        <Select value={selectedAccount} onValueChange={onAccountChange}>
          <SelectTrigger className="w-auto min-w-[200px] mx-auto border-0 bg-transparent text-2xl font-medium text-foreground hover:bg-muted/50 focus:ring-0 focus:ring-offset-0 justify-center">
            <span className="text-2xl font-medium text-foreground">
              {selectedAccountData?.name || "Select account"}
            </span>
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border rounded-lg shadow-lg z-50">
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id} className="cursor-pointer rounded-md mx-1 my-0.5 hover:bg-accent focus:bg-accent">
                <div className="flex justify-between items-center w-full min-w-[280px]">
                  <div className="text-left">
                    <div className="font-medium text-foreground text-base">{account.name}</div>
                    <div className="text-sm text-muted-foreground">{account.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground text-base">
                      ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-xs text-muted-foreground mb-2 mt-8 uppercase tracking-wide font-medium">NET BALANCE</div>
        <div className="text-3xl font-semibold text-foreground">
          ${selectedAccountData?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="mt-4 text-sm text-foreground font-medium px-4">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border border-blue-200/50 dark:border-blue-800/30 rounded-lg px-4 py-3 mx-2 shadow-sm">
            {randomInsight}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:justify-between md:items-start">
        <div className="flex flex-col">
          <div className="flex items-center mb-6">
            <Select value={selectedAccount} onValueChange={onAccountChange}>
              <SelectTrigger className="w-auto min-w-[200px] border-0 bg-transparent text-2xl font-medium text-foreground hover:bg-muted/50 focus:ring-0 focus:ring-offset-0">
                <span className="text-2xl font-medium text-foreground">
                  {selectedAccountData?.name || "Select account"}
                </span>
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border rounded-lg shadow-lg z-50">
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id} className="cursor-pointer rounded-md mx-1 my-0.5 hover:bg-accent focus:bg-accent">
                    <div className="flex justify-between items-center w-full min-w-[280px]">
                      <div className="text-left">
                        <div className="font-medium text-foreground text-base">{account.name}</div>
                        <div className="text-sm text-muted-foreground">{account.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground text-base">
                          ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-foreground font-medium max-w-md">
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border border-blue-200/50 dark:border-blue-800/30 rounded-lg px-4 py-3 shadow-sm">
              {randomInsight}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-medium">NET BALANCE</div>
          <div className="text-3xl font-semibold text-foreground">
            ${selectedAccountData?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSelector;
