import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw, ChevronDown } from 'lucide-react';
import { ChatMessage } from '../types';

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      text: "Hello! I'm the **We Automate It** AI Assistant. Ask me how custom web apps, AI agents, or n8n workflow automations can scale your business!",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: textToSend,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      const botResponseText = data.response || "We Automate It creates custom web apps, AI agents, and workflow automations to scale your business operations!";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        text: "We Automate It builds high-performance web applications and AI workflow agents.<br><br><a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-2xl shadow-indigo-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center"
          aria-label="Open AI Assistant Chat"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-400"></span>
          </span>
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
        </button>
      </div>

      {/* Chat Interface Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] glass-panel rounded-2xl border border-white/15 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Bot className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  We Automate It Assistant
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h4>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  AI Agent Active
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompt Pills */}
          <div className="p-2.5 bg-slate-900/80 border-b border-white/5 overflow-x-auto flex gap-1.5 text-[11px] scrollbar-none">
            <button
              onClick={() => handleSend('How can this website help me?')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 text-cyan-200 border border-white/10 hover:border-cyan-500/30 whitespace-nowrap transition"
            >
              How can this help me?
            </button>
            <button
              onClick={() => handleSend('What services do you offer?')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-indigo-500/20 text-indigo-200 border border-white/10 hover:border-indigo-500/30 whitespace-nowrap transition"
            >
              Services?
            </button>
            <button
              onClick={() => handleSend('How much does automation cost?')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-purple-500/20 text-purple-200 border border-white/10 hover:border-purple-500/30 whitespace-nowrap transition"
            >
              Pricing?
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="flex flex-col gap-1 max-w-[82%]">
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-800/90 text-slate-200 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    <div
                      className="whitespace-pre-line leading-relaxed chatbot-message-body"
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 px-1 font-mono">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-800 text-slate-400 border border-white/10 rounded-tl-none flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Generating AI response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-900/90 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AI, custom web apps..."
                className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
