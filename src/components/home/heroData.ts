export interface HeroSlideData {
  id: string;
  image: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
}

export const heroSlides: HeroSlideData[] = [
  {
    id: '1',
    image: '/assets/hero.png',
    titleKey: 'hero.slide1.title',
    subtitleKey: 'hero.slide1.subtitle',
    descriptionKey: 'hero.slide1.description',
  },
  {
    id: '2',
    image: '/assets/hero.png',
    titleKey: 'hero.slide2.title',
    subtitleKey: 'hero.slide2.subtitle',
    descriptionKey: 'hero.slide2.description',
  },
  {
    id: '3',
    image: '/assets/hero.png',
    titleKey: 'hero.slide3.title',
    subtitleKey: 'hero.slide3.subtitle',
    descriptionKey: 'hero.slide3.description',
  },
];
