import Map, { Marker, Popup, NavigationControl, Source, Layer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import { getCoordinatesArray } from '../../../utils/getCoordinatesArray/getCoordinatesArray';
import { useEffect, useState } from 'react';
import StartIcon from '../../assets/icons/StartIcon';
import { filterCoordinatesByStatus } from '../../../utils/filterCoordinatesByStatus/filterCoordinatesByStatus';
import IdleIcon from '../../assets/icons/IdleIcon';
import StopIcon from '../../assets/icons/StopIcon';
import type { RootState } from '../../store';
import type { VehicleData } from '../../../types/index';
import type { Position } from 'geojson';
import { popupStyle, routeLayerStyle } from './config';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapView = () => {
  const [routeCoords, setRouteCoords] = useState<Position[]>([]);
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
  const selectedVehicle = useSelector((state: RootState) => state.vehicle.selectedVehicle);

  useEffect(() => {
    if (selectedVehicle && vehicles[selectedVehicle]?.route) {
      setRouteCoords(getCoordinatesArray(vehicles[selectedVehicle].route));
    }
  }, [selectedVehicle, vehicles]);

  const routeGeojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: routeCoords,
    },
  };

  return (
    <Map
      initialViewState={{
        latitude: 25.189299,
        longitude: 55.297078,
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN}>
      {Object.entries(vehicles).map((vehicle: [string, VehicleData]) => {
        const [plate, data] = vehicle;

        return (
          <Marker key={plate} latitude={data.lat} longitude={data.lng} anchor="bottom">
            <ArrowIcon />
          </Marker>
        );
      })}
      {selectedVehicle && vehicles[selectedVehicle]?.route?.length > 0 && (
        <Marker
          latitude={vehicles[selectedVehicle].route[0].coordinates.lat}
          longitude={vehicles[selectedVehicle].route[0].coordinates.lng}>
          <StartIcon />
        </Marker>
      )}
      {selectedVehicle &&
        filterCoordinatesByStatus(vehicles[selectedVehicle].route, 'idle').map((point, index) => {
          const [lat, lng] = point;
          return (
            <Marker latitude={lat} longitude={lng} key={`${lat}-${lng}-${index}`}>
              <IdleIcon />
            </Marker>
          );
        })}
      {selectedVehicle &&
        filterCoordinatesByStatus(vehicles[selectedVehicle].route, 'stopped').map(
          (point, index) => {
            const [lat, lng] = point;
            return (
              <Marker latitude={lat} longitude={lng} key={`${lat}-${lng}-${index}`}>
                <StopIcon />
              </Marker>
            );
          },
        )}
      {selectedVehicle && vehicles[selectedVehicle] && (
        <Popup
          anchor="top-left"
          latitude={vehicles[selectedVehicle].lat}
          longitude={vehicles[selectedVehicle].lng}
          style={popupStyle}>
          <div>
            <p>Plate: {vehicles[selectedVehicle].plate}</p>
            <p>Status: {vehicles[selectedVehicle].status}</p>
          </div>
        </Popup>
      )}
      {selectedVehicle && (
        <Source id="my-data-routes" type="geojson" data={routeGeojson}>
          {/* @ts-expect-error There is a discrepancy between the documentation and the proposed types examples. It is necessary to conduct further investigation on this matter */}
          <Layer {...routeLayerStyle} />
        </Source>
      )}
      <NavigationControl position="bottom-right" showCompass={false} />
    </Map>
  );
};

export default MapView;
