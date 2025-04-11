import React from 'react';

export default function NavButton({ icon, label, active, onClick }) {
  return (
    <button 
      className={`nav-button ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="icon-container">
        {icon}
      </div>
      <span className="label">{label}</span>
      <style jsx>{`
        .nav-button {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          padding: 8px 0;
          color: #7A7A7A;
          transition: all 0.3s ease;
        }
        .active {
          color: #6E3AFF;
        }
        .icon-container {
          width: 24px;
          height: 24px;
          margin-bottom: 4px;
        }
        .label {
          font-size: 10px;
          font-weight: 500;
        }
      `}</style>
    </button>
  );
}
