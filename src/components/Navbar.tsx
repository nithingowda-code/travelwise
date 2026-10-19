import React from 'react';
import { 
  Compass, 
  MapPin, 
  CalendarDays, 
  IndianRupee, 
  ShieldAlert, 
  Sparkles, 
  Sun, 
  Moon, 
  Languages, 
  Menu, 
  X,
  FileCheck
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface NavbarProps {
  activeTab: 'explore' | 'itinerary' | 'routes' | 'budget' | 'checklists';
  setActiveTab: (tab: 'explore' | 'itinerary' | 'routes' | 'budget' | 'checklists') => void;
  onOpenWizard: () => void;
  onOpenEmergencyMode: () => void;
  lang: Language;
  onToggleLang: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  hasPlan: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenWizard,
  onOpenEmergencyMode,
  lang,
  onToggleLang,
  darkMode,
  onToggleDarkMode,
  hasPlan
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 text-white border-b border-slate-800 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setActiveTab('explore')}
              className="flex items-center space-x-3 text-left group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-300 bg-clip-text text-transparent">
                  YATRA AI
                </span>
                <span className="block text-[9px] tracking-widest uppercase font-extrabold text-teal-400">
                  {lang === 'hi' ? 'अखिल भारतीय स्मार्ट यात्रा योजनाकार' : 'All-India Smart Travel Engine'}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'explore'
                  ? 'bg-teal-600/30 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {lang === 'hi' ? '36 राज्य व केंद्र शासित प्रदेश' : 'Explore 36 States & UTs'}
            </button>

            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                activeTab === 'itinerary'
                  ? 'bg-teal-600/30 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{lang === 'hi' ? 'स्मार्ट यात्रा कार्यक्रम' : 'Smart Itinerary'}</span>
              {hasPlan && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block ml-1.5 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('routes')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'routes'
                  ? 'bg-teal-600/30 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>🗺️ {lang === 'hi' ? 'मार्ग एवं गूगल मैप्स' : 'Routes & Google Maps'}</span>
            </button>

            <button
              onClick={() => setActiveTab('budget')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'budget'
                  ? 'bg-teal-600/30 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {lang === 'hi' ? 'बजट एवं व्यय' : 'Budget & Fuel'}
            </button>

            <button
              onClick={() => setActiveTab('checklists')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'checklists'
                  ? 'bg-teal-600/30 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {lang === 'hi' ? 'परमिट एवं पैकिंग' : 'Permits & Packing'}
            </button>
          </nav>

          {/* Right Action Icons & Emergency Mode */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-teal-300 transition-colors flex items-center space-x-1"
              title="Switch Language: English / हिन्दी"
            >
              <Languages className="w-4 h-4" />
              <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Toggle Dark / Light Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Emergency Mode Button */}
            <button
              onClick={onOpenEmergencyMode}
              className="px-3 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-black flex items-center space-x-1.5 shadow-md shadow-red-600/20 transition-all hover:scale-105"
              title="One-click access to SOS numbers, nearest trauma centers, and offline checklists"
            >
              <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
              <span>SOS Emergency</span>
            </button>

            {/* Plan Trip CTA */}
            <button
              onClick={onOpenWizard}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-black text-xs shadow-md shadow-teal-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.planNewTrip}</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenEmergencyMode}
              className="p-2 rounded-xl bg-red-600 text-white"
              title="SOS Emergency Mode"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-2 animate-in fade-in">
            <button
              onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800"
            >
              {lang === 'hi' ? '36 राज्य व केंद्र शासित प्रदेश' : 'Explore 36 States & UTs'}
            </button>
            <button
              onClick={() => { setActiveTab('itinerary'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800"
            >
              {lang === 'hi' ? 'स्मार्ट यात्रा कार्यक्रम' : 'Smart Itinerary'}
            </button>
            <button
              onClick={() => { setActiveTab('routes'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800"
            >
              {lang === 'hi' ? '🗺️ मार्ग एवं गूगल मैप्स' : '🗺️ Routes & Google Maps'}
            </button>
            <button
              onClick={() => { setActiveTab('budget'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800"
            >
              {lang === 'hi' ? 'बजट एवं ईंधन' : 'Budget & Fuel'}
            </button>
            <button
              onClick={() => { setActiveTab('checklists'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800"
            >
              {lang === 'hi' ? 'परमिट एवं पैकिंग' : 'Permits & Packing'}
            </button>

            <div className="pt-2 flex items-center justify-between px-4">
              <button
                onClick={onToggleLang}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-teal-300"
              >
                {lang === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
              </button>
              <button
                onClick={onOpenWizard}
                className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 text-xs font-black"
              >
                {t.planNewTrip}
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
