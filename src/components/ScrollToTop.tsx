import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
        setScrollProgress(progress);
        setIsVisible(currentScroll > 320);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 p-2 rounded-full bg-slate-950/90 border border-cyan-500/30 text-cyan-400 hover:text-white shadow-xl shadow-cyan-950/50 backdrop-blur-md transition-all group flex items-center justify-center cursor-pointer"
          title="Scroll to Top"
          aria-label="Scroll to top of page"
        >
          {/* Circular Progress Ring */}
          <svg className="w-10 h-10 -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-slate-800"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="url(#scrollGradient)"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
            <defs>
              <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Arrow Icon */}
          <div className="absolute inset-0 flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
            <ChevronUp className="w-4 h-4 text-cyan-400 group-hover:text-white" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
