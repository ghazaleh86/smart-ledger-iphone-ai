
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

  return (
    <div className="mb-6">
      {/* Mobile Layout */}
      <div className="block md:hidden text-center">
        <Select value={selectedAccount} onValueChange={onAccountChange}>
          <SelectTrigger className="w-auto min-w-[200px] mx-auto border-0 bg-transparent text-2xl font-bold text-gray-900 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0">
            <span className="text-2xl font-bold text-gray-900">
              {selectedAccountData?.name || "Select account"}
            </span>
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id} className="cursor-pointer">
                <div className="flex justify-between items-center w-full min-w-[250px]">
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{account.name}</div>
                    <div className="text-xs text-gray-500">{account.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-sm text-gray-500 mb-1 mt-2">NET BALANCE</div>
        <div className="text-3xl font-bold text-gray-900">
          ${selectedAccountData?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:justify-between md:items-center">
        <div className="flex items-center">
          <Select value={selectedAccount} onValueChange={onAccountChange}>
            <SelectTrigger className="w-auto min-w-[200px] border-0 bg-transparent text-2xl font-bold text-gray-900 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0">
              <span className="text-2xl font-bold text-gray-900">
                {selectedAccountData?.name || "Select account"}
              </span>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id} className="cursor-pointer">
                  <div className="flex justify-between items-center w-full min-w-[250px]">
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{account.name}</div>
                      <div className="text-xs text-gray-500">{account.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500 mb-1">NET BALANCE</div>
          <div className="text-3xl font-bold text-gray-900">
            ${selectedAccountData?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSelector;
