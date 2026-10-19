import React from 'react';
import { GeneratedYatraPlan, ItineraryTimeSlot, DayItinerary } from '../types/yatra';
import { 
  Clock, 
  MapPin, 
  Sparkles, 
  CloudSun, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  ChevronUp, 
  ChevronDown, 
  ExternalLink, 
  Hospital, 
  Phone, 
  Compass, 
  Utensils, 
  Wind, 
  Droplets,
  Sunrise,
  Sunset,
  Shuffle,
  ShieldAlert
} from 'lucide-react';

interface ItineraryViewProps {
  plan: GeneratedYatraPlan;
  onSwapWeatherSlot: (dayNumber: number, slotIndex: number) => void;
  onMoveSlot?: (dayNumber: number, fromIndex: number, toIndex: number) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  plan,
  onSwapWeatherSlot
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Trip Meta Overview Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-900 via-slate-900 to-cyan-950 text-white shadow-xl border border-teal-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>YatraAI Smart Schedule</span>
              <span className="text-white/40">•</span>
              <span>Fit Score: {plan.fitScore}%</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {plan.title}
            </h2>
            <p className="text-sm text-teal-100/90 mt-1 max-w-2xl">
              {plan.routeSummary}
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <div className="text-[10px] uppercase font-bold text-teal-300">Total Duration</div>
              <div className="text-lg font-black">{plan.totalDays} Days</div>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <div className="text-[10px] uppercase font-bold text-amber-300">Balance Mix</div>
              <div className="text-lg font-black">
                {plan.famousPercentage}% Famous / {plan.offbeatPercentage}% Offbeat
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <div className="text-[10px] uppercase font-bold text-emerald-300">Est. Total Cost</div>
              <div className="text-lg font-black text-emerald-300">
                ₹{plan.budget.totalEstimatedINR.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Day by Day Cards */}
      <div className="space-y-8">
        {plan.days.map((day) => (
          <div 
            key={day.dayNumber}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden transition-all hover:shadow-lg"
          >
            {/* Day Header & Live Weather Strip */}
            <div className="p-5 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-8 h-8 rounded-xl bg-teal-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                    {day.dayNumber}
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                      {day.dayTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {day.date} • Travel Route: {day.travelRoute.from} to {day.travelRoute.to} ({day.travelRoute.distanceKm} km, ~{day.travelRoute.estimatedDrivingHours} hrs)
                    </p>
                  </div>
                </div>
              </div>

              {/* Weather Strip */}
              <div className="px-4 py-2 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center space-x-1.5 font-bold text-teal-950 dark:text-teal-200">
                  <CloudSun className="w-4 h-4 text-amber-500" />
                  <span>{day.weather.tempCurrent}°C</span>
                  <span className="text-[11px] font-normal text-slate-500">({day.weather.tempMin}° - {day.weather.tempMax}°C)</span>
                </div>

                <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-300">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>Rain: {day.weather.rainProb}%</span>
                </div>

                <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-300">
                  <Wind className="w-3.5 h-3.5 text-teal-500" />
                  <span>{day.weather.windKmh} km/h</span>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                  <span>🌅 {day.weather.sunrise}</span>
                  <span>🌇 {day.weather.sunset}</span>
                </div>

                <div className="px-2 py-0.5 rounded-lg bg-teal-600 text-white font-black text-[10px] tracking-wide">
                  Score {day.weather.suitabilityScore}/100
                </div>

                <div className="text-[10px] text-slate-400 italic">
                  [{day.weather.status} • {day.weather.source}]
                </div>
              </div>
            </div>

            {/* Time Slots Timeline */}
            <div className="p-6 space-y-6">
              
              {/* SLOTS */}
              {day.slots.map((slot, sIdx) => {
                const dest = slot.destination;
                const isSwapped = slot.isWeatherSwapped;

                return (
                  <div 
                    key={sIdx}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isSwapped
                        ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                        : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      
                      {/* Real Photo with License Badge */}
                      <div className="relative w-full md:w-56 h-36 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                        <img 
                          src={dest.image} 
                          alt={dest.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Famous vs Offbeat Badge */}
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            dest.isOffbeat 
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-teal-600 text-white shadow-sm'
                          }`}>
                            {dest.isOffbeat ? 'Hidden Gem (Offbeat)' : 'Famous Highlight'}
                          </span>
                        </div>

                        {/* License / Image Credit Attribution */}
                        <div className="absolute bottom-1.5 left-2 right-2 text-[9px] text-white/80 truncate">
                          📷 {dest.imageCredit}
                        </div>
                      </div>

                      {/* Destination Details & Scheduling */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                                {slot.timeSlot}
                              </span>
                              <span className="text-slate-300 dark:text-slate-700">•</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {dest.cityOrDistrict}, {dest.stateName}
                              </span>
                            </div>

                            {/* Crowd Badge */}
                            <div className="flex items-center space-x-2">
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center space-x-1 ${
                                slot.crowdStatus === 'low'
                                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                                  : slot.crowdStatus === 'moderate'
                                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                                    : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300'
                              }`}>
                                <span>Crowd: {slot.crowdStatus.toUpperCase()}</span>
                              </span>
                            </div>
                          </div>

                          <h4 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-1">
                            {dest.name}
                          </h4>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                            {slot.scheduledActivity}
                          </p>
                        </div>

                        {/* Bottom Metadata & Weather Swap Button */}
                        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-750 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex flex-wrap items-center gap-3 text-slate-500 dark:text-slate-400">
                            <span>🕒 Best: {dest.bestTimeOfDay}</span>
                            <span>🎟️ Entry: ₹{dest.entryFeeINR}</span>
                            <span>⏱️ Hours: {dest.openingHours}</span>
                            {dest.permitRequired && (
                              <span className="text-amber-600 font-bold">📋 Permit: {dest.permitRequired}</span>
                            )}
                          </div>

                          {/* Weather Swap Action */}
                          {dest.badWeatherAlternative && (
                            <button
                              type="button"
                              onClick={() => onSwapWeatherSlot(day.dayNumber, sIdx)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                                isSwapped
                                  ? 'bg-teal-600 text-white shadow-sm'
                                  : 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 hover:bg-amber-200'
                              }`}
                              title="Swap outdoor sight with indoor cultural/museum alternative in case of sudden rain or extreme heat"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>{isSwapped ? 'Revert to Outdoor Sight' : 'Auto-Swap for Bad Weather'}</span>
                            </button>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Meals Breaks Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-700 dark:text-teal-300 shrink-0">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100">
                      Lunch Stop: {day.lunchBreak.restaurant.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {day.lunchBreak.restaurant.specialty} • ~₹{day.lunchBreak.restaurant.costPerPersonINR}/person ({day.lunchBreak.restaurant.foodType})
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/60 dark:border-cyan-900/40 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-700 dark:text-cyan-300 shrink-0">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100">
                      Dinner: {day.dinnerBreak.restaurant.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {day.dinnerBreak.restaurant.specialty} • ~₹{day.dinnerBreak.restaurant.costPerPersonINR}/person ({day.dinnerBreak.restaurant.foodType})
                    </div>
                  </div>
                </div>
              </div>

              {/* Contingency Plans Plan B & Plan C */}
              <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Day {day.dayNumber} Safety & Contingency Backups (Plan B / Plan C)</span>
                </div>
                
                <div className="space-y-1.5 text-slate-600 dark:text-slate-400">
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200">Plan B (Weather Disruption): </strong> 
                    {day.planB_WeatherDisruption}
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200">Plan C (Breakdown / Roadblock): </strong> 
                    {day.planC_BreakdownOrClosure}
                  </div>
                  <div className="pt-1 flex flex-wrap gap-4 text-[11px] text-slate-500">
                    <span>🏥 Hospital: {day.medicalEmergency.hospitalName} ({day.medicalEmergency.emergencyPhone})</span>
                    <span>📶 Network: {day.networkConnectivity.mobileNetwork}</span>
                    <span>⛽ Fuel: ~{day.networkConnectivity.fuelPumpDistanceKm} km</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
