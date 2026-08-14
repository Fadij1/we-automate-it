import React, { useState } from 'react';
import { Calculator, Clock, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(10);
  const [hourlyRate, setHourlyRate] = useState<number>(45);

  const weeklyWastedHours = teamSize * hoursPerWeek;
  const annualWastedHours = weeklyWastedHours * 52;
  const annualWastedCost = annualWastedHours * hourlyRate;

  // Assuming ~80% automation
  const annualSavings = Math.round(annualWastedCost * 0.8);
  const hoursReclaimed = Math.round(annualWastedHours * 0.8);

  return (
    <section id="roi-calculator" className="py-32 bg-[#1A1814] relative border-b border-[#3D3A36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F2EFE9] mb-6">
            Calculate Your ROI
          </h2>
          <p className="text-[#7D7466] text-lg leading-relaxed font-mono">
            See how much time and money your team is currently losing on repetitive manual work—and how much you could reclaim.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Sliders */}
          <div className="lg:col-span-7 matte-panel rounded-3xl p-8 sm:p-12 space-y-10">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-5 h-5 text-spark-start" />
              <h3 className="text-xl font-bold text-[#F2EFE9]">Adjust Parameters</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold font-mono">
                <span className="text-[#7D7466]">Team Size</span>
                <span className="text-[#F2EFE9] text-lg">{teamSize} people</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-2 bg-border-strong rounded-lg appearance-none cursor-pointer accent-[#D97736]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold font-mono">
                <span className="text-[#7D7466]">Manual Task Hours (per person/week)</span>
                <span className="text-[#F2EFE9] text-lg">{hoursPerWeek} hrs</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-border-strong rounded-lg appearance-none cursor-pointer accent-[#D97736]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold font-mono">
                <span className="text-[#7D7466]">Average Hourly Cost</span>
                <span className="text-[#F2EFE9] text-lg">${hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full h-2 bg-border-strong rounded-lg appearance-none cursor-pointer accent-[#D97736]"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 rounded-3xl p-10 bg-brand-dark text-brand-light shadow-xl shadow-brand-dark/20 border border-[rgba(255,255,255,0.05)] space-y-8">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-6">
              <span className="text-sm font-bold uppercase tracking-wider text-spark-start flex items-center gap-2 font-mono">
                <Sparkles className="w-4 h-4" />
                Projected Impact
              </span>
              <span className="text-xs text-[#7D7466] font-mono">80% Automation</span>
            </div>

            <div>
              <div className="text-sm text-[#7D7466] font-mono mb-2 uppercase">Estimated Annual Savings</div>
              <div className="text-5xl font-display font-bold text-white">
                ${annualSavings.toLocaleString()}
              </div>
              <div className="text-sm text-[#7D7466] mt-4 font-mono">
                Currently spending <span className="text-[#D94436] font-semibold">${annualWastedCost.toLocaleString()}/yr</span> on manual tasks.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[rgba(255,255,255,0.1)]">
              <div className="p-5 rounded-2xl bg-black/40 border border-[rgba(255,255,255,0.05)]">
                <div className="text-sm text-[#7D7466] flex items-center gap-2 mb-2 font-mono">
                  <Clock className="w-4 h-4 text-spark-end" />
                  Hours Reclaimed
                </div>
                <div className="text-2xl font-bold text-white">
                  {hoursReclaimed.toLocaleString()} <span className="text-sm font-normal text-[#7D7466]">hrs/yr</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-[rgba(255,255,255,0.05)]">
                <div className="text-sm text-[#7D7466] flex items-center gap-2 mb-2 font-mono">
                  <TrendingUp className="w-4 h-4 text-[#3E8E5A]" />
                  Productivity
                </div>
                <div className="text-2xl font-bold text-white">
                  +350%
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#D97736] hover:bg-[#C46A2E] text-white font-bold text-base transition mt-4"
            >
              <span>Get Your Automation Plan</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
