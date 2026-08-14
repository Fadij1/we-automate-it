import React from 'react';
import { HeroCanvas3D } from './HeroCanvas3D';
import { ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* 3D Canvas running in background */}
      <HeroCanvas3D />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-brand-dark border border-[rgba(255,255,255,0.05)] mb-8 shadow-xl shadow-brand-dark/20"
        >
          <Terminal className="w-4 h-4 text-spark-start" />
          <span className="text-xs sm:text-sm font-mono tracking-wider text-brand-light">
            SYSTEM_ONLINE
          </span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-8 leading-[1.05] text-[#F2EFE9]"
        >
          The Autonomous <br />
          <span className="text-spark font-display text-transparent bg-clip-text">Future</span> is Here.
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-[#7D7466] mb-12 leading-relaxed"
        >
          We engineer pristine websites, automated business systems, and custom AI agents. Pure digital efficiency powered by cutting-edge architecture.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#interactive" className="btn-primary w-full sm:w-auto text-base px-8 py-4">
            <span>Initiate Sequence</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#services" className="btn-secondary w-full sm:w-auto text-base px-8 py-4">
            <span>View Architecture</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
