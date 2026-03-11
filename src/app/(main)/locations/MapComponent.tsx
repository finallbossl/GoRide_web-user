'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent({ locations = [] }: { locations?: any[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstance.current) {
      // 1. Initialize Map
      mapInstance.current = L.map(mapRef.current).setView([13.7820, 109.2190], 12);

      // 2. Add Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);

      // 3. Initialize LayerGroup for markers
      markerGroupRef.current = L.layerGroup().addTo(mapInstance.current);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerGroupRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current && markerGroupRef.current) {
      // Clear existing markers
      markerGroupRef.current.clearLayers();

      if (locations.length > 0) {
        const DefaultIcon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        const fixedPositions: [number, number][] = [
          [13.7820, 109.2190],
          [13.7563, 109.2147],
          [13.8897, 109.2940],
          [13.8858, 109.3017],
          [13.7926, 109.2477],
          [13.8475, 109.2376]
        ];

        locations.forEach((loc, index) => {
          const position = fixedPositions[index % fixedPositions.length];
          const marker = L.marker(position, { icon: DefaultIcon });

          const popupContent = `
            <div style="padding: 4px; font-family: 'Plus Jakarta Sans', sans-serif;">
              <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px; font-size: 14px;">${loc.name}</div>
              <div style="font-size: 12px; color: #0d9488; font-weight: 700;">${loc.bikes || '10+'} xe sẵn sàng</div>
              <a href="/motorbike" style="display: inline-block; margin-top: 8px; color: #3b82f6; font-weight: 700; font-size: 12px; text-decoration: none;">Thuê xe ngay &rarr;</a>
            </div>
          `;

          marker.bindPopup(popupContent);
          markerGroupRef.current?.addLayer(marker);
        });
      }
    }
  }, [locations]);

  return (
    <div ref={mapRef} style={{ height: '100%', width: '100%', borderRadius: 'inherit' }} />
  );
}
