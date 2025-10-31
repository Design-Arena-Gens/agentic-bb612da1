'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { destinations, journeys, getYearRange, Destination, Journey } from './data/travels';
import Sidebar, { FilterState } from './components/Sidebar';
import DestinationCard from './components/DestinationCard';
import JourneySheet from './components/JourneySheet';
import TimelineSlider from './components/TimelineSlider';

const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-cream">
      <div className="text-royal-blue font-serif text-xl">Loading map...</div>
    </div>
  ),
});

export default function Home() {
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinations);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(getYearRange().max);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const yearRange = getYearRange();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFilterChange = useCallback((filters: FilterState) => {
    let filtered = destinations;

    const activeCategories: string[] = [];
    if (filters.diplomatic) activeCategories.push('diplomatic');
    if (filters.stateFunction) activeCategories.push('state-function');
    if (filters.personal) activeCategories.push('personal');

    if (activeCategories.length > 0) {
      filtered = filtered.filter(dest => activeCategories.includes(dest.category));
    }

    setFilteredDestinations(filtered);
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
    const filtered = destinations.filter(dest => {
      const destYear = new Date(dest.startDate).getFullYear();
      return destYear <= year;
    });
    setFilteredDestinations(filtered);
  }, []);

  const handleMarkerClick = useCallback((destination: Destination) => {
    setSelectedDestination(destination);
    setSelectedJourney(null);
  }, []);

  const handleJourneySelect = useCallback((journey: Journey | null) => {
    setSelectedJourney(journey);
    setSelectedDestination(null);
    if (journey) {
      const journeyDestinations = journey.destinations
        .map(id => destinations.find(d => d.id === id))
        .filter(Boolean) as Destination[];
      setFilteredDestinations(journeyDestinations);
    } else {
      handleYearChange(selectedYear);
    }
  }, [selectedYear, handleYearChange]);

  const handleDestinationSelect = useCallback((destination: Destination) => {
    setSelectedDestination(destination);
    setSidebarOpen(false);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-cream">
        <div className="text-royal-blue font-serif text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-cream">
      <Sidebar
        destinations={destinations}
        onDestinationSelect={handleDestinationSelect}
        onFilterChange={handleFilterChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="absolute inset-0 md:left-80">
        <Map
          destinations={filteredDestinations}
          onMarkerClick={handleMarkerClick}
          selectedJourneyDestinations={selectedJourney?.destinations}
        />
      </div>

      <TimelineSlider
        minYear={yearRange.min}
        maxYear={yearRange.max}
        journeys={journeys}
        onYearChange={handleYearChange}
        onJourneySelect={handleJourneySelect}
      />

      {selectedDestination && (
        <DestinationCard
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      {selectedJourney && (
        <JourneySheet
          journey={selectedJourney}
          destinations={destinations}
          onClose={() => {
            setSelectedJourney(null);
            handleYearChange(selectedYear);
          }}
          onDestinationClick={(dest) => {
            setSelectedJourney(null);
            setSelectedDestination(dest);
          }}
        />
      )}
    </main>
  );
}
