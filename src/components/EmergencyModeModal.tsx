import React from 'react';
import { GeneratedYatraPlan } from '../types/yatra';
import { 
  X, 
  PhoneCall, 
  ShieldAlert, 
  Hospital, 
  Pill, 
  Fuel, 
  WifiOff, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Compass
} from 'lucide-react';

interface EmergencyModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: GeneratedYatraPlan | null;
}

export const EmergencyModeModal: React.FC<EmergencyModeModalProps> = ({
  isOpen,
  onClose,
  plan
}) => {
  if (!isOpen) return null;

  const currentDay = plan?.days[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-red-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-red-500 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Urgent High-Contrast Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold tracking-tight">EMERGENCY ASSISTANCE MODE</h2>
                <span className="text-[10px] bg-white text-red-700 px-2 py-0.5 rounded-full font-black uppercase">
                  OFFLINE READY
                </span>
              </div>
              <p className="text-xs text-red-100">
                High-priority medical hotlines, nearest trauma centres, and contingency protocols
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 dark:text-slate-100">
          
          {/* Quick SOS Dialers */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              1-Tap All-India Emergency Hotlines (Toll-Free)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <a
                href="tel:112"
                className="p-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-center shadow-md flex flex-col items-center justify-center space-y-1 transition-transform hover:scale-105"
              >
                <span className="text-2xl">🚨 112</span>
                <span className="text-[10px] uppercase tracking-wider">National SOS</span>
              </a>

              <a
                href="tel:108"
                className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-center shadow-md flex flex-col items-center justify-center space-y-1 transition-transform hover:scale-105"
              >
                <span className="text-2xl">🚑 108</span>
                <span className="text-[10px] uppercase tracking-wider">Free Ambulance</span>
              </a>

              <a
                href="tel:1033"
                className="p-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-center shadow-md flex flex-col items-center justify-center space-y-1 transition-transform hover:scale-105"
              >
                <span className="text-2xl">🛣️ 1033</span>
                <span className="text-[10px] uppercase tracking-wider">NHAI Highway SOS</span>
              </a>

              <a
                href="tel:1363"
                className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-center shadow-md flex flex-col items-center justify-center space-y-1 transition-transform hover:scale-105"
              >
                <span className="text-2xl">🗺️ 1363</span>
                <span className="text-[10px] uppercase tracking-wider">Tourist Helpline</span>
              </a>
            </div>
          </div>

          {/* Current Destination Emergency Health Care */}
          {currentDay && (
            <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 space-y-3">
              <div className="flex items-center space-x-2 text-red-900 dark:text-red-300 font-bold text-sm">
                <Hospital className="w-5 h-5 text-red-600" />
                <span>Primary Emergency Medical Support ({currentDay.stateName})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-red-100 dark:border-red-900/40">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Nearest District Hospital</div>
                  <div className="font-extrabold text-slate-900 dark:text-slate-100">{currentDay.medicalEmergency.hospitalName}</div>
                  <div className="text-slate-500 mt-1">Distance: ~{currentDay.medicalEmergency.distanceKm} km</div>
                  <div className="mt-2 text-red-600 dark:text-red-400 font-bold">
                    Direct Phone: {currentDay.medicalEmergency.emergencyPhone}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-red-100 dark:border-red-900/40">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Nearest Pharmacy / First Aid</div>
                  <div className="font-extrabold text-slate-900 dark:text-slate-100">{currentDay.medicalEmergency.pharmacyName}</div>
                  <div className="text-slate-500 mt-1">Stocked with ORS, Bandages, Altitude & Pain Meds</div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400 font-bold">
                    Open 24 Hours / Local Market Access
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Connectivity, Fuel and ATM Gaps */}
          {currentDay && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Route Vital Check (Network, Fuel & Cash)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <WifiOff className="w-4 h-4 text-blue-500" />
                    <span>Mobile Signal</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {currentDay.networkConnectivity.mobileNetwork}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <Fuel className="w-4 h-4 text-amber-500" />
                    <span>Next Fuel Pump</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    ~{currentDay.networkConnectivity.fuelPumpDistanceKm} km from sightseeing stops
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <CreditCard className="w-4 h-4 text-emerald-500" />
                    <span>Cash / ATM Status</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {currentDay.networkConnectivity.atmAvailability}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Offline Survival Checklist */}
          {plan && (
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Mandatory Offline Travel Checklist</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {plan.offlineChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* High Altitude Sickness (AMS) & Wildlife advisory */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <div className="font-bold flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Altitude & Wildlife Precaution</span>
            </div>
            <p className="text-[11px] opacity-90 leading-relaxed">
              If travelling above 9,000 ft (Ladakh, Spiti, Tawang, Yumthang), take Diamox as prescribed, rest 48 hours, avoid alcohol, and carry a portable oxygen can. In national parks, never alight from authorized safari vehicles and maintain 25m distance from wild animals.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity"
          >
            Close Emergency Panel
          </button>
        </div>

      </div>
    </div>
  );
};
