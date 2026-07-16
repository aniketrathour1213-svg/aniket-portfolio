import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.6 }}>
      <span className="text-xs text-gray-500 font-body tracking-widest uppercase">Scroll</span>
      <motion.div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent"
        animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
    </motion.div>
  );
}
