import React, { useState } from 'react';
import { Send, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../../config';

const AISymptomChecker = () => {
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Hello! Please describe your symptoms or ask a health question. I am an AI assistant for informational purposes only. Do not use me for medical emergencies.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Calling our mock local AI endpoint
      const res = await fetch(`${API_BASE_URL}/api/ai/symptom-checker`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: userMsg.text })
      });
      const data = await res.json();
      
      setMessages((prev) => [
        ...prev, 
        { type: 'ai', text: data.message, urgency: data.urgencyLevel, disclaimer: data.disclaimer }
      ]);
    } catch (error) {
       setMessages((prev) => [...prev, { type: 'ai', text: 'Error connecting to AI service.' }]);
    }
    
    setLoading(false);
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <h1 className="page-title">AI Symptom Checker</h1>
      <p className="page-subtitle">Get instant AI insights on your symptoms and medication allergies.</p>
      
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
        
        <div style={{ backgroundColor: '#fffbe1', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #fde047' }}>
          <AlertTriangle color="#ca8a04" size={20} />
          <span style={{ color: '#854d0e', fontSize: '0.9rem' }}>Disclaimer: This AI is for informational purposes only and is not a substitute for professional medical advice.</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div 
                key={i} 
                className={`chat-bubble ${msg.type}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <p>{msg.text}</p>
                {msg.urgency && (
                  <div style={{ marginTop: '8px', padding: '4px 8px', backgroundColor: msg.urgency === 'High' ? 'var(--danger)' : msg.urgency === 'Medium' ? '#f59e0b' : '#10b981', color: 'white', borderRadius: '4px', display: 'inline-block', fontSize: '0.8rem', fontWeight: 'bold' }}>
                     Urgency: {msg.urgency}
                  </div>
                )}
              </motion.div>
            ))}
            
            {loading && (
              <motion.div 
                key="loading-bubble"
                className="chat-bubble ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '16px 20px' }}
              >
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }} />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }} />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Type your symptoms e.g., 'I have a headache and mild fever...'" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="btn-primary" style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleSend}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISymptomChecker;
