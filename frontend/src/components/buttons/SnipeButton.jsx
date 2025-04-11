import { RocketIcon } from '../../assets/icons';

export default function SnipeButton({ onClick, disabled }) {
  return (
    <button
      className={`snipe-btn ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <RocketIcon />
      <span>Snipe New Tokens</span>
      <style jsx>{`
        .snipe-btn {
          background: linear-gradient(135deg, #6E3AFF 0%, #00FFA3 100%);
          border: none;
          border-radius: 50px;
          padding: 16px 32px;
          color: white;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 20px rgba(110, 58, 255, 0.3);
          transition: all 0.3s ease;
        }
        .snipe-btn.disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </button>
  );
}
