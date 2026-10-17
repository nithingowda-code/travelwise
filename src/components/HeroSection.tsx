import React from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Sparkles,
  SlidersHorizontal,
  X,
  Compass,
  ArrowRight
} from 'lucide-react';
import { TripFilters } from '../types';

interface HeroSectionProps {
  filters: TripFilters;
  onUpdateFilters: (newFilters: Partial<TripFilters>) => void;
  onResetFilters: () => void;
  destinationCount: number;
  lowCrowdCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  destinationCount,
  lowCrowdCount,
}) => {
  const [showExtendedFilters, setShowExtendedFilters] = React.useState(false);

  return (
    <section className="relative bg-gradient-to-b from-[#0a192f] via-[#0f2444] to-[#f8fafc] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Feature Pill */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold backdrop-blur-sm shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
            <span>AI Crowd Intelligence & Smart Routing</span>
            <span className="w-1 h-1 rounded-full bg-teal-400" />
            <span className="text-teal-200/80">{lowCrowdCount} quiet escapes detected today</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Explore More. <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">Wait Less.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            TRAVELWISE harnesses real-time crowd sensor data and historical density models to recommend magnificent destinations at their calmest hours. Skip tourist bottlenecks and experience iconic travel without the endless queues.
          </p>
        </div>

        {/* Main Search & Quick Filter Card */}
        <div className="bg-white/95 text-slate-900 rounded-2xl shadow-2xl p-4 sm:p-6 backdrop-blur-xl border border-white/20 transition-all">
          
          {/* Top Search Bar Row */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by city, temple, beach, museum, or landmark..."
                value={filters.searchQuery}
                onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
                className="w-full pl-11 pr-10 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm transition-all shadow-sm"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => onUpdateFilters({ searchQuery: '' })}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Travel Time Filter */}
            <div className="w-full md:w-48 relative">
              <div className="flex items-center space-x-2 pl-3 pr-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <select
                  value={filters.travelTime}
                  onChange={(e) => onUpdateFilters({ travelTime: e.target.value as any })}
                  className="bg-transparent w-full font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="any">Time: Anytime</option>
                  <option value="morning">Morning (Quiet)</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Sunset / Evening</option>
                </select>
              </div>
            </div>

            {/* Max Crowd Density Filter */}
            <div className="w-full md:w-56 relative">
              <div className="flex items-center space-x-2 pl-3 pr-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <select
                  value={filters.maxCrowd}
                  onChange={(e) => onUpdateFilters({ maxCrowd: e.target.value as any })}
                  className="bg-transparent w-full font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="any">Crowd: Any Density</option>
                  <option value="low">🌿 Low Crowd Only (&lt;30%)</option>
                  <option value="moderate">⚖️ Moderate or Less (&lt;65%)</option>
                  <option value="high">🔥 Include High Crowd</option>
                </select>
              </div>
            </div>

            {/* Toggle Extended Filters Button */}
            <button
              onClick={() => setShowExtendedFilters(!showExtendedFilters)}
              className={`p-3.5 rounded-xl border flex items-center justify-center space-x-2 text-xs font-semibold transition-all ${
                showExtendedFilters 
                  ? 'bg-teal-600 text-white border-teal-600' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="More Trip Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Extended Filters Panel (Collapsible) */}
          {showExtendedFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
              
              {/* Date Selector */}
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                  Trip Date
                </label>
                <div className="flex items-center space-x-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => onUpdateFilters({ date: e.target.value })}
                    className="bg-transparent w-full text-slate-800 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                  Budget Preference
                </label>
                <div className="flex items-center space-x-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <DollarSign className="w-4 h-4 text-slate-500" />
                  <select
                    value={filters.budget}
                    onChange={(e) => onUpdateFilters({ budget: e.target.value as any })}
                    className="bg-transparent w-full text-slate-800 outline-none font-medium"
                  >
                    <option value="any">Any Budget</option>
                    <option value="budget">Free & Budget Friendly</option>
                    <option value="moderate">Moderate ($10 - $25)</option>
                    <option value="luxury">Premium / VIP Pass</option>
                  </select>
                </div>
              </div>

              {/* Travel Party / Type */}
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                  Travel Group
                </label>
                <div className="flex items-center space-x-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <Users className="w-4 h-4 text-slate-500" />
                  <select
                    value={filters.travelType}
                    onChange={(e) => onUpdateFilters({ travelType: e.target.value as any })}
                    className="bg-transparent w-full text-slate-800 outline-none font-medium"
                  >
                    <option value="solo">Solo Explorer</option>
                    <option value="couple">Couple / Duo</option>
                    <option value="family">Family with Kids</option>
                    <option value="friends">Friends Group</option>
                  </select>
                </div>
              </div>

              {/* Reset Filters */}
              <div className="sm:col-span-3 flex justify-end pt-1">
                <button
                  onClick={onResetFilters}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline underline-offset-4"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}

          {/* AI Recommendation Strategy Bar */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-600">
              <span className="font-semibold text-slate-700">AI Recommendation Strategy:</span>
              <span>Showing {destinationCount} verified places</span>
            </div>

            {/* Toggle: Popular Places vs Less Crowded Alternatives */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <button
                onClick={() => onUpdateFilters({ recommendationMode: 'all' })}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filters.recommendationMode === 'all'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Attractions
              </button>
              <button
                onClick={() => onUpdateFilters({ recommendationMode: 'popular' })}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filters.recommendationMode === 'popular'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🌟 Popular Highlights
              </button>
              <button
                onClick={() => onUpdateFilters({ recommendationMode: 'peaceful' })}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                  filters.recommendationMode === 'peaceful'
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>🌿 Quiet Alternatives Only</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
