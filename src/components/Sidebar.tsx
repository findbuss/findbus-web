'use client'

import { FiHome, FiBookmark, FiClock, FiUser, FiLoader } from 'react-icons/fi';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import SavedLines from './SavedLines';
import LineDetails from './LineDetails';
import StopLinesPanel from './StopLinesPanel';
import { ApiResponse, StopRoute, StopFeature } from '@/types/api';

interface SidebarProps {
  selectedStop: StopFeature | null;
  selectedLineData: ApiResponse | null;
  isLoading: boolean;
  onLineSelect: (route: StopRoute) => void;
  onClear: () => void;
}

const Sidebar = ({ selectedStop, selectedLineData, isLoading, onLineSelect, onClear }: SidebarProps) => {
  const [activePanel, setActivePanel] = useState<'favorites' | 'history' | null>(null);

  // Dados de exemplo
  const favoriteLines = [
    { id: '1', name: 'Linha 123', destination: 'Centro', color: '#3b82f6', eta: '5 min' },
  ];
  const historyLines = [
    { id: '3', name: 'Linha 789', destination: 'Bairro Y', color: '#ef4444', eta: '15 min' },
  ];

  const renderPanelContent = () => {
    if (isLoading) {
      return (
        <div className={styles.loadingPanel}>
          <FiLoader className={styles.loadingIcon} size={40} />
          <span>Carregando...</span>
        </div>
      );
    }

    if (selectedLineData) {
      return <LineDetails data={selectedLineData} onClear={onClear} />;
    }

    if (selectedStop) {
      return (
        <StopLinesPanel
          routes={selectedStop.properties.routes}
          onLineSelect={onLineSelect}
          onClear={onClear}
        />
      );
    }

    if (activePanel === 'favorites') {
      return <SavedLines title="Linhas Favoritas" lines={favoriteLines} />;
    }

    if (activePanel === 'history') {
      return <SavedLines title="Histórico" lines={historyLines} />;
    }

    return null;
  };

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

      {renderPanelContent()}
    </div>
  );
};

export default Sidebar;
