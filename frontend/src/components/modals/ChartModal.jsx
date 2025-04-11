import { useEffect, useRef } from 'react';
import { CloseIcon } from '../../assets/icons';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip);

export default function ChartModal({ data, onClose }) {
  const chartRef = useRef(null);

  const chartData = {
    labels: data.map(item => new Date(item.time)),
    datasets: [{
      data: data.map(item => item.close),
      borderColor: '#6E3AFF',
      tension: 0.4,
      pointRadius: 0
    }]
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>$PEPE Price Chart</h3>
          <button onClick={onClose} className="close-btn">
            <CloseIcon />
          </button>
        </div>

        <div className="chart-container">
          <Line 
            ref={chartRef}
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'hour'
                  }
                },
                y: {
                  grid: {
                    color: 'rgba(255,255,255,0.1)'
                  }
                }
              }
            }}
          />
        </div>
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
          max-width: 500px;
        }
        .chart-container {
          height: 300px;
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}
