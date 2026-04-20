import React, { useState } from 'react';
import { Send, AlertTriangle, Info } from 'lucide-react';

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
      const res = await fetch('http://localhost:5000/api/ai/symptom-checker', {
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
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.type}`}>
              <p>{msg.text}</p>
              {msg.urgency && (
                <div style={{ marginTop: '8px', padding: '4px 8px', backgroundColor: msg.urgency === 'High' ? 'var(--danger)' : '#fef08a', color: msg.urgency === 'High' ? 'white' : '#854d0e', borderRadius: '4px', display: 'inline-block', fontSize: '0.8rem' }}>
                   Urgency: {msg.urgency}
                </div>
              )}
            </div>
          ))}
          {loading && <div className="chat-bubble ai"><p>...</p></div>}
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
