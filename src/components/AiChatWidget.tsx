import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw, ChevronDown } from 'lucide-react';
import { ChatMessage } from '../types';
import { InteractiveRobot } from './InteractiveRobot';

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      text: "Hello! I'm the <strong>Spark Flow</strong> AI Assistant. Ask me how custom web apps, AI agents, or n8n workflow automations can scale your business!",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Markdown & Rich Code Formatter
  const renderMarkdown = (rawText: string) => {
    if (!rawText) return '';

    let html = rawText;

    // 1. Code blocks (```language ... ```)
    html = html.replace(/```([a-zA-Z]*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const sanitized = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<div class="my-2 rounded-lg bg-slate-950/90 border border-cyan-500/20 overflow-hidden">
        ${lang ? `<div class="bg-white/5 px-2.5 py-1 text-[10px] text-cyan-400 font-mono border-b border-white/10 uppercase tracking-wider">${lang}</div>` : ''}
        <pre class="p-2.5 overflow-x-auto text-[11px] text-cyan-200 font-mono leading-relaxed"><code>${sanitized}</code></pre>
      </div>`;
    });

    // 2. Inline code (`code`)
    html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs">$1</code>');

    // 3. Bold text (**text**)
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>');

    // 4. Italic text (*text*)
    html = html.replace(/\*([^*]+)\*/g, '<em class="text-cyan-200">$1</em>');

    // 5. Markdown Links [label](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 underline font-medium">$1</a>');

    // 6. Bullet lists (- item or * item)
    html = html.replace(/^[\*\-]\s+(.+)$/gm, '<div class="flex items-start gap-1.5 my-1 ml-1"><span class="text-cyan-400 mt-1">•</span><span>$1</span></div>');

    return html;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Minimize/close chat on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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
      const botResponseText = data.response || "Spark Flow creates custom web apps, AI agents, and workflow automations to scale your business operations!";

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
        text: "Spark Flow builds high-performance web applications and AI workflow agents.<br><br><a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>",
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
      {/* Interactive Physics Drag-and-Drop Robot Launcher */}
      <InteractiveRobot isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

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
                  Spark Flow Assistant
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h4>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  AI Agent Active
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-300 border border-white/10" title="Press ESC to close">
                ESC
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
                aria-label="Minimize Chat (ESC)"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
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
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="flex flex-col gap-1 max-w-[82%]">
                  <div
                    className={`p-3 rounded-2xl ${msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-white/10 rounded-tl-none'
                      }`}
                  >
                    <div
                      className="leading-relaxed chatbot-message-body"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
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
