import { CrowdLevel, CrowdDataSource } from '../types';

export interface CrowdStyle {
  label: string;
  sublabel: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  dotColor: string;
  badgeBg: string;
  ringClass: string;
  hex: string;
}

export const CROWD_CONFIG: Record<CrowdLevel, CrowdStyle> = {
  low: {
    label: 'Low Crowd',
    sublabel: 'Ideal for a peaceful visit',
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
    badgeBg: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
    ringClass: 'ring-emerald-400',
    hex: '#10b981', // Emerald
  },
  moderate: {
    label: 'Moderate Crowd',
    sublabel: 'A balanced experience',
    color: 'amber',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    dotColor: 'bg-amber-500',
    badgeBg: 'bg-amber-500/10 text-amber-800 border-amber-300',
    ringClass: 'ring-amber-400',
    hex: '#f59e0b', // Amber
  },
  high: {
    label: 'High Crowd',
    sublabel: 'Expect some waiting',
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-800',
    dotColor: 'bg-orange-500',
    badgeBg: 'bg-orange-500/10 text-orange-800 border-orange-300',
    ringClass: 'ring-orange-400',
    hex: '#f97316', // Orange
  },
  very_high: {
    label: 'Very High Crowd',
    sublabel: 'Consider alternatives',
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500',
    badgeBg: 'bg-red-500/10 text-red-700 border-red-300',
    ringClass: 'ring-red-400',
    hex: '#ef4444', // Red
  },
};

export function getCrowdStyle(level: CrowdLevel): CrowdStyle {
  return CROWD_CONFIG[level] || CROWD_CONFIG.moderate;
}

export function formatCrowdDataSource(source: CrowdDataSource): { label: string; tooltip: string; badge: string } {
  switch (source) {
    case 'live':
      return {
        label: 'Live Sensor',
        tooltip: 'Real-time aggregated sensor and mobility feed',
        badge: 'bg-teal-100 text-teal-800 border-teal-300',
      };
    case 'historical_avg':
      return {
        label: 'Historical Average',
        tooltip: 'Aggregated historical density for this time of day',
        badge: 'bg-slate-100 text-slate-700 border-slate-300',
      };
    case 'ai_forecast':
      return {
        label: 'AI Forecast',
        tooltip: 'AI model prediction taking weather, day of week, and seasonality into account',
        badge: 'bg-indigo-100 text-indigo-700 border-indigo-300',
      };
    case 'demo_estimate':
    default:
      return {
        label: 'Demo crowd estimate',
        tooltip: 'Simulated demo crowd metrics for preview and planning',
        badge: 'bg-sky-100 text-sky-800 border-sky-300',
      };
  }
}

export function getBadgeColor(badge?: string): string {
  switch (badge) {
    case 'Quiet Escape':
      return 'bg-emerald-600 text-white shadow-sm';
    case 'Best Time to Visit':
      return 'bg-teal-600 text-white shadow-sm';
    case 'Crowd Alert':
      return 'bg-red-600 text-white shadow-sm';
    case 'Trending':
      return 'bg-indigo-600 text-white shadow-sm';
    case 'Hidden Gem':
      return 'bg-purple-600 text-white shadow-sm';
    default:
      return 'bg-slate-800 text-white';
  }
}
