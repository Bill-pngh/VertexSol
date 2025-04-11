import { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import PageContainer from '../components/layout/PageContainer';
import { useTelegram } from '../hooks/useTelegram';

export default function Portfolio() {
  const { user } = useTelegram();
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    // Mock data - replace with blockchain query
    const mockPortfolio = user?.wallet ? [
      { symbol: 'SOL', amount: 0.42, value: 42.50 },
      { symbol: 'PEPE', amount: 1500, value: 15.00 },
      { symbol: 'BONK', amount: 50000, value: 5.00 }
    ] : [];
    
    setPortfolio(mockPortfolio);
  }, [user]);

  return (
    <MainLayout>
      <PageContainer title="Your Portfolio">
        {portfolio.length === 0 ? (
          <div className="empty-state">
            <p>Your portfolio is empty</p>
            <p>Snipe tokens to get started!</p>
          </div>
        ) : (
          <div className="portfolio-grid">
            {portfolio.map((item) => (
              <div key={item.symbol} className="portfolio-item">
                <div className="token-info">
                  <h3>{item.symbol}</h3>
                  <p>{item.amount.toLocaleString()}</p>
                </div>
                <div className="token-value">
                  ${item.value.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </PageContainer>

      <style jsx>{`
        .empty-state {
          text-align: center;
          color: rgba(255,255,255,0.5);
          margin-top: 40px;
        }
        .portfolio-grid {
          display: grid;
          gap: 12px;
        }
        .portfolio-item {
          background: rgba(30, 30, 45, 0.8);
          border-radius: 8px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid rgba(110, 58, 255, 0.1);
        }
        .token-value {
          color: #00FFA3;
          font-weight: bold;
        }
      `}</style>
    </MainLayout>
  );
}
