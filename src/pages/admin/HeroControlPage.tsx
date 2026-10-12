import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroManagement from '@/components/admin/HeroManagement';

const HeroControlPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          {t('hero.management.title')}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t('hero.management.description')}
        </p>
      </div>
      <HeroManagement />
    </div>
  );
};

export default HeroControlPage;
