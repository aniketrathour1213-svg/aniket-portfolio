import { motion } from 'framer-motion';
import { HiOutlinePhotograph, HiOutlineShare, HiOutlineMenu } from 'react-icons/hi';
import { staggerContainer, staggerItem } from '@/animations';

const services = [
  { icon: HiOutlinePhotograph, title: 'Poster Design', desc: 'Eye-catching posters for events, promotions, campaigns, and brand awareness that grab attention instantly.' },
  { icon: HiOutlineShare, title: 'Social Media Design', desc: 'Engaging social media creatives, stories, banners, and ad designs optimized for every platform.' },
  { icon: HiOutlineMenu, title: 'Menu Design', desc: 'Beautiful restaurant and cafe menu designs that enhance your brand and delight your customers.' },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">My <span className="gradient-text">Services</span></h2>
          <p className="text-gray-400 font-body max-w-xl mx-auto">Professional design solutions tailored to make your brand stand out</p>
        </motion.div>
        <motion.div className="grid md:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} className="glass glass-hover p-8 rounded-xl group" variants={staggerItem}>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-800/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-2xl text-purple-300" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 font-body text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
