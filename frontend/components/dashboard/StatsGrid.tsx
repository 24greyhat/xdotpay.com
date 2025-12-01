import { StatsCard } from './StatsCard';
import { FileText, DollarSign, CheckCircle, Clock } from 'lucide-react';

interface StatsGridProps {
  totalInvoices: number;
  totalRevenue: number;
  completedInvoices: number;
  pendingInvoices: number;
}

export function StatsGrid({
  totalInvoices,
  totalRevenue,
  completedInvoices,
  pendingInvoices
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Invoices"
        value={totalInvoices.toString()}
        icon={FileText}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
      <StatsCard
        title="Total Revenue"
        value={`$${totalRevenue.toFixed(2)}`}
        icon={DollarSign}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <StatsCard
        title="Completed"
        value={completedInvoices.toString()}
        icon={CheckCircle}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <StatsCard
        title="Pending"
        value={pendingInvoices.toString()}
        icon={Clock}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />
    </div>
  );
}
