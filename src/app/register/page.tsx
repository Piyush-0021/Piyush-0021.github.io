'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaIndustry, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    company_name: '',
    industry: '',
    email: '',
    password: '',
    logo: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'logo' && files) {
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Upload logo (optional)
    let logoUrl = '';
    if (formData.logo) {
      const form = new FormData();
      form.append('file', formData.logo);

      const res = await fetch('/api/upload-logo', {
        method: 'POST',
        body: form,
      });

      const result = await res.json();
      logoUrl = result?.logo_url || '';
    }

    // Step 2: Submit registration
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      company_name: formData.company_name,
     industry: formData.industry,
     email: formData.email,
     password: formData.password,
     logo_url: logoUrl, // ✅ correct key expected by backend
   }),
});

    const data = await res.json();
    if (res.ok) {
      alert('✅ Registered Successfully!');
    } else {
      alert(data.error || '❌ Registration Failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left side (same as before) */}
      <motion.div className="w-full lg:w-1/2 bg-blue-700 text-white flex flex-col justify-center px-10 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/joinco.jpg')] bg-cover bg-center" />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-extrabold mb-6"
          >
            Welcome to BidHive
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg mb-6 max-w-lg leading-relaxed"
          >
            Create a verified business profile, list tenders, and connect with industry leaders in our modern B2B ecosystem.
          </motion.p>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            src="/assets/joinco.jpg"
            alt="Business Collaboration"
            className="w-full max-w-md object-contain rounded-xl shadow-lg"
          />
        </div>
      </motion.div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg bg-blue-50 border border-blue-200 p-10 rounded-xl shadow-xl text-black">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Register Your Company</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField icon={<FaBuilding />} name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Company Name" />
            <InputField icon={<FaIndustry />} name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" />
            <InputField icon={<FaEnvelope />} name="email" value={formData.email} onChange={handleChange} placeholder="Company Email" type="email" />
            <InputField icon={<FaLock />} name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" />

            <div className="relative">
              <FaImage className="absolute top-4 left-4 text-blue-500" />
              <input
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full pl-12 py-2 bg-white text-blue-700 border border-blue-300 rounded-lg"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
            >
              Register Company
            </motion.button>
            <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-700 font-semibold hover:underline">
            Click Here To Login 
            </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ icon, name, type = 'text', placeholder, value, onChange }: any) => (
  <div className="relative">
    <div className="absolute top-4 left-4 text-blue-500">{icon}</div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    />
  </div>
);

