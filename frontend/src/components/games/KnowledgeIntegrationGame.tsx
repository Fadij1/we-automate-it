import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, FileText, Globe, Cpu, Zap, Link } from 'lucide-react';

interface KnowledgeNode {
  id: string;
  label: string;
  icon: React.ElementType;
  position: { x: number; y: number; z: number };
  color: string;
  botReaction: string;
}

const NODES: KnowledgeNode[] = [
  {
    id: 'crm',
    label: 'CRM Database',
    icon: Database,
    position: { x: -160, y: -110, z: -20 },
    color: '#D97736',
    botReaction: 'DATA SYNC COMPLETE. I now have access to 10,000+ customer records to personalize interactions.'
  },
  {
    id: 'docs',
    label: 'Support Docs',
    icon: FileText,
    position: { x: 150, y: -90, z: 10 },
    color: '#A3A3A3',
    botReaction: 'KNOWLEDGE ABSORBED. I can now resolve 85% of tier-1 support tickets autonomously.'
  },
  {
    id: 'web',
    label: 'Web Analytics',
    icon: Globe,
    position: { x: -140, y: 120, z: 30 },
    color: '#3E8E5A',
    botReaction: 'TRAFFIC PATTERNS ANALYZED. Identifying high-intent leads from organic search.'
  },
  {
    id: 'api',
    label: 'External APIs',
    icon: Cpu,
    position: { x: 160, y: 100, z: -10 },
    color: '#D94436',
    botReaction: 'WEBHOOKS CONNECTED. Real-time data feeds are now streaming into my core.'
  }
];

export const KnowledgeIntegrationGame: React.FC = () => {
  const [connectedNodes, setConnectedNodes] = useState<string[]>([]);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const handleConnect = (node: KnowledgeNode) => {
    if (!connectedNodes.includes(node.id)) {
      setConnectedNodes([...connectedNodes, node.id]);
      setActiveReaction(node.botReaction);
    }
  };

  return (
    <div className="w-full matte-panel rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-sm mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-[#3D3A36] pb-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-[#F2EFE9]">
            Neural Knowledge Integration
          </h3>
          <p className="text-[#7D7466] mt-2 text-lg font-mono text-sm">
            Connect Spark to external data nodes. Watch the AI adapt in real-time.
          </p>
        </div>
      </div>

      <div className="relative h-[400px] w-full perspective-1000 flex items-center justify-center bg-brand-dark rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.05)]">
        {/* Background Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            transform: 'rotateX(60deg) translateY(-50px) translateZ(-200px)',
            transformOrigin: 'top'
          }}
        />

        {/* Central Robot Core */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute z-20 w-24 h-24 rounded-full bg-brand-secondary border-4 border-[#D97736] flex items-center justify-center shadow-[0_0_40px_rgba(217,119,54,0.3)]"
        >
          <Zap className="w-8 h-8 text-[#D97736] animate-pulse" />
        </motion.div>

        {/* Floating Nodes */}
        {NODES.map((node) => {
          const isConnected = connectedNodes.includes(node.id);
          const Icon = node.icon;

          return (
            <motion.div
              key={node.id}
              initial={{ x: 0, y: 0 }}
              animate={{ 
                x: `${node.position.x}px`, 
                y: `${node.position.y}px`, 
                z: node.position.z 
              }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute z-30"
            >
              {isConnected && (
                <svg className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <motion.line 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    x1="200" y1="200" 
                    x2={200 - node.position.x} y2={200 - node.position.y} 
                    stroke={node.color} 
                    strokeWidth="2" 
                    strokeDasharray="4 4"
                    className="animate-[shimmer_1s_linear_infinite]"
                  />
                </svg>
              )}

              <button
                onClick={() => handleConnect(node)}
                disabled={isConnected}
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-110 shadow-lg ${
                  isConnected 
                    ? 'bg-brand-dark border-2 text-white'
                    : 'bg-white border border-[#4D4944] text-brand-dark hover:shadow-xl'
                }`}
                style={{ borderColor: isConnected ? node.color : '' }}
              >
                <Icon className={`w-5 h-5 ${isConnected ? 'text-white' : ''}`} style={{ color: isConnected ? node.color : '' }} />
                {!isConnected && <Link className="w-3 h-3 text-[#7D7466]" />}
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[10px] font-mono text-brand-light bg-brand-dark/80 px-2 py-1 rounded whitespace-nowrap">
                {node.label}
              </div>
            </motion.div>
          );
        })}

        {/* Robot Reaction HUD */}
        <AnimatePresence>
          {activeReaction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              key={activeReaction}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-brand-dark border border-[#D97736]/50 text-brand-light font-mono text-xs sm:text-sm px-6 py-4 rounded-xl max-w-[80%] text-center shadow-2xl shadow-[#D97736]/20"
            >
              <span className="text-[#D97736] font-bold mr-2">SPARK:</span>
              {activeReaction}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
