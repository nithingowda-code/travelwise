import React from 'react';
import { 
  Destination, 
  CrowdLevel 
} from '../types';
import { getCrowdStyle, getBadgeColor, formatCrowdDataSource } from '../utils/crowdHelpers';
import { 
  X, 
  Star, 
  Clock, 
  MapPin, 
  Navigation, 
  Heart, 
  Plus, 
  Check, 
  DollarSign, 
  Calendar, 
  Info, 
  TrendingUp, 
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sun,
  CloudSun
} from 'lucide-react';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  allDestinations: Destination[];
  onSelectAlternative: (dest: Destination) => void;
  onToggleSave: (destId: string) => void;
  isSaved: boolean;
  onAddToItinerary: (dest: Destination) => void;
  isAddedToItinerary: boolean;
  onOpenDirections: (dest: Destination) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  allDestinations,
  onSelectAlternative,
  onToggleSave,
  isSaved,
  onAddToItinerary,
  isAddedToItinerary,
  onOpenDirections,
}) => {
  if (!destination) return null;

  const crowdStyle = getCrowdStyle(destination.crowdLevel);
  const dataSource = formatCrowdDataSource(destination.crowdDataSource);

  // Find linked lower-crowd alternatives
  const alternatives = allDestinations.filter((d) => 
    destination.nearbyAlternatives.includes(d.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Modal Dialog */}
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Hero Image Header */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Save Heart Button */}
          <button
            onClick={() => onToggleSave(destination.id)}
            className={`absolute top-4 right-16 p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved ? 'bg-red-500 text-white' : 'bg-slate-900/70 text-white hover:text-red-400'
            }`}
            title="Save Destination"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
          </button>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {destination.badge && (
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${getBadgeColor(destination.badge)}`}>
                {destination.badge}
              </span>
            )}
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
              {destination.category.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {/* Hero Bottom Details */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center space-x-2 text-xs text-teal-300 font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{destination.city.toUpperCase()} • {destination.region}, {destination.country}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {destination.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 max-h-[calc(85vh-20rem)] overflow-y-auto space-y-6">
          
          {/* Real-time Crowd Status Bar & Demo Notice */}
          <div className={`p-4 rounded-2xl border ${crowdStyle.bgColor} ${crowdStyle.borderColor}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${crowdStyle.dotColor} animate-pulse`} />
                <span className={`text-sm font-bold ${crowdStyle.textColor}`}>
                  Current Status: {crowdStyle.label} ({destination.crowdScore}% Capacity)
                </span>
              </div>

              {/* Data Source Notice */}
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 bg-white/80 px-2.5 py-1 rounded-full border border-slate-200">
                <Info className="w-3 h-3 text-teal-600" />
                <span className="font-semibold text-teal-800">{dataSource.label}</span>
                <span>• {dataSource.tooltip}</span>
              </div>
            </div>

            {/* Visual Crowd Meter Bar */}
            <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${destination.crowdScore}%`,
                  backgroundColor: crowdStyle.hex 
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
              <span>0% Empty</span>
              <span>50% Balanced</span>
              <span>100% Extreme Congestion</span>
            </div>
          </div>

          {/* Hourly Crowd Density Forecast Chart */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Expected Hourly Crowd Density
                </h4>
              </div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                Best Window: {destination.bestTimeToVisit.split('or')[0]}
              </span>
            </div>

            {/* Hourly Bars */}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 items-end h-32 pt-4">
              {destination.hourlyCrowdForecast.map((item, idx) => {
                const isVeryHigh = item.crowdPercent >= 85;
                const isHigh = item.crowdPercent >= 65 && item.crowdPercent < 85;
                const isModerate = item.crowdPercent >= 35 && item.crowdPercent < 65;
                const barColor = isVeryHigh ? '#ef4444' : isHigh ? '#f97316' : isModerate ? '#f59e0b' : '#10b981';

                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group/bar">
                    <span className="text-[10px] font-bold text-slate-500 group-hover/bar:text-slate-900 transition-colors mb-1">
                      {item.crowdPercent}%
                    </span>
                    <div className="w-full bg-slate-200/80 rounded-t-lg overflow-hidden flex flex-col justify-end h-20">
                      <div
                        className="w-full rounded-t-lg transition-all duration-300"
                        style={{
                          height: `${item.crowdPercent}%`,
                          backgroundColor: barColor,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600 mt-1">
                      {item.hour}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              About this destination
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {destination.fullDescription}
            </p>
          </div>

          {/* Logistics & Practical Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
              <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Opening Hours</div>
                <div className="text-slate-500">{destination.openingHours}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
              <DollarSign className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Entry Fees</div>
                <div className="text-slate-500">{destination.entryFee}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
              <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Current Weather</div>
                <div className="text-slate-500">{destination.weather.temp}°C • {destination.weather.condition}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Estimated Duration</div>
                <div className="text-slate-500">{destination.estimatedDuration} • {destination.distanceKm} km from center</div>
              </div>
            </div>
          </div>

          {/* Nearby Lower-Crowd Alternatives */}
          {alternatives.length > 0 && (
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>AI Recommended Low-Crowd Alternatives</span>
              </div>
              <p className="text-xs text-emerald-700 mb-3">
                Love the vibe but want fewer queues? Consider these nearby alternatives with significantly lower crowds:
              </p>

              <div className="space-y-2">
                {alternatives.map((alt) => (
                  <div
                    key={alt.id}
                    className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={alt.image}
                        alt={alt.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{alt.name}</div>
                        <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
                          <TrendingDown className="w-3 h-3" />
                          <span>{alt.crowdScore}% Crowd ({getCrowdStyle(alt.crowdLevel).label})</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectAlternative(alt)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                    >
                      View Alternative
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Traveler Reviews with Crowd Feedback */}
          {destination.reviews && destination.reviews.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Traveler Crowd Insights
              </h4>
              <div className="space-y-2.5">
                {destination.reviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-semibold text-slate-900">{rev.author}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold text-[10px]">
                        {rev.crowdExperience}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onOpenDirections(destination)}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <Navigation className="w-4 h-4 text-teal-600" />
            <span>Get Directions</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleSave(destination.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center space-x-1.5 ${
                isSaved
                  ? 'border-red-300 text-red-600 bg-red-50'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-600 text-red-600' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Place'}</span>
            </button>

            <button
              onClick={() => onAddToItinerary(destination)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md ${
                isAddedToItinerary
                  ? 'bg-teal-50 text-teal-800 border border-teal-300'
                  : 'bg-slate-900 hover:bg-teal-600 text-white'
              }`}
            >
              {isAddedToItinerary ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>In Trip Plan</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Trip</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
