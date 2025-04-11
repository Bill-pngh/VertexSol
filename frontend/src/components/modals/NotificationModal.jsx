import { CheckCircleIcon, WarningIcon } from '../../assets/icons';
import PrimaryActionButton from '../buttons/PrimaryActionButton';

export default function NotificationModal({ 
  type = 'success', 
  message, 
  onClose 
}) {
  const Icon = type === 'success' ? CheckCircleIcon : WarningIcon;
  const bgColor = type === 'success' ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)';
  const iconColor = type === 'success' ? '#34C759' : '#FF3B30';

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="icon-container" style={{ background: bgColor }}>
          <Icon color={iconColor} />
        </div>
        <h3>{type === 'success' ? 'Success!' : 'Warning!'}</h3>
        <p className="message">{message}</p>
        <PrimaryActionButton onClick={onClose}>
          {type === 'success' ? 'Continue' : 'Try Again'}
        </PrimaryActionButton>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-container {
          background: #1E1E2D;
          border-radius: 16px;
          padding: 24px;
          width: 100%;
          max-width: 350px;
          text-align: center;
        }
        .icon-container {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .message {
          margin: 16px 0 24px;
          color: rgba(255,255,255,0.7);
        }
      `}</style>
    </div>
  );
}
