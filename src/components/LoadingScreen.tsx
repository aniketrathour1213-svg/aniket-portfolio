import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 2500); return () => clearTimeout(t); }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div className="fixed inset-0 z-[100] bg-[#0d0d11] flex flex-col items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
          <motion.h1 className="text-4xl md:text-6xl font-heading font-bold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="gradient-text">Aniket</span>
          </motion.h1>
          <motion.div className="mt-8 h-[2px] w-48 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.3 }} />
          <motion.p className="mt-4 text-sm text-gray-500 font-body tracking-widest uppercase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>Graphic Designer</motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
