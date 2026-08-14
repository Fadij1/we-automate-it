import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Terminal } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export const SparkCompanion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      text: "INITIATING PROTOCOL... Greetings. I am Spark, your autonomous companion. How can we optimize your operations today?",
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
      const botResponseText = data.response || "My subroutines confirm we can architect a solution for this. Accessing engineering database...";

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
        text: "My communication uplinks are currently offline. Please use the contact form to reach the human engineering team.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Robot Animation Variants for "Breathing" and floating
  const robotCoreVariants = {
    idle: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const armLeftVariants = {
    idle: {
      rotate: [0, -15, 0],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity }
    }
  };

  const armRightVariants = {
    idle: {
      rotate: [0, 15, 0],
      transition: { duration: 3.5, ease: "easeInOut", repeat: Infinity }
    }
  };

  const legLeftVariants = {
    idle: {
      y: [0, 5, 0],
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.5 }
    }
  };

  const legRightVariants = {
    idle: {
      y: [0, 5, 0],
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1 }
    }
  };

  return (
    <>
      {/* 2D Floating Robot Companion */}
      <div className="fixed bottom-24 right-8 z-50 flex flex-col items-center justify-center">
        
        {/* Optional Interaction Prompt */}
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-brand-dark text-brand-light text-[10px] font-mono px-3 py-1.5 rounded shadow-lg shadow-brand-dark/20 border border-brand-light/10"
          >
            SYS.ONLINE_
          </motion.div>
        )}

        <motion.div 
          onClick={() => setIsOpen(!isOpen)}
          className="relative cursor-pointer w-24 h-32 flex items-center justify-center group"
          variants={robotCoreVariants}
          animate="idle"
        >
          {/* SVG Robot Graphic */}
          <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl group-hover:scale-105 transition-transform duration-300">
            {/* Left Arm */}
            <motion.path 
              d="M30 45 L15 65 L20 80" 
              stroke="#D97736" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
              variants={armLeftVariants} animate="idle" style={{ originX: 0.3, originY: 0.45 }}
            />
            
            {/* Right Arm */}
            <motion.path 
              d="M70 45 L85 65 L80 80" 
              stroke="#D97736" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
              variants={armRightVariants} animate="idle" style={{ originX: 0.7, originY: 0.45 }}
            />

            {/* Left Leg */}
            <motion.path 
              d="M40 85 L35 110" 
              stroke="#A3A3A3" strokeWidth="6" strokeLinecap="round"
              variants={legLeftVariants} animate="idle"
            />

            {/* Right Leg */}
            <motion.path 
              d="M60 85 L65 110" 
              stroke="#A3A3A3" strokeWidth="6" strokeLinecap="round"
              variants={legRightVariants} animate="idle"
            />

            {/* Torso/Body Matte Panel */}
            <rect x="30" y="40" width="40" height="50" rx="8" fill="#2A2825" stroke="#DCD5CB" strokeWidth="2" />
            
            {/* Chest Core Engine */}
            <circle cx="50" cy="65" r="8" fill="#D97736" className={loading ? "animate-pulse" : ""} />
            <circle cx="50" cy="65" r="4" fill="#F2EFE9" />

            {/* Head */}
            <rect x="35" y="10" width="30" height="25" rx="5" fill="#2A2825" stroke="#DCD5CB" strokeWidth="2" />
            
            {/* Eyes */}
            <circle cx="43" cy="22" r="3" fill="#D97736" className="animate-pulse" />
            <circle cx="57" cy="22" r="3" fill="#D97736" className="animate-pulse" />
            
            {/* Antenna */}
            <path d="M50 10 L50 2" stroke="#A3A3A3" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="2" r="2" fill="#D97736" />
          </svg>
        </motion.div>
      </div>

      {/* Cinematic Sci-Fi Chat Interface Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-32 right-4 sm:right-36 z-40 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] matte-panel rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-brand-dark border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D97736]/10 text-[#D97736] border border-[#D97736]/30 flex items-center justify-center">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-light font-mono">
                    SPARK_OS v2.0
                  </h4>
                  <div className="text-[10px] text-[#3E8E5A] font-semibold flex items-center gap-1 font-mono tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E8E5A] animate-pulse"></span>
                    SYSTEM_ONLINE
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-light/50 hover:text-brand-light p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-5 bg-brand-light">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-brand-dark text-brand-light'
                        : 'bg-brand-secondary border border-[#4D4944] text-brand-dark'
                    }`}
                  >
                    {msg.sender === 'user' ? <MessageSquare className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex flex-col gap-1 max-w-[85%]">
                    <div
                      className={`p-3 text-sm font-mono leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-brand-dark text-brand-light rounded-2xl rounded-tr-sm'
                          : 'bg-white border border-[#3D3A36] text-brand-dark rounded-2xl rounded-tl-sm'
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    </div>
                    <span className="text-[9px] text-[#7D7466] px-1 font-mono uppercase tracking-widest">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {loading && (
                 <div className="flex gap-3">
                 <div className="w-7 h-7 rounded bg-brand-secondary border border-[#4D4944] text-brand-dark flex items-center justify-center shrink-0">
                   <Terminal className="w-3.5 h-3.5" />
                 </div>
                 <div className="p-3 bg-white border border-[#3D3A36] rounded-2xl rounded-tl-sm text-xs font-mono text-[#7D7466] animate-pulse">
                   COMPUTING_RESPONSE...
                 </div>
               </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-4 bg-brand-secondary border-t border-[#3D3A36]">
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
                  placeholder="Enter command..."
                  className="flex-1 bg-white border border-[#4D4944] rounded-xl px-4 py-3 text-sm text-brand-dark font-mono placeholder:text-[#7D7466] focus:outline-none focus:border-[#D97736]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-3 rounded-xl bg-[#D97736] hover:bg-[#C46A2E] disabled:opacity-50 text-white transition shrink-0 shadow-md shadow-[#D97736]/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
