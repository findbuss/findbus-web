'use client'

'use client'

import { FiSearch } from 'react-icons/fi';
import styles from './SavedLines.module.css';

// Define o tipo para uma única linha
interface Line {
  id: string;
  name: string;
  destination: string;
  color: string; // ex: 'bg-yellow-400'
  eta: string;
  status?: string;
}

// Define as props para o componente
interface SavedLinesProps {
  title: string;
  lines: Line[];
}

const SavedLines = ({ title, lines }: SavedLinesProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input type="text" placeholder="Pesquisar" className={styles.searchInput} />
      </div>

      <h2 className={styles.title}>{title}</h2>

      <div className={styles.linesList}>
        {lines.length > 0 ? (
          lines.map((line) => (
            <div key={line.id} className={styles.lineItem}>
              <div className={styles.lineInfo}>
                <div
                  className={styles.lineColor}
                  style={{ backgroundColor: line.color }}
                ></div>
                <div className={styles.lineDetails}>
                  <div className={styles.lineName}>{line.name}</div>
                  <div className={styles.lineDestination}>{line.destination}</div>
                </div>
              </div>
              <div className={styles.lineEtaContainer}>
                <p>{line.eta}</p>
                {line.status && (
                  <div className={styles.lineStatus}>{line.status}</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noLinesText}>Nenhuma linha encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default SavedLines;
