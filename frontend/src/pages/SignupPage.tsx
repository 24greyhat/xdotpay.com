import { useState } from 'react';
import { DollarSign, Wallet, Mail, Lock, User } from 'lucide-react';

export function SignupPage({ onSignup, navigateToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    ethereumAddress: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEthereumAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSignup = async () => {
    const newErrors = {};

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

    setLoading(true);
    setErrors({});

    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Mock signup data:', {
        username: formData.username,
        email: formData.email,
        ethereum_address: formData.ethereumAddress
      });
      
      // Mock successful response
      const mockToken = 'mock_token_' + Math.random().toString(36).substring(7);
      localStorage.setItem('authToken', mockToken);
      
      setLoading(false);
      onSignup();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-indigo-600 p-3 rounded-full shadow-lg">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* Header */}
        <h1 className="text-center mb-2 text-white">Create Your Account</h1>
        <p className="text-center text-gray-400 mb-6">Start accepting USDC payments in minutes</p>

        {/* General Error */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-400 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                placeholder="your_username"
              />
            </div>
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Ethereum Address */}
          <div>
            <label htmlFor="ethereumAddress" className="block text-sm text-gray-300 mb-2">
              Ethereum Address
            </label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="ethereumAddress"
                type="text"
                value={formData.ethereumAddress}
                onChange={(e) => setFormData({ ...formData, ethereumAddress: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 font-mono text-sm"
                placeholder="0x..."
              />
            </div>
            {errors.ethereumAddress && <p className="text-red-400 text-sm mt-1">{errors.ethereumAddress}</p>}
            {!errors.ethereumAddress && <p className="text-gray-500 text-sm mt-1">Where you'll receive USDC payments</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={navigateToLogin}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center">
              <Wallet className="w-4 h-4 mr-1" />
              No KYC/KYB
            </span>
            <span>•</span>
            <span>Open Source</span>
            <span>•</span>
            <span>Non-Custodial</span>
          </div>
        </div>
      </div>
    </div>
  );
}
