import { useTelegram } from '../hooks/useTelegram';
import MainLayout from '../components/layout/MainLayout';
import PageContainer from '../components/layout/PageContainer';

const features = [
  {
    title: "Whale Tracking",
    icon: "🐋",
    description: "Monitor top holders' transactions in real-time"
  },
  {
    title: "Trade Simulator", 
    icon: "🎮",
    description: "Practice with historical market data"
  },
  {
    title: "Token Sniper",
    icon: "🎯",
    description: "Instant buys on new token launches"
  }
];

export default function Features() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.BackButton.show();
    tg.MainButton.hide();
  }, [tg]);

  return (
    <MainLayout>
      <PageContainer title="Features">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    </MainLayout>
  );
}
