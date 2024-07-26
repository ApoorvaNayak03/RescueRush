import React, { useContext } from 'react';
import { Marker } from 'react-map-gl';
import { userLocationContext } from '@/context/UserLocationContext';
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";

function Markers() {
  const { userLocation } = useContext(userLocationContext);
  const { sourceCordinates } = useContext(SourceCordiContext);
  const { destinationCordinates } = useContext(DestinationCordiContext);

  const volunteerLocations = [
    { lng: 74.8560, lat: 12.9141, name: 'Mangalore' },
    { lng: 74.7947, lat: 13.0911, name: 'Mulki' },
    { lng: 75.2013, lat: 12.7595, name: 'Puttur' }
  ];
  
  return (
    <div>
      {/* User Marker */}
      <Marker
        longitude={userLocation?.lng}
        latitude={userLocation?.lat}
        anchor="bottom"
      >
        <img src="/admin.png" alt="marker" className='w-10 h-10' />
      </Marker>

      {/* Volunteer Markers */}
      {volunteerLocations.map((location, index) => (
        <Marker
          key={index}
          longitude={location.lng}
          latitude={location.lat}
          anchor="bottom"
        >
          <img src="/volunteerpin.png" alt={`${location.name} marker`} className='w-10 h-10' />
        </Marker>
      ))}

      {/* Source Marker */}
      {sourceCordinates != 0 && (
        <Marker
          longitude={sourceCordinates?.lng}
          latitude={sourceCordinates?.lat}
          anchor="bottom"
        >
          <img src="/pin.png" alt="marker" className='w-10 h-10' />
        </Marker>
      )}

      {/* Destination Marker */}
      {destinationCordinates != 0 && (
        <Marker
          longitude={destinationCordinates?.lng}
          latitude={destinationCordinates?.lat}
          anchor="bottom"
        >
          <img src="/pin.png" alt="marker" className='w-10 h-10' />
        </Marker>
      )}
    </div>
  );
}

export default Markers;
