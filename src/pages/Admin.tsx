import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminPortfolio } from '@/hooks/usePortfolio';
import { useAdminStats } from '@/hooks/useAdminStats';
import { supabase } from '@/lib/supabase';
import { HiHome, HiUpload, HiCollection, HiStar, HiCog, HiLogout, HiTrash, HiPencil, HiEye, HiEyeOff, HiPhotograph, HiX, HiMenu } from 'react-icons/hi';
import type { PortfolioItem } from '@/types';

function AdminLayout({ children, tab, setTab }: { children: React.ReactNode; tab: string; setTab: (s: string) => void }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: HiHome },
    { id: 'upload', label: 'Upload', icon: HiUpload },
    { id: 'manager', label: 'Manager', icon: HiCollection },
    { id: 'featured', label: 'Featured', icon: HiStar },
    { id: 'settings', label: 'Settings', icon: HiCog },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d11] flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d0d11] border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <h1 className="text-lg font-heading font-bold"><span className="gradient-text">Aniket</span><span className="text-gray-500 text-sm ml-2 font-body">Admin</span></h1>
        </div>
        <nav className="p-4 space-y-1">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => { setTab(t.id); setSidebar(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-all ${tab === t.id ? 'bg-purple-600/20 text-purple-300 border border-purple-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Icon className="text-lg" /> {t.label}
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <button onClick={() => { signOut(); navigate('/login'); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 font-body">
            <HiLogout className="text-lg" /> Logout
          </button>
        </div>
      </aside>
      {sidebar && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebar(false)} />}
      <div className="flex-1 min-w-0">
        <header className="h-16 border-b border-white/5 flex items-center px-4 lg:px-8">
          <button onClick={() => setSidebar(true)} className="lg:hidden text-gray-400 hover:text-white p-2"><HiMenu size={24} /></button>
          <h2 className="text-lg font-heading font-semibold text-white ml-2 lg:ml-0">{tabs.find(t => t.id === tab)?.label}</h2>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
}

function DashboardHome() {
  const { stats } = useAdminStats();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Total Designs', value: stats.totalDesigns },
        { label: 'Featured', value: stats.featuredDesigns },
        { label: 'Categories', value: stats.totalCategories },
        { label: 'Storage', value: stats.storageUsed },
      ].map((c, i) => (
        <motion.div key={c.label} className="glass p-6 rounded-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <p className="text-gray-400 text-sm font-body mb-2">{c.label}</p>
          <p className="text-3xl font-heading font-bold text-white">{c.value}</p>
        </motion.div>
      ))}
    </div>
  );
}

function UploadDesign({ onDone }: { onDone: () => void }) {
  const [title, setTitle] = useState(''); const [desc, setDesc] = useState('');
  const [category, setCategory] = useState<'Poster Design' | 'Social Media Design' | 'Menu Design'>('Poster Design');
  const [featured, setFeatured] = useState(false); const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [file, setFile] = useState<File | null>(null); const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) return;
    setUploading(true);
    try {
      const img = new Image(); const url = URL.createObjectURL(file);
      await new Promise(res => { img.onload = res; img.src = url; });
      const canvas = document.createElement('canvas');
      let { width, height } = img; const max = 1920;
      if (width > max || height > max) { const r = Math.min(max / width, max / height); width *= r; height *= r; }
      canvas.width = width; canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      const blob = await new Promise<Blob>(res => canvas.toBlob(b => res(b!), 'image/webp', 0.85));
      const fn = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { data: up } = await supabase.storage.from('portfolio-images').upload(fn, blob, { cacheControl: '3600' });
      const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(fn);
      await supabase.from('portfolio').insert([{ title, description: desc, category, image_url: publicUrl, featured, status }]);
      setTitle(''); setDesc(''); setCategory('Poster Design'); setFeatured(false); setStatus('published'); setFile(null); setPreview(null);
      onDone();
    } catch (err: any) { alert(err.message); } finally { setUploading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-purple-500/30 text-center mb-8"
        onDragOver={e => e.preventDefault()} onDrop={e => { const f = e.dataTransfer.files[0]; if (f && ['image/jpeg','image/png','image/webp'].includes(f.type)) { setFile(f); setPreview(URL.createObjectURL(f)); } }}>
        {preview ? (
          <div className="relative"><img src={preview} alt="" className="max-h-64 mx-auto rounded-lg" /><button onClick={() => { setFile(null); setPreview(null); }} className="absolute top-2 right-2 p-1 bg-black/60 rounded-full"><HiX size={16} /></button></div>
        ) : (
          <label className="cursor-pointer block py-12">
            <HiPhotograph className="text-5xl text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 font-body">Drop image or click to upload</p>
            <p className="text-gray-600 text-sm font-body mt-2">JPG, PNG, WEBP</p>
            <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={e => { const f = e.target.files?.[0]; if (f) { setFile(f); setPreview(URL.createObjectURL(f)); } }} className="hidden" />
          </label>
        )}
      </div>
      <div className="space-y-4">
        <div><label className="block text-sm text-gray-400 font-body mb-2">Title *</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 glass text-white rounded-xl font-body" /></div>
        <div><label className="block text-sm text-gray-400 font-body mb-2">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-4 py-3 glass text-white rounded-xl font-body resize-none h-24" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm text-gray-400 font-body mb-2">Category</label><select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full px-4 py-3 glass text-white rounded-xl font-body"><option>Poster Design</option><option>Social Media Design</option><option>Menu Design</option></select></div>
          <div><label className="block text-sm text-gray-400 font-body mb-2">Status</label><select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full px-4 py-3 glass text-white rounded-xl font-body"><option value="published">Published</option><option value="draft">Draft</option></select></div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="w-4 h-4" /><span className="text-sm text-gray-400 font-body">Featured</span></label>
        <button onClick={handleUpload} disabled={uploading || !file || !title} className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50">
          {uploading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading...</> : <><HiUpload /> Upload Design</>}
        </button>
      </div>
    </div>
  );
}

