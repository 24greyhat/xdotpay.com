'use client'
import { ReactNode } from 'react';
import { DollarSign, Wallet } from 'lucide-react';


export function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-indigo-600 p-3 rounded-full">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-center mb-2">{title}</h1>
        <p className="text-center text-gray-600 mb-6">{subtitle}</p>

        {children}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Wallet className="w-4 h-4 mr-1" />
              No KYC/KYB
            </span>
            <span>•</span>
            <span>Open Source</span>
            <span>•</span>
            <span>Non-Custodial</span>
          </div>
        </div>
      </div>
    </div>
  );
}
