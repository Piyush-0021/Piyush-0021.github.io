'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left Side - Intro */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full lg:w-1/2 bg-blue-700 text-white flex flex-col justify-center px-10 py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/joinco.jpg')] bg-cover bg-center" />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-extrabold mb-6"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg mb-6 max-w-lg leading-relaxed"
          >
            Log in to manage your tenders, update your company profile, and explore new business opportunities.
          </motion.p>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            src="/assets/joinco.jpg"
            alt="Login Illustration"
            className="w-full max-w-md object-contain rounded-xl shadow-lg"
          />
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md bg-blue-50 border border-blue-200 p-10 rounded-xl shadow-xl text-black">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Login to BidHive</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <FaEnvelope className="absolute top-4 left-4 text-blue-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-4 left-4 text-blue-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
             >
              Login
            </motion.button>

             <p className="text-center text-sm mt-4 text-gray-600">
             Don't have an account?{' '}
             <a href="/register" className="text-blue-700 font-semibold hover:underline">
             Click here to register
             </a>
             </p>

          </form>
        </div>
      </div>
    </div>
  );
}