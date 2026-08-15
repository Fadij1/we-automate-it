import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import {
  Boxes,
  Cpu,
  Shield,
  Clock,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Download,
  Flame,
  Code2,
  Bot,
  Zap,
  Database,
  Layers,
  FileCode
} from 'lucide-react';

interface TechPill {
  id: string;
  name: string;
  category: 'frontend' | 'ai' | 'automation' | 'database' | 'backend';
  icon: string;
  synergyBoost: number;
  buildTimeWeeks: number;
  securityPoints: number;
  description: string;
}

const TECH_LIBRARY: TechPill[] = [
  {
    id: 'tech-react',
    name: 'React 18 & TypeScript',
    category: 'frontend',
    icon: 'Code2',
    synergyBoost: 25,
    buildTimeWeeks: 1,
    securityPoints: 20,
    description: 'Type-safe UI component architecture with zero runtime state bugs.',
  },
  {
    id: 'tech-gemini',
    name: 'Gemini AI & GPT-4',
    category: 'ai',
    icon: 'Bot',
    synergyBoost: 30,
    buildTimeWeeks: 1,
    securityPoints: 25,
    description: 'Custom AI agent brain with RAG document knowledge embeddings.',
  },
  {
    id: 'tech-n8n',
    name: 'n8n Workflow Engine',
    category: 'automation',
    icon: 'Zap',
    synergyBoost: 25,
    buildTimeWeeks: 0.5,
    securityPoints: 20,
    description: '100+ app connectors for zero-latency background data relays.',
  },
  {
    id: 'tech-supa',
    name: 'PostgreSQL & Supabase',
    category: 'database',
    icon: 'Database',
    synergyBoost: 20,
    buildTimeWeeks: 0.5,
    securityPoints: 25,
    description: 'Real-time database with role-based access control and row security.',
  },
  {
    id: 'tech-tail',
    name: 'Tailwind CSS & Framer Motion',
    category: 'frontend',
    icon: 'Layers',
    synergyBoost: 15,
    buildTimeWeeks: 0.5,
    securityPoints: 10,
    description: 'Hardware-accelerated dark glassmorphism animations.',
  },
  {
    id: 'tech-py',
    name: 'Python FastAPI Microservice',
    category: 'backend',
    icon: 'FileCode',
    synergyBoost: 20,
    buildTimeWeeks: 1,
    securityPoints: 20,
    description: 'Asynchronous Python backend optimized for LLM orchestrations.',
  },
];

export const TechStackSimulatorGame: React.FC = () => {
  const [selectedTechs, setSelectedTechs] = useState<TechPill[]>([]);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const totalSynergy = Math.min(
    selectedTechs.reduce((acc, t) => acc + t.synergyBoost, 0),
    100
  );
  const totalWeeks = Math.max(
    selectedTechs.reduce((acc, t) => acc + t.buildTimeWeeks, 0),
    1
  );
  const totalSecurity = Math.min(
    selectedTechs.reduce((acc, t) => acc + t.securityPoints, 0),
    100
  );

  const handleAddTech = (tech: TechPill) => {
    if (selectedTechs.some((t) => t.id === tech.id)) return;
    soundManager.playSuccessChime();
    const updated = [...selectedTechs, tech];
    setSelectedTechs(updated);

    if (updated.length >= 4) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#6366f1', '#a855f7'],
      });
    }
  };

  const handleRemoveTech = (techId: string) => {
    soundManager.playErrorSound();
    setSelectedTechs(selectedTechs.filter((t) => t.id !== techId));
  };

  const handleReset = () => {
    soundManager.playErrorSound();
    setSelectedTechs([]);
  };

  const renderTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Bot':
        return <Bot className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'Database':
        return <Database className="w-4 h-4" />;
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      case 'FileCode':
        return <FileCode className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/10 p-6 md:p-8 relative overflow-hidden shadow-2xl mt-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
            <Boxes className="w-3.5 h-3.5" />
            <span>Interactive Game 3</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            Tech Stack & Quote Simulator
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Drag or click technology modules to build your custom project architecture and preview real-time specs!
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Stack</span>
        </button>
      </div>

      {/* Real-time Architecture Metrics */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Stack Synergy</div>
            <div className="text-lg md:text-2xl font-bold text-purple-300">
              {totalSynergy}% <span className="text-xs font-normal text-slate-400">Synergy</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Estimated Timeline</div>
            <div className="text-lg md:text-2xl font-bold text-cyan-300">
              {totalWeeks} <span className="text-xs font-normal text-slate-400">weeks</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Security Index</div>
            <div className="text-lg md:text-2xl font-bold text-emerald-400">
              {totalSecurity}/100
            </div>
          </div>
        </div>
      </div>

      {/* Available Tech Module Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Available Palette */}
        <div className="lg:col-span-7">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Select Tech Modules for Your Custom Build</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TECH_LIBRARY.map((tech) => {
              const isSelected = selectedTechs.some((t) => t.id === tech.id);

              return (
                <div
                  key={tech.id}
                  draggable={!isSelected}
                  onDragStart={() => {
                    soundManager.playPickupSound();
                    setActiveDragId(tech.id);
                  }}
                  onClick={() => {
                    if (isSelected) handleRemoveTech(tech.id);
                    else handleAddTech(tech);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${isSelected
                    ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-white/10 hover:border-cyan-500/40'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-white/5 text-cyan-300">
                        {renderTechIcon(tech.icon)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{tech.name}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{tech.description}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Container Target Canvas */}
        <div className="lg:col-span-5">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Project Architecture Container</span>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (activeDragId) {
                const tech = TECH_LIBRARY.find((t) => t.id === activeDragId);
                if (tech) handleAddTech(tech);
              }
            }}
            className="min-h-[260px] rounded-xl border-2 border-dashed border-cyan-500/50 bg-slate-900/80 p-4 flex flex-col justify-between"
          >
            {selectedTechs.length === 0 ? (
              <div className="my-auto text-center py-8 text-slate-500 text-xs">
                Drag or click technology modules on the left to populate your architecture container.
              </div>
            ) : (
              <div className="space-y-2">
                {selectedTechs.map((tech) => (
                  <motion.div
                    key={tech.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="p-2.5 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-between text-xs text-white"
                  >
                    <div className="flex items-center gap-2">
                      {renderTechIcon(tech.icon)}
                      <span className="font-semibold">{tech.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveTech(tech.id)}
                      className="text-slate-400 hover:text-red-400 text-xs px-1"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTechs.length > 0 && (
              <div className="pt-4 border-t border-white/10 mt-4">
                <a
                  href="#contact"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Request Custom Quote For This Stack</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
