'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function CompanyDetailPage() {
  const params = useParams();
  const companyName = decodeURIComponent(params.company_name as string);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyName) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .ilike('company_name', companyName)
        .single();

      if (error) {
        console.error('❌ Error fetching company:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [companyName]);

  if (loading) return <p className="text-center text-gray-500 py-10">Loading...</p>;
  if (!profile) return <p className="text-center text-red-500 py-10">Company not found</p>;

  return (
    <div className="min-h-screen px-6 py-12 bg-blue-50 text-black">
      <div className="max-w-4xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow">
        {/* Logo */}
        {profile.logo_url && (
          <img
            src={profile.logo_url}
            alt={`${profile.company_name} Logo`}
            className="w-32 h-32 object-contain rounded border shadow mb-4"
          />
        )}

        {/* Company Name */}
        <h1 className="text-3xl font-bold text-blue-800">{profile.company_name}</h1>

        {/* Profile Fields */}
        <div className="grid sm:grid-cols-2 gap-6 text-sm">
          {[
            ['Overview', profile.overview],
            ['Services', profile.services],
            ['Experience', profile.experience],
            ['Certifications', profile.certifications],
            ['Portfolio', profile.portfolio],
            ['Team', profile.team],
            ['Infrastructure', profile.infrastructure],
            ['Quality Control', profile.quality_control],
            ['Safety', profile.safety_environment],
            ['Contact', profile.contact],
            ['Turnover (₹)', profile.turnover],
            ['Sales (₹)', profile.sales],
            ['Net Profit (₹)', profile.net_profit],
          ].map(([label, value], idx) => (
            <div key={idx} className="bg-blue-50 p-4 rounded-lg shadow-sm border">
              <p className="text-gray-500 font-medium">{label}</p>
              <p className="text-gray-900">{value || '—'}</p>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 hover:underline text-sm mt-6"
        >
          ← Back to Search
        </button>
      </div>
    </div>
  );
}
