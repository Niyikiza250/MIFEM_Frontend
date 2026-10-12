import { create } from 'zustand';
import type { HeroSlide } from '@/api/heroSlides';

interface HeroState {
  slides: HeroSlide[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
  setSlides: (slides: HeroSlide[]) => void;
  setCurrentIndex: (index: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useHeroStore = create<HeroState>((set) => ({
  slides: [],
  currentIndex: 0,
  isLoading: false,
  error: null,
  setSlides: (slides) => set({ slides }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
