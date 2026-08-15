import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Plus,
  X,
  CheckCircle2,
  Sparkles,
  Bot,
  Globe,
  Zap,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Database,
  Terminal,
  Activity,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'all' | 'ai_agent' | 'webapp' | 'n8n_automation' | 'dashboard';
  client: string;
  industry: string;
  status: 'Live in Production' | 'Enterprise Rollout' | 'Client Milestone';
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  liveUrl?: string;
  isCustom?: boolean;
}

const DEFAULT_PROJECTS: ProjectItem[] = [

];

export const ProjectsShowcase: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('sparkflow_custom_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...DEFAULT_PROJECTS];
      }
    } catch { }
    return DEFAULT_PROJECTS;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('sparkflow_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleAuthChange = (e: any) => {
      setIsAdmin(!!e.detail?.isAdmin);
    };
    window.addEventListener('sparkflow:admin_auth_change', handleAuthChange);
    return () => window.removeEventListener('sparkflow:admin_auth_change', handleAuthChange);
  }, []);

  const [activeTab, setActiveTab] = useState<'all' | 'ai_agent' | 'webapp' | 'n8n_automation' | 'dashboard'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Close modals on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        if (isPostModalOpen) setIsPostModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, isPostModalOpen]);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'ai_agent' | 'webapp' | 'n8n_automation' | 'dashboard'>('ai_agent');
  const [newClient, setNewClient] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newChallenge, setNewChallenge] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [newMetricVal, setNewMetricVal] = useState('');
  const [newMetricLabel, setNewMetricLabel] = useState('');
  const [newTechStack, setNewTechStack] = useState('');
  const [newLiveUrl, setNewLiveUrl] = useState('');

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  const handlePostProject = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccessChime();

    const newProj: ProjectItem = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      client: newClient || 'Verified Enterprise Client',
      industry: newIndustry || 'Technology & Business Automation',
      status: 'Live in Production',
      summary: newSummary,
      challenge: newChallenge || 'Manual operational bottlenecks and disconnected data silos.',
      solution: newSolution || 'Custom full-stack architecture with automated AI workflows and real-time database sync.',
      metrics: [
        { label: newMetricLabel || 'Efficiency Boost', value: newMetricVal || '99.5%' },
        { label: 'Delivery Turnaround', value: '12 Days' },
        { label: 'Code & IP Ownership', value: '100% Client' },
      ],
      techStack: newTechStack
        ? newTechStack.split(',').map((t) => t.trim())
        : ['React', 'Google Gemini', 'n8n Pipelines', 'PostgreSQL'],
      liveUrl: newLiveUrl || 'https://sparkflow-eg.com',
      isCustom: true,
    };

    const updated = [newProj, ...projects];
    setProjects(updated);

    try {
      const customOnly = updated.filter((p) => p.isCustom);
      localStorage.setItem('sparkflow_custom_projects', JSON.stringify(customOnly));
    } catch { }

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#6366f1', '#10b981'],
    });

    setIsPostModalOpen(false);
    // Reset inputs
    setNewTitle('');
    setNewSummary('');
    setNewClient('');
    setNewMetricVal('');
    setNewMetricLabel('');
    setNewTechStack('');
  };

  const handleOpenArchitecture = (project: ProjectItem) => {
    soundManager.playPickupSound();
    setSelectedProject(project);
  };

  const handleRequestSimilar = (projectTitle: string) => {
    soundManager.playSuccessChime();
    setSelectedProject(null);

    const specText = `We are interested in building a solution similar to your project: "${projectTitle}".\n\nPlease let us know the recommended roadmap, architecture, and timeline for our team.`;

    window.dispatchEvent(
      new CustomEvent('sparkflow:prefill_contact', {
        detail: {
          scope: projectTitle,
          message: specText,
        },
      })
    );

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20 bg-brand-dark relative overflow-hidden">
      {/* Sci-Fi Background Glow Elements */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>Engineered Solutions & Deployments</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Our Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl">
              Explore bespoke high-performance web platforms, autonomous AI agents, and workflow systems delivered by Spark Flow.
            </p>
          </div>

          {/* Admin-Only Post New Project Button */}
          {isAdmin ? (
            <button
              onClick={() => {
                soundManager.playPickupSound();
                setIsPostModalOpen(true);
              }}
              className="self-start md:self-auto px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ring-1 ring-cyan-400/40"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Project</span>
            </button>
          ) : (
            <a
              href="#contact"
              className="self-start md:self-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-xs transition flex items-center gap-2"
            >
              <span>Request Custom Build</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-white/10 mb-10">
          {[
            { id: 'all', label: 'All Deployments', icon: Sparkles },
            { id: 'ai_agent', label: 'AI Agents & Chatbots', icon: Bot },
            { id: 'webapp', label: 'Custom Web Apps', icon: Globe },
            { id: 'n8n_automation', label: 'n8n Automations', icon: Zap },
            { id: 'dashboard', label: 'Portals & Dashboards', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playPickupSound();
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 bg-slate-900/75 shadow-xl relative overflow-hidden"
            >
              {/* Status Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {proj.status}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {proj.industry}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
                  {proj.summary}
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 font-mono mb-6">
                  {proj.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xs font-bold text-cyan-300">{m.value}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleOpenArchitecture(proj)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-200 transition flex items-center gap-1 cursor-pointer"
                >
                  <span>View Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
                    title="Live Client Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. PROJECT ARCHITECTURE DEEP-DIVE MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-2xl glass-panel-glow bg-slate-950 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                      {selectedProject.industry}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">
                      • {selectedProject.status}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Client: {selectedProject.client}</p>
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/20 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-rose-400">
                      The Operational Challenge
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/20 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">
                      The Engineered Solution
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Quantified Business Impact */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-cyan-950/60 border border-white/10 space-y-3">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Verified Business Outcomes
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProject.metrics.map((m, i) => (
                      <div key={i} className="p-3 rounded-lg bg-black/40 border border-white/5 text-center">
                        <div className="text-base sm:text-lg font-bold font-display text-emerald-400">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Modules */}
                <div>
                  <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Production Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">Want a similar architecture built for your business?</span>
                  <button
                    onClick={() => handleRequestSimilar(selectedProject.title)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>Request Similar Solution</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. POST NEW PROJECT MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isPostModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPostModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl rounded-2xl glass-panel-glow bg-slate-950 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <form onSubmit={handlePostProject} className="space-y-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Project to Showcase</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Publish New Client Deployment
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Add a newly delivered system to the live Spark Flow project showcase.
                  </p>
                </div>

                {/* Project Title */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. HealthBridge - HIPAA Patient Intake Engine"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Category & Industry */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      <option value="ai_agent">AI Agent & Chatbot</option>
                      <option value="webapp">Custom Web Application</option>
                      <option value="n8n_automation">n8n Workflow Automation</option>
                      <option value="dashboard">Portal & Admin Dashboard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Industry / Sector
                    </label>
                    <input
                      type="text"
                      value={newIndustry}
                      onChange={(e) => setNewIndustry(e.target.value)}
                      placeholder="e.g. HealthTech / FinTech"
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Short Overview Summary *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Describe what the system accomplishes in 1-2 sentences..."
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Key Metric Value & Label */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Key Result / KPI Value
                    </label>
                    <input
                      type="text"
                      value={newMetricVal}
                      onChange={(e) => setNewMetricVal(e.target.value)}
                      placeholder="e.g. 99.8% or 30 hrs/wk"
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      KPI Label
                    </label>
                    <input
                      type="text"
                      value={newMetricLabel}
                      onChange={(e) => setNewMetricLabel(e.target.value)}
                      placeholder="e.g. Data Accuracy / Saved"
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newTechStack}
                    onChange={(e) => setNewTechStack(e.target.value)}
                    placeholder="React, Next.js, Google Gemini, PostgreSQL, n8n"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Project to Showcase</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
