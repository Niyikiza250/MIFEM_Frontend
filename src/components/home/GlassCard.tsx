import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
