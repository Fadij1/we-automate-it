import React from 'react';
import { Bot, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-cyan-300">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-white text-base">We Automate <span className="text-gradient">It</span></span>
              <p className="text-[11px] text-slate-500 mt-0.5">© 2026 We Automate It. All rights reserved.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
            <a href="#games" className="hover:text-white transition">Interactive Games</a>
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#process" className="hover:text-white transition">Process</a>
            <a href="#roi-calculator" className="hover:text-white transition">ROI Simulator</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
