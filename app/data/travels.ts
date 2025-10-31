export interface Destination {
  id: string;
  country: string;
  city: string;
  coordinates: [number, number];
  startDate: string;
  endDate: string;
  category: 'diplomatic' | 'state-function' | 'personal';
  summary: string;
  significance: string;
  images: string[];
  meetings?: string[];
}

export interface Journey {
  id: string;
  name: string;
  description: string;
  year: number;
  destinations: string[];
}

export const destinations: Destination[] = [
  {
    id: 'usa-1949',
    country: 'United States',
    city: 'Washington, D.C.',
    coordinates: [38.9072, -77.0369],
    startDate: '1949-11-16',
    endDate: '1949-12-10',
    category: 'diplomatic',
    summary: 'Official state visit to meet with President Harry Truman. Discussions focused on oil agreements and modernization assistance.',
    significance: 'First major diplomatic visit establishing strong US-Iran relations during the early Cold War period.',
    images: [
      'https://images.unsplash.com/photo-1601133560909-254f0c43b66f?w=800',
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800',
    ],
    meetings: ['President Harry S. Truman', 'Secretary of State Dean Acheson'],
  },
  {
    id: 'uk-1959',
    country: 'United Kingdom',
    city: 'London',
    coordinates: [51.5074, -0.1278],
    startDate: '1959-05-05',
    endDate: '1959-05-15',
    category: 'diplomatic',
    summary: 'State visit hosted by Queen Elizabeth II. Discussions on regional security and economic cooperation.',
    significance: 'Strengthened Anglo-Iranian relations and cultural exchange programs.',
    images: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
      'https://images.unsplash.com/photo-1543832923-44667a44c804?w=800',
    ],
    meetings: ['Queen Elizabeth II', 'Prime Minister Harold Macmillan'],
  },
  {
    id: 'france-1961',
    country: 'France',
    city: 'Paris',
    coordinates: [48.8566, 2.3522],
    startDate: '1961-10-10',
    endDate: '1961-10-18',
    category: 'diplomatic',
    summary: 'Official visit with President Charles de Gaulle focusing on trade agreements and cultural initiatives.',
    significance: 'Advanced French-Iranian economic partnerships and educational exchanges.',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
    ],
    meetings: ['President Charles de Gaulle', 'Foreign Minister Maurice Couve de Murville'],
  },
  {
    id: 'india-1956',
    country: 'India',
    city: 'New Delhi',
    coordinates: [28.6139, 77.2090],
    startDate: '1956-02-20',
    endDate: '1956-03-05',
    category: 'diplomatic',
    summary: 'State visit to strengthen ties with the Non-Aligned Movement leader. Cultural and economic discussions.',
    significance: 'Balanced Iran\'s foreign policy between Eastern and Western blocs.',
    images: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    ],
    meetings: ['Prime Minister Jawaharlal Nehru'],
  },
  {
    id: 'ussr-1965',
    country: 'Soviet Union',
    city: 'Moscow',
    coordinates: [55.7558, 37.6173],
    startDate: '1965-06-21',
    endDate: '1965-07-01',
    category: 'diplomatic',
    summary: 'Groundbreaking visit to improve relations with northern neighbor. Negotiated economic and border agreements.',
    significance: 'Demonstrated Iran\'s independent foreign policy and regional diplomacy.',
    images: [
      'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800',
      'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800',
    ],
    meetings: ['Premier Alexei Kosygin', 'Foreign Minister Andrei Gromyko'],
  },
  {
    id: 'germany-1967',
    country: 'West Germany',
    city: 'Bonn',
    coordinates: [50.7374, 7.0982],
    startDate: '1967-05-27',
    endDate: '1967-06-04',
    category: 'diplomatic',
    summary: 'State visit amid student protests. Focus on economic cooperation and industrial development.',
    significance: 'Highlighted challenges of modernization and political reform pressures.',
    images: [
      'https://images.unsplash.com/photo-1564594704827-f7f57ec90229?w=800',
      'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800',
    ],
    meetings: ['President Heinrich Lübke', 'Chancellor Kurt Georg Kiesinger'],
  },
  {
    id: 'japan-1958',
    country: 'Japan',
    city: 'Tokyo',
    coordinates: [35.6762, 139.6503],
    startDate: '1958-05-05',
    endDate: '1958-05-20',
    category: 'diplomatic',
    summary: 'Comprehensive visit to establish economic and cultural ties with Japan.',
    significance: 'Opened new markets for Iranian oil and initiated technology transfer agreements.',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800',
    ],
    meetings: ['Emperor Hirohito', 'Prime Minister Nobusuke Kishi'],
  },
  {
    id: 'egypt-1964',
    country: 'Egypt',
    city: 'Cairo',
    coordinates: [30.0444, 31.2357],
    startDate: '1964-04-10',
    endDate: '1964-04-18',
    category: 'diplomatic',
    summary: 'Visit to engage with Pan-Arab leadership and discuss regional stability.',
    significance: 'Complex diplomatic mission balancing Arab relations with Iranian interests.',
    images: [
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800',
      'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800',
    ],
    meetings: ['President Gamal Abdel Nasser'],
  },
  {
    id: 'italy-1969',
    country: 'Italy',
    city: 'Rome',
    coordinates: [41.9028, 12.4964],
    startDate: '1969-04-22',
    endDate: '1969-05-02',
    category: 'state-function',
    summary: 'State visit including audience with Pope Paul VI and cultural heritage tours.',
    significance: 'Celebrated ancient Persian-Roman connections and contemporary partnerships.',
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800',
    ],
    meetings: ['President Giuseppe Saragat', 'Pope Paul VI'],
  },
  {
    id: 'switzerland-1970',
    country: 'Switzerland',
    city: 'Geneva',
    coordinates: [46.2044, 6.1432],
    startDate: '1970-08-12',
    endDate: '1970-08-22',
    category: 'personal',
    summary: 'Private vacation combined with banking meetings and health consultations.',
    significance: 'Reflected personal diplomacy and financial management practices.',
    images: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
  },
  {
    id: 'canada-1959',
    country: 'Canada',
    city: 'Ottawa',
    coordinates: [45.4215, -75.6972],
    startDate: '1959-06-10',
    endDate: '1959-06-20',
    category: 'diplomatic',
    summary: 'State visit promoting trade relations and Iranian uranium exports to Canada.',
    significance: 'Established important economic ties with Commonwealth nations.',
    images: [
      'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800',
    ],
    meetings: ['Prime Minister John Diefenbaker'],
  },
  {
    id: 'austria-1963',
    country: 'Austria',
    city: 'Vienna',
    coordinates: [48.2082, 16.3738],
    startDate: '1963-09-15',
    endDate: '1963-09-25',
    category: 'state-function',
    summary: 'Official visit to neutral Austria, cultural events and opera attendance.',
    significance: 'Emphasized Iran\'s position as a bridge between East and West.',
    images: [
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800',
      'https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=800',
    ],
    meetings: ['President Adolf Schärf'],
  },
];

