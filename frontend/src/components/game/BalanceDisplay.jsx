import { useState, useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import { formatCurrency } from '../../utils/helpers';

export default function BalanceDisplay() {
  const { tg, user } = useTelegram();
  const [balances, setBalances] = useState({
    SOL: 0,
    PEPE: 0,
    USD: 0
  });

  useEffect(() => {
    // Mock data - replace with actual blockchain calls
    const fetchBalances = async () => {
      const mockBalances = {
        SOL: user?.wallet ? 0.42 : 0,
        PEPE: user?.wallet ? 1500 : 0,
        USD: user?.wallet ? 42.50 : 0
      };
      setBalances(mockBalances);
    };

    fetchBalances();
    const interval = setInterval(fetchBalances, 15000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="balance-container">
      <div className="balance-card">
        <h4>Your Balance</h4>
        <div className="balance-row">
          <span>SOL</span>
          <span>{balances.SOL.toFixed(4)}</span>
        </div>
        <div className="balance-row">
          <span>PEPE</span>
          <span>{balances.PEPE.toLocaleString()}</span>
        </div>
        <div className="balance-row total">
          <span>Total (USD)</span>
          <span>{formatCurrency(balances.USD)}</span>
        </div>
      </div>

      <style jsx>{`
        .balance-container {
          width: 100%;
          padding: 0 16px;
          margin-bottom: 20px;
        }
        .balance-card {
          background: rgba(30, 30, 45, 0.8);
          border-radius: 12px;
          padding: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(110, 58, 255, 0.2);
        }
        .balance-card h4 {
          margin: 0 0 12px 0;
          color: rgba(255,255,255,0.8);
        }
        .balance-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .balance-row.total {
          border-top: 1px solid rgba(110, 58, 255, 0.3);
          margin-top: 8px;
          padding-top: 12px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
