import { StatusBadge } from './StatusBadge';
import { Invoice } from '../../types/invoice';

interface InvoiceRowProps {
  invoice: Invoice;
}

export function InvoiceRow({ invoice }: InvoiceRowProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateAddress = (address: string) => {
    if (!address) return 'N/A';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-gray-900">#{invoice.id}</td>
      <td className="px-6 py-4 text-gray-900">${invoice.amount.toFixed(2)}</td>
      <td className="px-6 py-4">
        <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {truncateAddress(invoice.from_address)}
        </code>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={invoice.status} />
      </td>
      <td className="px-6 py-4 text-gray-600 text-sm">{formatDate(invoice.created_at)}</td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {invoice.metadata?.product || 'N/A'}
      </td>
    </tr>
  );
}
