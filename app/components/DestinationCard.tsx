'use client';

import { useState } from 'react';
import { Destination } from '../data/travels';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface DestinationCardProps {
  destination: Destination;
  onClose: () => void;
}

export default function DestinationCard({ destination, onClose }: DestinationCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length);
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${format(startDate, 'MMMM d, yyyy')} - ${format(endDate, 'MMMM d, yyyy')}`;
  };

  const getDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-[2000] flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="destination-title"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Gallery */}
          <div className="relative h-64 md:h-80 bg-gray-200">
            <img
              src={destination.images[currentImageIndex]}
              alt={`${destination.city}, ${destination.country}`}
              className="w-full h-full object-cover"
            />
            {destination.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {destination.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-4' : 'bg-white bg-opacity-50'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
              aria-label="Close card"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 id="destination-title" className="font-serif text-2xl md:text-3xl font-bold text-royal-blue">
                  {destination.city}
                </h2>
                <p className="text-gray-600 text-lg">{destination.country}</p>
              </div>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-royal-blue text-white capitalize">
                {destination.category.replace('-', ' ')}
              </span>
            </div>

            <div className="mb-4 text-sm text-gray-600">
              <div>{formatDateRange(destination.startDate, destination.endDate)}</div>
              <div className="text-xs mt-1">Duration: {getDuration(destination.startDate, destination.endDate)}</div>
            </div>

            <div className="mb-4">
              <h3 className="font-serif text-lg font-bold mb-2">Visit Summary</h3>
              <p className="text-gray-700 leading-relaxed">{destination.summary}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-serif text-lg font-bold mb-2">Historical Significance</h3>
              <p className="text-gray-700 leading-relaxed">{destination.significance}</p>
            </div>

            {destination.meetings && destination.meetings.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-2">Key Meetings</h3>
                <ul className="list-disc list-inside space-y-1">
                  {destination.meetings.map((meeting, index) => (
                    <li key={index} className="text-gray-700">
                      {meeting}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
