import React from 'react';
import { Upload, Download, FileText } from 'lucide-react';

const Records = () => {
  return (
    <div>
      <h1 className="page-title">My Records</h1>
      <p className="page-subtitle">Upload lab reports and view past prescriptions securely.</p>
      
      <div className="metrics-grid">
        <div className="glass-panel">
          <h3>Upload Health Report</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>Upload X-Rays, Scans, and lab results here.</p>
          <div style={{ border: '2px dashed var(--glass-border)', padding: '32px', textAlign: 'center', borderRadius: '12px', cursor: 'pointer', background: 'rgba(255,255,255,0.5)' }}>
            <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 8px' }} />
            <p>Click to browse files or drag 'n' drop</p>
          </div>
        </div>

        <div className="glass-panel">
          <h3>Recent Prescriptions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText color="#94a3b8" />
                <span>Dr. Sarah (May 14, 2026)</span>
              </div>
              <button className="btn-secondary" style={{ padding: '8px 12px' }}><Download size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;
