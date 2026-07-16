import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { SITE_INFO, WHATSAPP_NUMBER, WHATSAPP_MESSAGE, EMAIL_ADDRESS, EMAIL_SUBJECT, EMAIL_BODY } from '@/constants';

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Let's <span className="gradient-text">Work Together</span></h2>
          <p className="text-gray-400 font-body max-w-lg mx-auto">{SITE_INFO.availability}</p>
        </motion.div>
        <motion.div className="glass p-8 md:p-12 rounded-2xl text-center max-w-xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h3 className="text-2xl font-heading font-semibold text-white mb-8">Get in Touch</h3>
          <div className="space-y-4">
            <motion.button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank')}
              className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-lg" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <FaWhatsapp className="text-green-300 text-xl" /> Message on WhatsApp
            </motion.button>
            <motion.button onClick={() => window.open(`mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`, '_blank')}
              className="w-full btn-secondary flex items-center justify-center gap-3 py-4 text-lg" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <HiOutlineMail className="text-blue-400 text-xl" /> Send Email
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
