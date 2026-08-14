import React from 'react';
import { Globe, Bot, Zap, LayoutDashboard, ArrowRight, Check } from 'lucide-react';

const SERVICES = [
  {
    id: 'web-dev',
    title: 'Custom Web Applications',
    category: 'Engineering',
    icon: Globe,
    description:
      'We craft modern, ultra-responsive web applications. From high-converting landing pages to complex client portals, everything is built to scale without bloat.',
    features: [
      'React, TypeScript & Modern Architecture',
      'Matte, cinematic aesthetics',
      'Fluid interactive animations',
      'Flawless mobile responsiveness',
    ],
  },
  {
    id: 'ai-agents',
    title: 'Autonomous AI Agents',
    category: 'Intelligence',
    icon: Bot,
    description:
      'Intelligent assistants trained on your internal data. Automate customer support, qualify leads, and extract data from documents 24/7 with zero human oversight.',
    features: [
      'Custom LLM Integration',
      'Trained on your business documents',
      'Multi-channel deployment',
      'Smart escalation routing',
    ],
  },
  {
    id: 'workflow',
    title: 'Workflow Automation',
    category: 'Operations',
    icon: Zap,
    description:
      'Eliminate repetitive manual data entry. We connect your existing software tools into unified pipelines that run silently in the background.',
    features: [
      'Instant data synchronization',
      'Error-free background processing',
      'Custom API integrations',
      'Save hundreds of staff hours',
    ],
  },
  {
    id: 'dashboards',
    title: 'Internal Dashboards',
    category: 'Management',
    icon: LayoutDashboard,
    description:
      'Custom administrative control panels built specifically around your core business logic. Get complete visibility into your automated operations.',
    features: [
      'Real-time business metrics',
      'Secure access control',
      'Automated reporting generation',
      'Unified data views',
    ],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#1A1814] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F2EFE9] mb-6">
            Pristine Software Capabilities
          </h2>
          <p className="text-[#7D7466] text-lg leading-relaxed font-mono">
            We engineer custom digital products and automation engines built to scale your business effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                className="matte-panel p-10 rounded-3xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-4 rounded-2xl bg-brand-dark text-brand-light shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-4 py-1.5 rounded-full bg-brand-dark text-brand-light font-mono">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#F2EFE9] mb-4">
                    {service.title}
                  </h3>

                  <p className="text-[#7D7466] leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#F2EFE9] font-medium font-mono">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-[#3E8E5A]/20 text-[#3E8E5A] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#F2EFE9] group-hover:text-spark-start transition-colors uppercase tracking-widest font-mono"
                >
                  <span>Discuss your project</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
