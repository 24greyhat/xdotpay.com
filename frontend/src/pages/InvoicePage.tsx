'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation"
import { Wallet, Check, Clock, X, Copy, ExternalLink } from 'lucide-react'
import { InvoiceSkeleton } from '../components/InvoiceSkeleton'

export default function Invoice() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const [loading, setLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const [paying, setPaying] = useState(false);

  // Simulate loading invoice data
  useEffect(() => {
    const loadInvoice = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
    };
    
    loadInvoice();
  }, [id]);

  // Mock invoice data - replace with actual API call
  const invoice = {
    id: id || '12345',
    amount: 100.00,
    status: 'pending', // pending, paid, failed
    merchant: 'Your Business Name',
    createdAt: '2025-12-01T10:30:00Z',
    dueDate: '2025-12-15T23:59:59Z',
    description: 'Premium Plan Subscription',
    recipientAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1'
  };

  // Show skeleton while loading
  if (loading) {
    return <InvoiceSkeleton />;
  }

  const handleConnectWallet = async () => {
    // Mock wallet connection - replace with actual Web3 logic
    setWalletConnected(true);
    setWalletAddress('0x1234...5678');
  };

  const handleDisconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
  };

  const handlePayNow = async () => {
    setPaying(true);
    // Mock payment - replace with actual payment logic
    setTimeout(() => {
      setPaying(false);
      alert('Payment successful!');
    }, 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(invoice.recipientAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { bg: 'bg-green-900/50', text: 'text-green-400', border: 'border-green-700', icon: Check, label: 'Paid' },
      pending: { bg: 'bg-yellow-900/50', text: 'text-yellow-400', border: 'border-yellow-700', icon: Clock, label: 'Pending' },
      failed: { bg: 'bg-red-900/50', text: 'text-red-400', border: 'border-red-700', icon: X, label: 'Failed' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${config.bg} ${config.text} ${config.border}`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-white mb-2">Invoice</h1>
          <p className="text-gray-400">Invoice #{invoice.id}</p>
        </div>

        {/* Main Invoice Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Status Bar */}
          <div className="bg-gray-750 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wallet className="w-5 h-5 text-indigo-400" />
              <span className="text-white">Payment Status</span>
            </div>
            {getStatusBadge(invoice.status)}
          </div>

          {/* Invoice Details */}
          <div className="p-6 space-y-6">
            {/* From/To Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">From</p>
                <p className="text-white">{invoice.merchant}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Invoice Date</p>
                <p className="text-white">{formatDate(invoice.createdAt)}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-400 text-sm mb-1">Description</p>
              <p className="text-white">{invoice.description}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700"></div>

            {/* Amount Section */}
            <div className="bg-gray-750 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${invoice.amount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-700 my-4"></div>
              <div className="flex items-center justify-between">
                <span className="text-white">Total Amount Due</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-2xl">${invoice.amount.toFixed(2)}</span>
                  <span className="text-indigo-400">USDC</span>
                </div>
              </div>
            </div>

            {/* Payment Address */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Payment Address</p>
              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm text-gray-300 font-mono break-all">
                    {invoice.recipientAddress}
                  </code>
                  <button
                    onClick={handleCopyAddress}
                    className="ml-3 text-gray-400 hover:text-gray-300 flex-shrink-0"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Alert/Note */}
            {invoice.status === 'pending' && (
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">Awaiting Payment</p>
                    <p className="text-blue-300 text-sm">
                      If you've already paid, please wait a few moments and refresh the page to see the updated status.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {invoice.status === 'paid' && (
              <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-400 font-medium mb-1">Payment Received</p>
                    <p className="text-green-300 text-sm">
                      Thank you! Your payment has been confirmed on the blockchain.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-750 border-t border-gray-700 px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Wallet Connect/Disconnect Button */}
              {!walletConnected ? (
                <button
                  onClick={handleConnectWallet}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Connect Wallet</span>
                </button>
              ) : (
                <button
                  onClick={handleDisconnectWallet}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Disconnect ({walletAddress})</span>
                </button>
              )}

              {/* Pay Now Button */}
              <button
                onClick={handlePayNow}
                disabled={!walletConnected || invoice.status === 'paid' || paying}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Pay ${invoice.amount.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {!walletConnected && (
              <p className="text-gray-400 text-sm text-center mt-3">
                Connect your wallet to pay this invoice
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-300 flex items-center space-x-1">
              <ExternalLink className="w-4 h-4" />
              <span>View on Explorer</span>
            </a>
            <span>•</span>
            <span>Powered by USDC Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
}