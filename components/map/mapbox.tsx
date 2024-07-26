import { userLocationContext } from '@/context/UserLocationContext';
import React, { useContext, useRef, useEffect, useState } from 'react';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from '@/components/map/markers';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import Maproute from '@/components/map/maproute';

const MAPBOX_DRIVING_ENDPOINT = "https://api.mapbox.com/directions/v5/mapbox/driving/";

function Mapbox() {
  const { userLocation } = useContext(userLocationContext);
  const Mapref = useRef();
  const { sourceCordinates } = useContext(SourceCordiContext);
  const { destinationCordinates } = useContext(DestinationCordiContext);
  const { directiondataCordinates, setdirectiondataCordinates } = useContext(DirectionDataContext);
  const [distance, setDistance] = useState(null);
  const [distances, setDistances] = useState<{ name: string; distance: number }[]>([]);

  useEffect(() => {
    if (sourceCordinates) {
      Mapref.current?.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCordinates]);

  useEffect(() => {
    if (destinationCordinates) {
      Mapref.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });

      if (sourceCordinates) {
        getDirectionRoute();
      }
    }
  }, [destinationCordinates]);

  const getDirectionRoute = async () => {
    const volunteerLocations = [
      { lng: 74.8560, lat: 12.9141, name: 'Volunteer1' },
      { lng: 74.7947, lat: 13.0911, name: 'Volunteer2' },
      { lng: 75.2013, lat: 12.7595, name: 'Volunteer3' }
    ];

    const distances = await Promise.all(
      volunteerLocations.map(async (location) => {
        const res = await fetch(
          `${MAPBOX_DRIVING_ENDPOINT}${destinationCordinates.lng},${destinationCordinates.lat};${location.lng},${location.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`, {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );

        const result = await res.json();
        if (result.routes && result.routes.length > 0) {
          const distanceInMeters = result.routes[0].distance;
          const distanceInKilometers = distanceInMeters / 1000;
          return { name: location.name, distance: distanceInKilometers };
        }
        return null; // Ensure to return null if no route is found
      })
    );

    const validDistances = distances.filter(Boolean); // Filter out null values
    setDistances(validDistances);

    // Identify the volunteer with the least distance
    

    // Get distance to destination
    const res = await fetch(
      `${MAPBOX_DRIVING_ENDPOINT}${sourceCordinates.lng},${sourceCordinates.lat};${destinationCordinates.lng},${destinationCordinates.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`, {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    const result = await res.json();
    setdirectiondataCordinates(result); // Set the direction data in context
    if (result.routes && result.routes.length > 0) {
      const distanceInMeters = result.routes[0].distance;
      const distanceInKilometers = distanceInMeters / 1000;
      setDistance(distanceInKilometers);
    }
    if (validDistances.length > 0) {
      const closestVolunteer = validDistances.reduce((prev, curr) => {
        return (prev.distance < curr.distance) ? prev : curr;
      });

      // Alert the user about the closest volunteer
      alert(`${closestVolunteer.name} is the closest volunteer to the destination at a distance of ${closestVolunteer.distance.toFixed(2)} km.`);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="overflow-hidden">
        {userLocation ? (
          <Map
            ref={Mapref}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 10,
            }}
            style={{ width: '100%', height: 500 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {directiondataCordinates?.routes ? (
              <Maproute
                coordinates={directiondataCordinates.routes[0].geometry.coordinates} />
            ) : null}
          </Map>
        ) : null}
      </div>
      {distance !== null && (
        <div className="mt-4">
          <h3 className="text-[18px] font-semibold">Distance to Destination: {distance.toFixed(2)} km</h3>
        </div>
      )}
      {distances.length > 0 && (
        <div className="mt-4">
          <h3 className="text-[18px] font-semibold">Distances from Destination:</h3>
          {distances.map((location) => (
            <div key={location.name} className="mt-2">
              <h4 className="text-[16px] font-semibold">{location.name}: {location.distance.toFixed(2)} km</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Mapbox;