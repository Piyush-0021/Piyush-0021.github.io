'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // Refresh to reflect logout
  };

  const features = [
    {
      title: 'Manage Profile',
      desc: 'Create a company profile and securely upload a logo/image. Easily update details anytime.',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135767.png',
      link: '/manage-profile',
    },
    {
      title: 'Create & Publish Tenders',
      desc: 'Submit tenders with title, deadline, budget, and description. Manage them in your dashboard.',
      image: 'https://cdn-icons-png.flaticon.com/512/891/891419.png',
      link: '/create',
    },
    {
      title: 'Apply to Tenders',
      desc: 'Submit detailed proposals to listed tenders and track application status in real-time.',
      image: 'https://cdn-icons-png.flaticon.com/512/3820/3820265.png',
      link: '/apply',
    },
    {
      title: 'Company Search',
      desc: 'Search verified companies by name, industry, or services. Discover ideal business partners.',
      image: 'https://cdn-icons-png.flaticon.com/512/891/891420.png',
      link: '/company-search',
    },
    // {
    //   title: 'Company Detail View',
    //   desc: 'Browse company profiles including description, industry, logo, and published tenders.',
    //   image: 'https://cdn-icons-png.flaticon.com/512/10691/10691167.png',
    //   link: '/company-profile-view',
    // },
    {
      title: 'Secure & Scalable',
      desc: 'Powered by Supabase and PostgreSQL, your data is safe, fast, and ready to grow with you.',
      image: 'https://cdn-icons-png.flaticon.com/512/942/942748.png',
      link: '/secure-scalable',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-sans text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-extrabold mb-6"
        >
          Welcome to BidHive
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
        >
          A B2B platform where businesses register, publish tenders, apply for opportunities, and find trusted partners.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex flex-wrap gap-4 justify-center mt-6"
        >
          {!isLoggedIn ? (
            <>
              <Link
                href="/register"
                className="bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-800 transition"
              >
                Register Company
              </Link>
              <Link
                href="/login"
                className="bg-white text-blue-700 border border-blue-700 px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-50 transition"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-red-700 transition"
              >
                Logout
              </button>
              <Link
                href="/dashboard/profile"
                className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-600 transition"
              >
                Go to Dashboard
              </Link>
            </>
          )}
          <Link
            href="#features"
            className="bg-blue-100 text-blue-900 border border-blue-300 px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-200 transition"
          >
            Explore Platform
          </Link>
        </motion.div>
      </section>

      {/* Registration Info */}
      <section id="register" className="py-20 bg-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Company Registration & Profile Setup</h2>
          <p className="text-gray-700 mb-10">
            Companies can sign up using a secure form with email and password, provide company metadata like name, industry, services, and upload a logo image using Supabase Storage. Profiles are then managed through the company dashboard.
          </p>
          <Image src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Register Company" width={160} height={160} className="mx-auto rounded-xl shadow-lg" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-blue-50">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, idx) => (
            <Link href={isLoggedIn || item.title === 'About Me' ? item.link : '/login'} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center cursor-pointer"
              >
                {!isLoggedIn && item.title !== 'About Me' && (
                  <div className="absolute top-3 right-3 text-gray-500 text-xl">🔒</div>
                )}
                <Image src={item.image} alt={item.title} width={100} height={100} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

    {/* About Us Section */}
<section id="about" className="py-20 bg-white px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6">About Us</h2>
    <p className="text-gray-700 text-lg mb-6">
      BidHive was created and is maintained by <strong>Piyush Gupta</strong>, with a clear mission: to simplify the way businesses manage tenders and connect with trusted partners.
      This platform is the result of a deep commitment to building systems that are secure, reliable, and user-centric.
    </p>
    <p className="text-gray-700 text-lg">
      With BidHive, the goal is to empower companies to focus less on complex procurement processes and more on strategic collaboration and growth.
      Every feature is designed to improve clarity, trust, and efficiency in the B2B ecosystem.
    </p>
  </div>
</section>

{/* Contact / Support Section */}
<section id="contact" className="py-20 bg-blue-50 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6">Contact & Support</h2>
    <p className="text-gray-700 text-lg mb-8">
      Have a question ? Feel free to reach out. I'm always happy to connect and support your journey on BidHive.
    </p>

    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <a
        href="mailto:guptapiyush2105@gmail.com"
        className="bg-white border border-blue-400 text-blue-700 px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-50 transition"
      >
        📧 Email Me
      </a>
       {/* <p className="max-w-4xl mx-auto text-center mt-6">Contact no - 7827908079</p> */}
      {/* <a
        href="https://www.linkedin.com/in/piyush-gupta-bab9b7292/"
        target="_blank"
        className="bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-800 transition"
      >
        🔗 Connect on LinkedIn
      </a> */}
    </div>
    <p className="text-sm text-gray-600 mt-6">
      Response time: Within 24 hours
    </p>
  </div>
</section>
      {/* Footer */}
      <footer className="text-center py-8 bg-blue-900 text-white mt-16">
        <p className="text-sm">© 2025 TenderLink. Built for B2B tender excellence.</p>
      </footer>
    </div>
  );
}