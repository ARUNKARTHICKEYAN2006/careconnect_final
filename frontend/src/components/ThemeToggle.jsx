import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsDark(!isDark)}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'white',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
        boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 9999,
        color: isDark ? '#f8fafc' : '#0f172a'
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 360 : 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {isDark ? <Moon size={24} color="#fef08a" /> : <Sun size={24} color="#eab308" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
