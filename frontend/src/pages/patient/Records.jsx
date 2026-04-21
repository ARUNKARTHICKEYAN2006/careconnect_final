import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, CheckCircle, Loader2 } from 'lucide-react';
import API_BASE_URL from '../../config';

const Records = () => {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append('report', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload/report`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Error connecting to the server.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">My Records</h1>
      <p className="page-subtitle">Upload lab reports and view past prescriptions securely.</p>
      
      <div className="metrics-grid">
        <div className="glass-panel">
          <h3>Upload Health Report</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>Upload X-Rays, Scans, and lab results here.</p>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            style={{ display: 'none' }} 
            accept=".pdf,.jpg,.jpeg,.png"
          />

          <div 
            onClick={() => !uploading && fileInputRef.current.click()}
            style={{ 
              border: '2px dashed var(--glass-border)', 
              padding: '40px', 
              textAlign: 'center', 
              borderRadius: '16px', 
              cursor: uploading ? 'not-allowed' : 'pointer', 
              background: 'rgba(255,255,255,0.5)',
              transition: 'all 0.3s ease'
            }}
          >
            {uploading ? (
              <Loader2 size={32} color="var(--primary)" className="animate-spin" style={{ margin: '0 auto 8px' }} />
            ) : success ? (
              <CheckCircle size={32} color="var(--success)" style={{ margin: '0 auto 8px' }} />
            ) : (
              <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 8px' }} />
            )}
            
            <p style={{ fontWeight: 500 }}>
              {uploading ? 'Uploading your report...' : success ? 'Upload Successful!' : 'Click to browse files'}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }}>PDF, PNG, JPG up to 10MB</p>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText color="#94a3b8" />
                <span>Annual Health Check (April 20, 2026)</span>
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
