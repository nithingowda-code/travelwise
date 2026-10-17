import React from 'react';
import { ItineraryItem, Destination } from '../types';
import { 
  Briefcase, 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Download, 
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';

interface MyTripsModalProps {
  onClose: () => void;
  itinerary: ItineraryItem[];
  cityName: string;
  onOpenPlanner: () => void;
  onViewDestination: (dest: Destination) => void;
}

export const MyTripsModal: React.FC<MyTripsModalProps> = ({
  onClose,
  itinerary,
  cityName,
  onOpenPlanner,
  onViewDestination,
}) => {
  const exportItinerary = () => {
    const tripContent = {
      title: `TravelWise Trip - ${cityName}`,
      exportedAt: new Date().toISOString(),
      stopsCount: itinerary.length,
      stops: itinerary.map((item, idx) => ({
        step: idx + 1,
        name: item.destination.name,
        timeSlot: `${item.plannedStartTime} - ${item.plannedEndTime}`,
        crowdLevel: item.destination.crowdLevel,
        crowdPercent: `${item.destination.crowdScore}%`,
        bestVisitingWindow: item.destination.bestTimeToVisit,
        coordinates: item.destination.coordinates,
      })),
    };

    const blob = new Blob([JSON.stringify(tripContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travelwise-${cityName.toLowerCase().replace(/\s+/g, '-')}-plan.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">My Trips & Journeys</h3>
              <p className="text-xs text-slate-400">
                Active and scheduled travel plans with AI route optimization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          
          {/* Active Trip Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                  Active Trip Plan
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  Exploration of {cityName}
                </h4>
                <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Scheduled for Upcoming Weekend</span>
                  <span>•</span>
                  <span>{itinerary.length} destinations</span>
                </p>
              </div>

              {itinerary.length > 0 && (
                <button
                  onClick={exportItinerary}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center space-x-1 shadow-sm transition-colors"
                  title="Export itinerary as JSON"
                >
                  <Download className="w-3.5 h-3.5 text-teal-600" />
                  <span>Export</span>
                </button>
              )}
            </div>

            {/* Quick list of stops */}
            {itinerary.length === 0 ? (
              <div className="p-4 bg-white rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                No stops added to this trip yet. Visit the Explore or Planner tab to add destinations!
              </div>
            ) : (
              <div className="space-y-2 mt-3">
                {itinerary.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onViewDestination(item.destination);
                    }}
                    className="p-2.5 bg-white hover:bg-slate-100/80 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <span className="w-5 h-5 rounded-md bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-800 truncate">
                        {item.destination.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-slate-500 shrink-0">
                      <span>{item.plannedStartTime}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => {
                  onClose();
                  onOpenPlanner();
                }}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
              >
                <span>Open in Smart Planner Workspace</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
