export default function PageContainer({ title, children }) {
  return (
    <div className="page-container">
      {title && <h1 className="page-title">{title}</h1>}
      <div className="page-content">
        {children}
      </div>

      <style jsx>{`
        .page-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.3s ease;
        }
        .page-title {
          color: white;
          font-size: 24px;
          margin-bottom: 24px;
          text-align: center;
        }
        .page-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
