import { Copy } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 relative">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
        title="Copy to clipboard"
      >
        <Copy className="w-4 h-4" />
      </button>
      <pre className="text-sm overflow-x-auto pr-8">
        <code>{code}</code>
      </pre>
      {copied && (
        <span className="absolute top-4 right-12 text-green-400 text-sm">
          Copied!
        </span>
      )}
    </div>
  );
}
