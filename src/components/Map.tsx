'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const Map = () => {
  const position: [number, number] = [-23.5505, -46.6333]; // Coordenadas de São Paulo

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Um exemplo de popup. <br /> Facilmente customizável.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
