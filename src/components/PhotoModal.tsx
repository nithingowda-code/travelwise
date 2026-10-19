import React from 'react';
import { X, MapPin, ExternalLink, Compass } from 'lucide-react';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string;
  title: string;
  location: string;
  credit: string;
  coordinates?: [number, number];
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  photoUrl,
  title,
  location,
  credit,
  coordinates
}) => {
  if (!isOpen) return null;

  const googleMapsUrl = coordinates 
    ? `https://www.google.com/maps/search/?api=1&query=${coordinates[0]},${coordinates[1]}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title + ', ' + location)}`;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* High-Resolution Photo Display */}
        <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={photoUrl} 
            alt={title} 
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        {/* Caption & Google Maps Link Bar */}
        <div className="p-5 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location}</span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">{title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Original photograph attribution: <span className="text-slate-300 font-semibold">{credit}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow-md shadow-teal-500/20 transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
