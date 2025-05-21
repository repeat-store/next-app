'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

const images = [
  {
    src: '/images/slider/pubg-mobile.jpg',
    href: '/game/id/pubg-mobile',
  },
  {
    src: '/images/slider/tik-tok.jpg',
    href: '/game/acount/tik-tok',
  },
  {
    src: '/images/slider/pubg-lite.jpg',
    href: '/game/id/pubg-lite',
  },
  {
    src: '/images/slider/free.webp',
    href: '/game/id/free',
  },
  {
    src: '/images/slider/super-sell.jpg',
    href: '#super-sell-section', // نفس الصفحة
  },
];

export default function CreativeSlider() {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <Swiper
        grabCursor={true}
        effect="creative"
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[EffectCreative, Autoplay]}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-120%', 0, -500],
          },
          next: {
            shadow: true,
            translate: ['120%', 0, -500],
          },
        }}
        style={{
          borderRadius: '20px',
        }}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Link href={image.href}>
              <div className="w-full h-60 cursor-pointer">
                <img
                  src={image.src}
                  alt={`صورة ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
