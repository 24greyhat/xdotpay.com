import { CodeBlock } from './CodeBlock';

interface Parameter {
  name: string;
  type: string;
  description: string;
}

interface ApiEndpointSectionProps {
  title: string;
  description: string;
  endpoint: string;
  code: string;
  parameters?: Parameter[];
  responseExample?: object;
}

export function ApiEndpointSection({
  title,
  description,
  endpoint,
  code,
  parameters,
  responseExample
}: ApiEndpointSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="mb-3">{title}</h3>
      
      <p className="text-gray-600 mb-4">{description}</p>

      <CodeBlock code={code} />

      {parameters && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-blue-900 mb-2">Request Parameters</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            {parameters.map((param) => (
              <li key={param.name}>
                <code className="bg-blue-100 px-2 py-1 rounded">{param.name}</code> ({param.type}) - {param.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {responseExample && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-green-900 mb-2">Response Example</h4>
          <pre className="text-sm text-green-800 overflow-x-auto bg-white p-3 rounded border border-green-300">
            <code>{JSON.stringify(responseExample, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
