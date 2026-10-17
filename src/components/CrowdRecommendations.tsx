import React from 'react';
import { 
  Destination, 
  TripFilters 
} from '../types';
import { getCrowdStyle, getBadgeColor, formatCrowdDataSource } from '../utils/crowdHelpers';
import { 
  Star, 
  Clock, 
  MapPin, 
  Plus, 
  Check, 
  Heart, 
  Sparkles, 
  Flame, 
  Hourglass,
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';

interface CrowdRecommendationsProps {
  destinations: Destination[];
  filters: TripFilters;
  onUpdateFilters: (newFilters: Partial<TripFilters>) => void;
  onSelectDestination: (dest: Destination) => void;
  onToggleSave: (destId: string) => void;
  savedPlaceIds: string[];
  onAddToItinerary: (dest: Destination) => void;
  itineraryDestIds: string[];
}

export const CrowdRecommendations: React.FC<CrowdRecommendationsProps> = ({
  destinations,
  filters,
  onUpdateFilters,
  onSelectDestination,
  onToggleSave,
  savedPlaceIds,
  onAddToItinerary,
  itineraryDestIds,
}) => {

  // AI Sorting and Ranking
  const rankedDestinations = React.useMemo(() => {
    return [...destinations].sort((a, b) => {
      // If user selected peaceful mode or max crowd low, prioritize low crowdScore
      if (filters.recommendationMode === 'peaceful' || filters.maxCrowd === 'low') {
        // Lower crowd score first, with rating as tie-breaker
        return a.crowdScore - b.crowdScore || b.rating - a.rating;
      }
      if (filters.recommendationMode === 'popular') {
        // High popularity rating and review count first
        return b.reviewCount - a.reviewCount;
      }
      // Balanced AI default: high rating with low crowd weighting
      const scoreA = a.rating * 20 - a.crowdScore * 0.4;
      const scoreB = b.rating * 20 - b.crowdScore * 0.4;
      return scoreB - scoreA;
    });
  }, [destinations, filters.recommendationMode, filters.maxCrowd]);

  return (
    <section className="mt-12">
      
      {/* Section Header with AI Mode Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4 text-teal-600 animate-pulse" />
            <span>AI Dynamic Recommendations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Recommended for You
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Ranked by AI algorithms cross-referencing expected crowd levels, best visit windows, and traveler ratings.
          </p>
        </div>

        {/* Toggle between Popular & Less Crowded Alternatives */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner self-start md:self-auto">
          <button
            onClick={() => onUpdateFilters({ recommendationMode: 'popular' })}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              filters.recommendationMode === 'popular'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Popular Places</span>
          </button>
          
          <button
            onClick={() => onUpdateFilters({ recommendationMode: 'peaceful' })}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              filters.recommendationMode === 'peaceful'
                ? 'bg-emerald-600 text-white shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5 text-emerald-200" />
            <span>Less Crowded Alternatives</span>
          </button>
        </div>
      </div>

      {/* AI Strategy Notice Banner */}
      {filters.recommendationMode === 'peaceful' && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 animate-in fade-in duration-200">
          <div className="flex items-center space-x-3">
            <span className="text-lg">🌿</span>
            <div>
              <span className="font-bold">Peaceful Explorer Mode Active:</span> AI is ranking tranquil sanctuaries and hidden gem alternatives with less than 35% crowd density.
            </div>
          </div>
          <button
            onClick={() => onUpdateFilters({ recommendationMode: 'all' })}
            className="text-emerald-700 hover:text-emerald-950 underline font-semibold shrink-0"
          >
            Show All Places
          </button>
        </div>
      )}

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rankedDestinations.map((dest) => {
          const crowdStyle = getCrowdStyle(dest.crowdLevel);
          const isSaved = savedPlaceIds.includes(dest.id);
          const isAdded = itineraryDestIds.includes(dest.id);
          const dataSourceInfo = formatCrowdDataSource(dest.crowdDataSource);

          return (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {dest.badge && (
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${getBadgeColor(dest.badge)}`}>
                        {dest.badge}
                      </span>
                    )}
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                      {dest.category.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Save Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(dest.id);
                    }}
                    className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md z-10 ${
                      isSaved
                        ? 'bg-red-500 text-white scale-110'
                        : 'bg-white/80 hover:bg-white text-slate-700 hover:text-red-500'
                    }`}
                    title={isSaved ? 'Remove from Saved' : 'Save Place'}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                  </button>

                  {/* Crowd Density Banner Bar (bottom of image) */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-3 pt-6 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${crowdStyle.dotColor} animate-pulse`} />
                      <span className="text-xs font-bold">{crowdStyle.label}</span>
                      <span className="text-[11px] text-slate-300">({dest.crowdScore}%)</span>
                    </div>
                    <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-slate-200">
                      {dataSourceInfo.label}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5">
                  
                  {/* Title & Rating */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 
                      onClick={() => onSelectDestination(dest)}
                      className="font-bold text-base text-slate-900 group-hover:text-teal-700 transition-colors cursor-pointer line-clamp-1"
                    >
                      {dest.name}
                    </h3>
                    <div className="flex items-center space-x-1 shrink-0 text-xs font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/80">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{dest.rating}</span>
                      <span className="text-[10px] text-slate-400">({dest.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3.5 leading-relaxed">
                    {dest.shortDescription}
                  </p>

                  {/* Travel Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 mb-4">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <div>
                        <div className="text-[10px] text-slate-400">Best Window</div>
                        <div className="font-semibold text-slate-800 truncate">{dest.bestTimeToVisit.split('or')[0]}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <Hourglass className="w-3.5 h-3.5 text-amber-600" />
                      <div>
                        <div className="text-[10px] text-slate-400">Wait Time</div>
                        <div className="font-semibold text-slate-800 truncate">{dest.estimatedWaitTime}</div>
                      </div>
                    </div>
                  </div>

                  {/* Distance & Duration Pills */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1" />
                      {dest.distanceKm} km from center
                    </span>
                    <span>Visit: {dest.estimatedDuration}</span>
                  </div>

                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 pb-5 pt-0 flex items-center space-x-2">
                <button
                  onClick={() => onSelectDestination(dest)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors text-center"
                >
                  View Details
                </button>

                <button
                  onClick={() => onAddToItinerary(dest)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-sm ${
                    isAdded
                      ? 'bg-teal-50 text-teal-700 border border-teal-300'
                      : 'bg-slate-900 hover:bg-teal-600 text-white'
                  }`}
                  title={isAdded ? 'Added to trip plan' : 'Add to trip plan'}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Trip</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
