import React, { useState, useMemo } from 'react';
import { ALL_INDIA_REGIONS, IndiaRegion } from '../data/indiaRegions';
import { Language, TRANSLATIONS } from '../utils/translations';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Flame, 
  Compass, 
  Calendar, 
  ShieldAlert, 
  ArrowRight,
  Filter,
  CheckCircle2,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface YatraHeroProps {
  onSelectState: (state: IndiaRegion) => void;
  onOpenTripWizard: (stateId?: string) => void;
  lang: Language;
}

export const YatraHero: React.FC<YatraHeroProps> = ({
  onSelectState,
  onOpenTripWizard,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedStateModal, setSelectedStateModal] = useState<IndiaRegion | null>(null);

  const zones = [
    { key: 'all', label: t.allZones },
    { key: 'North', label: t.north },
    { key: 'South', label: t.south },
    { key: 'East', label: t.east },
    { key: 'West', label: t.west },
    { key: 'Central', label: t.central },
    { key: 'North-East', label: t.northEast },
    { key: 'Islands', label: t.islands }
  ];

  const filteredRegions = useMemo(() => {
    return ALL_INDIA_REGIONS.filter(region => {
      // Zone match
      if (selectedZone !== 'all' && region.zone !== selectedZone) {
        return false;
      }
      // Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = region.name.toLowerCase().includes(q);
        const matchesHindi = region.hindiName.includes(q);
        const matchesCapital = region.capital.toLowerCase().includes(q);
        const matchesPlaces = region.famousPlaces.some(p => p.toLowerCase().includes(q)) || 
                              region.offbeatPlaces.some(p => p.toLowerCase().includes(q));
        if (!matchesName && !matchesHindi && !matchesCapital && !matchesPlaces) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedZone]);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* High-Impact Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#062c30] to-slate-950 text-white shadow-2xl border border-teal-900/40 py-12 px-6 sm:px-12">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-teal-100/80 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenTripWizard()}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-teal-500/30 hover:scale-105 transition-all flex items-center space-x-2"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>{t.planNewTrip}</span>
            </button>

            <button
              onClick={() => onOpenTripWizard('surprise')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.surpriseMe}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Explorer Controls: Search Bar & Zone Filter */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm shadow-sm focus:ring-2 focus:ring-teal-500 outline-none text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Ratio Pill */}
          <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
            <span>60% Famous Highlights</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block ml-3" />
            <span>40% Hidden Gems (Verified)</span>
          </div>
        </div>

        {/* Zone Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {zones.map(z => (
            <button
              key={z.key}
              onClick={() => setSelectedZone(z.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedZone === z.key
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-teal-500'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
      </div>

      {/* 36 States & UTs Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredRegions.map(region => (
          <div
            key={region.id}
            onClick={() => setSelectedStateModal(region)}
            className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            {/* Real Licensed Photo */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={region.image}
                alt={region.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                  {region.zone}
                </span>
                {region.isUnionTerritory && (
                  <span className="px-2.5 py-1 rounded-lg bg-teal-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    UT
                  </span>
                )}
              </div>

              {/* Photo License Credit */}
              <div className="absolute bottom-2 left-3 right-3 text-[9px] text-white/70 truncate">
                📷 {region.imageCredit}
              </div>
            </div>

            {/* State Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 transition-colors">
                    {region.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">
                    {region.hindiName}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Capital: {region.capital}
                </div>

                {/* Best Season */}
                <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{region.bestSeason}</span>
                </div>

                {/* Highlights preview */}
                <div className="mt-2 space-y-1 text-[11px]">
                  <div className="truncate text-teal-700 dark:text-teal-400 font-medium">
                    ⭐ Famous: {region.famousPlaces[0]}
                  </div>
                  <div className="truncate text-emerald-600 dark:text-emerald-400 font-medium">
                    🌿 Offbeat: {region.offbeatPlaces[0]}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400">
                <span>View 60/40 Trail</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* State Quick Detail Modal */}
      {selectedStateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Header Image */}
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={selectedStateModal.image}
                alt={selectedStateModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedStateModal(null)}
                  className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="text-xs uppercase font-extrabold text-teal-300">
                  {selectedStateModal.zone} India • Capital: {selectedStateModal.capital}
                </div>
                <h2 className="text-2xl font-black">{selectedStateModal.name} ({selectedStateModal.hindiName})</h2>
                <div className="text-[10px] text-white/70">📷 {selectedStateModal.imageCredit}</div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
                <div className="font-bold text-amber-950 dark:text-amber-200 mb-0.5">🗓️ Best Travel Season:</div>
                <div className="text-amber-900/90 dark:text-amber-300/90">{selectedStateModal.bestSeason}</div>
              </div>

              {selectedStateModal.safetyAdvisory && (
                <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60">
                  <div className="font-bold text-red-950 dark:text-red-200 mb-0.5">⚠️ Seasonal Safety Advisory:</div>
                  <div className="text-red-900/90 dark:text-red-300/90">{selectedStateModal.safetyAdvisory}</div>
                </div>
              )}

              {selectedStateModal.permitsRequired && (
                <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
                  <div className="font-bold text-blue-950 dark:text-blue-200 mb-0.5">📋 Official Permits Required:</div>
                  <ul className="list-disc pl-5 text-blue-900/90 dark:text-blue-300/90 space-y-0.5">
                    {selectedStateModal.permitsRequired.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div className="font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
                    ⭐ Famous Highlights (60%)
                  </div>
                  <ul className="space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                    {selectedStateModal.famousPlaces.map((fp, i) => <li key={i}>{fp}</li>)}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div className="font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                    🌿 Verified Hidden Gems (40%)
                  </div>
                  <ul className="space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                    {selectedStateModal.offbeatPlaces.map((op, i) => <li key={i}>{op}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedStateModal(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const stateId = selectedStateModal.id;
                  setSelectedStateModal(null);
                  onOpenTripWizard(stateId);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-xs shadow-md shadow-teal-600/30 hover:scale-105 transition-all flex items-center space-x-1.5"
              >
                <span>Plan Trip to {selectedStateModal.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
