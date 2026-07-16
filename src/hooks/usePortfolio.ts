import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { PortfolioItem, CategoryFilter, SortOption } from '@/types';

export function usePortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [sort, setSort] = useState<SortOption>('latest');
  const [search, setSearch] = useState('');

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase.from('portfolio').select('*').eq('status', 'published');
      if (filter !== 'All') query = query.eq('category', filter);
      if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      query = query.order('created_at', { ascending: sort === 'oldest' });
      const { data, error } = await query;
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter, sort, search]);

  useEffect(() => { fetchPortfolio(); }, [fetchPortfolio]);

  return { items, loading, error, filter, setFilter, sort, setSort, search, setSearch, refetch: fetchPortfolio };
}

export function useAdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const addItem = async (item: any) => {
    const { error } = await supabase.from('portfolio').insert([item]);
    if (error) throw error;
    await fetchAll();
  };

  return { items, loading, error, fetchAll, addItem };
}
