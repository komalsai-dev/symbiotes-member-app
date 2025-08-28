'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Store email in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('accessToken', 'dummy-token');
      }

      // Redirect to dashboard immediately
      router.replace('/main/dashboard');
    } catch (err) {
      setError('An error occurred during login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Neon Glow Effect */}
        <div className="w-[500px] h-[400px] rounded-3xl blur-2xl opacity-80 bg-[radial-gradient(circle_at_top,#d0ed01_0%,transparent_70%)]" />
      </div>
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-black bg-opacity-70 shadow-lg p-10 flex flex-col items-center border border-white/10">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-2">
            <Image src="/images/logo1.png" alt="Symbiotes Logo" width={48} height={48} className="mx-auto" />
          </div>
          <span className="text-[#d0ed01] text-sm font-semibold tracking-wide mb-2">Symbiotes.ai</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-6">Sign in to your account</h2>
        <form className="w-full space-y-6" onSubmit={handleLoginSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="user@email.com"
                className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white text-sm mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#d0ed01] text-black font-semibold text-lg shadow-md hover:bg-[#c0de01] transition focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:ring-offset-2 cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="inline-block w-6 h-6 border-4 border-t-4 border-t-black border-black border-opacity-20 rounded-full animate-spin"></span>
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-300 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#d0ed01] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
} 