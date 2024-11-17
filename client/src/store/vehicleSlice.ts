import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { VehicleData } from '../../types/index';

interface VehicleState {
  vehicles: Record<string, VehicleData>;
  selectedVehicle: string | null;
}

const initialState: VehicleState = {
  vehicles: {},
  selectedVehicle: null,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    updateVehicle(state, action: PayloadAction<Omit<VehicleData, 'route'>>) {
      const { plate, lat, lng, angle, speed, status, timestamp } = action.payload;

      if (!state.vehicles[plate]) {
        state.vehicles[plate] = {
          plate,
          lat,
          lng,
          angle,
          speed,
          status,
          timestamp,
          route: [{ status, coordinates: { lat, lng } }],
        };
      } else {
        state.vehicles[plate] = {
          ...state.vehicles[plate],
          lat,
          lng,
          angle,
          speed,
          status,
          timestamp,
          route: [...state.vehicles[plate].route, { status, coordinates: { lat, lng } }],
        };
      }
    },
    selectVehicle(state, action: PayloadAction<string>) {
      state.selectedVehicle = action.payload;
    },
    clearSelection(state) {
      state.selectedVehicle = null;
    },
  },
});

export const { updateVehicle, selectVehicle, clearSelection } = vehicleSlice.actions;
export default vehicleSlice.reducer;
