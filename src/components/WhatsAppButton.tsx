import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/constants';

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank');
  };

  return (
    <motion.button onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
      style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
      transition={{ delay: 2, type: 'spring', stiffness: 300 }}>
      <FaWhatsapp className="text-white text-2xl" />
    </motion.button>
  );
}
