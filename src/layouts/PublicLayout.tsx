import React from 'react';
import { Outlet } from 'react-router-dom';
import HeroNav from '@/components/home/HeroNav';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <HeroNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
