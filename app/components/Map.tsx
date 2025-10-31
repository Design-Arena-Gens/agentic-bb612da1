'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Destination } from '../data/travels';

type MarkerMap = globalThis.Map<string, L.Marker>;

interface MapProps {
  destinations: Destination[];
  onMarkerClick: (destination: Destination) => void;
  selectedJourneyDestinations?: string[];
}

export default function Map({ destinations, onMarkerClick, selectedJourneyDestinations }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<MarkerMap>(new globalThis.Map<string, L.Marker>());
  const polylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!mapRef.current) {
      const map = L.map('map', {
        center: [35, 15],
        zoom: 2,
        minZoom: 2,
        maxZoom: 6,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map);

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current.clear();

    destinations.forEach(destination => {
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-pulse" style="
            width: 16px;
            height: 16px;
            background-color: #1E3A8A;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            cursor: pointer;
          "></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([destination.coordinates[0], destination.coordinates[1]], {
        icon: customIcon,
        title: `${destination.city}, ${destination.country}`,
      })
        .addTo(mapRef.current!)
        .on('click', () => onMarkerClick(destination));

      markersRef.current.set(destination.id, marker);
    });
  }, [destinations, onMarkerClick]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (selectedJourneyDestinations && selectedJourneyDestinations.length > 1) {
      const coords = selectedJourneyDestinations
        .map(id => {
          const dest = destinations.find(d => d.id === id);
          return dest ? [dest.coordinates[0], dest.coordinates[1]] as [number, number] : null;
        })
        .filter(Boolean) as [number, number][];

      if (coords.length > 1) {
        const polyline = L.polyline(coords, {
          color: '#60A5FA',
          weight: 2,
          opacity: 0.8,
          dashArray: '10, 10',
          lineJoin: 'round',
        }).addTo(mapRef.current);

        polylineRef.current = polyline;

        const bounds = L.latLngBounds(coords);
        mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 4 });
      }
    }
  }, [selectedJourneyDestinations, destinations]);

  return <div id="map" className="w-full h-full" role="application" aria-label="Interactive world map showing Mohammad Reza Shah's travels" />;
}
