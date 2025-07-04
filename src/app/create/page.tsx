'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  FaSave,
  FaHome,
  FaPlus,
  FaFileAlt,
  FaSearch,
  FaBars,
  FaUserShield,
  FaShieldAlt,
} from 'react-icons/fa';

export default function CreateTenderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [tender, setTender] = useState({
    title: '',
    description: '',
    category: '',
    deadline: '',
    budget: '',
    contact_email: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTender((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!tender.title || !tender.description || !tender.deadline) {
      alert('❌ Please fill in all required fields.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('tenders').insert({
      ...tender,
      created_at: new Date().toISOString(),
    });

    setLoading(false);
    if (error) {
      alert('❌ Failed to create tender: ' + error.message);
    } else {
      alert('✅ Tender published successfully!');
      router.push('/');
    }
  };

  const navItems = [
    { icon: <FaHome />, label: 'Home', path: '/' },
    { icon: <FaUserShield />, label: 'Manage Profile', path: '/manage-profile' },
    { icon: <FaPlus />, label: 'Create', path: '/create' },
    { icon: <FaFileAlt />, label: 'Apply', path: '/apply' },
    { icon: <FaSearch />, label: 'Search', path: '/company-search' },
    { icon: <FaShieldAlt />, label: 'Secure', path: '/secure-scalable' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* 🔵 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-md brightness-75"
        style={{ backgroundImage: "url('/assets/joinco.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-blue-300/20 z-0" />

      {/* 🔷 Layout Wrapper */}
      <div className="relative z-10 flex">

        {/* 🔷 Sidebar */}
        <aside
          className={`bg-blue-900 text-white w-64 p-6 h-screen fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:relative sm:flex-shrink-0`}
        >
          <nav className="space-y-6 mt-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setShowSidebar(false);
                }}
                className={`flex items-center gap-3 w-full text-left ${
                  item.path === '/create'
                    ? 'text-yellow-300 font-semibold'
                    : 'hover:text-yellow-300'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* 🔷 Hamburger (Mobile) */}
        <button
          className="sm:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <FaBars size={20} />
        </button>

        {/* 🔷 Sidebar Overlay on Mobile */}
        {showSidebar && (
          <div
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 bg-black/40 z-30 sm:hidden"
          />
        )}

        {/* 🔷 Main Content */}
        <main className="flex-1 sm:ml-64 px-4 sm:px-10 py-10">
          <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-2xl space-y-8">
            <h1 className="text-4xl font-bold text-blue-900 text-center drop-shadow">
              ✨ Create & Publish Tender
            </h1>
            <div className="grid gap-4">
              <input
                type="text"
                name="title"
                placeholder="Tender Title"
                value={tender.title}
                onChange={handleChange}
               className="w-full border border-blue-300 p-3 rounded placeholder-gray-500 text-black"
               />

               <textarea
              name="description"
               placeholder="Tender Description"
              value={tender.description}
              onChange={handleChange}
                rows={5}
                 className="w-full border border-blue-300 p-3 rounded resize-none placeholder-gray-500 text-black"
                />

              <input
                type="text"
                name="category"
                placeholder="Category (e.g., IT, Construction)"
                value={tender.category}
                onChange={handleChange}
                className="w-full border border-blue-300 p-3 rounded placeholder-gray-500"
              />
              <input
                type="date"
                name="deadline"
                value={tender.deadline}
                onChange={handleChange}
                className="w-full border border-blue-300 p-3 rounded"
              />
              <input
                type="number"
                name="budget"
                placeholder="Estimated Budget (₹)"
                value={tender.budget}
                onChange={handleChange}
                className="w-full border border-blue-300 p-3 rounded placeholder-gray-500"
              />
              <input
                type="email"
                name="contact_email"
                placeholder="Contact Email"
                value={tender.contact_email}
                onChange={handleChange}
                className="w-full border border-blue-300 p-3 rounded placeholder-gray-500"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transition"
            >
              <FaSave />
              {loading ? 'Publishing...' : 'Publish Tender'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
