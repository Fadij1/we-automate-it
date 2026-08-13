import React from 'react';
import { TrendingUp, ArrowRight, Building2, ShoppingCart, Truck, Check } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 'case-1',
    client: 'Global E-Commerce Retailer',
    industry: 'Retail & E-Commerce',
    icon: ShoppingCart,
    color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
    metrics: [
      { label: 'Support Queue Auto-Resolved', value: '85%' },
      { label: 'Annual Labor Cost Saved', value: '$180,000' },
      { label: 'Customer Response Time', value: '< 5 Seconds' },
    ],
    solution: 'Built custom 24/7 Gemini AI Support Assistant integrated with Shopify API & Zendesk.',
  },
  {
    id: 'case-2',
    client: 'Fintech SaaS Platform',
    industry: 'Financial Technology',
    icon: Building2,
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
    metrics: [
      { label: 'Lead Triage Speed', value: '10x Faster' },
      { label: 'Sales Conversion Rate', value: '+320%' },
      { label: 'Manual Copying Hours', value: '0 hrs/wk' },
    ],
    solution: 'Engineered high-performance React web portal with n8n automated CRM lead distribution.',
  },
  {
    id: 'case-3',
    client: 'Logistics Fleet Operator',
    industry: 'Freight & Logistics',
    icon: Truck,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    metrics: [
      { label: 'Dispatch Errors', value: '0%' },
      { label: 'Hours Reclaimed / Week', value: '45 hrs/wk' },
      { label: 'ROI Payback Period', value: '< 30 Days' },
    ],
    solution: 'Deployed custom admin dashboard and multi-app n8n database webhook relays.',
  },
];

export const CaseStudies: React.FC = () => {
  return (
    <section id="case-studies" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            Proven Success Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Real Client Impact & <span className="text-gradient">Results</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            See how We Automate It transformed operations and unlocked massive ROI for industry leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => {
            const IconComp = study.icon;

            return (
              <div
                key={study.id}
                className="glass-panel rounded-2xl p-8 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${study.color} border`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {study.industry}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {study.client}
                  </h3>

                  {/* Metrics Box */}
                  <div className="space-y-3 mb-6 p-4 rounded-xl bg-slate-900/80 border border-white/5 font-mono">
                    {study.metrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">{m.label}:</span>
                        <span className="text-emerald-400 font-bold text-sm">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6 font-light">
                    {study.solution}
                  </p>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-xs font-semibold text-indigo-300 group-hover:text-cyan-300 transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
