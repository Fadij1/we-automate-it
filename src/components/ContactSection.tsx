import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { WORLD_COUNTRIES } from '../utils/countries';

export const ContactSection: React.FC = () => {
  const [countryCode, setCountryCode] = useState('+20');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectScope: 'Web & AI Agent',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const fullPhoneNumber = `${countryCode} ${formData.phone.trim()}`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhoneNumber,
          message: `[Scope: ${formData.projectScope}] - ${formData.message}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectScope: 'Web & AI Agent',
          message: '',
        });
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMsg(data.error || 'Failed to submit form. Please check your network.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again or check connection.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-accent/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block py-1 px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            Worldwide Availability
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Ready To Automate Your <span className="text-gradient">Growth</span>?
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Tell us about your custom web application or AI agent needs. We will architect a custom roadmap for your team anywhere in the world.
          </p>
        </div>

        {/* Form Container */}
        <div className="gradient-border-card p-8 sm:p-12 shadow-2xl">
          {status === 'success' ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Delivered Successfully! 🎉</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you for reaching out to <strong>We Automate It</strong>. Our solution architects will review your submission and contact you within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Michael Nagi"
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="michael.nagi@gmail.com"
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone Number with Alphabetically Sorted Global Country Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Country & Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-slate-900/90 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono shrink-0 cursor-pointer max-w-[150px] truncate"
                    >
                      {WORLD_COUNTRIES.map((c, i) => (
                        <option key={`${c.code}-${i}`} value={c.code} className="bg-slate-900 text-white">
                          {c.flag} {c.country} ({c.code})
                        </option>
                      ))}
                    </select>

                    <div className="relative flex-1">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="01012345678"
                        className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Primary Solution Needed
                  </label>
                  <select
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition cursor-pointer"
                  >
                    <option value="Web & AI Agent">Custom WebApp & AI Agent Stack</option>
                    <option value="Custom Web App">Modern React/Next Web Application</option>
                    <option value="AI Chatbot / Support Bot">Autonomous Gemini / GPT AI Chatbot</option>
                    <option value="n8n Automation Engine">n8n Workflow Automation Engine</option>
                    <option value="Internal Dashboard">Internal Admin Tool / Analytics Portal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Project Details / Bottlenecks *
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="We want to automate our customer service workflow using Gemini AI and build a custom React dashboard..."
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-500/30 transition duration-200 disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Book Strategy Call & Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
