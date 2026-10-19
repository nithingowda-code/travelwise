import React, { useState } from 'react';
import { GeneratedYatraPlan } from '../types/yatra';
import { 
  CheckSquare, 
  Square, 
  FileCheck, 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink, 
  Sparkles,
  Download
} from 'lucide-react';

interface ChecklistsViewProps {
  plan: GeneratedYatraPlan;
}

export const ChecklistsView: React.FC<ChecklistsViewProps> = ({ plan }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Permits Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
          <FileCheck className="w-4 h-4" />
          <span>Official Permits & Regulatory Clearances</span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
          Required Permits for Your Route
        </h3>

        {plan.permitsRequired.length === 0 ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-800 dark:text-emerald-200 font-medium flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              ✓ No special Inner Line Permit (ILP) or Protected Area Permit (PAP) required for your chosen route. Standard government photo ID (Aadhaar / Passport / Voter ID) is sufficient at monument check-in.
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            {plan.permitsRequired.map((permit, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-extrabold text-amber-950 dark:text-amber-200 text-sm">
                    {permit.name}
                  </div>
                  <div className="text-amber-900/80 dark:text-amber-300/80 text-[11px] mt-0.5">
                    Issuing Authority: {permit.authority}
                  </div>
                  <div className="text-slate-500 mt-1">
                    Application Guideline: {permit.howToApply}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Estimated Govt Fee</div>
                  <div className="text-base font-black text-amber-600">₹{permit.feeINR} / person</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Packing Checklist */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
          <CheckSquare className="w-4 h-4" />
          <span>Smart Interactive Packing List</span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
          Essential Items for {plan.preferences.daysCount}-Day Journey
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {plan.packingList.map((item, idx) => {
            const isChecked = !!checkedItems[item];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleCheck(item)}
                className={`p-3.5 rounded-2xl border text-left text-xs transition-all flex items-start space-x-3 ${
                  isChecked
                    ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
                    : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-teal-500'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-teal-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  )}
                </div>
                <span className="leading-relaxed">{item}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
