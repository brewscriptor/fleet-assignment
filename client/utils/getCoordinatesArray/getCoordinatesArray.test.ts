import { describe, it, expect } from 'vitest';
import { getCoordinatesArray } from './getCoordinatesArray';
import type { Route } from '../../types/index';

const mockData: Route[] = [
  {
    status: 'moving',
    coordinates: { lat: 25.128332138061523, lng: 55.375450134277344 },
  },
  {
    status: 'stopped',
    coordinates: { lat: 25.133018493652344, lng: 55.379249572753906 },
  },
  {
    status: 'idle',
    coordinates: { lat: 25.133087158203125, lng: 55.37945556640625 },
  },
];

describe('getCoordinatesArray', () => {
  it('should return an array of coordinates in [lng, lat] format', () => {
    const result = getCoordinatesArray(mockData);
    expect(result).toEqual([
      [55.375450134277344, 25.128332138061523],
      [55.379249572753906, 25.133018493652344],
      [55.37945556640625, 25.133087158203125],
    ]);
  });

  it('should return an empty array when input is an empty array', () => {
    const result = getCoordinatesArray([]);
    expect(result).toEqual([]);
  });
});
