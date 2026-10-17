import React from 'react';
import { Destination } from '../types';
import { getCrowdStyle } from '../utils/crowdHelpers';
import { 
  X, 
  Bookmark, 
  Star, 
  Clock, 
  Trash2, 
  Plus, 
  Check, 
  Navigation,
  Heart,
  TrendingDown,
  ArrowRight
} from 'lucide-react';

interface SavedPlacesModalProps {
  savedDestinations: Destination[];
  onClose: () => void;
  onRemoveSave: (destId: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onAddToItinerary: (dest: Destination) => void;
  itineraryDestIds: string[];
}

export const SavedPlacesModal: React.FC<SavedPlacesModalProps> = ({
  savedDestinations,
  onClose,
  onRemoveSave,
  onSelectDestination,
  onAddToItinerary,
  itineraryDestIds,
}) => {
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Saved Places & Wishlist</h3>
              <p className="text-xs text-slate-400">
                {savedDestinations.length} destination{savedDestinations.length === 1 ? '' : 's'} bookmarked with live crowd alerts
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

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {savedDestinations.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">No saved places yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Click the heart icon on any destination card to bookmark it for your trip.
              </p>
            </div>
          ) : (
            savedDestinations.map((dest) => {
              const crowdStyle = getCrowdStyle(dest.crowdLevel);
              const isAdded = itineraryDestIds.includes(dest.id);

              return (
                <div
                  key={dest.id}
                  className="bg-slate-50 hover:bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all flex items-center justify-between gap-3 shadow-sm"
                >
                  <div 
                    onClick={() => onSelectDestination(dest)}
                    className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0"
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${crowdStyle.badgeBg}`}>
                          {crowdStyle.label} ({dest.crowdScore}%)
                        </span>
                        <span className="text-xs font-bold text-slate-800 flex items-center">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                          {dest.rating}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-1">
                        {dest.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {dest.city.toUpperCase()} • Best time: {dest.bestTimeToVisit.split('or')[0]}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => onAddToItinerary(dest)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all ${
                        isAdded 
                          ? 'bg-teal-50 text-teal-700 border border-teal-300' 
                          : 'bg-slate-900 text-white hover:bg-teal-600'
                      }`}
                      title={isAdded ? 'Already in itinerary' : 'Add to trip'}
                    >
                      {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => onRemoveSave(dest.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
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
