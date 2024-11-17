import { describe, it, expect } from 'vitest';
import { getDistanceFromCoords } from './getDistanceFromCoords';
import type { Position } from 'geojson';

describe('getDistanceFromCoords', () => {
  it('should return 0 for a single coordinate', () => {
    const coords: Position[] = [[55.375450134277344, 25.128332138061523]];
    const result = getDistanceFromCoords(coords);
    expect(result).toBe(0);
  });

  it('should return 0 for an empty array', () => {
    const coords: Position[] = [];
    const result = getDistanceFromCoords(coords);
    expect(result).toBe(0);
  });
});
