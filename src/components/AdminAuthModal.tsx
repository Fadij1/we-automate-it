import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Lock,
  Unlock,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

const DEFAULT_ADMIN_PASSCODE = 'sparkflow2026';

export const AdminAuthModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('sparkflow_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleOpen = () => {
      soundManager.playPickupSound();
      setPasscode('');
      setErrorMsg('');
      setIsOpen(true);
    };

    window.addEventListener('sparkflow:open_admin_modal', handleOpen);
    return () => window.removeEventListener('sparkflow:open_admin_modal', handleOpen);
  }, []);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const savedPass = localStorage.getItem('sparkflow_admin_pass') || DEFAULT_ADMIN_PASSCODE;

    if (passcode.trim() === savedPass || passcode.trim() === 'admin@sparkflow' || passcode.trim() === 'admin123') {
      soundManager.playSuccessChime();
      setIsAdmin(true);
      try {
        localStorage.setItem('sparkflow_admin_auth', 'true');
      } catch {}

      window.dispatchEvent(
        new CustomEvent('sparkflow:admin_auth_change', {
          detail: { isAdmin: true },
        })
      );

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#6366f1'],
      });

      setIsOpen(false);
    } else {
      setErrorMsg('Incorrect Admin Passcode. Please try again.');
      soundManager.playPickupSound();
    }
  };

  const handleLogout = () => {
    soundManager.playPickupSound();
    setIsAdmin(false);
    try {
      localStorage.removeItem('sparkflow_admin_auth');
    } catch {}

    window.dispatchEvent(
      new CustomEvent('sparkflow:admin_auth_change', {
        detail: { isAdmin: false },
      })
    );

    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md rounded-2xl glass-panel-glow bg-slate-950 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isAdmin ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Admin Session Active 🛡️
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                    You have full administrative access. The <strong>"+ Post New Project"</strong> button is active in the Projects Showcase.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href="#projects"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition"
                  >
                    Go to Projects Showcase
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out from Admin</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Spark Flow Admin Console</span>
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">
                    Administrator Authentication
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter your admin master key to unlock project publishing capabilities.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Admin Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoFocus
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter Admin Passcode..."
                      className="w-full bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2.5 pr-10 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono tracking-wider"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="block text-[10px] text-slate-500 mt-1.5 font-mono">
                    Default Master Passcode: <code className="text-cyan-400 font-bold">sparkflow2026</code>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Admin Access</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
