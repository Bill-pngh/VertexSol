import { useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import MainLayout from '../components/layout/MainLayout';
import PageContainer from '../components/layout/PageContainer';

export default function Portfolio() {
  const { tg, user } = useTelegram();
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    tg.BackButton.show();
    tg.MainButton.hide();

    // Mock data fetch
    const loadData = async () => {
      const mockData = user?.wallet ? [
        { token: 'SOL', amount: 0.42, value: 42.50 },
        { token: 'PEPE', amount: 1500, value: 15.00 }
      ] : [];
      setPortfolio(mockData);
    };

    loadData();
  }, [user, tg]);

  return (
    <MainLayout>
      <PageContainer title="Your Portfolio">
        {portfolio.length === 0 ? (
          <div className="empty-state">
            <p>No tokens found</p>
            <p>Connect wallet and start trading!</p>
          </div>
        ) : (
          <div className="portfolio-grid">
            {portfolio.map((item, index) => (
              <div key={index} className="portfolio-card">
                <h3>{item.token}</h3>
                <p>{item.amount.toLocaleString()}</p>
                <span>${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </PageContainer>
    </MainLayout>
  );
}
