import { CSSProperties } from 'react';

export const routeLayerStyle = {
  id: 'lineLayer',
  type: 'line',
  source: '',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': 'rgba(49,133,83,255)',
    'line-width': 5,
  },
};

export const popupStyle: CSSProperties = { color: '#000000' };
