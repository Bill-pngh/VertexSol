import React from 'react';
import { WalletIcon } from '../../assets/icons';

export default function ConnectWalletButton({ onClick, connected }) {
  return (
    <button
      className={`connect-wallet-btn ${connected ? 'connected' : ''}`}
      onClick={onClick}
    >
      <WalletIcon />
      <span>{connected ? 'Connected' : 'Connect Wallet'}</span>
      <style jsx>{`
        .connect-wallet-btn {
          background: ${connected ? '#00FFA320' : 'rgba(255,255,255,0.1)'};
          border: 1px solid ${connected ? '#00FFA3' : '#6E3AFF'};
          border-radius: 8px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          transition: all 0.3s ease;
        }
        .connect-wallet-btn:hover {
          background: rgba(110, 58, 255, 0.2);
        }
      `}</style>
    </button>
  );
}
