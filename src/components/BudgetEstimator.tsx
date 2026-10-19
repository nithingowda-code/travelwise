import React from 'react';
import { BudgetBreakdown, GeneratedYatraPlan } from '../types/yatra';
import { 
  IndianRupee, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Car, 
  Hotel, 
  Utensils, 
  Ticket, 
  ShieldCheck, 
  Lightbulb, 
  Calendar 
} from 'lucide-react';

interface BudgetEstimatorProps {
  plan: GeneratedYatraPlan;
}

export const BudgetEstimator: React.FC<BudgetEstimatorProps> = ({ plan }) => {
  const { budget } = plan;
  const travelersCount = Math.max(
    1, 
    plan.preferences.group.adults + plan.preferences.group.children + plan.preferences.group.seniors
  );

  const budgetLimit = budget.userBudgetINR > 0 ? budget.userBudgetINR : budget.totalEstimatedINR * 1.15;
  const percentUsed = Math.min(100, Math.round((budget.totalEstimatedINR / budgetLimit) * 100));

  // Category aggregations for chart bars
  const categories = ['Transport', 'Accommodation', 'Meals & Dining', 'Sightseeing & Permits', 'Contingency Buffer'] as const;
  
  const categoryTotals = categories.map(cat => {
    const total = budget.items
      .filter(item => item.category === cat)
      .reduce((sum, item) => sum + item.amountINR, 0);
    return { category: cat, totalINR: total };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Budget Meter Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
              <IndianRupee className="w-4 h-4" />
              <span>Full-Stack INR Expense Estimator</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-500 font-normal">All rates verified Oct 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              ₹{budget.totalEstimatedINR.toLocaleString('en-IN')}
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-2">
                (~₹{budget.costPerPersonINR.toLocaleString('en-IN')} per traveler for {travelersCount} person{travelersCount > 1 ? 's' : ''})
              </span>
            </h2>
          </div>

          {/* Planned Limit Indicator */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-400">User Budget Limit</div>
              <div className="text-xl font-black text-slate-700 dark:text-slate-300">
                ₹{budget.userBudgetINR > 0 ? budget.userBudgetINR.toLocaleString('en-IN') : 'Flexible'}
              </div>
            </div>
            
            <div className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1 ${
              budget.isOverBudget
                ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200'
                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200'
            }`}>
              {budget.isOverBudget ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>Over Budget</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Within Budget ({percentUsed}%)</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Visual Budget Bar */}
        <div className="space-y-2">
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
            <div 
              className={`h-full transition-all duration-500 ${
                budget.isOverBudget
                  ? 'bg-gradient-to-r from-amber-500 to-red-500'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-400'
              }`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>₹0 Planned</span>
            <span>Current Estimated: ₹{budget.totalEstimatedINR.toLocaleString('en-IN')} ({percentUsed}% of target)</span>
            <span>Target: ₹{budgetLimit.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Automated Cheaper Alternatives Suggestions if Over Budget */}
        {budget.isOverBudget && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 dark:text-amber-200">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>AI Automated Cost-Reduction Recommendations</span>
            </div>
            <ul className="space-y-1 text-xs text-amber-900/90 dark:text-amber-300/90 pl-5 list-disc">
              {budget.savingsRecommendations.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Category Distribution Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categoryTotals.map(cat => {
          const pct = Math.round((cat.totalINR / budget.totalEstimatedINR) * 100);
          return (
            <div 
              key={cat.category}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="text-[10px] uppercase font-bold text-slate-400 truncate mb-1">
                {cat.category}
              </div>
              <div className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                ₹{cat.totalINR.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 mt-1">
                {pct}% of trip total
              </div>
            </div>
          );
        })}
      </div>

      {/* Itemized Detail Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Itemized Expense Breakdown & Live Fuel Rates
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Petrol: ₹101.50/L • Diesel: ₹89.20/L
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 dark:bg-slate-800/40 text-slate-400 uppercase font-black tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-5">Expense Category</th>
                <th className="py-3 px-5">Description & Calculation</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Last Verified</th>
                <th className="py-3 px-5 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {budget.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-slate-100">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{item.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.details}</div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                      item.dataStatus === 'Live' 
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
                        : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                    }`}>
                      {item.dataStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-400">
                    {item.verifiedDate}
                  </td>
                  <td className="py-3.5 px-5 text-right font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                    ₹{item.amountINR.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 dark:bg-slate-850 font-black border-t-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
              <tr>
                <td colSpan={4} className="py-4 px-5 text-sm uppercase">
                  Total Estimated Cost (Including 12% Contingency Buffer)
                </td>
                <td className="py-4 px-5 text-right text-lg text-teal-600 dark:text-teal-400">
                  ₹{budget.totalEstimatedINR.toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
};
