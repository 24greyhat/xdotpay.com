import { X } from 'lucide-react';

export function Sidebar({ isOpen, onClose, groupedEndpoints, activeEndpoint, onSelectEndpoint }) {
  const getMethodColor = (method) => {
    const colors = {
      get: 'text-green-400 bg-green-900/30 border-green-700',
      post: 'text-blue-400 bg-blue-900/30 border-blue-700',
      put: 'text-yellow-400 bg-yellow-900/30 border-yellow-700',
      delete: 'text-red-400 bg-red-900/30 border-red-700',
      patch: 'text-purple-400 bg-purple-900/30 border-purple-700'
    };
    return colors[method.toLowerCase()] || 'text-gray-400 bg-gray-900/30 border-gray-700';
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-80 bg-gray-800 border-r border-gray-700 z-40
          transform transition-transform duration-200 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="p-6">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-white mb-6">Endpoints</h2>

          {/* Grouped Endpoints */}
          <div className="space-y-6">
            {Object.entries(groupedEndpoints).map(([tag, endpoints]) => (
              <div key={tag}>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-3">
                  {tag}
                </h3>
                <div className="space-y-1">
                  {endpoints.map((endpoint) => (
                    <button
                      key={`${endpoint.path}-${endpoint.method}`}
                      onClick={() => {
                        onSelectEndpoint(endpoint.path);
                        onClose();
                      }}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg transition-colors
                        ${activeEndpoint === endpoint.path
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span
                          className={`
                            text-xs px-2 py-0.5 rounded border uppercase
                            ${getMethodColor(endpoint.method)}
                          `}
                        >
                          {endpoint.method}
                        </span>
                        <span className="text-xs truncate">{endpoint.summary}</span>
                      </div>
                      <div className="text-xs text-gray-400 truncate font-mono">
                        {endpoint.path}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
