import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const Dashboard = () => {
  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants} style={{ paddingBottom: '2rem' }}>
      <motion.div variants={itemVariants}>
        <h1 className="page-title">Earnings Dashboard</h1>
        <p className="page-subtitle">Track your platform analytics, revenue, and ratings.</p>
      </motion.div>

      <div className="metrics-grid" style={{ marginBottom: '32px' }}>
        <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(16, 185, 129, 0.15)' }} className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(255,255,255,0.5) 100%)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
          <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Earnings (This Week)</h3>
          <h1 style={{ fontSize: '3rem', color: 'var(--success)', margin: '12px 0 4px 0', lineHeight: 1 }}>₹19,550</h1>
          <p style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.9rem' }}>↑ 12% vs last week</p>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(79, 70, 229, 0.15)' }} className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(255,255,255,0.5) 100%)', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
          <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Consultations</h3>
          <h1 style={{ fontSize: '3rem', color: 'var(--primary)', margin: '12px 0 4px 0', lineHeight: 1 }}>34</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 500 }}>Scheduled this week</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="glass-panel" style={{ height: '420px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem' }}>Revenue Breakdown</h3>
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="name" stroke="var(--text-light)" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="var(--text-light)" tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '12px', color: 'white', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: 'rgba(79, 70, 229, 0.05)', radius: 8 }} 
            />
            <Bar dataKey="revenue" radius={[6, 6, 6, 6]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 6 ? "var(--primary)" : "rgba(79, 70, 229, 0.4)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
