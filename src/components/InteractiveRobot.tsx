import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Zap } from 'lucide-react';

interface InteractiveRobotProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const InteractiveRobot: React.FC<InteractiveRobotProps> = ({ isOpen, onToggle }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem('sparkflow_sound_enabled') === 'true';
    } catch {
      return false;
    }
  });
  const [speechText, setSpeechText] = useState('Ask me anything! 🤖');
  const [showTooltip, setShowTooltip] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [eyeExpression, setEyeExpression] = useState<'normal' | 'excited' | 'dragged' | 'chatting'>('normal');
  const hasAutoGreetedRef = useRef(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync sound setting across components
  useEffect(() => {
    const handleSoundToggle = (e: any) => {
      const muted = e.detail?.isMuted;
      if (typeof muted === 'boolean') {
        setSoundEnabled(!muted);
      }
    };
    window.addEventListener('sparkflow:sound_mute_toggle', handleSoundToggle);
    return () => window.removeEventListener('sparkflow:sound_mute_toggle', handleSoundToggle);
  }, []);

  // Direct SVG Joint Angles for Pivot Rotations
  const [angles, setAngles] = useState({
    bodyTilt: 0,
    headTilt: 0,
    antennaTilt: 0,
    leftShoulder: 0,
    leftElbow: 0,
    rightShoulder: 0,
    rightElbow: 0,
    leftHip: 0,
    leftKnee: 0,
    rightHip: 0,
    rightKnee: 0,
  });

  // Web Audio API Synthesizer
  const playSciFiSound = (type: 'whoosh' | 'beep' | 'click' | 'chime' | 'zap') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(1050, now + 0.08);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'whoosh') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(250, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'chime') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'zap') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1000, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.15);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      // Audio policy fallback
    }
  };

  // 12s Brief Auto-Greeting (Auto-dismisses after 4.5s)
  useEffect(() => {
    const greetingTimer = setTimeout(() => {
      if (!isOpen && !isDragging && !hasAutoGreetedRef.current) {
        hasAutoGreetedRef.current = true;
        setSpeechText('Need help? Click to chat with AI! 🤖');
        setEyeExpression('excited');
        setShowTooltip(true);
        playSciFiSound('beep');

        tooltipTimeoutRef.current = setTimeout(() => {
          setShowTooltip(false);
        }, 4500);
      }
    }, 12000);
    return () => {
      clearTimeout(greetingTimer);
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    };
  }, [isOpen, isDragging]);

  // Tooltip & Expression State
  useEffect(() => {
    if (isOpen) {
      setSpeechText('Ask me anything! 💬 (ESC to close)');
      setEyeExpression('chatting');
      setShowTooltip(false);
    } else if (isDragging) {
      setSpeechText('Flexible Physics! 🌀');
      setEyeExpression('dragged');
      setShowTooltip(true);
    } else if (isHovered) {
      setSpeechText('Click to chat or drag me! 🤖');
      setEyeExpression('excited');
      setShowTooltip(true);
    } else if (!hasAutoGreetedRef.current) {
      setShowTooltip(false);
      setEyeExpression('normal');
    }
  }, [isOpen, isDragging, isHovered]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !soundEnabled;
    setSoundEnabled(next);
    try {
      localStorage.setItem('sparkflow_sound_enabled', String(next));
      localStorage.setItem('sound_muted', String(!next));
      window.dispatchEvent(new CustomEvent('sparkflow:sound_mute_toggle', { detail: { isMuted: !next } }));
    } catch { }
  };

  const isDraggingRef = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);

  const handleDragStart = (_: any, info: any) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartPos.current = { x: info.point.x, y: info.point.y };
    playSciFiSound('whoosh');
  };

  const handleDrag = (_: any, info: any) => {
    const vx = info.velocity.x;
    const vy = info.velocity.y;

    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

    // Calculate Flexible Physics Joint Angles
    setAngles({
      bodyTilt: clamp(vx * 0.035, -20, 20),
      headTilt: clamp(vx * 0.015 + vy * 0.01, -12, 12),
      antennaTilt: clamp(-vx * 0.07, -25, 25),
      leftShoulder: clamp(-vx * 0.045 - vy * 0.025, -40, 40),
      leftElbow: clamp(-vx * 0.03 + Math.abs(vy) * 0.02, -30, 30),
      rightShoulder: clamp(-vx * 0.045 + vy * 0.025, -40, 40),
      rightElbow: clamp(-vx * 0.03 - Math.abs(vy) * 0.02, -30, 30),
      leftHip: clamp(-vx * 0.05, -30, 30),
      leftKnee: clamp(vy * 0.025 + Math.abs(vx) * 0.015, -20, 20),
      rightHip: clamp(-vx * 0.05, -30, 30),
      rightKnee: clamp(vy * 0.025 - Math.abs(vx) * 0.015, -20, 20),
    });

    const speed = Math.hypot(vx, vy);

    // Spawn Subdued Dark-Cyan Particles
    if (speed > 180 && Math.random() > 0.45) {
      const colors = ['#0891b2', '#0e7490', '#64748b', '#475569', '#06b6d4'];
      const newParticle: Particle = {
        id: particleIdRef.current++,
        x: (Math.random() - 0.5) * 36,
        y: 60 + Math.random() * 15,
        size: Math.random() * 5 + 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setParticles((prev) => [...prev.slice(-15), newParticle]);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);

    // Reset joint angles to 0
    setAngles({
      bodyTilt: 0,
      headTilt: 0,
      antennaTilt: 0,
      leftShoulder: 0,
      leftElbow: 0,
      rightShoulder: 0,
      rightElbow: 0,
      leftHip: 0,
      leftKnee: 0,
      rightHip: 0,
      rightKnee: 0,
    });
  };

  const triggerZapEffect = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSciFiSound('zap');
    const colors = ['#0891b2', '#0e7490', '#06b6d4', '#64748b'];
    const newParticles = Array.from({ length: 10 }).map((_, i) => ({
      id: particleIdRef.current++,
      x: (Math.random() - 0.5) * 50,
      y: (Math.random() - 0.5) * 50,
      size: Math.random() * 5 + 3,
      color: colors[i % colors.length],
    }));
    setParticles((prev) => [...prev, ...newParticles]);
  };

  const handleTap = () => {
    playSciFiSound('chime');
    onToggle();
  };

  return (
    <motion.div
      drag
      dragConstraints={{
        top: -window.innerHeight + 150,
        left: -window.innerWidth + 150,
        right: 20,
        bottom: 20,
      }}
      dragElastic={0.12}
      dragTransition={{ bounceStiffness: 220, bounceDamping: 20 }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      onHoverStart={() => {
        setIsHovered(true);
        playSciFiSound('beep');
      }}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={-1}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 cursor-grab active:cursor-grabbing select-none group touch-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ring-0"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      style={{ touchAction: 'none', WebkitTapHighlightColor: 'transparent', outline: 'none' }}
    >
      {/* Dark Cyber Sparks */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0.9, scale: 1, y: p.y, x: p.x }}
            animate={{ opacity: 0, scale: 0, y: p.y + 25, x: p.x + (Math.random() - 0.5) * 16 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Floating Dark Speech Tooltip (Conditionally Shown) */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 5, scale: 0.85, x: '-50%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ left: '50%', x: '-50%' }}
            className="absolute -top-14 sm:-top-16 whitespace-nowrap bg-slate-950/95 text-cyan-400 border border-cyan-800/40 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium shadow-2xl shadow-cyan-950/40 backdrop-blur-md flex items-center gap-1.5 sm:gap-2 pointer-events-none z-20"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span>{speechText}</span>

            <button
              onClick={triggerZapEffect}
              className="pointer-events-auto p-1 hover:bg-cyan-900/30 rounded-full text-cyan-400 hover:text-cyan-200 transition"
              title="Trigger Energy Pulse"
            >
              <Zap className="w-3 h-3" />
            </button>

            <button
              onClick={toggleSound}
              className="pointer-events-auto p-1 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition cursor-pointer"
              title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            >
              {soundEnabled ? <Volume2 className="w-3 h-3 text-cyan-400" /> : <VolumeX className="w-3 h-3 text-slate-500" />}
            </button>

            <div
              className="absolute -bottom-1.5 w-3 h-3 bg-slate-950 border-r border-b border-cyan-800/40 pointer-events-none"
              style={{ left: '50%', transform: 'translateX(-50%) rotate(45deg)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Robot Container */}
      <motion.div
        animate={{
          y: isDragging ? 0 : [0, -6, 0],
        }}
        transition={{
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative w-24 h-28 sm:w-32 sm:h-36 flex flex-col items-center justify-center filter drop-shadow-[0_12px_28px_rgba(8,145,178,0.35)]"
      >
        {/* Subtle Dark Aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/30 via-slate-900/30 to-indigo-950/30 rounded-full blur-xl animate-pulse -z-10" />

        {/* Dark Metallic Cyan Robot SVG */}
        <svg viewBox="0 0 140 160" className="w-full h-full overflow-visible">
          {/* MASTER BODY TILT ROTATION */}
          <g transform={`rotate(${angles.bodyTilt}, 70, 80)`}>

            {/* 1. DARK GUNMETAL SLATE LEGS */}
            {/* LEFT LEG */}
            <g transform={`rotate(${angles.leftHip}, 54, 110)`}>
              <line x1="54" y1="110" x2="48" y2="128" stroke="#64748b" strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="48" cy="128" r="3" fill="#0e7490" />
              <g transform={`rotate(${angles.leftKnee}, 48, 128)`}>
                <line x1="48" y1="128" x2="43" y2="146" stroke="#64748b" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            </g>

            {/* RIGHT LEG */}
            <g transform={`rotate(${angles.rightHip}, 86, 110)`}>
              <line x1="86" y1="110" x2="92" y2="128" stroke="#64748b" strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="92" cy="128" r="3" fill="#0e7490" />
              <g transform={`rotate(${angles.rightKnee}, 92, 128)`}>
                <line x1="92" y1="128" x2="97" y2="146" stroke="#64748b" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            </g>

            {/* 2. TORSO (DARK OBSIDIAN CHASSIS WITH GUNMETAL BORDER & DEEP CYAN CORE) */}
            <rect
              x="42"
              y="58"
              width="56"
              height="52"
              rx="12"
              fill="#090d16"
              stroke="#475569"
              strokeWidth="4"
            />

            {/* Deep Dark Cyan Chest Arc Reactor */}
            <circle cx="70" cy="84" r="12" fill="#0e7490" />
            <circle cx="70" cy="84" r="12" fill="#0891b2" className="animate-ping" opacity="0.3" />
            <circle cx="70" cy="84" r="5.5" fill="#e2e8f0" />

            {/* 3. DEEP DARK CYAN ARMS */}
            {/* LEFT ARM */}
            <g transform={`rotate(${angles.leftShoulder}, 42, 68)`}>
              <line x1="42" y1="68" x2="28" y2="84" stroke="#0891b2" strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="28" cy="84" r="3.5" fill="#475569" />
              <g transform={`rotate(${angles.leftElbow}, 28, 84)`}>
                <line x1="28" y1="84" x2="20" y2="100" stroke="#0891b2" strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="19" cy="102" r="3.5" fill="#0e7490" />
              </g>
            </g>

            {/* RIGHT ARM */}
            <g transform={`rotate(${angles.rightShoulder}, 98, 68)`}>
              <line x1="98" y1="68" x2="112" y2="84" stroke="#0891b2" strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="112" cy="84" r="3.5" fill="#475569" />
              <g transform={`rotate(${angles.rightElbow}, 112, 84)`}>
                <line x1="112" y1="84" x2="120" y2="100" stroke="#0891b2" strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="121" cy="102" r="3.5" fill="#0e7490" />
              </g>
            </g>

            {/* 4. SOLID NECK */}
            <rect x="63" y="48" width="14" height="14" rx="3" fill="#475569" />

            {/* 5. HEAD ASSEMBLY */}
            <g transform={`rotate(${angles.headTilt}, 70, 48)`}>
              {/* Helmet Box with Gunmetal Slate Border */}
              <rect
                x="44"
                y="16"
                width="52"
                height="34"
                rx="10"
                fill="#090d16"
                stroke="#475569"
                strokeWidth="4"
              />

              {/* Darker Cyber Cyan Eyes */}
              {eyeExpression === 'dragged' ? (
                <g fill="#0891b2">
                  <circle cx="58" cy="33" r="6" />
                  <circle cx="82" cy="33" r="6" />
                  <circle cx="59" cy="32" r="2" fill="#ffffff" />
                  <circle cx="83" cy="32" r="2" fill="#ffffff" />
                </g>
              ) : eyeExpression === 'chatting' ? (
                <g stroke="#0891b2" strokeWidth="3" strokeLinecap="round" fill="none">
                  <path d="M 54 35 Q 58 29 62 35" />
                  <path d="M 78 35 Q 82 29 86 35" />
                </g>
              ) : eyeExpression === 'excited' ? (
                <g fill="#0891b2">
                  <circle cx="58" cy="33" r="6.5" />
                  <circle cx="82" cy="33" r="6.5" />
                  <circle cx="59" cy="32" r="2.5" fill="#ffffff" />
                  <circle cx="83" cy="32" r="2.5" fill="#ffffff" />
                </g>
              ) : (
                <g fill="#0891b2">
                  <circle cx="58" cy="33" r="5.5" />
                  <circle cx="82" cy="33" r="5.5" />
                  <circle cx="56.5" cy="31.5" r="1.8" fill="#ffffff" />
                  <circle cx="80.5" cy="31.5" r="1.8" fill="#ffffff" />
                </g>
              )}

              {/* 6. ANTENNA WITH DEEP CYAN LIGHT ORB */}
              <g transform={`rotate(${angles.antennaTilt}, 70, 16)`}>
                <line x1="70" y1="16" x2="70" y2="4" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="70" cy="4" r="5" fill="#0891b2" className="animate-pulse" />
                <circle cx="70" cy="4" r="8" fill="#0891b2" opacity="0.3" className="animate-ping" />
              </g>
            </g>

          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
};
