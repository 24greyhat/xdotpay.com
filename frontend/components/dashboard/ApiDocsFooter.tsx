import { ExternalLink } from 'lucide-react';

export function ApiDocsFooter() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-indigo-900 mb-2">Complete API Documentation</h3>
          <p className="text-indigo-700 mb-4">
            View the full API reference with detailed information about all endpoints, parameters, and response formats.
          </p>
          <a
            href="https://docs.yourapp.com/api"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <span>View Full Documentation</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
