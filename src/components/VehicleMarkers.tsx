'use client';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Vehicle } from '@/types/api';
import { FiClock, FiNavigation } from 'react-icons/fi';
import ReactDOMServer from 'react-dom/server';
import styles from './VehicleMarkers.module.css';

// Ícone customizado para o ônibus
const busIcon = (color: string) => {
  const iconHtml = ReactDOMServer.renderToString(
    <div style={{ backgroundColor: color }} className={styles.busIcon}>
      <FiNavigation color="white" size={16} />
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: '', // A classe já está no HTML renderizado
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

interface VehicleMarkersProps {
  vehicles: Vehicle[];
  color: string;
}

const VehicleMarkers = ({ vehicles, color }: VehicleMarkersProps) => {
  return (
    <>
      {vehicles.map((vehicle) => {
        const position: [number, number] = [vehicle.lat, vehicle.lng];
        return (
          <Marker key={vehicle.prefix} position={position} icon={busIcon(`#${color}`)}>
            <Popup>
              <div className={styles.popupContent}>
                <strong>Prefixo: {vehicle.prefix}</strong>
                <p>Acessível: {vehicle.accessible ? 'Sim' : 'Não'}</p>
                <span>
                  <FiClock size={12} />
                  Atualizado às: {new Date(vehicle.hour).toLocaleTimeString()}
                </span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default VehicleMarkers;
