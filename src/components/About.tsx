import { motion } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';

export default function About() {
  const { settings } = useSettings();
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl glass overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-red-500/20 flex items-center justify-center mb-4">
                  <span className="text-4xl font-heading font-bold gradient-text">A</span>
                </div>
                <p className="text-gray-500 text-sm font-body">Aniket</p>
                <p className="text-gray-600 text-xs font-body mt-1">Graphic Designer</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <motion.h2 className="text-3xl md:text-4xl font-heading font-bold" initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              About <span className="gradient-text">Me</span>
            </motion.h2>
            <motion.p className="text-gray-400 font-body leading-relaxed" initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
              {settings.about_text || 'I am a passionate graphic designer with a focus on creating visually compelling designs that help businesses communicate their message effectively.'}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
