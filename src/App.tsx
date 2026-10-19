import React, { useState, useEffect } from 'react';
import { 
  TripWizardPreferences, 
  GeneratedYatraPlan,
  YatraDestination
} from './types/yatra';
import { generateYatraItinerary, swapTimeSlotActivity } from './utils/itineraryEngine';
import { Language, TRANSLATIONS } from './utils/translations';
import { Navbar } from './components/Navbar';
import { YatraHero } from './components/YatraHero';
import { TripWizardModal } from './components/TripWizardModal';
import { ItineraryView } from './components/ItineraryView';
import { RouteMapHub } from './components/RouteMapHub';
import { BudgetEstimator } from './components/BudgetEstimator';
import { ChecklistsView } from './components/ChecklistsView';
import { EmergencyModeModal } from './components/EmergencyModeModal';
import { PhotoModal } from './components/PhotoModal';
import { YATRA_DESTINATIONS } from './data/yatraDestinations';
import { IndiaRegion, ALL_INDIA_REGIONS } from './data/indiaRegions';
import { 
  Sparkles, 
  Download, 
  Share2, 
  RotateCcw, 
  CheckCircle2, 
  Compass, 
  MapPin, 
  IndianRupee, 
  Printer, 
  Calendar,
  Layers,
  ArrowRight,
  Route
} from 'lucide-react';

export function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<'explore' | 'itinerary' | 'routes' | 'budget' | 'checklists'>('explore');
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Modals
  const [wizardOpen, setWizardOpen] = useState<boolean>(false);
  const [wizardInitialState, setWizardInitialState] = useState<string | undefined>(undefined);
  const [emergencyOpen, setEmergencyOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Photo Lightbox Modal
  const [photoModalData, setPhotoModalData] = useState<{
    isOpen: boolean;
    photoUrl: string;
    title: string;
    location: string;
    credit: string;
    coordinates?: [number, number];
  }>({
    isOpen: false,
    photoUrl: '',
    title: '',
    location: '',
    credit: '',
  });

  // Current Yatra Plan (Pre-initialized with an exemplary 4-day Karnataka journey)
  const [currentPlan, setCurrentPlan] = useState<GeneratedYatraPlan>(() => {
    return generateYatraItinerary({
      startCity: 'Bengaluru',
      destinationStateIds: ['karnataka'],
      startDate: new Date().toISOString().split('T')[0],
      daysCount: 4,
      group: {
        adults: 2,
        children: 0,
        seniors: 0,
        mobilityNeeds: false
      },
      totalBudgetINR: 45000,
      budgetStyle: 'mid-range',
      transportMode: 'own_car',
      interests: ['heritage', 'nature', 'food'],
      crowdPreference: 'avoid_crowds',
      famousRatio: 60,
      mustVisitText: 'Hampi Stone Chariot',
      avoidPlacesText: '',
      foodPreference: 'all',
      healthIssuesText: '',
      comfortRemote: 'moderate'
    });
  });

  // Apply dark mode class to root HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenWizardWithState = (stateId?: string) => {
    setWizardInitialState(stateId);
    setWizardOpen(true);
  };

  const handleGeneratePlan = (prefs: TripWizardPreferences) => {
    const newPlan = generateYatraItinerary(prefs);
    setCurrentPlan(newPlan);
    setActiveTab('itinerary');
    showToast(`✓ Generated ${newPlan.totalDays}-Day ${newPlan.title}!`);
  };

  const handleSwapWeatherSlot = (dayNumber: number, slotIndex: number) => {
    const updated = swapTimeSlotActivity(currentPlan, dayNumber, slotIndex);
    setCurrentPlan(updated);
    showToast(`✓ Swapped activity for bad weather backup on Day ${dayNumber}!`);
  };

  const handleOpenPhoto = (dest: YatraDestination) => {
    setPhotoModalData({
      isOpen: true,
      photoUrl: dest.image,
      title: dest.name,
      location: `${dest.cityOrDistrict}, ${dest.stateName}`,
      credit: dest.imageCredit,
      coordinates: dest.coordinates,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('✓ Shareable trip link copied to clipboard!');
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-200`}>
      
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWizard={() => handleOpenWizardWithState()}
        onOpenEmergencyMode={() => setEmergencyOpen(true)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'hi' : 'en')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        hasPlan={!!currentPlan}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 px-4 py-3 rounded-2xl bg-teal-600 text-white font-bold text-xs shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: EXPLORE 36 STATES */}
        {activeTab === 'explore' && (
          <div className="space-y-10">
            <YatraHero
              onSelectState={(state) => handleOpenWizardWithState(state.id)}
              onOpenTripWizard={(stateId) => handleOpenWizardWithState(stateId)}
              lang={lang}
            />
          </div>
        )}

        {/* TAB 2: SMART ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <Compass className="w-4 h-4 text-teal-600" />
                <span>Active Journey: {currentPlan.title}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('routes')}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-500/40 text-teal-800 dark:text-teal-300 text-xs font-bold flex items-center space-x-1.5 hover:bg-teal-100 transition-colors"
                >
                  <Route className="w-3.5 h-3.5 text-teal-600" />
                  <span>Show Routes & Map</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold flex items-center space-x-1.5 hover:bg-slate-100 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.exportTrip}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold flex items-center space-x-1.5 hover:bg-slate-100 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{t.shareTrip}</span>
                </button>

                <button
                  onClick={() => handleOpenWizardWithState()}
                  className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Modify Plan</span>
                </button>
              </div>
            </div>

            <ItineraryView
              plan={currentPlan}
              onSwapWeatherSlot={handleSwapWeatherSlot}
              onOpenPhotoModal={handleOpenPhoto}
              onViewRouteOnMap={() => setActiveTab('routes')}
            />
          </div>
        )}

        {/* TAB 3: ROUTES & GOOGLE MAPS HUB */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <RouteMapHub
              plan={currentPlan}
              allDestinations={YATRA_DESTINATIONS}
              onOpenPhotoModal={handleOpenPhoto}
            />
          </div>
        )}

        {/* TAB 4: BUDGET & EXPENSE ESTIMATOR */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <BudgetEstimator plan={currentPlan} />
          </div>
        )}

        {/* TAB 5: PERMITS & PACKING CHECKLISTS */}
        {activeTab === 'checklists' && (
          <div className="space-y-6">
            <ChecklistsView plan={currentPlan} />
          </div>
        )}

      </main>

      {/* Trip Wizard Modal */}
      <TripWizardModal
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onGeneratePlan={handleGeneratePlan}
        initialStateId={wizardInitialState}
        lang={lang}
      />

      {/* Emergency Mode Modal */}
      <EmergencyModeModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        plan={currentPlan}
      />

      {/* Authentic Photo Viewer Lightbox Modal */}
      <PhotoModal
        isOpen={photoModalData.isOpen}
        onClose={() => setPhotoModalData(prev => ({ ...prev, isOpen: false }))}
        photoUrl={photoModalData.photoUrl}
        title={photoModalData.title}
        location={photoModalData.location}
        credit={photoModalData.credit}
        coordinates={photoModalData.coordinates}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-xl bg-teal-600 flex items-center justify-center text-white font-black text-xs">
              Y
            </div>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              YatraAI • Expert India Travel Engine
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>28 States & 8 Union Territories</span>
            <span>•</span>
            <span>Real-time Weather & Crowd Analytics</span>
            <span>•</span>
            <span>Connected to Google Maps Directions & Satellite Imagery</span>
            <span>•</span>
            <span className="text-teal-600 dark:text-teal-400 font-bold">100% Genuine Places & Verified Rates</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
export default App;
