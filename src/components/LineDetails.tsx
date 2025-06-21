'use client';

import { ApiResponse } from '@/types/api';
import styles from './LineDetails.module.css';
import { FiX, FiMapPin, FiChevronsRight } from 'react-icons/fi';

interface LineDetailsProps {
  data: ApiResponse;
  onClear: () => void;
}

const LineDetails = ({ data, onClear }: LineDetailsProps) => {
  const { line, stops } = data;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.lineInfo}>
          <div className={styles.lineColor} style={{ backgroundColor: `#${line.gtfsData.route_color}` }} />
          <h2 className={styles.lineName}>{line.gtfsData.route_short_name}</h2>
          <span className={styles.lineDestination}>{line.mainTerminal}</span>
        </div>
        <button onClick={onClear} className={styles.closeButton}>
          <FiX size={24} />
        </button>
      </div>
      <div className={styles.terminals}>
        <span>{line.mainTerminal}</span>
        <FiChevronsRight size={20} />
        <span>{line.secondaryTerminal}</span>
      </div>
      <div className={styles.stopsList}>
        <h3 className={styles.stopsHeader}>Paradas</h3>
        <ul>
          {stops.features.map((stop) => (
            <li key={stop.properties.stop_id} className={styles.stopItem}>
              <FiMapPin className={styles.stopIcon} />
              <span>{stop.properties.stop_name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LineDetails;
