'use client';

import { Journey, Destination } from '../data/travels';
import { motion, AnimatePresence } from 'framer-motion';

interface JourneySheetProps {
  journey: Journey | null;
  destinations: Destination[];
  onClose: () => void;
  onDestinationClick: (destination: Destination) => void;
}

export default function JourneySheet({ journey, destinations, onClose, onDestinationClick }: JourneySheetProps) {
  if (!journey) return null;

  const journeyDestinations = journey.destinations
    .map(id => destinations.find(d => d.id === id))
    .filter(Boolean) as Destination[];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-[1500] max-h-[70vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="journey-title"
      >
        <div className="sticky top-0 bg-white border-b border-border-gray px-4 py-3 flex items-center justify-between">
          <div className="flex-1">
            <div className="w-12 h-1 bg-border-gray rounded-full mx-auto mb-2" aria-hidden="true" />
            <h2 id="journey-title" className="font-serif text-xl md:text-2xl font-bold text-royal-blue">
              {journey.name}
            </h2>
            <p className="text-sm text-gray-600">{journey.year}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream rounded-full transition-colors"
            aria-label="Close journey details"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="p-4 md:p-6">
          <p className="text-gray-700 mb-4 leading-relaxed">{journey.description}</p>

          <h3 className="font-serif text-lg font-bold mb-3">Journey Destinations</h3>
          <div className="space-y-2">
            {journeyDestinations.map((dest, index) => (
              <button
                key={dest.id}
                onClick={() => onDestinationClick(dest)}
                className="w-full text-left p-3 bg-cream hover:bg-royal-blue hover:text-white rounded-lg transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-royal-blue group-hover:bg-white text-white group-hover:text-royal-blue rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{dest.city}, {dest.country}</div>
                    <div className="text-sm opacity-80">
                      {new Date(dest.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
