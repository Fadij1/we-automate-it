import React, { useState } from 'react';
import { Mail, MessageSquare, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-brand-dark relative text-brand-light overflow-hidden">
      
      {/* Cinematic grid overlay for the dark section */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded border border-[#D97736]/30 bg-[#D97736]/10 mb-8 font-mono text-xs uppercase tracking-widest text-[#D97736]">
              <Terminal className="w-3.5 h-3.5" />
              <span>Connect</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tight mb-6 leading-tight text-white">
              Ready to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97736] to-[#C4A484]">upgrade</span> your operations?
            </h2>
            
            <p className="text-brand-light/70 text-lg leading-relaxed mb-12 font-mono">
              Whether you need a full-scale web application, a custom AI agent, or automated data pipelines, we're ready to engineer your solution.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#D97736]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Email Transmission</h4>
                  <p className="text-brand-light/60 font-mono text-sm mb-2">Direct secure line to our engineers.</p>
                  <a href="mailto:sparkfloweg@gmail.com" className="text-[#D97736] font-bold font-mono hover:text-[#C4A484] transition-colors">
                    sparkfloweg@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-[#D97736]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Strategy Call</h4>
                  <p className="text-brand-light/60 font-mono text-sm mb-2">Schedule a 30-min technical scoping session.</p>
                  <a href="#" className="text-[#D97736] font-bold font-mono hover:text-[#C4A484] transition-colors flex items-center gap-1">
                    <span>Book via Calendly</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D97736]/10 to-transparent blur-3xl -z-10 rounded-full" />
            
            <div className="bg-black/50 border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-sm shadow-2xl">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#3E8E5A]/20 text-[#3E8E5A] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Transmission Received</h3>
                  <p className="text-brand-light/70 font-mono text-sm">
                    Our engineering team will analyze your request and respond within 24 hours.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-[#D97736] font-bold font-mono uppercase tracking-widest text-sm hover:text-[#C4A484] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold font-mono uppercase tracking-widest text-brand-light/70 ml-1">First Name</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#D97736] focus:ring-1 focus:ring-[#D97736] transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold font-mono uppercase tracking-widest text-brand-light/70 ml-1">Last Name</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#D97736] focus:ring-1 focus:ring-[#D97736] transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono uppercase tracking-widest text-brand-light/70 ml-1">Work Email</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#D97736] focus:ring-1 focus:ring-[#D97736] transition-all"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono uppercase tracking-widest text-brand-light/70 ml-1">Project Specifications</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#D97736] focus:ring-1 focus:ring-[#D97736] transition-all resize-none"
                      placeholder="Describe your current bottleneck..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full btn-primary py-5 text-lg font-mono uppercase tracking-widest shadow-lg shadow-[#D97736]/20"
                  >
                    {status === 'submitting' ? 'Transmitting...' : 'Initiate Contact'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
