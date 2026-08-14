import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatchingCard } from '../../types';
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

const CHALLENGES: MatchingCard[] = [
  {
    id: 'ch-1',
    title: 'Customer Support Overload',
    category: 'challenge',
    description: 'Team spends hours answering the same repetitive questions every day.',
    matchingPairId: 'sol-1',
    iconName: 'MessageSquareText',
    badge: 'Bottleneck',
    color: 'bg-white border-zinc-200 text-zinc-900',
  },
  {
    id: 'ch-2',
    title: 'Manual Data Entry Errors',
    category: 'challenge',
    description: 'Copying data between spreadsheets and CRM software leads to costly mistakes.',
    matchingPairId: 'sol-2',
    iconName: 'Zap',
    badge: 'Risk',
    color: 'bg-white border-zinc-200 text-zinc-900',
  },
  {
    id: 'ch-3',
    title: 'Outdated Web Experience',
    category: 'challenge',
    description: 'Losing clients because the website is slow and hard to use on mobile.',
    matchingPairId: 'sol-3',
    iconName: 'Globe',
    badge: 'Loss',
    color: 'bg-white border-zinc-200 text-zinc-900',
  },
];

const SOLUTIONS: MatchingCard[] = [
  {
    id: 'sol-1',
    title: 'Custom AI Support Agent',
    category: 'solution',
    description: 'An AI assistant trained on your data to resolve 80% of questions instantly.',
    matchingPairId: 'sol-1',
    iconName: 'Bot',
    badge: 'Instant Resolution',
    color: 'border-zinc-200 bg-zinc-50',
  },
  {
    id: 'sol-2',
    title: 'Background Automation',
    category: 'solution',
    description: 'Systems talk to each other automatically, eliminating manual copy-pasting.',
    matchingPairId: 'sol-2',
    iconName: 'Zap',
    badge: 'Zero Work',
    color: 'border-zinc-200 bg-zinc-50',
  },
  {
    id: 'sol-3',
    title: 'Modern Web Application',
    category: 'solution',
    description: 'A blazing-fast, custom-designed web portal that converts visitors to clients.',
    matchingPairId: 'sol-3',
    iconName: 'Globe',
    badge: 'High Conversion',
    color: 'border-zinc-200 bg-zinc-50',
  },
];

export const SolutionMatchmakerGame: React.FC = () => {
  const [matches, setMatches] = useState<{ [solutionId: string]: string }>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const matchedCount = Object.keys(matches).length;
  const isGameComplete = matchedCount === SOLUTIONS.length;

  const handleDropOnSolution = (solutionId: string, challengeId: string) => {
    const challenge = CHALLENGES.find((c) => c.id === challengeId);
    if (challenge && challenge.matchingPairId === solutionId) {
      setMatches({ ...matches, [solutionId]: challengeId });
    }
  };

  const handleReset = () => {
    setMatches({});
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-zinc-200 p-8 md:p-12 relative overflow-hidden shadow-sm mb-12">
      {/* Game Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-zinc-100 pb-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-zinc-950">
            Problem & Solution Matcher
          </h3>
          <p className="text-zinc-500 mt-2 text-lg">
            Drag your business bottleneck onto the tailored software solution that fixes it forever.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto p-3 rounded-full border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition"
          aria-label="Reset Matcher"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column */}
        <div>
          <div className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Drag Your Problems</span>
          </div>

          <div className="space-y-4">
            {CHALLENGES.map((ch) => {
              const isAlreadyMatched = Object.values(matches).includes(ch.id);

              return (
                <motion.div
                  key={ch.id}
                  draggable={!isAlreadyMatched}
                  onDragStart={() => setActiveDragId(ch.id)}
                  onDragEnd={() => setActiveDragId(null)}
                  whileHover={!isAlreadyMatched ? { scale: 1.02 } : {}}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isAlreadyMatched ? 'opacity-30 cursor-not-allowed bg-zinc-50' : 'hover:shadow-md bg-white border-zinc-200'
                  }`}
                >
                  <h4 className="font-semibold text-zinc-900">{ch.title}</h4>
                  <p className="text-sm text-zinc-500 mt-1">{ch.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Drop Onto Solutions</span>
          </div>

          <div className="space-y-4">
            {SOLUTIONS.map((sol) => {
              const matchedChallengeId = matches[sol.id];
              const matchedChallenge = CHALLENGES.find((c) => c.id === matchedChallengeId);

              return (
                <div
                  key={sol.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (activeDragId) handleDropOnSolution(sol.id, activeDragId);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    matchedChallenge ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-dashed border-zinc-200 bg-zinc-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-semibold ${matchedChallenge ? 'text-white' : 'text-zinc-900'}`}>{sol.title}</h4>
                      <p className={`text-sm mt-1 ${matchedChallenge ? 'text-zinc-400' : 'text-zinc-500'}`}>{sol.description}</p>
                    </div>
                  </div>

                  {matchedChallenge && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-4 pt-4 border-t border-zinc-700 flex items-center gap-2 text-sm text-spark-start font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Solved: {matchedChallenge.title}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isGameComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 p-8 rounded-3xl bg-zinc-50 border border-zinc-200 text-center"
          >
            <h4 className="text-2xl font-bold text-zinc-950 mb-3">All Bottlenecks Solved.</h4>
            <p className="text-zinc-600 mb-6 max-w-xl mx-auto">
              We engineer custom solutions for every operational challenge. Let's build yours.
            </p>
            <a href="#contact" className="btn-primary inline-flex">
              Discuss Your Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
