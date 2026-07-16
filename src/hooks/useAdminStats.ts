import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { AdminStats } from '@/types';

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    totalDesigns: 0, featuredDesigns: 0, totalCategories: 3,
    latestUpload: null, storageUsed: '0 MB',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { count: total } = await supabase.from('portfolio').select('*', { count: 'exact', head: true });
      const { count: featured } = await supabase.from('portfolio').select('*', { count: 'exact', head: true }).eq('featured', true);
      const { data: latest } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false }).limit(1);
      setStats(prev => ({ ...prev, totalDesigns: total || 0, featuredDesigns: featured || 0, latestUpload: latest?.[0] || null }));
      setLoading(false);
    }
    fetch();
  }, []);

  return { stats, loading };
}
