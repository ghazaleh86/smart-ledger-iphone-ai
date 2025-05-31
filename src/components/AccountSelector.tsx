
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
    "☕ Your coffee budget could fund a small country's economy",
    "🚀 Spending 23% less on takeout - you're crushing it!",
    "💡 Pro tip: You've got enough for that vacation fund goal",
    "🎉 Best spending streak this year - keep the momentum!"
  ];

  const randomInsight = insights[Math.floor(Math.random() * insights.length)];

  return (
    <div className="mb-12">
      {/* Mobile Layout */}
      <div className="block md:hidden text-center">
        <Select value={selectedAccount} onValueChange={onAccountChange}>
          <SelectTrigger className="w-auto min-w-[200px] mx-auto border-0 bg-transparent text-2xl font-medium text-gray-900 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0 justify-center">
            <span className="text-2xl font-medium text-gray-900">
              {selectedAccountData?.name || "Select account"}
            </span>
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id} className="cursor-pointer rounded-md mx-1 my-0.5 hover:bg-gray-50 focus:bg-gray-50">
                <div className="flex justify-between items-center w-full min-w-[280px]">
                  <div className="text-left">
                    <div className="font-medium text-gray-900 text-base">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 text-base">
                      ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-xs text-gray-500 mb-2 mt-8 uppercase tracking-wide font-medium">NET BALANCE</div>
        <div className="text-3xl font-semibold text-gray-900">
          ${selectedAccountData?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="mt-4 text-sm text-gray-600 font-medium px-4">
          <div className="bg-gradient-to-r from-pink-50 to-yellow-50 border border-pink-100/30 rounded-lg px-4 py-3 mx-2">
            {randomInsight}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:justify-between md:items-start">
        <div className="flex flex-col">
          <div className="flex items-center mb-6">
            <Select value={selectedAccount} onValueChange={onAccountChange}>
              <SelectTrigger className="w-auto min-w-[200px] border-0 bg-transparent text-2xl font-medium text-gray-900 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0">
                <span className="text-2xl font-medium text-gray-900">
                  {selectedAccountData?.name || "Select account"}
                </span>
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id} className="cursor-pointer rounded-md mx-1 my-0.5 hover:bg-gray-50 focus:bg-gray-50">
                    <div className="flex justify-between items-center w-full min-w-[280px]">
                      <div className="text-left">
                        <div className="font-medium text-gray-900 text-base">{account.name}</div>
                        <div className="text-sm text-gray-500">{account.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 text-base">
                          ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600 font-medium max-w-md">
            <div className="bg-gradient-to-r from-pink-50 to-yellow-50 border border-pink-100/30 rounded-lg px-4 py-3">
              {randomInsight}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">NET BALANCE</div>
          <div className="text-3xl font-semibold text-gray-900">
            ${selectedAccountData?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSelector;
