'use client';

import { useState, useEffect } from 'react';
import { Journey } from '../data/travels';

interface TimelineSliderProps {
  minYear: number;
  maxYear: number;
  journeys: Journey[];
  onYearChange: (year: number) => void;
  onJourneySelect: (journey: Journey | null) => void;
}

export default function TimelineSlider({
  minYear,
  maxYear,
  journeys,
  onYearChange,
  onJourneySelect,
}: TimelineSliderProps) {
  const [selectedYear, setSelectedYear] = useState(maxYear);
  const [hoveredJourney, setHoveredJourney] = useState<Journey | null>(null);

  useEffect(() => {
    onYearChange(selectedYear);
  }, [selectedYear, onYearChange]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
  };

  const getJourneyPosition = (year: number) => {
    const range = maxYear - minYear;
    return ((year - minYear) / range) * 100;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-gray shadow-lg z-[900] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="timeline" className="font-serif text-lg font-bold text-royal-blue">
            Timeline
          </label>
          <span className="text-2xl font-bold text-royal-blue" aria-live="polite">
            {selectedYear}
          </span>
        </div>

        <div className="relative">
          {/* Journey markers */}
          <div className="absolute -top-6 left-0 right-0 h-8">
            {journeys.map((journey) => {
              const position = getJourneyPosition(journey.year);
              return (
                <button
                  key={journey.id}
                  onClick={() => onJourneySelect(journey)}
                  onMouseEnter={() => setHoveredJourney(journey)}
                  onMouseLeave={() => setHoveredJourney(null)}
                  className="absolute transform -translate-x-1/2 group"
                  style={{ left: `${position}%` }}
                  aria-label={`Select journey: ${journey.name}`}
                >
                  <div className="w-3 h-3 bg-royal-blue rounded-full hover:scale-150 transition-transform cursor-pointer shadow-md" />
                  {hoveredJourney?.id === journey.id && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-royal-blue text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg">
                      {journey.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                        <div className="border-4 border-transparent border-t-royal-blue" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Slider */}
          <div className="relative pt-2">
            <input
              id="timeline"
              type="range"
              min={minYear}
              max={maxYear}
              value={selectedYear}
              onChange={handleYearChange}
              className="w-full h-2 bg-border-gray rounded-lg appearance-none cursor-pointer slider"
              aria-valuemin={minYear}
              aria-valuemax={maxYear}
              aria-valuenow={selectedYear}
              aria-label={`Select year from ${minYear} to ${maxYear}`}
            />
          </div>

          {/* Year labels */}
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{minYear}</span>
            <span>{maxYear}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #1E3A8A;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #1E3A8A;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }

        .slider:focus {
          outline: none;
        }

        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.3);
        }

        .slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.3);
        }
      `}</style>
    </div>
  );
}