function PortfolioManager({ items, onRefresh }: { items: PortfolioItem[]; onRefresh: () => void }) {
  const [editId, setEditId] = useState<string | null>(null);
  const [delId, setDelId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<PortfolioItem>>({});

  const actions = async (id: string, updates: any) => { await supabase.from('portfolio').update(updates).eq('id', id); onRefresh(); };
  const remove = async () => { if (delId) { await supabase.from('portfolio').delete().eq('id', delId); setDelId(null); onRefresh(); } };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map(item => (
          <motion.div key={item.id} layout className="glass rounded-xl overflow-hidden group" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 right-2 flex gap-1">
                {item.featured && <span className="px-2 py-1 text-xs bg-amber-600/80 text-white rounded-full">★</span>}
                <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'published' ? 'bg-green-600/80' : 'bg-gray-600/80'} text-white`}>{item.status}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-heading font-semibold text-white truncate">{item.title}</h3>
              <p className="text-xs text-gray-500 font-body mt-1">{item.category}</p>
              <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                <button onClick={() => { setEditId(item.id); setForm(item); }} className="flex-1 px-3 py-1.5 text-xs bg-purple-600/20 text-purple-300 rounded-lg"><HiPencil className="inline mr-1" />Edit</button>
                <button onClick={() => actions(item.id, { status: item.status === 'published' ? 'draft' : 'published' })} className={`flex-1 px-3 py-1.5 text-xs rounded-lg ${item.status === 'published' ? 'bg-yellow-600/20 text-yellow-300' : 'bg-green-600/20 text-green-300'}`}>{item.status === 'published' ? <HiEyeOff className="inline mr-1" /> : <HiEye className="inline mr-1" />}{item.status === 'published' ? 'Hide' : 'Publish'}</button>
                <button onClick={() => actions(item.id, { featured: !item.featured })} className={`flex-1 px-3 py-1.5 text-xs rounded-lg ${item.featured ? 'bg-amber-600/20 text-amber-300' : 'bg-gray-600/20 text-gray-400'}`}>{item.featured ? 'Unfeature' : 'Feature'}</button>
                <button onClick={() => setDelId(item.id)} className="flex-1 px-3 py-1.5 text-xs bg-red-600/20 text-red-300 rounded-lg"><HiTrash className="inline mr-1" />Delete</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>{editId && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditId(null)} />
          <motion.div className="relative z-10 glass p-8 rounded-2xl max-w-lg w-full" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
            <div className="flex justify-between mb-6"><h3 className="text-lg font-heading font-semibold">Edit Design</h3><button onClick={() => setEditId(null)} className="text-gray-400 hover:text-white"><HiX size={20} /></button></div>
            <div className="space-y-4">
              <div><label className="block text-sm text-gray-400 font-body mb-2">Title</label><input type="text" value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 glass text-white rounded-xl font-body" /></div>
              <div><label className="block text-sm text-gray-400 font-body mb-2">Description</label><textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-3 glass text-white rounded-xl font-body resize-none h-24" /></div>
              <div><label className="block text-sm text-gray-400 font-body mb-2">Category</label><select value={form.category || 'Poster Design'} onChange={e => setForm({...form, category: e.target.value as any})} className="w-full px-4 py-3 glass text-white rounded-xl font-body"><option>Poster Design</option><option>Social Media Design</option><option>Menu Design</option></select></div>
              <div className="flex gap-3"><button onClick={async () => { await supabase.from('portfolio').update(form).eq('id', editId); setEditId(null); onRefresh(); }} className="flex-1 btn-primary py-2.5">Save</button><button onClick={() => setEditId(null)} className="flex-1 btn-secondary py-2.5">Cancel</button></div>
            </div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>

      <AnimatePresence>{delId && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDelId(null)} />
          <motion.div className="relative z-10 glass p-8 rounded-2xl max-w-md w-full text-center" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
            <HiTrash className="text-5xl text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-heading font-semibold text-white mb-2">Delete Design?</h3>
            <p className="text-gray-400 font-body text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3"><button onClick={() => setDelId(null)} className="flex-1 btn-secondary py-2.5">Cancel</button><button onClick={remove} className="flex-1 py-2.5 rounded-xl bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600/30">Delete</button></div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </>
  );
}

export default function Admin() {
  const [tab, setTab] = useState('dashboard');
  const { items, fetchAll } = useAdminPortfolio();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!user) navigate('/login'); }, [user, navigate]);
  if (!user) return null;

  return (
    <AdminLayout tab={tab} setTab={setTab}>
      {tab === 'dashboard' && <DashboardHome />}
      {tab === 'upload' && <UploadDesign onDone={fetchAll} />}
      {tab === 'manager' && <PortfolioManager items={items} onRefresh={fetchAll} />}
      {tab === 'featured' && (
        items.filter(i => i.featured).length === 0 ? <p className="text-gray-500 text-center py-16 font-body">No featured works yet.</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.filter(i => i.featured).map(item => (
              <div key={item.id} className="glass rounded-xl overflow-hidden">
                <img src={item.image_url} alt={item.title} className="w-full aspect-[4/3] object-cover" />
                <div className="p-4"><h3 className="text-sm font-heading text-white">{item.title}</h3></div>
              </div>
            ))}
          </div>
        )
      )}
      {tab === 'settings' && <p className="text-gray-400 font-body">Settings can be managed via Supabase or code update.</p>}
    </AdminLayout>
  );
}
