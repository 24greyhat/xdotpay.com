import { Lock, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { SchemaViewer } from './SchemaViewer';
import { CodeExample } from './CodeExample';

function parseMarkdownDescription(markdown) {
  if (!markdown) return null;
  
  const lines = markdown.split('\n');
  const elements = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) {
      return;
    }
    
    // Parse headings (# Heading)
    if (trimmedLine.startsWith('#')) {
      const text = trimmedLine.replace(/^#+\s*/, '');
      elements.push(
        <h4 key={index} className="text-white font-semibold mb-2">
          {text}
        </h4>
      );
    }
    // Parse blockquotes (> Quote)
    else if (trimmedLine.startsWith('>')) {
      const text = trimmedLine.replace(/^>\s*/, '');
      elements.push(
        <p key={index} className="text-gray-400 border-l-4 border-indigo-500 pl-4 py-1 italic">
          {text}
        </p>
      );
    }
    // Regular paragraphs
    else {
      elements.push(
        <p key={index} className="text-gray-300">
          {trimmedLine}
        </p>
      );
    }
  });
  
  return <div className="space-y-2">{elements}</div>;
}

export function EndpointCard({ path, method, details, schemas }) {
  const [copied, setCopied] = useState(false);

  const getMethodColor = (method) => {
    const colors = {
      get: 'bg-green-600',
      post: 'bg-blue-600',
      put: 'bg-yellow-600',
      delete: 'bg-red-600',
      patch: 'bg-purple-600'
    };
    return colors[method.toLowerCase()] || 'bg-gray-600';
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const requestSchema = details.requestBody?.content?.['application/json']?.schema;
  const requestFormSchema = details.requestBody?.content?.['application/x-www-form-urlencoded']?.schema;
  const responseSchema = details.responses?.['200']?.content?.['application/json']?.schema;

  return (
    <div className="space-y-6">
      {/* Endpoint Header */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-lg text-white uppercase ${getMethodColor(method)}`}>
              {method}
            </span>
            <h2 className="text-white">{details.summary}</h2>
          </div>
          {details.security && (
            <div className="flex items-center space-x-2 text-yellow-400">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Auth Required</span>
            </div>
          )}
        </div>

        {/* Path */}
        <div className="bg-gray-750 border border-gray-600 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <code className="text-indigo-400 font-mono">{path}</code>
            <button
              onClick={() => handleCopy(path)}
              className="text-gray-400 hover:text-gray-300"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Description */}
        {details.description && (
          <div className="mt-4">
            {parseMarkdownDescription(details.description)}
          </div>
        )}
      </div>

      {/* Parameters */}
      {details.parameters && details.parameters.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Parameters</h3>
          <div className="space-y-3">
            {details.parameters.map((param, idx) => (
              <div key={idx} className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <code className="text-indigo-400">{param.name}</code>
                    {param.required && (
                      <span className="text-xs px-2 py-0.5 bg-red-900/30 border border-red-700 text-red-400 rounded">
                        required
                      </span>
                    )}
                    <span className="text-xs text-gray-500">in {param.in}</span>
                  </div>
                  <span className="text-xs text-gray-400">{param.schema.type}</span>
                </div>
                {param.schema.default !== undefined && (
                  <p className="text-sm text-gray-400">Default: <code className="text-gray-300">{param.schema.default}</code></p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Body */}
      {(requestSchema || requestFormSchema) && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Request Body</h3>
          <SchemaViewer 
            schema={requestSchema || requestFormSchema} 
            schemas={schemas}
            isFormData={!!requestFormSchema}
          />
        </div>
      )}

      {/* Response */}
      {responseSchema && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Response (200 OK)</h3>
          <SchemaViewer schema={responseSchema} schemas={schemas} />
        </div>
      )}

      {/* Code Example */}
      <CodeExample 
        path={path} 
        method={method} 
        details={details}
        requestSchema={requestSchema || requestFormSchema}
        schemas={schemas}
      />
    </div>
  );
}