import React from 'react';

export default function IconButton({ 
  icon, 
  onClick, 
  size = 'medium',
  variant = 'default'
}) {
  const sizeMap = {
    small: 32,
    medium: 40,
    large: 48
  };

  return (
    <button
      className={`icon-btn ${variant}`}
      onClick={onClick}
      style={{
        width: sizeMap[size],
        height: sizeMap[size]
      }}
    >
      {icon}
      <style jsx>{`
        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }
        .icon-btn.default {
          color: white;
        }
        .icon-btn.primary {
          background: #6E3AFF;
        }
        .icon-btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </button>
  );
}
