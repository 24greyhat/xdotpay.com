import { useState } from 'react';
import { LogOut, DollarSign, FileText, CheckCircle, Clock, Key, Send, Copy, ExternalLink } from 'lucide-react';

const mockInvoices = [
  {
    id: 1,
    metadata: { orderId: 'ORD-001', product: 'Premium Plan' },
    from_address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
    tx_hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f',
    amount: 100.00,
    status: 'completed',
    created_at: '2025-11-28T10:30:00Z',
    updated_at: '2025-11-28T10:35:00Z'
  },
  {
    id: 2,
    metadata: { orderId: 'ORD-002', product: 'Basic Plan' },
    from_address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    tx_hash: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g',
    amount: 50.00,
    status: 'completed',
    created_at: '2025-11-29T14:20:00Z',
    updated_at: '2025-11-29T14:22:00Z'
  },
  {
    id: 3,
    metadata: { orderId: 'ORD-003', product: 'Enterprise Plan' },
    from_address: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
    tx_hash: '',
    amount: 500.00,
    status: 'pending',
    created_at: '2025-11-30T09:15:00Z',
    updated_at: '2025-11-30T09:15:00Z'
  },
  {
    id: 4,
    metadata: { orderId: 'ORD-004', product: 'Pro Plan' },
    from_address: '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
    tx_hash: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h',
    amount: 200.00,
    status: 'completed',
    created_at: '2025-11-27T16:45:00Z',
    updated_at: '2025-11-27T16:50:00Z'
  },
  {
    id: 5,
    metadata: { orderId: 'ORD-005', product: 'Basic Plan' },
    from_address: '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
    tx_hash: '',
    amount: 50.00,
    status: 'failed',
    created_at: '2025-11-26T11:00:00Z',
    updated_at: '2025-11-26T11:30:00Z'
  }
];

