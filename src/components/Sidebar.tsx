'use client'

import { FiHome, FiBookmark, FiClock, FiUser } from 'react-icons/fi';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import SavedLines from './SavedLines';

const Sidebar = () => {
  const [activePanel, setActivePanel] = useState<'favorites' | 'history' | null>(null);

  // Dados de exemplo - substitua pelos dados reais da sua aplicação
  const favoriteLines = [
    { id: '1', name: 'Linha 123', destination: 'Centro', color: '#3b82f6', eta: '5 min' },
    { id: '2', name: 'Linha 456', destination: 'Bairro X', color: '#22c55e', eta: '10 min' },
  ];

  const historyLines = [
    { id: '3', name: 'Linha 789', destination: 'Bairro Y', color: '#ef4444', eta: '15 min' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.menu}>
          <a href="#" className={styles.iconLink} title="Início">
            <FiHome size={28} />
          </a>
          <button
            onClick={() => setActivePanel(activePanel === 'favorites' ? null : 'favorites')}
            className={`${styles.iconButton} ${activePanel === 'favorites' ? styles.iconButtonActive : ''}`}
            title="Salvos"
          >
            <FiBookmark size={28} />
          </button>
          <button
            onClick={() => setActivePanel(activePanel === 'history' ? null : 'history')}
            className={`${styles.iconButton} ${activePanel === 'history' ? styles.iconButtonActive : ''}`}
            title="Histórico"
          >
            <FiClock size={28} />
          </button>
        </div>
        <div className={styles.profileSection}>
          <a href="/login" className={styles.iconLink} title="Perfil">
            <FiUser size={28} />
          </a>
        </div>
      </div>

      {activePanel === 'favorites' && (
        <SavedLines title="Linhas Favoritas" lines={favoriteLines} />
      )}
      {activePanel === 'history' && (
        <SavedLines title="Histórico" lines={historyLines} />
      )}
    </div>
  );
};

export default Sidebar;
