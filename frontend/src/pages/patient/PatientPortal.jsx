import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, FileText, Activity, MessageSquare, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './Dashboard';
import BookAppointment from './BookAppointment';
import Records from './Records';
import AISymptomChecker from './AISymptomChecker';

const PatientPortal = () => {
  const location = useLocation();

  const navItems = [
    { path: '/patient', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/patient/book', label: 'Book Doctor', icon: Calendar },
    { path: '/patient/records', label: 'My Records', icon: FileText },
    { path: '/patient/symptoms', label: 'AI Health Assistant', icon: Activity },
  ];

  return (
    <motion.div 
      className="dashboard-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar */}
      <motion.div 
        className="sidebar"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Activity color="var(--primary)" size={28} strokeWidth={2.5} />
          </motion.div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', userSelect: 'none' }}>
            CareConnect
          </h2>
        </div>

        <motion.div 
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (location.pathname === '/patient/' && item.path === '/patient');
            return (
              <motion.div
                key={item.path}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <Link to={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          style={{ marginTop: 'auto' }}
        >
          <Link to="/" className="nav-link" style={{ color: 'var(--danger)' }}>
            <LogOut size={20} />
            Sign Out
          </Link>
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <div className="main-content" style={{ position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ width: '100%', height: '100%' }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/book" element={<BookAppointment />} />
              <Route path="/records" element={<Records />} />
              <Route path="/symptoms" element={<AISymptomChecker />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PatientPortal;
