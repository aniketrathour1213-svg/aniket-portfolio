import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowDown } from 'react-icons/fi';
import { SITE_INFO, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/constants';
import ScrollIndicator from './ScrollIndicator';

export default function Hero() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.6 }}>
          <motion.p className="text-sm md:text-base text-purple-400 font-body tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 2.8 }}>
            {SITE_INFO.profession}
          </motion.p>
          <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 3.0 }}>
            <span className="gradient-text">{SITE_INFO.name}</span>
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-gray-400 font-body max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 3.2 }}>
            {SITE_INFO.tagline}
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 3.4 }}>
            <button onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary flex items-center gap-2">
              View Portfolio <FiArrowDown />
            </button>
            <button onClick={handleWhatsApp} className="btn-secondary flex items-center gap-2">
              <FaWhatsapp className="text-green-400" /> Message on WhatsApp
            </button>
          </motion.div>
        </motion.div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
