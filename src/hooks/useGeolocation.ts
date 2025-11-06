import { useState, useEffect, useCallback } from 'react';

interface GeolocationData {
  city: string;
  neighborhood?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

interface GeolocationReturn {
  location: GeolocationData;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const OUAGADOUGOU_NEIGHBORHOODS = [
  { name: 'Ouaga 2000', lat: 12.3500, lng: -1.5400, bounds: { latMin: 12.33, latMax: 12.37, lngMin: -1.56, lngMax: -1.52 } },
  { name: 'Koulouba', lat: 12.3650, lng: -1.5650, bounds: { latMin: 12.35, latMax: 12.38, lngMin: -1.58, lngMax: -1.55 } },
  { name: 'Dapoya', lat: 12.3450, lng: -1.5750, bounds: { latMin: 12.33, latMax: 12.36, lngMin: -1.59, lngMax: -1.56 } },
  { name: 'Gounghin', lat: 12.3250, lng: -1.5950, bounds: { latMin: 12.31, latMax: 12.34, lngMin: -1.61, lngMax: -1.58 } },
  { name: 'Pissy', lat: 12.3550, lng: -1.5550, bounds: { latMin: 12.34, latMax: 12.37, lngMin: -1.57, lngMax: -1.54 } },
  { name: 'Tampouy', lat: 12.3050, lng: -1.5850, bounds: { latMin: 12.29, latMax: 12.32, lngMin: -1.60, lngMax: -1.57 } },
  { name: 'Bogodogo', lat: 12.3850, lng: -1.5450, bounds: { latMin: 12.37, latMax: 12.40, lngMin: -1.56, lngMax: -1.53 } },
  { name: 'Tanghin', lat: 12.3350, lng: -1.5150, bounds: { latMin: 12.32, latMax: 12.35, lngMin: -1.53, lngMax: -1.50 } },
  { name: 'Somgandé', lat: 12.2950, lng: -1.5650, bounds: { latMin: 12.28, latMax: 12.31, lngMin: -1.58, lngMax: -1.55 } },
  { name: 'Karpala', lat: 12.3150, lng: -1.6150, bounds: { latMin: 12.30, latMax: 12.33, lngMin: -1.63, lngMax: -1.60 } },
  { name: 'Sanyiri', lat: 12.3650, lng: -1.5250, bounds: { latMin: 12.35, latMax: 12.38, lngMin: -1.54, lngMax: -1.51 } },
  { name: "Patte d'Oie", lat: 12.3450, lng: -1.5650, bounds: { latMin: 12.33, latMax: 12.36, lngMin: -1.58, lngMax: -1.55 } }
];

const CACHE_KEY = 'user_location';
const CACHE_TIMESTAMP_KEY = 'user_location_timestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const detectNeighborhood = (lat: number, lng: number): string | undefined => {
  for (const neighborhood of OUAGADOUGOU_NEIGHBORHOODS) {
    if (
      lat >= neighborhood.bounds.latMin &&
      lat <= neighborhood.bounds.latMax &&
      lng >= neighborhood.bounds.lngMin &&
      lng <= neighborhood.bounds.lngMax
    ) {
      return neighborhood.name;
    }
  }
  return undefined;
};

export const useGeolocation = (): GeolocationReturn => {
  const [location, setLocation] = useState<GeolocationData>({
    city: 'Ouagadougou',
    country: 'Burkina Faso',
    neighborhood: undefined
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check cache first (5 min)
      const cachedLocation = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (cachedLocation && cachedTime) {
        const cacheAge = Date.now() - parseInt(cachedTime);
        if (cacheAge < CACHE_DURATION) {
          setLocation(JSON.parse(cachedLocation));
          setIsLoading(false);
          return;
        }
      }

      if ('geolocation' in navigator) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            maximumAge: CACHE_DURATION
          });
        });

        const { latitude, longitude } = position.coords;
        const neighborhood = detectNeighborhood(latitude, longitude);
        
        const locationData: GeolocationData = {
          city: 'Ouagadougou',
          country: 'Burkina Faso',
          neighborhood,
          latitude,
          longitude
        };
        
        setLocation(locationData);
        localStorage.setItem(CACHE_KEY, JSON.stringify(locationData));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      } else {
        setLocation({ 
          city: 'Ouagadougou',
          country: 'Burkina Faso'
        });
      }
    } catch (err) {
      setError(err as Error);
      setLocation({ 
        city: 'Ouagadougou',
        country: 'Burkina Faso'
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Execute once on mount to avoid infinite loop

  return {
    location,
    isLoading,
    error,
    refresh: fetchLocation
  };
};
