import React from 'react';
import CheckoutForm from '@/components/Game_Top_Up_Components/CheckoutForm';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { API_BASE_URL } from '../../../../lib/domen';

config.autoAddCss = false;


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
      <div className="w-[90%] mx-auto  p-8 bg-gray-50 dark:bg-gray-800 shadow-md relative overflow-visible rounded-xl">
        <div className="  h-[230px] w-[120%] mx-auto  -left-7 relative transition-transform duration-300 ease-in-out hover:-translate-y-1/4 hover:shadow-[0_13px_47px_-5px_rgba(226,196,63,0.25),0_8px_16px_-8px_rgba(180,71,71,0.3)]">
          <img
            src={`/images/games/${name}.jpg`}
            alt={`${game.nameAR} Top Up`}
            className="w-full h-full rounded-[5%]"
          />
        </div> 
        <div className="pt-[10%] " style={{direction:"rtl"}}>
          <p className="font-extrabold text-[1.7em] leading-[1.5] dark:text-white text-center">{game.nameAR}</p>
          <p className="text-[0.9em] pb-5 dark:text-gray-50 text-center">شحن عبر ال ID</p>
          <CheckoutForm products={game.products} nam={game.nameAR} namEN={name} />
        </div>
      </div>
    </div>
  );
};
