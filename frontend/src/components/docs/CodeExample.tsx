import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CodeExample({ path, method, details, requestSchema, schemas }) {
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('curl');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateExampleData = (schema) => {
    if (!schema) return {};
    
    if (schema.$ref) {
      const schemaName = schema.$ref.split('/').pop();
      const resolved = schemas[schemaName];
      return generateExampleData(resolved);
    }

    if (schema.type === 'object' && schema.properties) {
      const example = {};
      Object.entries(schema.properties).forEach(([key, value]) => {
        if (value.type === 'string') {
          example[key] = value.format === 'date-time' ? '2025-12-01T10:30:00Z' : 
                         value.format === 'uuid4' ? '123e4567-e89b-12d3-a456-426614174000' :
                         `example_${key}`;
        } else if (value.type === 'number' || value.type === 'integer') {
          example[key] = value.type === 'integer' ? 1 : 100.00;
        } else if (value.type === 'boolean') {
          example[key] = true;
        } else if (value.type === 'object') {
          example[key] = { key: 'value' };
        } else if (value.anyOf) {
          const nonNullType = value.anyOf.find(v => v.type !== 'null');
          if (nonNullType?.type === 'string') {
            example[key] = `example_${key}`;
          }
        }
      });
      return example;
    }

    return {};
  };

  const exampleData = requestSchema ? generateExampleData(requestSchema) : null;

  const generateCurlExample = () => {
    const authHeader = details.security ? `  -H "Authorization: Bearer YOUR_TOKEN" \\\n` : '';
    const dataJson = exampleData ? `  -d '${JSON.stringify(exampleData, null, 2)}' \\\n` : '';
    
    return `curl -X ${method.toUpperCase()} https://api.xdotpay.com${path} \\\n${authHeader}  -H "Content-Type: application/json"${dataJson ? ' \\\n' + dataJson.trimEnd() : ''}`;
  };

  const generateJavaScriptExample = () => {
    const headers = {
      'Content-Type': 'application/json',
      ...(details.security && { 'Authorization': 'Bearer YOUR_TOKEN' })
    };

    return `fetch('https://api.xdotpay.com${path}', {
  method: '${method.toUpperCase()}',
  headers: ${JSON.stringify(headers, null, 2)}${exampleData ? `,\n  body: JSON.stringify(${JSON.stringify(exampleData, null, 2)})` : ''}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
  };

  const generatePythonExample = () => {
    const headers = {
      'Content-Type': 'application/json',
      ...(details.security && { 'Authorization': 'Bearer YOUR_TOKEN' })
    };

    return `import requests

url = "https://api.xdotpay.com${path}"
headers = ${JSON.stringify(headers, null, 2).replace(/"/g, "'")}${exampleData ? `
data = ${JSON.stringify(exampleData, null, 2).replace(/"/g, "'")}

response = requests.${method.toLowerCase()}(url, headers=headers, json=data)` : `

response = requests.${method.toLowerCase()}(url, headers=headers)`}
print(response.json())`;
  };

  const examples = {
    curl: generateCurlExample(),
    javascript: generateJavaScriptExample(),
    python: generatePythonExample()
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white">Code Example</h3>
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-750 rounded-lg p-1">
            {['curl', 'javascript', 'python'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  language === lang
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang === 'javascript' ? 'JavaScript' : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => handleCopy(examples[language])}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 z-10"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
        <pre className="bg-black border border-gray-700 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{examples[language]}</code>
        </pre>
      </div>
    </div>
  );
}