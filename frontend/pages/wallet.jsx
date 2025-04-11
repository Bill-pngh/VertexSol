import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import PageContainer from '../components/layout/PageContainer';
import { useTelegram } from '../hooks/useTelegram';
import { useModal } from '../context/ModalContext';

export default function Wallet() {
  const { user } = useTelegram();
  const { showModal } = useModal();
  const [isConnecting, setIsConnecting] = useState(false);

  return (
    <MainLayout>
      <PageContainer title="Wallet">
        <div className="wallet-status">
          {user?.wallet ? (
            <>
              <h3>Connected Wallet</h3>
              <p className="wallet-address">
                {user.wallet.slice(0, 6)}...{user.wallet.slice(-4)}
              </p>
              <button 
                className="disconnect-btn"
                onClick={() => showModal('notification', {
                  type: 'warning',
                  message: 'Disconnect wallet?'
                })}
              >
                Disconnect
              </button>
            </>
          ) : (
            <>
              <p>Connect your wallet to start trading</p>
              <button
                className="connect-btn"
                onClick={() => showModal('wallet')}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            </>
          )}
        </div>
      </PageContainer>

      <style jsx>{`
        .wallet-status {
          text-align: center;
          margin-top: 40px;
        }
        .wallet-address {
          background: rgba(110, 58, 255, 0.1);
          padding: 8px 12px;
          border-radius: 8px;
          font-family: monospace;
          display: inline-block;
        }
        .connect-btn, .disconnect-btn {
          background: linear-gradient(90deg, #6E3AFF, #00FFA3);
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          color: white;
          font-weight: bold;
          margin-top: 20px;
          width: 100%;
          max-width: 300px;
        }
        .disconnect-btn {
          background: rgba(255, 59, 48, 0.2);
          color: #FF3B30;
        }
      `}</style>
    </MainLayout>
  );
}
