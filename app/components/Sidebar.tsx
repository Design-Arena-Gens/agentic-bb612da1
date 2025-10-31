'use client';

import { useState } from 'react';
import { Destination } from '../data/travels';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  destinations: Destination[];
  onDestinationSelect: (destination: Destination) => void;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface FilterState {
  diplomatic: boolean;
  stateFunction: boolean;
  personal: boolean;
  searchQuery: string;
}

export default function Sidebar({ destinations, onDestinationSelect, onFilterChange, isOpen, onToggle }: SidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    diplomatic: true,
    stateFunction: true,
    personal: true,
    searchQuery: '',
  });

  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const handleFilterChange = (filterName: keyof FilterState, value: boolean | string) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);

    if (filterName === 'searchQuery' && typeof value === 'string') {
      if (value.trim()) {
        const results = destinations.filter(dest =>
          dest.city.toLowerCase().includes(value.toLowerCase()) ||
          dest.country.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(results);
        setShowAutocomplete(true);
      } else {
        setSearchResults([]);
        setShowAutocomplete(false);
      }
    }
  };

  const handleDestinationClick = (destination: Destination) => {
    onDestinationSelect(destination);
    setShowAutocomplete(false);
    setFilters({ ...filters, searchQuery: '' });
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-[1001] bg-royal-blue text-white p-2 rounded-lg shadow-lg hover:bg-royal-blue-light transition-colors md:hidden"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-[1000] overflow-y-auto border-r border-border-gray"
            role="complementary"
            aria-label="Filter and search controls"
          >
            <div className="p-4">
              <h2 className="font-serif text-2xl font-bold text-royal-blue mb-4">Travels Explorer</h2>

              {/* Search */}
              <div className="mb-4 relative">
                <label htmlFor="search" className="block text-sm font-semibold mb-2">
                  Search Destinations
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="City or country..."
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  onFocus={() => filters.searchQuery && setShowAutocomplete(true)}
                  onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
                  className="w-full px-3 py-2 border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue"
                  aria-autocomplete="list"
                  aria-controls="search-results"
                />
                {showAutocomplete && searchResults.length > 0 && (
                  <ul
                    id="search-results"
                    className="absolute top-full left-0 right-0 bg-white border border-border-gray rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto z-10"
                    role="listbox"
                  >
                    {searchResults.map(dest => (
                      <li
                        key={dest.id}
                        onClick={() => handleDestinationClick(dest)}
                        className="px-3 py-2 hover:bg-cream cursor-pointer transition-colors"
                        role="option"
                      >
                        <div className="font-semibold text-sm">{dest.city}</div>
                        <div className="text-xs text-gray-600">{dest.country}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Filters */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Filter by Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.diplomatic}
                      onChange={(e) => handleFilterChange('diplomatic', e.target.checked)}
                      className="w-4 h-4 text-royal-blue border-border-gray rounded focus:ring-royal-blue"
                    />
                    <span className="ml-2 text-sm">Diplomatic Visits</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.stateFunction}
                      onChange={(e) => handleFilterChange('stateFunction', e.target.checked)}
                      className="w-4 h-4 text-royal-blue border-border-gray rounded focus:ring-royal-blue"
                    />
                    <span className="ml-2 text-sm">State Functions</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.personal}
                      onChange={(e) => handleFilterChange('personal', e.target.checked)}
                      className="w-4 h-4 text-royal-blue border-border-gray rounded focus:ring-royal-blue"
                    />
                    <span className="ml-2 text-sm">Personal Travels</span>
                  </label>
                </div>
              </div>

              {/* Destination Index */}
              <div>
                <h3 className="text-sm font-semibold mb-2">All Destinations</h3>
                <ul className="space-y-1 max-h-96 overflow-y-auto">
                  {destinations
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                    .map(dest => (
                      <li
                        key={dest.id}
                        onClick={() => onDestinationSelect(dest)}
                        className="px-2 py-2 hover:bg-cream rounded cursor-pointer transition-colors"
                      >
                        <div className="text-sm font-semibold">{dest.city}</div>
                        <div className="text-xs text-gray-600">{dest.country} • {new Date(dest.startDate).getFullYear()}</div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
