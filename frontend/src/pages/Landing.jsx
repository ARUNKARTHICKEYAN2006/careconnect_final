import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, User, Stethoscope, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 12 }
  }
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: 'spring', bounce: 0.5 } }
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container" style={{ flexDirection: 'column', gap: '48px', overflow: 'hidden' }}>
      {/* Decorative Background Blob */}
      <motion.div 
        style={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(255,255,255,0) 70%)',
          top: '-20%',
          left: '-10%',
          zIndex: -1,
          borderRadius: '50%'
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      <motion.div 
        style={{ textAlign: 'center', zIndex: 10 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{ 
              background: 'white', 
              padding: '16px', 
              borderRadius: '24px', 
              boxShadow: '0 8px 30px rgba(79,70,229,0.2)' 
            }}
          >
            <Activity size={56} color="var(--primary)" strokeWidth={2.5} />
          </motion.div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '4.5rem' }}>CareConnect</h1>
        </div>
        <p className="page-subtitle" style={{ fontSize: '1.4rem', fontWeight: 500, maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          The next generation of telemedicine. Connect with top doctors globally with intelligent health checkups.
        </p>
      </motion.div>

      <motion.div 
        className="metrics-grid" 
        style={{ maxWidth: '1100px', width: '100%', padding: '0 24px', zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="glass-panel" 
          style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} 
          onClick={() => navigate('/patient')}
          variants={itemVariants}
          whileHover={{ y: -12, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div variants={iconVariants} style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '24px' }}>
            <User size={48} color="var(--primary)" strokeWidth={2} />
          </motion.div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Patient Portal</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: 1.5 }}>Book appointments, check symptoms via AI, and securely manage your medical records.</p>
        </motion.div>

        <motion.div 
          className="glass-panel" 
          style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} 
          onClick={() => navigate('/doctor')}
          variants={itemVariants}
          whileHover={{ y: -12, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div variants={iconVariants} style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '24px' }}>
            <Stethoscope size={48} color="var(--secondary)" strokeWidth={2} />
          </motion.div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Doctor Portal</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: 1.5 }}>Manage patient queues, join virtual consultations, and easily write digital prescriptions.</p>
        </motion.div>

        <motion.div 
          className="glass-panel" 
          style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} 
          onClick={() => navigate('/admin')}
          variants={itemVariants}
          whileHover={{ y: -12, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div variants={iconVariants} style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '24px' }}>
            <Shield size={48} color="var(--success)" strokeWidth={2} />
          </motion.div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: 1.5 }}>Approve new doctors dynamically and monitor advanced system analytics across the platform.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
