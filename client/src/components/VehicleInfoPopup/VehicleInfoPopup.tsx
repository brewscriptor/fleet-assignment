import { FC, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { getDistanceFromCoords } from '../../../utils/getDistanceFromCoords/getDistanceFromCoords';
import SpeedIcon from '../../assets/icons/SpeedIcon';
import { getCoordinatesArray } from '../../../utils/getCoordinatesArray/getCoordinatesArray';
import './index.scss';

const VehicleInfoPopup: FC = () => {
  const [locationName, setLocationName] = useState('');
  const selectedVehicle = useSelector((state: RootState) => state.vehicle.selectedVehicle);
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);

  useEffect(() => {
    if (selectedVehicle && vehicles[selectedVehicle]) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${vehicles[selectedVehicle].lng},${vehicles[selectedVehicle].lat}.json?access_token=${import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setLocationName(data.features[0].place_name);
        })
        .catch((error) => {
          console.error('Error fetching location name:', error);
          setLocationName('Unknown location');
        });
    }
    // decided to make just one request per vehicle change in order to optimize backend load
  }, [selectedVehicle]);

  // selectedVehicle has a value when the popup is shown
  const vehicle = vehicles[selectedVehicle!];

  // the cost of memoization can potentially exceed the cost of computation in some cases. further investigation is needed
  const routeCoords = useMemo(() => getCoordinatesArray(vehicle.route), [vehicle.route]);
  const distance = useMemo(() => getDistanceFromCoords(routeCoords), [routeCoords]);

  return (
    <div className="popup">
      <p>Last location</p>
      <p>{locationName}</p>
      <div className="metrics">
        <div className="metrics__item">
          <SpeedIcon />
          &nbsp;{vehicle.speed} km/h
        </div>
        <div className="metrics__item">
          <SpeedIcon />
          &nbsp;{distance} km
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoPopup;
