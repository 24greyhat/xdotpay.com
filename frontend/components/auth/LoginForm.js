'use client'
import { FormInput } from "./FormInput"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export function LoginForm() {


  const onLogin = async () => {

  }


  const router = useRouter();


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Login data:', formData);
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        id="password"
        label="Password"
        type="password"
        icon="lock"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, password: value })}
        error={errors.password}
        placeholder="••••••••"
      />

      <div className="flex items-center justify-end">
        <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
      >
        Sign In
      </button>

      <div className="text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-indigo-400 hover:text-indigo-300"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
}
