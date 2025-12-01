'use client'
import { useEffect, useState } from 'react';
import { DollarSign, FileText, CheckCircle, Clock, Key, Send, Copy, ExternalLink, Github, Loader2 } from 'lucide-react';
import { getToken, toAuthHeaders } from "@/config/auth";
import { useRouter } from 'next/navigation';
import { API_URL } from "@/config/env";
import Link from 'next/link';




export default function Home() {


  // nav state
  const [activeTab, setActiveTab] = useState('stats');


  // authentication states
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [apiToken, setApiToken] = useState(false);
  const [account, setAccount] = useState(false);


  // stats states
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [completedInvoices, setCompletedInvoices] = useState(0);
  const [pendingInvoices, setPendingInvoices] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);



  // invoices state
  const [invoices, setInvoices] = useState([]);



  const router = useRouter();



  const fetchInvoices = async () => {

    setLoading(true);

    const response = await fetch(API_URL + "v1/view/invoices",
      {
        method: "GET",
        headers: toAuthHeaders({})
      });


    if (response.ok) {
      const data = await response.json();

      setInvoices(data);


    }

    setLoading(false);

  }


  const fetchStats = async () => {

    setLoading(true);

    const response = await fetch(API_URL + "v1/view/stats",
      {
        method: "GET",
        headers: toAuthHeaders({})
      });


    if (response.ok) {
      const data = await response.json();

      setTotalInvoices(data.invoices);

      setTotalRevenue(data.revenue);

      setPendingInvoices(data.pending);

      setCompletedInvoices(data.completed);

    }

    setLoading(false);
  }



  useEffect(() => {
    if (!invoices.length && !fetched) {
      fetchInvoices();
      fetchStats();
      setFetched(true);
    }
  }, [!invoices.length])



  const fetchAccount = async () => {

    setLoading(true);

    const response = await fetch(API_URL + `auth/account`, {
      method: "GET",
      headers: toAuthHeaders({})
    });


    if (response.ok) {
      const dat = await response.json();
      setAccount(dat);
    }

    if (response.status === 401) {
      return router.push("/login");
    }

    setLoading(false);
  }


  useEffect(() => {
    if (!account && apiToken) {
      fetchAccount();
    }
  }, [!account, apiToken])



  useEffect(() => {

    const tok = getToken();

    if (tok) {
      setApiToken(tok);
    }

    else {
      return router.push("/login");
    }

  }, [!apiToken])



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
      confirmed: { bg: 'bg-green-900/50', text: 'text-green-400', border: 'border-green-700', icon: CheckCircle },
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
              <img src="/xdotpay.png" className='w-20 h-20' />
              <div>

                <h1 className="text-white">Payment Dashboard</h1>
                <p className="text-sm text-gray-400">Merchant Portal</p>
              </div>
            </div>
            <Link
              href={"https://github.com/24greyhat/xdotpay.com"}
              target='_blank'
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>Repo</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 transition-colors ${activeTab === 'stats'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
            >
              Invoice Statistics
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`py-4 px-1 border-b-2 transition-colors ${activeTab === 'docs'
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
                    {
                      loading
                        ?
                        <Loader2 className='animate-spin' />
                        :
                        <p className="text-white mt-1">{totalInvoices}</p>
                    }
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

                    {
                      loading
                        ?
                        <Loader2 className='animate-spin' />
                        :
                        <p className="text-white mt-1">${totalRevenue.toFixed(2)}</p>
                    }
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
                    {
                      loading ?
                        <Loader2 className='animate-spin' />
                        :
                        <p className="text-white mt-1">{completedInvoices}</p>
                    }
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
                    {
                      loading
                        ?
                        <Loader2 className='animate-spin' />
                        :
                        <p className="text-white mt-1">{pendingInvoices}</p>
                    }
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
                    {invoices.map((invoice) => (
                      <tr onClick={() => router.push(`/invoice?id=${invoice.id}`)} key={invoice.id} className="hover:bg-gray-750 transition-colors">
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


            {loading &&
              <div
                className='w-full flex flex-row justify-center'
              >
                <Loader2 className='animate-spin' />
              </div>
            }


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
                      onClick={() => handleCopy(apiToken, 'token')}
                      className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copiedToken ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="text-sm bg-gray-900 border border-gray-700 text-gray-300 px-3 py-2 rounded block overflow-x-auto">
                    {apiToken}
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
                        POST /api/auth/login
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
                        POST /api/auth/logout
                      </code>
                      <p className="text-gray-400 text-sm mt-2">
                        Send a POST request with your token to remove access for it when it's no longer needed.
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
                  code={`curl -X POST https://api.xdotpay.com/api/v1/new/invoice \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
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
                  code={`curl -X GET https://api.xdotpay.com/api/v1/view/invoice?invoice_id={id}`}
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

              {/* Full Docs Link */}
              <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-700 rounded-lg p-6">
                <h3 className="text-indigo-300 mb-2">Complete API Documentation</h3>
                <p className="text-indigo-200 mb-4">
                  View the full API reference with detailed information about all endpoints, parameters, and response formats.
                </p>
                <a
                  href="https://api.xdotpay.com/api/docs"
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

