import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Bot,
  Filter,
  Send,
  Play,
  RotateCcw,
  CheckCircle2,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  name: string;
  type: 'trigger' | 'ai' | 'filter' | 'action';
  icon: string;
  description: string;
}

const AVAILABLE_NODES: WorkflowNode[] = [
  {
    id: 'node-trigger',
    name: 'New Customer Inquiry',
    type: 'trigger',
    icon: 'Zap',
    description: 'When a user submits the contact form on your website.',
  },
  {
    id: 'node-ai',
    name: 'AI Agent Triage',
    type: 'ai',
    icon: 'Bot',
    description: 'AI reads the inquiry, determines intent, and drafts a tailored response.',
  },
  {
    id: 'node-filter',
    name: 'High Value Filter',
    type: 'filter',
    icon: 'Filter',
    description: 'Routes inquiries over $10k directly to the sales team.',
  },
  {
    id: 'node-action',
    name: 'Auto-Schedule & Email',
    type: 'action',
    icon: 'Send',
    description: 'Sends the AI draft and a calendar booking link to the customer.',
  },
];

const CANVAS_SLOTS = [
  { index: 0, title: 'Step 1: Trigger', type: 'trigger', defaultText: 'Drag Trigger Here' },
  { index: 1, title: 'Step 2: Intelligence', type: 'ai', defaultText: 'Drag AI Agent Here' },
  { index: 2, title: 'Step 3: Logic', type: 'filter', defaultText: 'Drag Logic Here' },
  { index: 3, title: 'Step 4: Action', type: 'action', defaultText: 'Drag Action Here' },
];

export const N8nWorkflowGame: React.FC = () => {
  const [placedNodes, setPlacedNodes] = useState<(WorkflowNode | null)[]>([null, null, null, null]);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [executingStep, setExecutingStep] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const isWorkflowComplete = placedNodes.every((n) => n !== null);

  const handleDropInSlot = (slotIndex: number, node: WorkflowNode) => {
    const updated = [...placedNodes];
    updated[slotIndex] = node;
    setPlacedNodes(updated);
  };

  const handleRemoveNode = (slotIndex: number) => {
    const updated = [...placedNodes];
    updated[slotIndex] = null;
    setPlacedNodes(updated);
    setShowPopup(false);
  };

  const handleReset = () => {
    setPlacedNodes([null, null, null, null]);
    setExecutingStep(null);
    setShowPopup(false);
  };

  const handleExecuteWorkflow = () => {
    if (!isWorkflowComplete) return;

    setExecutingStep(0);
    setTimeout(() => setExecutingStep(1), 500);
    setTimeout(() => setExecutingStep(2), 1000);
    setTimeout(() => setExecutingStep(3), 1500);

    setTimeout(() => {
      setExecutingStep(null);
      setShowPopup(true);
    }, 2000);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Filter': return <Filter className="w-5 h-5" />;
      case 'Send': return <Send className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-zinc-200 p-8 md:p-12 relative overflow-hidden shadow-sm mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-zinc-100 pb-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-zinc-950">
            Build an Automated Workflow
          </h3>
          <p className="text-zinc-500 mt-2 text-lg">
            See how custom software connects the dots. Drag the steps below to build an automated sales funnel.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExecuteWorkflow}
            disabled={!isWorkflowComplete || executingStep !== null}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Play className="w-4 h-4" />
            <span>Run Workflow</span>
          </button>
          <button
            onClick={handleReset}
            className="p-3 rounded-full border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition"
            aria-label="Reset Workflow"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Available Node Library */}
      <div className="mb-10">
        <div className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4" />
          <span>Available Steps (Drag to Canvas)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AVAILABLE_NODES.map((node) => {
            const isUsed = placedNodes.some((n) => n?.id === node.id);

            return (
              <div
                key={node.id}
                draggable={!isUsed}
                onDragStart={() => setActiveDragId(node.id)}
                onDragEnd={() => setActiveDragId(null)}
                onClick={() => {
                  if (isUsed) return;
                  const emptyIndex = CANVAS_SLOTS.findIndex(
                    (s) => s.type === node.type && placedNodes[s.index] === null
                  );
                  if (emptyIndex !== -1) handleDropInSlot(emptyIndex, node);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isUsed
                    ? 'opacity-40 border-zinc-100 bg-zinc-50 cursor-not-allowed'
                    : 'border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-zinc-100 text-zinc-900">
                    {renderIcon(node.icon)}
                  </div>
                  <div className="font-semibold text-zinc-900">{node.name}</div>
                </div>
                <div className="text-sm text-zinc-500">{node.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Workflow Canvas */}
      <div className="relative pt-2">
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
                  const node = AVAILABLE_NODES.find((n) => n.id === activeDragId);
                  if (node && node.type === slot.type) handleDropInSlot(slot.index, node);
                }}
                className={`min-h-[160px] rounded-2xl border-2 transition-all p-5 flex flex-col justify-center relative ${
                  isExecutingThisStep
                    ? 'border-spark-start bg-rose-50 shadow-lg scale-105'
                    : currentNode
                    ? 'border-zinc-900 bg-zinc-900 shadow-sm'
                    : 'border-dashed border-zinc-200 bg-zinc-50 hover:border-zinc-400'
                }`}
              >
                {/* Connectors */}
                {slot.index > 0 && <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-1 bg-zinc-200"></div>}
                
                {currentNode ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative text-white"
                  >
                    <div className="flex items-center gap-2 mb-2 text-white">
                      {renderIcon(currentNode.icon)}
                      <span className="font-semibold">{currentNode.name}</span>
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-3">{currentNode.description}</p>
                    <button
                      onClick={() => handleRemoveNode(slot.index)}
                      className="absolute -top-2 -right-2 text-zinc-500 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <div className="text-center text-sm font-medium text-zinc-400">
                    {slot.defaultText}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl relative"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-zinc-950 mb-2">Workflow Executed</h4>
                <p className="text-zinc-600 mb-8">
                  Your custom automation successfully read the inquiry, generated a draft, and scheduled a meeting without human intervention.
                </p>
                <a
                  href="#contact"
                  onClick={() => setShowPopup(false)}
                  className="btn-primary w-full"
                >
                  Automate Your Business
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
