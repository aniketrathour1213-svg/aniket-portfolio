import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left" style={{ scaleX, background: 'linear-gradient(90deg, #6b21a8, #7f1d1d, #1e3a5f, #06b6d4)' }} />;
}
