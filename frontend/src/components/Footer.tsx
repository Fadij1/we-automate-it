import React from 'react';
import { Activity, Mail, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 py-16 text-zinc-500 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-zinc-950">
                Spark Flow
              </span>
            </div>
            <p className="text-zinc-500 leading-relaxed">
              We build intelligent websites, automated systems, and customized AI agents for modern businesses. Only software, pure efficiency.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-zinc-950">Platform</h4>
              <a href="#services" className="hover:text-zinc-950 transition-colors">Capabilities</a>
              <a href="#interactive" className="hover:text-zinc-950 transition-colors">Interactive Tools</a>
              <a href="#case-studies" className="hover:text-zinc-950 transition-colors">Case Studies</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-zinc-950">Connect</h4>
              <a href="mailto:sparkfloweg@gmail.com" className="flex items-center gap-2 hover:text-zinc-950 transition-colors">
                <Mail className="w-4 h-4" />
                sparkfloweg@gmail.com
              </a>
              <a href="https://sparkflow-eg.com" className="hover:text-zinc-950 transition-colors">
                sparkflow-eg.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Spark Flow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full hover:bg-zinc-200 text-zinc-400 hover:text-zinc-950 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-zinc-200 text-zinc-400 hover:text-zinc-950 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
