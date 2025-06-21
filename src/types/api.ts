// Tipagem para a seção 'busPosition.vehicles'
export interface Vehicle {
  prefix: string;
  accessible: boolean;
  hour: string; // Formato de data e hora ISO 8601 (ex: "2025-06-20T23:22:06Z")
  lat: number;
  lng: number;
}

// Tipagem para a seção 'busPosition'
export interface BusPosition {
  hour: string; // Formato de hora (ex: "20:22")
  vehicles: Vehicle[];
}

// Tipagem para a seção 'line.gtfsData'
export interface GtfsData {
  route_id: string;
  agency_id: string;
  route_short_name: string;
  route_long_name: string;
  route_desc: string | null;
  route_type: number;
  route_url: string | null;
  route_color: string;
  route_text_color: string;
  route_sort_order: number | null;
  continuous_pickup: number | null;
  continuous_drop_off: number | null;
  network_id: string | null;
}

// Tipagem para a seção 'line'
export interface Line {
  lineId: number;
  shapeId: string;
  circular: boolean;
  displaySign: string;
  direction: number;
  type: number;
  mainTerminal: string;
  secondaryTerminal: string;
  gtfsData: GtfsData;
}

// Tipagens genéricas para a estrutura GeoJSON
// Um Ponto GeoJSON, com coordenadas [longitude, latitude]
export interface PointGeometry {
  type: "Point";
  coordinates: [number, number];
}

// Uma MultiLineString GeoJSON, que é um array de caminhos (LineStrings)
// Cada caminho é um array de pontos [longitude, latitude]
export interface MultiLineStringGeometry {
  type: "MultiLineString";
  coordinates: [number, number][][];
}

// Tipagem para uma rota associada a uma parada
export interface StopRoute {
  route_id: string;
  agency_id: string;
  route_short_name: string;
  route_long_name: string;
  route_type: number;
  route_color: string;
  route_text_color: string;
}

// Tipagem para a seção 'stops.features.properties'
export interface StopProperties {
  stop_id: string;
  stop_name: string;
  stop_desc: string | null;
  routes: StopRoute[];
  agency_name: string;
}

// Tipagem para uma 'feature' da coleção de paradas
export interface StopFeature {
  type: "Feature";
  properties: StopProperties;
  geometry: PointGeometry;
}

// Tipagem para a seção 'stops' (uma FeatureCollection GeoJSON)
export interface StopFeatureCollection {
  type: "FeatureCollection";
  features: StopFeature[];
}

// Tipagem para a seção 'shapes.features.properties'
export interface ShapeProperties {
  agency_name: string;
  shape_id: string;
  route_id: string;
  agency_id: string;
  route_short_name: string;
  route_long_name: string;
  route_type: number;
  route_color: string;
  route_text_color: string;
}

// Tipagem para uma 'feature' da coleção de traçados (shapes)
export interface ShapeFeature {
  type: "Feature";
  properties: ShapeProperties;
  geometry: MultiLineStringGeometry;
}

// Tipagem para a seção 'shapes' (uma FeatureCollection GeoJSON)
export interface ShapeFeatureCollection {
  type: "FeatureCollection";
  features: ShapeFeature[];
}

// --- INTERFACE PRINCIPAL ---
// Esta é a tipagem do objeto JSON completo
export interface ApiResponse {
  line: Line;
  stops: StopFeatureCollection;
  shapes: ShapeFeatureCollection;
  busPosition: BusPosition;
}
