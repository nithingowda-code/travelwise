export type CrowdLevel = 'low' | 'moderate' | 'high' | 'very_high';
export type DataStatus = 'Live' | 'Estimated' | 'Historical Climate Avg';

export type ActivityCategory = 
  | 'heritage'
  | 'nature'
  | 'spiritual'
  | 'trekking'
  | 'wildlife'
  | 'beaches'
  | 'food'
  | 'adventure';

export interface WeatherData {
  tempMin: number;
  tempMax: number;
  tempCurrent: number;
  condition: string;
  rainProb: number; // percentage (0-100)
  humidity: number; // percentage
  windKmh: number;
  sunrise: string;
  sunset: string;
  suitabilityScore: number; // 0-100 score
  source: string; // e.g. "IMD / Open-Meteo & NASA POWER"
  status: DataStatus;
  lastUpdated: string;
}

export interface MedicalEmergencyInfo {
  hospitalName: string;
  distanceKm: number;
  emergencyPhone: string;
  pharmacyName: string;
}

export interface ConnectivityInfo {
  mobileNetwork: '4G/5G (Jio & Airtel)' | 'BSNL Primary / Spotty Jio' | 'Zero Signal / Dead Zone';
  fuelPumpDistanceKm: number;
  atmAvailability: 'Abundant in Area' | 'Town Only (5-10 km)' | 'None - Carry Cash';
}

export interface StayOption {
  name: string;
  category: 'budget' | 'mid-range' | 'luxury';
  approxPriceINR: number;
  amenities: string;
  verifiedDate: string;
}

export interface DiningOption {
  name: string;
  type: string;
  costPerPersonINR: number;
  specialty: string;
  foodType: 'Pure Veg' | 'Veg & Non-Veg' | 'Local Delicacies' | 'Jain Available';
}

export interface YatraDestination {
  id: string;
  name: string;
  hindiName: string;
  stateId: string;
  stateName: string;
  cityOrDistrict: string;
  category: ActivityCategory;
  isOffbeat: boolean; // 60% famous vs 40% offbeat classification
  coordinates: [number, number]; // [lat, lng]
  image: string;
  imageCredit: string;
  crowdLevel: CrowdLevel;
  crowdScore: number; // 0 - 100
  bestTimeOfDay: string;
  bestTimeReason: string;
  openingHours: string;
  entryFeeINR: number;
  foreignFeeINR?: number;
  permitRequired?: string;
  seasonalAccess: string;
  safetyNote?: string;
  weather: WeatherData;
  badWeatherAlternative?: {
    name: string;
    description: string;
    type: 'museum' | 'cafe' | 'temple' | 'indoor_market' | 'cultural_center';
  };
  nearbyMedical: MedicalEmergencyInfo;
  connectivity: ConnectivityInfo;
  stays: {
    budget: StayOption;
    midRange: StayOption;
    luxury: StayOption;
  };
  dining: DiningOption[];
  shortDescription: string;
  fullDescription: string;
  tags: string[];
}

export interface GroupDetails {
  adults: number;
  children: number;
  childrenAges?: string;
  seniors: number;
  mobilityNeeds: boolean;
  mobilityDetails?: string;
}

export interface TripWizardPreferences {
  startCity: string;
  destinationStateIds: string[]; // State IDs or ['surprise']
  startDate: string;
  daysCount: number;
  group: GroupDetails;
  totalBudgetINR: number;
  budgetStyle: 'budget' | 'mid-range' | 'luxury';
  transportMode: 'own_car' | 'rented_car' | 'rented_bike' | 'train' | 'bus' | 'flight' | 'mixed';
  interests: ActivityCategory[];
  crowdPreference: 'avoid_crowds' | 'dont_mind';
  famousRatio: number; // default 60 (for 60% famous, 40% offbeat)
  mustVisitText: string;
  avoidPlacesText: string;
  foodPreference: 'all' | 'veg' | 'jain' | 'halal' | 'vegan';
  healthIssuesText: string;
  comfortRemote: 'comfortable' | 'moderate' | 'cautious';
}

export interface ItineraryTimeSlot {
  timeSlot: 'Morning (07:30 - 11:30 AM)' | 'Afternoon (12:30 - 04:00 PM)' | 'Evening (04:30 - 08:30 PM)';
  destination: YatraDestination;
  scheduledActivity: string;
  crowdStatus: CrowdLevel;
  isOffbeat: boolean;
  weatherSuitability: number;
  isWeatherSwapped?: boolean;
  originalActivityIfSwapped?: string;
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  dayTitle: string;
  stateName: string;
  slots: ItineraryTimeSlot[];
  lunchBreak: {
    restaurant: DiningOption;
    location: string;
    timing: string;
  };
  dinnerBreak: {
    restaurant: DiningOption;
    location: string;
    timing: string;
  };
  weather: WeatherData;
  travelRoute: {
    from: string;
    to: string;
    distanceKm: number;
    estimatedDrivingHours: number;
    roadCondition: string;
  };
  planB_WeatherDisruption: string;
  planC_BreakdownOrClosure: string;
  medicalEmergency: MedicalEmergencyInfo;
  networkConnectivity: ConnectivityInfo;
  selectedStay: StayOption;
}

export interface BudgetLineItem {
  category: 'Transport' | 'Accommodation' | 'Meals & Dining' | 'Sightseeing & Permits' | 'Contingency Buffer';
  title: string;
  details: string;
  amountINR: number;
  verifiedDate: string;
  dataStatus: DataStatus;
}

export interface BudgetBreakdown {
  items: BudgetLineItem[];
  subtotalINR: number;
  emergencyBufferINR: number; // 10-15%
  totalEstimatedINR: number;
  userBudgetINR: number;
  costPerPersonINR: number;
  isOverBudget: boolean;
  savingsRecommendations: string[];
}

export interface GeneratedYatraPlan {
  id: string;
  title: string;
  routeSummary: string;
  totalDays: number;
  startDate: string;
  endDate: string;
  fitScore: number; // e.g. 96%
  famousPercentage: number;
  offbeatPercentage: number;
  preferences: TripWizardPreferences;
  days: DayItinerary[];
  budget: BudgetBreakdown;
  permitsRequired: { name: string; authority: string; howToApply: string; feeINR: number }[];
  packingList: string[];
  offlineChecklist: string[];
  createdAt: string;
}
