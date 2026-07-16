import { motion } from 'framer-motion';
import type { PortfolioItem } from '@/types';

interface ImageCardProps { item: PortfolioItem; onClick: () => void; index: number; }

export default function ImageCard({ item, onClick, index }: ImageCardProps) {
  return (
    <motion.div className="group cursor-pointer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.05 }} onClick={onClick}>
      <div className="relative overflow-hidden rounded-xl glass">
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img src={item.image_url} alt={item.title} loading="lazy" className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-lg font-heading font-semibold text-white">{item.title}</h3>
          <span className="text-sm text-purple-300 font-body mt-1">{item.category}</span>
        </div>
        {item.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg">Featured</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
