'use client'

import { Suspense, useEffect, useState } from 'react'
import { notFound, useSearchParams } from "next/navigation"
import { Wallet, Check, Clock, X, Copy, ExternalLink, AlertCircle } from 'lucide-react'
import PayButton from '../../components/payment/PayButton';
import InvoiceSkeleton from './loading';
import { API_URL } from '../../config/env';


export default function Invoice() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");




  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);


  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: 'bg-green-900/50', text: 'text-green-400', border: 'border-green-700', icon: Check, label: 'Paid' },
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




  const fetchInvoice = async () => {

    setLoading(true);

    const response = await fetch(API_URL + `v1/view/invoice?id=${id}`, {
      method: "GET"
    }).catch(() => {
      return notFound();
    });

    if (response.ok) {
      const data = await response.json();

      setInvoice(data);
    }
    else {
      return notFound();
    }

    setLoading(false);
  }



  useEffect(() => {
    if (!loading && !invoice)
      fetchInvoice();
  }, [!invoice, !loading])


  if (loading || !invoice)
    return <InvoiceSkeleton />


  return (
    <Suspense
      fallback={<InvoiceSkeleton />}
    >
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
                  <p className="text-white">{invoice.merchant.username}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Invoice Date</p>
                  <p className="text-white">{formatDate(invoice.created_at)}</p>
                </div>
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


              {invoice.status === 'failed' && (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-400 font-medium mb-1">Payment Failed</p>
                      <p className="text-red-300 text-sm">
                        Payment failed due to unknown reasons.
                      </p>
                    </div>
                  </div>
                </div>
              )}


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

              {invoice.status === 'confirmed' && (
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

                {/* Pay Now Button */}
                {
                  invoice.status === "confirmed"
                    ?
                    null
                    :
                    <PayButton
                      invoiceId={invoice.id}
                      amount={invoice.amount}
                      merchantWallet={invoice.merchant.merchant_address}
                      setLoading={setLoading}
                      loading={loading}
                    />
                }
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <span>Powered by X.Pay</span>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

