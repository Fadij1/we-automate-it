import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Zap,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  Terminal,
  RefreshCw,
  Code
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export const AgentSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'triage' | 'extractor'>('workflow');
  const [loading, setLoading] = useState(false);

  // Workflow generator state
  const [promptInput, setPromptInput] = useState(
    'When a high-value lead fills out our web form, qualify with AI and send a Slack alert to sales.'
  );
  const [generatedWorkflow, setGeneratedWorkflow] = useState<
    { step: number; title: string; type: string; icon: string }[] | null
  >([
    { step: 1, title: 'Web Form Trigger', type: 'Input Webhook', icon: 'FileText' },
    { step: 2, title: 'Gemini Lead Qualification', type: 'AI Triage Node', icon: 'Bot' },
    { step: 3, title: 'Filter Revenue > $5,000', type: 'Logic Branch', icon: 'Zap' },
    { step: 4, title: 'Slack & CRM Dispatch', type: 'Action Relay', icon: 'CheckCircle2' },
  ]);

  // Support triage state
  const [supportTicket, setSupportTicket] = useState(
    "Hi team, our enterprise subscription payment failed on invoice #8892 and our dashboard locked us out!"
  );
  const [triageResult, setTriageResult] = useState<{
    priority: string;
    sentiment: string;
    category: string;
    reply: string;
  } | null>({
    priority: 'HIGH (URGENT 🔴)',
    sentiment: 'FRUSTRATED (-0.85)',
    category: 'Billing & Account Lockout',
    reply:
      'Hello, I have prioritized invoice #8892 with our billing escalation lead. We have temporarily unlocked your dashboard access while we verify the transaction.',
  });

  // Dynamic Intelligent Workflow Generator
  const handleGenerateWorkflow = () => {
    soundManager.playPickupSound();
    setLoading(true);

    const inputLower = promptInput.toLowerCase();

    // Contextual node generation based on user's custom prompt
    let triggerTitle = 'Custom Webhook Trigger';
    let triggerType = 'API Event';
    let aiTitle = 'Gemini 1.5 Analysis';
    let aiType = 'AI Cognitive Node';
    let logicTitle = 'Logic Condition & Filter';
    let logicType = 'Branching Rule';
    let outputTitle = 'Multi-Platform Dispatch';
    let outputType = 'Output Relay';

    if (inputLower.includes('shopify') || inputLower.includes('refund') || inputLower.includes('ecommerce') || inputLower.includes('order')) {
      triggerTitle = 'Shopify Order / Refund Webhook';
      triggerType = 'E-Commerce Trigger';
      aiTitle = 'Gemini Policy & Fraud Audit';
      aiType = 'AI Verification';
      logicTitle = 'Check Order Value & Return Window';
      logicType = 'Conditional Branch';
      outputTitle = 'QuickBooks Ledger & Customer Email';
      outputType = 'ERP & CRM Sync';
    } else if (inputLower.includes('lead') || inputLower.includes('sales') || inputLower.includes('crm') || inputLower.includes('form')) {
      triggerTitle = 'Inbound Lead Form Webhook';
      triggerType = 'Form Submission';
      aiTitle = 'Gemini Lead Enrichment & ICP Score';
      aiType = 'AI Scoring Engine';
      logicTitle = 'Filter Score > 80 (High Intent)';
      logicType = 'Priority Router';
      outputTitle = 'HubSpot CRM + Slack Sales Alert';
      outputType = 'Notification Relay';
    } else if (inputLower.includes('invoice') || inputLower.includes('payment') || inputLower.includes('stripe') || inputLower.includes('bill')) {
      triggerTitle = 'Stripe Payment / Invoice Event';
      triggerType = 'Payment Webhook';
      aiTitle = 'Gemini OCR & Line-Item Extractor';
      aiType = 'AI Data Parser';
      logicTitle = 'Validate Tax ID & Currency Rate';
      logicType = 'Data Sanitation';
      outputTitle = 'PostgreSQL DB + Accounting Sync';
      outputType = 'Database Commit';
    } else if (inputLower.includes('support') || inputLower.includes('ticket') || inputLower.includes('email') || inputLower.includes('customer')) {
      triggerTitle = 'Inbound Zendesk / Email Trigger';
      triggerType = 'Support Event';
      aiTitle = 'Gemini Sentiment & Categorization';
      aiType = 'NLP Classifier';
      logicTitle = 'Urgency > 0.8 Escalation Filter';
      logicType = 'SLA Router';
      outputTitle = 'Draft AI Reply & Slack Escalation';
      outputType = 'Auto-Responder';
    } else {
      triggerTitle = `Event Trigger: "${promptInput.slice(0, 24)}..."`;
      triggerType = 'REST Webhook';
      aiTitle = 'Gemini 1.5 Pro Semantic Processing';
      aiType = 'AI Reasoning Agent';
      logicTitle = 'n8n Business Logic & Data Transform';
      logicType = 'Data Pipeline';
      outputTitle = 'Automated Cloud Database & Notification';
      outputType = 'Enterprise Sync';
    }

    setTimeout(() => {
      soundManager.playSuccessChime();
      setGeneratedWorkflow([
        { step: 1, title: triggerTitle, type: triggerType, icon: 'FileText' },
        { step: 2, title: aiTitle, type: aiType, icon: 'Bot' },
        { step: 3, title: logicTitle, type: logicType, icon: 'Zap' },
        { step: 4, title: outputTitle, type: outputType, icon: 'CheckCircle2' },
      ]);
      setLoading(false);
    }, 600);
  };

  // Dynamic Intelligent Support Ticket Triage
  const handleRunTriage = () => {
    soundManager.playPickupSound();
    setLoading(true);

    const ticketLower = supportTicket.toLowerCase();

    let priority = 'MEDIUM (NORMAL 🟡)';
    let sentiment = 'NEUTRAL (0.15)';
    let category = 'General Inquiry';
    let reply =
      'Thank you for reaching out. Our support agent has received your request and will follow up with you shortly.';

    if (ticketLower.includes('fail') || ticketLower.includes('lock') || ticketLower.includes('urgent') || ticketLower.includes('down') || ticketLower.includes('error')) {
      priority = 'HIGH (URGENT 🔴)';
      sentiment = 'FRUSTRATED (-0.88)';
      category = 'Critical Account / System Outage';
      reply =
        'Hello, our AI monitoring agent has immediately escalated this ticket to the on-call engineer. We have provisionally restored your workspace access while investigating the logs.';
    } else if (ticketLower.includes('refund') || ticketLower.includes('charge') || ticketLower.includes('invoice') || ticketLower.includes('payment') || ticketLower.includes('bill')) {
      priority = 'HIGH (FINANCIAL 💳)';
      sentiment = 'CONCERNED (-0.55)';
      category = 'Billing & Payment Escalation';
      reply =
        'Hello, we have located your payment record in our billing system. Our finance operations specialist has been assigned to process this resolution within 2 business hours.';
    } else if (ticketLower.includes('feature') || ticketLower.includes('how to') || ticketLower.includes('setup') || ticketLower.includes('integrate')) {
      priority = 'STANDARD (ROUTINE 🟢)';
      sentiment = 'POSITIVE (+0.70)';
      category = 'Product & API Integration';
      reply =
        'Hello! Here is the direct guide to integrate your API keys into the Spark Flow dashboard. Let us know if you need assistance configuring the webhooks.';
    }

    setTimeout(() => {
      soundManager.playSuccessChime();
      setTriageResult({
        priority,
        sentiment,
        category,
        reply,
      });
      setLoading(false);
    }, 600);
  };

  return (
    <section id="ai-sandbox" className="py-16 bg-brand-darker relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Live Interactive AI Agent Playground</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Test AI Agents & Workflows <span className="text-gradient">Live</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Interact with our AI agent architectures directly in your browser. Select a sandbox demo below to test instant execution!
          </p>
        </div>

        {/* Sandbox Container */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 bg-slate-900/80 overflow-x-auto">
            <button
              onClick={() => {
                soundManager.playPickupSound();
                setActiveTab('workflow');
              }}
              className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === 'workflow'
                  ? 'border-cyan-500 text-cyan-300 bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>1. Prompt-to-n8n Workflow Generator</span>
            </button>

            <button
              onClick={() => {
                soundManager.playPickupSound();
                setActiveTab('triage');
              }}
              className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === 'triage'
                  ? 'border-purple-500 text-purple-300 bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>2. Support Ticket Triage AI</span>
            </button>

            <button
              onClick={() => {
                soundManager.playPickupSound();
                setActiveTab('extractor');
              }}
              className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === 'extractor'
                  ? 'border-emerald-500 text-emerald-300 bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>3. Document OCR JSON Extractor</span>
            </button>
          </div>

          {/* Tab Content 1: Workflow Generator */}
          {activeTab === 'workflow' && (
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Describe Your Desired Automation Workflow
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={handleGenerateWorkflow}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition shrink-0"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    <span>Generate Workflow</span>
                  </button>
                </div>
              </div>

              {/* Generated Nodes Visual Display */}
              {generatedWorkflow && (
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
                    Live Generated n8n Architecture Diagram
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {generatedWorkflow.map((node) => (
                      <motion.div
                        key={node.step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: node.step * 0.1 }}
                        className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 relative"
                      >
                        <div className="text-[10px] font-mono text-cyan-400 font-semibold mb-1">
                          STEP #{node.step}
                        </div>
                        <div className="text-sm font-bold text-white mb-1">{node.title}</div>
                        <div className="text-xs text-slate-400">{node.type}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Content 2: Support Ticket Triage */}
          {activeTab === 'triage' && (
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Sample Customer Ticket Input
                </label>
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    value={supportTicket}
                    onChange={(e) => setSupportTicket(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={handleRunTriage}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                    <span>Run AI Sentiment & Triage Engine</span>
                  </button>
                </div>
              </div>

              {triageResult && (
                <div className="p-6 rounded-xl bg-slate-900 border border-purple-500/30 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4 space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-slate-400">PRIORITY LEVEL:</span>
                      <div className="text-amber-400 font-bold text-sm mt-0.5">{triageResult.priority}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">SENTIMENT RATING:</span>
                      <div className="text-purple-300 font-bold text-sm mt-0.5">{triageResult.sentiment}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">CATEGORY:</span>
                      <div className="text-cyan-400 font-bold text-sm mt-0.5">{triageResult.category}</div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-6 pt-4 lg:pt-0">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 block">
                      AI Generated Resolution Reply
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-slate-950 p-4 rounded-lg border border-white/5">
                      "{triageResult.reply}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Content 3: Document Extractor */}
          {activeTab === 'extractor' && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                    Sample Document Input (PDF Invoice)
                  </div>
                  <div className="p-4 rounded-lg bg-slate-950 border border-white/5 text-xs text-slate-300 font-mono space-y-1">
                    <p>INVOICE #: INV-99482</p>
                    <p>DATE: 2026-08-12</p>
                    <p>CLIENT: Acme Technologies Inc.</p>
                    <p>LINE ITEM: Custom React WebApp Development - $12,500.00</p>
                    <p>LINE ITEM: Gemini AI Agent Integration - $4,200.00</p>
                    <p>TOTAL DUE: $16,700.00 USD</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>Structured JSON Output</span>
                    <Terminal className="w-4 h-4 text-emerald-400" />
                  </div>
                  <pre className="text-[11px] text-emerald-300 font-mono overflow-x-auto leading-relaxed">
{`{
  "invoice_id": "INV-99482",
  "client_name": "Acme Technologies Inc.",
  "total_amount": 16700.00,
  "currency": "USD",
  "items": [
    { "name": "Custom React WebApp", "price": 12500.00 },
    { "name": "Gemini AI Integration", "price": 4200.00 }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
