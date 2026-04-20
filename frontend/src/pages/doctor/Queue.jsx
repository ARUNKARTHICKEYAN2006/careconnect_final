import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, FilePlus2 } from 'lucide-react';

const patients = [
  { id: '1', name: 'John Doe', time: '10:00 AM', status: 'Waiting' },
  { id: '2', name: 'Emily Smith', time: '10:30 AM', status: 'Scheduled' },
];

const Queue = () => {
  const navigate = useNavigate();
  const [showPrescription, setShowPrescription] = useState(false);

  return (
    <div>
      <h1 className="page-title">Patient Queue</h1>
      <p className="page-subtitle">Manage today's appointments and ongoing consultations.</p>

      {showPrescription && (
        <div className="glass-panel" style={{ marginBottom: '24px', background: '#f8fafc', border: '1px solid var(--primary)' }}>
          <h3 style={{ marginBottom: '16px' }}>Digital Prescription Writer</h3>
          <textarea 
            className="input-field" 
            rows={5} 
            placeholder="Write medicines, dosage, duration, and advice here..."
            style={{ marginBottom: '16px', resize: 'vertical' }}
          ></textarea>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" onClick={() => setShowPrescription(false)}>Generate & Send PDF</button>
            <button className="btn-secondary" onClick={() => setShowPrescription(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>Patient Name</th>
              <th style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>Time</th>
              <th style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>Status</th>
              <th style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td style={{ padding: '16px', borderBottom: '1px solid #f1f5f9' }}><strong>{p.name}</strong></td>
                <td style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', color: 'var(--text-light)' }}>{p.time}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ padding: '4px 8px', backgroundColor: p.status === 'Waiting' ? '#fef08a' : '#e0e7ff', color: p.status === 'Waiting' ? '#854d0e' : '#3730a3', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-primary" style={{ padding: '8px 12px', display: 'flex', gap: '6px', alignItems: 'center' }} onClick={() => navigate('/consultation/demo123')}>
                      <Video size={16} /> Consult
                    </button>
                    <button className="btn-secondary" style={{ padding: '8px 12px', display: 'flex', gap: '6px', alignItems: 'center' }} onClick={() => setShowPrescription(true)}>
                      <FilePlus2 size={16} /> Rx
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Queue;
