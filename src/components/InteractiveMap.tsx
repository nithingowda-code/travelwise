import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Destination, 
  DestinationCategory, 
  CrowdLevel, 
  ItineraryItem 
} from '../types';
import { getCrowdStyle, formatCrowdDataSource } from '../utils/crowdHelpers';
import { 
  Layers, 
  Maximize2, 
  RotateCcw, 
  Sparkles, 
  Navigation, 
  Eye, 
  Clock, 
  Star,
  MapPin,
  Flame,
  Route
} from 'lucide-react';

interface InteractiveMapProps {
  destinations: Destination[];
  selectedDestination: Destination | null;
  onSelectDestination: (dest: Destination) => void;
  activeCategory: DestinationCategory;
  onSelectCategory: (category: DestinationCategory) => void;
  cityCenter: [number, number];
  zoom: number;
  itinerary: ItineraryItem[];
  onOpenDirections: (dest: Destination) => void;
}

const CATEGORY_TABS: { id: DestinationCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Places', icon: '✨' },
  { id: 'historical', label: 'Historical', icon: '🏛️' },
  { id: 'beach', label: 'Beaches', icon: '🏖️' },
  { id: 'hill_station', label: 'Hill Stations', icon: '⛰️' },
  { id: 'museum', label: 'Museums', icon: '🖼️' },
  { id: 'restaurant', label: 'Dining', icon: '🍜' },
  { id: 'park', label: 'Parks & Nature', icon: '🌳' },
  { id: 'adventure', label: 'Adventure', icon: '🧗' },
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  destinations,
  selectedDestination,
  onSelectDestination,
  activeCategory,
  onSelectCategory,
  cityCenter,
  zoom,
  itinerary,
  onOpenDirections,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const heatmapLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);

  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showRoute, setShowRoute] = useState(true);
  const [mapType, setMapType] = useState<'street' | 'satellite'>('street');
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: cityCenter,
        zoom: zoom,
        zoomControl: false,
      });

      // Default CartoDB Voyager tiles
      const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Add Zoom Control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
      heatmapLayerRef.current = L.layerGroup().addTo(map);
    } else {
      mapInstanceRef.current.setView(cityCenter, zoom, { animate: true });
    }
  }, [cityCenter, zoom]);

  // Handle Map Type (Street vs Satellite)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    if (mapType === 'satellite') {
      tileLayerRef.current = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18,
      }).addTo(map);
    } else {
      tileLayerRef.current = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);
    }
  }, [mapType]);

  // Update Markers and Heatmap Circles
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    const heatmapLayer = heatmapLayerRef.current;

    if (!map || !markersLayer || !heatmapLayer) return;

    markersLayer.clearLayers();
    heatmapLayer.clearLayers();

    destinations.forEach((dest) => {
      const crowdStyle = getCrowdStyle(dest.crowdLevel);
      const isSelected = selectedDestination?.id === dest.id;

      // 1. Heatmap layer circle if enabled
      if (showHeatmap) {
        // High crowd = large red halo; Low crowd = soothing green aura
        const radius = dest.crowdLevel === 'very_high' ? 800 : dest.crowdLevel === 'high' ? 650 : 500;
        const color = crowdStyle.hex;
        const opacity = dest.crowdLevel === 'very_high' ? 0.35 : dest.crowdLevel === 'high' ? 0.25 : 0.15;

        const circle = L.circle(dest.coordinates, {
          radius: radius,
          color: 'transparent',
          fillColor: color,
          fillOpacity: opacity,
          interactive: false,
        });
        heatmapLayer.addLayer(circle);
      }

      // 2. Custom Marker Icon
      const pulseHtml = isSelected
        ? `<div class="absolute -inset-2 rounded-full animate-ping opacity-75" style="background-color: ${crowdStyle.hex}"></div>`
        : dest.crowdLevel === 'low'
        ? `<div class="absolute -inset-1 rounded-full opacity-40 animate-pulse" style="background-color: #10b981"></div>`
        : '';

      const markerHtml = `
        <div class="relative custom-map-pin cursor-pointer group" style="width: 44px; height: 44px;">
          ${pulseHtml}
          <div class="relative w-10 h-10 rounded-2xl shadow-xl flex items-center justify-center border-2 transition-transform transform group-hover:scale-110 ${
            isSelected 
              ? 'scale-110 ring-4 ring-offset-2 ring-teal-500 shadow-teal-500/50' 
              : 'shadow-slate-900/30'
          }" style="background-color: #0f172a; border-color: ${crowdStyle.hex};">
            
            <!-- Crowd indicator dot -->
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0f172a]" style="background-color: ${crowdStyle.hex};"></span>
            
            <!-- Icon/Label -->
            <div class="flex flex-col items-center justify-center text-white">
              <span class="text-xs font-bold">${dest.crowdScore}%</span>
            </div>
          </div>
          
          <!-- Tooltip label on hover -->
          <div class="absolute bottom-11 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center pointer-events-none z-50 whitespace-nowrap">
            <div class="bg-slate-950 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-xl border border-slate-800 flex items-center space-x-1.5">
              <span>${dest.name}</span>
              <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${crowdStyle.hex};"></span>
            </div>
            <div class="w-2 h-2 bg-slate-950 rotate-45 -mt-1 border-r border-b border-slate-800"></div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      const marker = L.marker(dest.coordinates, { icon: customIcon });

      marker.on('click', () => {
        onSelectDestination(dest);
        map.setView(dest.coordinates, Math.max(map.getZoom(), 14), { animate: true });
      });

      markersLayer.addLayer(marker);
    });

    // 3. Route polyline if itinerary exists
    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }

    if (showRoute && itinerary.length >= 2) {
      const latlngs = itinerary.map((item) => item.destination.coordinates);
      const polyline = L.polyline(latlngs, {
        color: '#0d9488', // Teal
        weight: 4,
        dashArray: '8, 8',
        lineCap: 'round',
        opacity: 0.85,
      }).addTo(map);

      routeLayerRef.current = polyline;
    }
  }, [destinations, selectedDestination, showHeatmap, showRoute, itinerary, onSelectDestination]);

  // Recenter Map
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(cityCenter, zoom, { animate: true });
    }
  };

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-100 flex flex-col">
      
      {/* Top Floating Category Filter Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Category Pills */}
        <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Heatmap, Route & Satellite Toggles */}
        <div className="pointer-events-auto flex items-center space-x-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200">
          <button
            onClick={() => setMapType(mapType === 'street' ? 'satellite' : 'street')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              mapType === 'satellite'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="Toggle Satellite Imagery Layer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{mapType === 'satellite' ? 'Satellite' : 'Street'}</span>
          </button>

          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              showHeatmap
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="Toggle Crowd Density Heatmap"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Heatmap</span>
          </button>

          {itinerary.length >= 2 && (
            <button
              onClick={() => setShowRoute(!showRoute)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                showRoute
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Toggle Itinerary Route Polylines"
            >
              <Route className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Route</span>
            </button>
          )}

          <button
            onClick={handleRecenter}
            className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Recenter Map"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Main Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Bottom Floating Legend Bar */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 max-w-md">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
          <span>Crowd Density Index</span>
          <span className="text-teal-700 font-medium">Real-time & AI Forecast</span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-medium">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
            <span className="text-slate-700">Low (&lt;30%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
            <span className="text-slate-700">Moderate</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" />
            <span className="text-slate-700">High</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
            <span className="text-slate-700">Extreme (&gt;85%)</span>
          </div>
        </div>
      </div>

      {/* Quick Destination Drawer Preview if one is clicked on map */}
      {selectedDestination && (
        <div className="absolute bottom-4 right-16 z-20 pointer-events-auto hidden sm:block max-w-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-3.5 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start space-x-3">
            <img
              src={selectedDestination.image}
              alt={selectedDestination.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getCrowdStyle(selectedDestination.crowdLevel).badgeBg}`}>
                  {getCrowdStyle(selectedDestination.crowdLevel).label}
                </span>
                <span className="text-xs font-semibold text-slate-700 flex items-center">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                  {selectedDestination.rating}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 truncate mt-1">
                {selectedDestination.name}
              </h4>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {selectedDestination.shortDescription}
              </p>
              <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                <span className="text-slate-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-slate-400" />
                  {selectedDestination.bestTimeToVisit.split('or')[0]}
                </span>
                <button
                  onClick={() => onOpenDirections(selectedDestination)}
                  className="text-teal-700 hover:text-teal-900 font-semibold flex items-center space-x-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
