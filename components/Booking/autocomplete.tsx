import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import React, { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const session_token = '0176e2a0-88df-4ef1-8909-0ad99340ddde';
const MAPBOX_RETRIVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/';

function Autocomplete() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceAddressList, setSourceAddressList] = useState<any[]>([]);
  const [destinationAddressList, setDestinationAddressList] = useState<any[]>([]);
  const [debouncedSource] = useDebounce(source, 1000);
  const [debouncedDestination] = useDebounce(destination, 1000);
  const { sourceCordinates, setSourceCordinates } = useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(DestinationCordiContext);

  useEffect(() => {
    if (debouncedSource) {
      getAddressList(debouncedSource, setSourceAddressList);
    }
  }, [debouncedSource]);

  useEffect(() => {
    if (debouncedDestination) {
      getAddressList(debouncedDestination, setDestinationAddressList);
    }
  }, [debouncedDestination]);

  const getAddressList = async (query: string, setAddressList: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
      const res = await fetch(`/api/searchbox?q=${query}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Error fetching address list:", await res.text());
        setAddressList([]);
        return;
      }

      const result = await res.json();
      setAddressList(result.suggestions.slice(0, 10) || []); 
    } catch (error) {
      console.error("Error fetching address list:", error);
      setAddressList([]);
    }
  };

  const onSourceAddressClick = async (item: any) => {
    try {
      setSource(item.full_address);
      setSourceAddressList([]);

      const url = `${MAPBOX_RETRIVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      setSourceCordinates({
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      });
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  const onDestinationAddressClick = async (item: any) => {
    try {
      setDestination(item.full_address);
      setDestinationAddressList([]);

      const url = `${MAPBOX_RETRIVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      setDestinationCordinates({
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      });
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  return (
    <div className="mt-5">
      <div className="relative mb-6"> 
        <label>From:</label>
        <input
          type="text"
          className="bg-white border-[1px] w-full rounded-md"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        {sourceAddressList.length > 0 && (
          <div className="border bg-white mt-2 rounded-md shadow-lg p-1 absolute w-full max-h-60 overflow-y-auto z-10">
            {sourceAddressList.map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-300 cursor-pointer"
                onClick={() => onSourceAddressClick(item)}
              >
                {item.full_address}
              </div>
            ))}
          </div>
        )}
      </div>
      {sourceAddressList.length === 0 && ( 
        <div className="relative">
          <label>To:</label>
          <input
            type="text"
            className="bg-white border-[1px] w-full rounded-md"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          {destinationAddressList.length > 0 && (
            <div className="border bg-white mt-2 rounded-md shadow-lg p-1 absolute w-full max-h-60 overflow-y-auto z-10">
              {destinationAddressList.map((item, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-300 cursor-pointer"
                  onClick={() => onDestinationAddressClick(item)}
                >
                  {item.full_address}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
