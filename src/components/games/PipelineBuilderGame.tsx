import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import { PipelineNode } from '../../types';
import {
  FileText,
  Bot,
  Zap,
  Database,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Brain,
  MessageSquare,
  LayoutDashboard
} from 'lucide-react';

const AVAILABLE_NODES: PipelineNode[] = [
  {
    id: 'node-trigger-1',
    title: 'Lead Intake Form',
    type: 'trigger',
    icon: 'FileText',
    description: 'Captures incoming user inquiries from web application',
    statsEffect: { hoursSaved: 8, efficiencyBoost: 100, costReduction: 15 },
  },
  {
    id: 'node-ai-1',
    title: 'Gemini AI Agent Brain',
    type: 'ai',
    icon: 'Bot',
    description: 'Analyzes intent, qualifies leads & drafts intelligent replies',
    statsEffect: { hoursSaved: 15, efficiencyBoost: 200, costReduction: 30 },
  },
  {
    id: 'node-auto-1',
    title: 'n8n Automation Relay',
    type: 'automation',
    icon: 'Zap',
    description: 'Routes data instantly between 100+ connected APIs without code',
    statsEffect: { hoursSaved: 10, efficiencyBoost: 120, costReduction: 20 },
  },
  {
    id: 'node-out-1',
    title: 'CRM & React Dashboard',
    type: 'output',
    icon: 'LayoutDashboard',
    description: 'Stores qualified lead records and updates live admin analytics',
    statsEffect: { hoursSaved: 7, efficiencyBoost: 80, costReduction: 15 },
  },
  // Alternative choices for variety:
  {
    id: 'node-ai-2',
    title: 'Document OCR Parser',
    type: 'ai',
    icon: 'Brain',
    description: 'Extracts invoices, PDFs, and structured data automatically',
    statsEffect: { hoursSaved: 18, efficiencyBoost: 220, costReduction: 35 },
  },
  {
    id: 'node-out-2',
    title: 'Slack & Email Alerts',
    type: 'output',
    icon: 'MessageSquare',
    description: 'Instant notification dispatch to your team members',
    statsEffect: { hoursSaved: 6, efficiencyBoost: 70, costReduction: 10 },
  },
];

const SLOT_CONFIGS = [
  { index: 0, title: 'Step 1: Input Trigger', type: 'trigger', label: 'Form or Webhook' },
  { index: 1, title: 'Step 2: AI Agent', type: 'ai', label: 'Gemini / GPT Triage' },
  { index: 2, title: 'Step 3: n8n Workflow', type: 'automation', label: 'Data Relay' },
  { index: 3, title: 'Step 4: Output / CRM', type: 'output', label: 'Database / Alert' },
];