export function DashboardPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState('stats');
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const mockApiToken = 'usdc_live_sk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p';

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    if (id === 'token') {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    } else {
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const totalInvoices = mockInvoices.length;
  const completedInvoices = mockInvoices.filter(inv => inv.status === 'completed').length;
  const pendingInvoices = mockInvoices.filter(inv => inv.status === 'pending').length;
  const totalRevenue = mockInvoices
    .filter(inv => inv.status === 'completed')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateAddress = (address) => {
    if (!address) return 'N/A';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-900/50', text: 'text-green-400', border: 'border-green-700', icon: CheckCircle },
      pending: { bg: 'bg-yellow-900/50', text: 'text-yellow-400', border: 'border-yellow-700', icon: Clock },
      failed: { bg: 'bg-red-900/50', text: 'text-red-400', border: 'border-red-700', icon: Clock }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-sm border ${config.bg} ${config.text} ${config.border}`}>
        <Icon className="w-4 h-4" />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const CodeBlock = ({ code, id }) => (
    <div className="bg-black border border-gray-700 rounded-lg p-4 relative mt-4">
      <button
        onClick={() => handleCopy(code, id)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
      >
        <Copy className="w-4 h-4" />
      </button>
      <pre className="text-sm overflow-x-auto pr-8 text-gray-300">
        <code>{code}</code>
      </pre>
      {copiedCode === id && (
        <span className="absolute top-4 right-12 text-green-400 text-sm">
          Copied!
        </span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white">USDC Payment Dashboard</h1>
                <p className="text-sm text-gray-400">Merchant Portal</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 transition-colors ${
                activeTab === 'stats'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Invoice Statistics
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`py-4 px-1 border-b-2 transition-colors ${
                activeTab === 'docs'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              API Documentation
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Invoices</p>
                    <p className="text-white mt-1">{totalInvoices}</p>
                  </div>
                  <div className="bg-blue-900/50 p-3 rounded-full">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-white mt-1">${totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-900/50 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Completed</p>
                    <p className="text-white mt-1">{completedInvoices}</p>
                  </div>
                  <div className="bg-green-900/50 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending</p>
                    <p className="text-white mt-1">{pendingInvoices}</p>
                  </div>
                  <div className="bg-yellow-900/50 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Table */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-white">Recent Invoices</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-750">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-400">ID</th>
                      <th className="px-6 py-3 text-left text-gray-400">Amount (USDC)</th>
                      <th className="px-6 py-3 text-left text-gray-400">From Address</th>
                      <th className="px-6 py-3 text-left text-gray-400">Status</th>
                      <th className="px-6 py-3 text-left text-gray-400">Created At</th>
                      <th className="px-6 py-3 text-left text-gray-400">Metadata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {mockInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-750 transition-colors">
                        <td className="px-6 py-4 text-white">#{invoice.id}</td>
                        <td className="px-6 py-4 text-white">${invoice.amount.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <code className="text-sm text-gray-300 bg-gray-700 px-2 py-1 rounded">
                            {truncateAddress(invoice.from_address)}
                          </code>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{formatDate(invoice.created_at)}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {invoice.metadata?.product || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
              <h2 className="mb-4 text-white">Quick Start Guide</h2>
              <p className="text-gray-400 mb-6">
                Get started with the USDC Payment API in minutes. Follow these steps to integrate cryptocurrency payments into your application.
              </p>

              {/* API Token Management */}
              <div className="mb-8">
                <h3 className="mb-3 flex items-center text-white">
                  <Key className="w-5 h-5 mr-2 text-indigo-400" />
                  API Token Management
                </h3>
                
                <div className="bg-gray-750 border border-gray-600 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Your API Token</span>
                    <button
                      onClick={() => handleCopy(mockApiToken, 'token')}
                      className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copiedToken ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="text-sm bg-gray-900 border border-gray-700 text-gray-300 px-3 py-2 rounded block overflow-x-auto">
                    {mockApiToken}
                  </code>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-indigo-900/50 text-indigo-400 border border-indigo-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 mb-1">Generate a new token</p>
                      <code className="text-sm bg-gray-750 border border-gray-700 text-gray-400 px-3 py-2 rounded block">
                        POST /api/v1/tokens/generate
                      </code>
                      <p className="text-gray-400 text-sm mt-2">
                        Send a POST request with your account credentials to generate a new API token.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-indigo-900/50 text-indigo-400 border border-indigo-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 mb-1">Delete a token</p>
                      <code className="text-sm bg-gray-750 border border-gray-700 text-gray-400 px-3 py-2 rounded block">
                        DELETE /api/v1/tokens/:token_id
                      </code>
                      <p className="text-gray-400 text-sm mt-2">
                        Remove access for a specific token when it's no longer needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Making API Requests */}
              <div className="mb-8">
                <h3 className="mb-3 flex items-center text-white">
                  <Send className="w-5 h-5 mr-2 text-indigo-400" />
                  Making API Requests
                </h3>
                
                <p className="text-gray-400 mb-4">
                  All API requests must include your API token in the Authorization header:
                </p>

                <CodeBlock code="Authorization: Bearer YOUR_API_TOKEN" id="auth" />
              </div>

              {/* Create Invoice */}
              <div className="mb-8">
                <h3 className="mb-3 text-white">Create an Invoice</h3>
                <p className="text-gray-400 mb-4">
                  Create a new payment invoice for your customers:
                </p>

                <CodeBlock 
                  code={`curl -X POST https://api.yourapp.com/api/v1/invoices \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant": "your_username",
    "amount": 100.00,
    "metadata": {
      "order_id": "ORD-001",
      "customer_email": "customer@example.com"
    }
  }'`}
                  id="create-invoice"
                />

                <div className="mt-4 bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                  <h4 className="text-blue-400 mb-2">Request Parameters</h4>
                  <ul className="space-y-2 text-sm text-blue-300">
                    <li><code className="bg-blue-900/40 border border-blue-700 px-2 py-1 rounded">merchant</code> (string, required) - Your merchant username</li>
                    <li><code className="bg-blue-900/40 border border-blue-700 px-2 py-1 rounded">amount</code> (float, required) - Payment amount in USDC</li>
                    <li><code className="bg-blue-900/40 border border-blue-700 px-2 py-1 rounded">metadata</code> (object, optional) - Additional data about the invoice</li>
                  </ul>
                </div>
              </div>

              {/* View Invoice */}
              <div className="mb-8">
                <h3 className="mb-3 text-white">View Invoice Details</h3>
                <p className="text-gray-400 mb-4">
                  Retrieve the details of a specific invoice:
                </p>

                <CodeBlock 
                  code={`curl -X GET https://api.yourapp.com/api/v1/invoices/:invoice_id \\
  -H "Authorization: Bearer YOUR_API_TOKEN"`}
                  id="view-invoice"
                />

                <div className="mt-4 bg-green-900/20 border border-green-800 rounded-lg p-4">
                  <h4 className="text-green-400 mb-2">Response Example</h4>
                  <pre className="text-sm text-green-300 overflow-x-auto bg-gray-900 p-3 rounded border border-green-900">
                    <code>{JSON.stringify({
                      id: 1,
                      merchant: 'your_username',
                      amount: 100.00,
                      status: 'completed',
                      from_address: '0x742d35Cc...',
                      tx_hash: '0x1a2b3c4d...',
                      metadata: { order_id: 'ORD-001' },
                      created_at: '2025-11-30T10:30:00Z',
                      updated_at: '2025-11-30T10:35:00Z'
                    }, null, 2)}</code>
                  </pre>
                </div>
              </div>

              {/* Submit Payment */}
              <div className="mb-8">
                <h3 className="mb-3 text-white">Submit Payment Confirmation</h3>
                <p className="text-gray-400 mb-4">
                  Once a customer pays, submit the transaction details:
                </p>

                <CodeBlock 
                  code={`curl -X POST https://api.yourapp.com/api/v1/payments \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "invoice_id": 1,
    "from_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    "tx_hash": "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f"
  }'`}
                  id="payment"
                />
              </div>

              {/* Full Docs Link */}
              <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-700 rounded-lg p-6">
                <h3 className="text-indigo-300 mb-2">Complete API Documentation</h3>
                <p className="text-indigo-200 mb-4">
                  View the full API reference with detailed information about all endpoints, parameters, and response formats.
                </p>
                <a
                  href="https://docs.yourapp.com/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  <span>View Full Documentation</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
