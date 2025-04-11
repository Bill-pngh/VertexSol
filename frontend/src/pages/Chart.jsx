import { useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import MainLayout from '../components/layout/MainLayout';
import PageContainer from '../components/layout/PageContainer';

export default function Chart() {
  const { tg } = useTelegram();
  const [timeframe, setTimeframe] = useState('24h');

  useEffect(() => {
    tg.BackButton.show();
    tg.MainButton.hide();
  }, [tg]);

  return (
    <MainLayout>
      <PageContainer title="$PEPE Chart">
        <div className="timeframe-selector">
          {['1h', '24h', '7d', '1m'].map((tf) => (
            <button
              key={tf}
              className={timeframe === tf ? 'active' : ''}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
        
        <div className="chart-placeholder">
          {/* Chart will be rendered here */}
          <p>Live chart coming soon</p>
        </div>
      </PageContainer>
    </MainLayout>
  );
}
