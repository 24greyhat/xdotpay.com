import { Book, Terminal, FileCode, Play, Download, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function DashboardSetup() {
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
              <Link to="/api-setup" className="text-gray-400 hover:text-white transition-colors">
                API
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
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white">Dashboard Setup Guide</h1>
              <p className="text-gray-400">Get your merchant dashboard running locally</p>
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
            The Xdotpay dashboard is a Next.js application that provides merchants with a user-friendly interface to manage invoices, view payment statistics, and monitor transactions. This guide will walk you through setting up and running the dashboard locally.
          </p>

          <div className="bg-indigo-900/20 border border-indigo-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-indigo-300 font-medium mb-1">Prerequisites</p>
                <ul className="text-indigo-200 text-sm space-y-1">
                  <li>• Node.js 18.x or higher installed</li>
                  <li>• npm or yarn package manager</li>
                  <li>• Git (to clone the repository)</li>
                  <li>• Access to Xdotpay API (https://api.xdotpay.com)</li>
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
                  First, clone the Xdotpay dashboard repository from GitHub:
                </p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">git clone https://github.com/24greyhat/xdotpay.com.git; cd xdotpay.com/dashboard</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('git clone https://github.com/24greyhat/xdotpay.com.git; cd xdotpay.com/dashboard', 1)}
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

          {/* Step 2: Install Dependencies */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2 flex items-center">
                  <Terminal className="w-5 h-5 mr-2 text-indigo-400" />
                  Install Dependencies
                </h3>
                <p className="text-gray-300 mb-3">
                  Install all required npm packages:
                </p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">npm install</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm install', 2)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 2 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-xs">Copy</span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  Alternative: If you're using Yarn, run <code className="text-indigo-400 bg-gray-750 px-2 py-0.5 rounded">yarn install</code>
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Create Environment File */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">3</span>
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
                    onClick={() => handleCopy('touch .env', 3)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 3 ? (
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

          {/* Step 4: Configure Environment Variables */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">4</span>
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
                    <code className="text-sm text-gray-300">NEXT_PUBLIC_API_URL=https://api.xdotpay.com</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('NEXT_PUBLIC_API_URL=https://api.xdotpay.com', 4)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 4 ? (
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
                      <span className="text-blue-400 font-mono">NEXT_PUBLIC_API_URL</span>
                      <span className="text-blue-200">- The base URL for the Xdotpay API</span>
                    </div>
                    <p className="text-blue-200 ml-6">
                      This variable is required for the dashboard to communicate with the API backend. You can use the production API (https://api.xdotpay.com) or point to your own self-hosted instance.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mt-4">
                  <p className="text-yellow-300 font-medium mb-2">💡 Development vs Production:</p>
                  <div className="space-y-2 text-sm text-yellow-200">
                    <p>
                      <strong>Production:</strong> <code className="bg-yellow-900/40 px-2 py-0.5 rounded">NEXT_PUBLIC_API_URL=https://api.xdotpay.com</code>
                    </p>
                    <p>
                      <strong>Local Development:</strong> <code className="bg-yellow-900/40 px-2 py-0.5 rounded">NEXT_PUBLIC_API_URL=http://localhost:8000</code>
                    </p>
                    <p className="mt-2">
                      If you're running the API locally, make sure to update the URL accordingly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Run the Development Server */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-white">5</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2 flex items-center">
                  <Play className="w-5 h-5 mr-2 text-indigo-400" />
                  Run the Development Server
                </h3>
                <p className="text-gray-300 mb-3">
                  Start the Next.js development server:
                </p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">npm run dev</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm run dev', 5)}
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
                  Alternative: <code className="text-indigo-400 bg-gray-750 px-2 py-0.5 rounded">yarn dev</code>
                </p>

                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mt-4">
                  <p className="text-green-300 font-medium mb-2">✅ Success!</p>
                  <p className="text-green-200 text-sm">
                    The dashboard should now be running at <code className="bg-green-900/40 px-2 py-0.5 rounded">http://localhost:3000</code>
                  </p>
                  <p className="text-green-200 text-sm mt-2">
                    Open your browser and navigate to this URL to access the merchant dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Production Build */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-white mb-3">Building for Production</h3>
            <p className="text-gray-300 mb-4">
              When you're ready to deploy the dashboard to production, build the optimized version:
            </p>

            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm mb-2">1. Build the application:</p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">npm run build</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm run build', 6)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 6 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-xs">Copy</span>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">2. Start the production server:</p>
                <div className="relative">
                  <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">npm run start</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm run start', 7)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
                  >
                    {copiedStep === 7 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <span className="text-xs">Copy</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-white mb-3">Troubleshooting</h3>
            <div className="space-y-4">
              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <p className="text-gray-300 font-medium mb-2">❌ "Failed to fetch" errors</p>
                <p className="text-gray-400 text-sm">
                  Make sure the <code className="text-indigo-400">NEXT_PUBLIC_API_URL</code> is correctly set in your <code className="text-indigo-400">.env</code> file and the API server is running and accessible.
                </p>
              </div>

              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <p className="text-gray-300 font-medium mb-2">❌ Environment variables not loading</p>
                <p className="text-gray-400 text-sm">
                  Restart the development server after making changes to the <code className="text-indigo-400">.env</code> file. Next.js loads environment variables at startup.
                </p>
              </div>

              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <p className="text-gray-300 font-medium mb-2">❌ Port 3000 already in use</p>
                <p className="text-gray-400 text-sm mb-2">
                  You can specify a different port:
                </p>
                <code className="text-sm bg-black border border-gray-700 text-gray-300 px-3 py-2 rounded block">
                  PORT=3001 npm run dev
                </code>
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
              <a href="https://github.com/xdotpay/dashboard" className="block text-indigo-400 hover:text-indigo-300 text-sm">
                → GitHub Repository
              </a>
              <a href="https://nextjs.org/docs" className="block text-indigo-400 hover:text-indigo-300 text-sm">
                → Next.js Documentation
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