export const PipelineBuilderGame: React.FC = () => {
  const [slottedNodes, setSlottedNodes] = useState<(PipelineNode | null)[]>([null, null, null, null]);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Compute live statistics
  const totalHoursSaved = slottedNodes.reduce((acc, n) => acc + (n?.statsEffect.hoursSaved || 0), 0);
  const totalEfficiency = slottedNodes.reduce((acc, n) => acc + (n?.statsEffect.efficiencyBoost || 0), 0);
  const totalCostReduction = slottedNodes.reduce((acc, n) => acc + (n?.statsEffect.costReduction || 0), 0);

  const handleDropInSlot = (slotIndex: number, node: PipelineNode) => {
    const newSlots = [...slottedNodes];
    newSlots[slotIndex] = node;
    setSlottedNodes(newSlots);
    soundManager.playSuccessChime();

    // Check if pipeline is fully built
    if (newSlots.every((slot) => slot !== null)) {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#a855f7', '#10b981'],
      });
    }
  };

  const handleRemoveFromSlot = (slotIndex: number) => {
    const newSlots = [...slottedNodes];
    newSlots[slotIndex] = null;
    setSlottedNodes(newSlots);
    setIsCompleted(false);
    soundManager.playErrorSound();
  };

  const handleReset = () => {
    setSlottedNodes([null, null, null, null]);
    setIsCompleted(false);
    soundManager.playErrorSound();
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      case 'Brain':
        return <Brain className="w-5 h-5" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/10 p-6 md:p-8 relative overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Gamepad2Icon className="w-3.5 h-3.5" />
            <span>Interactive Game 1</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            Build Your Custom AI Pipeline
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Drag the building blocks below into the target slots to architect your automated business workflow!
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Canvas</span>
        </button>
      </div>

      {/* Live ROI Stats Bar */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 p-4 rounded-xl bg-slate-900/80 border border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Hours Saved</div>
            <div className="text-lg md:text-2xl font-bold text-white flex items-baseline gap-1">
              +{totalHoursSaved} <span className="text-xs font-normal text-indigo-300">hrs/wk</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Efficiency</div>
            <div className="text-lg md:text-2xl font-bold text-cyan-300">
              +{totalEfficiency}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Cost Saved</div>
            <div className="text-lg md:text-2xl font-bold text-emerald-400">
              {totalCostReduction}%
            </div>
          </div>
        </div>
      </div>

      {/* Available Node Palette */}
      <div className="mb-8">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Available Architecture Modules (Click or Drag into Pipeline)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {AVAILABLE_NODES.map((node) => {
            const isUsed = slottedNodes.some((s) => s?.id === node.id);

            return (
              <motion.div
                key={node.id}
                draggable={!isUsed}
                onDragStart={() => {
                  soundManager.playPickupSound();
                  setActiveDragId(node.id);
                }}
                onDragEnd={() => setActiveDragId(null)}
                whileHover={!isUsed ? { scale: 1.02 } : {}}
                whileTap={!isUsed ? { scale: 0.98 } : {}}
                onClick={() => {
                  if (isUsed) return;
                  // Auto-place into first empty matching slot
                  const emptyIndex = SLOT_CONFIGS.findIndex(
                    (s) => s.type === node.type && slottedNodes[s.index] === null
                  );
                  if (emptyIndex !== -1) {
                    handleDropInSlot(emptyIndex, node);
                  }
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isUsed
                    ? 'opacity-40 bg-slate-900/40 border-slate-800 cursor-not-allowed'
                    : 'bg-slate-800/90 hover:bg-slate-800 border-white/10 hover:border-indigo-500/50 shadow-lg'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-lg ${
                      node.type === 'trigger'
                        ? 'bg-blue-500/20 text-blue-400'
                        : node.type === 'ai'
                        ? 'bg-purple-500/20 text-purple-400'
                        : node.type === 'automation'
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {renderIcon(node.icon)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{node.title}</div>
                    <div className="text-xs text-slate-400 line-clamp-1">{node.description}</div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>+ {node.statsEffect.hoursSaved} hrs/wk</span>
                  <span className="text-cyan-400">+{node.statsEffect.efficiencyBoost}% speed</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Target Pipeline Canvas Slots */}
      <div className="relative pt-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Workflow Pipeline Target Canvas
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {SLOT_CONFIGS.map((slot) => {
            const currentSlotNode = slottedNodes[slot.index];

            return (
              <div
                key={slot.index}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (!activeDragId) return;
                  const node = AVAILABLE_NODES.find((n) => n.id === activeDragId);
                  if (node && node.type === slot.type) {
                    handleDropInSlot(slot.index, node);
                  } else if (node) {
                    soundManager.playErrorSound();
                  }
                }}
                className={`min-h-[160px] rounded-xl border-2 border-dashed p-4 flex flex-col justify-between transition-all ${
                  currentSlotNode
                    ? 'border-indigo-500/80 bg-indigo-950/30 shadow-lg shadow-indigo-500/10'
                    : 'border-slate-700 bg-slate-900/50 hover:border-slate-500'
                }`}
              >
                <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                  <span>{slot.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                    {slot.label}
                  </span>
                </div>

                {currentSlotNode ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-3 rounded-lg bg-slate-800 border border-indigo-500/40 my-2 relative group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {renderIcon(currentSlotNode.icon)}
                      <span className="text-sm font-bold text-white">{currentSlotNode.title}</span>
                    </div>
                    <p className="text-xs text-slate-300">{currentSlotNode.description}</p>

                    <button
                      onClick={() => handleRemoveFromSlot(slot.index)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-400 text-xs p-1"
                      title="Remove from slot"
                    >
                      ✕
                    </button>
                  </motion.div>
                ) : (
                  <div className="my-auto text-center py-4 text-xs text-slate-500">
                    Drop {slot.type.toUpperCase()} node here
                  </div>
                )}

                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Slot #{slot.index + 1}</span>
                  {currentSlotNode && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Banner */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-slate-900/90 border border-indigo-500/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Pipeline Deployed Successfully! 🎉</h4>
                <p className="text-sm text-slate-300 mt-1">
                  You've engineered a complete business automation stack saving <strong>+{totalHoursSaved} hours/week</strong>.
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 whitespace-nowrap transition"
            >
              Build This For My Business →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Gamepad2Icon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2H5z"
    />
  </svg>
);
