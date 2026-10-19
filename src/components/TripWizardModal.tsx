import React, { useState } from 'react';
import { TripWizardPreferences, ActivityCategory } from '../types/yatra';
import { ALL_INDIA_REGIONS } from '../data/indiaRegions';
import { Language, TRANSLATIONS } from '../utils/translations';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Users, 
  IndianRupee, 
  Car, 
  MapPin, 
  Compass, 
  ShieldAlert, 
  Utensils, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  AlertCircle
} from 'lucide-react';

interface TripWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGeneratePlan: (prefs: TripWizardPreferences) => void;
  initialStateId?: string;
  lang: Language;
}

export const TripWizardModal: React.FC<TripWizardModalProps> = ({
  isOpen,
  onClose,
  onGeneratePlan,
  initialStateId,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Wizard state with sensible defaults
  const [startCity, setStartCity] = useState('Bengaluru');
  const [selectedStates, setSelectedStates] = useState<string[]>(initialStateId ? [initialStateId] : ['karnataka']);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [daysCount, setDaysCount] = useState<number>(4);
  
  // Group
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [childrenAges, setChildrenAges] = useState<string>('');
  const [seniors, setSeniors] = useState<number>(0);
  const [mobilityNeeds, setMobilityNeeds] = useState<boolean>(false);
  const [mobilityDetails, setMobilityDetails] = useState<string>('');

  // Budget & Transport
  const [totalBudgetINR, setTotalBudgetINR] = useState<number>(45000);
  const [budgetStyle, setBudgetStyle] = useState<'budget' | 'mid-range' | 'luxury'>('mid-range');
  const [transportMode, setTransportMode] = useState<'own_car' | 'rented_car' | 'rented_bike' | 'train' | 'bus' | 'flight' | 'mixed'>('own_car');

  // Preferences & Ratio
  const [interests, setInterests] = useState<ActivityCategory[]>(['heritage', 'nature', 'food']);
  const [crowdPreference, setCrowdPreference] = useState<'avoid_crowds' | 'dont_mind'>('avoid_crowds');
  const [famousRatio, setFamousRatio] = useState<number>(60); // 60% famous, 40% offbeat

  // Special conditions
  const [mustVisitText, setMustVisitText] = useState<string>('');
  const [avoidPlacesText, setAvoidPlacesText] = useState<string>('');
  const [foodPreference, setFoodPreference] = useState<'all' | 'veg' | 'jain' | 'halal' | 'vegan'>('all');
  const [healthIssuesText, setHealthIssuesText] = useState<string>('');
  const [comfortRemote, setComfortRemote] = useState<'comfortable' | 'moderate' | 'cautious'>('moderate');

  if (!isOpen) return null;

  const toggleStateSelection = (stateId: string) => {
    if (stateId === 'surprise') {
      setSelectedStates(['surprise']);
      return;
    }
    const filtered = selectedStates.filter(s => s !== 'surprise');
    if (filtered.includes(stateId)) {
      setSelectedStates(filtered.filter(s => s !== stateId));
    } else {
      if (filtered.length >= 3) {
        setSelectedStates([...filtered.slice(1), stateId]);
      } else {
        setSelectedStates([...filtered, stateId]);
      }
    }
  };

  const toggleInterest = (cat: ActivityCategory) => {
    if (interests.includes(cat)) {
      if (interests.length > 1) {
        setInterests(interests.filter(i => i !== cat));
      }
    } else {
      setInterests([...interests, cat]);
    }
  };

  const handleFinish = () => {
    const prefs: TripWizardPreferences = {
      startCity,
      destinationStateIds: selectedStates.length === 0 ? ['karnataka'] : selectedStates,
      startDate,
      daysCount,
      group: {
        adults,
        children,
        childrenAges,
        seniors,
        mobilityNeeds,
        mobilityDetails
      },
      totalBudgetINR,
      budgetStyle,
      transportMode,
      interests,
      crowdPreference,
      famousRatio,
      mustVisitText,
      avoidPlacesText,
      foodPreference,
      healthIssuesText,
      comfortRemote
    };
    onGeneratePlan(prefs);
    onClose();
  };

  const interestOptions: { key: ActivityCategory; label: string; icon: string }[] = [
    { key: 'heritage', label: 'History & Forts', icon: '🏰' },
    { key: 'nature', label: 'Nature & Hills', icon: '🌲' },
    { key: 'spiritual', label: 'Temples & Sacred', icon: '🪔' },
    { key: 'trekking', label: 'Trekking & Trails', icon: '🥾' },
    { key: 'wildlife', label: 'Wildlife & Safari', icon: '🐅' },
    { key: 'beaches', label: 'Beaches & Islands', icon: '🏖️' },
    { key: 'food', label: 'Culinary Trail', icon: '🍲' },
    { key: 'adventure', label: 'Adventure Sports', icon: '🛶' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="px-6 py-5 bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold tracking-tight">YatraAI Trip Planner</h2>
                <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-extrabold uppercase">
                  Step {currentStep} of 4
                </span>
              </div>
              <p className="text-xs text-teal-100">
                Customizing intelligent itinerary with 60% famous + 40% offbeat ratio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 flex">
          <div 
            className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 dark:text-slate-100">
          
          {/* STEP 1: DESTINATIONS & DATES */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Starting City / Point of Origin
                  </label>
                  <input
                    type="text"
                    value={startCity}
                    onChange={(e) => setStartCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Delhi, Mumbai, Hyderabad"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Trip Duration
                    </label>
                    <select
                      value={daysCount}
                      onChange={(e) => setDaysCount(Number(e.target.value))}
                      className="w-full px-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      {[2, 3, 4, 5, 6, 7, 8, 10, 12, 14].map(d => (
                        <option key={d} value={d}>{d} Days ({d - 1} Nights)</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* State & Region Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Select Target Indian State(s) / UT (Max 3)
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleStateSelection('surprise')}
                    className={`text-xs px-3 py-1 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
                      selectedStates.includes('surprise')
                        ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100'
                    }`}
                  >
                    <span>✨ Surprise Me (AI Curated)</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-56 overflow-y-auto p-1 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
                  {ALL_INDIA_REGIONS.map(reg => {
                    const isSelected = selectedStates.includes(reg.id);
                    return (
                      <button
                        key={reg.id}
                        type="button"
                        onClick={() => toggleStateSelection(reg.id)}
                        className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 font-bold shadow-sm'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <span className="truncate">{reg.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{reg.hindiName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Famous vs Offbeat ratio slider */}
              <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900">
                <div className="flex items-center justify-between text-xs font-bold text-teal-950 dark:text-teal-200 mb-2">
                  <div className="flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Destination Balance Ratio</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-lg bg-teal-600 text-white font-extrabold text-[11px]">
                    {famousRatio}% Famous + {100 - famousRatio}% Offbeat
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="10"
                  value={famousRatio}
                  onChange={(e) => setFamousRatio(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  <span>Tranquil & Pure Hidden Gems (80% Offbeat)</span>
                  <span>Balanced Default (60/40)</span>
                  <span>Iconic Wonders (80% Famous)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: GROUP & ACCESSIBILITY */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Adults (18+)
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-bold text-lg flex items-center justify-center hover:bg-slate-100"
                    >-</button>
                    <span className="text-xl font-bold flex-1 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-bold text-lg flex items-center justify-center hover:bg-slate-100"
                    >+</button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Children (&lt;18)
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-bold text-lg flex items-center justify-center hover:bg-slate-100"
                    >-</button>
                    <span className="text-xl font-bold flex-1 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-bold text-lg flex items-center justify-center hover:bg-slate-100"
                    >+</button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Seniors (60+)
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setSeniors(Math.max(0, seniors - 1))}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-bold text-lg flex items-center justify-center hover:bg-slate-100"
                    >-</button>
                    <span className="text-xl font-bold flex-1 text-center">{seniors}</span>
                    <button
                      type="button"
                      onClick={() => setSeniors(seniors + 1)}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-bold text-lg flex items-center justify-center hover:bg-slate-100"
                    >+</button>
                  </div>
                </div>
              </div>

              {children > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Children Ages (optional)
                  </label>
                  <input
                    type="text"
                    value={childrenAges}
                    onChange={(e) => setChildrenAges(e.target.value)}
                    placeholder="e.g. 4 yrs and 9 yrs (helps suggest kid-friendly stops)"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}

              {/* Mobility & Health Section */}
              <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                      Mobility Needs / Assistance Required?
                    </h4>
                    <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
                      We will prioritize flat paths, battery buggy access, and skip steep 3,000-stair hikes.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={mobilityNeeds}
                    onChange={(e) => setMobilityNeeds(e.target.checked)}
                    className="w-5 h-5 accent-teal-600 cursor-pointer"
                  />
                </div>

                {mobilityNeeds && (
                  <input
                    type="text"
                    value={mobilityDetails}
                    onChange={(e) => setMobilityDetails(e.target.value)}
                    placeholder="e.g. Wheelchair user, walking stick, knee arthritis"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 text-xs outline-none"
                  />
                )}
              </div>

              {/* Health Conditions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Health Considerations or Allergies (Optional)
                </label>
                <input
                  type="text"
                  value={healthIssuesText}
                  onChange={(e) => setHealthIssuesText(e.target.value)}
                  placeholder="e.g. Asthma (avoid high altitudes without acclimatization), Motion sickness on ghat roads"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: BUDGET & TRANSPORT */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Total Estimated Budget (INR ₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      step="5000"
                      value={totalBudgetINR}
                      onChange={(e) => setTotalBudgetINR(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Approx ₹{Math.round(totalBudgetINR / Math.max(1, adults + children + seniors)).toLocaleString('en-IN')} per person
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Travel & Stay Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'budget', label: 'Budget', desc: 'Hostels & Homestays' },
                      { key: 'mid-range', label: 'Mid-Range', desc: 'Comfort & 3★ Cabs' },
                      { key: 'luxury', label: 'Luxury', desc: 'Heritage & 5★ Taj' }
                    ].map(style => (
                      <button
                        key={style.key}
                        type="button"
                        onClick={() => setBudgetStyle(style.key as any)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          budgetStyle === style.key
                            ? 'bg-teal-600 text-white border-teal-600 shadow-md scale-102'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{style.label}</div>
                        <div className="text-[10px] opacity-80">{style.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mode of Transport */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Primary Transport Mode
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'own_car', label: 'Own Car (Roadtrip)', icon: '🚗' },
                    { key: 'rented_car', label: 'Rented Self-Drive SUV', icon: '🚙' },
                    { key: 'train', label: 'Train (Vande Bharat / IRCTC)', icon: '🚆' },
                    { key: 'flight', label: 'Flight + Chauffeur Cab', icon: '✈️' },
                    { key: 'rented_bike', label: 'Rented Motorbike', icon: '🏍️' },
                    { key: 'bus', label: 'Intercity Bus', icon: '🚌' },
                    { key: 'mixed', label: 'Mixed Multimodal', icon: '🔄' }
                  ].map(trans => (
                    <button
                      key={trans.key}
                      type="button"
                      onClick={() => setTransportMode(trans.key as any)}
                      className={`p-3 rounded-2xl border text-left text-xs font-medium transition-all flex items-center space-x-2 ${
                        transportMode === trans.key
                          ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 font-bold'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="text-base">{trans.icon}</span>
                      <span className="truncate">{trans.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Food Preference */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Food Preference & Dietary Needs
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'All / Regional Specialties' },
                    { key: 'veg', label: 'Pure Veg Only' },
                    { key: 'jain', label: 'Jain (No Root Veg)' },
                    { key: 'halal', label: 'Halal Certified' },
                    { key: 'vegan', label: 'Vegan Friendly' }
                  ].map(food => (
                    <button
                      key={food.key}
                      type="button"
                      onClick={() => setFoodPreference(food.key as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                        foodPreference === food.key
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {food.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: INTERESTS, CROWD & SAFETY */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Your Main Travel Interests (Pick at least 1)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {interestOptions.map(opt => {
                    const active = interests.includes(opt.key);
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => toggleInterest(opt.key)}
                        className={`p-3.5 rounded-2xl border text-left text-xs font-medium transition-all flex items-center space-x-2.5 ${
                          active
                            ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border-teal-500 text-teal-950 dark:text-teal-200 font-bold shadow-sm'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="text-xl">{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Crowd Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCrowdPreference('avoid_crowds')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    crowdPreference === 'avoid_crowds'
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 font-bold shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2 text-xs font-bold mb-1">
                    <span>🕊️ Avoid Crowds & Rush Hours</span>
                  </div>
                  <p className="text-[11px] font-normal opacity-80">
                    Schedule famous sights at early morning calm hours; favor tranquil hidden gems.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCrowdPreference('dont_mind')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    crowdPreference === 'dont_mind'
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 font-bold shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2 text-xs font-bold mb-1">
                    <span>⚡ Don’t Mind / Popular Highlights</span>
                  </div>
                  <p className="text-[11px] font-normal opacity-80">
                    Prioritize major bucket-list tourist spots and bustling markets regardless of crowd volume.
                  </p>
                </button>
              </div>

              {/* Must-Visit & Avoid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Must-Visit Places (Optional)
                  </label>
                  <input
                    type="text"
                    value={mustVisitText}
                    onChange={(e) => setMustVisitText(e.target.value)}
                    placeholder="e.g. Amber Fort, Matanga Hill sunrise"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Places to Avoid (Optional)
                  </label>
                  <input
                    type="text"
                    value={avoidPlacesText}
                    onChange={(e) => setAvoidPlacesText(e.target.value)}
                    placeholder="e.g. Baga beach, very steep stairs"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs outline-none"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-teal-600/20 transition-all hover:scale-102"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-extrabold flex items-center space-x-2 shadow-lg shadow-teal-600/30 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Generate Yatra Itinerary</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
