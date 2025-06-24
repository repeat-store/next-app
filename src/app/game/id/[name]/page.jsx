import React from 'react';
import CheckoutForm from '@/components/Game_Top_Up_Components/CheckoutForm';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { API_BASE_URL } from '../../../../lib/domen';

config.autoAddCss = false;

// ✅ دالة metadata الديناميكية
export async function generateMetadata({ params }) {
  const { name } = params;

  try {
    const res = await fetch(`${API_BASE_URL}/api/game?name=${name}`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error();

    const game = await res.json();

    return {
      title: `شحن ${game.nameAR} - متجر ريبيت استور`,
      description: `اشحن الآن ${game.nameAR} عبر متجر ريبيت استور بأسعار منافسة وخدمة موثوقة داخل السودان.`,
      openGraph: {
        title: `شحن ${game.nameAR} - متجر ريبيت`,
        description: `اشحن الآن ${game.nameAR} عبر متجر ريبيت استور بأسعار منافسة وخدمة موثوقة.`,
        images: [
          {
            url: `https://repeat-store.com/images/home/id/${name}.webp`,
            width: 1200,
            height: 630,
            alt: game.nameAR,
          },
        ],
        type: 'website',
        siteName: 'Repeat Store',
      },
      twitter: {
        card: 'summary_large_image',
      },
    };
  } catch (error) {
    return {
      title: 'اللعبة غير موجودة - متجر ريبيت',
      description: 'عذرًا، لم نتمكن من تحميل بيانات هذه اللعبة.',
    };
  }
}

// ✅ صفحة الشحن
export default async function GameTopUpPage({ params }) {
  const { name } = params;

  const res = await fetch(`${API_BASE_URL}/api/game?name=${name}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('فشل في جلب البيانات');
  }

  const game = await res.json();

  return (
    <div className="bg-white dark:bg-gray-900 text-center pt-20 pb-15">
      <div className="w-[90%] mx-auto p-8 bg-gray-50 dark:bg-gray-800 shadow-md relative overflow-visible rounded-xl">
        <div className="h-[230px] w-[120%] mx-auto -left-7 relative transition-transform duration-300 ease-in-out hover:-translate-y-1/4 hover:shadow-[0_13px_47px_-5px_rgba(226,196,63,0.25),0_8px_16px_-8px_rgba(180,71,71,0.3)]">
          <img
            src={`/images/games/${name}.jpg`}
            alt={`${game.nameAR} Top Up`}
            className="w-full h-full rounded-[5%]"
          />
        </div>
        <div className="pt-[10%]" style={{ direction: 'rtl' }}>
          <p className="font-extrabold text-[1.7em] leading-[1.5] dark:text-white text-center">{game.nameAR}</p>
          <p className="text-[0.9em] pb-5 dark:text-gray-50 text-center">شحن عبر الـ ID</p>
          <CheckoutForm products={game.products} nam={game.nameAR} namEN={name} />
        </div>
      </div>
    </div>
  );
}
