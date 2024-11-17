import { useDispatch, useSelector } from 'react-redux';
import { selectVehicle } from '../../store/vehicleSlice';
import { VEHICLES } from '../../const';
import { RootState } from '../../store';
import './index.scss';

const VehicleList = () => {
  const dispatch = useDispatch();
  const selectedVehicle = useSelector((state: RootState) => state.vehicle.selectedVehicle);

  const resetSelection = () => {
    dispatch(selectVehicle(''));
  };

  return (
    <div>
      <ul className="vehicle-list">
        {VEHICLES.length > 0 ? (
          VEHICLES.map((plate) => (
            <li
              key={plate}
              className={`vehicle-list__item ${selectedVehicle === plate ? 'vehicle-list__item--selected' : ''}`}
              onClick={() => dispatch(selectVehicle(plate))}>
              {plate}
            </li>
          ))
        ) : (
          <p>No vehicles available</p>
        )}
      </ul>
      <button
        className="reset-button"
        type="button"
        aria-label="Reset vehicle selection"
        title="Reset vehicle selection"
        onClick={resetSelection}>
        Reset
      </button>
    </div>
  );
};

export default VehicleList;
