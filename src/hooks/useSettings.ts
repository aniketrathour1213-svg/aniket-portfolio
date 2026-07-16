import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { SiteSettings } from '@/types';

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    id: '', whatsapp_number: '+917503776772', hero_title: 'Aniket',
    hero_subtitle: 'Graphic Designer',
    hero_description: 'Creating modern posters, social media creatives and menu designs that help businesses stand out.',
    about_text: '', about_mission: '', about_philosophy: '',
    contact_email: 'aniketrathour1213@gmail.com',
    website_title: 'Aniket — Graphic Designer', seo_description: '',
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await supabase.from('settings').select('*').single();
      if (data) setSettings(data);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);
  return { settings, loading };
}
