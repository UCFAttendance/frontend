import Mapbox from "react-map-gl/mapbox";
import { CurrentPositionButton } from "./CurrentPositionButton";

const TOKEN =
  "pk.eyJ1IjoieGhvYW50cmFuIiwiYSI6ImNtODUzd3BhbTBsaGoycXBncHU4ZGVzYXQifQ.LI4ExSJEqOUfIG3T2jGRqw";

interface MapProps {
  initialLongitude: number;
  initialLatitude: number;
  onLocationChange: (longitude: number, latitude: number) => void;
}

export const Map = (props: MapProps) => {
  const { initialLongitude, initialLatitude, onLocationChange } = props;

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
        onDrag={(e) =>
          onLocationChange(e.viewState.longitude, e.viewState.latitude)
        }
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-1/2 bg-red-500/15 rounded-full border border-red-500 size-25" />
        <div className="absolute top-1/2 left-1/2 transform -translate-1/2 w-2 h-2 bg-red-500 rounded-full" />
        <CurrentPositionButton />
      </Mapbox>
    </div>
  );
};
