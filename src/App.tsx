import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { N8nWorkflowGame } from './components/games/N8nWorkflowGame';
import { SolutionMatchmakerGame } from './components/games/SolutionMatchmakerGame';
import { TechStackSimulatorGame } from './components/games/TechStackSimulatorGame';
import { AgentSandbox } from './components/AgentSandbox';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { RoiCalculator } from './components/RoiCalculator';
import { CaseStudies } from './components/CaseStudies';
import { ContactSection } from './components/ContactSection';
import { AiChatWidget } from './components/AiChatWidget';
import { AchievementBadges } from './components/AchievementBadges';
import { NeonCursorTrail } from './components/NeonCursorTrail';
import { Footer } from './components/Footer';
import { Gamepad2 } from 'lucide-react';

export const App: React.FC = () => {
  const [achievementsOpen, setAchievementsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 font-sans selection:bg-brand-accent selection:text-white relative">
      {/* Sci-Fi Neon Particle Cursor Follower */}
      <NeonCursorTrail />

      {/* Fixed Sticky Header */}
      <Navbar onOpenAchievements={() => setAchievementsOpen(true)} />

      {/* Hero Section with Interactive 3D Canvas */}
      <Hero />

      {/* Interactive Drag & Drop Games Section */}
      <section id="games" className="py-24 bg-brand-darker relative overflow-hidden">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Gamepad2 className="w-4 h-4 text-rose-400" />
              <span>Interactive Game Playground</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Test Our Capabilities <span className="text-gradient">Hands-On</span>
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              Build authentic n8n workflows, match solutions to business bottlenecks, and design custom tech stack architectures!
            </p>
          </div>

          {/* Game 1: Authentic n8n Visual Workflow Creator */}
          <N8nWorkflowGame />

          {/* Game 2: Solution Matchmaker */}
          <SolutionMatchmakerGame />

          {/* Game 3: Tech Stack & Quote Simulator */}
          <TechStackSimulatorGame />
        </div>
      </section>

      {/* Live AI Agent Interactive Sandbox */}
      <AgentSandbox />

      {/* Core Services */}
      <ServicesSection />

      {/* Process & Mission Timeline */}
      <ProcessSection />

      {/* ROI & Savings Simulator */}
      <RoiCalculator />

      {/* Case Studies & Impact Metrics */}
      <CaseStudies />

      {/* Project Intake Contact Section */}
      <ContactSection />

      {/* Floating Gemini AI Assistant Chatbot */}
      <AiChatWidget />

      {/* Achievements Modal Drawer */}
      <AchievementBadges
        isOpen={achievementsOpen}
        onClose={() => setAchievementsOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
