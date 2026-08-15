import React from 'react';
import { HeroCanvas3D } from './HeroCanvas3D';
import { Sparkles, Gamepad2, ArrowRight, Bot, Cpu, Code2, Globe, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Hero: React.FC = () => {
  const triggerHeroConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#6366f1', '#ec4899', '#38bdf8'],
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-brand-darker bg-grid-pattern">
      {/* 3D Interactive Constellation Particle Canvas */}
      <HeroCanvas3D />

      {/* Sci-Fi Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-cyan-500/15 border border-indigo-500/30 backdrop-blur-md mb-8 animate-fade-in shadow-lg shadow-cyan-500/5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs sm:text-sm font-bold tracking-wide text-cyan-200">
            Next-Gen Custom WebApps & AI Automation Studio
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-6 leading-[1.1] text-white">
          Automate & Scale Your Business <br />
          With <span className="text-gradient">Spark Flow</span> AI & WebApps
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-light">
          Stop wasting time on repetitive manual work. We engineer bespoke high-performance web platforms, autonomous AI workflow agents, and n8n pipelines that run your business on autopilot.
        </p>

        {/* Action Buttons - Clear Conversion Hierarchy */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('sparkflow:open_booking_modal'));
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-base shadow-2xl shadow-cyan-500/30 hover:-translate-y-0.5 hover:shadow-cyan-500/40 transition-all duration-300 cursor-pointer"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-5 h-5 text-cyan-200" />
          </button>

          <a
            href="#ai-sandbox"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-panel-glow hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-base border border-white/20 hover:border-cyan-400/60 transition-all duration-300"
          >
            <Bot className="w-5 h-5 text-cyan-400" />
            <span>Try AI Agent Sandbox</span>
          </a>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl glass-panel border border-white/10 hover:border-indigo-500/50 transition duration-300 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Full-Stack WebApps</div>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-white/10 hover:border-purple-500/50 transition duration-300 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">AI Autonomous Agents</div>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-white/10 hover:border-cyan-500/50 transition duration-300 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Automated Workflows</div>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-white/10 hover:border-emerald-500/50 transition duration-300 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Modern Dashboards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
