import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyData = [
  { name: 'Week 1', heartRate: 72, sugar: 110, bpSys: 120 },
  { name: 'Week 2', heartRate: 75, sugar: 115, bpSys: 122 },
  { name: 'Week 3', heartRate: 71, sugar: 108, bpSys: 118 },
  { name: 'Week 4', heartRate: 74, sugar: 102, bpSys: 115 },
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="page-title">Patient Dashboard</h1>
      <p className="page-subtitle">Track your health analytics and upcoming appointments.</p>

      <div className="metrics-grid">
        <div className="glass-panel">
          <h3>Health Score</h3>
          <h1 style={{ fontSize: '3rem', color: 'var(--primary)', margin: '8px 0' }}>85</h1>
          <p style={{ color: 'var(--success)' }}>+5% from last month</p>
        </div>

        <div className="glass-panel">
          <h3>Latest Reading</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px' }}>
            <li style={{ padding: '4px 0' }}><strong>BP:</strong> 115/75 mmHg</li>
            <li style={{ padding: '4px 0' }}><strong>Sugar:</strong> 102 mg/dL</li>
            <li style={{ padding: '4px 0' }}><strong>BMI:</strong> 22.4</li>
          </ul>
        </div>
      </div>

      <div className="glass-panel" style={{ height: '400px', marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Health Metrics Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
            <XAxis dataKey="name" stroke="var(--text-light)" />
            <YAxis stroke="var(--text-light)" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <Legend />
            <Line type="monotone" dataKey="sugar" stroke="var(--primary)" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="bpSys" stroke="var(--secondary)" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
