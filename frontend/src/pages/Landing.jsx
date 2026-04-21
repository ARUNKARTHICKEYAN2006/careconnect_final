import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, User, Stethoscope, Shield, CheckCircle, Smartphone, Globe, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const portalCards = [
  {
    title: "Patient Portal",
    desc: "Book appointments, check symptoms via AI, and securely manage your medical records.",
    icon: User,
    color: "var(--primary)",
    gradient: "rgba(79, 70, 229, 0.1)",
    path: "/patient"
  },
  {
    title: "Doctor Portal",
    desc: "Manage patient queues, join virtual consultations, and easily write digital prescriptions.",
    icon: Stethoscope,
    color: "var(--secondary)",
    gradient: "rgba(244, 63, 94, 0.1)",
    path: "/doctor"
  },
  {
    title: "Admin Portal",
    desc: "Approve new doctors dynamically and monitor advanced system analytics across the platform.",
    icon: Shield,
    color: "var(--accent)",
    gradient: "rgba(16, 185, 129, 0.1)",
    path: "/admin"
  }
];

const Landing = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Dynamic Background */}
      <div className="mesh-container">
        <div className="mesh-blob" style={{ width: '40vw', height: '40vw', background: 'var(--primary)', top: '-10%', left: '-10%', animationDelay: '0s' }}></div>
        <div className="mesh-blob" style={{ width: '30vw', height: '30vw', background: 'var(--secondary)', bottom: '0', right: '0', animationDelay: '-5s' }}></div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="auth-container" 
        style={{ flexDirection: 'column', gap: '48px', padding: '100px 24px', opacity, scale }}
      >
        <motion.div 
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '32px' }}>
             <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{ padding: '12px', background: 'white', borderRadius: '20px', boxShadow: '0 20px 50px rgba(79,70,229,0.2)' }}
            >
              <Activity size={48} color="var(--primary)" />
            </motion.div>
            <h1 className="page-title" style={{ margin: 0, fontSize: '5rem', lineHeight: 1 }}>CareConnect</h1>
          </div>
          <p className="page-subtitle" style={{ fontSize: '1.6rem', fontWeight: 500, maxWidth: '700px', margin: '0 auto', color: 'var(--text-dark)', opacity: 0.8 }}>
            Healthcare reimagined. Instant access to global specialists with AI-powered diagnostics.
          </p>
        </motion.div>

        <div className="metrics-grid" style={{ maxWidth: '1200px', width: '100%' }}>
          {portalCards.map((card, i) => (
            <motion.div 
              key={i}
              className="glass-panel" 
              style={{ textAlign: 'center', cursor: 'pointer', padding: '48px 32px' }} 
              onClick={() => navigate(card.path)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -15, scale: 1.02, boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}
            >
              <div style={{ background: card.gradient, width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', margin: '0 auto 24px' }}>
                <card.icon size={40} color={card.color} strokeWidth={2.5} />
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>{card.title}</h2>
              <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.6 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <section style={{ padding: '120px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', textAlign: 'center' }}>
          {[
            { label: 'Verified Doctors', val: '500+' },
            { label: 'Protected Patients', val: '10k+' },
            { label: 'Uptime Guarantee', val: '99.9%' },
            { label: 'Global Regions', val: '24/7' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{stat.val}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Detail Section */}
      <section style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>Encrypted & Secure Consultations</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '32px' }}>
              Your privacy is our priority. All consultations use military-grade end-to-end encryption. Experience the gold standard in telehealth security.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: ShieldCheck, text: "HIPAA & GDPR Compliant Infra" },
                { icon: Globe, text: "Global Network of Specialists" },
                { icon: Smartphone, text: "Access from any device" }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: 'var(--accent)', padding: '8px', borderRadius: '10px' }}>
                    <item.icon size={20} color="white" />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            style={{ position: 'relative' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
             <div style={{ 
               width: '100%', 
               aspectRatio: '1', 
               background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
               borderRadius: '40px',
               boxShadow: '0 40px 100px rgba(79,70,229,0.3)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               color: 'white',
               fontSize: '2rem',
               fontWeight: 800,
               textAlign: 'center',
               padding: '40px'
             }}>
               <motion.div
                 animate={{ y: [0, -20, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               >
                 Premium Health Experience<br/>Starting Now.
               </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '80px 24px', textAlign: 'center', borderTop: '1px solid #e2e8f0', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <Activity size={24} color="var(--primary)" />
          <h3 style={{ fontWeight: 800, fontSize: '1.5rem' }}>CareConnect</h3>
        </div>
        <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>© 2026 CareConnect Global Inc. All health data is encrypted.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Contact Support</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
