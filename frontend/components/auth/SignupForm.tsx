import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormInput } from './FormInput';

interface SignupFormProps {
  onSignup: () => void;
}

export function SignupForm({ onSignup }: SignupFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    ethereumAddress: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEthereumAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.ethereumAddress) {
      newErrors.ethereumAddress = 'Ethereum address is required';
    } else if (!validateEthereumAddress(formData.ethereumAddress)) {
      newErrors.ethereumAddress = 'Invalid Ethereum address format';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Signup data:', formData);
    onSignup();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        id="username"
        label="Username"
        type="text"
        icon="user"
        value={formData.username}
        onChange={(value) => setFormData({ ...formData, username: value })}
        error={errors.username}
        placeholder="your_username"
      />

      <FormInput
        id="email"
        label="Email Address"
        type="email"
        icon="mail"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        error={errors.email}
        placeholder="you@example.com"
      />

      <FormInput
        id="ethereumAddress"
        label="Ethereum Address"
        type="text"
        icon="wallet"
        value={formData.ethereumAddress}
        onChange={(value) => setFormData({ ...formData, ethereumAddress: value })}
        error={errors.ethereumAddress}
        placeholder="0x..."
        helperText="Where you'll receive USDC payments"
        mono
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        icon="lock"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, password: value })}
        error={errors.password}
        placeholder="••••••••"
      />

      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        icon="lock"
        value={formData.confirmPassword}
        onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
        error={errors.confirmPassword}
        placeholder="••••••••"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Create Account
      </button>

      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
