import { Send } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export function ApiRequestSection() {
  return (
    <div className="mb-8">
      <h3 className="mb-3 flex items-center">
        <Send className="w-5 h-5 mr-2 text-indigo-600" />
        Making API Requests
      </h3>
      
      <p className="text-gray-600 mb-4">
        All API requests must include your API token in the Authorization header:
      </p>

      <CodeBlock code="Authorization: Bearer YOUR_API_TOKEN" />
    </div>
  );
}
