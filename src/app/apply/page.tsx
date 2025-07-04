'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import {
  FaFileAlt,
  FaHome,
  FaPlus,
  FaSearch,
  FaBars,
  FaFilter,
  FaShieldAlt,
} from 'react-icons/fa';

const categories = ['All', 'Construction', 'IT', 'Logistics', 'Healthcare', 'Education'];

export default function ApplyTenderPage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [applied, setApplied] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [proposal, setProposal] = useState('');
  const [email, setEmail] = useState('');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [sidebarOpen]);

  useEffect(() => {
    const fetchTenders = async () => {
      const { data, error } = await supabase.from('tenders').select('*').order('created_at', { ascending: false });
      if (error) console.error('Error fetching tenders:', error.message);
      else setTenders(data || []);
      setLoading(false);
    };
    fetchTenders();
  }, []);

  const openModal = (tenderId: string) => {
    setSelectedTenderId(tenderId);
    setProposal('');
    setEmail('');
    setShowModal(true);
  };

  const handleSubmitProposal = async () => {
    if (!proposal.trim() || !email.trim()) {
      alert('❗ Email and proposal are required.');
      return;
    }

    const { error } = await supabase.from('applications').insert([
      {
        tender_id: selectedTenderId,
        applicant_email: email,
        proposal_text: proposal,
      },
    ]);

    if (error) {
      console.error('Error submitting application:', error.message);
      alert('❌ Failed to apply. Try again later.');
    } else {
      setApplied((prev) => ({ ...prev, [selectedTenderId!]: true }));
      alert('✅ Proposal submitted successfully.');
      setShowModal(false);
    }
  };

  const filteredTenders =
    selectedCategory === 'All'
      ? tenders
      : tenders.filter((t) => t.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-md brightness-75"
        style={{
          backgroundImage: "url('/assets/joinco.jpg')", // 🔁 Replace with your preferred image
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-400/30 z-0"></div>

      {/* Main Content Area */}
      <div className="relative z-10">
        {/* Sidebar */}
      <aside
  ref={sidebarRef}
  className={`bg-blue-900 text-white w-64 h-screen overflow-y-auto fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  } sm:translate-x-0 p-6`} // ✅ Add padding
>
  {/* <nav className="space-y-6 mt-8">
    ...
  </nav> */}
          <nav className="space-y-6 mt-8">
            <button onClick={() => router.push('/')} className="flex items-center gap-3 hover:text-yellow-300">
              <FaHome /> Home
            </button>
            <button onClick={() => router.push('/manage-profile')} className="flex items-center gap-3 hover:text-yellow-300">
              <FaPlus /> Manage Profile
            </button>
            <button onClick={() => router.push('/create')} className="flex items-center gap-3 hover:text-yellow-300">
              <FaPlus /> Create & Publish
            </button>
            <button onClick={() => router.push('/apply')} className="flex items-center gap-3 text-yellow-300">
              <FaFileAlt /> Apply
            </button>
            <button onClick={() => router.push('/company-search')} className="flex items-center gap-3 hover:text-yellow-300">
              <FaSearch /> Company Search
            </button>
             <button onClick={() => router.push("/secure-scalable")} className="flex items-center gap-3 hover:text-yellow-300">
            <FaShieldAlt /> Secure & Scalable
          </button>
          </nav>
        </aside>

        {/* Sidebar Toggle */}
        <button
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg sm:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars size={20} />
        </button>

        {/* Main Section */}
        <main className="px-4 sm:px-8 py-10 pl-0 sm:pl-64 flex flex-col items-center transition-all duration-300 ease-in-out">

          <div className="w-full max-w-6xl space-y-10">

{/* <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2" style={{ color: '#0c1a2f' }}>
  <FaFileAlt /> Available Tenders
</h1> */}
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap justify-center items-center">
              <span className="text-gray-700 font-medium flex items-center gap-1">
                <FaFilter /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    selectedCategory === cat
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  } transition`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tender List */}
            {loading ? (
              <p className="text-center text-white">Loading tenders...</p>
            ) : filteredTenders.length === 0 ? (
              <p className="text-center text-white">No tenders available in this category.</p>
            ) : (
              <div className="space-y-6">
                {filteredTenders.map((tender) => (
                  <div
                    key={tender.id}
                    className="bg-white/70 backdrop-blur p-6 border border-blue-100 rounded-xl shadow hover:shadow-lg transition w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
                  >
                    <div className="flex-1 space-y-1 text-black">
                      <h2 className="text-xl text-blue-800 font-bold flex items-center gap-2">
                        <FaFileAlt /> {tender.title}
                      </h2>
                      <p><strong>Category:</strong> {tender.category}</p>
                      <p><strong>Deadline:</strong> {tender.deadline}</p>
                      <p><strong>Budget:</strong> ₹{tender.budget}</p>
                      <p><strong>Description:</strong> {tender.description}</p>
                      <p className="text-sm text-gray-600"><strong>Contact:</strong> {tender.contact_email}</p>
                    </div>
                    <div className="w-full lg:w-56">
                      <button
                        className={`${
                          applied[tender.id] ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                        } text-white w-full text-center py-3 rounded-lg transition text-sm sm:h-12 h-16 sm:text-base`}
                        onClick={() => openModal(tender.id)}
                        disabled={applied[tender.id]}
                      >
                        {applied[tender.id] ? 'Applied' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md border border-gray-300">
                <h2 className="text-xl font-bold text-blue-700 mb-4">Submit Proposal</h2>
                <input
                  type="email"
                  className="w-full mb-3 border border-gray-300 p-2 rounded-lg text-black"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  className="w-full border border-gray-300 p-2 rounded-lg min-h-[100px] text-black"
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder="Write your proposal here..."
                ></textarea>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                  <button onClick={handleSubmitProposal} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
