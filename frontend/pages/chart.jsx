import { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import PageContainer from '../components/layout/PageContainer';
import { useModal } from '../context/ModalContext';

export default function Chart() {
  const { showModal } = useModal();
  const [timeframe, setTimeframe] = useState('24h');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [timeframe]);

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

        {isLoading ? (
          <div className="loading">Loading chart...</div>
        ) : (
          <div className="chart-container">
            <button 
              className="view-fullscreen"
              onClick={() => showModal('chart', { timeframe })}
            >
              View Fullscreen
            </button>
            {/* Chart placeholder - replace with actual chart */}
            <div className="chart-placeholder"></div>
          </div>
        )}
      </PageContainer>

      <style jsx>{`
        .timeframe-selector {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .timeframe-selector button {
          background: rgba(30, 30, 45, 0.8);
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          color: rgba(255,255,255,0.7);
        }
        .timeframe-selector button.active {
          background: #6E3AFF;
          color: white;
        }
        .chart-container {
          position: relative;
          height: 300px;
          margin-top: 20px;
        }
        .chart-placeholder {
          background: rgba(30, 30, 45, 0.5);
          border-radius: 8px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.3);
        }
        .view-fullscreen {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.5);
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          color: white;
          z-index: 10;
        }
        .loading {
          text-align: center;
          margin-top: 40px;
          color: rgba(255,255,255,0.5);
        }
      `}</style>
    </MainLayout>
  );
}
