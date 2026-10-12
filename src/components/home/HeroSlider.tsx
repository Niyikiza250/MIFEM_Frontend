import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { heroSlides } from './heroData';
import { cn } from '@/lib/utils';

const gradients = [
  'from-blue-900/80 via-blue-800/50 to-transparent',
  'from-emerald-900/80 via-emerald-800/50 to-transparent',
  'from-amber-900/80 via-amber-800/50 to-transparent',
];

const HeroSlider: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-full w-full"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className={cn('absolute inset-0 bg-gradient-to-r', gradients[i % gradients.length])} />
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-4xl px-6 text-left">
                  <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    {t(slide.titleKey)}
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg font-medium text-white/80 sm:text-xl md:text-2xl">
                    {t(slide.subtitleKey)}
                  </p>
                  <p className="mt-2 max-w-xl text-sm text-white/60 sm:text-base">
                    {t(slide.descriptionKey)}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="#services"
                      className="inline-flex items-center gap-2 rounded-xl bg-sda-gold px-6 py-3 text-sm font-bold text-sda-blue shadow-lg shadow-sda-gold/30 hover:shadow-xl hover:shadow-sda-gold/40 transition-all"
                    >
                      {t('hero.cta')}
                      <ArrowRight size={18} />
                    </a>
                    <a
                      href="#achievements"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
                    >
                      {t('hero.learnMore')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
