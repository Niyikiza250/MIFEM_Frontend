import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHeroStore } from '@/store/useHeroStore';
import { heroSlidesApi, type HeroSlide } from '@/api/heroSlides';
import { Plus, Edit2, Trash2, GripVertical, Loader2, Save } from 'lucide-react';

const HeroManagement: React.FC = () => {
  const { t } = useTranslation();
  const { slides, setSlides, isLoading, setLoading, setError } = useHeroStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      setLoading(true);
      try {
        const data = await heroSlidesApi.getAll();
        setSlides(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load slides');
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, [setSlides, setLoading, setError]);

  const handleDelete = async (id: string) => {
    try {
      await heroSlidesApi.delete(id);
      setSlides(slides.filter((s) => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete slide');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-sda-blue" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {t('hero.management.slides')} ({slides.length})
        </h2>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-sda-blue px-4 py-2 text-sm font-bold text-white hover:bg-sda-blue/90 transition-colors"
        >
          <Plus size={16} />
          {t('hero.management.addSlide')}
        </button>
      </div>

      <div className="space-y-3">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <GripVertical size={20} className="cursor-grab text-slate-400" />
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="h-16 w-24 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {slide.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {slide.subtitle}
              </p>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
              slide.active
                ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
            }`}>
              {slide.active ? t('common.active') : t('common.inactive')}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingId(slide.id)}
                className="rounded-lg p-2 text-slate-400 hover:text-sda-blue hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(slide.id)}
                className="rounded-lg p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroManagement;