export const journeys: Journey[] = [
  {
    id: 'journey-1949',
    name: 'First Western Tour',
    description: 'Inaugural diplomatic mission to establish Iran as a key ally in the post-WWII order.',
    year: 1949,
    destinations: ['usa-1949'],
  },
  {
    id: 'journey-1956-58',
    name: 'Asian Outreach',
    description: 'Strategic visits to major Asian powers to diversify diplomatic and economic relationships.',
    year: 1956,
    destinations: ['india-1956', 'japan-1958'],
  },
  {
    id: 'journey-1959',
    name: 'Commonwealth Connection',
    description: 'Tour of Commonwealth nations to strengthen trade and diplomatic ties.',
    year: 1959,
    destinations: ['uk-1959', 'canada-1959'],
  },
  {
    id: 'journey-1961-67',
    name: 'European Engagements',
    description: 'Series of state visits to major European powers during the Cold War.',
    year: 1961,
    destinations: ['france-1961', 'austria-1963', 'egypt-1964', 'ussr-1965', 'germany-1967'],
  },
  {
    id: 'journey-1969-70',
    name: 'Cultural and Personal Diplomacy',
    description: 'Combining state functions with personal travel and cultural exchanges.',
    year: 1969,
    destinations: ['italy-1969', 'switzerland-1970'],
  },
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(dest => dest.id === id);
};

export const getDestinationsByYear = (year: number): Destination[] => {
  return destinations.filter(dest => {
    const destYear = new Date(dest.startDate).getFullYear();
    return destYear === year;
  });
};

export const getDestinationsByCategory = (category: string): Destination[] => {
  if (category === 'all') return destinations;
  return destinations.filter(dest => dest.category === category);
};

export const getYearRange = (): { min: number; max: number } => {
  const years = destinations.map(dest => new Date(dest.startDate).getFullYear());
  return {
    min: Math.min(...years),
    max: Math.max(...years),
  };
};
