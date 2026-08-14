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

    const points: { x: number; y: number; age: number; maxAge: number; color: string }[] = [];
    const colors = ['#06b6d4', '#6366f1', '#a855f7', '#38bdf8'];

    const handleMouseMove = (e: MouseEvent) => {
      points.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        maxAge: 20,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;

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
        const radius = (1 - pt.age / pt.maxAge) * 4 + 1;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha * 0.6;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
    />
  );
};
