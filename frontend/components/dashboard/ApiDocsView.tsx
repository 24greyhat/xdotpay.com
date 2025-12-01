import { ApiTokenSection } from './ApiTokenSection';
import { ApiRequestSection } from './ApiRequestSection';
import { ApiEndpointSection } from './ApiEndpointSection';
import { ApiDocsFooter } from './ApiDocsFooter';

export function ApiDocsView() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="mb-4">Quick Start Guide</h2>
        <p className="text-gray-600 mb-6">
          Get started with the USDC Payment API in minutes. Follow these steps to integrate cryptocurrency payments into your application.
        </p>

        <ApiTokenSection />
        <ApiRequestSection />
        
        <ApiEndpointSection
          title="Create an Invoice"
          description="Create a new payment invoice for your customers:"
          endpoint="POST /api/v1/invoices"
          code={`curl -X POST https://api.yourapp.com/api/v1/invoices \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant": "your_username",
    "amount": 100.00,
    "metadata": {
      "order_id": "ORD-001",
      "customer_email": "customer@example.com"
    }
  }'`}
          parameters={[
            { name: 'merchant', type: 'string, required', description: 'Your merchant username' },
            { name: 'amount', type: 'float, required', description: 'Payment amount in USDC' },
            { name: 'metadata', type: 'object, optional', description: 'Additional data about the invoice' }
          ]}
        />

        <ApiEndpointSection
          title="View Invoice Details"
          description="Retrieve the details of a specific invoice:"
          endpoint="GET /api/v1/invoices/:invoice_id"
          code={`curl -X GET https://api.yourapp.com/api/v1/invoices/:invoice_id \\
  -H "Authorization: Bearer YOUR_API_TOKEN"`}
          responseExample={{
            id: 1,
            merchant: 'your_username',
            amount: 100.00,
            status: 'completed',
            from_address: '0x742d35Cc...',
            tx_hash: '0x1a2b3c4d...',
            metadata: { order_id: 'ORD-001' },
            created_at: '2025-11-30T10:30:00Z',
            updated_at: '2025-11-30T10:35:00Z'
          }}
        />

        <ApiEndpointSection
          title="Submit Payment Confirmation"
          description="Once a customer pays, submit the transaction details:"
          endpoint="POST /api/v1/payments"
          code={`curl -X POST https://api.yourapp.com/api/v1/payments \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "invoice_id": 1,
    "from_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    "tx_hash": "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f"
  }'`}
        />

        <ApiDocsFooter />
      </div>
    </div>
  );
}
