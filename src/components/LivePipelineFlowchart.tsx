import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Webhook,
  Bot,
  Filter,
  Database,
  Send,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NodeItem {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  color: string;
  badge: string;
}

const PIPELINE_NODES: NodeItem[] = [
  {
    id: 'webhook',
    name: 'Inbound Webhook',
    role: 'Trigger (Shopify / Form / API)',
    icon: Webhook,
    color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-400',
    badge: 'HTTP POST',
  },
  {
    id: 'ai_agent',
    name: 'Gemini 1.5 Pro Agent',
    role: 'Cognitive NLP & Decision Engine',
    icon: Bot,
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-400',
    badge: 'AI Classifier',
  },
  {
    id: 'logic_router',
    name: 'n8n Logic Router',
    role: 'Condition Check (Score > 85)',
    icon: Filter,
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
    badge: 'Branching',
  },
  {
    id: 'database',
    name: 'PostgreSQL & Supabase',
    role: 'Encrypted Cloud Storage',
    icon: Database,
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400',
    badge: 'ACID DB',
  },
  {
    id: 'dispatch',
    name: 'Slack & Email Dispatch',
    role: 'Sales Alert & Customer Auto-Reply',
    icon: Send,
    color: 'from-sky-500/20 to-cyan-500/20 border-sky-500/40 text-sky-400',
    badge: 'Multi-Channel',
  },
];

export const LivePipelineFlowchart: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [packetLogs, setPacketLogs] = useState<string[]>([
    '⚡ Initialized Spark Flow Live Pipeline Engine',
    '🟢 Ready for payload stream',
  ]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          const next = (prev + 1) % PIPELINE_NODES.length;
          const currentNode = PIPELINE_NODES[next];
          const logEntry = `[${new Date().toLocaleTimeString()}] ${currentNode.name} ➔ Processed payload in ${(
            Math.random() * 8 + 4
          ).toFixed(1)}ms`;
          setPacketLogs((logs) => [...logs.slice(-4), logEntry]);
          return next;
        });
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const triggerManualTest = () => {
    soundManager.playPickupSound();
    setActiveStep(0);
    const log = `[${new Date().toLocaleTimeString()}] 🚀 Manual Payload Injected: Customer Checkout #SF-8892`;
    setPacketLogs((logs) => [...logs.slice(-4), log]);
    setTimeout(() => soundManager.playSuccessChime(), 1200);
  };

  return (
    <div className="my-12 rounded-2xl p-6 sm:p-8 glass-panel border border-white/10 bg-slate-950/70 shadow-2xl relative overflow-hidden">
      {/* Background cyber glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              Live Architecture Simulator
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
            Real-Time AI Automation Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Watch live simulated payloads route autonomously through the Spark Flow stack.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isPlaying ? 'Pause Pulse' : 'Resume Pulse'}</span>
          </button>

          <button
            onClick={triggerManualTest}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Inject Test Payload</span>
          </button>
        </div>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {PIPELINE_NODES.map((node, index) => {
          const Icon = node.icon;
          const isActive = activeStep === index;
          const isPassed = activeStep > index;

          return (
            <div key={node.id} className="relative flex flex-col items-center">
              {/* Node Card */}
              <motion.div
                animate={{
                  scale: isActive ? 1.05 : 1,
                  borderColor: isActive
                    ? 'rgba(6, 182, 212, 0.8)'
                    : isPassed
                      ? 'rgba(99, 102, 241, 0.4)'
                      : 'rgba(255, 255, 255, 0.08)',
                }}
                className={`w-full p-4 rounded-xl border transition-all duration-300 bg-slate-900/90 relative ${isActive
                    ? 'shadow-xl shadow-cyan-500/25 ring-1 ring-cyan-400/50'
                    : 'bg-slate-900/60'
                  }`}
              >
                {/* Active Indicator Pulse Ring */}
                {isActive && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-cyan-400 animate-ping" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${node.color} border`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                    {node.badge}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white font-display mb-1">
                  {node.name}
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug">{node.role}</p>

                {/* Status bar */}
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-mono">Step 0{index + 1}</span>
                  <span
                    className={`font-semibold ${isActive
                        ? 'text-cyan-400 animate-pulse'
                        : isPassed
                          ? 'text-emerald-400'
                          : 'text-slate-500'
                      }`}
                  >
                    {isActive ? 'Processing ⚡' : isPassed ? 'Completed ✓' : 'Idle'}
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Real-Time Packet Execution Console */}
      <div className="mt-6 p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 mb-2 border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] uppercase font-bold text-slate-300">
              Live Payload Telemetry
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">Latency: ~12ms</span>
        </div>
        <div className="space-y-1 text-[11px] text-slate-300">
          {packetLogs.map((log, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-cyan-400">›</span>
              <span className={i === packetLogs.length - 1 ? 'text-cyan-200 font-bold' : 'text-slate-400'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
