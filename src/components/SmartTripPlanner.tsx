import React, { useState } from 'react';
import { 
  Destination, 
  ItineraryItem, 
  TripPlan, 
  CrowdLevel 
} from '../types';
import { getCrowdStyle } from '../utils/crowdHelpers';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  Navigation,
  Shuffle,
  ShieldCheck,
  PlusCircle,
  Share2,
  Download
} from 'lucide-react';

interface SmartTripPlannerProps {
  itinerary: ItineraryItem[];
  onRemoveItem: (id: string) => void;
  onAutoOptimizeRoute: () => void;
  onSwapAlternative: (itemId: string, newDest: Destination) => void;
  allDestinations: Destination[];
  onViewOnMap: (dest: Destination) => void;
  onClearItinerary: () => void;
}

export const SmartTripPlanner: React.FC<SmartTripPlannerProps> = ({
  itinerary,
  onRemoveItem,
  onAutoOptimizeRoute,
  onSwapAlternative,
  allDestinations,
  onViewOnMap,
  onClearItinerary,
}) => {
  const [tripName, setTripName] = useState('My Tranquil City Exploration');
  const [travelDate, setTravelDate] = useState('2026-10-18');
  const [pace, setPace] = useState<'relaxed' | 'balanced' | 'packed'>('relaxed');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Compute Crowd Comfort Score
  const averageCrowd = itinerary.length > 0
    ? Math.round(itinerary.reduce((sum, item) => sum + item.destination.crowdScore, 0) / itinerary.length)
    : 0;

  const comfortScore = Math.max(0, 100 - averageCrowd);

  // Total estimated hours
  const totalHours = itinerary.length * 2.2;
  const totalDistance = itinerary.reduce((sum, item) => sum + item.destination.distanceKm, 0).toFixed(1);

  // Check for overcrowded alerts
  const highCrowdItems = itinerary.filter((item) => 
    item.destination.crowdLevel === 'high' || item.destination.crowdLevel === 'very_high'
  );

  const handleShareTrip = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>AI Smart Trip Workspace</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Trip Itinerary & Route Optimizer
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Build your custom travel route with automatic time-slot scheduling to avoid rush hours and long queues.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onAutoOptimizeRoute}
            disabled={itinerary.length < 2}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md transition-all ${
              itinerary.length >= 2
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:shadow-teal-500/25 hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            title="Automatically reorders stops to visit each attraction at its calmest hour and minimize travel time"
          >
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>AI Auto-Optimize Route</span>
          </button>

          <button
            onClick={handleShareTrip}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {copiedNotification && (
        <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-800 font-semibold text-center animate-in fade-in">
          ✓ Trip link copied to clipboard!
        </div>
      )}

      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        
        {/* Comfort Score Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Crowd Comfort</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {comfortScore}%
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              {comfortScore >= 70 ? '🌿 Peaceful & Efficient' : '⚠️ Expect Peak Crowds'}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Attractions Count */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Stops Planned</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {itinerary.length} Places
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Across city regions
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg border border-teal-200">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        {/* Estimated Duration */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Est. Trip Duration</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {totalHours.toFixed(1)} hrs
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Including visits & transit
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-lg border border-sky-200">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Total Transit Distance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Total Transit</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
              ~{totalDistance} km
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Optimized travel loop
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-200">
            <Navigation className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* AI Overcrowd Alert & Alternative Substitution Banner */}
      {highCrowdItems.length > 0 && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm animate-in fade-in">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-900">
                AI Crowd Alert: {highCrowdItems.length} destination{highCrowdItems.length > 1 ? 's are' : ' is'} experiencing high crowds
              </h3>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                Visiting these spots during peak afternoon slots will lead to 40+ minute waits. We recommend either clicking <strong>AI Auto-Optimize Route</strong> to shift them to morning opening windows, or swapping with lower-crowd alternatives below:
              </p>

              {/* Quick Swap Alternatives List */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highCrowdItems.map((item) => {
                  const altId = item.destination.nearbyAlternatives[0];
                  const altDest = allDestinations.find((d) => d.id === altId);
                  if (!altDest) return null;

                  return (
                    <div 
                      key={item.id}
                      className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between shadow-sm"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-[11px] text-slate-500 truncate">
                          Swap <span className="font-bold text-red-600">{item.destination.name}</span> with:
                        </div>
                        <div className="text-xs font-bold text-slate-900 truncate">
                          🌿 {altDest.name} ({altDest.crowdScore}% Crowd)
                        </div>
                      </div>
                      <button
                        onClick={() => onSwapAlternative(item.id, altDest)}
                        className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] whitespace-nowrap transition-colors"
                      >
                        1-Click Swap
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {itinerary.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 border border-teal-200">
            <CalendarDays className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Your trip planner is empty
          </h3>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Discover destinations on the map or recommended feed, and click <strong>"Add to Trip"</strong> to organize your personalized itinerary with AI crowd forecasts.
          </p>
        </div>
      ) : (
        /* Timeline Itinerary Section */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
          
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Scheduled Daily Route
              </h3>
              <p className="text-xs text-slate-500">
                Sequenced for minimal travel time and optimal crowd conditions.
              </p>
            </div>
            <button
              onClick={onClearItinerary}
              className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors"
            >
              Clear All Stops
            </button>
          </div>

          {/* Timeline Items */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 before:w-0.5 before:bg-slate-200">
            {itinerary.map((item, index) => {
              const crowdStyle = getCrowdStyle(item.destination.crowdLevel);

              return (
                <div key={item.id} className="relative flex items-start space-x-4 sm:space-x-6 group">
                  
                  {/* Sequence Number Bullet */}
                  <div className="relative z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-[#0a192f] text-white flex items-center justify-center font-extrabold text-sm sm:text-base border-4 border-white shadow-md group-hover:scale-105 transition-transform shrink-0">
                    {index + 1}
                  </div>

                  {/* Card Container */}
                  <div className="flex-1 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-teal-400 p-4 sm:p-5 transition-all shadow-sm hover:shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      
                      {/* Time Slot & Badge */}
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-lg bg-teal-500/10 text-teal-800 font-bold text-xs flex items-center space-x-1.5 border border-teal-200">
                          <Clock className="w-3.5 h-3.5 text-teal-600" />
                          <span>{item.plannedStartTime} – {item.plannedEndTime}</span>
                        </span>

                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${crowdStyle.badgeBg}`}>
                          {crowdStyle.label} ({item.destination.crowdScore}%)
                        </span>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onViewOnMap(item.destination)}
                          className="text-xs font-bold text-slate-600 hover:text-teal-700 flex items-center space-x-1 transition-colors px-2 py-1 rounded hover:bg-slate-100"
                          title="Center on map"
                        >
                          <Navigation className="w-3 h-3 text-teal-600" />
                          <span>View on Map</span>
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                          title="Remove stop"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Destination Row */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.destination.image}
                        alt={item.destination.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                          {item.destination.name}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {item.destination.shortDescription}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-600">
                          <span>⏱️ Visit: {item.destination.estimatedDuration}</span>
                          <span>•</span>
                          <span>💵 {item.destination.entryFee}</span>
                          <span>•</span>
                          <span className="font-semibold text-teal-700">
                            Best time: {item.destination.bestTimeToVisit.split('or')[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
