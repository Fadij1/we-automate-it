import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import {
  Zap,
  Bot,
  Code,
  Send,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Terminal,
  X,
  Layers,
  ArrowRight,
  Sliders
} from 'lucide-react';

interface N8nNode {
  id: string;
  name: string;
  type: 'trigger' | 'ai' | 'parser' | 'output';
  n8nType: string;
  icon: string;
  color: string;
  description: string;
  parameters: { label: string; value: string }[];
}

const AVAILABLE_N8N_NODES: N8nNode[] = [
  {
    id: 'n8n-node-trigger',
    name: 'On Webhook Click',
    type: 'trigger',
    n8nType: 'n8n-nodes-base.webhook',
    icon: 'Zap',
    color: 'from-rose-500/20 to-orange-500/20 text-rose-400 border-rose-500/40',
    description: 'Triggers workflow execution immediately when user clicks website button.',
    parameters: [
      { label: 'HTTP Method', value: 'POST' },
      { label: 'Response Mode', value: 'On Received' },
    ],
  },
  {
    id: 'n8n-node-gemini',
    name: 'Gemini LLM Message',
    type: 'ai',
    n8nType: 'n8n-nodes-base.googleGemini',
    icon: 'Bot',
    color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/40',
    description: 'Processes prompt context and generates personalized messaging with Gemini AI.',
    parameters: [
      { label: 'Model', value: 'gemini-1.5-flash' },
      { label: 'Temperature', value: '0.7' },
    ],
  },
  {
    id: 'n8n-node-parser',
    name: 'JSON Code Parser',
    type: 'parser',
    n8nType: 'n8n-nodes-base.code',
    icon: 'Code',
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/40',
    description: 'Transforms response payload into clean JSON format.',
    parameters: [
      { label: 'Language', value: 'JavaScript' },
      { label: 'Mode', value: 'Run Once for All Items' },
    ],
  },
  {
    id: 'n8n-node-output',
    name: 'n8n Webhook Dispatch',
    type: 'output',
    n8nType: 'n8n-nodes-base.httpRequest',
    icon: 'Send',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/40',
    description: 'Dispatches finalized pop-out message notification to client user.',
    parameters: [
      { label: 'Authentication', value: 'Header Auth' },
      { label: 'Retry On Fail', value: '3 Times' },
    ],
  },
];

const CANVAS_SLOTS = [
  { index: 0, title: 'Trigger Node', type: 'trigger', defaultText: '1. Drag On Webhook Click ⚡' },
  { index: 1, title: 'AI Agent Node', type: 'ai', defaultText: '2. Drag Gemini LLM Message 🧠' },
  { index: 2, title: 'Code Node', type: 'parser', defaultText: '3. Drag JSON Code Parser 🔧' },
  { index: 3, title: 'Output Node', type: 'output', defaultText: '4. Drag n8n Dispatch 📩' },
];

