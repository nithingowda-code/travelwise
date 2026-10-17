import React from 'react';
import { 
  Compass, 
  MapPin, 
  CalendarDays, 
  Bookmark, 
  Briefcase, 
  User, 
  Menu, 
  X, 
  Radio,
  ChevronDown
} from 'lucide-react';
import { CITIES } from '../data/destinations';

interface NavbarProps {
  activeTab: 'explore' | 'planner' | 'saved' | 'trips';
  setActiveTab: (tab: 'explore' | 'planner' | 'saved' | 'trips') => void;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  savedCount: number;
  itineraryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  onSelectCity,
  savedCount,
  itineraryCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = React.useState(false);

  const currentCityObj = CITIES.find((c) => c.id === selectedCity) || CITIES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#0a192f] text-white border-b border-slate-800 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & City Selector */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab('explore')}
              className="flex items-center space-x-3 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-cyan-400 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
                  TRAVELWISE
                </span>
                <span className="block text-[10px] tracking-widest uppercase font-semibold text-teal-400">
                  AI Smart Tourism Planner
                </span>
              </div>
            </button>

            {/* City Switcher Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
                title="Change Destination City"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{currentCityObj.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-20" 
                    onClick={() => setCityDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-30 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Select Region
                    </div>
                    {CITIES.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          onSelectCity(city.id);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                          city.id === selectedCity ? 'text-teal-400 font-semibold bg-slate-800/50' : 'text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-medium">{city.name}</div>
                          <div className="text-[10px] text-slate-400">{city.country}</div>
                        </div>
                        {city.id === selectedCity && (
                          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'explore'
                  ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Explore
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'planner'
                  ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Smart Planner</span>
              {itineraryCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-teal-500 text-slate-950 font-bold text-[11px] flex items-center justify-center">
                  {itineraryCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'saved'
                  ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Places</span>
              {savedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('trips')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'trips'
                  ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>My Trips</span>
            </button>
          </nav>

          {/* Right Section: Live Crowd Status & User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Live Crowd Monitoring Pill */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold">AI Crowd Engine</span>
              <span className="text-[10px] text-emerald-300/80">Active</span>
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <button 
                className="w-10 h-10 rounded-full border-2 border-teal-400/40 p-0.5 hover:border-teal-400 transition-all overflow-hidden"
                title="Traveler Profile"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="User Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0a192f] px-4 pt-3 pb-6 space-y-3">
          <div className="mb-3">
            <label className="text-xs font-semibold text-slate-400 block mb-1">Select Region</label>
            <select
              value={selectedCity}
              onChange={(e) => {
                onSelectCity(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="w-full bg-slate-800 text-white rounded-lg p-2 text-sm border border-slate-700"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.country})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'explore' ? 'bg-teal-500/20 text-teal-400' : 'text-slate-300'
              }`}
            >
              Explore Destinations
            </button>
            <button
              onClick={() => { setActiveTab('planner'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex justify-between ${
                activeTab === 'planner' ? 'bg-teal-500/20 text-teal-400' : 'text-slate-300'
              }`}
            >
              <span>Smart Trip Planner</span>
              {itineraryCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-teal-500 text-slate-950 font-bold text-xs">
                  {itineraryCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('saved'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex justify-between ${
                activeTab === 'saved' ? 'bg-teal-500/20 text-teal-400' : 'text-slate-300'
              }`}
            >
              <span>Saved Places</span>
              {savedCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('trips'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'trips' ? 'bg-teal-500/20 text-teal-400' : 'text-slate-300'
              }`}
            >
              My Trips
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
