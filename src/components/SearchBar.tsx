import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';

interface Props { value: string; onChange: (v: string) => void; }

export default function SearchBar({ value, onChange }: Props) {
  return (
    <motion.div className="relative max-w-md mx-auto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="Search designs..."
        className="w-full pl-12 pr-4 py-3 glass text-white placeholder-gray-500 rounded-xl focus:outline-none focus:border-purple-500/30 font-body text-sm" />
    </motion.div>
  );
}
