import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([
    { id: '1', name: 'Dr. Jane Smith', spec: 'Neurologist', license: 'MED12345', status: 'Pending' },
    { id: '2', name: 'Dr. Rahul Patel', spec: 'Dermatologist', license: 'MED54321', status: 'Pending' },
  ]);

  const approveDoctor = (id) => {
    setDoctors(prev => prev.map(doc => doc.id === id ? { ...doc, status: 'Approved' } : doc));
  };

  return (
    <div>
      <h1 className="page-title">Platform Administration</h1>
      <p className="page-subtitle">Manage doctor approvals and view system analytics.</p>

      <div className="metrics-grid">
        <div className="glass-panel" style={{ background: '#f8fafc' }}>
          <h3>Registered Patients</h3>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--text-dark)', margin: '8px 0' }}>1,245</h1>
        </div>

        <div className="glass-panel" style={{ background: '#f8fafc' }}>
          <h3>Verified Doctors</h3>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--text-dark)', margin: '8px 0' }}>156</h1>
        </div>

        <div className="glass-panel" style={{ background: '#fef2f2' }}>
          <h3>Pending Approvals</h3>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--danger)', margin: '8px 0' }}>{doctors.filter(d => d.status === 'Pending').length}</h1>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)' }}>
          <h3 style={{ margin: 0 }}>Doctor Approvals Queue</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>Doctor Name</th>
              <th style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>Specialisation</th>
              <th style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>License No.</th>
              <th style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>Status</th>
              <th style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doc => (
              <tr key={doc.id}>
                <td style={{ padding: '16px', borderBottom: '1px solid #f1f5f9' }}><strong>{doc.name}</strong></td>
                <td style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', color: 'var(--text-light)' }}>{doc.spec}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', fontFamily: 'monospace' }}>{doc.license}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ padding: '4px 8px', backgroundColor: doc.status === 'Pending' ? '#fef08a' : '#dcfce7', color: doc.status === 'Pending' ? '#854d0e' : '#166534', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {doc.status}
                  </span>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
                  {doc.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn-primary" style={{ padding: '8px', display: 'flex', alignItems: 'center', background: 'var(--success)' }} onClick={() => approveDoctor(doc.id)}>
                        <CheckCircle size={16} />
                      </button>
                      <button className="btn-secondary" style={{ padding: '8px', display: 'flex', alignItems: 'center', color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                        <XCircle size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
