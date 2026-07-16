import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import type { PortfolioItem } from '@/types';

interface Props { items: PortfolioItem[]; currentIndex: number; isOpen: boolean; onClose: () => void; }

export default function ImageViewer({ items, currentIndex, isOpen, onClose }: Props) {
  const [index, setIndex] = useState(currentIndex);
  useEffect(() => setIndex(currentIndex), [currentIndex]);
  const next = useCallback(() => setIndex(p => (p + 1) % items.length), [items.length]);
  const prev = useCallback(() => setIndex(p => (p - 1 + items.length) % items.length), [items.length]);
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (!isOpen) return; if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); };
    window.addEventListener('keydown', handle); return () => window.removeEventListener('keydown', handle);
  }, [isOpen, onClose, next, prev]);

  if (!isOpen || !items.length) return null;
  const item = items[index];
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[60] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />
        <button onClick={onClose} className="absolute top-6 right-6 z-10 text-white/70 hover:text-white p-2"><HiX size={28} /></button>
        {items.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 md:left-8 z-10 text-white/70 hover:text-white p-2"><HiChevronLeft size={32} /></button>
            <button onClick={next} className="absolute right-4 md:right-8 z-10 text-white/70 hover:text-white p-2"><HiChevronRight size={32} /></button>
          </>
        )}
        <motion.div className="relative z-10 max-w-5xl max-h-[90vh] mx-4 flex flex-col items-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.4 }}>
          <img src={item.image_url} alt={item.title} className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl" />
          <div className="mt-6 text-center">
            <h3 className="text-xl font-heading font-semibold text-white">{item.title}</h3>
            {item.description && <p className="mt-2 text-gray-400 font-body">{item.description}</p>}
            <span className="inline-block mt-2 px-3 py-1 glass text-xs text-purple-300 font-body rounded-full">{item.category}</span>
          </div>
          <div className="mt-4 text-sm text-gray-600 font-body">{index + 1} / {items.length}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
