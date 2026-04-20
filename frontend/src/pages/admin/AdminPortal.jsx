import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Users, Stethoscope, LogOut } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

const AdminPortal = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Platform Overview', icon: Shield },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar" style={{ backgroundColor: '#f0fdf4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <Shield color="var(--success)" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Admin Center</h2>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (location.pathname === '/admin/' && item.path === '/admin');
            return (
              <Link key={item.path} to={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link to="/" className="nav-link" style={{ marginTop: 'auto', color: 'var(--danger)' }}>
          <LogOut size={20} />
          Sign Out
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPortal;
