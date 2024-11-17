import type { Route } from '../../types/index';
import type { Position } from 'geojson';

type Status = 'idle' | 'moving' | 'stopped';

export const filterCoordinatesByStatus = (data: Route[], status: Status): Position[] => {
  return data
    .filter((entry) => entry.status === status)
    .map((entry) => [entry.coordinates.lat, entry.coordinates.lng]);
};
