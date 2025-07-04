'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaFileAlt,
  FaHome,
  FaPlus,
  FaSearch,
  FaBars,
  FaSpinner,
  FaBuilding,
  FaInfoCircle,
  FaShieldAlt
} from 'react-icons/fa';
import { debounce } from 'lodash';

export default function SearchCompanyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setCompanies([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('company_profiles')
          .select('*')
          .ilike('company_name', `%${term}%`)
          .limit(50); // Limit results for performance

        if (error) {
          throw error;
        }

        setCompanies(data || []);
      } catch (err: any) {
        console.error('Error fetching companies:', err.message);
        setError('Failed to fetch companies. Please try again.');
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Handle search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [sidebarOpen]);

  // Accessibility: Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-md brightness-75"
        style={{
          backgroundImage: "url('/assets/joinco.jpg')",
        }}
        aria-hidden="true"
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-400/30 z-0"></div>

      {/* Main Layout */}
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`bg-blue-900 text-white w-64 p-6 h-screen fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0 sm:relative sm:flex-shrink-0`}
          aria-label="Navigation sidebar"
        >
          <nav className="space-y-6 mt-8">
            <button 
              onClick={() => router.push('/')} 
              className="flex items-center gap-3 w-full p-2 rounded hover:bg-blue-800 hover:text-yellow-300 transition-colors"
            >
              <FaHome className="w-5 h-5" /> Home
            </button>
            <button 
              onClick={() => router.push('/manage-profile')} 
              className="flex items-center gap-3 w-full p-2 rounded hover:bg-blue-800 hover:text-yellow-300 transition-colors"
            >
              <FaPlus className="w-5 h-5" /> Manage Profile
            </button>
            <button 
              onClick={() => router.push('/create')} 
              className="flex items-center gap-3 w-full p-2 rounded hover:bg-blue-800 hover:text-yellow-300 transition-colors"
            >
              <FaPlus className="w-5 h-5" /> Create & Publish
            </button>
            <button 
              onClick={() => router.push('/apply')} 
              className="flex items-center gap-3 w-full p-2 rounded hover:bg-blue-800 hover:text-yellow-300 transition-colors"
            >
              <FaFileAlt className="w-5 h-5" /> Apply
            </button>
            <button 
              onClick={() => router.push('/company-search')} 
              className="flex items-center gap-3 w-full p-2 rounded bg-blue-800 text-yellow-300 transition-colors"
            >
              <FaSearch className="w-5 h-5" /> Company Search
            </button>
            <button 
              onClick={() => router.push("/secure-scalable")} 
              className="flex items-center gap-3 w-full p-2 rounded hover:bg-blue-800 hover:text-yellow-300 transition-colors"
            >
              <FaShieldAlt className="w-5 h-5" /> Secure & Scalable
            </button>
          </nav>
        </aside>

        {/* Hamburger Menu Button */}
        <button
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={sidebarOpen}
        >
          <FaBars size={20} />
        </button>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-8 py-10 sm:ml-64 flex flex-col items-center">
          <div className="w-full max-w-3xl space-y-8 bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-blue-900 text-center flex items-center justify-center gap-3">
              <FaBuilding className="text-blue-600" /> Search Companies
            </h1>

            {/* Search Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by company name..."
                  className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search companies"
                />
              </div>
              <button
                onClick={() => debouncedSearch(searchTerm)}
                disabled={loading || !searchTerm.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
              >
                {loading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
                Search
              </button>
            </div>

            {/* Help Text */}
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <FaInfoCircle className="text-blue-500" />
              Start typing to search for companies. Results will appear as you type.
            </p>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <p>{error}</p>
              </div>
            )}

            {/* Search Results */}
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <FaSpinner className="animate-spin text-blue-500 text-2xl" />
                  <span className="ml-2">Searching...</span>
                </div>
              ) : hasSearched && companies.length === 0 ? (
                <div className="text-center py-8 bg-blue-50 rounded-lg">
                  <p className="text-gray-700">No companies found matching your search.</p>
                  <p className="text-sm text-gray-500 mt-1">Try a different search term.</p>
                </div>
              ) : (
                <ul className="grid gap-3">
                  {companies.map((company) =>
                    company.company_name ? (
                      <li key={company.company_name}>
                        <Link
                          href={`/company/${encodeURIComponent(company.company_name)}`}
                          className="block border border-blue-200 hover:border-blue-300 hover:shadow-md p-4 sm:p-5 rounded-lg bg-white transition-all duration-200 group"
                        >
                          <h2 className="text-xl font-semibold text-blue-800 group-hover:text-blue-600">
                            {company.company_name}
                          </h2>
                          {company.services && (
                            <p className="text-gray-700 text-sm mt-2">
                              <span className="font-medium">Services:</span> {company.services}
                            </p>
                          )}
                          {company.industry && (
                            <p className="text-gray-700 text-sm mt-1">
                              <span className="font-medium">Industry:</span> {company.industry}
                            </p>
                          )}
                          <div className="mt-3 text-blue-600 text-sm font-medium group-hover:underline">
                            View company details →
                          </div>
                        </Link>
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </div>

            {/* Search Stats */}
            {hasSearched && companies.length > 0 && (
              <div className="text-sm text-gray-500 text-center pt-4 border-t border-gray-200">
                Found {companies.length} {companies.length === 1 ? 'company' : 'companies'}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}