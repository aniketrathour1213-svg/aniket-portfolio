import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import ImageCard from './ImageCard';
import ImageViewer from './ImageViewer';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import SkeletonCard from './SkeletonCard';
import type { CategoryFilter as CatType } from '@/types';

export default function PortfolioSection() {
  const { items, loading, filter, setFilter, sort, setSort, search, setSearch } = usePortfolio();
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const sorted = [...items].sort((a, b) => {
    if (sort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    if (sort === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">My <span className="gradient-text">Portfolio</span></h2>
          <p className="text-gray-400 font-body max-w-xl mx-auto mb-8">A selection of my recent design projects</p>
          <div className="space-y-6">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter selected={filter} onChange={(f: CatType) => setFilter(f)} />
            <div className="flex justify-center gap-3">
              {(['latest','oldest','featured'] as const).map(o => (
                <button key={o} onClick={() => setSort(o)}
                  className={`px-4 py-1.5 rounded-full text-xs font-body transition-all ${sort === o ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-gray-500 hover:text-gray-300 border border-transparent'}`}>
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20"><p className="text-gray-500 font-body">No designs found. Check back soon!</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((item, i) => <ImageCard key={item.id} item={item} onClick={() => { setViewerIndex(i); setViewerOpen(true); }} index={i} />)}
          </div>
        )}
      </div>
      <ImageViewer items={sorted} currentIndex={viewerIndex} isOpen={viewerOpen} onClose={() => setViewerOpen(false)} />
    </section>
  );
}
