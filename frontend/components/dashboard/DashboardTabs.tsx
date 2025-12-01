interface DashboardTabsProps {
  activeTab: 'stats' | 'docs';
  onTabChange: (tab: 'stats' | 'docs') => void;
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => onTabChange('stats')}
            className={`py-4 px-1 border-b-2 transition-colors ${
              activeTab === 'stats'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Invoice Statistics
          </button>
          <button
            onClick={() => onTabChange('docs')}
            className={`py-4 px-1 border-b-2 transition-colors ${
              activeTab === 'docs'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            API Documentation
          </button>
        </nav>
      </div>
    </div>
  );
}
