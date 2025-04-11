import React from 'react';

export default function PrimaryActionButton({ 
  children, 
  onClick, 
  disabled = false,
  loading = false
}) {
  return (
    <button
      className={`primary-btn ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="loader"></div>
      ) : (
        children
      )}
      <style jsx>{`
        .primary-btn {
          background: linear-gradient(90deg, #6E3AFF 0%, #00FFA3 100%);
          border: none;
          border-radius: 12px;
          padding: 14px 24px;
          color: white;
          font-weight: 600;
          font-size: 16px;
          width: 100%;
          transition: all 0.3s ease;
          position: relative;
        }
        .disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .loader {
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top: 3px solid white;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
