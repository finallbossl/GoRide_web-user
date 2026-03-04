'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const locations = [
  { id: 'quy-nhon-center', name: 'GoRide Trung tâm Quy Nhơn', position: [13.7820, 109.2190] as [number, number], bikes: 180 },
  { id: 'gieng-tien', name: 'GoRide Ghềnh Ráng', position: [13.7563, 109.2147] as [number, number], bikes: 90 },
  { id: 'nhon-ly', name: 'GoRide Nhơn Lý', position: [13.8897, 109.2940] as [number, number], bikes: 70 },
  { id: 'ky-co', name: 'GoRide Kỳ Co', position: [13.8858, 109.3017] as [number, number], bikes: 60 },
  { id: 'bai-xep', name: 'GoRide Bãi Xép', position: [13.7926, 109.2477] as [number, number], bikes: 65 },
  { id: 'phuong-mai', name: 'GoRide Bán đảo Phương Mai', position: [13.8475, 109.2376] as [number, number], bikes: 85 }
];

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstance.current) {
      // 1. Initialize custom icon
      const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      // 2. Initialize Map
      mapInstance.current = L.map(mapRef.current).setView([13.7820, 109.2190], 12);

      // 3. Add Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);

      // 4. Add Markers
      locations.forEach(loc => {
        const marker = L.marker(loc.position, { icon: DefaultIcon }).addTo(mapInstance.current!);
        
        const popupContent = `
          <div style="padding: 4px; font-family: 'Plus Jakarta Sans', sans-serif;">
            <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px; font-size: 14px;">${loc.name}</div>
            <div style="font-size: 12px; color: #0d9488; font-weight: 700;">${loc.bikes} xe sẵn sàng</div>
            <a href="/cars" style="display: inline-block; margin-top: 8px; color: #3b82f6; font-weight: 700; font-size: 12px; text-decoration: none;">Thuê xe ngay &rarr;</a>
          </div>
        `;
        
        marker.bindPopup(popupContent);
      });
    }

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapRef} style={{ height: '100%', width: '100%', borderRadius: 'inherit' }} />
  );
}
