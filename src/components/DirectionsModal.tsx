import React, { useState } from 'react';
import { Destination } from '../types';
import { getCrowdStyle } from '../utils/crowdHelpers';
import { 
  X, 
  Navigation, 
  Car, 
  Bus, 
  Footprints, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  Compass
} from 'lucide-react';

interface DirectionsModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  destination,
  onClose,
}) => {
  const [mode, setMode] = useState<'transit' | 'driving' | 'walking'>('transit');

  if (!destination) return null;

  const crowdStyle = getCrowdStyle(destination.crowdLevel);

  // Dynamic calculated transit times
  const transitMinutes = Math.round(destination.distanceKm * 3.8 + 8);
  const drivingMinutes = Math.round(destination.distanceKm * 2.2 + 5);
  const walkingMinutes = Math.round(destination.distanceKm * 12);

  const currentDuration = mode === 'transit' ? `${transitMinutes} mins` : mode === 'driving' ? `${drivingMinutes} mins` : `${walkingMinutes} mins`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Directions & Route Timing</h3>
              <p className="text-xs text-slate-400">To {destination.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Mode Switcher */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setMode('transit')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col items-center space-y-1 transition-all ${
                mode === 'transit'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bus className="w-4 h-4 text-teal-600" />
              <span>Transit</span>
            </button>

            <button
              onClick={() => setMode('driving')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col items-center space-y-1 transition-all ${
                mode === 'driving'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Car className="w-4 h-4 text-sky-600" />
              <span>Taxi / Car</span>
            </button>

            <button
              onClick={() => setMode('walking')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col items-center space-y-1 transition-all ${
                mode === 'walking'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Footprints className="w-4 h-4 text-emerald-600" />
              <span>Walk</span>
            </button>
          </div>

          {/* Route Metric Summary */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <div className="text-xs text-slate-500 font-medium">Estimated Travel Time</div>
              <div className="text-2xl font-extrabold text-slate-900">{currentDuration}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">Distance</div>
              <div className="text-base font-bold text-slate-900">{destination.distanceKm} km</div>
            </div>
          </div>

          {/* Crowd Arrival Advisory */}
          <div className={`p-4 rounded-2xl border ${crowdStyle.bgColor} ${crowdStyle.borderColor}`}>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 mb-1">
              <span className={`w-2 h-2 rounded-full ${crowdStyle.dotColor}`} />
              <span>Arrival Crowd Forecast: {crowdStyle.label} ({destination.crowdScore}%)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              If arriving in the next hour, {crowdStyle.sublabel.toLowerCase()}. Recommended visiting window is <strong>{destination.bestTimeToVisit.split('or')[0]}</strong> for minimum entrance lines.
            </p>
          </div>

          {/* Step by Step Route Demo */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Turn-by-Turn Route Preview
            </h4>

            <div className="flex items-start space-x-3 text-slate-600">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                1
              </div>
              <div>
                <span className="font-semibold text-slate-900">Depart from City Center Station:</span> Board metro line or regional shuttle toward {destination.region}.
              </div>
            </div>

            <div className="flex items-start space-x-3 text-slate-600">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                2
              </div>
              <div>
                <span className="font-semibold text-slate-900">Alight at {destination.name} Terminus:</span> Follow pedestrian scenic trail or designated shuttle gate.
              </div>
            </div>

            <div className="flex items-start space-x-3 text-slate-600">
              <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                3
              </div>
              <div>
                <span className="font-semibold text-slate-900">Arrive at Main Gate:</span> Use e-ticket lane to bypass queue.
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
