import { point, distance } from '@turf/turf';
import type { Position } from 'geojson';

export const getDistanceFromCoords = (coords: Position[]): number => {
  let result = 0;

  for (let i = 0; i < coords.length - 1; i++) {
    const from = point(coords[i]);
    const to = point(coords[i + 1]);

    const dist = distance(from, to, { units: 'kilometers' });

    result += dist;
  }

  return Math.round(result);
};
