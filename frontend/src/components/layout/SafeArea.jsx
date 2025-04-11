export default function SafeArea({ children }) {
  return (
    <div className="safe-area">
      {children}
      <style jsx>{`
        .safe-area {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        @supports (padding: max(0px)) {
          .safe-area {
            padding-left: max(env(safe-area-inset-left), 16px);
            padding-right: max(env(safe-area-inset-right), 16px);
          }
        }
      `}</style>
    </div>
  );
}
