import apiClient from './client';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const heroSlidesApi = {
  getAll: async (): Promise<HeroSlide[]> => {
    const { data } = await apiClient.get<HeroSlide[]>('/hero-slides');
    return data;
  },
  getById: async (id: string): Promise<HeroSlide> => {
    const { data } = await apiClient.get<HeroSlide>(`/hero-slides/${id}`);
    return data;
  },
  create: async (slide: Omit<HeroSlide, 'id' | 'createdAt' | 'updatedAt'>): Promise<HeroSlide> => {
    const { data } = await apiClient.post<HeroSlide>('/hero-slides', slide);
    return data;
  },
  update: async (id: string, slide: Partial<HeroSlide>): Promise<HeroSlide> => {
    const { data } = await apiClient.put<HeroSlide>(`/hero-slides/${id}`, slide);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/hero-slides/${id}`);
  },
  reorder: async (ids: string[]): Promise<void> => {
    await apiClient.put('/hero-slides/reorder', { ids });
  },
};
