import { useState } from 'react';
import { Book, Code, Lock, Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/docs/Sidebar';
import { EndpointCard } from '../components/docs/EndpointCard';
import { apiSpec } from '../data/apiSpec';

export function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeEndpoint, setActiveEndpoint] = useState('/api/auth/signup');

  // Group endpoints by tags
  const groupedEndpoints = {};
  Object.entries(apiSpec.paths).forEach(([path, methods]) => {
    Object.entries(methods).forEach(([method, details]) => {
      const tag = details.tags?.[0] || 'Other';
      if (!groupedEndpoints[tag]) {
        groupedEndpoints[tag] = [];
      }
      groupedEndpoints[tag].push({ path, method, ...details });
    });
  });

  const currentEndpoint = Object.entries(apiSpec.paths).find(([path]) => path === activeEndpoint);
  const currentMethod = currentEndpoint ? Object.keys(currentEndpoint[1])[0] : 'get';
  const currentDetails = currentEndpoint ? currentEndpoint[1][currentMethod] : null;

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        groupedEndpoints={groupedEndpoints}
        activeEndpoint={activeEndpoint}
        onSelectEndpoint={setActiveEndpoint}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-80">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white">API Documentation</h1>
                  <p className="text-gray-400 text-sm">Version {apiSpec.info.version}</p>
                </div>
              </div>
              
              {/* Legal Links */}
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <Link to="/api-setup" className="text-gray-400 hover:text-white transition-colors">
                  API Setup
                </Link>
                <Link to="/dashboard-setup" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard Setup
                </Link>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Introduction */}
          {!currentDetails ? (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 mb-6">
              <h2 className="text-white mb-4">Welcome to the API Documentation</h2>
              <p className="text-gray-400 mb-6">
                This API provides payment gateway functionality with USDC cryptocurrency. Select an endpoint from the sidebar to view detailed documentation.
              </p>

              {/* Quick Start */}
              <div className="bg-gray-750 border border-gray-600 rounded-lg p-6 mb-6">
                <h3 className="text-white mb-3 flex items-center">
                  <ChevronRight className="w-5 h-5 mr-2 text-indigo-400" />
                  Quick Start
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 mb-2">1. Sign up for an account</p>
                    <code className="text-sm bg-gray-900 border border-gray-700 text-gray-300 px-3 py-2 rounded block">
                      POST /api/auth/signup
                    </code>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">2. Login to get your access token</p>
                    <code className="text-sm bg-gray-900 border border-gray-700 text-gray-300 px-3 py-2 rounded block">
                      POST /api/auth/login
                    </code>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">3. Create an invoice</p>
                    <code className="text-sm bg-gray-900 border border-gray-700 text-gray-300 px-3 py-2 rounded block">
                      POST /api/v1/new/invoice
                    </code>
                  </div>
                  <div className="pt-3 border-t border-gray-600">
                    <Link to="/dashboard-setup" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm">
                      <Code className="w-4 h-4 mr-2" />
                      Need a dashboard? Set up the Next.js merchant dashboard →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Authentication Info */}
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">Authentication</p>
                    <p className="text-blue-300 text-sm">
                      Most endpoints require Bearer token authentication. Include your token in the Authorization header:
                    </p>
                    <code className="text-sm bg-blue-900/40 border border-blue-700 text-blue-200 px-3 py-2 rounded block mt-2">
                      Authorization: Bearer YOUR_TOKEN
                    </code>
                  </div>
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex justify-center space-x-6 text-sm">
                <Link to="/api-setup" className="text-indigo-400 hover:text-indigo-300">
                  API Setup
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="/dashboard-setup" className="text-indigo-400 hover:text-indigo-300">
                  Dashboard Setup
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="/terms-of-service" className="text-indigo-400 hover:text-indigo-300">
                  Terms of Service
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="/privacy-policy" className="text-indigo-400 hover:text-indigo-300">
                  Privacy Policy
                </Link>
              </div>
            </div>
          ) : (
            <EndpointCard
              path={activeEndpoint}
              method={currentMethod}
              details={currentDetails}
              schemas={apiSpec.components.schemas}
            />
          )}
        </main>
      </div>
    </div>
  );
}