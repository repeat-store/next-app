"use client";
import { useEffect, useState } from "react";
import '../../lib/fetchWithRefrech';
import fetchWithRefresh from "../../lib/fetchWithRefrech";
import BottomNav from '../../components/NavButton/ButtonList';
import { API_BASE_URL } from "../../lib/domen";


export default function PubgTournamentPage() {
  const [tickets, setTickets] = useState(0);

  useEffect(() => {
    fetchWithRefresh(`${API_BASE_URL}/api/getTickets`)
      .then((data) => {
        setTickets(data?.tickets || 0);
        console.log(data)
      })
      .catch(() => {
        setTickets(0);
      });
  }, []);

  return (
    <div className="relative bg-black text-white overflow-hidden h-svh">
      {/* خلفية صورة */}
      <div className="absolute inset-0 z-0 ">
        <img 
          src="/images/new.jpg "
          alt="PUBG Tournament"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
      </div>

      {/* محتوى */}
      <div className="relative z-2 flex flex-col items-center justify-center h-full text-center px-6 py-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.6)] mb-4 animate-pulse" dir="rtl">
             رومات ومسابقات ببحي موبايل 🔥 
        </h1>

        <div className="text-sm sm:text-lg bg-white/10 text-white px-4 py-2 rounded-full mb-4 border border-white/20 backdrop-blur">
          🎟️ عدد تذاكرك: <span className="font-bold text-yellow-300">{tickets}</span>
        </div>

        <p className="text-lg sm:text-2xl text-white/90 dark:text-white/80 max-w-xl mb-8 leading-relaxed" dir="rtl">
          استعد للمنافسة على جوائز <span className="text-yellow-300 font-bold">شدات UC ورويال باس</span>!
          <br />
          المشاركة حتكون عن طريق التذاكر اللي تحصل عليها عند شراء منتجات ببجي من المتجر <br/> قم بجمع اكبر عدد من التزاكر <br/> واستعد للرومات
        </p>

        <div className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-lg px-6 py-3 rounded-full shadow-lg transition animate-bounce">
          قريباً جداً
        </div>
      </div>
      <BottomNav/>
    </div>
  );
}
