import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, TrendingUp } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  metric: string;
  metricLabel: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Spark Flow built an autonomous Gemini AI customer triage agent and n8n backend that instantly reduced our support response times from 4 hours to 30 seconds. It paid for itself in less than 3 weeks.',
    author: 'Marcus Vance',
    role: 'Head of Operations',
    company: 'LogiFlow Global',
    industry: 'Supply Chain & Logistics',
    metric: '32 hrs/wk',
    metricLabel: 'Saved across our support desk',
  },
  {
    quote:
      'The custom React admin cockpit and automated payment ledger they engineered completely eliminated our manual invoice reconciliation errors. Their speed and code quality are unmatched.',
    author: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'AuraPay FinTech',
    industry: 'Financial SaaS',
    metric: '99.9%',
    metricLabel: 'Automated invoice accuracy',
  },
  {
    quote:
      'We had complex Shopify inventory syncing requirements across 4 international warehouses. Spark Flow delivered a bulletproof n8n pipeline in under 12 days. Truly top-tier engineering.',
    author: 'David Chen',
    role: 'VP of Technology',
    company: 'OmniVogue Brands',
    industry: 'Global E-Commerce',
    metric: '4.8x',
    metricLabel: 'Faster inventory sync speed',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    soundManager.playPickupSound();
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    soundManager.playPickupSound();
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 bg-brand-dark relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 py-1 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Proven Client Results</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Trusted By High-Growth <span className="text-gradient">Founders</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            See how our custom web applications and autonomous AI agents drive measurable ROI.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="relative glass-panel rounded-2xl border border-white/15 bg-slate-900/80 p-8 sm:p-12 shadow-2xl overflow-hidden">
          <Quote className="absolute top-6 right-8 w-20 h-20 text-white/[0.03] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Testimonial Quote & Info (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-mono font-bold text-slate-400">
                    5.0 Verified Review
                  </span>
                </div>

                <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-light italic">
                  "{current.quote}"
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                    {current.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm font-display">
                      {current.author}
                    </div>
                    <div className="text-xs text-slate-400">
                      {current.role} • <span className="text-cyan-400">{current.company}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric Impact Pill (4 cols) */}
              <div className="lg:col-span-4 rounded-xl p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-cyan-950/80 border border-cyan-500/30 text-center space-y-2">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Verified Outcome
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-cyan-300">
                  {current.metric}
                </div>
                <p className="text-xs text-slate-300 font-light">{current.metricLabel}</p>
                <div className="pt-2 text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  {current.industry}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    soundManager.playPickupSound();
                    setCurrentIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
