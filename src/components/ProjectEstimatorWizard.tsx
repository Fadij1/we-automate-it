import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sliders,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Globe,
  Database,
  Shield,
  CreditCard,
  Bot,
  ArrowRight,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface OptionItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  estDays: number;
}

const PROJECT_TYPES: OptionItem[] = [
  {
    id: 'ai_agent',
    name: 'Autonomous AI Agent / Chatbot',
    desc: 'Customer support, automated lead qualification, and RAG knowledge bases.',
    icon: Bot,
    estDays: 7,
  },
  {
    id: 'webapp',
    name: 'Custom Web Application',
    desc: 'Bespoke React/Next.js platforms with custom UX, authentication, and APIs.',
    icon: Globe,
    estDays: 14,
  },
  {
    id: 'n8n_pipeline',
    name: 'n8n Workflow Automation Engine',
    desc: 'Multi-app pipelines connecting CRM, accounting, forms, and cloud databases.',
    icon: Zap,
    estDays: 6,
  },
  {
    id: 'dashboard',
    name: 'Internal Tools & Admin Portal',
    desc: 'Custom business intelligence cockpits, role permissions, and metrics.',
    icon: Layers,
    estDays: 10,
  },
];

const FEATURE_MODULES: OptionItem[] = [
  {
    id: 'auth',
    name: 'User Auth & Role Permissions',
    desc: 'Secure JWT/OAuth, role-based dashboards, session management.',
    icon: Shield,
    estDays: 2,
  },
  {
    id: 'payments',
    name: 'Stripe & Subscription Billing',
    desc: 'Checkout sessions, automated invoices, webhooks, and recurring plans.',
    icon: CreditCard,
    estDays: 2,
  },
  {
    id: 'db_sync',
    name: 'Cloud Database Architecture',
    desc: 'PostgreSQL, Supabase, real-time sync, automated backups.',
    icon: Database,
    estDays: 3,
  },
  {
    id: 'ai_rag',
    name: 'Custom AI Fine-Tuning & RAG',
    desc: 'Vector embeddings, company knowledge documents, custom prompt guardrails.',
    icon: Cpu,
    estDays: 3,
  },
  {
    id: 'integrations',
    name: 'Multi-Tool API Connectors',
    desc: 'HubSpot, Salesforce, Slack, Gmail, Shopify, QuickBooks webhooks.',
    icon: Zap,
    estDays: 2,
  },
];

export const ProjectEstimatorWizard: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('ai_agent');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['auth', 'db_sync', 'ai_rag']);

  const toggleFeature = (id: string) => {
    soundManager.playPickupSound();
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Calculate estimated timeline
  const baseDays = PROJECT_TYPES.find((t) => t.id === selectedType)?.estDays || 7;
  const featureDays = selectedFeatures.reduce((acc, featId) => {
    const feat = FEATURE_MODULES.find((f) => f.id === featId);
    return acc + (feat?.estDays || 0);
  }, 0);

  const totalEstimatedDays = Math.max(7, Math.round(baseDays + featureDays * 0.7));
  const selectedTypeName = PROJECT_TYPES.find((t) => t.id === selectedType)?.name || '';

  const handleApplyToContact = () => {
    soundManager.playSuccessChime();
    const featureNames = selectedFeatures
      .map((fId) => FEATURE_MODULES.find((f) => f.id === fId)?.name)
      .filter(Boolean)
      .join(', ');

    const specMessage = `Project Scope Configurator Specification:\n- Solution Type: ${selectedTypeName}\n- Selected Modules: ${featureNames}\n- Target Timeline: ~${totalEstimatedDays} Business Days\n\nWe would like to review this custom architecture roadmap with the Spark Flow engineering team.`;

    window.dispatchEvent(
      new CustomEvent('sparkflow:prefill_contact', {
        detail: {
          scope: selectedTypeName,
          message: specMessage,
        },
      })
    );

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="my-16 rounded-2xl p-6 sm:p-10 glass-panel border border-cyan-500/30 bg-slate-950/80 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive Project Configurator</span>
        </span>
        <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Architect Your Solution & Estimate Timeline
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Select your core platform and desired modules to generate an instant architecture blueprint.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step 1 & 2: Selectors (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Solution Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">
                1
              </span>
              Select Primary Architecture
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      soundManager.playPickupSound();
                      setSelectedType(type.id);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                        : 'border-white/10 hover:border-white/20 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-white/5 text-cyan-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div className="text-xs font-bold text-white mb-1 font-display">{type.name}</div>
                    <div className="text-[11px] text-slate-400 leading-snug">{type.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Feature Modules */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px]">
                2
              </span>
              Select Key System Modules
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURE_MODULES.map((feat) => {
                const Icon = feat.icon;
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'border-indigo-500/60 bg-indigo-500/10 shadow-md shadow-indigo-950/30'
                        : 'border-white/10 hover:border-white/20 bg-slate-900/60'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        isChecked ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{feat.name}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{feat.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 3: Generated Blueprint Summary (Right 5 cols) */}
        <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-cyan-950/80 border border-cyan-500/30 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Architecture Blueprint
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Ready To Deploy
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Estimated Deployment Sprints
                </span>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1 flex items-baseline gap-2">
                  <span className="text-gradient-cyan">~{totalEstimatedDays} Days</span>
                  <span className="text-xs text-slate-400 font-normal">from kickoff</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-slate-200">Recommended Tech Stack:</div>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Next.js / React
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Gemini 1.5 Pro
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    PostgreSQL
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    n8n Engine
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center gap-2 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>100% Client Source Code & IP Ownership</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Direct Integration with your existing APIs</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>30-Day Post-Launch SLA Warranty</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleApplyToContact}
            className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Send Spec & Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
