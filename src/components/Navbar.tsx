import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Menu, X, ArrowRight, Zap, Volume2, VolumeX, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  onOpenAchievements: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAchievements }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundManager.getMutedStatus());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-dark/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-indigo-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-brand-dark rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                We Automate <span className="text-gradient">It</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold -mt-1">
                Web & AI Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#games" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 py-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Interactive Games</span>
            </a>
            <a href="#ai-sandbox" className="hover:text-purple-300 transition-colors py-1">
              AI Sandbox
            </a>
            <a href="#services" className="hover:text-white transition-colors py-1">
              Services
            </a>
            <a href="#roi-calculator" className="hover:text-white transition-colors py-1">
              ROI Calculator
            </a>
            <a href="#case-studies" className="hover:text-white transition-colors py-1">
              Results
            </a>
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            {/* Audio Toggle Button */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition"
              title={isMuted ? 'Unmute Game Sounds' : 'Mute Game Sounds'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Achievement Badges Button */}
            <button
              onClick={onOpenAchievements}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Achievements</span>
            </button>

            <a
              href="#contact"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-accent via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-6 mt-3 space-y-4 animate-in slide-in-from-top duration-200">
          <a
            href="#games"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-cyan-400 font-semibold py-2"
          >
            <Zap className="w-4 h-4" />
            <span>Interactive Games 🎮</span>
          </a>
          <a
            href="#ai-sandbox"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white py-2"
          >
            AI Agent Sandbox
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white py-2"
          >
            Services & Solutions
          </a>
          <a
            href="#roi-calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white py-2"
          >
            ROI Calculator
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white py-2"
          >
            Contact Us
          </a>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAchievements();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold"
            >
              <Trophy className="w-4 h-4" />
              <span>View Unlocked Achievements</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-accent text-white font-semibold text-center shadow-lg shadow-indigo-500/30"
            >
              <span>Book a Call Now</span>
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
