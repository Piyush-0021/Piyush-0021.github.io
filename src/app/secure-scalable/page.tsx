'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaHome,
  FaPlus,
  FaFileAlt,
  FaSearch,
  FaShieldAlt,
  FaBars,
  FaUserShield,
  FaServer,
  FaLock,
  FaChartLine,
  FaUsers
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecureScalablePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (window.innerWidth < 640 && sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [sidebarOpen]);

  const features = [
    {
      title: 'Military-Grade Encryption',
      description: 'All data is encrypted using AES-256 with perfect forward secrecy, ensuring secure transmission and storage at rest and in transit.',
      icon: <FaLock size={24} />,
      color: 'from-purple-600 to-blue-500'
    },
    {
      title: 'Zero-Trust Architecture',
      description: 'Role-based access control with JWT authentication and continuous verification keeps your accounts protected against modern threats.',
      icon: <FaUserShield size={24} />,
      color: 'from-red-600 to-orange-500'
    },
    {
      title: 'Auto-Scaling Infrastructure',
      description: 'Cloud-native architecture built on Kubernetes with serverless components that scale dynamically with your needs.',
      icon: <FaServer size={24} />,
      color: 'from-green-600 to-teal-500'
    },
    {
      title: 'Enterprise-Grade Isolation',
      description: 'Multi-tenant design with dedicated virtual private clouds for each organization, ensuring complete data isolation.',
      icon: <FaUsers size={24} />,
      color: 'from-yellow-600 to-amber-500'
    },
    {
      title: 'Real-Time Monitoring',
      description: 'Comprehensive logging and anomaly detection with 24/7 security monitoring and alerts.',
      icon: <FaChartLine size={24} />,
      color: 'from-indigo-600 to-purple-500'
    },
    {
      title: 'Disaster Recovery',
      description: 'Automated backups with geo-redundant storage and point-in-time recovery capabilities.',
      icon: <FaShieldAlt size={24} />,
      color: 'from-blue-600 to-cyan-500'
    },
  ];

  const stats = [
    { value: '99.99%', label: 'Uptime SLA' },
    { value: '256-bit', label: 'Encryption' },
    { value: 'ISO 27001', label: 'Certified' },
    { value: '<50ms', label: 'Response Time' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden font-sans bg-gray-50">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/assets/joinco.jpg')" }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/60 to-indigo-900/40 z-0" />

      <div className="relative z-10">
        {/* Desktop Sidebar (always visible) */}
        <aside
          ref={sidebarRef}
          className="hidden sm:block fixed top-0 left-0 z-40 w-72 h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-6 shadow-2xl"
        >
          <div className="flex flex-col h-full">
            <div className="mb-10 pt-4">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
                Secure Portal
              </h2>
            </div>
            
            <nav className="space-y-4 flex-1">
              <button 
                onClick={() => router.push('/')} 
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-700/50 w-full transition-all"
              >
                <FaHome className="flex-shrink-0" /> 
                <span>Home</span>
              </button>
              <button 
                onClick={() => router.push('/manage-profile')} 
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-700/50 w-full transition-all"
              >
                <FaUserShield className="flex-shrink-0" /> 
                <span>Manage Profile</span>
              </button>
              <button 
                onClick={() => router.push('/create')} 
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-700/50 w-full transition-all"
              >
                <FaPlus className="flex-shrink-0" /> 
                <span>Create & Publish</span>
              </button>
              <button 
                onClick={() => router.push('/apply')} 
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-700/50 w-full transition-all"
              >
                <FaFileAlt className="flex-shrink-0" /> 
                <span>Apply</span>
              </button>
              <button 
                onClick={() => router.push('/company-search')} 
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-700/50 w-full transition-all"
              >
                <FaSearch className="flex-shrink-0" /> 
                <span>Company Search</span>
              </button>
              <button 
                onClick={() => router.push('/secure-scalable')} 
                className="flex items-center gap-4 p-3 rounded-lg bg-blue-700/80 text-blue-100 font-medium w-full transition-all"
              >
                <FaShieldAlt className="flex-shrink-0" /> 
                <span>Secure & Scalable</span>
              </button>
            </nav>

            <div className="pt-6 border-t border-blue-700/50">
              <p className="text-sm text-blue-300/80">
                Trusted by enterprises worldwide
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar (animated) */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              ref={sidebarRef}
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="sm:hidden bg-gradient-to-b from-blue-900 to-blue-800 text-white w-72 p-6 h-screen fixed top-0 left-0 z-40 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="mb-10 pt-4">
                  <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
                    Secure Portal
                  </h2>
                </div>
                
                <nav className="space-y-4 flex-1">
                  <button 
                    onClick={() => {
                      router.push('/');
                      setSidebarOpen(false);
                    }} 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-700/50 w-full transition-all"
                  >
                    <FaHome className="flex-shrink-0" /> 
                    <span>Home</span>
                  </button>
                  <button 
                    onClick={() => {
                      router.push('/manage-profile');
                      setSidebarOpen(false);
                    }} 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-700/50 w-full transition-all"
                  >
                    <FaUserShield className="flex-shrink-0" /> 
                    <span>Manage Profile</span>
                  </button>
                  <button 
                    onClick={() => {
                      router.push('/create');
                      setSidebarOpen(false);
                    }} 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-700/50 w-full transition-all"
                  >
                    <FaPlus className="flex-shrink-0" /> 
                    <span>Create & Publish</span>
                  </button>
                  <button 
                    onClick={() => {
                      router.push('/apply');
                      setSidebarOpen(false);
                    }} 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-700/50 w-full transition-all"
                  >
                    <FaFileAlt className="flex-shrink-0" /> 
                    <span>Apply</span>
                  </button>
                  <button 
                    onClick={() => {
                      router.push('/company-search');
                      setSidebarOpen(false);
                    }} 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-700/50 w-full transition-all"
                  >
                    <FaSearch className="flex-shrink-0" /> 
                    <span>Company Search</span>
                  </button>
                  <button 
                    onClick={() => {
                      router.push('/secure-scalable');
                      setSidebarOpen(false);
                    }} 
                    className="flex items-center gap-4 p-3 rounded-lg bg-blue-700/80 text-blue-100 font-medium w-full transition-all"
                  >
                    <FaShieldAlt className="flex-shrink-0" /> 
                    <span>Secure & Scalable</span>
                  </button>
                </nav>

                <div className="pt-6 border-t border-blue-700/50">
                  <p className="text-sm text-blue-300/80">
                    Trusted by enterprises worldwide
                  </p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Hamburger Button (mobile only) */}
        <button
          className="fixed top-6 left-6 z-50 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg shadow-blue-900/30 transition-all sm:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={sidebarOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 90 },
              closed: { rotate: 0 }
            }}
          >
            <FaBars size={20} />
          </motion.div>
        </button>

        {/* Main Content */}
        <main className="ml-0 sm:ml-72 px-4 sm:px-8 py-8 transition-all duration-300 ease-in-out">
          <motion.div
            className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-lg p-8 sm:p-12 rounded-3xl shadow-xl space-y-12 mb-20 border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero Section */}
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Enterprise-Grade Security & Scalability
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-700 max-w-3xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Our platform is engineered with military-grade security protocols and cloud-native architecture to ensure your data remains protected while scaling effortlessly with your business needs.
              </motion.p>
              
              {/* Stats Grid */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm text-center"
                  >
                    <p className="text-2xl font-bold text-blue-800">{stat.value}</p>
                    <p className="text-sm text-blue-600">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Features Grid */}
            <div className="space-y-8">
              <motion.h2 
                className="text-2xl font-bold text-blue-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Our Security & Scalability Features
              </motion.h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className={`bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all cursor-pointer relative overflow-hidden group`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    onClick={() => setActiveFeature(activeFeature === idx ? null : idx)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                    </div>
                    
                    <AnimatePresence>
                      {activeFeature === idx && (
                        <motion.p 
                          className="text-gray-600 text-sm relative z-10"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    
                    {activeFeature !== idx && (
                      <motion.p 
                        className="text-gray-600 text-sm line-clamp-2 relative z-10"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {feature.description.substring(0, 100)}...
                      </motion.p>
                    )}
                    
                    <div className="mt-4 text-sm text-blue-600 font-medium relative z-10">
                      {activeFeature === idx ? 'Click to minimize' : 'Click to expand'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Value Proposition */}
            <motion.div 
              className="mt-16 space-y-8 bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">
                  Security and Performance You Can Trust
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  In today's digital landscape, security breaches and performance bottlenecks are not options. Our platform combines cutting-edge security with cloud-scale performance to give you peace of mind and competitive advantage.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                      <FaLock size={20} />
                    </div>
                    <h3 className="font-bold text-gray-800">Proactive Security</h3>
                    <p className="text-sm text-gray-600">
                      Continuous threat monitoring and automated patching keep your data protected against emerging threats.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                      <FaServer size={20} />
                    </div>
                    <h3 className="font-bold text-gray-800">Global Infrastructure</h3>
                    <p className="text-sm text-gray-600">
                      Deployed across multiple AWS regions with edge caching for low-latency access worldwide.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                      <FaChartLine size={20} />
                    </div>
                    <h3 className="font-bold text-gray-800">Proven Reliability</h3>
                    <p className="text-sm text-gray-600">
                      99.99% uptime SLA with 24/7 monitoring and rapid incident response.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to experience enterprise-grade security?
              </h3>
             <a
  href="mailto:security@example.com?subject=Security%20Inquiry&body=Hello%20team,%0D%0A%0D%0AI would like to get in touch regarding a security concern."
  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
>
  Contact Our Security Team
</a>


            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}