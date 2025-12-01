import { StatsGrid } from './StatsGrid';
import { InvoiceTable } from './InvoiceTable';
import { mockInvoices } from '../../data/mockInvoices';

export function InvoiceStatsView() {
  const totalInvoices = mockInvoices.length;
  const completedInvoices = mockInvoices.filter(inv => inv.status === 'completed').length;
  const pendingInvoices = mockInvoices.filter(inv => inv.status === 'pending').length;
  const totalRevenue = mockInvoices
    .filter(inv => inv.status === 'completed')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <StatsGrid
        totalInvoices={totalInvoices}
        totalRevenue={totalRevenue}
        completedInvoices={completedInvoices}
        pendingInvoices={pendingInvoices}
      />
      <InvoiceTable invoices={mockInvoices} />
    </div>
  );
}
