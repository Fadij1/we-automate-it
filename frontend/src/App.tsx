import React from 'react';
import { FloatingBottomNav } from './components/FloatingBottomNav';
import { Hero } from './components/Hero';
import { N8nWorkflowGame } from './components/games/N8nWorkflowGame';
import { SolutionMatchmakerGame } from './components/games/SolutionMatchmakerGame';
import { TechStackSimulatorGame } from './components/games/TechStackSimulatorGame';
import { KnowledgeIntegrationGame } from './components/games/KnowledgeIntegrationGame';
import { AgentSandbox } from './components/AgentSandbox';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { RoiCalculator } from './components/RoiCalculator';
import { CaseStudies } from './components/CaseStudies';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SparkCompanion } from './components/SparkCompanion';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-primary text-ui-text font-sans selection:bg-brand-dark selection:text-brand-light relative pb-24">
      <FloatingBottomNav />

      <Hero />

      <ServicesSection />

      {/* Interactive Tools Section */}
      <section id="interactive" className="py-24 bg-brand-secondary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-zinc-950 mb-6">
              Experience the Flow
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed">
              Interact with our tools to see how we simplify complex software architecture, automate mundane workflows, and match AI solutions to your business needs.
            </p>
          </div>

          <N8nWorkflowGame />
          <SolutionMatchmakerGame />
          <KnowledgeIntegrationGame />
          <TechStackSimulatorGame />
        </div>
      </section>

      <AgentSandbox />
      <ProcessSection />
      <RoiCalculator />
      <CaseStudies />
      <ContactSection />
      <Footer />
      <SparkCompanion />
    </div>
  );
};

export default App;
