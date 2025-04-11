import { useState, useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';

export default function Leaderboard() {
  const { tg } = useTelegram();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Mock data - replace with API call
    const mockPlayers = [
      { id: 1, name: 'CryptoWhale', score: 12500, avatar: '🐳' },
      { id: 2, name: 'TapperPro', score: 8720, avatar: '🚀' },
      { id: 3, name: 'Memelord', score: 6540, avatar: '😂' },
      { id: 4, name: 'You', score: 4200, avatar: '⭐' },
      { id: 5, name: 'Newbie', score: 1500, avatar: '🆕' }
    ];
    setPlayers(mockPlayers);
  }, []);

  return (
    <div className="leaderboard-container">
      <h3>Top Tappers</h3>
      <div className="players-list">
        {players.map((player, index) => (
          <div key={player.id} className={`player-row ${player.name === 'You' ? 'highlight' : ''}`}>
            <span className="rank">{index + 1}</span>
            <span className="avatar">{player.avatar}</span>
            <span className="name">{player.name}</span>
            <span className="score">{player.score.toLocaleString()} PEPE</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .leaderboard-container {
          width: 100%;
          padding: 16px;
          margin-top: 20px;
        }
        .players-list {
          background: rgba(30, 30, 45, 0.6);
          border-radius: 12px;
          overflow: hidden;
        }
        .player-row {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .player-row.highlight {
          background: rgba(110, 58, 255, 0.1);
        }
        .rank {
          width: 24px;
          font-weight: bold;
          color: rgba(255,255,255,0.6);
        }
        .avatar {
          width: 32px;
          text-align: center;
          font-size: 1.2rem;
          margin: 0 8px;
        }
        .name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .score {
          color: #00FFA3;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}
