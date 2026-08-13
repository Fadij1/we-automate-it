import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import { MatchingCard } from '../../types';
import {
  Trophy,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bot,
  Zap,
  Globe,
  MessageSquareText,
  RotateCcw,
  HelpCircle,
  Flame
} from 'lucide-react';

const CHALLENGES: MatchingCard[] = [
  {
    id: 'ch-1',
    title: '500+ Support Emails Daily',
    category: 'challenge',
    description: 'Overwhelmed customer service reps wasting hours answering repetitive tier-1 FAQs.',
    matchingPairId: 'sol-1',
    iconName: 'MessageSquareText',
    badge: 'Support Bottleneck',
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
  },
  {
    id: 'ch-2',
    title: 'Manual Excel Data Copying',
    category: 'challenge',
    description: 'Employees copy-pasting lead data between HubSpot, Google Sheets, and QuickBooks.',
    matchingPairId: 'sol-2',
    iconName: 'Zap',
    badge: 'Human Error Risk',
    color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 'ch-3',
    title: 'Outdated & Clunky Website',
    category: 'challenge',
    description: 'Losing high-value clients because the current site lacks interactive web app features.',
    matchingPairId: 'sol-3',
    iconName: 'Globe',
    badge: 'Conversion Loss',
    color: 'from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30',
  },
  {
    id: 'ch-4',
    title: 'Slow Sales Lead Response',
    category: 'challenge',
    description: 'Leads coming from contact forms wait 24+ hours before getting a qualification follow-up.',
    matchingPairId: 'sol-4',
    iconName: 'Bot',
    badge: 'Lost Deals',
    color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
  },
];

const SOLUTIONS: MatchingCard[] = [
  {
    id: 'sol-1',
    title: '24/7 Gemini AI Support Bot',
    category: 'solution',
    description: 'GPT/Gemini powered assistant trained on your knowledge base to resolve 80% of FAQs instantly.',
    matchingPairId: 'sol-1',
    iconName: 'Bot',
    badge: 'Instant Resolution',
    color: 'border-indigo-500/50 bg-indigo-950/20',
  },
  {
    id: 'sol-2',
    title: 'n8n Workflow Automation',
    category: 'solution',
    description: 'Automated background sync connecting your CRM, databases, and accounting software error-free.',
    matchingPairId: 'sol-2',
    iconName: 'Zap',
    badge: 'Zero Human Work',
    color: 'border-cyan-500/50 bg-cyan-950/20',
  },
  {
    id: 'sol-3',
    title: 'Custom React Web Application',
    category: 'solution',
    description: 'Modern, blazing-fast, responsive web portal built with React, TypeScript & sleek glass aesthetics.',
    matchingPairId: 'sol-3',
    iconName: 'Globe',
    badge: 'High Conversion',
    color: 'border-emerald-500/50 bg-emerald-950/20',
  },
  {
    id: 'sol-4',
    title: 'Autonomous Lead Triage Agent',
    category: 'solution',
    description: 'Instant AI qualification, meeting scheduling, and customized follow-up within 10 seconds.',
    matchingPairId: 'sol-4',
    iconName: 'Bot',
    badge: '10x Speed',
    color: 'border-purple-500/50 bg-purple-950/20',
  },
];

export const SolutionMatchmakerGame: React.FC = () => {
  const [matches, setMatches] = useState<{ [solutionId: string]: string }>({});
  const [streak, setStreak] = useState(0);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const matchedCount = Object.keys(matches).length;
  const isGameComplete = matchedCount === SOLUTIONS.length;

  const handleDropOnSolution = (solutionId: string, challengeId: string) => {
    const challenge = CHALLENGES.find((c) => c.id === challengeId);
    if (challenge && challenge.matchingPairId === solutionId) {
      // Correct match!
      soundManager.playSuccessChime();
      const newMatches = { ...matches, [solutionId]: challengeId };
      setMatches(newMatches);
      setStreak((prev) => prev + 1);

      if (Object.keys(newMatches).length === SOLUTIONS.length) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#6366f1', '#06b6d4', '#10b981'],
        });
      }
    } else {
      // Wrong match!
      soundManager.playErrorSound();
      setStreak(0);
    }
  };

  const handleReset = () => {
    setMatches({});
    setStreak(0);
    soundManager.playErrorSound();
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/10 p-6 md:p-8 relative overflow-hidden shadow-2xl mt-12">
      {/* Game Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Game 2</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            Challenge & Solution Matchmaker
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Drag each business bottleneck on the left onto its exact solution card on the right!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Streak: {streak}</span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Game Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Business Challenges */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>1. Drag Business Challenges</span>
          </div>

          <div className="space-y-3">
            {CHALLENGES.map((ch) => {
              const isAlreadyMatched = Object.values(matches).includes(ch.id);

              return (
                <motion.div
                  key={ch.id}
                  draggable={!isAlreadyMatched}
                  onDragStart={() => {
                    soundManager.playPickupSound();
                    setActiveDragId(ch.id);
                  }}
                  onDragEnd={() => setActiveDragId(null)}
                  whileHover={!isAlreadyMatched ? { x: 4 } : {}}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative bg-gradient-to-r ${ch.color} ${
                    isAlreadyMatched ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/40 text-amber-300 mb-1 inline-block">
                        {ch.badge}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{ch.title}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ch.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Solution Targets */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>2. Drop onto Solutions</span>
          </div>

          <div className="space-y-3">
            {SOLUTIONS.map((sol) => {
              const matchedChallengeId = matches[sol.id];
              const matchedChallenge = CHALLENGES.find((c) => c.id === matchedChallengeId);

              return (
                <div
                  key={sol.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (activeDragId) {
                      handleDropOnSolution(sol.id, activeDragId);
                    }
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${sol.color} ${
                    matchedChallenge ? 'border-emerald-500 bg-emerald-950/20' : 'border-dashed border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-300 shrink-0 mt-0.5">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{sol.title}</h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                            {sol.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{sol.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Matched State */}
                  {matchedChallenge && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-3 pt-3 border-t border-emerald-500/30 flex items-center justify-between text-xs text-emerald-400 font-semibold"
                    >
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Matched with: {matchedChallenge.title}
                      </span>
                      <span className="text-[10px] text-emerald-300">SOLVED</span>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion Modal / Card */}
      <AnimatePresence>
        {isGameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-cyan-900/90 border border-purple-500/50 text-center shadow-2xl"
          >
            <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-bounce" />
            <h4 className="text-2xl font-extrabold text-white">Automation Strategist Unlocked! 🏆</h4>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mt-2">
              You matched all 4 core business bottlenecks with our custom software & AI agent solutions. Ready to transform your business operation?
            </p>
            <a
              href="#contact"
              className="inline-block mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/30 transition"
            >
              Get Custom Quote for My Project →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
