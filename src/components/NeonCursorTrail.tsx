import React, { useEffect, useRef } from 'react';

export const NeonCursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Check for touch screens or reduced motion preference
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    const points: { x: number; y: number; age: number; maxAge: number; color: string }[] = [];
    const colors = ['#06b6d4', '#6366f1', '#a855f7', '#38bdf8'];

    let animationId: number;
    let isLowPower = false;
    try {
      isLowPower = localStorage.getItem('sparkflow_low_power_mode') === 'true';
    } catch {}

    const handleLowPowerChange = (e: any) => {
      isLowPower = !!e.detail?.lowPower;
      if (isLowPower) {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, width, height);
      } else {
        render();
      }
    };
    window.addEventListener('sparkflow:toggle_low_power', handleLowPowerChange);

    const handleMouseMove = (e: MouseEvent) => {
      if (isLowPower) return;
      points.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        maxAge: 16,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = points.length - 1; i >= 0; i--) {
        const pt = points[i];
        pt.age++;

        if (pt.age >= pt.maxAge) {
          points.splice(i, 1);
          continue;
        }

        const alpha = 1 - pt.age / pt.maxAge;
        const radius = (1 - pt.age / pt.maxAge) * 3 + 1;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha * 0.4;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animationId = requestAnimationFrame(render);
    };

    if (!isLowPower) {
      render();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('sparkflow:toggle_low_power', handleLowPowerChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
    />
  );
};
