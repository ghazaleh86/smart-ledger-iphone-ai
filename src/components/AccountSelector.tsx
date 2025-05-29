
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
    <div className="mb-8">
      {/* Mobile Layout */}
      <div className="block md:hidden text-center">
        <Select value={selectedAccount} onValueChange={onAccountChange}>
          <SelectTrigger className="w-auto min-w-[200px] mx-auto border-0 bg-transparent text-3xl font-medium text-gray-900 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0 justify-center font-[system-ui]">
            <span className="text-3xl font-medium text-gray-900">
              {selectedAccountData?.name || "Select account"}
            </span>
          </SelectTrigger>
          <SelectContent className="bg-white border-0 rounded-2xl shadow-xl z-50 backdrop-blur-xl border border-gray-100">
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id} className="cursor-pointer rounded-xl mx-2 my-1 hover:bg-gray-50 focus:bg-gray-50">
                <div className="flex justify-between items-center w-full min-w-[280px]">
                  <div className="text-left">
                    <div className="font-medium text-gray-900 text-base">{account.name}</div>
                    <div className="text-sm text-gray-500 font-normal">{account.type}</div>
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
        <div className="text-sm text-gray-500 mb-2 mt-6 font-normal tracking-normal">NET BALANCE</div>
        <div className="text-4xl font-medium text-gray-900 font-[system-ui]">
          ${selectedAccountData?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:justify-between md:items-center">
        <div className="flex items-center">
          <Select value={selectedAccount} onValueChange={onAccountChange}>
            <SelectTrigger className="w-auto min-w-[200px] border-0 bg-transparent text-3xl font-medium text-gray-900 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0 font-[system-ui]">
              <span className="text-3xl font-medium text-gray-900">
                {selectedAccountData?.name || "Select account"}
              </span>
            </SelectTrigger>
            <SelectContent className="bg-white border-0 rounded-2xl shadow-xl z-50 backdrop-blur-xl border border-gray-100">
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id} className="cursor-pointer rounded-xl mx-2 my-1 hover:bg-gray-50 focus:bg-gray-50">
                  <div className="flex justify-between items-center w-full min-w-[280px]">
                    <div className="text-left">
                      <div className="font-medium text-gray-900 text-base">{account.name}</div>
                      <div className="text-sm text-gray-500 font-normal">{account.type}</div>
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
        
        <div className="text-right">
          <div className="text-sm text-gray-500 mb-2 font-normal tracking-normal">NET BALANCE</div>
          <div className="text-4xl font-medium text-gray-900 font-[system-ui]">
            ${selectedAccountData?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSelector;
