import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface LocationPickerProps {
  onLocationSelect: (latitude: number, longitude: number) => void;
  initialLat?: number;
  initialLng?: number;
  city?: string;
}

const CITY_COORDINATES: Record<string, [number, number]> = {
  'Ouagadougou': [-1.5204, 12.3714],
  'Bobo-Dioulasso': [-4.2833, 11.1833],
  'Koudougou': [-2.3667, 12.2500],
  'Ouahigouya': [-2.4167, 13.5833],
  'Banfora': [-4.7500, 10.6333],
  'Fada N\'gourma': [0.0333, 12.0667],
  'Dori': [-0.0333, 14.4833],
};

export const LocationPicker = ({ onLocationSelect, initialLat, initialLng, city }: LocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(
    initialLat && initialLng ? [initialLng, initialLat] : null
  );

  useEffect(() => {
    if (!mapContainer.current) return;

    // Get initial position from city or default to Ouagadougou
    const cityCoords = city ? CITY_COORDINATES[city] : null;
    const initialCoords: [number, number] = 
      coordinates || cityCoords || CITY_COORDINATES['Ouagadougou'];

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY200N2lwbDJhMDBseTJrcHlnOTluZnN1biJ9.JLechweMLsxP7qlR6cT-Og';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCoords,
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add initial marker if coordinates exist
    if (coordinates) {
      marker.current = new mapboxgl.Marker({ draggable: true, color: '#EF4444' })
        .setLngLat(coordinates)
        .addTo(map.current);

      marker.current.on('dragend', () => {
        const lngLat = marker.current!.getLngLat();
        setCoordinates([lngLat.lng, lngLat.lat]);
        onLocationSelect(lngLat.lat, lngLat.lng);
      });
    }

    // Click to add/move marker
    map.current.on('click', (e) => {
      const lngLat = e.lngLat;
      
      if (marker.current) {
        marker.current.setLngLat(lngLat);
      } else {
        marker.current = new mapboxgl.Marker({ draggable: true, color: '#EF4444' })
          .setLngLat(lngLat)
          .addTo(map.current!);

        marker.current.on('dragend', () => {
          const newLngLat = marker.current!.getLngLat();
          setCoordinates([newLngLat.lng, newLngLat.lat]);
          onLocationSelect(newLngLat.lat, newLngLat.lng);
        });
      }

      setCoordinates([lngLat.lng, lngLat.lat]);
      onLocationSelect(lngLat.lat, lngLat.lng);
    });

    return () => {
      map.current?.remove();
    };
  }, [city]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Position sur la carte
        </CardTitle>
        <CardDescription>
          Cliquez sur la carte pour définir l'emplacement exact de votre bien
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={mapContainer} className="h-[400px] rounded-lg" />
        {coordinates && (
          <p className="text-sm text-muted-foreground mt-2">
            Position : {coordinates[1].toFixed(6)}, {coordinates[0].toFixed(6)}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
