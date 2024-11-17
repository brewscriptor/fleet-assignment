import { describe, it, expect } from 'vitest';
import { filterCoordinatesByStatus } from './filterCoordinatesByStatus';
import type { Route } from '../../src/store/vehicleSlice';

const mockData: Route[] = [
  { status: 'moving', coordinates: { lat: 25.128332138061523, lng: 55.375450134277344 } },
  { status: 'stopped', coordinates: { lat: 25.13, lng: 55.376 } },
  { status: 'moving', coordinates: { lat: 25.133018493652344, lng: 55.379249572753906 } },
  { status: 'idle', coordinates: { lat: 25.14, lng: 55.38 } },
  { status: 'moving', coordinates: { lat: 25.133087158203125, lng: 55.37945556640625 } },
];

describe('filterCoordinatesByStatus', () => {
  it('should return an array of coordinates for status "moving"', () => {
    const result = filterCoordinatesByStatus(mockData, 'moving');
    expect(result).toEqual([
      [25.128332138061523, 55.375450134277344],
      [25.133018493652344, 55.379249572753906],
      [25.133087158203125, 55.37945556640625],
    ]);
  });

  it('should return an array of coordinates for status "stopped"', () => {
    const result = filterCoordinatesByStatus(mockData, 'stopped');
    expect(result).toEqual([[25.13, 55.376]]);
  });

  it('should return an array of coordinates for status "idle"', () => {
    const result = filterCoordinatesByStatus(mockData, 'idle');
    expect(result).toEqual([[25.14, 55.38]]);
  });

  it('should return an empty array if no matching status is found', () => {
    //@ts-expect-error test data 'unknown'
    const result = filterCoordinatesByStatus(mockData, 'unknown');
    expect(result).toEqual([]);
  });
});
