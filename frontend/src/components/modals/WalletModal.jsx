import { useState } from 'react';
import { SecurityWarningIcon } from '../../assets/icons';

export default function WalletModal({ onClose, onConnect }) {
  const [seedPhrase, setSeedPhrase] = useState('');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Connect Wallet</h3>
        
        <div className="security-warning">
          <SecurityWarningIcon />
          <p>Never share your seed phrase with untrusted sites</p>
        </div>

        <textarea
          placeholder="Enter your 12 or 24 word seed phrase"
          value={seedPhrase}
          onChange={(e) => setSeedPhrase(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button 
            onClick={() => onConnect(seedPhrase)}
            disabled={seedPhrase.split(' ').length !== 12 && seedPhrase.split(' ').length !== 24}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
