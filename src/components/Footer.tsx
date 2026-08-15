import React from 'react';
import { Bot, Github, Linkedin, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand & Domain Details */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-cyan-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-white text-base">Spark <span className="text-gradient">Flow</span></span>
                <a
                  href="https://sparkflow-eg.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-mono ml-2"
                >
                  <Globe className="w-3 h-3 text-cyan-400" />
                  <span>sparkflow-eg.com</span>
                </a>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                © 2026 Spark Flow. • Email:{' '}
                <a href="mailto:sparkfloweg@gmail.com" className="text-slate-400 hover:text-cyan-300 transition">
                  sparkfloweg@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
            <a href="#ai-sandbox" className="hover:text-cyan-300 transition">AI Sandbox</a>
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#projects" className="hover:text-cyan-300 transition font-semibold text-cyan-400">Projects</a>
            <a href="#process" className="hover:text-white transition">Process</a>
            <a href="#roi-calculator" className="hover:text-white transition">ROI Simulator</a>
            <a href="#faq" className="hover:text-cyan-300 transition">FAQ</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          {/* Social & Contact Icons */}
          <div className="flex items-center gap-3 text-slate-400">
            {/* Email Icon */}
            <a
              href="mailto:sparkfloweg@gmail.com"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-cyan-400 hover:text-white border border-white/10 hover:border-cyan-500/30 transition flex items-center gap-1.5"
              title="Email Us: sparkfloweg@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* LinkedIn Icon */}
            <a
              href="#"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Github Icon */}
            <a
              href="#"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
