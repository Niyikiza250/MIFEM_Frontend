import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAchievements } from '@/hooks/useAchievements';
import { ArrowLeft, Calendar, User, BookOpen, ImageIcon, Landmark, Heart, Newspaper } from 'lucide-react';
import type { AchievementKind } from '@/types/achievement';

const kindIcon: Record<AchievementKind, React.ReactNode> = {
  STORY: <BookOpen size={16} aria-hidden />,
  GALLERY: <ImageIcon size={16} aria-hidden />,
  MILESTONE: <Landmark size={16} aria-hidden />,
  TESTIMONY: <Heart size={16} aria-hidden />,
  NEWS: <Newspaper size={16} aria-hidden />,
};

const kindColor: Record<AchievementKind, string> = {
  STORY: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  GALLERY: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  MILESTONE: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  TESTIMONY: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  NEWS: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
};

const AchievementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const items = useAchievements('');
  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-600 dark:text-slate-400">
            {t('achievements.notFound')}
          </h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sda-gold px-5 py-2.5 text-sm font-bold text-sda-blue transition-all hover:shadow-lg"
          >
            <ArrowLeft size={16} />
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-sda-blue hover:text-sda-gold transition-colors"
      >
        <ArrowLeft size={16} />
        {t('common.back')}
      </button>

      {item.coverUrl && (
        <img
          src={item.coverUrl}
          alt={item.title}
          className="mb-8 h-80 w-full rounded-2xl object-cover shadow-lg"
        />
      )}

      <div className="flex items-center gap-3 mb-4">
        <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black uppercase ${kindColor[item.kind]}`}>
          {kindIcon[item.kind]}
          {t(`achievements.${item.kind.toLowerCase()}`)}
        </span>
      </div>

      <h1 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
        {item.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <User size={14} />
          {item.author}
        </span>
        {item.date && (
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(item.date).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="mt-8 max-w-none">
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          {item.summary}
        </p>
        {item.content && (
          <div className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {item.content}
          </div>
        )}
      </div>
    </article>
  );
};

export default AchievementDetail;
