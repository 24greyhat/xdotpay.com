import { Key, Copy } from 'lucide-react';
import { useState } from 'react';

export function ApiTokenSection() {
  const [copiedToken, setCopiedToken] = useState(false);
  const mockApiToken = 'usdc_live_sk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p';

  const handleCopy = () => {
    navigator.clipboard.writeText(mockApiToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="mb-8">
      <h3 className="mb-3 flex items-center">
        <Key className="w-5 h-5 mr-2 text-indigo-600" />
        API Token Management
      </h3>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Your API Token</span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 text-sm"
          >
            <Copy className="w-4 h-4" />
            <span>{copiedToken ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        <code className="text-sm bg-white px-3 py-2 rounded border border-gray-300 block overflow-x-auto">
          {mockApiToken}
        </code>
      </div>

      <div className="space-y-3">
        <div className="flex items-start">
          <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
            1
          </div>
          <div>
            <p className="text-gray-700 mb-1">Generate a new token</p>
            <code className="text-sm bg-gray-100 px-3 py-2 rounded block">
              POST /api/v1/tokens/generate
            </code>
            <p className="text-gray-600 text-sm mt-2">
              Send a POST request with your account credentials to generate a new API token.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
            2
          </div>
          <div>
            <p className="text-gray-700 mb-1">Delete a token</p>
            <code className="text-sm bg-gray-100 px-3 py-2 rounded block">
              DELETE /api/v1/tokens/:token_id
            </code>
            <p className="text-gray-600 text-sm mt-2">
              Remove access for a specific token when it's no longer needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
