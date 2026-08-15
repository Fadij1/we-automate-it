import React from 'react';
import { Search, Code2, Rocket, Target, Eye, ShieldCheck, Zap, Award } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Analyze & Audit',
    icon: Search,
    description: 'We audit your business operations to spot time-wasting manual bottlenecks and high-ROI automation targets.',
    color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30',
  },
  {
    step: '02',
    title: 'Architect & Build',
    icon: Code2,
    description: 'We engineer custom full-stack React web apps, Gemini AI agents, and robust n8n backend pipelines tailored to your needs.',
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
  },
  {
    step: '03',
    title: 'Deploy & Scale',
    icon: Rocket,
    description: 'We deploy the solutions live, train your team, and provide ongoing maintenance to ensure maximum reliability as you grow.',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-16 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block py-1 px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            Proven Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            How We Transform Your <span className="text-gradient">Operations</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            A simple 3-step strategy designed for zero friction and rapid deployment.
          </p>
        </div>

        {/* Process Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-12">
          {STEPS.map((s, idx) => {
            const IconComponent = s.icon;

            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-8 border border-white/10 relative hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${s.color} border`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-display font-extrabold text-3xl text-slate-600 group-hover:text-cyan-400 transition-colors font-mono">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light">{s.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mission & Vision Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="glass-panel rounded-2xl p-8 border border-white/10 hover:border-indigo-500/50 transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gradient">Our Mission</h3>
                <p className="text-xs text-slate-400">Reclaiming time through intelligence</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
              Our mission is to empower businesses to reclaim time, eliminate repetitive manual labor, and unlock scalable leverage by delivering custom web applications and intelligent AI workflow agents.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                Efficiency
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                Scalability
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
                Innovation
              </span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="glass-panel rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gradient-cyan">Our Vision</h3>
                <p className="text-xs text-slate-400">Leading the next era of automation</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
              Our vision is to be a premier global partner for forward-thinking companies—making custom AI agents and full-stack automated architectures accessible, robust, and central to every growth strategy.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
                Leadership
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                Reliability
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                Transformation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
