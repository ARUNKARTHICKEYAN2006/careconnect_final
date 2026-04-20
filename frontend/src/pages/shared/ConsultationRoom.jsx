import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Send, LogOut } from 'lucide-react';
import API_BASE_URL from '../../config';

const socket = io(API_BASE_URL);

const ConsultationRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('join_room', roomId);

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim()) {
      const msgData = {
        room: roomId,
        sender: 'User', // In real app, fetch from auth context
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      socket.emit('send_message', msgData);
      setInput('');
    }
  };

  const domain = "meet.jit.si";
  const roomName = `CareConnectRoom_${roomId}`;

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f8fafc' }}>
      
      {/* Video Call Panel */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', background: 'white', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)' }}>
          <h2 style={{ fontWeight: 600 }}>Active Consultation</h2>
          <button className="btn-secondary" onClick={() => navigate(-1)} style={{ padding: '8px 16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <LogOut size={16} /> Leave Room
          </button>
        </div>
        <div style={{ flex: 1, backgroundColor: '#000' }}>
            <iframe
              allow="camera; microphone; display-capture"
              src={`https://${domain}/${roomName}?userInfo.displayName=Patient`}
              style={{ width: '100%', height: '100%', border: '0' }}
              title="Jitsi Meet"
            />
        </div>
      </div>

      {/* Realtime Chat Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white', borderLeft: '1px solid var(--glass-border)' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontWeight: 600 }}>Live Chat</h3>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className="chat-bubble ai" style={{ margin: 0 }}>
               <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '4px' }}>{msg.sender} • {msg.time}</div>
               {msg.text}
            </div>
          ))}
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '8px' }}>
             <input 
              type="text" 
              className="input-field" 
              placeholder="Type message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="btn-primary" style={{ padding: '12px 16px' }} onClick={sendMessage}>
              <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationRoom;
