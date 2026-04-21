import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Activity, HeartPulse, Droplet, Weight } from 'lucide-react';

const dummyData = [
  { name: 'Week 1', heartRate: 72, sugar: 110, bpSys: 120 },
  { name: 'Week 2', heartRate: 75, sugar: 115, bpSys: 122 },
  { name: 'Week 3', heartRate: 71, sugar: 108, bpSys: 118 },
  { name: 'Week 4', heartRate: 74, sugar: 102, bpSys: 115 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const Dashboard = () => {
  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants} style={{ paddingBottom: '2rem' }}>
      <motion.div variants={itemVariants}>
        <h1 className="page-title">Health Overview</h1>
        <p className="page-subtitle">Real-time insights and biometric tracking.</p>
      </motion.div>

      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '32px' }}>
        
        {/* Metric 1 */}
        <motion.div variants={itemVariants} className="glass-panel" whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(16, 185, 129, 0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Overall Health</p>
              <h1 style={{ fontSize: '3.5rem', color: 'var(--accent)', margin: '4px 0', lineHeight: 1 }}>85<span style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>/100</span></h1>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '16px' }}>
              <Activity color="var(--accent)" size={28} />
            </div>
          </div>
          <p style={{ color: 'var(--success)', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
            <span style={{ background: 'rgba(16,185,129,0.2)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>↑ 5%</span> from last month
          </p>
        </motion.div>

        {/* Metric 2 */}
        <motion.div variants={itemVariants} className="glass-panel" whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(79, 70, 229, 0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Blood Pressure</p>
              <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: '12px 0 4px 0', lineHeight: 1 }}>115<span style={{ fontSize: '1.5rem' }}>/75</span></h1>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>mmHg</p>
            </div>
            <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '12px', borderRadius: '16px' }}>
              <HeartPulse color="var(--primary)" size={28} />
            </div>
          </div>
        </motion.div>

        {/* Metric 3 */}
        <motion.div variants={itemVariants} className="glass-panel" whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(244, 63, 94, 0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Blood Sugar</p>
              <h1 style={{ fontSize: '2.5rem', color: 'var(--secondary)', margin: '12px 0 4px 0', lineHeight: 1 }}>102</h1>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>mg/dL</p>
            </div>
            <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '12px', borderRadius: '16px' }}>
              <Droplet color="var(--secondary)" size={28} />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="glass-panel" style={{ height: '450px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.05) 0%, transparent 100%)', pointerEvents: 'none' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Biometric Trend Analysis</h3>
          <span style={{ background: 'var(--bg-dark)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem' }}>This Month</span>
        </div>

        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={dummyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="var(--text-light)" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="var(--text-light)" tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', color: 'white' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="bpSys" stroke="var(--primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorPrimary)" activeDot={{ r: 8, strokeWidth: 0 }} />
            <Area type="monotone" dataKey="sugar" stroke="var(--accent)" strokeWidth={4} fillOpacity={1} fill="url(#colorAccent)" activeDot={{ r: 8, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
