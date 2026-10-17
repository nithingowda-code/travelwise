import React, { useState, useMemo } from 'react';
import { 
  Destination, 
  DestinationCategory, 
  TripFilters, 
  ItineraryItem 
} from './types';
import { CITIES, INITIAL_DESTINATIONS } from './data/destinations';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveMap } from './components/InteractiveMap';
import { CrowdRecommendations } from './components/CrowdRecommendations';
import { DestinationModal } from './components/DestinationModal';
import { SmartTripPlanner } from './components/SmartTripPlanner';
import { SavedPlacesModal } from './components/SavedPlacesModal';
import { DirectionsModal } from './components/DirectionsModal';
import { MyTripsModal } from './components/MyTripsModal';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Heart, 
  Layers, 
  CalendarDays,
  Flame,
  ArrowUpRight
} from 'lucide-react';

export function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'explore' | 'planner' | 'saved' | 'trips'>('explore');
  const [selectedCity, setSelectedCity] = useState<string>('bengaluru');
  
  // Modals state
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [directionsDestination, setDirectionsDestination] = useState<Destination | null>(null);
  const [showSavedModal, setShowSavedModal] = useState<boolean>(false);
  const [showTripsModal, setShowTripsModal] = useState<boolean>(false);

  // Filter state
  const [filters, setFilters] = useState<TripFilters>({
    city: 'bengaluru',
    category: 'all',
    date: new Date().toISOString().split('T')[0],
    travelTime: 'any',
    budget: 'any',
    travelType: 'couple',
    maxCrowd: 'any',
    searchQuery: '',
    recommendationMode: 'all',
  });

  // Saved / Wishlist Destinations state (preloaded with tranquil spots)
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>(['national-gallery-modern-art', 'sankey-tank']);

  // Itinerary items (preloaded with an initial route)
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    {
      id: 'it-1',
      destinationId: 'national-gallery-modern-art',
      destination: INITIAL_DESTINATIONS.find((d) => d.id === 'national-gallery-modern-art') || INITIAL_DESTINATIONS[0],
      plannedStartTime: '09:00 AM',
      plannedEndTime: '10:30 AM',
      predictedCrowdLevel: 'low',
      predictedCrowdPercent: 22,
    },
    {
      id: 'it-2',
      destinationId: 'bangalore-palace',
      destination: INITIAL_DESTINATIONS.find((d) => d.id === 'bangalore-palace') || INITIAL_DESTINATIONS[0],
      plannedStartTime: '11:15 AM',
      plannedEndTime: '01:45 PM',
      predictedCrowdLevel: 'high',
      predictedCrowdPercent: 78,
      crowdAlert: 'Peak crowd congestion expected',
    },
    {
      id: 'it-3',
      destinationId: 'sankey-tank',
      destination: INITIAL_DESTINATIONS.find((d) => d.id === 'sankey-tank') || INITIAL_DESTINATIONS[0],
      plannedStartTime: '03:30 PM',
      plannedEndTime: '05:00 PM',
      predictedCrowdLevel: 'low',
      predictedCrowdPercent: 24,
    },
  ]);


  // Current City Object
  const currentCityObj = useMemo(() => {
    return CITIES.find((c) => c.id === selectedCity) || CITIES[0];
  }, [selectedCity]);

  // Handle City Change
  const handleSelectCity = (cityId: string) => {
    setSelectedCity(cityId);
    setFilters((prev) => ({ ...prev, city: cityId, searchQuery: '', category: 'all' }));
  };

  // Filtered Destinations for the current city & user filters
  const filteredDestinations = useMemo(() => {
    return INITIAL_DESTINATIONS.filter((dest) => {
      // 1. City match
      if (dest.city !== selectedCity) return false;

      // 2. Category match
      if (filters.category !== 'all' && dest.category !== filters.category) {
        return false;
      }

      // 3. Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(query);
        const matchesShort = dest.shortDescription.toLowerCase().includes(query);
        const matchesCategory = dest.category.toLowerCase().includes(query);
        const matchesTags = dest.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesShort && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      // 4. Max crowd filter
      if (filters.maxCrowd === 'low' && dest.crowdLevel !== 'low') {
        return false;
      }
      if (filters.maxCrowd === 'moderate' && (dest.crowdLevel === 'high' || dest.crowdLevel === 'very_high')) {
        return false;
      }

      // 5. Peaceful recommendation mode
      if (filters.recommendationMode === 'peaceful' && (dest.crowdLevel === 'high' || dest.crowdLevel === 'very_high')) {
        return false;
      }

      return true;
    });
  }, [selectedCity, filters]);

  // Toggle Save Place
  const handleToggleSave = (destId: string) => {
    setSavedPlaceIds((prev) =>
      prev.includes(destId) ? prev.filter((id) => id !== destId) : [...prev, destId]
    );
  };

  // Add Destination to Itinerary
  const handleAddToItinerary = (dest: Destination) => {
    if (itinerary.some((item) => item.destination.id === dest.id)) {
      // Remove if already in
      setItinerary((prev) => prev.filter((item) => item.destination.id !== dest.id));
      return;
    }

    const nextIndex = itinerary.length;
    const baseHour = 9 + nextIndex * 2;
    const startStr = `${baseHour < 10 ? '0' : ''}${baseHour > 12 ? baseHour - 12 : baseHour}:00 ${baseHour >= 12 ? 'PM' : 'AM'}`;
    const endStr = `${baseHour + 1 < 10 ? '0' : ''}${baseHour + 1 > 12 ? baseHour + 1 - 12 : baseHour + 1}:30 ${baseHour + 1 >= 12 ? 'PM' : 'AM'}`;

    const newItem: ItineraryItem = {
      id: `it-${Date.now()}`,
      destinationId: dest.id,
      destination: dest,
      plannedStartTime: startStr,
      plannedEndTime: endStr,
      predictedCrowdLevel: dest.crowdLevel,
      predictedCrowdPercent: dest.crowdScore,
    };

    setItinerary((prev) => [...prev, newItem]);
  };

  // Remove Item from Itinerary
  const handleRemoveItineraryItem = (id: string) => {
    setItinerary((prev) => prev.filter((item) => item.id !== id));
  };

  // 1-Click Swap Alternative
  const handleSwapAlternative = (itemId: string, newDest: Destination) => {
    setItinerary((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            destinationId: newDest.id,
            destination: newDest,
            predictedCrowdLevel: newDest.crowdLevel,
            predictedCrowdPercent: newDest.crowdScore,
            crowdAlert: undefined,
          };
        }
        return item;
      })
    );
  };

  // AI Auto-Optimize Route & Schedule
  const handleAutoOptimizeRoute = () => {
    if (itinerary.length < 2) return;

    // AI logic: Sort so lowest crowd locations occupy mid-day peak hours (11am-2pm),
    // and iconic spots get scheduled in early morning slots (8am-10am) where crowd is lowest!
    const sorted = [...itinerary].sort((a, b) => {
      // Put destinations with huge afternoon peaks first in the morning!
      const aPeak = a.destination.crowdScore;
      const bPeak = b.destination.crowdScore;
      return bPeak - aPeak;
    });

    // Reassign optimal time slots
    const optimized = sorted.map((item, idx) => {
      const times = [
        { start: '08:30 AM', end: '10:30 AM' },
        { start: '11:00 AM', end: '01:00 PM' },
        { start: '01:45 PM', end: '03:45 PM' },
        { start: '04:15 PM', end: '06:00 PM' },
        { start: '06:30 PM', end: '08:00 PM' },
      ];
      const slot = times[idx % times.length];
      return {
        ...item,
        plannedStartTime: slot.start,
        plannedEndTime: slot.end,
        crowdAlert: undefined,
      };
    });

    setItinerary(optimized);
  };

  // Saved destinations full objects
  const savedDestinationsList = useMemo(() => {
    return INITIAL_DESTINATIONS.filter((d) => savedPlaceIds.includes(d.id));
  }, [savedPlaceIds]);

  // Handle Tab Switch
  const handleNavTab = (tab: 'explore' | 'planner' | 'saved' | 'trips') => {
    if (tab === 'saved') {
      setShowSavedModal(true);
      return;
    }
    if (tab === 'trips') {
      setShowTripsModal(true);
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavTab}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        savedCount={savedPlaceIds.length}
        itineraryCount={itinerary.length}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'explore' ? (
          <>
            {/* Hero Section */}
            <HeroSection
              filters={filters}
              onUpdateFilters={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
              onResetFilters={() =>
                setFilters({
                  city: selectedCity,
                  category: 'all',
                  date: new Date().toISOString().split('T')[0],
                  travelTime: 'any',
                  budget: 'any',
                  travelType: 'couple',
                  maxCrowd: 'any',
                  searchQuery: '',
                  recommendationMode: 'all',
                })
              }
              destinationCount={filteredDestinations.length}
              lowCrowdCount={filteredDestinations.filter((d) => d.crowdLevel === 'low').length}
            />

            {/* Map & Recommendations Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20 pb-20">
              
              {/* Interactive Central Map */}
              <div className="mb-4">
                <InteractiveMap
                  destinations={filteredDestinations}
                  selectedDestination={selectedDestination}
                  onSelectDestination={(dest) => setSelectedDestination(dest)}
                  activeCategory={filters.category}
                  onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
                  cityCenter={currentCityObj.center}
                  zoom={currentCityObj.zoom}
                  itinerary={itinerary}
                  onOpenDirections={(dest) => setDirectionsDestination(dest)}
                />
              </div>

              {/* AI Crowd-Based Recommendations Grid */}
              <CrowdRecommendations
                destinations={filteredDestinations}
                filters={filters}
                onUpdateFilters={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
                onSelectDestination={(dest) => setSelectedDestination(dest)}
                onToggleSave={handleToggleSave}
                savedPlaceIds={savedPlaceIds}
                onAddToItinerary={handleAddToItinerary}
                itineraryDestIds={itinerary.map((i) => i.destination.id)}
              />

            </div>
          </>
        ) : (
          /* Smart Trip Planner Workspace View */
          <SmartTripPlanner
            itinerary={itinerary}
            onRemoveItem={handleRemoveItineraryItem}
            onAutoOptimizeRoute={handleAutoOptimizeRoute}
            onSwapAlternative={handleSwapAlternative}
            allDestinations={INITIAL_DESTINATIONS}
            onViewOnMap={(dest) => {
              setSelectedDestination(dest);
              setActiveTab('explore');
            }}
            onClearItinerary={() => setItinerary([])}
          />
        )}
      </main>

      {/* Destination Details Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          allDestinations={INITIAL_DESTINATIONS}
          onSelectAlternative={(alt) => setSelectedDestination(alt)}
          onToggleSave={handleToggleSave}
          isSaved={savedPlaceIds.includes(selectedDestination.id)}
          onAddToItinerary={handleAddToItinerary}
          isAddedToItinerary={itinerary.some((i) => i.destination.id === selectedDestination.id)}
          onOpenDirections={(dest) => setDirectionsDestination(dest)}
        />
      )}

      {/* Directions Modal */}
      {directionsDestination && (
        <DirectionsModal
          destination={directionsDestination}
          onClose={() => setDirectionsDestination(null)}
        />
      )}

      {/* Saved Places Modal */}
      {showSavedModal && (
        <SavedPlacesModal
          savedDestinations={savedDestinationsList}
          onClose={() => setShowSavedModal(false)}
          onRemoveSave={handleToggleSave}
          onSelectDestination={(dest) => {
            setShowSavedModal(false);
            setSelectedDestination(dest);
          }}
          onAddToItinerary={handleAddToItinerary}
          itineraryDestIds={itinerary.map((i) => i.destination.id)}
        />
      )}

      {/* My Trips Modal */}
      {showTripsModal && (
        <MyTripsModal
          onClose={() => setShowTripsModal(false)}
          itinerary={itinerary}
          cityName={currentCityObj.name}
          onOpenPlanner={() => {
            setShowTripsModal(false);
            setActiveTab('planner');
          }}
          onViewDestination={(dest) => {
            setShowTripsModal(false);
            setSelectedDestination(dest);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-[#0a192f] text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              TW
            </div>
            <div>
              <div className="font-bold text-white text-sm">TRAVELWISE — AI Smart Tourism Planner</div>
              <div className="text-[11px] text-slate-400">Next-generation crowd intelligence and dynamic route planning</div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
              Live Density Feed Active
            </span>
            <span>Privacy & Ethics</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
