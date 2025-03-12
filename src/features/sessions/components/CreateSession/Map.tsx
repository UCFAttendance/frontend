import { useCallback } from "react";
import Mapbox, { ViewStateChangeEvent } from "react-map-gl/mapbox";
import { CurrentPositionButton } from "./CurrentPositionButton";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

interface MapProps {
  initialLongitude: number;
  initialLatitude: number;
  onLocationChange: (longitude: number, latitude: number) => void;
}

export const Map = (props: MapProps) => {
  const { initialLongitude, initialLatitude, onLocationChange } = props;

  const onMove = useCallback(
    (e: ViewStateChangeEvent) =>
      onLocationChange(e.viewState.longitude, e.viewState.latitude),
    [onLocationChange]
  );

  return (
    <div className="relative h-72 overflow-hidden rounded-lg mt-4">
      <Mapbox
        initialViewState={{
          longitude: initialLongitude,
          latitude: initialLatitude,
        }}
        zoom={16}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
        onMove={onMove}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-1/2 bg-red-500/15 rounded-full border border-red-500 size-25" />
        <div className="absolute top-1/2 left-1/2 transform -translate-1/2 w-2 h-2 bg-red-500 rounded-full" />
        <CurrentPositionButton />
      </Mapbox>
    </div>
  );
};
