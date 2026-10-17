export type CrowdLevel = 'low' | 'moderate' | 'high' | 'very_high';

export type CrowdDataSource = 'live' | 'historical_avg' | 'ai_forecast' | 'demo_estimate';

export type DestinationCategory = 
  | 'all'
  | 'historical'
  | 'beach'
  | 'hill_station'
  | 'museum'
  | 'restaurant'
  | 'park'
  | 'adventure';

export interface HourlyForecast {
  hour: string;
  crowdPercent: number;
  label: string;
  isPeak?: boolean;
  isCurrent?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  crowdExperience: 'Breezy & Empty' | 'Manageable' | 'Very Busy' | 'Packed';
}

export interface Destination {
  id: string;
  name: string;
  city: string;
  region: string;
  country: string;
  category: Exclude<DestinationCategory, 'all'>;
  coordinates: [number, number]; // [lat, lng]
  image: string;
  distanceKm: number;
  estimatedDuration: string;
  crowdLevel: CrowdLevel;
  crowdScore: number; // 0 to 100
  crowdDataSource: CrowdDataSource;
  liveVisitorCount?: number;
  capacityPercentage: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  fullDescription: string;
  bestTimeToVisit: string;
  estimatedWaitTime: string;
  openingHours: string;
  entryFee: string;
  badge?: 'Quiet Escape' | 'Best Time to Visit' | 'Crowd Alert' | 'Trending' | 'Hidden Gem';
  hourlyCrowdForecast: HourlyForecast[];
  weather: {
    temp: number;
    condition: string;
    icon: string;
  };
  nearbyAlternatives: string[]; // IDs of recommended alternative destinations
  tags: string[];
  reviews: Review[];
}

export interface TripFilters {
  city: string;
  category: DestinationCategory;
  date: string;
  travelTime: 'morning' | 'afternoon' | 'evening' | 'any';
  budget: 'budget' | 'moderate' | 'luxury' | 'any';
  travelType: 'solo' | 'couple' | 'family' | 'friends';
  maxCrowd: 'any' | 'low' | 'moderate' | 'high';
  searchQuery: string;
  recommendationMode: 'all' | 'popular' | 'peaceful';
}

export interface ItineraryItem {
  id: string;
  destinationId: string;
  destination: Destination;
  plannedStartTime: string;
  plannedEndTime: string;
  notes?: string;
  predictedCrowdLevel: CrowdLevel;
  predictedCrowdPercent: number;
  crowdAlert?: string;
  suggestedAlternativeId?: string;
}

export interface TripPlan {
  id: string;
  name: string;
  city: string;
  startDate: string;
  endDate: string;
  travelStyle: string;
  budget: string;
  items: ItineraryItem[];
  totalDistanceKm: number;
  totalDurationHours: number;
  crowdComfortScore: number; // e.g. 88% peaceful
}
