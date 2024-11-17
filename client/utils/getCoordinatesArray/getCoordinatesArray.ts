import type { Route } from '../../types/index';
import type { Position } from 'geojson';

export const getCoordinatesArray = (routeState: Route[]): Position[] => {
  return routeState.map((entry) => [entry.coordinates.lng, entry.coordinates.lat]);
};
