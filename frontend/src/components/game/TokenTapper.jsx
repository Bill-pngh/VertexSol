import { useState, useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';

export default function TokenTapper() {
  const [tokens, setTokens] = useState(0);
  const { tg } = useTelegram();

  const handleTap = () => {
    setTokens(prev => prev + 1);
    tg.HapticFeedback.impactOccurred('light');
  };

  return (
    <div className="tapper-container">
      <div className="token-display">
        <span>{tokens}</span>
        <small>$PEPE</small>
      </div>
      <button 
        className="tap-area"
        onClick={handleTap}
      >
        TAP ME!
      </button>
    </div>
  );
}
