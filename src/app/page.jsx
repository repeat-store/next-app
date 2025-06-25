import { Metadata } from "next";
import React from 'react'
import Header from '../components/Header/Header'
import './home.css';
import BottomNav from '../components/NavButton/ButtonList';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';
import CreativeSlider from '@/components/CreativeSlider';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../components/Home/TitleCard.css';
import PWAInstallPrompt from "@/components/PWAInstaller";
// import ImageSlider from "@/components/slider";

config.autoAddCss = false;

const games = [
  { name: 'pubg-mobile', image: '/images/home/id/pubg-mobile.webp' } ,
  { name: 'free', image: '/images/home/id/free-fire.webp' } ,
  { name: 'call-of-duty', image: '/images/home/id/call-of-duty.webp' } ,
  { name: 'genshin-impact', image: '/images/home/id/genshin-impact.webp' } ,
  { name: 'mobile-legends', image: '/images/home/id/mobile-legends.webp' } ,
  { name: 'pubg-lite', image: '/images/home/id/pubg-lite.webp' } ,
]

const gamesbyAcount = [
  { name: 'pubg-acount', image: '/images/home/account/pubg-acount2.png'} ,
  { name: 'tik-tok', image: '/images/home/account/tik-tok.webp' } ,
  { name: 'clash-of-clans', image: '/images/home/account/clash-of-clans.webp'} ,
  { name: 'clash-royale', image: '/images/home/account/clash-of-royale.webp' } ,
  { name: 'brawl-stars', image: '/images/home/account/brawl-stars.png' } ,    
  { name: 'hay-day', image: '/images/home/account/hay-day.webp' } ,    
]

const giftCards = [
  { name: 'amazon', image: '/images/home/card/amazon.jpeg' },
  { name: 'paypal', image: '/images/home/card/paypal.png' },
  { name: 'google-play', image: '/images/home/card/google-play.png' },
  { name: 'noon', image: '/images/home/card/noon.png' },
  { name: 'uber', image: '/images/home/card/uber.png' },
  { name: 'steam', image: '/images/home/card/steam.jpeg' }, 
  { name: 'razer-gold', image: '/images/home/card/razer-gold.jpg' },
  { name: 'netflex', image: '/images/home/card/netflex.webp' },
  { name: 'apple-card', image: '/images/home/card/apple-card.png' },
  { name: 'playstation', image: '/images/home/card/playstation.webp' },
  { name: 'shahid', image: '/images/home/card/shahid.jpeg' }, 
  { name: 'roblox', image: '/images/home/card/roblox.png' },
];

export const  metadata = {
  title: 'متجر ريبيت استور',
  description:
    'متجر ريبيت استور: متجر سوداني يوفر خدمة شحن مختلف الالعاب الالكترونية والبطاقات الرقمية باسعار منافسة وكمان بنوفر رومات ومسابقات يمكن من خلالها الفوز بشدات مجانا',
  keywords: [
    "شحن شدات ببجي",
    "شحن ببجي",
    "شحن فري فاير",
    "شحن عملات تيك توك السودان",
    "شحن فري فاير السودان",
    "شحن ببجي موبايل",
    " ببجي موبايل السودان",
    "بطاقات جوجل بلاي السودان",
    "ريبيت استور",
    "شحن كول اوف ديوتي",
    "متجر شحن سوداني",
    "ارخص موقع شحن سوداني",
    "متجر شحن ألعاب سوداني",
  ],
  metadataBase: new URL('https://repeat-store.com'),

  openGraph: {
    title: 'متجر ريبيت استور',
    description:
      'متجر ريبيت استور: متجر سوداني يوفر خدمة شحن مختلف الالعاب الالكترونية والبطاقات الرقمية باسعار منافسة وكمان بنوفر رومات ومسابقات يمكن من خلالها الفوز بشدات مجانا',
    url: 'https://repeat-store.com',
    siteName: 'Repeat Store',
    images: [
      {
        url: 'https://repeat-store.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Repeat Store',
      },
    ],
    locale: 'ar_SD',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
  },

  icons: {
    icon: '/favicon.ico',
  },

  other: {
    facebook: 'https://www.facebook.com/profile.php?id=61576000674601',
  },
};


export default function Home() {
  return (
    <div className='home_parent'>
      <div className="container  dark:bg-gray-900 bg-gray-100">
        <Header />

                  <PWAInstallPrompt/>
        <div className="box">

           <CreativeSlider/>
 
        </div>

         
          <div className="line home-card fire after:bg-gray-200 text-indigo-900 dark:text-gray-400">
            <h2> 🔥 ID الشحن عبر ال </h2>
          </div>
         

        <div className="sections grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {games.map(game => (
            <Link key={game.name} href={`/game/id/${game.name}`}>
              <img src={game.image} alt={game.name} className='rounded-3xl'/>
            </Link>
          ))}
        </div>
         
          <div className="line home-card cosmic after:bg-gray-200 text-indigo-900 dark:text-gray-400">
            <h2 id='super-sell-section'>  🌌 الشحن عبر الحساب </h2>
          </div>

        <div className="sections grid  grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 ">
          {gamesbyAcount.map(game => (
            <Link key={game.name} href={`/game/acount/${game.name}`}>
              <img src={game.image} alt={`${game.name} Baraer`} className='rounded-3xl'/>
            </Link>
          ))}
        </div>

        <div className="line home-card neon after:bg-gray-200 text-indigo-900 dark:text-gray-400">
          <h2>⚡ قسم البطاقات </h2>
        </div>

        <div className="sections grid text-center grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {giftCards.map(card => (
            <Link key={card.name} href={`/card/${card.name}`}>
              <img src={card.image} alt={card.name} className='rounded-3xl '/>
              <p className='mt-2'>{card.name}</p>
            </Link>
          ))}
        </div>

        <div id='footer' className='mt-8'>
        <Footer />

          </div>
        <BottomNav />
      </div>
    </div>
  )
}
