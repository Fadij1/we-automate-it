import React from 'react';
import { ArrowUpRight, BarChart3, Clock, Database } from 'lucide-react';

const STUDIES = [
  {
    id: 1,
    client: 'Acme Logistics',
    title: 'Automated Dispatch & Tracking System',
    metric: '+240%',
    metricLabel: 'Dispatch Efficiency',
    icon: Clock,
    color: '#D97736',
    description: 'We replaced 4 legacy Excel systems with a unified web dashboard and an automated dispatch API, saving 40 hours per week.',
    tags: ['Web App', 'API Integration', 'Dashboard'],
  },
  {
    id: 2,
    client: 'Nova Real Estate',
    title: 'AI Lead Qualification Agent',
    metric: '24/7',
    metricLabel: 'Lead Processing',
    icon: BarChart3,
    color: '#3E8E5A',
    description: 'An autonomous AI agent trained on their property database that qualifies leads via SMS and books calendar appointments instantly.',
    tags: ['AI Agent', 'Twilio', 'CRM Sync'],
  },
  {
    id: 3,
    client: 'Fintech Solutions Inc',
    title: 'Automated Data Extraction Pipeline',
    metric: '99.9%',
    metricLabel: 'Data Accuracy',
    icon: Database,
    color: '#D94436',
    description: 'A custom OCR pipeline that automatically extracts financial data from incoming PDFs and routes it to their internal ERP system.',
    tags: ['OCR', 'Automation', 'Python'],
  },
];

export const CaseStudies: React.FC = () => {
  return (
    <section id="case-studies" className="py-32 bg-[#2A2825] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F2EFE9] mb-6">
              Proven Architecture
            </h2>
            <p className="text-[#7D7466] text-lg leading-relaxed font-mono">
              See how our digital solutions have transformed operations for modern businesses.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#F2EFE9] font-bold hover:text-[#D97736] transition-colors border-b-2 border-transparent hover:border-[#D97736] pb-1 uppercase tracking-widest font-mono text-sm"
          >
            <span>Start your project</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {STUDIES.map((study) => {
            const IconComp = study.icon;
            return (
              <div
                key={study.id}
                className="group matte-panel rounded-3xl p-8 flex flex-col h-full relative overflow-hidden"
              >
                {/* Subtle color glow based on category */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-20"
                  style={{ backgroundColor: study.color }}
                />

                <div className="flex items-center gap-4 mb-8">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: study.color }}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#F2EFE9] font-mono uppercase tracking-wider">{study.client}</h4>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-4xl font-display font-bold text-[#F2EFE9] mb-1">
                    {study.metric}
                  </div>
                  <div className="text-sm font-semibold text-[#D97736] font-mono uppercase tracking-widest">
                    {study.metricLabel}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#F2EFE9] mb-4 leading-snug">
                  {study.title}
                </h3>
                
                <p className="text-[#7D7466] text-sm leading-relaxed mb-8 flex-grow font-mono">
                  {study.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-md bg-brand-dark/5 text-[#F2EFE9] text-[11px] font-bold uppercase tracking-widest font-mono border border-[#4D4944]/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
