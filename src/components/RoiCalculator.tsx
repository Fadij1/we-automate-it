import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(10);
  const [hourlyRate, setHourlyRate] = useState<number>(45);

  // Math Calculations
  const weeklyWastedHours = teamSize * hoursPerWeek;
  const annualWastedHours = weeklyWastedHours * 52;
  const annualWastedCost = annualWastedHours * hourlyRate;

  // Assuming We Automate It automates ~80% of repetitive tasks
  const annualSavings = Math.round(annualWastedCost * 0.8);
  const hoursReclaimed = Math.round(annualWastedHours * 0.8);

  return (
    <section id="roi-calculator" className="py-24 bg-brand-darker relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            Interactive Simulator
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Calculate Your Business <span className="text-gradient">Savings</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            See how much time and money your team is currently losing on repetitive manual work—and how much you reclaim with We Automate It.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Sliders (Left Column) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-8 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Input Team Parameters</h3>
            </div>

            {/* Slider 1: Team Size */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Team Size (Employees)</span>
                <span className="text-indigo-400 font-mono text-base font-bold">{teamSize} people</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>1 person</span>
                <span>50 people</span>
              </div>
            </div>

            {/* Slider 2: Manual Hours */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Manual Task Hours (per person / week)</span>
                <span className="text-cyan-400 font-mono text-base font-bold">{hoursPerWeek} hrs/wk</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>2 hrs/wk</span>
                <span>30 hrs/wk</span>
              </div>
            </div>

            {/* Slider 3: Hourly Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Average Hourly Employee Cost</span>
                <span className="text-emerald-400 font-mono text-base font-bold">${hourlyRate} / hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>$20/hr</span>
                <span>$150/hr</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box (Right Column) */}
          <div className="lg:col-span-5 rounded-2xl p-8 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Projected Impact
              </span>
              <span className="text-xs text-slate-400 font-mono">80% Automation Rate</span>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Estimated Annual Savings</div>
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-emerald-400 mt-1">
                ${annualSavings.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Currently spending <span className="text-red-400 font-semibold">${annualWastedCost.toLocaleString()}/yr</span> on manual tasks.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Hours Reclaimed
                </div>
                <div className="text-2xl font-bold text-white mt-1">
                  {hoursReclaimed.toLocaleString()} <span className="text-xs font-normal text-slate-400">hrs/yr</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  Productivity Boost
                </div>
                <div className="text-2xl font-bold text-indigo-300 mt-1">
                  +350%
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition"
            >
              <span>Claim Your Automation Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
