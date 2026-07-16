import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { NAV_LINKS, SITE_INFO } from '@/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0d0d11]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 2.5 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => handleClick('#home')} className="text-xl font-heading font-bold tracking-tight">
            <span className="gradient-text">{SITE_INFO.name}</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.name} onClick={() => handleClick(l.href)} className="text-sm text-gray-400 hover:text-white transition-colors font-body">{l.name}</button>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2" aria-label="Menu">
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0d11]/95 backdrop-blur-xl border-b border-white/5">
            <div className="px-4 py-4 space-y-2">
              {NAV_LINKS.map(l => (
                <button key={l.name} onClick={() => handleClick(l.href)} className="block w-full text-left py-3 text-gray-400 hover:text-white transition-colors font-body">{l.name}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
