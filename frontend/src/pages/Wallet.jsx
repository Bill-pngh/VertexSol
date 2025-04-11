import { useTelegram } from '../hooks/useTelegram';
import { useModal } from '../context/ModalContext';
import MainLayout from '../components/layout/MainLayout';
import PageContainer from '../components/layout/PageContainer';

export default function Wallet() {
  const { tg, user } = useTelegram();
  const { showModal } = useModal();

  useEffect(() => {
    tg.BackButton.show();
    tg.MainButton.hide();
  }, [tg]);

  return (
    <MainLayout>
      <PageContainer title="Wallet">
        {user?.wallet ? (
          <div className="wallet-connected">
            <p className="wallet-address">
              {user.wallet.slice(0, 6)}...{user.wallet.slice(-4)}
            </p>
            <button 
              className="btn-disconnect"
              onClick={() => showModal('notification', {
                type: 'warning',
                message: 'Disconnect this wallet?'
              })}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="wallet-actions">
            <button 
              className="btn-connect"
              onClick={() => showModal('wallet')}
            >
              Connect Wallet
            </button>
            <p className="security-note">
              We only store encrypted seed phrases
            </p>
          </div>
        )}
      </PageContainer>
    </MainLayout>
  );
}
