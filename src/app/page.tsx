'use client';

'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import DynamicMap from '@/components/DynamicMap';
import styles from './page.module.css';
import api from '@/lib/api';
import { StopFeature, StopFeatureCollection, StopProperties, ApiResponse, Vehicle, BusPosition, StopRoute } from '@/types/api';

export default function Home() {
  const [stops, setStops] = useState<StopFeature[]>([]);
  const [selectedStop, setSelectedStop] = useState<StopFeature | null>(null);
  const [selectedLineData, setSelectedLineData] = useState<ApiResponse | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const lat = -23.5505;
        const lon = -46.6333;
        const response = await api.get<StopFeatureCollection>(`/api/v1/sptrans/stops?lat=${lat}&lon=${lon}`);
        setStops(response.data.features);
      } catch (err) {
        console.error('Failed to fetch stops:', err);
        setError('Não foi possível carregar os pontos de ônibus.');
      }
    };

    fetchStops();
  }, []);

  useEffect(() => {
    if (!selectedLineData) {
      setVehicles([]);
      return;
    }

    const fetchVehicles = async () => {
      try {
        const routeId = selectedLineData.line.gtfsData.route_id;
        const response = await api.get<BusPosition>(`/api/v1/sptrans/vehicles/${routeId}`);
        setVehicles(response.data.vehicles || []);
      } catch (err) {
        console.error('Failed to fetch vehicles:', err);
      }
    };

    fetchVehicles();
    const intervalId = setInterval(fetchVehicles, 15000);

    return () => clearInterval(intervalId);
  }, [selectedLineData]);

  const handleStopClick = async (stopProperties: StopProperties) => {
    setIsLoading(true);
    setSelectedStop(null);
    setSelectedLineData(null);
    setError(null);

    try {
      const response = await api.get<StopFeatureCollection>(`/api/v1/sptrans/stops?stopId=${stopProperties.stop_id}`);
      if (response.data.features.length > 0) {
        setSelectedStop(response.data.features[0]);
      } else {
        setError('Nenhuma informação encontrada para esta parada.');
      }
    } catch (err) {
      console.error('Failed to fetch stop details:', err);
      setError('Não foi possível carregar as linhas da parada.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLineSelect = async (route: StopRoute) => {
    setIsLoading(true);
    setSelectedLineData(null);
    setError(null);

    try {
      // Assumindo '1' como destino padrão, como na lógica anterior
      const url = `/api/v1/sptrans/lines/${route.route_short_name}/1`;
      const response = await api.get<ApiResponse>(url);
      setSelectedLineData(response.data);
      setSelectedStop(null); // Limpa a seleção da parada para focar na linha
    } catch (err) {
      console.error('Failed to fetch line details:', err);
      setError('Não foi possível carregar os detalhes da linha.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLine = () => {
    setSelectedStop(null);
    setSelectedLineData(null);
    setVehicles([]);
  };

  return (
    <div className={styles.container}>
      <Sidebar
        selectedStop={selectedStop}
        selectedLineData={selectedLineData}
        isLoading={isLoading}
        onLineSelect={handleLineSelect}
        onClear={handleClearLine}
      />

      <main className={styles.main}>
        {error && <p className={styles.error}>{error}</p>}
        <DynamicMap stops={stops} onStopClick={handleStopClick} shape={selectedLineData ? selectedLineData.shapes : null} vehicles={vehicles} />
      </main>
    </div>
  );
}
