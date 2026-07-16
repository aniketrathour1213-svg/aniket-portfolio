import { motion } from 'framer-motion';
import type { CategoryFilter as CatType } from '@/types';

const cats: CatType[] = ['All', 'Poster Design', 'Social Media Design', 'Menu Design'];

interface Props { selected: CatType; onChange: (f: CatType) => void; }

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {cats.map(c => (
        <motion.button key={c} onClick={() => onChange(c)}
          className={`px-5 py-2.5 rounded-full text-sm font-body transition-all duration-300 ${selected === c ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg' : 'glass text-gray-400 hover:text-white'}`}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {c}
        </motion.button>
      ))}
    </div>
  );
}
