export const getLocationPromise = (
  options: PositionOptions = {}
): Promise<GeolocationPosition> => {
  return new Promise(
    (
      resolve: (position: GeolocationPosition) => void,
      reject: (error: GeolocationPositionError) => void
    ) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        },
        options
      );
    }
  );
};
