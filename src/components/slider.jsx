'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/images/slider/pubg-mobile.jpg',
    title: 'Pubg mobile',
    desc: 'اشحن شداتك من متجر ريبيت استور بافضل الاسعار',
    link: '/game/id/pubg-mobile',
  },
  {
    image: '/images/slider/tik-tok.jpg',
    title: 'tiktok',
    desc: 'نوفر شحن عملات التيك توك باسعار منافسة',
    link: '/game/acount/tik-tok',
  },
  {
    image: '/images/slider/pubg-lite.jpg',
    title: 'Pubg lite ',
    desc: 'شحن شدات ببجي لايت عن طريق الايدي',
    link: '/game/id/pubg-lite',
  },
  {
    image: '/images/slider/free.webp',
    title: 'Free fire',
    desc: 'جواهر فري فاير وخصومات قوية',
    link: '/game/id/free',
  },
  {
    image: '/images/slider/super-sell.jpg',
    title: 'Super cell',
    desc: 'يتوفر شحن جميع العاب سوبر سيل',
    link: '#super-sell-section',
  },
];

export default function GameSlider() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const timeoutRef = useRef(null);

  const goTo = (newIndex) => {
    setDir(newIndex > index ? 1 : -1);
    setIndex((newIndex + slides.length) % slides.length);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => next(), 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const variants = {
    enter: (d) => ({
      x: d > 0 ? 300 : -300,
      opacity: 0,
      rotateY: d > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (d) => ({
      x: d < 0 ? 300 : -300,
      opacity: 0,
      rotateY: d < 0 ? 45 : -45,
      scale: 0.8,
    }),
  };

  const handleSwipe = (e, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) next();
    else if (offset > 50 || velocity > 500) prev();
  };

  return (
    <div
      dir="rtl"
      className="relative w-full max-w-5xl h-70 md:h-[500px] mx-auto overflow-hidden rounded-xl border shadow-2xl 
        bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] 
        border-gray-300 dark:border-purple-600/30 group transition-colors duration-300"
    >
      <AnimatePresence custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleSwipe}
        >
          <img
            src={slides[index].image}
            alt={slides[index].title}
            className="w-full h-full rounded-xl brightness-110 contrast-125 saturate-150 select-none pointer-events-none"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/30 dark:bg-black/30" />

          <div className="absolute bottom-0 p-6 z-10 max-w-lg">
            <h2
              className="text-3xl font-extrabold text-white"
              style={{
                textShadow:
                  '0 0 5px rgba(255,255,255,0.8), 0 0 10px rgba(168,85,247,0.6), 0 0 20px rgba(139,92,246,0.5)',
              }}
            >
              {slides[index].title}
            </h2>
            <p
              className="text-base mt-2 leading-relaxed"
              style={{
                color: '#FCD34D',
                textShadow: '0 0 3px rgba(0,0,0,0.8)',
              }}
            >
              {slides[index].desc}
            </p>
            <a
              href={slides[index].link}
              className="mt-4 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:brightness-110 text-white px-5 py-2 rounded-full font-bold transition-all shadow-lg"
            >
              اشترِ الآن
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={() => prev()}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-purple-700/60 hover:bg-purple-700/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={() => next()}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-purple-700/60 hover:bg-purple-700/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full border-2 ${
              i === index ? 'bg-purple-500' : 'bg-transparent'
            } border-purple-500 transition`}
          />
        ))}
      </div>
    </div>
  );
}
