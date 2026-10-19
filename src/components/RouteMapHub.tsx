import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { GeneratedYatraPlan, YatraDestination } from '../types/yatra';
import { ALL_INDIA_REGIONS } from '../data/indiaRegions';
import { 
  Navigation, 
  MapPin, 
  Layers, 
  Compass, 
  ExternalLink, 
  Route, 
  Clock, 
  Car, 
  Sparkles, 
  Eye, 
  RotateCcw,
  CheckCircle2,
  Calendar,
  Fuel,
  Info
} from 'lucide-react';

interface RouteMapHubProps {
  plan: GeneratedYatraPlan;
  allDestinations: YatraDestination[];
  onOpenPhotoModal: (dest: YatraDestination) => void;
}

interface RouteStop {
  stopNumber: number;
  label: string;
  destination?: YatraDestination;
  placeName: string;
  cityName: string;
  coordinates: [number, number];
  dayNumber?: number;
  timeSlot?: string;
  isOrigin?: boolean;
  isReturn?: boolean;
}

export const RouteMapHub: React.FC<RouteMapHubProps> = ({
  plan,
  allDestinations,
  onOpenPhotoModal
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const allPlacesPolylineRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [mapType, setMapType] = useState<'street' | 'satellite'>('street');
  const [showAllPlaces, setShowAllPlaces] = useState<boolean>(true);
  const [activeLegIndex, setActiveLegIndex] = useState<number | null>(null);
  const [selectedStop, setSelectedStop] = useState<RouteStop | null>(null);

  // 1. Resolve Origin Coordinates (Start City)
  const startCityCoords = useMemo((): [number, number] => {
    const cityNameLower = plan.preferences.startCity.toLowerCase();
    const matchedRegion = ALL_INDIA_REGIONS.find(r => 
      r.name.toLowerCase().includes(cityNameLower) || 
      r.capital.toLowerCase().includes(cityNameLower) ||
      cityNameLower.includes(r.capital.toLowerCase())
    );
    if (matchedRegion) return matchedRegion.center;
    // Default fallback to first destination coordinates or Bengaluru
    return plan.days[0]?.slots[0]?.destination.coordinates || [12.9716, 77.5946];
  }, [plan]);

  // 2. Build Ordered Visited Stops List
  const visitedStops = useMemo((): RouteStop[] => {
    const stops: RouteStop[] = [];
    
    // Stop 0: Start City
    stops.push({
      stopNumber: 0,
      label: `Start: ${plan.preferences.startCity}`,
      placeName: `${plan.preferences.startCity} (Point of Origin)`,
      cityName: plan.preferences.startCity,
      coordinates: startCityCoords,
      isOrigin: true
    });

    let counter = 1;
    plan.days.forEach(day => {
      // Morning Stop
      const morningDest = day.slots[0]?.destination;
      if (morningDest) {
        stops.push({
          stopNumber: counter++,
          label: `Stop ${counter - 1}: ${morningDest.name}`,
          destination: morningDest,
          placeName: morningDest.name,
          cityName: morningDest.cityOrDistrict,
          coordinates: morningDest.coordinates,
          dayNumber: day.dayNumber,
          timeSlot: 'Morning'
        });
      }

      // Evening Stop (if distinct from morning)
      const eveningDest = day.slots[2]?.destination;
      if (eveningDest && eveningDest.id !== morningDest?.id) {
        stops.push({
          stopNumber: counter++,
          label: `Stop ${counter - 1}: ${eveningDest.name}`,
          destination: eveningDest,
          placeName: eveningDest.name,
          cityName: eveningDest.cityOrDistrict,
          coordinates: eveningDest.coordinates,
          dayNumber: day.dayNumber,
          timeSlot: 'Evening'
        });
      }
    });

    // Final Return Stop
    stops.push({
      stopNumber: counter,
      label: `Return: ${plan.preferences.startCity}`,
      placeName: `Return to ${plan.preferences.startCity}`,
      cityName: plan.preferences.startCity,
      coordinates: startCityCoords,
      isReturn: true
    });

    return stops;
  }, [plan, startCityCoords]);

  // 3. Construct Multi-Stop Google Maps Route URL for all visited places
  const multiStopGoogleMapsUrl = useMemo(() => {
    if (visitedStops.length < 2) return '';
    const origin = `${startCityCoords[0]},${startCityCoords[1]}`;
    const destination = `${startCityCoords[0]},${startCityCoords[1]}`;
    const intermediateStops = visitedStops
      .filter(s => !s.isOrigin && !s.isReturn)
      .map(s => `${s.coordinates[0]},${s.coordinates[1]}`);
    
    const waypointsParam = intermediateStops.length > 0 ? `&waypoints=${intermediateStops.join('|')}` : '';
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypointsParam}&travelmode=driving`;
  }, [visitedStops, startCityCoords]);

  // 4. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const center = visitedStops[1]?.coordinates || startCityCoords;
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: 7,
        zoomControl: false,
      });

      // Default Voyager tiles
      const tile = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      tileLayerRef.current = tile;
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
      allPlacesPolylineRef.current = L.layerGroup().addTo(map);
    }
  }, []);

  // 5. Update Map Tiles (Street vs Satellite)
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

  // 6. Draw Visited Route Polyline & Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    const allPlacesLayer = allPlacesPolylineRef.current;
    if (!map || !markersLayer || !allPlacesLayer) return;

    markersLayer.clearLayers();
    allPlacesLayer.clearLayers();

    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
      routePolylineRef.current = null;
    }

    // A. Draw Visited Route Polylines
    const routeCoords = visitedStops.map(s => s.coordinates);
    const mainPolyline = L.polyline(routeCoords, {
      color: '#0d9488', // Teal
      weight: 5,
      opacity: 0.9,
      dashArray: '6, 8',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    routePolylineRef.current = mainPolyline;

    // B. If "Show all places" enabled, draw subtle connectors to other regional places
    if (showAllPlaces) {
      const visitedIds = new Set(visitedStops.map(s => s.destination?.id).filter(Boolean));
      const otherPlaces = allDestinations.filter(d => !visitedIds.has(d.id));

      otherPlaces.forEach(op => {
        // Find nearest visited stop
        let nearestStop = visitedStops[1];
        let minDist = 999999;
        visitedStops.forEach(vs => {
          if (!vs.isOrigin && !vs.isReturn) {
            const d = Math.hypot(vs.coordinates[0] - op.coordinates[0], vs.coordinates[1] - op.coordinates[1]);
            if (d < minDist) {
              minDist = d;
              nearestStop = vs;
            }
          }
        });

        // Draw light dashed connector line
        if (nearestStop) {
          const connector = L.polyline([nearestStop.coordinates, op.coordinates], {
            color: '#94a3b8',
            weight: 1.5,
            dashArray: '3, 6',
            opacity: 0.5
          });
          allPlacesLayer.addLayer(connector);
        }

        // Add subtle marker for non-visited regional place
        const otherIconHtml = `
          <div class="relative group cursor-pointer" style="width: 26px; height: 26px;">
            <div class="w-6 h-6 rounded-full bg-slate-800/80 text-white text-[10px] font-bold flex items-center justify-center border border-white/60 shadow-md">
              📍
            </div>
            <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-slate-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-50">
              ${op.name} (${op.cityOrDistrict})
            </div>
          </div>
        `;

        const otherIcon = L.divIcon({
          className: 'other-place-marker',
          html: otherIconHtml,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const otherMarker = L.marker(op.coordinates, { icon: otherIcon });
        otherMarker.on('click', () => {
          setSelectedStop({
            stopNumber: 99,
            label: op.name,
            destination: op,
            placeName: op.name,
            cityName: op.cityOrDistrict,
            coordinates: op.coordinates
          });
        });

        allPlacesLayer.addLayer(otherMarker);
      });
    }

    // C. Add Numbered Markers for Visited Stops
    visitedStops.forEach(stop => {
      const isStartOrEnd = stop.isOrigin || stop.isReturn;
      const markerColor = stop.isOrigin ? '#10b981' : stop.isReturn ? '#6366f1' : '#0d9488';
      const badgeText = stop.isOrigin ? '🚩' : stop.isReturn ? '🏁' : `${stop.stopNumber}`;

      const iconHtml = `
        <div class="relative cursor-pointer group" style="width: 44px; height: 44px;">
          <div class="absolute -inset-1.5 rounded-full animate-pulse opacity-60" style="background-color: ${markerColor}"></div>
          <div class="relative w-10 h-10 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white text-white font-black text-xs transition-transform transform group-hover:scale-115" style="background-color: ${markerColor}">
            <span>${badgeText}</span>
          </div>
          <!-- Hover Tooltip -->
          <div class="absolute bottom-12 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center pointer-events-none z-50 whitespace-nowrap">
            <div class="bg-slate-950 text-white text-[11px] font-bold px-3 py-1 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-1.5">
              <span>${stop.placeName}</span>
            </div>
            <div class="w-2 h-2 bg-slate-950 rotate-45 -mt-1 border-r border-b border-slate-700"></div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'route-stop-marker',
        html: iconHtml,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      const marker = L.marker(stop.coordinates, { icon: customIcon });
      marker.on('click', () => {
        setSelectedStop(stop);
        map.setView(stop.coordinates, Math.max(map.getZoom(), 13), { animate: true });
      });

      markersLayer.addLayer(marker);
    });

    // Fit map bounds to encompass the entire route
    if (routeCoords.length > 0) {
      map.fitBounds(L.latLngBounds(routeCoords), { padding: [50, 50] });
    }
  }, [visitedStops, showAllPlaces, allDestinations]);

  // Recenter Route
  const handleRecenterRoute = () => {
    const map = mapInstanceRef.current;
    if (map && visitedStops.length > 0) {
      const bounds = L.latLngBounds(visitedStops.map(s => s.coordinates));
      map.fitBounds(bounds, { padding: [60, 60], animate: true });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner with Direct Google Maps Route Button */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-950 text-white border border-teal-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-black uppercase tracking-wider mb-1">
            <Route className="w-4 h-4 text-emerald-400" />
            <span>Interactive Google Maps Route & Circuit Hub</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            All Visited Places & Road Driving Routes
          </h2>
          <p className="text-xs text-teal-100/80 mt-1 max-w-xl leading-relaxed">
            Every destination is connected with realistic highway routes, turn-by-turn driving hours, road conditions, and 1-tap Google Maps GPS navigation links.
          </p>
        </div>

        {/* Global Google Maps Route Launch Button */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={multiStopGoogleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 hover:from-teal-500 hover:to-emerald-500 text-slate-950 font-black text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-teal-500/25 transition-all hover:scale-105"
          >
            <Compass className="w-4 h-4 text-slate-950" />
            <span>Open All Stops in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>

      {/* Map Card Container */}
      <div className="relative w-full h-[650px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 flex flex-col">
        
        {/* Top Controls Toolbar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          
          {/* Legend Summary Pill */}
          <div className="pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 flex items-center space-x-3 text-xs font-bold text-slate-800 dark:text-slate-100">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" />
              <span>Visited Route ({visitedStops.length - 2} Stops)</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
              <span>All Regional Places</span>
            </div>
          </div>

          {/* Map Controls */}
          <div className="pointer-events-auto flex items-center space-x-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
            {/* Satellite / Street Switcher */}
            <button
              onClick={() => setMapType(mapType === 'street' ? 'satellite' : 'street')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                mapType === 'satellite'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Toggle High-Resolution Satellite Map"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{mapType === 'satellite' ? 'Satellite View' : 'Street Map'}</span>
            </button>

            {/* Toggle Show All Places */}
            <button
              onClick={() => setShowAllPlaces(!showAllPlaces)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                showAllPlaces
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Toggle connector routes to all other attractions in the state"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showAllPlaces ? 'Routes to All Places: ON' : 'All Places: OFF'}</span>
            </button>

            {/* Recenter Route */}
            <button
              onClick={handleRecenterRoute}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Fit entire route on screen"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Leaflet Canvas */}
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Selected Stop Quick Info Card Drawer */}
        {selectedStop && selectedStop.destination && (
          <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-96 z-20 pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-start space-x-3.5">
              {/* Photo with Click to Enlarge */}
              <div 
                className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md cursor-pointer group"
                onClick={() => onOpenPhotoModal(selectedStop.destination!)}
                title="Click to view authentic original photograph"
              >
                <img
                  src={selectedStop.destination.image}
                  alt={selectedStop.destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white opacity-80 group-hover:opacity-100" />
                </div>
              </div>

              {/* Stop Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                    selectedStop.destination.isOffbeat ? 'bg-emerald-500 text-white' : 'bg-teal-600 text-white'
                  }`}>
                    {selectedStop.destination.isOffbeat ? 'Offbeat Gem' : 'Famous Sight'}
                  </span>
                  <button
                    onClick={() => setSelectedStop(null)}
                    className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate mt-1">
                  {selectedStop.destination.name}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {selectedStop.destination.cityOrDistrict}, {selectedStop.destination.stateName}
                </p>

                <div className="mt-2.5 flex items-center space-x-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStop.coordinates[0]},${selectedStop.coordinates[1]}&travelmode=driving`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 px-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold text-center flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Navigate (Google Maps)</span>
                  </a>

                  <button
                    onClick={() => onOpenPhotoModal(selectedStop.destination!)}
                    className="py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    View Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Day-by-Day Turn-by-Turn Road Legs & Driving Times */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
          <Car className="w-4 h-4" />
          <span>Turn-by-Turn Route Legs & Travel Times</span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
          Detailed Driving Segments Across All Visited Stops
        </h3>

        <div className="space-y-3">
          {plan.days.map((day, dIdx) => {
            const morningDest = day.slots[0]?.destination;
            const eveningDest = day.slots[2]?.destination;

            const googleMapsLegUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(day.travelRoute.from)}&destination=${encodeURIComponent(day.travelRoute.to)}&travelmode=driving`;

            return (
              <div 
                key={day.dayNumber}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 hover:border-teal-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-sm">
                    D{day.dayNumber}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {day.date} • Segment Route
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      {day.travelRoute.from} ➔ {day.travelRoute.to}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      🛣️ {day.travelRoute.distanceKm} km • ~{day.travelRoute.estimatedDrivingHours} hours driving • {day.travelRoute.roadCondition}
                    </div>
                  </div>
                </div>

                {/* Direct Google Maps Navigation Button */}
                <div className="flex items-center space-x-2 shrink-0">
                  <a
                    href={googleMapsLegUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs hover:border-teal-500 flex items-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <Compass className="w-3.5 h-3.5 text-teal-600" />
                    <span>Open Leg in Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
