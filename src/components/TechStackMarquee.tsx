import React from 'react';
import {
  Cpu,
  Bot,
  Code2,
  Database,
  Layers,
  Zap,
  Server,
  Terminal,
  ShieldCheck,
  Boxes,
} from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  icon: React.ElementType;
  color: string;
}

const TECH_STACK: TechItem[] = [
  { name: 'Google Gemini', category: 'LLM & Multimodal AI', icon: Bot, color: 'text-cyan-400' },
  { name: 'OpenAI GPT-4o', category: 'Generative AI', icon: Cpu, color: 'text-emerald-400' },
  { name: 'React & Next.js', category: 'Frontend Architecture', icon: Code2, color: 'text-cyan-300' },
  { name: 'TypeScript', category: 'Type-Safe Code', icon: Terminal, color: 'text-indigo-400' },
  { name: 'n8n Automations', category: 'Workflow Pipelines', icon: Zap, color: 'text-rose-400' },
  { name: 'Python & FastAPI', category: 'AI Backend & APIs', icon: Server, color: 'text-amber-400' },
  { name: 'PostgreSQL', category: 'Relational DB', icon: Database, color: 'text-sky-400' },
  { name: 'Supabase', category: 'Real-time Backend', icon: Layers, color: 'text-emerald-300' },
  { name: 'TailwindCSS', category: 'Design System', icon: Layers, color: 'text-cyan-400' },
  { name: 'Docker', category: 'Containerization', icon: Boxes, color: 'text-indigo-300' },
  { name: 'Claude 3.5 Sonnet', category: 'Reasoning AI', icon: ShieldCheck, color: 'text-purple-400' },
];

export const TechStackMarquee: React.FC = () => {
  return (
    <div className="w-full bg-slate-950/80 border-y border-white/5 py-6 overflow-hidden relative backdrop-blur-md">
      {/* Gradient Edge Masks for Smooth Fade Out */}
      <div className="absolute top-0 left-0 w-24 sm:w-40 h-full bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 sm:w-40 h-full bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />

      {/* Marquee Ticker Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 items-center">
        {/* Render twice for seamless continuous infinite loop */}
        {[...TECH_STACK, ...TECH_STACK].map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all group shrink-0"
            >
              <div className="p-1.5 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">
                <Icon className={`w-4 h-4 ${tech.color}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200 tracking-wide font-display">
                  {tech.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {tech.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
