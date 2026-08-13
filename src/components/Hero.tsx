import React, { useState, useEffect } from 'react';
import { HeroCanvas3D } from './HeroCanvas3D';
import { Sparkles, Gamepad2, ArrowRight, Bot, Cpu, Code2, Globe, Terminal, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const [codeIndex, setCodeIndex] = useState(0);
  const codeLines = [
    '// Prompt: "Qualify lead and dispatch to sales"',
    'const agent = await Gemini.createAgent({',
    '  model: "gemini-1.5-flash",',
    '  tools: ["n8n-webhook-relay", "crm-sync"]',
    '});',
    'const result = await agent.runWorkflow(leadData);',
    '// n8n Payload Output: Status 200 OK 🟢',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCodeIndex((prev) => (prev + 1) % (codeLines.length + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [codeLines.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-brand-darker via-brand-dark to-brand-dark">
      {/* 3D Visual Particle Canvas */}
      <HeroCanvas3D />

      {/* Glow Orbs Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-accent/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-brand-cyan/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 py-1.5 px-4.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-500/30 backdrop-blur-md mb-8 animate-fade-in shadow-lg shadow-indigo-500/10">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-indigo-200">
            Next-Gen Custom WebApps & AI Automation Studio
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-6 leading-[1.1] text-white">
          We Automate Your Business <br />
          With <span className="text-gradient">Custom WebApps & AI Agents</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-light">
          Stop losing hours to repetitive manual click-work. We engineer slick high-performance web platforms, custom GPT/Gemini agents, and n8n workflow pipelines that run your business on autopilot.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#games"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            <Gamepad2 className="w-5 h-5 text-cyan-200 animate-bounce" />
            <span>Play n8n Drag & Drop Demos</span>
          </a>

          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-panel hover:bg-white/10 text-white font-semibold text-base border border-white/15 hover:border-indigo-400/50 transition-all duration-300"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-5 h-5 text-slate-400" />
          </a>
        </div>

        {/* Floating Live Code Typewriter Showcase Card */}
        <div className="max-w-2xl mx-auto mb-16 text-left">
          <div className="gradient-border-card p-4 sm:p-6 shadow-2xl overflow-hidden relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300 font-semibold">live-automation-engine.ts</span>
              </div>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Execution Active
              </span>
            </div>

            <pre className="text-xs sm:text-sm font-mono text-cyan-300 space-y-1.5 overflow-x-auto leading-relaxed">
              {codeLines.slice(0, codeIndex + 1).map((line, idx) => (
                <div key={idx} className={line.startsWith('//') ? 'text-slate-500 italic' : line.includes('Status 200') ? 'text-emerald-400 font-bold' : 'text-indigo-200'}>
                  {line}
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* Metric Counter Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl glass-panel border border-white/5 hover:border-indigo-500/40 transition duration-300 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Full-Stack WebApps</div>
              <div className="text-xs text-slate-400">React & TypeScript</div>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-white/5 hover:border-purple-500/40 transition duration-300 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">AI Autonomous Agents</div>
              <div className="text-xs text-slate-400">GPT-4 & Gemini AI</div>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-white/5 hover:border-cyan-500/40 transition duration-300 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">n8n Workflows</div>
              <div className="text-xs text-slate-400">100+ Apps Integrated</div>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-white/5 hover:border-emerald-500/40 transition duration-300 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Modern Dashboards</div>
              <div className="text-xs text-slate-400">Real-time Analytics</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
