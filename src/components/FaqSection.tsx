import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How fast can you build and deploy our custom AI agent or web app?',
    answer:
      'Most custom web applications, autonomous AI agents, and n8n workflow pipelines are fully architected, rigorously tested, and deployed live in **1 to 3 weeks**. We prioritize agile sprints so your team sees operational value immediately.',
    category: 'Timeline & Delivery',
  },
  {
    question: 'Do we own 100% of the code and IP?',
    answer:
      '**Yes, 100%**. You receive complete, unrestricted ownership of all source code, API keys, database schemas, and workflow pipelines with **zero vendor lock-in**. We deploy directly to your private cloud infrastructure.',
    category: 'Ownership & Security',
  },
  {
    question: 'Can you connect to our existing tools (HubSpot, Slack, PostgreSQL, Stripe, Shopify)?',
    answer:
      'Yes! We seamlessly integrate your entire existing ecosystem—including **HubSpot, Salesforce, Slack, Gmail, PostgreSQL, MySQL, Stripe, Shopify, QuickBooks, and custom REST/GraphQL APIs**—into automated real-time data pipelines.',
    category: 'Integrations & Stack',
  },
  {
    question: 'What AI models do you support?',
    answer:
      'We build production systems using **Google Gemini 1.5 Pro & Flash**, **OpenAI GPT-4o**, **Claude 3.5 Sonnet**, and private on-premise open-weight models like **Meta Llama 3** for strict data privacy and compliance needs.',
    category: 'AI Architecture',
  },
  {
    question: 'How does ongoing support and workflow maintenance work?',
    answer:
      'We provide dedicated post-launch monitoring, automated error-catching triggers, schema updates, and prompt fine-tuning to guarantee your automated operations maintain **99.9% uptime** as your business scales.',
    category: 'Maintenance & Scale',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-brand-darker relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Frequently Asked Questions</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Everything You Need To <span className="text-gradient">Know</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Have questions about how Spark Flow builds custom web apps and automates business workflows? Find instant answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                  ? 'border-cyan-500/40 shadow-xl shadow-cyan-950/30 bg-slate-900/90'
                  : 'border-white/10 hover:border-white/20 bg-slate-900/60'
                  }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      0{index + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white font-display">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${isOpen
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 rotate-180'
                      : 'bg-white/5 text-slate-400 border-white/10'
                      }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5 font-light">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: faq.answer.replace(
                              /\*\*([^*]+)\*\*/g,
                              '<strong class="text-cyan-200 font-semibold">$1</strong>'
                            ),
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Need More Details Card */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a specific custom project in mind?</h4>
              <p className="text-xs text-slate-400">Our engineers will evaluate your architecture and provide a custom roadmap.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5 shrink-0"
          >
            <span>Ask Our Engineers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
