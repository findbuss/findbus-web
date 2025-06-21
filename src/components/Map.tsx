'use client';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { StopFeature, StopProperties, ShapeFeatureCollection, Vehicle } from '@/types/api';
import VehicleMarkers from './VehicleMarkers';

// Corrige o problema do ícone padrão do Leaflet no Next.js
const icon = L.icon({ iconUrl: "/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] });

interface MapProps {
  stops: StopFeature[];
  onStopClick: (stop: StopProperties) => void;
  shape: ShapeFeatureCollection | null;
  vehicles: Vehicle[];
}

// Componente para ajustar a visualização do mapa
const MapUpdater = ({ shape }: { shape: ShapeFeatureCollection | null }) => {
  const map = useMap();
  if (shape) {
    const geoJsonLayer = L.geoJSON(shape);
    map.fitBounds(geoJsonLayer.getBounds());
  }
  return null;
};


const Map = ({ stops, onStopClick, shape, vehicles }: MapProps) => {
      const position: [number, number] = [-23.5505, -46.6333];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
      <MapUpdater shape={shape} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
            {shape && <GeoJSON data={shape} style={{ color: `#${shape.features[0].properties.route_color || '3388ff'}`, weight: 5 }} />}

      {shape && <VehicleMarkers vehicles={vehicles} color={shape.features[0].properties.route_color || '3388ff'} />}

      {stops.map((stop) => {
        const { geometry, properties } = stop;
        // Leaflet espera [latitude, longitude], GeoJSON é [longitude, latitude]
        const position: [number, number] = [geometry.coordinates[1], geometry.coordinates[0]];

        return (
          <Marker 
            key={properties.stop_id} 
            position={position} 
            icon={icon}
            eventHandlers={{
              click: () => {
                onStopClick(properties);
              },
            }}
          >
            <Popup>
              {properties.stop_name}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
