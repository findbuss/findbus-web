'use client';

import { StopRoute } from '@/types/api';
import styles from './StopLinesPanel.module.css';
import { FiArrowLeft } from 'react-icons/fi';

interface StopLinesPanelProps {
  routes: StopRoute[];
  onLineSelect: (route: StopRoute) => void;
  onClear: () => void;
}

const StopLinesPanel = ({ routes, onLineSelect, onClear }: StopLinesPanelProps) => {
  if (routes.length === 0) {
    return (
      <div className={styles.panel}>
        <div className={styles.header}>
          <button onClick={onClear} className={styles.backButton}>
            <FiArrowLeft size={24} />
          </button>
          <h2>Linhas da Parada</h2>
        </div>
        <p className={styles.noLines}>Nenhuma linha encontrada para esta parada.</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <button onClick={onClear} className={styles.backButton}>
          <FiArrowLeft size={24} />
        </button>
        <h2>Linhas da Parada</h2>
      </div>
      <ul className={styles.lineList}>
        {routes.map((route) => (
          <li key={route.route_id} onClick={() => onLineSelect(route)} className={styles.lineItem}>
            <div className={styles.lineColor} style={{ backgroundColor: `#${route.route_color}` }}></div>
            <div className={styles.lineInfo}>
              <span className={styles.lineName}>{route.route_short_name}</span>
              <span className={styles.lineDestination}>{route.route_long_name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StopLinesPanel;
