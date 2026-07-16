import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const cx = useMotionValue(-100); const cy = useMotionValue(-100);
  const springX = useSpring(cx, { stiffness: 150, damping: 15 });
  const springY = useSpring(cy, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (window.innerWidth < 768) return;
    setVisible(true);
    const move = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cx, cy]);

  if (!visible) return null;
  return (
    <motion.div className="fixed pointer-events-none z-[9999]" style={{
      left: springX, top: springY, width: 300, height: 300,
      borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,33,168,0.08) 0%, transparent 70%)',
      transform: 'translate(-50%, -50%)',
    }} />
  );
}
