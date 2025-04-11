import { useState, useEffect } from 'react';
import { SecurityWarningIcon, CloseIcon } from '../../assets/icons';
import PrimaryActionButton from '../buttons/PrimaryActionButton';

export default function WalletModal({ onClose, onConnect }) {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const words = seedPhrase.trim().split(/\s+/g);
    setIsValid(words.length === 12 || words.length === 24);
  }, [seedPhrase]);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Connect Wallet</h3>
          <button onClick={onClose} className="close-btn">
            <CloseIcon />
          </button>
        </div>

        <div className="security-warning">
          <SecurityWarningIcon />
          <p>Never share your seed phrase with anyone</p>
        </div>

        <textarea
          className="seed-input"
          placeholder="Enter your 12 or 24 word seed phrase"
          value={seedPhrase}
          onChange={(e) => setSeedPhrase(e.target.value)}
          rows={4}
        />

        <PrimaryActionButton 
          onClick={() => onConnect(seedPhrase)}
          disabled={!isValid}
        >
          Confirm Connection
        </PrimaryActionButton>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-container {
          background: #1E1E2D;
          border-radius: 16px;
          padding: 24px;
          width: 100%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .close-btn {
          background: none;
          border: none;
          color: #7A7A7A;
        }
        .security-warning {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 59, 48, 0.1);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
          color: #FF3B30;
        }
        .seed-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 12px;
          color: white;
          margin-bottom: 24px;
          resize: none;
        }
      `}</style>
    </div>
  );
}
