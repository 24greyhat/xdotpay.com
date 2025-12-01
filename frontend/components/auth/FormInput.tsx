import { Mail, Lock, User, Wallet } from 'lucide-react';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  icon: 'mail' | 'lock' | 'user' | 'wallet';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  helperText?: string;
  mono?: boolean;
}

const iconMap = {
  mail: Mail,
  lock: Lock,
  user: User,
  wallet: Wallet
};

export function FormInput({
  id,
  label,
  type,
  icon,
  value,
  onChange,
  error,
  placeholder,
  helperText,
  mono
}: FormInputProps) {
  const Icon = iconMap[icon];

  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            mono ? 'font-mono text-sm' : ''
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  );
}
