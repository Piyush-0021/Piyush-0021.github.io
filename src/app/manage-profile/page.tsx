'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  FaEdit,
  FaSave,
  FaHome,
  FaPlus,
  FaSearch,
  FaFileAlt,
  FaBars,
  FaShieldAlt,
  FaUserShield,
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

export default function ManageProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, setProfile] = useState({
    company_name: '',
    overview: '',
    services: '',
    experience: '',
    certifications: '',
    portfolio: '',
    team: '',
    infrastructure: '',
    quality_control: '',
    safety_environment: '',
    contact: '',
    turnover: '',
    sales: '',
    net_profit: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

      const { data } = await supabase
        .from('company_profiles')
        .select('*')
        .limit(1)
        .single();

      if (data) setProfile(data);
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    setLoading(true);
    const { error } = await supabase.from('company_profiles').upsert({
      ...profile,
      updated_at: new Date().toISOString(),
    });
    setLoading(false);

    if (error) {
      alert('❌ Error saving profile: ' + (error.message || 'Unknown error'));
    } else {
      alert('✅ Profile saved successfully');
      setEditing(false);
    }
  };

  const renderField = (label: string, name: keyof typeof profile) => (
    <div className="bg-white p-5 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">{label}</h3>
      {editing ? (
        <textarea
          name={name}
          value={profile[name] || ''}
          onChange={handleChange}
          rows={3}
          className="w-full border border-blue-300 rounded-lg p-2 resize-none"
        />
      ) : (
        <p className="text-gray-700 whitespace-pre-line">{profile[name]}</p>
      )}
    </div>
  );

  const renderFinancialField = (label: string, name: keyof typeof profile) => (
    <div className="bg-white p-5 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">{label}</h3>
      {editing ? (
        <input
          name={name}
          value={profile[name] || ''}
          onChange={handleChange}
          type="number"
          className="w-full border border-blue-300 rounded-lg p-2"
        />
      ) : (
        <p className="text-gray-700 whitespace-pre-line">{profile[name]}</p>
      )}
    </div>
  );

  const chartData = [
    { name: 'Turnover', value: Number(profile.turnover) || 0 },
    { name: 'Sales', value: Number(profile.sales) || 0 },
    { name: 'Net Profit', value: Number(profile.net_profit) || 0 },
  ];

  return (
    <div className="min-h-screen flex bg-blue-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white p-6 transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <nav className="space-y-6 mt-16 pl-2">
          <button onClick={() => router.push('/')} className="flex items-center gap-3 hover:text-yellow-300">
            <FaHome /> Home
          </button>
          <button onClick={() => router.push('/manage-profile')} className="flex items-center gap-3 text-yellow-300 font-semibold">
            <FaUserShield /> Manage Profile
          </button>
          <button onClick={() => router.push('/create')} className="flex items-center gap-3 hover:text-yellow-300">
            <FaPlus /> Create & Publish
          </button>
          <button onClick={() => router.push('/apply')} className="flex items-center gap-3 hover:text-yellow-300">
            <FaFileAlt /> Apply
          </button>
          <button onClick={() => router.push('/company-search')} className="flex items-center gap-3 hover:text-yellow-300">
            <FaSearch /> Company Search
          </button>
          <button onClick={() => router.push('/secure-scalable')} className="flex items-center gap-3 hover:text-yellow-300">
            <FaShieldAlt /> Secure & Scalable
          </button>
        </nav>
      </div>

      {/* Hamburger */}
      <button
        className="fixed top-4 left-4 sm:hidden z-50 bg-blue-600 text-white p-2 rounded-full shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars size={20} />
      </button>

      {/* Main Content */}
      <main className="flex-1 ml-0 sm:ml-64 px-6 py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-blue-900">Manage Company Profile</h2>
          {editing ? (
            <button
              onClick={saveProfile}
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded shadow hover:bg-green-700"
            >
              <FaSave /> {loading ? 'Saving...' : 'Save'}
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {renderField('Company Name', 'company_name')}
          {renderField('Company Overview', 'overview')}
          {renderField('Services / Products', 'services')}
          {renderField('Experience & Projects', 'experience')}
          {renderField('Certifications / Awards', 'certifications')}
          {renderField('Portfolio / Case Studies', 'portfolio')}
          {renderField('Team Info', 'team')}
          {renderField('Infrastructure & Tech', 'infrastructure')}
          {renderField('Quality Control Standards', 'quality_control')}
          {renderField('Safety & Environmental Policies', 'safety_environment')}
          {renderField('Contact Info', 'contact')}
        </div>

        {/* Financial Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Financial Overview</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {renderFinancialField('Turnover (₹)', 'turnover')}
            {renderFinancialField('Sales (₹)', 'sales')}
            {renderFinancialField('Net Profit (₹)', 'net_profit')}
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4 text-blue-800">Financial Chart</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 30, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="value" position="top" fill="#1f2937" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
