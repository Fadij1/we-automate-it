import React from 'react';
import { Globe, Bot, Zap, LayoutDashboard, ArrowUpRight, Check } from 'lucide-react';

const SERVICES = [
  {
    id: 'web-dev',
    title: 'Custom Website & WebApp Development',
    category: 'Full-Stack Web Engineering',
    icon: Globe,
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
    description:
      'We craft modern, ultra-responsive web applications tailored to your brand. From high-converting landing pages to complex client portals and web SaaS platforms.',
    features: [
      'React 18, TypeScript & Vite / Next.js',
      'Glassmorphism & dark-mode aesthetics',
      'Hardware-accelerated animations & 3D elements',
      'SEO optimized & mobile responsive',
    ],
  },
  {
    id: 'ai-agents',
    title: 'Autonomous AI Agents & Chatbots',
    category: 'LLM & Custom AI Integration',
    icon: Bot,
    color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
    description:
      'Deploy intelligent AI assistants trained on your internal documentation. Automate customer support, lead qualification, and document parsing 24/7.',
    features: [
      'Gemini & GPT-4 model fine-tuning',
      'RAG knowledge base embeddings',
      'Multi-channel web & messaging widgets',
      'Smart call-to-action routing',
    ],
  },
  {
    id: 'workflow',
    title: 'n8n Workflow & API Automation',
    category: 'Operations Engine',
    icon: Zap,
    color: 'from-rose-500/20 to-orange-500/20 text-rose-400 border-rose-500/30',
    description:
      'Eliminate repetitive manual data entry. We connect your existing software tools (HubSpot, Salesforce, Slack, Gmail, PostgreSQL) into unified automated pipelines.',
    features: [
      'Zero-latency webhook triggers',
      'Multi-step error handling & logs',
      'Custom API & database sync',
      'Save 20+ staff hours weekly',
    ],
  },
  {
    id: 'dashboards',
    title: 'Internal Tools & Data Cockpits',
    category: 'Business Intelligence',
    icon: LayoutDashboard,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    description:
      'Custom administrative dashboards and internal operations control panels built specifically around your core business logic and team workflows.',
    features: [
      'Real-time metrics & reporting',
      'Role-based access control',
      'Custom invoice & lead tracking',
      'Direct CRM & cloud database sync',
    ],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-4.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            Capabilities & Expertise
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Tailored Web & AI Solutions Built For <span className="text-gradient">Growth</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            We don't build cookie-cutter templates. We engineer custom digital products and automation engines built to scale your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                className="gradient-border-card p-8 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${service.color} border`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-2.5 mb-8">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-sm font-semibold text-indigo-300 group-hover:text-cyan-300 transition-colors"
                >
                  <span>Request Custom Proposal</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
