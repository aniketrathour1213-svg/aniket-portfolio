import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);

    const blobs = [
      { x: 0.2, y: 0.3, vx: -0.0003, vy: 0.0002, size: 600, color: '107,33,168', opacity: 0.03 },
      { x: 0.8, y: 0.7, vx: 0.0002, vy: -0.0003, size: 500, color: '127,29,29', opacity: 0.02 },
      { x: 0.5, y: 0.2, vx: -0.0001, vy: 0.0004, size: 400, color: '30,58,95', opacity: 0.03 },
      { x: 0.1, y: 0.8, vx: 0.0004, vy: -0.0001, size: 350, color: '6,182,212', opacity: 0.015 },
      { x: 0.7, y: 0.4, vx: -0.0002, vy: -0.0002, size: 450, color: '107,33,168', opacity: 0.025 },
    ];

    function animate(time: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach(b => {
        const x = (b.x + Math.sin(time * b.vx) * 0.1) * canvas.width;
        const y = (b.y + Math.cos(time * b.vy) * 0.1) * canvas.height;
        const size = b.size * (1 + Math.sin(time * 0.0005) * 0.1);
        const g = ctx.createRadialGradient(x, y, 0, x, y, size);
        g.addColorStop(0, `rgba(${b.color},${b.opacity * 2})`);
        g.addColorStop(0.5, `rgba(${b.color},${b.opacity})`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(x - size, y - size, size * 2, size * 2);
      });
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.8 }} />;
}