export const N8nWorkflowGame: React.FC = () => {
  const [placedNodes, setPlacedNodes] = useState<(N8nNode | null)[]>([null, null, null, null]);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [executingStep, setExecutingStep] = useState<number | null>(null);
  const [showN8nPopup, setShowN8nPopup] = useState(false);

  const isWorkflowComplete = placedNodes.every((n) => n !== null);

  const handleDropInSlot = (slotIndex: number, node: N8nNode) => {
    soundManager.playSuccessChime();
    const updated = [...placedNodes];
    updated[slotIndex] = node;
    setPlacedNodes(updated);
  };

  const handleRemoveNode = (slotIndex: number) => {
    soundManager.playErrorSound();
    const updated = [...placedNodes];
    updated[slotIndex] = null;
    setPlacedNodes(updated);
    setShowN8nPopup(false);
  };

  const handleReset = () => {
    soundManager.playErrorSound();
    setPlacedNodes([null, null, null, null]);
    setExecutingStep(null);
    setShowN8nPopup(false);
  };

  const handleExecuteWorkflow = () => {
    if (!isWorkflowComplete) return;

    soundManager.playPickupSound();
    setExecutingStep(0);

    setTimeout(() => setExecutingStep(1), 400);
    setTimeout(() => setExecutingStep(2), 800);
    setTimeout(() => setExecutingStep(3), 1200);

    setTimeout(() => {
      setExecutingStep(null);
      soundManager.playBadgeUnlockSound();
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff6d5a', '#ea4b71', '#06b6d4', '#10b981'],
      });
      setShowN8nPopup(true);
    }, 1600);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'Send':
        return <Send className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full gradient-border-card p-6 md:p-8 relative overflow-hidden shadow-2xl">
      {/* n8n Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>n8n Workflow Editor Game</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            Build & Execute n8n Workflow
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Drag official n8n node modules into canvas slots, configure parameters, and click <strong>Execute n8n Workflow</strong>!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExecuteWorkflow}
            disabled={!isWorkflowComplete || executingStep !== null}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white font-bold text-xs shadow-xl shadow-rose-500/30 transition disabled:opacity-40"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Execute n8n Workflow ▶</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Available Node Library */}
      <div className="mb-8">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-rose-400" />
          <span>Available n8n Node Library (Click or Drag onto Canvas)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AVAILABLE_N8N_NODES.map((node) => {
            const isUsed = placedNodes.some((n) => n?.id === node.id);

            return (
              <div
                key={node.id}
                draggable={!isUsed}
                onDragStart={() => {
                  soundManager.playPickupSound();
                  setActiveDragId(node.id);
                }}
                onDragEnd={() => setActiveDragId(null)}
                onClick={() => {
                  if (isUsed) return;
                  const emptyIndex = CANVAS_SLOTS.findIndex(
                    (s) => s.type === node.type && placedNodes[s.index] === null
                  );
                  if (emptyIndex !== -1) {
                    handleDropInSlot(emptyIndex, node);
                  }
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative bg-slate-900/90 ${
                  isUsed
                    ? 'opacity-30 border-slate-800 cursor-not-allowed'
                    : 'border-white/10 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {node.n8nType}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${node.color} border`}>
                    {renderIcon(node.icon)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{node.name}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{node.description}</div>
                  </div>
                </div>

                {/* Node Parameters Pill Showcase */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{node.parameters[0].label}: {node.parameters[0].value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* n8n Visual Workflow Canvas */}
      <div className="relative pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span>n8n Visual Workflow Canvas</span>
          {isWorkflowComplete && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All 4 Nodes Connected & Ready!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {CANVAS_SLOTS.map((slot) => {
            const currentNode = placedNodes[slot.index];
            const isExecutingThisStep = executingStep === slot.index;

            return (
              <div
                key={slot.index}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (!activeDragId) return;
                  const node = AVAILABLE_N8N_NODES.find((n) => n.id === activeDragId);
                  if (node && node.type === slot.type) {
                    handleDropInSlot(slot.index, node);
                  } else {
                    soundManager.playErrorSound();
                  }
                }}
                className={`min-h-[190px] rounded-xl border-2 transition-all p-4 flex flex-col justify-between relative ${
                  isExecutingThisStep
                    ? 'border-rose-500 bg-rose-950/50 shadow-2xl shadow-rose-500/50 scale-105'
                    : currentNode
                    ? 'border-rose-500/60 bg-slate-900/90 shadow-lg'
                    : 'border-dashed border-slate-700 bg-slate-950/50 hover:border-slate-500'
                }`}
              >
                {/* Connector Node Pins */}
                <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-rose-500"></div>
                <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-rose-500"></div>

                <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                  <span>{slot.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-rose-300 font-mono">
                    Pin #{slot.index + 1}
                  </span>
                </div>

                {currentNode ? (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="p-3 rounded-lg bg-slate-800/90 border border-rose-500/40 my-2 relative"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {renderIcon(currentNode.icon)}
                      <span className="text-xs font-bold text-white">{currentNode.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mb-2">{currentNode.description}</p>

                    <div className="text-[10px] font-mono text-cyan-300 bg-slate-950 p-1.5 rounded border border-white/5 space-y-0.5">
                      {currentNode.parameters.map((p, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-slate-400">{p.label}:</span>
                          <span>{p.value}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleRemoveNode(slot.index)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-400 text-xs p-1"
                    >
                      ✕
                    </button>
                  </motion.div>
                ) : (
                  <div className="my-auto text-center py-4 text-xs text-slate-500 font-mono">
                    {slot.defaultText}
                  </div>
                )}

                <div className="text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Pin Connection Status</span>
                  {currentNode && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pop-Out n8n Execution Payload Modal */}
      <AnimatePresence>
        {showN8nPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="w-full max-w-lg gradient-border-card p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-slate-900"
            >
              <button
                onClick={() => setShowN8nPopup(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      200 OK SUCCESS 🟢
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Execution ID: #n8n-99824</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mt-1">n8n Execution Pop-Out Message</h4>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-3 mb-6">
                <div className="text-xs text-slate-400 uppercase font-mono font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  n8n Dispatched Payload Message:
                </div>
                <div className="text-sm sm:text-base font-bold text-rose-300 leading-relaxed bg-slate-900 p-4 rounded-lg border border-rose-500/30">
                  "n8n Workflow Execution Succeeded! 🎉<br />
                  <span className="text-white font-extrabold text-lg">Come and subscribe with us to automate your entire business operations!</span>"
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#contact"
                  onClick={() => setShowN8nPopup(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-rose-500/30 transition"
                >
                  <span>Subscribe & Book Strategy Call Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
