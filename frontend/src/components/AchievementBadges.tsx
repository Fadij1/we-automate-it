import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Sparkles, CheckCircle2, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

export interface BadgeItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
}

export const AchievementBadges: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [badges, setBadges] = useState<BadgeItem[]>([
    {
      id: 'badge-1',
      title: 'Pipeline Architect ⚡',
      category: 'Game 1',
      description: 'Assembled a complete 4-step automated pipeline canvas.',
      icon: '⚡',
      isUnlocked: true,
    },
    {
      id: 'badge-2',
      title: 'Challenge Master 🏆',
      category: 'Game 2',
      description: 'Matched all 4 business bottlenecks with custom solutions.',
      icon: '🏆',
      isUnlocked: true,
    },
    {
      id: 'badge-3',
      title: 'Tech Stack Strategist 🔥',
      category: 'Game 3',
      description: 'Engineered a custom tech stack with 100% synergy.',
      icon: '🔥',
      isUnlocked: true,
    },
    {
      id: 'badge-4',
      title: 'AI Playground Explorer 🤖',
      category: 'Interactive Sandbox',
      description: 'Executed live AI agent triage and workflow prompt simulations.',
      icon: '🤖',
      isUnlocked: true,
    },
    {
      id: 'badge-5',
      title: 'ROI Savings Visionary 💰',
      category: 'ROI Calculator',
      description: 'Calculated annual team hours and operational cost savings.',
      icon: '💰',
      isUnlocked: true,
    },
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl glass-panel rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              Agency Achievements
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-400">Your unlocked interactive badges (5 / 5 Unlocked)</p>
          </div>
        </div>

        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border flex items-center justify-between transition ${
                badge.isUnlocked
                  ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-amber-500/40 text-white'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{badge.icon}</div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    {badge.title}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {badge.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{badge.description}</div>
                </div>
              </div>

              {badge.isUnlocked && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
