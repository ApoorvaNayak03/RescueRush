import React from 'react';
import { Source, Layer } from 'react-map-gl';

function Maproute(props:any) {
  return (
    <Source
      
      type="geojson"
      data={{
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: props.coordinates
        },
      }}
    >
      <Layer
        
        type="line"
        
        layout={{
          'line-join': 'round',
          'line-cap': 'square',
          
        }}
        paint={{
          'line-color': '#800000', 
          'line-width': 8,
        }}
        
      />
    </Source>
  );
}

export default Maproute;
