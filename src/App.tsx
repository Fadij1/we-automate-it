import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStackMarquee } from './components/TechStackMarquee';
import { AgentSandbox } from './components/AgentSandbox';
import { LivePipelineFlowchart } from './components/LivePipelineFlowchart';
import { ProjectEstimatorWizard } from './components/ProjectEstimatorWizard';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ProcessSection } from './components/ProcessSection';
import { RoiCalculator } from './components/RoiCalculator';
import { CaseStudies } from './components/CaseStudies';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { AiChatWidget } from './components/AiChatWidget';
import { BookingModal } from './components/BookingModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { ScrollToTop } from './components/ScrollToTop';
import { NeonCursorTrail } from './components/NeonCursorTrail';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  useEffect(() => {
    // If URL already contains a hash on initial load, smoothly scroll to it and clean the URL
    if (window.location.hash) {
      const initialTarget = document.querySelector(window.location.hash);
      if (initialTarget) {
        setTimeout(() => {
          const navOffset = 80;
          const elementPosition = initialTarget.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 100);
      }
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Global smooth-scroll handler for all anchor tags with clean URL preservation
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.slice(1);

        if (!targetId) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          history.replaceState(null, '', window.location.pathname + window.location.search);
          return;
        }

        const el = document.getElementById(targetId);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }

        // Clean the browser address bar immediately so # hashes never clutter the URL
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 font-sans selection:bg-brand-accent selection:text-white relative overflow-x-hidden">
      {/* Sci-Fi Neon Particle Cursor Follower */}
      <NeonCursorTrail />

      {/* Fixed Sticky Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Enterprise Tech Stack Infinite Marquee */}
      <TechStackMarquee />

      {/* Live AI Agent Interactive Sandbox & Architecture Flowchart */}
      <AgentSandbox />

      {/* Live Visual Pipeline Node Flowchart & Project Scope Estimator Wizard Container */}
      <section className="py-12 bg-brand-darker relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <LivePipelineFlowchart />
          <ProjectEstimatorWizard />
        </div>
      </section>

      {/* Core Services & Capabilities */}
      <ServicesSection />

      {/* Featured Projects & Client Deployments Showcase */}
      <ProjectsShowcase />

      {/* Process & Mission Timeline */}
      <ProcessSection />

      {/* ROI & Savings Simulator */}
      <RoiCalculator />

      {/* Case Studies & Impact Metrics */}
      <CaseStudies />

      {/* Client Testimonials & Social Proof Carousel */}
      <TestimonialsSection />

      {/* Interactive FAQ Accordion Section */}
      <FaqSection />

      {/* Project Intake & Contact Section */}
      <ContactSection />

      {/* 1-Click Strategy Call Calendar Booking Modal */}
      <BookingModal />

      {/* Admin Authentication & Project Management Modal */}
      <AdminAuthModal />

      {/* Floating Spark Flow AI Assistant Robot */}
      <AiChatWidget />

      {/* Circular Scroll Progress & Back to Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
