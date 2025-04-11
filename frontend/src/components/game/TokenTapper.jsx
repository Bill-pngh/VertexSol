import { useState, useEffect, useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import { useModal } from '../../context/ModalContext';
import { playSound } from '../../utils/sounds';

export default function TokenTapper() {
  const { tg, user } = useTelegram();
  const { showModal } = useModal();
  const [tokens, setTokens] = useState(0);
  const [taps, setTaps] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const handleTap = useCallback(() => {
    if (!user?.wallet) {
      showModal('wallet');
      return;
    }

    const earned = Math.floor(Math.random() * 3 * multiplier) + 1;
    setTokens(prev => prev + earned);
    setTaps(prev => prev + 1);
    
    // Haptic feedback
    tg.HapticFeedback.impactOccurred('light');
    playSound('tap');
    
    // Multiplier logic
    if (taps > 0 && taps % 10 === 0) {
      setMultiplier(prev => Math.min(prev + 0.5, 5));
      tg.HapticFeedback.notificationOccurred('success');
    }
  }, [user, taps, multiplier]);

  useEffect(() => {
    // Auto-save every 30 seconds
    const interval = setInterval(() => {
      if (tokens > 0) {
        // TODO: Save to blockchain
        console.log(`Saved ${tokens} tokens to wallet`);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [tokens]);

  return (
    <div className="tapper-container">
      <div className="token-display">
        <h3>${tokens.toLocaleString()}</h3>
        <p>PEPE</p>
        <div className="multiplier">x{multiplier} Multiplier</div>
      </div>
      
      <button 
        className="tap-area"
        onClick={handleTap}
        aria-label="Tap to earn tokens"
      >
        <div className="tap-circle"></div>
      </button>

      <style jsx>{`
        .tapper-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 20px;
        }
        .token-display {
          text-align: center;
          margin-bottom: 40px;
        }
        .token-display h3 {
          font-size: 3rem;
          margin: 0;
          background: linear-gradient(90deg, #6E3AFF, #00FFA3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .multiplier {
          background: rgba(110, 58, 255, 0.2);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          margin-top: 8px;
          display: inline-block;
        }
        .tap-area {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(110, 58, 255, 0.3);
          position: relative;
          touch-action: manipulation;
        }
        .tap-circle {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(110,58,255,0.3), rgba(0,255,163,0.3));
          position: absolute;
          top: 8px;
          left: 8px;
          transition: transform 0.1s ease;
        }
        .tap-area:active .tap-circle {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}
