import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredDestinations: any[];
  filteredServices: any[];
  filteredOffers: any[];
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // All destinations data
  const allDestinations = [
    { name: "Turkey", description: "Historic Istanbul" },
    { name: "UAE (Dubai)", description: "Modern Dubai" },
    { name: "Egypt", description: "Ancient Pyramids" },
    { name: "France", description: "Romantic Paris" },
    { name: "Italy", description: "Historic Rome" },
    { name: "Maldives", description: "Tropical Paradise" },
    { name: "Saudi Arabia", description: "Sacred Mecca" },
  ];

  // All services data
  const allServices = [
    {
      title: "Flight Booking",
      description: "Book flights to destinations worldwide with competitive prices and flexible options.",
      features: ["International & domestic flights", "Best fare guarantee", "Easy cancellation & rescheduling", "24/7 customer support"],
    },
    {
      title: "Hotel Reservations",
      description: "Find and book the perfect accommodation for your trip.",
      features: ["Wide range of accommodations", "Best price guarantee", "Verified reviews & ratings", "Special group rates"],
    },
    {
      title: "Tour Packages",
      description: "Explore our carefully curated tour packages that include flights, hotels, tours, and activities.",
      features: ["All-inclusive packages", "Customizable itineraries", "Expert local guides", "Group & private tours"],
    },
    {
      title: "Visa Assistance",
      description: "Get expert help with visa applications and documentation.",
      features: ["Visa consultation", "Document preparation", "Application tracking", "Multiple country support"],
    },
    {
      title: "Travel Planning",
      description: "Let our experienced travel consultants help you plan the perfect trip.",
      features: ["Personalized itineraries", "Budget planning", "Activity recommendations", "Travel insurance options"],
    },
  ];

  // All offers data
  const allOffers = [
    {
      id: "istanbul",
      title: "Istanbul Package",
      country: "Turkey",
      location: "Istanbul",
      price: 750,
      duration: "5 Days / 4 Nights",
      includes: ["Hotel accommodation with breakfast", "Airport transfers", "Guided tours"],
      highlights: ["Historic landmarks", "Cultural experiences", "Turkish cuisine"],
    },
    {
      id: "aqaba",
      title: "Aqaba Beach Trip",
      country: "Jordan",
      location: "Aqaba",
      price: 400,
      duration: "4 Days / 3 Nights",
      includes: ["Beachfront hotel stay", "Sea activities", "Internal transportation"],
      highlights: ["Crystal clear waters", "Coral reefs", "Water sports"],
    },
    {
      id: "sharm",
      title: "Sharm El Sheikh Luxury Package",
      country: "Egypt",
      location: "Sharm El Sheikh",
      price: 900,
      duration: "5 Days / 4 Nights",
      includes: ["5-star all-inclusive resort", "Unlimited meals", "Water sports"],
      highlights: ["Luxury resort", "Red Sea diving", "Entertainment"],
    },
  ];

  // Filter function
  const filterItems = (items: any[], query: string) => {
    if (!query.trim()) return items;

    const lowerQuery = query.toLowerCase();
    return items.filter(item => {
      // Search in title/name
      if (item.title?.toLowerCase().includes(lowerQuery) ||
          item.name?.toLowerCase().includes(lowerQuery)) {
        return true;
      }

      // Search in description
      if (item.description?.toLowerCase().includes(lowerQuery)) {
        return true;
      }

      // Search in country/location
      if (item.country?.toLowerCase().includes(lowerQuery) ||
          item.location?.toLowerCase().includes(lowerQuery)) {
        return true;
      }

      // Search in features/includes/highlights arrays
      const arraysToSearch = [item.features, item.includes, item.highlights];
      for (const arr of arraysToSearch) {
        if (Array.isArray(arr)) {
          if (arr.some(feature => feature.toLowerCase().includes(lowerQuery))) {
            return true;
          }
        }
      }

      return false;
    });
  };

  const filteredDestinations = filterItems(allDestinations, searchQuery);
  const filteredServices = filterItems(allServices, searchQuery);
  const filteredOffers = filterItems(allOffers, searchQuery);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      filteredDestinations,
      filteredServices,
      filteredOffers,
      isSearching,
    }}>
      {children}
    </SearchContext.Provider>
  );
};