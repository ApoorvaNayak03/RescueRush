"use client"

import React, { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import Booking from '@/components/Booking/booking'
import Mapbox from '@/components/map/mapbox'
import { userLocationContext } from '@/context/UserLocationContext'
import { SourceCordiContext } from '@/context/SourceCordiContext'
import { DestinationCordiContext } from '@/context/DestinationCordiContext'
import { DirectionDataContext } from '@/context/DirectionDataContext'

export default function Map() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCordinates, setSourceCordinates] = useState<any>([]);
  const [destinationCordinates, setDestinationCordinates] = useState<any>([]);
  const [directiondataCordinates, setdirectiondataCordinates] = useState<any>([]);
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function(pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    });
  };

  return (
    <div className=''>
      <userLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCordiContext.Provider value={{ sourceCordinates, setSourceCordinates }}>
          <DestinationCordiContext.Provider value={{ destinationCordinates, setDestinationCordinates }}>
          <DirectionDataContext.Provider value={{directiondataCordinates,setdirectiondataCordinates}}>
            <div>
              <NavBar />
              <div className='grid grid-cols-1 md:grid-cols-3'>
                <div>
                  <Booking />
                </div>
                <div className='col-span-2'>
                  <Mapbox />
                </div>
              </div>
            </div>
            </DirectionDataContext.Provider>
          </DestinationCordiContext.Provider>
        </SourceCordiContext.Provider>
      </userLocationContext.Provider>
    </div>
  );
}
