import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Menu, X, ArrowRight, Zap, Volume2, VolumeX, Lock, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('sparkflow_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    setIsMuted(soundManager.getMutedStatus());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const handleAuthChange = (e: any) => {
      setIsAdmin(!!e.detail?.isAdmin);
    };
    window.addEventListener('sparkflow:admin_auth_change', handleAuthChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('sparkflow:admin_auth_change', handleAuthChange);
    };
  }, []);

  const [lowPowerMode, setLowPowerMode] = useState(() => {
    try {
      return localStorage.getItem('sparkflow_low_power_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleLowPower = () => {
    soundManager.playPickupSound();
    const next = !lowPowerMode;
    setLowPowerMode(next);
    try {
      localStorage.setItem('sparkflow_low_power_mode', String(next));
      window.dispatchEvent(new CustomEvent('sparkflow:toggle_low_power', { detail: { lowPower: next } }));
    } catch {}

    const msg = next
      ? '🟢 Battery Saver Mode ON: 3D particles & cursor effects paused for maximum battery life.'
      : '⚡ Performance Mode ON: All interactive 3D particle systems active.';
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const openBookingModal = (e: React.MouseEvent) => {
    e.preventDefault();
    soundManager.playPickupSound();
    window.dispatchEvent(new CustomEvent('sparkflow:open_booking_modal'));
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
                Spark <span className="text-gradient">Flow</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold -mt-1">
                Web & AI Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#ai-sandbox" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 py-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>AI Sandbox</span>
            </a>
            <a href="#services" className="hover:text-white transition-colors py-1">
              Services
            </a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors py-1 font-semibold text-cyan-400">
              Projects
            </a>
            <a href="#process" className="hover:text-white transition-colors py-1">
              Process
            </a>
            <a href="#roi-calculator" className="hover:text-white transition-colors py-1">
              ROI Calculator
            </a>
            <a href="#case-studies" className="hover:text-white transition-colors py-1">
              Results
            </a>
            <a href="#faq" className="hover:text-cyan-300 transition-colors py-1">
              FAQ
            </a>
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Battery / Low Power Saver Mode */}
            <button
              onClick={toggleLowPower}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                lowPowerMode
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border-white/10'
              }`}
              title={lowPowerMode ? 'Battery Saver Active (Particles Paused)' : 'Enable Battery Saver Mode'}
            >
              <Zap className={`w-4 h-4 ${lowPowerMode ? 'text-emerald-400 fill-emerald-400' : 'text-slate-400'}`} />
            </button>

            {/* Audio Toggle Button */}
            <button
              onClick={() => {
                const muted = soundManager.toggleMute();
                setIsMuted(muted);
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Book Strategy Call Button (1-Click Modal) */}
            <button
              onClick={openBookingModal}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-accent via-purple-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Totally Hidden Stealth Admin Console Trigger */}
            <button
              onClick={() => {
                soundManager.playPickupSound();
                window.dispatchEvent(new CustomEvent('sparkflow:open_admin_modal'));
              }}
              tabIndex={-1}
              className={
                isAdmin
                  ? 'p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm transition cursor-pointer'
                  : 'w-4 h-4 opacity-0 cursor-default bg-transparent border-0 outline-none select-none pointer-events-auto'
              }
            >
              {isAdmin && <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />}
            </button>
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
            href="#ai-sandbox"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-cyan-400 font-semibold py-2"
          >
            <Zap className="w-4 h-4" />
            <span>AI Agent Sandbox</span>
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white py-2"
          >
            Services & Solutions
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cyan-300 font-semibold py-2"
          >
            Featured Projects
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white py-2"
          >
            Process & Workflow
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
          <div className="pt-2">
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

      {/* Floating Battery Saver Toast Banner */}
      {toastMessage && (
        <div className="max-w-md mx-auto px-4 mt-3 animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-none">
          <div className="p-3 rounded-xl bg-slate-950/95 border border-cyan-500/50 shadow-2xl shadow-cyan-950/50 text-xs font-semibold text-cyan-200 text-center backdrop-blur-xl flex items-center justify-center gap-2">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </header>
  );
};
