import { Book, Terminal, FileCode, Play, Download, Settings, CheckCircle, AlertCircle, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function ApiSetup() {
  const [copiedStep, setCopiedStep] = useState(null);

  const handleCopy = (text, step) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300">
              <Book className="w-4 h-4 mr-2" />
              Back to Documentation
            </Link>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm">
              <Link to="/dashboard-setup" className="text-gray-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Server className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white">API Setup Guide</h1>
              <p className="text-gray-400">Run the XdotPay API locally</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-white mb-3">Overview</h2>
          <p className="text-gray-300 mb-4">
            The XdotPay API is a Django-based application that powers the non-custodial USDC payment gateway. This guide will walk you through setting up and running the API server locally for development and testing purposes.
          </p>

          <div className="bg-indigo-900/20 border border-indigo-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-indigo-300 font-medium mb-1">Prerequisites</p>
                <ul className="text-indigo-200 text-sm space-y-1">
                  <li>• Python 3.8 or higher installed</li>
                  <li>• pip package manager</li>
                  <li>• Git (to clone the repository)</li>
                  <li>• Access to an Ethereum RPC node (e.g., Infura, Alchemy, or your own node)</li>
                  <li>• Virtual environment tool (venv or virtualenv)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="space-y-6">
          {/* Step 1: Clone Repository */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2 flex items-center">
                  <Download className="w-5 h-5 mr-2 text-indigo-400" />
                  Clone the Repository
                </h3>
                <p className="text-gray-300 mb-3">
                  First, clone the XdotPay API repository from GitHub:
                </p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">git clone https://github.com/24greyhat/xdotpay.com.git
                      ;cd xdotpay.com/xdotpayApi</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('git clone https://github.com/24greyhat/xdotpay.com.git; cd xdotpay.com/xdotpayApi', 1)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 1 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-xs">Copy</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Create Virtual Environment */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2 flex items-center">
                  <Terminal className="w-5 h-5 mr-2 text-indigo-400" />
                  Create Virtual Environment
                </h3>
                <p className="text-gray-300 mb-3">
                  Create and activate a Python virtual environment:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Create the virtual environment:</p>
                    <div className="relative">
                      <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                        <code className="text-sm text-gray-300">python -m venv venv</code>
                      </pre>
                      <button
                        onClick={() => handleCopy('python -m venv venv', 2)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                      >
                        {copiedStep === 2 ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <span className="text-xs">Copy</span>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Activate the virtual environment:</p>
                    <div className="space-y-2">
                      <div className="relative">
                        <p className="text-gray-500 text-xs mb-1">On Linux/Mac:</p>
                        <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                          <code className="text-sm text-gray-300">source venv/bin/activate</code>
                        </pre>
                        <button
                          onClick={() => handleCopy('source venv/bin/activate', 3)}
                          className="absolute top-6 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                        >
                          {copiedStep === 3 ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <span className="text-xs">Copy</span>
                          )}
                        </button>
                      </div>

                      <div className="relative">
                        <p className="text-gray-500 text-xs mb-1">On Windows:</p>
                        <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                          <code className="text-sm text-gray-300">venv\Scripts\activate</code>
                        </pre>
                        <button
                          onClick={() => handleCopy('venv\\Scripts\\activate', 4)}
                          className="absolute top-6 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                        >
                          {copiedStep === 4 ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <span className="text-xs">Copy</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Install Dependencies */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2 flex items-center">
                  <Terminal className="w-5 h-5 mr-2 text-indigo-400" />
                  Install Dependencies
                </h3>
                <p className="text-gray-300 mb-3">
                  Install all required Python packages from the requirements file:
                </p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">pip install -r requirements.txt</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('pip install -r requirements.txt', 5)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 5 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-xs">Copy</span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  This will install Django and all necessary dependencies including web3.py for Ethereum blockchain interaction.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Create Environment File */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2 flex items-center">
                  <FileCode className="w-5 h-5 mr-2 text-indigo-400" />
                  Create Environment File
                </h3>
                <p className="text-gray-300 mb-3">
                  Create a <code className="text-indigo-400 bg-gray-750 px-2 py-0.5 rounded">.env</code> file in the root directory of the project:
                </p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">touch .env</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('touch .env', 6)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 6 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-xs">Copy</span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  On Windows, you can create the file manually or use: <code className="text-indigo-400 bg-gray-750 px-2 py-0.5 rounded">type nul &gt; .env</code>
                </p>
              </div>
            </div>
          </div>

          {/* Step 5: Configure Environment Variables */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">5</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-indigo-400" />
                  Configure Environment Variables
                </h3>
                <p className="text-gray-300 mb-3">
                  Open the <code className="text-indigo-400 bg-gray-750 px-2 py-0.5 rounded">.env</code> file and add the following configuration:
                </p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">ETH_RPC=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('ETH_RPC=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID', 7)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 7 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-xs">Copy</span>
                    )}
                  </button>
                </div>

                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mt-4">
                  <p className="text-blue-300 font-medium mb-2">Environment Variable Explained:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-400 font-mono">ETH_RPC</span>
                      <span className="text-blue-200">- The Ethereum RPC node URL</span>
                    </div>
                    <p className="text-blue-200 ml-6">
                      This variable is required for the API to interact with the Ethereum blockchain to monitor USDC transactions, verify payments, and track invoice statuses. The API uses this endpoint to read blockchain data in a non-custodial manner.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mt-4">
                  <p className="text-yellow-300 font-medium mb-2">💡 RPC Provider Options:</p>
                  <div className="space-y-3 text-sm text-yellow-200">
                    <div>
                      <p className="font-medium">🔹 Infura (Recommended for beginners)</p>
                      <code className="bg-yellow-900/40 px-2 py-0.5 rounded block mt-1">
                        ETH_RPC=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
                      </code>
                      <p className="text-xs mt-1">Sign up at <a href="https://infura.io" className="text-yellow-400 hover:underline">infura.io</a></p>
                    </div>

                    <div>
                      <p className="font-medium">🔹 Alchemy</p>
                      <code className="bg-yellow-900/40 px-2 py-0.5 rounded block mt-1">
                        ETH_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
                      </code>
                      <p className="text-xs mt-1">Sign up at <a href="https://alchemy.com" className="text-yellow-400 hover:underline">alchemy.com</a></p>
                    </div>

                    <div>
                      <p className="font-medium">🔹 QuickNode</p>
                      <code className="bg-yellow-900/40 px-2 py-0.5 rounded block mt-1">
                        ETH_RPC=https://YOUR_ENDPOINT.quiknode.pro/YOUR_API_KEY
                      </code>
                      <p className="text-xs mt-1">Sign up at <a href="https://quicknode.com" className="text-yellow-400 hover:underline">quicknode.com</a></p>
                    </div>

                    <div>
                      <p className="font-medium">🔹 Your Own Node</p>
                      <code className="bg-yellow-900/40 px-2 py-0.5 rounded block mt-1">
                        ETH_RPC=http://localhost:8545
                      </code>
                      <p className="text-xs mt-1">If running your own Ethereum node (Geth, Erigon, etc.)</p>
                    </div>

                    <div className="pt-2 border-t border-yellow-700/50">
                      <p className="font-medium">🔹 Testnet (For Development)</p>
                      <code className="bg-yellow-900/40 px-2 py-0.5 rounded block mt-1">
                        ETH_RPC=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
                      </code>
                      <p className="text-xs mt-1">Use Sepolia or Goerli testnet for testing without real funds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6: Run Database Migrations */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">6</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2 flex items-center">
                  <Terminal className="w-5 h-5 mr-2 text-indigo-400" />
                  Run Database Migrations
                </h3>
                <p className="text-gray-300 mb-3">
                  Set up the database schema by running Django migrations:
                </p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">python manage.py migrate</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('python manage.py migrate', 8)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 8 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-xs">Copy</span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  This creates the necessary database tables for users, invoices, and payment tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Step 7: Run the Development Server */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">7</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2 flex items-center">
                  <Play className="w-5 h-5 mr-2 text-indigo-400" />
                  Run the Development Server
                </h3>
                <p className="text-gray-300 mb-3">
                  Start the Django development server:
                </p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">python manage.py runserver</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('python manage.py runserver', 9)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 9 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-xs">Copy</span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  To run on a different port: <code className="text-indigo-400 bg-gray-750 px-2 py-0.5 rounded">python manage.py runserver 8000</code>
                </p>

                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mt-4">
                  <p className="text-green-300 font-medium mb-2">✅ Success!</p>
                  <p className="text-green-200 text-sm">
                    The API should now be running at <code className="bg-green-900/40 px-2 py-0.5 rounded">http://localhost:8000</code>
                  </p>
                  <p className="text-green-200 text-sm mt-2">
                    You can now access the API endpoints and test the payment gateway functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Optional: Create Superuser */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-white mb-3">Optional: Create Admin Superuser</h3>
            <p className="text-gray-300 mb-4">
              If you want to access the Django admin panel, create a superuser account:
            </p>

            <div className="relative">
              <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-gray-300">python manage.py createsuperuser</code>
              </pre>
              <button
                onClick={() => handleCopy('python manage.py createsuperuser', 10)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
              >
                {copiedStep === 10 ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <span className="text-xs">Copy</span>
                )}
              </button>
            </div>

            <p className="text-gray-400 text-sm mt-3">
              Follow the prompts to create an admin account, then access the admin panel at <code className="text-indigo-400 bg-gray-750 px-2 py-0.5 rounded">http://localhost:8000/admin</code>
            </p>
          </div>

          {/* Troubleshooting */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-white mb-3">Troubleshooting</h3>
            <div className="space-y-4">
              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <p className="text-gray-300 font-medium mb-2">❌ "No module named..." errors</p>
                <p className="text-gray-400 text-sm">
                  Make sure you've activated the virtual environment and installed all requirements. Try running <code className="text-indigo-400">pip install -r requirements.txt</code> again.
                </p>
              </div>

              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <p className="text-gray-300 font-medium mb-2">❌ RPC connection errors</p>
                <p className="text-gray-400 text-sm mb-2">
                  Verify that your <code className="text-indigo-400">ETH_RPC</code> URL is correct and that your RPC provider is accessible. Test the connection:
                </p>
                <code className="text-sm bg-black border border-gray-700 text-gray-300 px-3 py-2 rounded block">
                  curl YOUR_RPC_URL -X POST -H "Content-Type: application/json" --data '{`{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}`}'
                </code>
              </div>

              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <p className="text-gray-300 font-medium mb-2">❌ Port 8000 already in use</p>
                <p className="text-gray-400 text-sm mb-2">
                  You can specify a different port:
                </p>
                <code className="text-sm bg-black border border-gray-700 text-gray-300 px-3 py-2 rounded block">
                  python manage.py runserver 8080
                </code>
              </div>

              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <p className="text-gray-300 font-medium mb-2">❌ Database migration errors</p>
                <p className="text-gray-400 text-sm">
                  If you encounter migration errors, try running <code className="text-indigo-400">python manage.py makemigrations</code> first, then <code className="text-indigo-400">python manage.py migrate</code> again.
                </p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-white mb-3">Important Security Notes</h3>
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
              <div className="space-y-2 text-sm text-red-200">
                <p className="font-medium text-red-300">⚠️ Production Deployment</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Never use <code className="bg-red-900/40 px-1 rounded">DEBUG=True</code> in production</li>
                  <li>Always use environment variables for sensitive data</li>
                  <li>Set up proper CORS settings for your frontend domain</li>
                  <li>Use HTTPS in production with a proper SSL certificate</li>
                  <li>Configure Django's <code className="bg-red-900/40 px-1 rounded">ALLOWED_HOSTS</code> setting</li>
                  <li>Use a production-grade database (PostgreSQL, MySQL) instead of SQLite</li>
                  <li>Implement rate limiting to prevent API abuse</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-white mb-3">Additional Resources</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-indigo-400 hover:text-indigo-300 text-sm">
                → API Documentation
              </Link>
              <Link to="/dashboard-setup" className="block text-indigo-400 hover:text-indigo-300 text-sm">
                → Dashboard Setup Guide
              </Link>
              <a href="https://github.com/24greyhat/xdotpay.com" className="block text-indigo-400 hover:text-indigo-300 text-sm">
                → GitHub Repository
              </a>
              <a href="https://docs.djangoproject.com/" className="block text-indigo-400 hover:text-indigo-300 text-sm">
                → Django Documentation
              </a>
              <a href="https://web3py.readthedocs.io/" className="block text-indigo-400 hover:text-indigo-300 text-sm">
                → Web3.py Documentation
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
