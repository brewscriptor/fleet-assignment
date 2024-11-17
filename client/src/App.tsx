import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRawData, updateVehicle } from './store/vehicleSlice';
import SocketService from './services/socketService';
import VehicleList from './components/VehicleList/VehicleList';
import MapView from './components/MapView/MapView';
import VehicleInfoPopup from './components/VehicleInfoPopup/VehicleInfoPopup';
import { VEHICLES } from './const';
import { RootState } from './store';
import './App.scss';

const App: FC = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
  const selectedVehicle = useSelector((state: RootState) => state.vehicle.selectedVehicle);

  useEffect(() => {
    try {
      SocketService.connect();
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }

    VEHICLES.forEach((plate) => {
      try {
        SocketService.subscribeToVehicle(plate);
      } catch (error) {
        console.error(`Failed to subscribe to vehicle ${plate}:`, error);
      }
    });

    SocketService.onVehicleData((rawData: IRawData) => {
      const { plate, data } = rawData;
      dispatch(updateVehicle({ ...data, plate }));
    });

    return () => {
      SocketService.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="app">
      <div className="app__panel">
        <VehicleList />
      </div>
      <main className="app__map">
        <MapView />
      </main>
      {selectedVehicle && vehicles[selectedVehicle] && <VehicleInfoPopup />}
    </div>
  );
};

export default App;
