'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  FaHome,
  FaChartLine,
  FaPlus,
  FaFileAlt,
  FaSearch,
  FaMoneyBillWave,
  FaBox,
  FaBell,
  FaEdit,
  FaBars,
  FaUserTie,
  FaBuilding,
  FaChartPie,
  FaRupeeSign,
  FaChartBar,
  FaUserShield,
  FaShieldAlt,
} from 'react-icons/fa';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Application {
  id: string;
  applicant_email: string;
  tender_id: string;
  status: string;
  created_at: string;
}

interface Tender {
  id: string;
  title: string;
  institution: string;
  description: string;
  date: string;
  deadline: string;
  location: string;
  status: string;
  value: number;
}

interface CompanyProfile {
  id?: string;
  company_name: string;
  industry: string;
  employees: number;
  logo_url?: string;
  turnover?: number;
  sales?: number;
  net_profit?: number;
  image_url?: string;
  salary_expense?: number;
  expected_growth?: number;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<CompanyProfile>({ 
  company_name: '', 
  industry: '',
  employees: 0
});

  const [logo, setLogo] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchCompanyProfile();
    fetchApplications();
    fetchTenders();
  }, []);

  // async function fetchCompanyProfile() {
  //   const { data } = await supabase
  //     .from('company_profiles')
  //     .select('*')
  //     .limit(1)
  //     .single();
  //   if (data) setProfile(data);
  // }

 async function fetchCompanyProfile() {
  const { data } = await supabase
    .from('company_profiles')
    .select('*')
    .limit(1)
    .single();
    
  if (data) {
    setProfile({
      company_name: data.name || '',
      industry: data.industry || '',
      employees: data.employees || 0,
      turnover: data.turnover || 0,
      sales: data.sales || 0,
      net_profit: data.net_profit || 0,
      salary_expense: data.salary_expense || 0,
      expected_growth: data.expected_growth || 0,
      logo_url: data.logo_url || '',
      image_url: data.image_url || '',
    });
  }
}


  async function fetchApplications() {
    const { data } = await supabase.from('applications').select('*');
    if (data) setApplications(data);
  }

  async function fetchTenders() {
    const { data } = await supabase.from('tenders').select('*');
    if (data) setTenders(data);
  }

  // async function handleSave() {
  //   const { data, error } = await supabase.from('company_profiles').upsert({
  //     ...profile,
  //     logo_url: profile.logo_url || '',
  //     image_url: profile.image_url || '',
  //   }).select().single();

  //   if (data && !error) {
  //     setProfile(data);
  //     setIsEditing(false);
  //   }
  // }
  async function handleSave() {
  const { data, error } = await supabase
    .from('company_profiles')
    .upsert({
      id: profile.id, // Make sure to send the ID here
      ...profile,
      logo_url: profile.logo_url || '',
      image_url: profile.image_url || '',
    })
    .select()
    .single();

  if (data && !error) {
    setProfile(data);
    setIsEditing(false);
  } else {
    console.error('❌ Error saving profile:', error?.message);
  }
}


  async function handleLogoUpload(file: File) {
    const ext = file.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage
      .from('logos')
      .upload(fileName, file, { upsert: true });
    
    if (data && !error) {
      const { data: publicUrl } = supabase.storage
        .from('logos')
        .getPublicUrl(data.path);
      setProfile(p => ({ ...p, logo_url: publicUrl.publicUrl }));
    }
  }

  async function handleImageUpload(file: File) {
    const ext = file.name.split('.').pop();
    const fileName = `image-${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file, { upsert: true });
    
    if (data && !error) {
      const { data: publicUrl } = supabase.storage
        .from('images')
        .getPublicUrl(data.path);
      setProfile(p => ({ ...p, image_url: publicUrl.publicUrl }));
    }
  }

  const financialData = [
    { name: 'Turnover', value: Number(profile.turnover) || 0 },
    { name: 'Sales', value: Number(profile.sales) || 0 },
    { name: 'Net Profit', value: Number(profile.net_profit) || 0 },
    { name: 'Salary Expense', value: Number(profile.salary_expense) || 0 },
  ];

  const growthData = [
    { name: 'Current', value: Number(profile.sales) || 0 },
    { name: 'Expected', value: Number(profile.expected_growth) || 0 },
  ];

  const recentApplications = applications.slice(0, 5);
  const recentTenders = tenders.slice(0, 5);

  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Turnover</p>
              <h3 className="text-2xl font-bold">
                ₹{(profile.turnover || 0).toLocaleString()}
              </h3>
            </div>
            <FaRupeeSign className="text-3xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Net Profit</p>
              <h3 className="text-2xl font-bold">
                ₹{(profile.net_profit || 0).toLocaleString()}
              </h3>
            </div>
            <FaChartLine className="text-3xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Active Tenders</p>
              <h3 className="text-2xl font-bold">
                {tenders.filter(t => t.status === 'active').length}
              </h3>
            </div>
            <FaFileAlt className="text-3xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Applications</p>
              <h3 className="text-2xl font-bold">{applications.length}</h3>
            </div>
            <FaUserTie className="text-3xl opacity-70" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Overview</h3>
          <Chart
            options={{
              chart: { 
                id: 'financial',
                toolbar: { show: true },
                foreColor: '#6b7280'
              },
              xaxis: { 
                categories: financialData.map(d => d.name),
                labels: { style: { colors: '#6b7280' } }
              },
              yaxis: {
                labels: { style: { colors: '#6b7280' } },
                title: { text: 'Amount (₹)', style: { color: '#6b7280' } },
              },
              dataLabels: { 
                enabled: true,
                formatter: (val: number) => `₹${val.toLocaleString()}`,
              },
              colors: ['#3b82f6', '#10b981', '#6366f1', '#f59e0b'],
              grid: { borderColor: '#e5e7eb', strokeDashArray: 4 },
              tooltip: {
                y: {
                  formatter: (val: number) => `₹${val.toLocaleString()}`,
                },
              },
            }}
            series={[{ name: 'Amount', data: financialData.map(d => d.value) }]}
            type="bar"
            height={300}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Growth Projection</h3>
          <Chart
            options={{
              chart: { 
                id: 'growth',
                foreColor: '#6b7280'
              },
              labels: growthData.map(d => d.name),
              colors: ['#10b981', '#3b82f6'],
              dataLabels: {
                enabled: true,
                formatter: (val: number) => `₹${val.toLocaleString()}`,
              },
              tooltip: {
                y: {
                  formatter: (val: number) => `₹${val.toLocaleString()}`,
                },
              },
            }}
            series={growthData.map(d => d.value)}
            type="donut"
            height={300}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Applications</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tender ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.tender_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.applicant_email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${app.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Tenders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTenders.map((tender) => (
                  <tr key={tender.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tender.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tender.institution}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{tender.value?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  const renderProfile = () => (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Company Profile</h2>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.company_name}
                  onChange={(e) => setProfile({...profile, company_name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.company_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.industry}
                  onChange={(e) => setProfile({...profile, industry: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.industry}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.employees}
                  onChange={(e) => setProfile({...profile, employees: parseInt(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.employees}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Turnover (₹)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.turnover}
                  onChange={(e) => setProfile({...profile, turnover: parseFloat(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-100 p-2 rounded">₹{(profile.turnover || 0).toLocaleString()}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Sales (₹)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.sales}
                  onChange={(e) => setProfile({...profile, sales: parseFloat(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-100 p-2 rounded">₹{(profile.sales || 0).toLocaleString()}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Net Profit (₹)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.net_profit}
                  onChange={(e) => setProfile({...profile, net_profit: parseFloat(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-100 p-2 rounded">₹{(profile.net_profit || 0).toLocaleString()}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary Expense (₹)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.salary_expense}
                  onChange={(e) => setProfile({...profile, salary_expense: parseFloat(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-100 p-2 rounded">₹{(profile.salary_expense || 0).toLocaleString()}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Growth (₹)</label>
            {isEditing ? (
              <input
                type="number"
                value={profile.expected_growth}
                onChange={(e) => setProfile({...profile, expected_growth: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 bg-gray-100 p-2 rounded">₹{(profile.expected_growth || 0).toLocaleString()}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
            {profile.logo_url ? (
              <div className="flex flex-col items-center">
                <img src={profile.logo_url} alt="Company Logo" className="w-32 h-32 rounded-full object-cover mb-2" />
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleLogoUpload(e.target.files[0])}
                    className="text-sm text-gray-500"
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <span className="text-gray-500">No logo</span>
                </div>
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleLogoUpload(e.target.files[0])}
                    className="text-sm text-gray-500"
                  />
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Image</label>
            {profile.image_url ? (
              <div className="flex flex-col items-center">
                <img src={profile.image_url} alt="Company Image" className="w-full h-48 rounded-lg object-cover mb-2" />
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                    className="text-sm text-gray-500"
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-full h-48 rounded-lg bg-gray-200 flex items-center justify-center mb-2">
                  <span className="text-gray-500">No image</span>
                </div>
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                    className="text-sm text-gray-500"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <aside
        className={`bg-blue-800 text-white p-4 space-y-6 transition-all duration-300 fixed h-full ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              {profile.logo_url ? (
                <img src={profile.logo_url} alt="Logo" className="h-10 w-10 rounded-full" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center">
                  <FaBuilding className="text-white text-xl" />
                </div>
              )}
              {/* <h2 className="text-xl font-bold truncate">
                {profile.company_name || 'Dashboard'}
              </h2> */}
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-blue-200"
          >
            <FaBars />
          </button>
        </div>

       <nav className="space-y-1">

  {/* ✅ Home Button - goes to "/" */}
  <Link
    href="/"
    className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-blue-700"
  >
    <FaHome className="text-lg" />
    {sidebarOpen && <span className="ml-3">Home</span>}
  </Link>

  {/* 🟦 Dashboard */}
  <button
    onClick={() => setActiveTab('dashboard')}
    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
      activeTab === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'
    }`}
  >
    <FaChartLine className="text-lg" />
    {sidebarOpen && <span className="ml-3">Dashboard</span>}
  </button>
<Link
    href="/manage-profile"
    className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-blue-700"
  >
    <FaUserShield className="text-lg" />
    {sidebarOpen && <span className="ml-3">Manage Profile</span>}
  </Link>
  <Link
    href="/create"
    className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-blue-700"
  >
    <FaPlus className="text-lg" />
    {sidebarOpen && <span className="ml-3">Create & Publish</span>}
  </Link>
  <Link
    href="/apply"
    className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-blue-700"
  >
    <FaFileAlt className="text-lg" />
    {sidebarOpen && <span className="ml-3">Apply</span>}
  </Link>
  <Link
    href="/company-search"
    className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-blue-700"
  >
    <FaSearch className="text-lg" />
    {sidebarOpen && <span className="ml-3">Comany Search</span>}
  </Link>
  <Link
    href="/secure-scalable"
    className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-blue-700"
  >
    <FaShieldAlt className="text-lg" />
    {sidebarOpen && <span className="ml-3">Secure & Scalable</span>}
  </Link>
   </nav>
  {/* 
    <button
    onClick={() => setActiveTab('tenders')}
    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
      activeTab === 'tenders' ? 'bg-blue-700' : 'hover:bg-blue-700'
    }`}
  >
    <FaFileAlt className="text-lg" />
    {sidebarOpen && <span className="ml-3">Tenders</span>}
  </button>

 
  <button
    onClick={() => setActiveTab('applications')}
    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
      activeTab === 'applications' ? 'bg-blue-700' : 'hover:bg-blue-700'
    }`}
  >
    <FaChartBar className="text-lg" />
    {sidebarOpen && <span className="ml-3">Applications</span>}
  </button>

  <button
    onClick={() => setActiveTab('financials')}
    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
      activeTab === 'financials' ? 'bg-blue-700' : 'hover:bg-blue-700'
    }`}
  >
    <FaRupeeSign className="text-lg" />
    {sidebarOpen && <span className="ml-3">Financials</span>}
  </button>
</nav>  */}

      </aside>

      <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'profile' && 'Company Profile'}
            {activeTab === 'tenders' && 'Tender Management'}
            {activeTab === 'applications' && 'Application Tracking'}
            {activeTab === 'financials' && 'Financial Analysis'}
          </h1>
          <p className="text-gray-600">
            {activeTab === 'dashboard' && 'Your comprehensive business overview'}
            {activeTab === 'profile' && 'Manage your company information and branding'}
            {activeTab === 'tenders' && 'View and manage all tender opportunities'}
            {activeTab === 'applications' && 'Track all tender applications and statuses'}
            {activeTab === 'financials' && 'Analyze your financial performance'}
          </p>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'tenders' && <div>Tenders Content</div>}
        {activeTab === 'applications' && <div>Applications Content</div>}
        {activeTab === 'financials' && <div>Financials Content</div>}
      </main>
    </div>
  );
}