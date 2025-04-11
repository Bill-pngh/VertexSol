import { useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import GameContainer from '../components/game/GameContainer';
import MainLayout from '../components/layout/MainLayout';

export default function Home() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.BackButton.hide(); // Hide back button on main screen
    tg.MainButton.setParams({
      text: 'SNIPE TOKENS', 
      color: '#6E3AFF'
    });
  }, [tg]);

  return (
    <MainLayout>
      <GameContainer />
    </MainLayout>
  );
}
