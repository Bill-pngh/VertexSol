import { useTelegram } from '../../hooks/useTelegram';
import TokenTapper from './TokenTapper';
import BalanceDisplay from './BalanceDisplay';
import Leaderboard from './Leaderboard';

export default function GameContainer() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.BackButton.show();
    tg.BackButton.onClick(() => tg.close());
    return () => tg.BackButton.offClick(() => tg.close());
  }, [tg]);

  return (
    <div className="game-container">
      <BalanceDisplay />
      <TokenTapper />
      <Leaderboard />

      <style jsx>{`
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
          padding-bottom: 80px;
        }
      `}</style>
    </div>
  );
}
