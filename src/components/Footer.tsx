import { motion } from 'framer-motion';
import { SITE_INFO, WHATSAPP_NUMBER } from '@/constants';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-heading font-bold"><span className="gradient-text">{SITE_INFO.name}</span></h3>
            <p className="text-sm text-gray-500 font-body mt-1">{SITE_INFO.profession}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 font-body">
            <FaWhatsapp className="text-lg" /> {WHATSAPP_NUMBER}
          </div>
          <p className="text-sm text-gray-600 font-body">{SITE_INFO.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
