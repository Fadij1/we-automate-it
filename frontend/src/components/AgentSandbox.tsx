import React, { useState } from 'react';
import { Bot, FileText, Send, User, ChevronRight, ScanLine } from 'lucide-react';

export const AgentSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'support' | 'ocr'>('support');
  const [inputMsg, setInputMsg] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'SUPPORT_PROTOCOL_ACTIVE. How can I assist with your account today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setChatMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Analyzing request against database... Action approved and executed automatically.' }
      ]);
    }, 1500);
  };

  return (
    <section className="py-32 bg-[#1A1814] relative overflow-hidden border-y border-[#3D3A36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F2EFE9] mb-6 leading-[1.1]">
              Autonomous Intelligence, <br />
              <span className="text-[#D97736]">Deployed.</span>
            </h2>
            <p className="text-[#7D7466] text-lg leading-relaxed mb-8 font-mono">
              Test our AI Agent capabilities in this secure sandbox environment. Experience how the agent handles support routing and complex document extraction instantly.
            </p>

            <div className="flex gap-4 mb-10">
              <button 
                onClick={() => setActiveTab('support')}
                className={`flex-1 py-4 px-6 rounded-xl font-bold font-mono uppercase tracking-widest text-xs transition-all ${
                  activeTab === 'support' 
                    ? 'bg-brand-dark text-white shadow-lg' 
                    : 'bg-white border border-[#4D4944] text-[#F2EFE9] hover:bg-[#2A2825]'
                }`}
              >
                Ticket Triage
              </button>
              <button 
                onClick={() => setActiveTab('ocr')}
                className={`flex-1 py-4 px-6 rounded-xl font-bold font-mono uppercase tracking-widest text-xs transition-all ${
                  activeTab === 'ocr' 
                    ? 'bg-brand-dark text-white shadow-lg' 
                    : 'bg-white border border-[#4D4944] text-[#F2EFE9] hover:bg-[#2A2825]'
                }`}
              >
                Data Extraction
              </button>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-[#F2EFE9] font-bold font-mono">
                <ChevronRight className="w-4 h-4 text-[#D97736]" /> Full natural language understanding
              </li>
              <li className="flex items-center gap-3 text-sm text-[#F2EFE9] font-bold font-mono">
                <ChevronRight className="w-4 h-4 text-[#D97736]" /> Zero-hallucination guardrails
              </li>
              <li className="flex items-center gap-3 text-sm text-[#F2EFE9] font-bold font-mono">
                <ChevronRight className="w-4 h-4 text-[#D97736]" /> Instant API-level execution
              </li>
            </ul>
          </div>

          {/* Right: Interactive Sandbox */}
          <div className="matte-panel rounded-[2rem] p-4 sm:p-6 shadow-xl relative overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#D94436]" />
                <div className="w-3 h-3 rounded-full bg-[#D97736]" />
                <div className="w-3 h-3 rounded-full bg-[#3E8E5A]" />
              </div>
              <div className="flex-1 text-center font-mono text-[10px] uppercase tracking-widest text-[#7D7466]">
                sandbox_env_{activeTab}.exe
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-2xl border border-[#3D3A36] h-[400px] flex flex-col overflow-hidden">
              {activeTab === 'support' ? (
                <>
                  <div className="flex-1 p-5 overflow-y-auto space-y-4">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center ${
                          msg.role === 'user' ? 'bg-brand-dark text-white' : 'bg-[#2A2825] border border-[#4D4944] text-brand-dark'
                        }`}>
                          {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`p-3 text-sm font-mono max-w-[80%] rounded-xl ${
                          msg.role === 'user' 
                            ? 'bg-brand-dark text-white rounded-tr-sm' 
                            : 'bg-[#1A1814] border border-[#3D3A36] text-[#F2EFE9] rounded-tl-sm'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center bg-[#2A2825] border border-[#4D4944] text-brand-dark">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="p-3 bg-[#1A1814] border border-[#3D3A36] rounded-xl rounded-tl-sm text-xs font-mono text-[#7D7466] animate-pulse">
                          PROCESSING...
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-[#3D3A36] bg-[#1A1814]">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input 
                        type="text" 
                        value={inputMsg}
                        onChange={(e) => setInputMsg(e.target.value)}
                        placeholder="Enter test query..."
                        className="flex-1 bg-white border border-[#4D4944] rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#D97736]"
                      />
                      <button 
                        type="submit"
                        disabled={!inputMsg.trim() || isTyping}
                        className="p-3 rounded-xl bg-[#D97736] text-white disabled:opacity-50 hover:bg-[#C46A2E] transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col p-6 items-center justify-center text-center relative group cursor-pointer">
                  <div className="absolute inset-4 border-2 border-dashed border-[#4D4944] rounded-xl group-hover:border-[#D97736] transition-colors flex items-center justify-center bg-[#1A1814]">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-6">
                        <FileText className="w-16 h-16 text-[#7D7466] group-hover:text-[#D97736] transition-colors" />
                        <div className="absolute inset-0 overflow-hidden rounded">
                          <div className="w-full h-1 bg-[#D97736]/50 shadow-[0_0_8px_#D97736] absolute top-0 left-0 animate-[float_2s_ease-in-out_infinite]" />
                        </div>
                      </div>
                      <h4 className="font-bold text-[#F2EFE9] font-mono text-sm uppercase tracking-widest mb-2">Drop Invoice PDF</h4>
                      <p className="text-xs text-[#7D7466] font-mono max-w-[200px]">
                        The agent will instantly extract Line Items, Tax, and Totals into JSON.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
