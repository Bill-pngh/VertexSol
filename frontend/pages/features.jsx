import MainLayout from '../components/layout/MainLayout';
import PageContainer from '../components/layout/PageContainer';

const features = [
  {
    title: "Whale Tracking",
    description: "Monitor top holder wallets in real-time",
    icon: "🐋"
  },
  {
    title: "Trade Simulator",
    description: "Practice with historical market data",
    icon: "📊"
  },
  {
    title: "Token Sniper",
    description: "Instant buys on new token launches",
    icon: "🎯"
  }
];

export default function Features() {
  return (
    <MainLayout>
      <PageContainer title="Features">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </PageContainer>

      <style jsx>{`
        .features-grid {
          display: grid;
          gap: 16px;
          margin-top: 20px;
        }
        .feature-card {
          background: rgba(30, 30, 45, 0.8);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(110, 58, 255, 0.2);
        }
        .feature-icon {
          font-size: 2rem;
          margin-bottom: 12px;
        }
        .feature-card h3 {
          margin: 0 0 8px 0;
          color: #6E3AFF;
        }
        .feature-card p {
          margin: 0;
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
        }
      `}</style>
    </MainLayout>
  );
}
