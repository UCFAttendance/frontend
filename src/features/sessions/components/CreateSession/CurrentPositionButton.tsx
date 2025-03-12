import { MapPinIcon } from "@heroicons/react/20/solid";
import { useCallback } from "react";
import { useMap } from "react-map-gl/mapbox";
import { toast } from "sonner";

import { getLocationPromise } from "@/utils/getLocationPromise";

export const CurrentPositionButton = () => {
  const { current: map } = useMap();

  const getCurrentLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      const locationPromise = getLocationPromise({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      });
      toast.promise(locationPromise, {
        loading: "Getting location...",
        success: (position) => {
          map?.flyTo({
            center: [position.coords.longitude, position.coords.latitude],
            maxDuration: 500,
          });
          return "Location fetched";
        },
        error: (err) => {
          toast.error(err.message);
          return "Failed to get location";
        },
      });
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  }, [map]);

  return (
    <div className="absolute top-2 right-2 p-2 bg-white rounded-md cursor-pointer">
      <button className="flex items-center gap-x-1" type="button">
        <MapPinIcon className="h-4 w-4 text-blue-600" />
        <span
          className="text-xs/6 text-blue-600 font-bold cursor-pointer"
          onClick={getCurrentLocation}
        >
          Current Location
        </span>
      </button>
    </div>
  );
};
