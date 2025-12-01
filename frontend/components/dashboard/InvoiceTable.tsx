import { InvoiceRow } from './InvoiceRow';
import { Invoice } from '../../types/invoice';

interface InvoiceTableProps {
  invoices: Invoice[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2>Recent Invoices</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-500">ID</th>
              <th className="px-6 py-3 text-left text-gray-500">Amount (USDC)</th>
              <th className="px-6 py-3 text-left text-gray-500">From Address</th>
              <th className="px-6 py-3 text-left text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-gray-500">Created At</th>
              <th className="px-6 py-3 text-left text-gray-500">Metadata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <InvoiceRow key={invoice.id} invoice={invoice} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
