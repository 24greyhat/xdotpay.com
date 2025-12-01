import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
    failed: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${config.bg} ${config.text}`}>
      <Icon className="w-4 h-4" />
      <span className="capitalize">{status}</span>
    </span>
  );
}
