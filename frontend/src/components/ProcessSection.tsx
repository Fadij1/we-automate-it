import React from 'react';
import { Search, Code2, Rocket } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Analyze & Audit',
    icon: Search,
    description: 'We audit your business operations to spot time-wasting manual bottlenecks and high-ROI automation targets.',
  },
  {
    step: '02',
    title: 'Architect & Build',
    icon: Code2,
    description: 'We engineer custom full-stack web portals and intelligent AI workflow pipelines tailored precisely to your needs.',
  },
  {
    step: '03',
    title: 'Deploy & Scale',
    icon: Rocket,
    description: 'We deploy the solutions live, train your team, and provide ongoing maintenance to ensure maximum reliability as you grow.',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-32 bg-[#2A2825] relative border-y border-[#3D3A36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F2EFE9] mb-6">
            Execution Protocol
          </h2>
          <p className="text-[#7D7466] text-lg leading-relaxed font-mono">
            A precise 3-step strategy designed for zero friction and rapid deployment. We handle the technical complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, idx) => {
            const IconComponent = s.icon;

            return (
              <div
                key={idx}
                className="matte-panel rounded-3xl p-10 relative group"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 rounded-2xl bg-brand-dark text-spark-start group-hover:scale-105 transition-transform shadow-md shadow-brand-dark/20">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-display font-bold text-4xl text-border-strong group-hover:text-[#7D7466] transition-colors">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#F2EFE9] mb-4">
                  {s.title}
                </h3>
                <p className="text-[#7D7466] leading-relaxed font-mono text-sm">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
