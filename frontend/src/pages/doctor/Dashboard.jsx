import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="page-title">Earnings Dashboard</h1>
      <p className="page-subtitle">Track your platform analytics, revenue, and ratings.</p>

      <div className="metrics-grid">
        <div className="glass-panel" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)' }}>
          <h3>Total Earnings (This Week)</h3>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--success)', margin: '8px 0' }}>₹19,550</h1>
          <p style={{ color: 'var(--text-light)' }}>+12% vs last week</p>
        </div>

        <div className="glass-panel" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)' }}>
          <h3>Consultations</h3>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: '8px 0' }}>34</h1>
          <p style={{ color: 'var(--text-light)' }}>Scheduled this week</p>
        </div>
      </div>

      <div className="glass-panel" style={{ height: '400px' }}>
        <h3 style={{ marginBottom: '16px' }}>Revenue Breakdown</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
            <XAxis dataKey="name" stroke="var(--text-light)" />
            <YAxis stroke="var(--text-light)" />
            <Tooltip contentStyle={{ borderRadius: '8px' }} cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }} />
            <Bar dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
