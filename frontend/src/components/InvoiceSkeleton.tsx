export function InvoiceSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-3xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <div className="h-8 bg-gray-700 rounded w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
        </div>

        {/* Main Invoice Card Skeleton */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Status Bar Skeleton */}
          <div className="bg-gray-750 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-600 rounded"></div>
              <div className="h-5 bg-gray-600 rounded w-32"></div>
            </div>
            <div className="h-8 bg-gray-600 rounded w-24"></div>
          </div>

          {/* Invoice Details Skeleton */}
          <div className="p-6 space-y-6">
            {/* From/To Section Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-4 bg-gray-700 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-600 rounded w-40"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                <div className="h-5 bg-gray-600 rounded w-48"></div>
              </div>
            </div>

            {/* Description Skeleton */}
            <div>
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-5 bg-gray-600 rounded w-64"></div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700"></div>

            {/* Amount Section Skeleton */}
            <div className="bg-gray-750 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 bg-gray-600 rounded w-20"></div>
                <div className="h-5 bg-gray-600 rounded w-24"></div>
              </div>
              <div className="border-t border-gray-700 my-4"></div>
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-600 rounded w-40"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 bg-gray-600 rounded w-32"></div>
                </div>
              </div>
            </div>

            {/* Payment Address Skeleton */}
            <div>
              <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-gray-600 rounded w-full max-w-md"></div>
                  <div className="ml-3 w-5 h-5 bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>

            {/* Alert Skeleton */}
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-blue-700 rounded flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-blue-700 rounded w-32"></div>
                  <div className="h-4 bg-blue-700 rounded w-full"></div>
                  <div className="h-4 bg-blue-700 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="bg-gray-750 border-t border-gray-700 px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Wallet Button Skeleton */}
              <div className="flex-1 h-12 bg-gray-600 rounded-lg"></div>
              {/* Pay Now Button Skeleton */}
              <div className="flex-1 h-12 bg-gray-600 rounded-lg"></div>
            </div>
            <div className="h-4 bg-gray-600 rounded w-56 mx-auto mt-3"></div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-4 bg-gray-700 rounded w-32"></div>
            <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
            <div className="h-4 bg-gray-700 rounded w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
