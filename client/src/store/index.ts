import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import vehicleReducer from './vehicleSlice';

const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
