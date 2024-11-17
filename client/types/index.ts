interface Coordinate {
  lat: number;
  lng: number;
}

export interface Route {
  status: string;
  coordinates: Coordinate;
}

export interface VehicleData {
  plate: string;
  lat: number;
  lng: number;
  angle: number;
  speed: number;
  status: string;
  timestamp: string;
  route: Route[];
}

export interface RawData {
  data: VehicleData;
  plate: string;
}
