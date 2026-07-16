export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'Poster Design' | 'Social Media Design' | 'Menu Design';
  image_url: string;
  featured: boolean;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
  project_year?: number;
  client_name?: string;
}

export interface SiteSettings {
  id: string;
  whatsapp_number: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  about_text: string;
  about_mission: string;
  about_philosophy: string;
  contact_email: string;
  website_title: string;
  seo_description: string;
}

export interface AdminStats {
  totalDesigns: number;
  featuredDesigns: number;
  totalCategories: number;
  latestUpload: PortfolioItem | null;
  storageUsed: string;
}

export type SortOption = 'latest' | 'oldest' | 'featured';
export type CategoryFilter = 'All' | 'Poster Design' | 'Social Media Design' | 'Menu Design';
