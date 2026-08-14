import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Boxes,
  Clock,
  RotateCcw,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';

interface FeaturePill {
  id: string;
  name: string;
  category: 'web' | 'ai' | 'automation';
  impactBoost: number;
  buildTimeWeeks: number;
  description: string;
}

const FEATURE_LIBRARY: FeaturePill[] = [
  {
    id: 'feat-1',
    name: 'Custom Web Portal',
    category: 'web',
    impactBoost: 30,
    buildTimeWeeks: 2,
    description: 'A pristine, responsive website to attract and convert high-ticket clients.',
  },
  {
    id: 'feat-2',
    name: 'AI Support Assistant',
    category: 'ai',
    impactBoost: 25,
    buildTimeWeeks: 1,
    description: '24/7 intelligent agent that answers questions based on your specific documents.',
  },
  {
    id: 'feat-3',
    name: 'CRM Data Sync',
    category: 'automation',
    impactBoost: 20,
    buildTimeWeeks: 1,
    description: 'Automatically pushes leads from your website directly into your CRM.',
  },
  {
    id: 'feat-4',
    name: 'Automated Invoicing',
    category: 'automation',
    impactBoost: 25,
    buildTimeWeeks: 1.5,
    description: 'Generates and emails PDF invoices the moment a deal is closed.',
  },
];

export const TechStackSimulatorGame: React.FC = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<FeaturePill[]>([]);

  const totalImpact = Math.min(selectedFeatures.reduce((acc, f) => acc + f.impactBoost, 0), 100);
  const totalWeeks = selectedFeatures.reduce((acc, f) => acc + f.buildTimeWeeks, 0);

  const handleAddFeature = (feature: FeaturePill) => {
    if (selectedFeatures.some((f) => f.id === feature.id)) return;
    setSelectedFeatures([...selectedFeatures, feature]);
  };

  const handleRemoveFeature = (featureId: string) => {
    setSelectedFeatures(selectedFeatures.filter((f) => f.id !== featureId));
  };

  const handleReset = () => {
    setSelectedFeatures([]);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-zinc-200 p-8 md:p-12 relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-zinc-100 pb-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-zinc-950">
            Project Scoper
          </h3>
          <p className="text-zinc-500 mt-2 text-lg">
            Select the capabilities you need and instantly see estimated impact and timeline.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto p-3 rounded-full border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-10 p-6 rounded-2xl bg-zinc-950 text-white">
        <div className="flex flex-col gap-1">
          <div className="text-sm text-zinc-400 font-medium">Business Impact</div>
          <div className="text-3xl md:text-4xl font-bold flex items-baseline gap-1">
            {totalImpact}% <span className="text-base font-normal text-zinc-500">Efficiency</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-sm text-zinc-400 font-medium">Estimated Build Time</div>
          <div className="text-3xl md:text-4xl font-bold flex items-baseline gap-1">
            {totalWeeks > 0 ? totalWeeks : '--'} <span className="text-base font-normal text-zinc-500">Weeks</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Available Features */}
        <div>
          <div className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
            <Boxes className="w-4 h-4" />
            <span>Select Capabilities</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {FEATURE_LIBRARY.map((feat) => {
              const isSelected = selectedFeatures.some((f) => f.id === feat.id);

              return (
                <div
                  key={feat.id}
                  onClick={() => {
                    if (isSelected) handleRemoveFeature(feat.id);
                    else handleAddFeature(feat);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-50 shadow-inner'
                      : 'bg-white border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-zinc-900">{feat.name}</div>
                      <div className="text-sm text-zinc-500 mt-1">{feat.description}</div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-zinc-900 shrink-0 ml-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Plan */}
        <div>
          <div className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Your Custom Plan</span>
          </div>

          <div className="min-h-[300px] rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-6 flex flex-col">
            {selectedFeatures.length === 0 ? (
              <div className="m-auto text-center text-zinc-400 text-sm">
                Click features on the left to build your plan.
              </div>
            ) : (
              <div className="space-y-3 flex-1">
                {selectedFeatures.map((feat) => (
                  <motion.div
                    key={feat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-xl bg-white border border-zinc-200 flex items-center justify-between shadow-sm"
                  >
                    <span className="font-semibold text-zinc-900">{feat.name}</span>
                    <button
                      onClick={() => handleRemoveFeature(feat.id)}
                      className="text-zinc-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedFeatures.length > 0 && (
              <div className="pt-6 mt-4">
                <a
                  href="#contact"
                  className="btn-primary w-full"
                >
                  <span>Request Quote For This Build</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
