import { useTelegram } from '../../hooks/useTelegram';
import Background from './Background';
import SafeArea from './SafeArea';
import BottomNav from './BottomNav';

export default function MainLayout({ children }) {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.expand(); // Expand WebApp to full view
    tg.enableClosingConfirmation(); // Prevent accidental closes
  }, [tg]);

  return (
    <>
      <Background />
      <SafeArea>
        <main className="content">
          {children}
        </main>
        <BottomNav />
      </SafeArea>

      <style jsx>{`
        .content {
          flex: 1;
          padding: 16px;
          padding-bottom: calc(60px + env(safe-area-inset-bottom));
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
